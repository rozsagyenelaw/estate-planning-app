/**
 * Firestore Service
 * Handles all Firestore database operations for client data
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
  where,
  orderBy,
  limit,
  Timestamp,
  serverTimestamp
} from 'firebase/firestore';
import { db } from './firebase';

const CLIENTS_COLLECTION = 'clients';

/**
 * Save client data to Firestore
 * @param {string} clientId - Unique identifier for the client
 * @param {Object} formData - Complete form data from the estate planning form
 * @returns {Promise<Object>} - Result with success status and client ID
 */
export const saveClientData = async (clientId, formData) => {
  try {
    if (!db) {
      throw new Error('Firebase is not initialized. Please check your configuration.');
    }

    const clientRef = doc(db, CLIENTS_COLLECTION, clientId);

    const clientData = {
      ...formData,
      updatedAt: serverTimestamp(),
      createdAt: formData.createdAt || serverTimestamp(),
    };

    await setDoc(clientRef, clientData, { merge: true });

    console.log('Client data saved successfully:', clientId);
    return {
      success: true,
      clientId,
      message: 'Client data saved successfully'
    };
  } catch (error) {
    console.error('Error saving client data:', error);
    return {
      success: false,
      error: error.message,
      message: 'Failed to save client data'
    };
  }
};

/**
 * Get client data from Firestore
 * @param {string} clientId - Unique identifier for the client
 * @returns {Promise<Object>} - Client data object or null if not found
 */
export const getClientData = async (clientId) => {
  try {
    if (!db) {
      throw new Error('Firebase is not initialized. Please check your configuration.');
    }

    const clientRef = doc(db, CLIENTS_COLLECTION, clientId);
    const clientSnap = await getDoc(clientRef);

    if (clientSnap.exists()) {
      const data = clientSnap.data();

      // Convert Firestore Timestamps to JavaScript Date objects
      const formattedData = {
        ...data,
        id: clientSnap.id,
        createdAt: data.createdAt?.toDate?.() || data.createdAt,
        updatedAt: data.updatedAt?.toDate?.() || data.updatedAt,
      };

      console.log('Client data retrieved successfully:', clientId);
      return {
        success: true,
        data: formattedData
      };
    } else {
      console.log('No client found with ID:', clientId);
      return {
        success: false,
        error: 'Client not found',
        data: null
      };
    }
  } catch (error) {
    console.error('Error getting client data:', error);
    return {
      success: false,
      error: error.message,
      data: null
    };
  }
};

/**
 * Search for clients by name (for autocomplete)
 * @param {string} searchTerm - Search string (partial name match)
 * @param {number} maxResults - Maximum number of results to return
 * @returns {Promise<Array>} - Array of matching client objects
 */
export const searchClients = async (searchTerm, maxResults = 10) => {
  try {
    if (!db) {
      throw new Error('Firebase is not initialized. Please check your configuration.');
    }

    if (!searchTerm || searchTerm.trim().length === 0) {
      return {
        success: true,
        data: []
      };
    }

    // Get all clients and filter client-side for case-insensitive search
    // This is practical for small to medium datasets (< 1000 clients)
    // For larger datasets, consider using Algolia or similar search service
    const allClientsResult = await getAllClients(100);

    if (!allClientsResult.success) {
      return {
        success: false,
        error: allClientsResult.error,
        data: []
      };
    }

    const searchTermLower = searchTerm.toLowerCase();

    // Filter clients by first name, last name, or email (case-insensitive)
    const filteredClients = allClientsResult.data.filter(client => {
      const firstName = (client.client?.firstName || '').toLowerCase();
      const lastName = (client.client?.lastName || '').toLowerCase();
      const email = (client.client?.email || '').toLowerCase();
      const spouseFirstName = (client.spouse?.firstName || '').toLowerCase();
      const spouseLastName = (client.spouse?.lastName || '').toLowerCase();

      return firstName.includes(searchTermLower) ||
             lastName.includes(searchTermLower) ||
             email.includes(searchTermLower) ||
             spouseFirstName.includes(searchTermLower) ||
             spouseLastName.includes(searchTermLower);
    });

    // Limit results
    const limitedResults = filteredClients.slice(0, maxResults);

    console.log(`Found ${limitedResults.length} clients matching "${searchTerm}"`);
    return {
      success: true,
      data: limitedResults
    };
  } catch (error) {
    console.error('Error searching clients:', error);
    return {
      success: false,
      error: error.message,
      data: []
    };
  }
};

/**
 * Update client data in Firestore
 * @param {string} clientId - Unique identifier for the client
 * @param {Object} updates - Object containing fields to update
 * @returns {Promise<Object>} - Result with success status
 */
export const updateClientData = async (clientId, updates) => {
  try {
    if (!db) {
      throw new Error('Firebase is not initialized. Please check your configuration.');
    }

    const clientRef = doc(db, CLIENTS_COLLECTION, clientId);

    const updateData = {
      ...updates,
      updatedAt: serverTimestamp()
    };

    await updateDoc(clientRef, updateData);

    console.log('Client data updated successfully:', clientId);
    return {
      success: true,
      clientId,
      message: 'Client data updated successfully'
    };
  } catch (error) {
    console.error('Error updating client data:', error);
    return {
      success: false,
      error: error.message,
      message: 'Failed to update client data'
    };
  }
};

/**
 * Delete client data from Firestore
 * @param {string} clientId - Unique identifier for the client
 * @returns {Promise<Object>} - Result with success status
 */
export const deleteClientData = async (clientId) => {
  try {
    if (!db) {
      throw new Error('Firebase is not initialized. Please check your configuration.');
    }

    const clientRef = doc(db, CLIENTS_COLLECTION, clientId);
    await deleteDoc(clientRef);

    console.log('Client data deleted successfully:', clientId);
    return {
      success: true,
      clientId,
      message: 'Client data deleted successfully'
    };
  } catch (error) {
    console.error('Error deleting client data:', error);
    return {
      success: false,
      error: error.message,
      message: 'Failed to delete client data'
    };
  }
};

/**
 * Get all clients (with pagination support)
 * @param {number} limitCount - Maximum number of clients to return
 * @returns {Promise<Array>} - Array of client objects
 */
export const getAllClients = async (limitCount = 100) => {
  try {
    if (!db) {
      throw new Error('Firebase is not initialized. Please check your configuration.');
    }

    const clientsRef = collection(db, CLIENTS_COLLECTION);
    const q = query(
      clientsRef,
      orderBy('updatedAt', 'desc'),
      limit(limitCount)
    );

    const querySnapshot = await getDocs(q);
    const clients = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      clients.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate?.() || data.createdAt,
        updatedAt: data.updatedAt?.toDate?.() || data.updatedAt,
      });
    });

    console.log(`Retrieved ${clients.length} clients`);
    return {
      success: true,
      data: clients
    };
  } catch (error) {
    console.error('Error getting all clients:', error);
    return {
      success: false,
      error: error.message,
      data: []
    };
  }
};

/**
 * Generate a unique client ID based on name and timestamp
 * @param {string} firstName - Client's first name
 * @param {string} lastName - Client's last name
 * @returns {string} - Unique client ID
 */
export const generateClientId = (firstName, lastName) => {
  const timestamp = Date.now();
  const cleanFirstName = firstName.toLowerCase().replace(/[^a-z]/g, '');
  const cleanLastName = lastName.toLowerCase().replace(/[^a-z]/g, '');
  return `${cleanLastName}_${cleanFirstName}_${timestamp}`;
};
