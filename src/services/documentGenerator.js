/**
 * Document Generator Service
 * Generates documents from DOCX or PDF templates
 */

import { getTemplatePath, getTemplateName } from './pdfTemplateConfig';
import { templateExists, generateFromPDFTemplate } from './pdfTemplateService';
import { getDOCXTemplatePath, getDOCXTemplateName } from './docxTemplateConfig';
import { docxTemplateExists, generateFromDOCXTemplate } from './docxTemplateService';


/**
 * Generate Living Trust document
 * @param {Object} formData - Complete form data
 * @returns {jsPDF|Blob} PDF document (jsPDF for JS templates, Blob for PDF templates)
 */
export const generateLivingTrust = async (formData) => {
  console.log('=== DEBUG: generateLivingTrust ===');
  console.log('formData.trustType:', formData.trustType);
  console.log('formData:', formData);

  // Add currentDate if not present
  if (!formData.currentDate) {
    const today = new Date();
    const months = ['January', 'February', 'March', 'April', 'May', 'June',
                   'July', 'August', 'September', 'October', 'November', 'December'];
    formData.currentDate = `${months[today.getMonth()]} ${today.getDate()}, ${today.getFullYear()}`;
  }

  // STEP 1: Try to use DOCX template first
  try {
    const docxPath = getDOCXTemplatePath(formData, false); // false = Living Trust only
    console.log('Checking for DOCX template at:', docxPath);

    const docxExists = await docxTemplateExists(docxPath);
    console.log('DOCX template exists:', docxExists);

    if (docxExists) {
      console.log('Using DOCX template system for Living Trust');
      const filledDOCX = await generateFromDOCXTemplate(formData, docxPath);
      console.log('DOCX template filled successfully');
      return filledDOCX;
    } else {
      console.log('DOCX template not found, checking for PDF template...');
    }
  } catch (error) {
    console.warn('Error with DOCX template, trying PDF template:', error);
  }

  // STEP 2: Try to use PDF template if DOCX not found
  try {
    const templatePath = getTemplatePath(formData, false); // false = Living Trust only
    console.log('Checking for PDF template at:', templatePath);

    const pdfTemplateExists = await templateExists(templatePath);
    console.log('PDF template exists:', pdfTemplateExists);

    if (pdfTemplateExists) {
      console.log('Using PDF template system for Living Trust');
      const filledPDF = await generateFromPDFTemplate(formData, templatePath);

      if (filledPDF !== null) {
        console.log('PDF template filled successfully');
        return filledPDF;
      } else {
        console.error('PDF template has no form fields - cannot use PDF template');
        throw new Error('PDF template has no form fields. Please use DOCX templates or add form fields to PDF.');
      }
    }
  } catch (error) {
    console.error('Error with PDF template:', error);
  }

  // STEP 3: No template found - throw error
  const isJoint = formData.isJoint || formData.trustType === 'joint';
  const templateType = isJoint ? 'Joint' : 'Single';

  throw new Error(
    `No template found for ${templateType} Living Trust.\n\n` +
    'Please upload one of the following:\n' +
    `- ${templateType.toLowerCase()}_living_trust_template.docx (recommended)\n` +
    `- ${templateType.toLowerCase()}_living_trust_template.pdf (with form fields)\n\n` +
    'See HOW_TO_CREATE_DOCX_TEMPLATES.md for instructions.'
  );
};


/**
 * Generate Complete Estate Planning Package (All documents in one PDF)
 * @param {Object} formData - Complete form data
 * @returns {jsPDF|Blob} Single PDF with all documents (jsPDF for JS templates, Blob for PDF templates)
 */
export const generateCompleteEstatePlanningPackage = async (formData) => {
  console.log('=== Generating Complete Estate Planning Package ===');

  // Add currentDate if not present
  if (!formData.currentDate) {
    const today = new Date();
    const months = ['January', 'February', 'March', 'April', 'May', 'June',
                   'July', 'August', 'September', 'October', 'November', 'December'];
    formData.currentDate = `${months[today.getMonth()]} ${today.getDate()}, ${today.getFullYear()}`;
  }

  // STEP 1: Try to use DOCX template first
  try {
    const docxPath = getDOCXTemplatePath(formData, true); // true = Complete Estate Plan
    console.log('Checking for DOCX template at:', docxPath);

    const docxExists = await docxTemplateExists(docxPath);
    console.log('DOCX template exists:', docxExists);

    if (docxExists) {
      console.log('Using DOCX template system for Complete Estate Plan');
      const filledDOCX = await generateFromDOCXTemplate(formData, docxPath);
      console.log('DOCX template filled successfully');
      return filledDOCX;
    } else {
      console.log('DOCX template not found, checking for PDF template...');
    }
  } catch (error) {
    console.warn('Error with DOCX template, trying PDF template:', error);
  }

  // STEP 2: Try to use PDF template if DOCX not found
  try {
    const templatePath = getTemplatePath(formData, true); // true = Complete Estate Plan
    console.log('Checking for PDF template at:', templatePath);

    const pdfTemplateExists = await templateExists(templatePath);
    console.log('PDF template exists:', pdfTemplateExists);

    if (pdfTemplateExists) {
      console.log('Using PDF template system for Complete Estate Plan');
      const filledPDF = await generateFromPDFTemplate(formData, templatePath);

      if (filledPDF !== null) {
        console.log('PDF template filled successfully');
        return filledPDF;
      } else {
        console.error('PDF template has no form fields - cannot use PDF template');
        throw new Error('PDF template has no form fields. Please use DOCX templates or add form fields to PDF.');
      }
    }
  } catch (error) {
    console.error('Error with PDF template:', error);
  }

  // STEP 3: No template found - throw error
  const isJoint = formData.isJoint || formData.trustType === 'joint';
  const templateType = isJoint ? 'Joint' : 'Single';

  throw new Error(
    `No template found for ${templateType} Estate Planning Package.\n\n` +
    'Please upload one of the following:\n' +
    `- ${templateType.toLowerCase()}_estate_planning_template.docx (recommended)\n` +
    `- ${templateType.toLowerCase()}_estate_planning_template.pdf (with form fields)\n\n` +
    'See HOW_TO_CREATE_DOCX_TEMPLATES.md for instructions.'
  );
};


/**
 * Download a PDF document
 * @param {jsPDF|Blob} doc - PDF document (jsPDF object or Blob)
 * @param {string} filename - Filename for download
 */
export const downloadDocument = (doc, filename) => {
  try {
    // Check if doc is a Blob
    if (doc instanceof Blob) {
      // Create a temporary URL for the Blob and download it
      const url = URL.createObjectURL(doc);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } else {
      // Assume it's a jsPDF object with .save() method
      doc.save(filename);
    }
  } catch (error) {
    console.error('Error downloading document:', error);
    throw error;
  }
};
