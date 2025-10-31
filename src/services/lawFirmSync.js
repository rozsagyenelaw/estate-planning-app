/**
 * Law Firm Management App Sync Service
 * Syncs estate planning clients to the law firm management database
 * One-way sync: Estate Planning → Law Firm Management
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';

// Law Firm Management Firebase Config
const lawFirmConfig = {
  apiKey: import.meta.env.VITE_LAWFIRM_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_LAWFIRM_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_LAWFIRM_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_LAWFIRM_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_LAWFIRM_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_LAWFIRM_FIREBASE_APP_ID,
};

// Initialize secondary Firebase app for law firm database
let lawFirmApp;
let lawFirmDb;

const isLawFirmConfigured = () => {
  return lawFirmConfig.apiKey &&
         lawFirmConfig.authDomain &&
         lawFirmConfig.projectId;
};

if (isLawFirmConfigured()) {
  try {
    lawFirmApp = initializeApp(lawFirmConfig, 'lawFirmApp'); // Named app instance
    lawFirmDb = getFirestore(lawFirmApp);
    console.log('Law Firm Management sync initialized successfully');
  } catch (error) {
    console.error('Error initializing Law Firm sync:', error);
  }
} else {
  console.warn('Law Firm sync not configured. Set VITE_LAWFIRM_* environment variables to enable sync.');
}

/**
 * Map estate planning client data to law firm format
 * @param {Object} estatePlanningClient - Client data from estate planning app
 * @returns {Object} - Client data formatted for law firm management app
 */
const mapClientToLawFirmFormat = (estatePlanningClient) => {
  const { client, spouse, isJoint, trustType, trustName, children } = estatePlanningClient;

  // Build client name
  let name = `${client.firstName || ''} ${client.lastName || ''}`.trim();
  if (isJoint && spouse) {
    name += ` & ${spouse.firstName || ''} ${spouse.lastName || ''}`.trim();
  }

  // Build address string
  const address = [
    client.address,
    client.city,
    client.state,
    client.zip
  ].filter(Boolean).join(', ');

  // Build notes with estate planning details
  const notes = [
    'Created from Estate Planning App',
    trustName ? `Trust: ${trustName}` : null,
    isJoint || trustType === 'joint' ? 'Type: Joint Trust' : 'Type: Single Trust',
    children && children.length > 0 ? `Children: ${children.length}` : null
  ].filter(Boolean).join('\n');

  return {
    id: estatePlanningClient.clientId,
    name,
    email: client.email || '',
    phone: client.phone || '',
    address,
    category: 'estate-planning',
    notes,
    createdAt: estatePlanningClient.createdAt || new Date().toISOString(),
    tasks: [],
    documents: [],
    events: []
  };
};

/**
 * Sync client to law firm management database (create or update)
 * @param {Object} estatePlanningClient - Client data from estate planning app
 * @returns {Promise<Object>} - Result object
 */
export const syncClientToLawFirm = async (estatePlanningClient) => {
  if (!lawFirmDb) {
    console.warn('Law Firm sync not configured, skipping sync');
    return { success: false, error: 'Law Firm sync not configured' };
  }

  try {
    const lawFirmClient = mapClientToLawFirmFormat(estatePlanningClient);

    console.log('Syncing client to Law Firm Management:', lawFirmClient.name);

    // Write to law firm management database
    await setDoc(doc(lawFirmDb, 'clients', lawFirmClient.id), lawFirmClient);

    console.log('✅ Client synced to Law Firm Management successfully');

    return {
      success: true,
      message: 'Client synced to Law Firm Management',
      lawFirmClientId: lawFirmClient.id
    };
  } catch (error) {
    console.error('Error syncing client to Law Firm Management:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * Update client in law firm management database
 * @param {string} clientId - Client ID
 * @param {Object} estatePlanningClient - Updated client data
 * @returns {Promise<Object>} - Result object
 */
export const updateClientInLawFirm = async (clientId, estatePlanningClient) => {
  if (!lawFirmDb) {
    console.warn('Law Firm sync not configured, skipping update');
    return { success: false, error: 'Law Firm sync not configured' };
  }

  try {
    const lawFirmClient = mapClientToLawFirmFormat(estatePlanningClient);

    console.log('Updating client in Law Firm Management:', lawFirmClient.name);

    // Update in law firm management database
    await updateDoc(doc(lawFirmDb, 'clients', clientId), lawFirmClient);

    console.log('✅ Client updated in Law Firm Management successfully');

    return {
      success: true,
      message: 'Client updated in Law Firm Management'
    };
  } catch (error) {
    console.error('Error updating client in Law Firm Management:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * Delete client from law firm management database
 * (Optional - you may not want to auto-delete from law firm app)
 * @param {string} clientId - Client ID
 * @returns {Promise<Object>} - Result object
 */
export const deleteClientFromLawFirm = async (clientId) => {
  if (!lawFirmDb) {
    console.warn('Law Firm sync not configured, skipping delete');
    return { success: false, error: 'Law Firm sync not configured' };
  }

  try {
    console.log('Deleting client from Law Firm Management:', clientId);

    await deleteDoc(doc(lawFirmDb, 'clients', clientId));

    console.log('✅ Client deleted from Law Firm Management successfully');

    return {
      success: true,
      message: 'Client deleted from Law Firm Management'
    };
  } catch (error) {
    console.error('Error deleting client from Law Firm Management:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

export { lawFirmDb };
