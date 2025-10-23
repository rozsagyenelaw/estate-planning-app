/**
 * Firebase Storage Service
 * Handles all document uploads and retrievals
 */

import {
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
  listAll,
  getMetadata
} from 'firebase/storage';
import { storage } from './firebase';

/**
 * Upload a document (PDF or Word) to Firebase Storage
 * @param {string} clientId - Unique identifier for the client
 * @param {Blob} documentBlob - The document blob (PDF or Word)
 * @param {string} documentName - Name of the document (e.g., 'living_trust.pdf')
 * @param {Function} onProgress - Optional callback for upload progress
 * @returns {Promise<Object>} - Result with download URL and metadata
 */
export const uploadDocument = async (
  clientId,
  documentBlob,
  documentName,
  onProgress = null
) => {
  try {
    if (!storage) {
      throw new Error('Firebase Storage is not initialized. Please check your configuration.');
    }

    if (!documentBlob || !documentName) {
      throw new Error('Document blob and name are required');
    }

    // Create a reference to the file location
    // Structure: clients/{clientId}/documents/{documentName}
    const documentPath = `clients/${clientId}/documents/${documentName}`;
    const storageRef = ref(storage, documentPath);

    // Add metadata
    const metadata = {
      contentType: documentBlob.type || 'application/pdf',
      customMetadata: {
        clientId,
        uploadedAt: new Date().toISOString(),
        originalName: documentName
      }
    };

    console.log(`Uploading document: ${documentName} for client: ${clientId}`);

    // Upload with progress tracking if callback provided
    if (onProgress) {
      const uploadTask = uploadBytesResumable(storageRef, documentBlob, metadata);

      return new Promise((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            onProgress(progress);
          },
          (error) => {
            console.error('Upload error:', error);
            reject({
              success: false,
              error: error.message,
              message: 'Failed to upload document'
            });
          },
          async () => {
            try {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              console.log('Document uploaded successfully:', documentName);
              resolve({
                success: true,
                downloadURL,
                path: documentPath,
                name: documentName,
                message: 'Document uploaded successfully'
              });
            } catch (error) {
              reject({
                success: false,
                error: error.message,
                message: 'Failed to get download URL'
              });
            }
          }
        );
      });
    } else {
      // Simple upload without progress tracking
      const snapshot = await uploadBytes(storageRef, documentBlob, metadata);
      const downloadURL = await getDownloadURL(snapshot.ref);

      console.log('Document uploaded successfully:', documentName);
      return {
        success: true,
        downloadURL,
        path: documentPath,
        name: documentName,
        message: 'Document uploaded successfully'
      };
    }
  } catch (error) {
    console.error('Error uploading document:', error);
    return {
      success: false,
      error: error.message,
      message: 'Failed to upload document'
    };
  }
};

/**
 * Get the download URL for a specific document
 * @param {string} clientId - Unique identifier for the client
 * @param {string} documentName - Name of the document
 * @returns {Promise<Object>} - Result with download URL
 */
export const getDocumentURL = async (clientId, documentName) => {
  try {
    if (!storage) {
      throw new Error('Firebase Storage is not initialized. Please check your configuration.');
    }

    const documentPath = `clients/${clientId}/documents/${documentName}`;
    const storageRef = ref(storage, documentPath);

    const downloadURL = await getDownloadURL(storageRef);

    console.log('Retrieved download URL for:', documentName);
    return {
      success: true,
      downloadURL,
      name: documentName
    };
  } catch (error) {
    console.error('Error getting document URL:', error);
    return {
      success: false,
      error: error.message,
      message: error.code === 'storage/object-not-found'
        ? 'Document not found'
        : 'Failed to get document URL'
    };
  }
};

/**
 * List all documents for a specific client
 * @param {string} clientId - Unique identifier for the client
 * @returns {Promise<Object>} - Result with array of document metadata
 */
export const listClientDocuments = async (clientId) => {
  try {
    if (!storage) {
      throw new Error('Firebase Storage is not initialized. Please check your configuration.');
    }

    const documentsPath = `clients/${clientId}/documents`;
    const listRef = ref(storage, documentsPath);

    const listResult = await listAll(listRef);

    // Get metadata and download URLs for all documents
    const documents = await Promise.all(
      listResult.items.map(async (itemRef) => {
        try {
          const metadata = await getMetadata(itemRef);
          const downloadURL = await getDownloadURL(itemRef);

          return {
            name: itemRef.name,
            fullPath: itemRef.fullPath,
            downloadURL,
            size: metadata.size,
            contentType: metadata.contentType,
            timeCreated: metadata.timeCreated,
            updated: metadata.updated,
            customMetadata: metadata.customMetadata
          };
        } catch (error) {
          console.error(`Error getting metadata for ${itemRef.name}:`, error);
          return null;
        }
      })
    );

    // Filter out any null entries (failed metadata fetches)
    const validDocuments = documents.filter(doc => doc !== null);

    console.log(`Found ${validDocuments.length} documents for client:`, clientId);
    return {
      success: true,
      documents: validDocuments
    };
  } catch (error) {
    console.error('Error listing client documents:', error);
    return {
      success: false,
      error: error.message,
      documents: []
    };
  }
};

/**
 * Delete a specific document
 * @param {string} clientId - Unique identifier for the client
 * @param {string} documentName - Name of the document to delete
 * @returns {Promise<Object>} - Result with success status
 */
export const deleteDocument = async (clientId, documentName) => {
  try {
    if (!storage) {
      throw new Error('Firebase Storage is not initialized. Please check your configuration.');
    }

    const documentPath = `clients/${clientId}/documents/${documentName}`;
    const storageRef = ref(storage, documentPath);

    await deleteObject(storageRef);

    console.log('Document deleted successfully:', documentName);
    return {
      success: true,
      message: 'Document deleted successfully'
    };
  } catch (error) {
    console.error('Error deleting document:', error);
    return {
      success: false,
      error: error.message,
      message: error.code === 'storage/object-not-found'
        ? 'Document not found'
        : 'Failed to delete document'
    };
  }
};

/**
 * Delete all documents for a specific client
 * @param {string} clientId - Unique identifier for the client
 * @returns {Promise<Object>} - Result with success status and deleted count
 */
export const deleteAllClientDocuments = async (clientId) => {
  try {
    if (!storage) {
      throw new Error('Firebase Storage is not initialized. Please check your configuration.');
    }

    const documentsPath = `clients/${clientId}/documents`;
    const listRef = ref(storage, documentsPath);

    const listResult = await listAll(listRef);

    // Delete all documents
    const deletePromises = listResult.items.map(itemRef => deleteObject(itemRef));
    await Promise.all(deletePromises);

    const deletedCount = listResult.items.length;
    console.log(`Deleted ${deletedCount} documents for client:`, clientId);

    return {
      success: true,
      deletedCount,
      message: `Deleted ${deletedCount} documents successfully`
    };
  } catch (error) {
    console.error('Error deleting all client documents:', error);
    return {
      success: false,
      error: error.message,
      message: 'Failed to delete client documents'
    };
  }
};

/**
 * Upload multiple documents at once
 * @param {string} clientId - Unique identifier for the client
 * @param {Array} documents - Array of {blob, name} objects
 * @param {Function} onProgress - Optional callback for overall progress
 * @returns {Promise<Object>} - Result with array of upload results
 */
export const uploadMultipleDocuments = async (
  clientId,
  documents,
  onProgress = null
) => {
  try {
    if (!storage) {
      throw new Error('Firebase Storage is not initialized. Please check your configuration.');
    }

    const totalDocuments = documents.length;
    let completedDocuments = 0;

    const uploadResults = await Promise.all(
      documents.map(async ({ blob, name }) => {
        const result = await uploadDocument(clientId, blob, name);

        completedDocuments++;
        if (onProgress) {
          const progress = (completedDocuments / totalDocuments) * 100;
          onProgress(progress);
        }

        return result;
      })
    );

    const successfulUploads = uploadResults.filter(r => r.success).length;
    const failedUploads = totalDocuments - successfulUploads;

    console.log(`Uploaded ${successfulUploads}/${totalDocuments} documents successfully`);

    return {
      success: failedUploads === 0,
      results: uploadResults,
      successCount: successfulUploads,
      failCount: failedUploads,
      message: `${successfulUploads}/${totalDocuments} documents uploaded successfully`
    };
  } catch (error) {
    console.error('Error uploading multiple documents:', error);
    return {
      success: false,
      error: error.message,
      message: 'Failed to upload documents'
    };
  }
};

/**
 * Helper function to generate a sanitized document name
 * @param {string} baseName - Base name for the document
 * @param {string} extension - File extension (e.g., 'pdf', 'docx')
 * @param {Date} date - Optional date to include in filename
 * @returns {string} - Sanitized document name
 */
export const generateDocumentName = (baseName, extension, date = new Date()) => {
  const timestamp = date.toISOString().split('T')[0]; // YYYY-MM-DD
  const sanitizedBaseName = baseName
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '');

  return `${sanitizedBaseName}_${timestamp}.${extension}`;
};
