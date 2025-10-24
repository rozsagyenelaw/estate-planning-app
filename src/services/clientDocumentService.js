/**
 * Client & Document Service
 * High-level service that combines Firestore and Storage operations
 * with document generation for a complete workflow
 */

import { saveClientData, getClientData, searchClients, updateClientData, generateClientId } from './firestoreService';
import { uploadDocument, uploadMultipleDocuments, listClientDocuments, generateDocumentName } from './storageService';
import { generateCompleteEstatePlanningPackage, generateLivingTrust } from './documentGenerator';

/**
 * Save client data and generate/upload Living Trust only
 * @param {Object} formData - Complete form data from the estate planning form
 * @param {Function} onProgress - Optional callback for progress updates
 * @returns {Promise<Object>} - Result with client ID and document URLs
 */
export const saveClientWithLivingTrust = async (formData, onProgress = null) => {
  try {
    // Step 1: Generate unique client ID
    updateProgress(onProgress, 10, 'Generating client ID...');
    const clientId = generateClientId(
      formData.client.firstName,
      formData.client.lastName
    );

    // Step 2: Save client data to Firestore
    updateProgress(onProgress, 20, 'Saving client information...');
    const saveResult = await saveClientData(clientId, {
      ...formData,
      clientId, // Include the ID in the data
      createdAt: new Date().toISOString()
    });

    if (!saveResult.success) {
      throw new Error(`Failed to save client data: ${saveResult.error}`);
    }

    // Step 3: Generate Living Trust document (DOCX)
    updateProgress(onProgress, 40, 'Generating Living Trust document...');
    const docxDoc = await generateLivingTrust(formData);

    // Handle both jsPDF objects and Blobs (for backward compatibility)
    const docxBlob = (docxDoc instanceof Blob) ? docxDoc : docxDoc.output('blob');

    // Step 4: Upload document to Firebase Storage
    updateProgress(onProgress, 70, 'Uploading document...');
    const timestamp = new Date();
    const docxName = generateDocumentName('living_trust', 'docx', timestamp);

    const documents = [
      { blob: docxBlob, name: docxName }
    ];

    const uploadResult = await uploadMultipleDocuments(
      clientId,
      documents,
      (uploadProgress) => {
        // Map upload progress from 70-95%
        const totalProgress = 70 + (uploadProgress * 0.25);
        updateProgress(onProgress, totalProgress, 'Uploading documents...');
      }
    );

    if (!uploadResult.success) {
      throw new Error('Failed to upload some documents');
    }

    // Step 5: Update client record with document URLs
    updateProgress(onProgress, 95, 'Finalizing...');
    const documentUrls = {};
    uploadResult.results.forEach((result, index) => {
      if (result.success) {
        const docType = index === 0 ? 'livingTrustPdf' : 'livingTrustWord';
        documentUrls[docType] = result.downloadURL;
      }
    });

    await updateClientData(clientId, {
      livingTrustDocuments: documentUrls,
      livingTrustGeneratedAt: new Date().toISOString()
    });

    updateProgress(onProgress, 100, 'Complete!');

    return {
      success: true,
      clientId,
      documents: documentUrls,
      message: 'Living Trust saved successfully'
    };

  } catch (error) {
    console.error('Error in saveClientWithLivingTrust:', error);
    return {
      success: false,
      error: error.message,
      message: 'Failed to save Living Trust'
    };
  }
};

/**
 * Save complete client data and generate/upload all estate planning documents
 * This is the main function to use when submitting the estate planning form
 *
 * @param {Object} formData - Complete form data from the estate planning form
 * @param {Function} onProgress - Optional callback for progress updates
 * @returns {Promise<Object>} - Result with client ID and document URLs
 */
export const saveClientWithDocuments = async (formData, onProgress = null) => {
  try {
    // Step 1: Generate unique client ID
    updateProgress(onProgress, 10, 'Generating client ID...');
    const clientId = generateClientId(
      formData.client.firstName,
      formData.client.lastName
    );

    // Step 2: Save client data to Firestore
    updateProgress(onProgress, 20, 'Saving client information...');
    const saveResult = await saveClientData(clientId, {
      ...formData,
      clientId, // Include the ID in the data
      createdAt: new Date().toISOString()
    });

    if (!saveResult.success) {
      throw new Error(`Failed to save client data: ${saveResult.error}`);
    }

    // Step 3: Generate complete estate plan document (DOCX)
    updateProgress(onProgress, 40, 'Generating complete estate plan document...');
    const docxBlob = await generateCompleteEstatePlanningPackage(formData);

    // Step 4: Upload document to Firebase Storage
    updateProgress(onProgress, 70, 'Uploading document...');
    const timestamp = new Date();
    const docxName = generateDocumentName('estate_plan_complete', 'docx', timestamp);

    const documents = [
      { blob: docxBlob, name: docxName }
    ];

    const uploadResult = await uploadMultipleDocuments(
      clientId,
      documents,
      (uploadProgress) => {
        // Map upload progress from 70-95%
        const totalProgress = 70 + (uploadProgress * 0.25);
        updateProgress(onProgress, totalProgress, 'Uploading documents...');
      }
    );

    if (!uploadResult.success) {
      throw new Error('Failed to upload some documents');
    }

    // Step 5: Update client record with document URLs
    updateProgress(onProgress, 95, 'Finalizing...');
    const documentUrls = {};
    uploadResult.results.forEach((result, index) => {
      if (result.success) {
        const docType = index === 0 ? 'pdf' : 'word';
        documentUrls[docType] = result.downloadURL;
      }
    });

    await updateClientData(clientId, {
      documents: documentUrls,
      documentsGeneratedAt: new Date().toISOString()
    });

    updateProgress(onProgress, 100, 'Complete!');

    return {
      success: true,
      clientId,
      documents: documentUrls,
      message: 'Client data and documents saved successfully'
    };

  } catch (error) {
    console.error('Error in saveClientWithDocuments:', error);
    return {
      success: false,
      error: error.message,
      message: 'Failed to save client data and documents'
    };
  }
};

/**
 * Load existing client data and documents
 * @param {string} clientId - Client identifier
 * @returns {Promise<Object>} - Client data with document URLs
 */
export const loadClientWithDocuments = async (clientId) => {
  try {
    // Load client data from Firestore
    const clientResult = await getClientData(clientId);
    if (!clientResult.success) {
      throw new Error(`Client not found: ${clientResult.error}`);
    }

    // List all documents
    const docsResult = await listClientDocuments(clientId);

    return {
      success: true,
      client: clientResult.data,
      documents: docsResult.documents || [],
      message: 'Client data loaded successfully'
    };

  } catch (error) {
    console.error('Error loading client with documents:', error);
    return {
      success: false,
      error: error.message,
      message: 'Failed to load client data'
    };
  }
};

/**
 * Search for clients by name (for autocomplete)
 * @param {string} searchTerm - Search string
 * @returns {Promise<Array>} - Array of matching clients
 */
export const searchClientsForAutocomplete = async (searchTerm) => {
  try {
    const result = await searchClients(searchTerm, 10);
    if (!result.success) {
      return [];
    }

    // Format for autocomplete dropdown
    return result.data.map(client => ({
      id: client.id,
      label: `${client.client?.firstName} ${client.client?.lastName}`,
      value: client.id,
      email: client.client?.email,
      phone: client.client?.phone,
      lastUpdated: client.updatedAt
    }));

  } catch (error) {
    console.error('Error searching clients:', error);
    return [];
  }
};

/**
 * Update existing client and optionally regenerate documents
 * @param {string} clientId - Client identifier
 * @param {Object} updatedFormData - Updated form data
 * @param {boolean} regenerateDocuments - Whether to regenerate documents
 * @param {Function} onProgress - Optional progress callback
 * @returns {Promise<Object>} - Update result
 */
export const updateClientWithDocuments = async (
  clientId,
  updatedFormData,
  regenerateDocuments = false,
  onProgress = null
) => {
  try {
    // Step 1: Update client data
    updateProgress(onProgress, 20, 'Updating client information...');
    const updateResult = await updateClientData(clientId, updatedFormData);

    if (!updateResult.success) {
      throw new Error(`Failed to update client: ${updateResult.error}`);
    }

    let documentUrls = null;

    // Step 2: Regenerate documents if requested
    if (regenerateDocuments) {
      updateProgress(onProgress, 40, 'Regenerating estate plan document...');
      const docxBlob = await generateCompleteEstatePlanningPackage(updatedFormData);

      updateProgress(onProgress, 70, 'Uploading new document...');
      const timestamp = new Date();
      const docxName = generateDocumentName('estate_plan_complete', 'docx', timestamp);

      const documents = [
        { blob: docxBlob, name: docxName }
      ];

      const uploadResult = await uploadMultipleDocuments(clientId, documents);

      if (uploadResult.success) {
        documentUrls = {};
        uploadResult.results.forEach((result, index) => {
          if (result.success) {
            const docType = index === 0 ? 'pdf' : 'word';
            documentUrls[docType] = result.downloadURL;
          }
        });

        // Update client record with new document URLs
        await updateClientData(clientId, {
          documents: documentUrls,
          documentsGeneratedAt: new Date().toISOString()
        });
      }
    }

    updateProgress(onProgress, 100, 'Update complete!');

    return {
      success: true,
      clientId,
      documents: documentUrls,
      message: regenerateDocuments
        ? 'Client updated and documents regenerated'
        : 'Client updated successfully'
    };

  } catch (error) {
    console.error('Error updating client with documents:', error);
    return {
      success: false,
      error: error.message,
      message: 'Failed to update client'
    };
  }
};

/**
 * Load client by ID (alias for getClientData for backward compatibility)
 * @param {string} clientId - Client identifier
 * @returns {Promise<Object>} - Client data
 */
export const loadClientById = async (clientId) => {
  return await getClientData(clientId);
};

/**
 * Get all clients (wrapper for searchClients with empty search term)
 * @returns {Promise<Array>} - Array of all clients
 */
export const getAllClients = async () => {
  try {
    const result = await searchClients('', 100); // Empty search returns all, limit to 100
    if (!result.success) {
      return [];
    }
    return result.data || [];
  } catch (error) {
    console.error('Error getting all clients:', error);
    return [];
  }
};

/**
 * Helper function to update progress
 * @private
 */
function updateProgress(callback, percent, message) {
  if (callback && typeof callback === 'function') {
    callback({ percent, message });
  }
}

/**
 * Export individual services for advanced use cases
 */
export {
  // Firestore operations
  saveClientData,
  getClientData,
  searchClients,
  updateClientData,
  generateClientId,

  // Storage operations
  uploadDocument,
  uploadMultipleDocuments,
  listClientDocuments,
  generateDocumentName
};
