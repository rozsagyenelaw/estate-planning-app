/**
 * Document Generator Service
 * Generates PDF documents from form data
 */

import jsPDF from 'jspdf';
import { formatDate, formatPhoneNumber } from '../utils/formatters';
import { DOCUMENT_TYPES } from '../utils/constants';

/**
 * Generate Living Trust document
 * @param {Object} formData - Complete form data
 * @returns {jsPDF} PDF document
 */
export const generateLivingTrust = async (formData) => {
  const doc = new jsPDF();

  // This is a placeholder implementation
  // Will be replaced with actual document templates

  doc.setFontSize(20);
  doc.text('LIVING TRUST', 105, 20, { align: 'center' });

  doc.setFontSize(12);
  doc.text(`Trust Name: ${formData.trustName || 'N/A'}`, 20, 40);
  doc.text(`Trustor: ${formData.client.name || 'N/A'}`, 20, 50);
  doc.text(`Date: ${formatDate(formData.client.notaryDate)}`, 20, 60);

  doc.setFontSize(10);
  doc.text('This is a placeholder document.', 20, 80);
  doc.text('Actual trust templates will be added based on your requirements.', 20, 90);

  return doc;
};

/**
 * Generate Trust Certificate
 * @param {Object} formData - Complete form data
 * @returns {jsPDF} PDF document
 */
export const generateTrustCertificate = async (formData) => {
  const doc = new jsPDF();

  doc.setFontSize(20);
  doc.text('TRUST CERTIFICATE', 105, 20, { align: 'center' });

  doc.setFontSize(12);
  doc.text('This is a placeholder for the Trust Certificate.', 20, 40);

  return doc;
};

/**
 * Generate Pour Over Will
 * @param {Object} formData - Complete form data
 * @returns {jsPDF} PDF document
 */
export const generatePourOverWill = async (formData) => {
  const doc = new jsPDF();

  doc.setFontSize(20);
  doc.text('POUR OVER WILL', 105, 20, { align: 'center' });

  doc.setFontSize(12);
  doc.text('This is a placeholder for the Pour Over Will.', 20, 40);

  return doc;
};

/**
 * Generate Durable Power of Attorney
 * @param {Object} formData - Complete form data
 * @returns {jsPDF} PDF document
 */
export const generateDurablePOA = async (formData) => {
  const doc = new jsPDF();

  doc.setFontSize(20);
  doc.text('DURABLE POWER OF ATTORNEY', 105, 20, { align: 'center' });

  doc.setFontSize(12);
  doc.text('This is a placeholder for the Durable Power of Attorney.', 20, 40);

  return doc;
};

/**
 * Generate Healthcare Power of Attorney
 * @param {Object} formData - Complete form data
 * @returns {jsPDF} PDF document
 */
export const generateHealthcarePOA = async (formData) => {
  const doc = new jsPDF();

  doc.setFontSize(20);
  doc.text('HEALTHCARE POWER OF ATTORNEY', 105, 20, { align: 'center' });

  doc.setFontSize(12);
  doc.text('This is a placeholder for the Healthcare Power of Attorney.', 20, 40);

  return doc;
};

/**
 * Generate Advanced Healthcare Directive
 * @param {Object} formData - Complete form data
 * @returns {jsPDF} PDF document
 */
export const generateHealthcareDirective = async (formData) => {
  const doc = new jsPDF();

  doc.setFontSize(20);
  doc.text('ADVANCED HEALTHCARE DIRECTIVE', 105, 20, { align: 'center' });

  doc.setFontSize(12);
  doc.text('This is a placeholder for the Advanced Healthcare Directive.', 20, 40);

  return doc;
};

/**
 * Generate HIPAA Authorization
 * @param {Object} formData - Complete form data
 * @returns {jsPDF} PDF document
 */
export const generateHIPAAAuthorization = async (formData) => {
  const doc = new jsPDF();

  doc.setFontSize(20);
  doc.text('HIPAA AUTHORIZATION', 105, 20, { align: 'center' });

  doc.setFontSize(12);
  doc.text('This is a placeholder for the HIPAA Authorization.', 20, 40);

  return doc;
};

/**
 * Generate all estate planning documents
 * @param {Object} formData - Complete form data
 * @returns {Array<{name: string, doc: jsPDF}>} Array of generated documents
 */
export const generateAllDocuments = async (formData) => {
  const documents = [];

  try {
    // Generate Living Trust
    const livingTrust = await generateLivingTrust(formData);
    documents.push({
      name: 'Living_Trust.pdf',
      doc: livingTrust,
    });

    // Generate Trust Certificate
    const trustCert = await generateTrustCertificate(formData);
    documents.push({
      name: 'Trust_Certificate.pdf',
      doc: trustCert,
    });

    // Generate Pour Over Will
    const pourOverWill = await generatePourOverWill(formData);
    documents.push({
      name: 'Pour_Over_Will.pdf',
      doc: pourOverWill,
    });

    // Generate Durable POA
    const durablePOA = await generateDurablePOA(formData);
    documents.push({
      name: 'Durable_Power_of_Attorney.pdf',
      doc: durablePOA,
    });

    // Generate Healthcare POA
    const healthcarePOA = await generateHealthcarePOA(formData);
    documents.push({
      name: 'Healthcare_Power_of_Attorney.pdf',
      doc: healthcarePOA,
    });

    // Generate Healthcare Directive
    const healthcareDirective = await generateHealthcareDirective(formData);
    documents.push({
      name: 'Advanced_Healthcare_Directive.pdf',
      doc: healthcareDirective,
    });

    // Generate HIPAA Authorization
    const hipaa = await generateHIPAAAuthorization(formData);
    documents.push({
      name: 'HIPAA_Authorization.pdf',
      doc: hipaa,
    });

    return documents;
  } catch (error) {
    console.error('Error generating documents:', error);
    throw error;
  }
};

/**
 * Download a PDF document
 * @param {jsPDF} doc - PDF document
 * @param {string} filename - Filename for download
 */
export const downloadDocument = (doc, filename) => {
  try {
    doc.save(filename);
  } catch (error) {
    console.error('Error downloading document:', error);
    throw error;
  }
};
