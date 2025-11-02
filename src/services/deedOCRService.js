/**
 * Deed OCR Service
 *
 * Handles deed upload and OCR extraction using Google Cloud Vision API
 * via Firebase Cloud Functions
 */

import { storage } from './firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const CLOUD_FUNCTIONS_URL = import.meta.env.VITE_CLOUD_FUNCTIONS_URL;

/**
 * Upload deed PDF to Firebase Storage
 * @param {File} file - PDF file
 * @param {string} clientId - Client ID
 * @returns {Promise<string>} - Download URL
 */
export const uploadDeedPDF = async (file, clientId) => {
  if (!file) {
    throw new Error('No file provided');
  }

  if (file.type !== 'application/pdf') {
    throw new Error('File must be a PDF');
  }

  // Create unique filename with timestamp
  const timestamp = Date.now();
  const fileName = `deed_${timestamp}.pdf`;
  const filePath = `deeds/${clientId}/${fileName}`;

  // Upload to Firebase Storage
  const storageRef = ref(storage, filePath);
  await uploadBytes(storageRef, file);

  // Get download URL
  const downloadURL = await getDownloadURL(storageRef);

  return {
    downloadURL,
    filePath,
    fileName
  };
};

/**
 * Extract deed information using Google Cloud Vision API
 * @param {string} fileUrl - Firebase Storage URL of the deed PDF
 * @returns {Promise<Object>} - Extracted deed information
 */
export const extractDeedInfo = async (fileUrl) => {
  if (!fileUrl) {
    throw new Error('No file URL provided');
  }

  try {
    const response = await fetch(`${CLOUD_FUNCTIONS_URL}/extractDeedInfo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ fileUrl })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to extract deed information');
    }

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.error || 'OCR extraction failed');
    }

    return result.extractedData;

  } catch (error) {
    console.error('Error extracting deed info:', error);
    throw error;
  }
};

/**
 * Upload and extract deed information in one step
 * @param {File} file - PDF file
 * @param {string} clientId - Client ID
 * @returns {Promise<Object>} - Upload info and extracted data
 */
export const uploadAndExtractDeed = async (file, clientId) => {
  // Step 1: Upload the deed
  const uploadInfo = await uploadDeedPDF(file, clientId);

  // Step 2: Extract information from the deed
  const extractedData = await extractDeedInfo(uploadInfo.downloadURL);

  return {
    uploadInfo,
    extractedData
  };
};

/**
 * Validate extracted deed data
 * @param {Object} deedData - Extracted deed data
 * @returns {Object} - Validation result with errors
 */
export const validateDeedData = (deedData) => {
  const errors = [];

  // Check APN (make it a warning, not a blocker)
  // Users can manually enter APN if OCR didn't extract it
  // if (!deedData.apn || deedData.apn.length < 5) {
  //   errors.push({
  //     field: 'apn',
  //     message: 'APN is recommended but can be entered manually'
  //   });
  // }

  // Check property address
  if (!deedData.propertyAddress?.street) {
    errors.push({
      field: 'propertyAddress.street',
      message: 'Property street address is required'
    });
  }

  if (!deedData.propertyAddress?.city) {
    errors.push({
      field: 'propertyAddress.city',
      message: 'Property city is required'
    });
  }

  if (!deedData.propertyAddress?.state) {
    errors.push({
      field: 'propertyAddress.state',
      message: 'Property state is required'
    });
  }

  if (!deedData.propertyAddress?.zip) {
    errors.push({
      field: 'propertyAddress.zip',
      message: 'Property ZIP code is required'
    });
  }

  // Check grantor names
  if (!deedData.grantorNames || deedData.grantorNames.length === 0) {
    errors.push({
      field: 'grantorNames',
      message: 'At least one grantor name is required'
    });
  }

  // Check legal description
  if (!deedData.legalDescription || deedData.legalDescription.length < 20) {
    errors.push({
      field: 'legalDescription',
      message: 'Legal description is required and must be complete'
    });
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Get confidence level description
 * @param {number} confidence - Confidence score (0-1)
 * @returns {Object} - Confidence level and color
 */
export const getConfidenceLevel = (confidence) => {
  if (confidence >= 0.9) {
    return {
      level: 'High',
      color: 'green',
      description: 'OCR extraction is very accurate'
    };
  } else if (confidence >= 0.75) {
    return {
      level: 'Medium',
      color: 'yellow',
      description: 'OCR extraction is good, please review carefully'
    };
  } else {
    return {
      level: 'Low',
      color: 'red',
      description: 'OCR extraction may have errors, manual review required'
    };
  }
};
