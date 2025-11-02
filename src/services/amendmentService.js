/**
 * Amendment Service
 * Handles all Firestore operations for trust amendments
 *
 * Database Schema:
 * /clients/{clientId}/amendments/{amendmentId}
 * {
 *   amendmentNumber: 1,                    // First, Second, Third, etc.
 *   amendmentDate: '2025-11-02',
 *   executionDate: '2025-11-02',
 *   trustorName: 'John Smith',
 *   trusteeName: 'Jane Smith',
 *   originalTrustDate: '2024-01-15',
 *   originalTrustDocumentUrl: 'https://...',
 *   sections: [
 *     {
 *       articleNumber: 'ARTICLE III',
 *       sectionTitle: 'Distributions',
 *       sectionText: 'The full text of the amended provision...'
 *     }
 *   ],
 *   scheduleOfAssets: 'Schedule A assets...',  // Optional
 *   witnesses: [
 *     {
 *       name: 'Witness Name',
 *       address: '123 Main St'
 *     }
 *   ],
 *   pdfUrl: 'https://...',
 *   createdAt: Timestamp,
 *   updatedAt: Timestamp
 * }
 */

import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { db } from './firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase';

const CLIENTS_COLLECTION = 'clients';
const AMENDMENTS_COLLECTION = 'amendments';

/**
 * Get ordinal suffix for amendment number
 * @param {number} num - Amendment number
 * @returns {string} - Ordinal string (e.g., "First", "Second", "Third")
 */
export const getOrdinalName = (num) => {
  const ordinals = [
    'First', 'Second', 'Third', 'Fourth', 'Fifth',
    'Sixth', 'Seventh', 'Eighth', 'Ninth', 'Tenth',
    'Eleventh', 'Twelfth', 'Thirteenth', 'Fourteenth', 'Fifteenth'
  ];
  return ordinals[num - 1] || `${num}th`;
};

/**
 * Get all amendments for a client
 * @param {string} clientId - Client ID
 * @returns {Promise<Object>} - Result with amendments array
 */
export const getAmendments = async (clientId) => {
  try {
    if (!db) {
      throw new Error('Firebase is not initialized');
    }

    const amendmentsRef = collection(db, CLIENTS_COLLECTION, clientId, AMENDMENTS_COLLECTION);
    const q = query(amendmentsRef, orderBy('amendmentNumber', 'asc'));
    const querySnapshot = await getDocs(q);

    const amendments = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      amendments.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate?.() || data.createdAt,
        updatedAt: data.updatedAt?.toDate?.() || data.updatedAt,
      });
    });

    return {
      success: true,
      data: amendments
    };
  } catch (error) {
    console.error('Error getting amendments:', error);
    return {
      success: false,
      error: error.message,
      data: []
    };
  }
};

/**
 * Get next amendment number for a client
 * @param {string} clientId - Client ID
 * @returns {Promise<number>} - Next amendment number
 */
export const getNextAmendmentNumber = async (clientId) => {
  try {
    const result = await getAmendments(clientId);
    if (!result.success) {
      return 1;
    }

    const amendments = result.data;
    if (amendments.length === 0) {
      return 1;
    }

    // Get highest amendment number and add 1
    const maxNumber = Math.max(...amendments.map(a => a.amendmentNumber || 0));
    return maxNumber + 1;
  } catch (error) {
    console.error('Error getting next amendment number:', error);
    return 1;
  }
};

/**
 * Save amendment to Firestore
 * @param {string} clientId - Client ID
 * @param {string} amendmentId - Amendment ID (generated)
 * @param {Object} amendmentData - Amendment data
 * @returns {Promise<Object>} - Result with success status
 */
export const saveAmendment = async (clientId, amendmentId, amendmentData) => {
  try {
    if (!db) {
      throw new Error('Firebase is not initialized');
    }

    const amendmentRef = doc(db, CLIENTS_COLLECTION, clientId, AMENDMENTS_COLLECTION, amendmentId);

    const dataToSave = {
      ...amendmentData,
      updatedAt: serverTimestamp(),
      createdAt: amendmentData.createdAt || serverTimestamp(),
    };

    await setDoc(amendmentRef, dataToSave, { merge: true });

    console.log('Amendment saved successfully:', amendmentId);
    return {
      success: true,
      amendmentId,
      message: 'Amendment saved successfully'
    };
  } catch (error) {
    console.error('Error saving amendment:', error);
    return {
      success: false,
      error: error.message,
      message: 'Failed to save amendment'
    };
  }
};

/**
 * Get single amendment
 * @param {string} clientId - Client ID
 * @param {string} amendmentId - Amendment ID
 * @returns {Promise<Object>} - Amendment data
 */
export const getAmendment = async (clientId, amendmentId) => {
  try {
    if (!db) {
      throw new Error('Firebase is not initialized');
    }

    const amendmentRef = doc(db, CLIENTS_COLLECTION, clientId, AMENDMENTS_COLLECTION, amendmentId);
    const amendmentSnap = await getDoc(amendmentRef);

    if (amendmentSnap.exists()) {
      const data = amendmentSnap.data();
      return {
        success: true,
        data: {
          id: amendmentSnap.id,
          ...data,
          createdAt: data.createdAt?.toDate?.() || data.createdAt,
          updatedAt: data.updatedAt?.toDate?.() || data.updatedAt,
        }
      };
    } else {
      return {
        success: false,
        error: 'Amendment not found',
        data: null
      };
    }
  } catch (error) {
    console.error('Error getting amendment:', error);
    return {
      success: false,
      error: error.message,
      data: null
    };
  }
};

/**
 * Delete amendment
 * @param {string} clientId - Client ID
 * @param {string} amendmentId - Amendment ID
 * @returns {Promise<Object>} - Result with success status
 */
export const deleteAmendment = async (clientId, amendmentId) => {
  try {
    if (!db) {
      throw new Error('Firebase is not initialized');
    }

    const amendmentRef = doc(db, CLIENTS_COLLECTION, clientId, AMENDMENTS_COLLECTION, amendmentId);
    await deleteDoc(amendmentRef);

    console.log('Amendment deleted successfully:', amendmentId);
    return {
      success: true,
      amendmentId,
      message: 'Amendment deleted successfully'
    };
  } catch (error) {
    console.error('Error deleting amendment:', error);
    return {
      success: false,
      error: error.message,
      message: 'Failed to delete amendment'
    };
  }
};

/**
 * Upload amendment PDF to Firebase Storage
 * @param {string} clientId - Client ID
 * @param {string} amendmentId - Amendment ID
 * @param {Blob} pdfBlob - PDF file blob
 * @returns {Promise<Object>} - Result with PDF URL
 */
export const uploadAmendmentPDF = async (clientId, amendmentId, pdfBlob) => {
  try {
    if (!storage) {
      throw new Error('Firebase Storage is not initialized');
    }

    const fileName = `amendments/${clientId}/${amendmentId}.pdf`;
    const storageRef = ref(storage, fileName);

    // Upload the file
    await uploadBytes(storageRef, pdfBlob);

    // Get the download URL
    const downloadURL = await getDownloadURL(storageRef);

    console.log('Amendment PDF uploaded successfully:', downloadURL);
    return {
      success: true,
      url: downloadURL,
      message: 'PDF uploaded successfully'
    };
  } catch (error) {
    console.error('Error uploading amendment PDF:', error);
    return {
      success: false,
      error: error.message,
      message: 'Failed to upload PDF'
    };
  }
};

/**
 * Generate amendment ID
 * @param {string} clientId - Client ID
 * @param {number} amendmentNumber - Amendment number
 * @returns {string} - Amendment ID
 */
export const generateAmendmentId = (clientId, amendmentNumber) => {
  const timestamp = Date.now();
  return `${clientId}_amendment_${amendmentNumber}_${timestamp}`;
};
