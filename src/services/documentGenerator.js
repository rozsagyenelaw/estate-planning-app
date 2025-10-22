/**
 * Document Generator Service
 * Generates PDF documents from form data using template engine
 */

import jsPDF from 'jspdf';
import { formatDate, formatPhoneNumber } from '../utils/formatters';
import { DOCUMENT_TYPES } from '../utils/constants';
import { processTemplate, prepareTemplateData } from './templateEngine';
import { singleLivingTrustTemplate } from '../templates/singleLivingTrust';
import { jointLivingTrustTemplate } from '../templates/jointLivingTrust';
import { singleIrrevocableTrustTemplate } from '../templates/singleIrrevocableTrust';
import { jointIrrevocableTrustTemplate } from '../templates/jointIrrevocableTrust';
import { pourOverWillTemplate } from '../templates/pourOverWill';
import { durablePowerOfAttorneyTemplate } from '../templates/durablePowerOfAttorney';
import { advancedHealthcareDirectiveTemplate } from '../templates/advancedHealthcareDirective';
import { hipaaAuthorizationTemplate } from '../templates/hipaaAuthorization';
import { certificateOfTrustTemplate } from '../templates/certificateOfTrust';
import { trusteeAffidavitTemplate } from '../templates/trusteeAffidavit';
import { personalPropertyAssignmentTemplate } from '../templates/personalPropertyAssignment';
import { personalPropertyMemorandumTemplate } from '../templates/personalPropertyMemorandum';
import { memorialInstructionsTemplate } from '../templates/memorialInstructions';
import { confirmationOfNamesTemplate } from '../templates/confirmationOfNames';
import { estatePlanningCoverPageTemplate } from '../templates/estatePlanningCoverPage';
import { tableOfContentsTemplate } from '../templates/tableOfContents';

/**
 * Add a professional cover page to the PDF
 * @param {jsPDF} doc - jsPDF document instance
 * @param {Object} formData - Form data with client information
 * @param {string} documentTitle - Title of the document
 */
const addCoverPage = (doc, formData, documentTitle) => {
  // Cover page with centered text
  doc.setFont('times', 'bold');
  doc.setFontSize(18);

  const pageWidth = 8.5;
  let yPos = 3.5; // Start 3.5 inches from top

  // Trust name (uppercase) with date
  const trustName = `THE ${formData.client.firstName.toUpperCase()} ${formData.client.lastName.toUpperCase()} LIVING TRUST DATED ${formData.currentDate.toUpperCase()}`;

  // Split into multiple lines if too long
  const trustLines = doc.splitTextToSize(trustName, 6.5);
  for (let line of trustLines) {
    doc.text(line, pageWidth / 2, yPos, { align: 'center' });
    yPos += 0.3;
  }

  yPos += 0.3;

  yPos += 0.8;

  // Client name
  doc.setFont('times', 'normal');
  doc.setFontSize(14);
  doc.text(`${formData.client.firstName} ${formData.client.lastName}`, pageWidth / 2, yPos, { align: 'center' });

  // Footer - Prepared by
  doc.setFont('times', 'normal');
  doc.setFontSize(12);
  yPos = 9.5; // Near bottom of page
  doc.text('Prepared by:', pageWidth / 2, yPos, { align: 'center' });

  yPos += 0.25;
  doc.setFont('times', 'bold');
  doc.text('LAW OFFICES OF ROZSA GYENE, PC', pageWidth / 2, yPos, { align: 'center' });

  yPos += 0.2;
  doc.setFont('times', 'normal');
  doc.setFontSize(11);
  doc.text('450 N Brand Blvd, Suite 623', pageWidth / 2, yPos, { align: 'center' });

  yPos += 0.2;
  doc.text('Glendale, California 91203', pageWidth / 2, yPos, { align: 'center' });

  // Add a new page for the document content
  doc.addPage();
};

/**
 * Helper function to generate PDF from plain text (for old template system)
 * @param {string} textContent - Plain text content from template
 * @param {string} documentTitle - Title for the document
 * @param {Object} formData - Form data (for cover page)
 * @returns {jsPDF} PDF document
 */
const generatePDFFromText = (textContent, documentTitle, formData = null) => {
  try {
    console.log('generatePDFFromText called');
    console.log('Text content length:', textContent.length);

    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'in',
      format: 'letter'
    });

    // Add cover page if formData is provided
    if (formData) {
      addCoverPage(doc, formData, documentTitle);
    }

    // Page settings
    const pageWidth = 8.5;
    const pageHeight = 11;
    const marginLeft = 1.0;
    const marginRight = 1.0;
    const marginTop = 1.0;
    const marginBottom = 1.0;
    const contentWidth = pageWidth - marginLeft - marginRight;
    const baseLineHeight = 0.17;

    let currentY = marginTop;

    // Split content into lines
    const lines = textContent.split('\n');
    console.log('Processing', lines.length, 'lines with formatting...');

    const addPageNumber = () => {
      const pageNum = doc.internal.getNumberOfPages();
      doc.setFont('times', 'normal');
      doc.setFontSize(10);
      doc.text(`Page ${pageNum}`, pageWidth / 2, pageHeight - 0.5, { align: 'center' });
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      // Check for page break (leave room for footer)
      if (currentY > pageHeight - marginBottom - 0.3) {
        addPageNumber();
        doc.addPage();
        currentY = marginTop;
      }

      // Skip empty lines but add small spacing
      if (!line) {
        currentY += baseLineHeight * 0.5;
        continue;
      }

      // Detect Article headers (e.g., "Article One", "Article Two")
      if (line.match(/^Article (One|Two|Three|Four|Five|Six|Seven|Eight|Nine|Ten|Eleven|Twelve|Thirteen)$/)) {
        currentY += baseLineHeight * 1.5; // Extra space before article
        doc.setFont('times', 'bold');
        doc.setFontSize(14);
        doc.text(line, marginLeft, currentY);
        currentY += baseLineHeight * 1.2;
        doc.setFont('times', 'normal');
        doc.setFontSize(12);
        continue;
      }

      // Detect Section headers (e.g., "Section 1.01")
      if (line.match(/^Section \d+\.\d+/)) {
        currentY += baseLineHeight * 0.8;
        doc.setFont('times', 'bold');
        doc.setFontSize(12);
        const wrappedSection = doc.splitTextToSize(line, contentWidth);
        for (let w of wrappedSection) {
          if (currentY > pageHeight - marginBottom - 0.3) {
            addPageNumber();
            doc.addPage();
            currentY = marginTop;
          }
          doc.text(w, marginLeft, currentY);
          currentY += baseLineHeight;
        }
        doc.setFont('times', 'normal');
        continue;
      }

      // Detect subsections with (a), (b), etc.
      if (line.match(/^\s*\([a-z]\)\s+/)) {
        const wrappedSub = doc.splitTextToSize(line, contentWidth - 0.3);
        for (let w of wrappedSub) {
          if (currentY > pageHeight - marginBottom - 0.3) {
            addPageNumber();
            doc.addPage();
            currentY = marginTop;
          }
          doc.text(w, marginLeft + 0.3, currentY);
          currentY += baseLineHeight;
        }
        continue;
      }

      // Regular paragraphs
      doc.setFont('times', 'normal');
      doc.setFontSize(12);
      const wrapped = doc.splitTextToSize(line, contentWidth);
      for (let w of wrapped) {
        if (currentY > pageHeight - marginBottom - 0.3) {
          addPageNumber();
          doc.addPage();
          currentY = marginTop;
        }
        doc.text(w, marginLeft, currentY);
        currentY += baseLineHeight;
      }
    }

    // Add page number to last page
    addPageNumber();

    console.log('PDF generation complete');
    console.log('Total pages:', doc.internal.getNumberOfPages());

    return doc;
  } catch (error) {
    console.error(`CRITICAL ERROR generating ${documentTitle}:`, error);
    console.error('Error stack:', error.stack);

    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text(documentTitle.toUpperCase(), 4.25, 1, { align: 'center' });
    doc.setFontSize(12);
    doc.text(`Error: Failed to generate document.`, 1, 2);
    doc.setFontSize(10);
    doc.text(`Error details: ${error.message}`, 1, 2.5);

    return doc;
  }
};

/**
 * Helper function to generate PDF from HTML template
 * @param {string} htmlContent - HTML content from template
 * @param {string} documentTitle - Title for fallback PDF
 * @returns {jsPDF} PDF document
 */
const generatePDFFromHTML = async (htmlContent, documentTitle) => {
  try {
    console.log('generatePDFFromHTML called');
    console.log('HTML content length:', htmlContent.length);
    console.log('First 500 chars of HTML:', htmlContent.substring(0, 500));

    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'in',
      format: 'letter'
    });

    console.log('jsPDF created, calling doc.html()...');

    await new Promise((resolve, reject) => {
      doc.html(htmlContent, {
        callback: (doc) => {
          console.log('PDF callback executed successfully');
          console.log('PDF page count:', doc.internal.getNumberOfPages());
          resolve(doc);
        },
        x: 0.5,
        y: 0.5,
        width: 7.5, // 8.5 - 1 inch margins
        windowWidth: 720, // 7.5 inches * 96 DPI
        html2canvas: {
          scale: 0.264583, // 72 DPI / 272 DPI for proper text rendering
          logging: true,
          useCORS: true
        }
      });
    });

    console.log('PDF generation complete');
    return doc;
  } catch (error) {
    console.error(`CRITICAL ERROR generating ${documentTitle}:`, error);
    console.error('Error stack:', error.stack);

    // Fallback to simple text document if HTML conversion fails
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text(documentTitle.toUpperCase(), 105, 20, { align: 'center' });
    doc.setFontSize(12);
    doc.text(`Error: Failed to generate document. Please try again.`, 20, 40);
    doc.setFontSize(10);
    doc.text(`Error details: ${error.message}`, 20, 60);

    return doc;
  }
};

/**
 * Generate Living Trust document
 * @param {Object} formData - Complete form data
 * @returns {jsPDF} PDF document
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

  // For single living trust, use the old system (function-based template)
  let content;
  if (formData.trustType === 'single' || !formData.trustType) {
    console.log('Using OLD SYSTEM: singleLivingTrustTemplate is a function');

    // Call the template function with formData directly
    content = singleLivingTrustTemplate(formData);

    console.log('Template function returned content length:', content.length);
    console.log('First 200 chars:', content.substring(0, 200));
  } else {
    // For other trust types, use the new system (placeholder-based templates)
    console.log('Using NEW SYSTEM: placeholder-based template');

    const templateData = prepareTemplateData(formData);
    let template;

    switch (formData.trustType) {
      case 'joint':
        template = jointLivingTrustTemplate;
        break;
      case 'single_irrevocable':
        template = singleIrrevocableTrustTemplate;
        break;
      case 'joint_irrevocable':
        template = jointIrrevocableTrustTemplate;
        break;
      default:
        template = formData.isJoint ? jointLivingTrustTemplate : singleLivingTrustTemplate;
    }

    content = processTemplate(template, templateData);
  }

  console.log('Final content length:', content.length);

  // Determine document title
  const isIrrevocable = formData.trustType === 'single_irrevocable' || formData.trustType === 'joint_irrevocable';
  const docTitle = isIrrevocable ? 'Irrevocable Trust' : 'Living Trust';

  // For old system (plain text), use direct text-to-PDF conversion
  if (formData.trustType === 'single' || !formData.trustType) {
    console.log('Using text-based PDF generation (no HTML)...');
    return generatePDFFromText(content, docTitle, formData);
  }

  // For new system, use HTML-based PDF generation
  console.log('Using HTML-based PDF generation...');
  return generatePDFFromHTML(content, docTitle);
};

/**
 * Generate Trust Certificate
 * @param {Object} formData - Complete form data
 * @returns {jsPDF} PDF document
 */
export const generateTrustCertificate = async (formData) => {
  const templateData = prepareTemplateData(formData);
  const template = certificateOfTrustTemplate();
  const processedHtml = processTemplate(template, templateData);
  return generatePDFFromHTML(processedHtml, 'Certificate of Trust');
};

/**
 * Generate Pour Over Will (Client)
 * @param {Object} formData - Complete form data
 * @returns {jsPDF} PDF document
 */
export const generatePourOverWill = async (formData, personType = 'client') => {
  const templateData = prepareTemplateData(formData);
  const template = pourOverWillTemplate(personType);
  const processedHtml = processTemplate(template, templateData);
  return generatePDFFromHTML(processedHtml, `Pour Over Will - ${personType === 'client' ? 'Client' : 'Spouse'}`);
};

/**
 * Generate Durable Power of Attorney
 * @param {Object} formData - Complete form data
 * @param {string} personType - 'client' or 'spouse'
 * @returns {jsPDF} PDF document
 */
export const generateDurablePOA = async (formData, personType = 'client') => {
  const templateData = prepareTemplateData(formData);
  const template = durablePowerOfAttorneyTemplate(personType);
  const processedHtml = processTemplate(template, templateData);
  return generatePDFFromHTML(processedHtml, `Durable POA - ${personType === 'client' ? 'Client' : 'Spouse'}`);
};

/**
 * Generate Advanced Healthcare Directive
 * @param {Object} formData - Complete form data
 * @param {string} personType - 'client' or 'spouse'
 * @returns {jsPDF} PDF document
 */
export const generateHealthcareDirective = async (formData, personType = 'client') => {
  const templateData = prepareTemplateData(formData);
  const template = advancedHealthcareDirectiveTemplate(personType);
  const processedHtml = processTemplate(template, templateData);
  return generatePDFFromHTML(processedHtml, `Healthcare Directive - ${personType === 'client' ? 'Client' : 'Spouse'}`);
};

/**
 * Generate HIPAA Authorization
 * @param {Object} formData - Complete form data
 * @param {string} personType - 'client' or 'spouse'
 * @returns {jsPDF} PDF document
 */
export const generateHIPAAAuthorization = async (formData, personType = 'client') => {
  const templateData = prepareTemplateData(formData);
  const template = hipaaAuthorizationTemplate(personType);
  const processedHtml = processTemplate(template, templateData);
  return generatePDFFromHTML(processedHtml, `HIPAA Authorization - ${personType === 'client' ? 'Client' : 'Spouse'}`);
};

/**
 * Generate Trustee Affidavit
 * @param {Object} formData - Complete form data
 * @returns {jsPDF} PDF document
 */
export const generateTrusteeAffidavit = async (formData) => {
  const templateData = prepareTemplateData(formData);
  const template = trusteeAffidavitTemplate();
  const processedHtml = processTemplate(template, templateData);
  return generatePDFFromHTML(processedHtml, 'Trustee Affidavit');
};

/**
 * Generate Personal Property Assignment
 * @param {Object} formData - Complete form data
 * @param {string} personType - 'client' or 'spouse'
 * @returns {jsPDF} PDF document
 */
export const generatePersonalPropertyAssignment = async (formData, personType = 'client') => {
  const templateData = prepareTemplateData(formData);
  const template = personalPropertyAssignmentTemplate(personType);
  const processedHtml = processTemplate(template, templateData);
  return generatePDFFromHTML(processedHtml, `Personal Property Assignment - ${personType === 'client' ? 'Client' : 'Spouse'}`);
};

/**
 * Generate Personal Property Memorandum
 * @param {Object} formData - Complete form data
 * @param {string} personType - 'client' or 'spouse'
 * @returns {jsPDF} PDF document
 */
export const generatePersonalPropertyMemorandum = async (formData, personType = 'client') => {
  const templateData = prepareTemplateData(formData);
  const template = personalPropertyMemorandumTemplate(personType);
  const processedHtml = processTemplate(template, templateData);
  return generatePDFFromHTML(processedHtml, `Personal Property Memorandum - ${personType === 'client' ? 'Client' : 'Spouse'}`);
};

/**
 * Generate Memorial Instructions
 * @param {Object} formData - Complete form data
 * @param {string} personType - 'client' or 'spouse'
 * @returns {jsPDF} PDF document
 */
export const generateMemorialInstructions = async (formData, personType = 'client') => {
  const templateData = prepareTemplateData(formData);
  const template = memorialInstructionsTemplate(personType);
  const processedHtml = processTemplate(template, templateData);
  return generatePDFFromHTML(processedHtml, `Memorial Instructions - ${personType === 'client' ? 'Client' : 'Spouse'}`);
};

/**
 * Generate Confirmation of Names and Fiduciaries
 * @param {Object} formData - Complete form data
 * @returns {jsPDF} PDF document
 */
export const generateConfirmationOfNames = async (formData) => {
  const templateData = prepareTemplateData(formData);
  const template = confirmationOfNamesTemplate();
  const processedHtml = processTemplate(template, templateData);
  return generatePDFFromHTML(processedHtml, 'Confirmation of Names and Fiduciaries');
};

/**
 * Generate Estate Planning Portfolio Cover Page
 * @param {Object} formData - Complete form data
 * @returns {jsPDF} PDF document
 */
export const generateEstatePlanningCoverPage = async (formData) => {
  const templateData = prepareTemplateData(formData);
  const template = estatePlanningCoverPageTemplate();
  const processedHtml = processTemplate(template, templateData);
  return generatePDFFromHTML(processedHtml, 'Estate Planning Portfolio Cover Page');
};

/**
 * Generate Table of Contents
 * @param {Object} formData - Complete form data
 * @returns {jsPDF} PDF document
 */
export const generateTableOfContents = async (formData) => {
  const templateData = prepareTemplateData(formData);
  const template = tableOfContentsTemplate();
  const processedHtml = processTemplate(template, templateData);
  return generatePDFFromHTML(processedHtml, 'Table of Contents');
};

/**
 * Generate all estate planning documents
 * @param {Object} formData - Complete form data
 * @returns {Array<{name: string, doc: jsPDF}>} Array of generated documents
 */
export const generateAllDocuments = async (formData) => {
  const documents = [];
  const isJoint = formData.isJoint;

  try {
    // 1. Generate Cover Page
    const coverPage = await generateEstatePlanningCoverPage(formData);
    documents.push({
      name: '01_Estate_Planning_Portfolio_Cover_Page.pdf',
      doc: coverPage,
    });

    // 2. Generate Table of Contents
    const tableOfContents = await generateTableOfContents(formData);
    documents.push({
      name: '02_Table_of_Contents.pdf',
      doc: tableOfContents,
    });

    // 3. Generate Living Trust (one document for single or joint)
    const livingTrust = await generateLivingTrust(formData);
    documents.push({
      name: '03_Living_Trust.pdf',
      doc: livingTrust,
    });

    // 4. Generate Certificate of Trust (one document for single or joint)
    const trustCert = await generateTrustCertificate(formData);
    documents.push({
      name: '04_Certificate_of_Trust.pdf',
      doc: trustCert,
    });

    // 5. Generate Trustee Affidavit (one document for single or joint)
    const trusteeAffidavit = await generateTrusteeAffidavit(formData);
    documents.push({
      name: '05_Trustee_Affidavit.pdf',
      doc: trusteeAffidavit,
    });

    // 6. Generate Confirmation of Names (ONE document for single or joint)
    const confirmationOfNames = await generateConfirmationOfNames(formData);
    documents.push({
      name: '06_Confirmation_of_Names_and_Fiduciaries.pdf',
      doc: confirmationOfNames,
    });

    // For joint trusts, generate separate documents for each spouse
    if (isJoint) {
      // CLIENT DOCUMENTS
      // 7a. Pour Over Will - Client
      const pourOverWillClient = await generatePourOverWill(formData, 'client');
      documents.push({
        name: '07_Pour_Over_Will_Client.pdf',
        doc: pourOverWillClient,
      });

      // 8a. Durable POA - Client
      const durablePOAClient = await generateDurablePOA(formData, 'client');
      documents.push({
        name: '08_Durable_Power_of_Attorney_Client.pdf',
        doc: durablePOAClient,
      });

      // 9a. Healthcare Directive - Client
      const healthcareDirectiveClient = await generateHealthcareDirective(formData, 'client');
      documents.push({
        name: '09_Advanced_Healthcare_Directive_Client.pdf',
        doc: healthcareDirectiveClient,
      });

      // 10a. HIPAA Authorization - Client
      const hipaaClient = await generateHIPAAAuthorization(formData, 'client');
      documents.push({
        name: '10_HIPAA_Authorization_Client.pdf',
        doc: hipaaClient,
      });

      // SPOUSE DOCUMENTS
      // 11b. Pour Over Will - Spouse
      const pourOverWillSpouse = await generatePourOverWill(formData, 'spouse');
      documents.push({
        name: '11_Pour_Over_Will_Spouse.pdf',
        doc: pourOverWillSpouse,
      });

      // 12b. Durable POA - Spouse
      const durablePOASpouse = await generateDurablePOA(formData, 'spouse');
      documents.push({
        name: '12_Durable_Power_of_Attorney_Spouse.pdf',
        doc: durablePOASpouse,
      });

      // 13b. Healthcare Directive - Spouse
      const healthcareDirectiveSpouse = await generateHealthcareDirective(formData, 'spouse');
      documents.push({
        name: '13_Advanced_Healthcare_Directive_Spouse.pdf',
        doc: healthcareDirectiveSpouse,
      });

      // 14b. HIPAA Authorization - Spouse
      const hipaaSpouse = await generateHIPAAAuthorization(formData, 'spouse');
      documents.push({
        name: '14_HIPAA_Authorization_Spouse.pdf',
        doc: hipaaSpouse,
      });

      // 15a. Personal Property Assignment - Client
      const propAssignmentClient = await generatePersonalPropertyAssignment(formData, 'client');
      documents.push({
        name: '15_Personal_Property_Assignment_Client.pdf',
        doc: propAssignmentClient,
      });

      // 16b. Personal Property Assignment - Spouse
      const propAssignmentSpouse = await generatePersonalPropertyAssignment(formData, 'spouse');
      documents.push({
        name: '16_Personal_Property_Assignment_Spouse.pdf',
        doc: propAssignmentSpouse,
      });

      // 17a. Personal Property Memorandum - Client
      const propMemoClient = await generatePersonalPropertyMemorandum(formData, 'client');
      documents.push({
        name: '17_Personal_Property_Memorandum_Client.pdf',
        doc: propMemoClient,
      });

      // 18b. Personal Property Memorandum - Spouse
      const propMemoSpouse = await generatePersonalPropertyMemorandum(formData, 'spouse');
      documents.push({
        name: '18_Personal_Property_Memorandum_Spouse.pdf',
        doc: propMemoSpouse,
      });

      // 19a. Memorial Instructions - Client
      const memorialClient = await generateMemorialInstructions(formData, 'client');
      documents.push({
        name: '19_Memorial_Instructions_Client.pdf',
        doc: memorialClient,
      });

      // 20b. Memorial Instructions - Spouse
      const memorialSpouse = await generateMemorialInstructions(formData, 'spouse');
      documents.push({
        name: '20_Memorial_Instructions_Spouse.pdf',
        doc: memorialSpouse,
      });
    } else {
      // For single trusts, generate one set of documents
      // 7. Pour Over Will
      const pourOverWill = await generatePourOverWill(formData, 'client');
      documents.push({
        name: '07_Pour_Over_Will.pdf',
        doc: pourOverWill,
      });

      // 8. Durable POA
      const durablePOA = await generateDurablePOA(formData, 'client');
      documents.push({
        name: '08_Durable_Power_of_Attorney.pdf',
        doc: durablePOA,
      });

      // 9. Healthcare Directive
      const healthcareDirective = await generateHealthcareDirective(formData, 'client');
      documents.push({
        name: '09_Advanced_Healthcare_Directive.pdf',
        doc: healthcareDirective,
      });

      // 10. HIPAA Authorization
      const hipaa = await generateHIPAAAuthorization(formData, 'client');
      documents.push({
        name: '10_HIPAA_Authorization.pdf',
        doc: hipaa,
      });

      // 11. Personal Property Assignment
      const propAssignment = await generatePersonalPropertyAssignment(formData, 'client');
      documents.push({
        name: '11_Personal_Property_Assignment.pdf',
        doc: propAssignment,
      });

      // 12. Personal Property Memorandum
      const propMemo = await generatePersonalPropertyMemorandum(formData, 'client');
      documents.push({
        name: '12_Personal_Property_Memorandum.pdf',
        doc: propMemo,
      });

      // 13. Memorial Instructions
      const memorial = await generateMemorialInstructions(formData, 'client');
      documents.push({
        name: '13_Memorial_Instructions.pdf',
        doc: memorial,
      });
    }

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
