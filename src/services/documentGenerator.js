/**
 * Document Generator Service
 * Generates PDF and Word documents from form data using template engine
 */

import jsPDF from 'jspdf';
import { Document, Packer, Paragraph, TextRun, AlignmentType, HeadingLevel } from 'docx';
import { formatDate, formatPhoneNumber } from '../utils/formatters';
import { DOCUMENT_TYPES } from '../utils/constants';
import { processTemplate, prepareTemplateData } from './templateEngine';
import { getTemplatePath, getTemplateName } from './pdfTemplateConfig';
import { templateExists, generateFromPDFTemplate } from './pdfTemplateService';
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
import { introductionPageTemplate } from '../templates/introductionPage';
import { overviewPageTemplate } from '../templates/overviewPage';
import { revocableLivingTrustSectionPageTemplate } from '../templates/revocableLivingTrustSectionPage';
import { nominationsPageTemplate } from '../templates/nominationsPage';
import { personalInformationPageTemplate } from '../templates/personalInformationPage';
import { fundingInstructionsPageTemplate } from '../templates/fundingInstructionsPage';

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

  // Trust name (uppercase) with date - handle restatements and regular trusts
  let trustName;

  if (formData.isRestatement && formData.originalTrustName) {
    // For restatements, use the original trust name
    trustName = formData.originalTrustName.toUpperCase();
    if (formData.originalTrustDate) {
      trustName += ` DATED ${formData.originalTrustDate.toUpperCase()}`;
    }
  } else if (formData.isJoint || formData.trustType === 'joint') {
    // Joint trust (not restatement)
    trustName = `THE ${formData.client.firstName.toUpperCase()} ${formData.client.lastName.toUpperCase()} AND ${formData.spouse.firstName.toUpperCase()} ${formData.spouse.lastName.toUpperCase()} LIVING TRUST DATED ${formData.currentDate.toUpperCase()}`;
  } else {
    // Single trust (not restatement)
    trustName = `THE ${formData.client.firstName.toUpperCase()} ${formData.client.lastName.toUpperCase()} LIVING TRUST DATED ${formData.currentDate.toUpperCase()}`;
  }

  // Split into multiple lines if too long
  const trustLines = doc.splitTextToSize(trustName, 6.5);
  for (let line of trustLines) {
    doc.text(line, pageWidth / 2, yPos, { align: 'center' });
    yPos += 0.3;
  }

  // Add "RESTATEMENT DATED" if this is a restatement
  if (formData.isRestatement) {
    yPos += 0.2;
    doc.setFontSize(16);
    doc.text(`RESTATEMENT DATED ${formData.currentDate.toUpperCase()}`, pageWidth / 2, yPos, { align: 'center' });
    yPos += 0.3;
  } else {
    yPos += 0.3;
  }

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
    const baseLineHeight = 0.24;

    let currentY = marginTop;

    // Split content into lines
    const lines = textContent.split('\n');
    console.log('Processing', lines.length, 'lines with formatting...');

    // NO PAGE NUMBERS - user requested removal
    const addPageNumber = () => {
      // Empty - no page numbers
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      // Check for explicit page break marker (form feed character)
      if (line.includes('\f') || lines[i].includes('\f')) {
        addPageNumber();
        doc.addPage();
        currentY = marginTop;
        continue;
      }

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

      // Detect "Schedule of Assets" - force new page and center
      if (line.match(/^Schedule of Assets$/i)) {
        doc.addPage();
        currentY = marginTop;
        doc.setFont('times', 'bold');
        doc.setFontSize(16);
        doc.text(line, pageWidth / 2, currentY, { align: 'center' });
        currentY += baseLineHeight * 1.5;
        doc.setFont('times', 'normal');
        doc.setFontSize(12);
        continue;
      }

      // Detect Article headers (e.g., "Article One", "Article Two") - CENTER THEM
      if (line.match(/^Article (One|Two|Three|Four|Five|Six|Seven|Eight|Nine|Ten|Eleven|Twelve|Thirteen|Seven-A)$/)) {
        currentY += baseLineHeight * 2; // Extra space before article
        doc.setFont('times', 'bold');
        doc.setFontSize(16);
        doc.text(line, pageWidth / 2, currentY, { align: 'center' });
        currentY += baseLineHeight * 1.5;
        doc.setFont('times', 'normal');
        doc.setFontSize(12);
        continue;
      }

      // Detect Article subtitles (line after Article header) - CENTER THEM
      if (i > 0 && lines[i-1].match(/^Article (One|Two|Three|Four|Five|Six|Seven|Eight|Nine|Ten|Eleven|Twelve|Thirteen|Seven-A)$/)) {
        doc.setFont('times', 'bold');
        doc.setFontSize(14);
        doc.text(line, pageWidth / 2, currentY, { align: 'center' });
        currentY += baseLineHeight * 1.5;
        doc.setFont('times', 'normal');
        doc.setFontSize(12);
        continue;
      }

      // Detect Section headers (e.g., "Section 1.01")
      if (line.match(/^Section \d+\.\d+/)) {
        currentY += baseLineHeight * 0.8;
        doc.setFont('times', 'bold');
        doc.setFontSize(14);
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
        // Add blank line after section header
        currentY += baseLineHeight;
        doc.setFont('times', 'normal');
        doc.setFontSize(12);
        continue;
      }

      // Detect subsections with (a), (b), etc. - make them bold and indented
      if (line.match(/^\s*\([a-z]\)\s+/)) {
        currentY += baseLineHeight * 0.3; // Small space before subsection
        doc.setFont('times', 'bold');
        doc.setFontSize(12);

        // Extract the letter and text separately
        const match = line.match(/^\s*\(([a-z])\)\s+(.+)/);
        if (match) {
          const letter = `(${match[1]})`;
          const text = match[2];

          // Print the letter in bold
          doc.text(letter, marginLeft + 0.5, currentY);

          // Wrap and print the text
          const wrappedText = doc.splitTextToSize(text, contentWidth - 1.0);
          for (let w of wrappedText) {
            if (currentY > pageHeight - marginBottom - 0.3) {
              addPageNumber();
              doc.addPage();
              currentY = marginTop;
            }
            doc.text(w, marginLeft + 0.9, currentY);
            currentY += baseLineHeight;
          }
        }
        doc.setFont('times', 'normal');
        doc.setFontSize(12);
        continue;
      }

      // Regular paragraphs
      doc.setFont('times', 'normal');
      doc.setFontSize(12);
      const wrapped = doc.splitTextToSize(line, contentWidth);
      for (let j = 0; j < wrapped.length; j++) {
        if (currentY > pageHeight - marginBottom - 0.3) {
          addPageNumber();
          doc.addPage();
          currentY = marginTop;
        }
        doc.text(wrapped[j], marginLeft, currentY);
        currentY += baseLineHeight;
      }

      // Add small space after paragraphs (not after the last line of a wrapped paragraph)
      currentY += baseLineHeight * 0.3;
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
 * Generate Word document from plain text
 * @param {string} textContent - Plain text content from template
 * @param {string} documentTitle - Title for the document
 * @param {Object} formData - Form data (for cover page)
 * @returns {Promise<Blob>} Word document as Blob
 */
const generateWordFromText = async (textContent, documentTitle, formData = null) => {
  try {
    const paragraphs = [];

    // Add cover page if formData is provided
    if (formData) {
      // Trust name (uppercase)
      const trustName = `THE ${formData.client.firstName.toUpperCase()} ${formData.client.lastName.toUpperCase()} LIVING TRUST DATED ${formData.currentDate.toUpperCase()}`;
      paragraphs.push(
        new Paragraph({
          children: [new TextRun({ text: trustName, bold: true, size: 36 })],
          alignment: AlignmentType.CENTER,
          spacing: { before: 3000, after: 1200 },
        })
      );

      // Client name
      paragraphs.push(
        new Paragraph({
          children: [new TextRun({ text: `${formData.client.firstName} ${formData.client.lastName}`, size: 28 })],
          alignment: AlignmentType.CENTER,
          spacing: { after: 1200 },
        })
      );

      // Law office info
      paragraphs.push(
        new Paragraph({
          children: [new TextRun({ text: 'Prepared by:', size: 24 })],
          alignment: AlignmentType.CENTER,
          spacing: { before: 4000, after: 300 },
        })
      );
      paragraphs.push(
        new Paragraph({
          children: [new TextRun({ text: 'LAW OFFICES OF ROZSA GYENE, PC', bold: true, size: 24 })],
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 },
        })
      );
      paragraphs.push(
        new Paragraph({
          children: [new TextRun({ text: '450 N Brand Blvd, Suite 623', size: 22 })],
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 },
        })
      );
      paragraphs.push(
        new Paragraph({
          children: [new TextRun({ text: 'Glendale, California 91203', size: 22 })],
          alignment: AlignmentType.CENTER,
          spacing: { after: 1200 },
        })
      );

      // Page break after cover
      paragraphs.push(
        new Paragraph({
          children: [new TextRun({ text: '', size: 1 })],
          pageBreakBefore: true,
        })
      );
    }

    // Process content lines
    const lines = textContent.split('\n');
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      // Check for explicit page break marker (form feed character)
      if (line.includes('\f') || lines[i].includes('\f')) {
        paragraphs.push(
          new Paragraph({
            children: [new TextRun({ text: '', size: 1 })],
            pageBreakBefore: true,
          })
        );
        continue;
      }

      if (!line) {
        paragraphs.push(new Paragraph({ children: [new TextRun({ text: '' })] }));
        continue;
      }

      // Schedule of Assets - start new page
      if (line.match(/^Schedule of Assets$/i)) {
        paragraphs.push(
          new Paragraph({
            children: [new TextRun({ text: line, bold: true, size: 32 })],
            alignment: AlignmentType.CENTER,
            heading: HeadingLevel.HEADING_1,
            pageBreakBefore: true,
          })
        );
        continue;
      }

      // Article headers
      if (line.match(/^Article (One|Two|Three|Four|Five|Six|Seven|Eight|Nine|Ten|Eleven|Twelve|Thirteen|Seven-A)$/)) {
        paragraphs.push(
          new Paragraph({
            children: [new TextRun({ text: line, bold: true, size: 32 })],
            alignment: AlignmentType.CENTER,
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 400, after: 200 },
          })
        );
        continue;
      }

      // Article subtitles
      if (i > 0 && lines[i-1].match(/^Article (One|Two|Three|Four|Five|Six|Seven|Eight|Nine|Ten|Eleven|Twelve|Thirteen|Seven-A)$/)) {
        paragraphs.push(
          new Paragraph({
            children: [new TextRun({ text: line, bold: true, size: 28 })],
            alignment: AlignmentType.CENTER,
            heading: HeadingLevel.HEADING_2,
            spacing: { after: 300 },
          })
        );
        continue;
      }

      // Section headers
      if (line.match(/^Section \d+\.\d+/)) {
        paragraphs.push(
          new Paragraph({
            children: [new TextRun({ text: line, bold: true, size: 24 })],
            spacing: { before: 300, after: 200 },
          })
        );
        continue;
      }

      // Subsections (a), (b), etc.
      if (line.match(/^\s*\([a-z]\)\s+/)) {
        paragraphs.push(
          new Paragraph({
            children: [new TextRun({ text: line, bold: true })],
            indent: { left: 720 },
          })
        );
        continue;
      }

      // Regular paragraphs
      paragraphs.push(
        new Paragraph({
          children: [new TextRun({ text: line })],
          spacing: { after: 100 },
        })
      );
    }

    const doc = new Document({
      sections: [{
        properties: {
          page: {
            margin: {
              top: 1440,
              right: 1440,
              bottom: 1440,
              left: 1440,
            },
          },
        },
        children: paragraphs,
      }],
    });

    const blob = await Packer.toBlob(doc);
    return blob;
  } catch (error) {
    console.error(`ERROR generating Word document:`, error);
    throw error;
  }
};

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

  // STEP 1: Try to use PDF template first
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
        console.warn('PDF template has no form fields - falling back to JavaScript templates');
      }
    } else {
      console.log('PDF template not found, falling back to JavaScript templates');
    }
  } catch (error) {
    console.warn('Error with PDF template, falling back to JavaScript templates:', error);
  }

  // STEP 2: Fall back to JavaScript template system
  let content;
  if (formData.trustType === 'single' || formData.trustType === 'joint' || !formData.trustType) {
    console.log('Using function-based template system');

    // Call the template function with formData directly
    if (formData.trustType === 'joint' || formData.isJoint) {
      content = jointLivingTrustTemplate(formData);
      console.log('Joint trust template function returned content length:', content.length);
    } else {
      content = singleLivingTrustTemplate(formData);
      console.log('Single trust template function returned content length:', content.length);
    }

    console.log('First 200 chars:', content.substring(0, 200));
  } else {
    // For irrevocable trusts, use the placeholder-based template system
    console.log('Using placeholder-based template system for irrevocable trust');

    const templateData = prepareTemplateData(formData);
    let template;

    switch (formData.trustType) {
      case 'single_irrevocable':
        template = singleIrrevocableTrustTemplate;
        break;
      case 'joint_irrevocable':
        template = jointIrrevocableTrustTemplate;
        break;
      default:
        template = singleIrrevocableTrustTemplate;
    }

    content = processTemplate(template, templateData);
  }

  console.log('Final content length:', content.length);

  // Determine document title
  const isIrrevocable = formData.trustType === 'single_irrevocable' || formData.trustType === 'joint_irrevocable';
  const docTitle = isIrrevocable ? 'Irrevocable Trust' : 'Living Trust';

  // For function-based templates (single and joint living trusts), use direct text-to-PDF conversion
  if (formData.trustType === 'single' || formData.trustType === 'joint' || !formData.trustType) {
    console.log('Using text-based PDF generation (no HTML)...');
    return generatePDFFromText(content, docTitle, formData);
  }

  // For placeholder-based templates (irrevocable trusts), use HTML-based PDF generation
  console.log('Using HTML-based PDF generation...');
  return generatePDFFromHTML(content, docTitle);
};

/**
 * Generate Living Trust Word document
 * @param {Object} formData - Complete form data
 * @returns {Promise<Blob>} Word document as Blob
 */
export const generateLivingTrustWord = async (formData) => {
  console.log('=== DEBUG: generateLivingTrustWord ===');

  // Add currentDate if not present
  if (!formData.currentDate) {
    const today = new Date();
    const months = ['January', 'February', 'March', 'April', 'May', 'June',
                   'July', 'August', 'September', 'October', 'November', 'December'];
    formData.currentDate = `${months[today.getMonth()]} ${today.getDate()}, ${today.getFullYear()}`;
  }

  // Generate content
  let content;
  if (formData.trustType === 'single' || formData.trustType === 'joint' || !formData.trustType) {
    // Function-based templates for living trusts
    if (formData.trustType === 'joint' || formData.isJoint) {
      content = jointLivingTrustTemplate(formData);
    } else {
      content = singleLivingTrustTemplate(formData);
    }
  } else {
    // Placeholder-based templates for irrevocable trusts
    const templateData = prepareTemplateData(formData);
    let template;

    switch (formData.trustType) {
      case 'single_irrevocable':
        template = singleIrrevocableTrustTemplate;
        break;
      case 'joint_irrevocable':
        template = jointIrrevocableTrustTemplate;
        break;
      default:
        template = singleIrrevocableTrustTemplate;
    }

    content = processTemplate(template, templateData);
  }

  const isIrrevocable = formData.trustType === 'single_irrevocable' || formData.trustType === 'joint_irrevocable';
  const docTitle = isIrrevocable ? 'Irrevocable Trust' : 'Living Trust';

  return generateWordFromText(content, docTitle, formData);
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

  // STEP 1: Try to use PDF template first
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
        console.warn('PDF template has no form fields - falling back to JavaScript templates');
      }
    } else {
      console.log('PDF template not found, falling back to JavaScript templates');
    }
  } catch (error) {
    console.warn('Error with PDF template, falling back to JavaScript templates:', error);
  }

  // STEP 2: Fall back to JavaScript template system
  const isJoint = formData.isJoint || formData.trustType === 'joint';
  const templateData = prepareTemplateData(formData);
  let combinedContent = '';

  try {
    // Helper function to add document separator
    const addDocumentSeparator = (title) => {
      return `\n\n\n[PAGE_BREAK]\n\n\n${title}\n\n`;
    };

    // INTRO PAGES - Portfolio Cover and Information Pages

    // 1. Cover Page
    console.log('Adding Cover Page...');
    const coverTemplate = estatePlanningCoverPageTemplate();
    const coverText = processTemplate(coverTemplate, templateData).replace(/<[^>]*>/g, '\n').replace(/&nbsp;/g, ' ');
    combinedContent += coverText;

    // 2. Table of Contents
    console.log('Adding Table of Contents...');
    combinedContent += addDocumentSeparator('');
    const tocTemplate = tableOfContentsTemplate();
    const tocText = processTemplate(tocTemplate, templateData).replace(/<[^>]*>/g, '\n').replace(/&nbsp;/g, ' ');
    combinedContent += tocText;

    // 3. Introduction Page
    console.log('Adding Introduction Page...');
    combinedContent += addDocumentSeparator('');
    const introTemplate = introductionPageTemplate();
    const introText = processTemplate(introTemplate, templateData).replace(/<[^>]*>/g, '\n').replace(/&nbsp;/g, ' ');
    combinedContent += introText;

    // 4. Overview Page (Trust Information)
    console.log('Adding Overview Page...');
    combinedContent += addDocumentSeparator('');
    const overviewTemplate = overviewPageTemplate();
    const overviewText = processTemplate(overviewTemplate, templateData).replace(/<[^>]*>/g, '\n').replace(/&nbsp;/g, ' ');
    combinedContent += overviewText;

    // 5. Revocable Living Trust Section Page
    console.log('Adding Revocable Living Trust Section Page...');
    combinedContent += addDocumentSeparator('');
    const trustSectionTemplate = revocableLivingTrustSectionPageTemplate();
    const trustSectionText = processTemplate(trustSectionTemplate, templateData).replace(/<[^>]*>/g, '\n').replace(/&nbsp;/g, ' ');
    combinedContent += trustSectionText;

    // LEGAL DOCUMENTS START HERE

    // 6. Certificate of Trust (joint document - one for both grantors)
    console.log('Adding Certificate of Trust...');
    combinedContent += addDocumentSeparator('');
    const certTemplate = certificateOfTrustTemplate();
    const certText = processTemplate(certTemplate, templateData).replace(/<[^>]*>/g, '\n').replace(/&nbsp;/g, ' ');
    combinedContent += certText;

    // 2. Trustee Affidavit (joint document - one for both grantors)
    console.log('Adding Trustee Affidavit...');
    combinedContent += addDocumentSeparator('TRUSTEE AFFIDAVIT');
    const affidavitTemplate = trusteeAffidavitTemplate();
    const affidavitText = processTemplate(affidavitTemplate, templateData).replace(/<[^>]*>/g, '\n').replace(/&nbsp;/g, ' ');
    combinedContent += affidavitText;

    // 3. Pour Over Will - CLIENT (separate for each grantor)
    console.log('Adding Pour Over Will...');
    combinedContent += addDocumentSeparator('POUR OVER WILL - ' + (isJoint ? 'CLIENT' : ''));
    const pourOverTemplate = pourOverWillTemplate('client');
    const pourOverText = processTemplate(pourOverTemplate, templateData).replace(/<[^>]*>/g, '\n').replace(/&nbsp;/g, ' ');
    combinedContent += pourOverText;

    // 4. Pour Over Will - SPOUSE (if joint trust)
    if (isJoint) {
      combinedContent += addDocumentSeparator('POUR OVER WILL - SPOUSE');
      const pourOverSpouseTemplate = pourOverWillTemplate('spouse');
      const pourOverSpouseText = processTemplate(pourOverSpouseTemplate, templateData).replace(/<[^>]*>/g, '\n').replace(/&nbsp;/g, ' ');
      combinedContent += pourOverSpouseText;
    }

    // ADDITIONAL PORTFOLIO SECTIONS

    // 5. Nominations Page
    console.log('Adding Nominations Page...');
    combinedContent += addDocumentSeparator('');
    const nominationsTemplate = nominationsPageTemplate();
    const nominationsText = processTemplate(nominationsTemplate, templateData).replace(/<[^>]*>/g, '\n').replace(/&nbsp;/g, ' ');
    combinedContent += nominationsText;

    // 6. Confirmation of Names and Fiduciaries
    console.log('Adding Confirmation of Names and Fiduciaries...');
    combinedContent += addDocumentSeparator('');
    const confirmationTemplate = confirmationOfNamesTemplate();
    const confirmationText = processTemplate(confirmationTemplate, templateData).replace(/<[^>]*>/g, '\n').replace(/&nbsp;/g, ' ');
    combinedContent += confirmationText;

    // 7. Personal Information Page
    console.log('Adding Personal Information Page...');
    combinedContent += addDocumentSeparator('');
    const personalInfoTemplate = personalInformationPageTemplate();
    const personalInfoText = processTemplate(personalInfoTemplate, templateData).replace(/<[^>]*>/g, '\n').replace(/&nbsp;/g, ' ');
    combinedContent += personalInfoText;

    // 8. Funding Instructions Page
    console.log('Adding Funding Instructions Page...');
    combinedContent += addDocumentSeparator('');
    const fundingTemplate = fundingInstructionsPageTemplate();
    const fundingText = processTemplate(fundingTemplate, templateData).replace(/<[^>]*>/g, '\n').replace(/&nbsp;/g, ' ');
    combinedContent += fundingText;

    // POWER OF ATTORNEY AND HEALTHCARE DOCUMENTS

    // 9. Durable Power of Attorney - CLIENT (separate for each grantor)
    console.log('Adding Durable Power of Attorney...');
    combinedContent += addDocumentSeparator('DURABLE POWER OF ATTORNEY - ' + (isJoint ? 'CLIENT' : ''));
    const durableTemplate = durablePowerOfAttorneyTemplate('client');
    const durableText = processTemplate(durableTemplate, templateData).replace(/<[^>]*>/g, '\n').replace(/&nbsp;/g, ' ');
    combinedContent += durableText;

    // 6. Durable Power of Attorney - SPOUSE (if joint trust)
    if (isJoint) {
      combinedContent += addDocumentSeparator('DURABLE POWER OF ATTORNEY - SPOUSE');
      const durableSpouseTemplate = durablePowerOfAttorneyTemplate('spouse');
      const durableSpouseText = processTemplate(durableSpouseTemplate, templateData).replace(/<[^>]*>/g, '\n').replace(/&nbsp;/g, ' ');
      combinedContent += durableSpouseText;
    }

    // 7. Advanced Healthcare Directive - CLIENT (separate for each grantor)
    console.log('Adding Advanced Healthcare Directive...');
    combinedContent += addDocumentSeparator('ADVANCED HEALTHCARE DIRECTIVE - ' + (isJoint ? 'CLIENT' : ''));
    const healthcareTemplate = advancedHealthcareDirectiveTemplate('client');
    const healthcareText = processTemplate(healthcareTemplate, templateData).replace(/<[^>]*>/g, '\n').replace(/&nbsp;/g, ' ');
    combinedContent += healthcareText;

    // 8. Advanced Healthcare Directive - SPOUSE (if joint trust)
    if (isJoint) {
      combinedContent += addDocumentSeparator('ADVANCED HEALTHCARE DIRECTIVE - SPOUSE');
      const healthcareSpouseTemplate = advancedHealthcareDirectiveTemplate('spouse');
      const healthcareSpouseText = processTemplate(healthcareSpouseTemplate, templateData).replace(/<[^>]*>/g, '\n').replace(/&nbsp;/g, ' ');
      combinedContent += healthcareSpouseText;
    }

    // 9. HIPAA Authorization - CLIENT (separate for each grantor)
    console.log('Adding HIPAA Authorization...');
    combinedContent += addDocumentSeparator('HIPAA AUTHORIZATION - ' + (isJoint ? 'CLIENT' : ''));
    const hipaaTemplate = hipaaAuthorizationTemplate('client');
    const hipaaText = processTemplate(hipaaTemplate, templateData).replace(/<[^>]*>/g, '\n').replace(/&nbsp;/g, ' ');
    combinedContent += hipaaText;

    // 10. HIPAA Authorization - SPOUSE (if joint trust)
    if (isJoint) {
      combinedContent += addDocumentSeparator('HIPAA AUTHORIZATION - SPOUSE');
      const hipaaSpouseTemplate = hipaaAuthorizationTemplate('spouse');
      const hipaaSpouseText = processTemplate(hipaaSpouseTemplate, templateData).replace(/<[^>]*>/g, '\n').replace(/&nbsp;/g, ' ');
      combinedContent += hipaaSpouseText;
    }

    // 11. Personal Property Assignment - CLIENT (separate for each grantor)
    console.log('Adding Personal Property Assignment...');
    combinedContent += addDocumentSeparator('PERSONAL PROPERTY ASSIGNMENT - ' + (isJoint ? 'CLIENT' : ''));
    const propAssignTemplate = personalPropertyAssignmentTemplate('client');
    const propAssignText = processTemplate(propAssignTemplate, templateData).replace(/<[^>]*>/g, '\n').replace(/&nbsp;/g, ' ');
    combinedContent += propAssignText;

    // 12. Personal Property Assignment - SPOUSE (if joint trust)
    if (isJoint) {
      combinedContent += addDocumentSeparator('PERSONAL PROPERTY ASSIGNMENT - SPOUSE');
      const propAssignSpouseTemplate = personalPropertyAssignmentTemplate('spouse');
      const propAssignSpouseText = processTemplate(propAssignSpouseTemplate, templateData).replace(/<[^>]*>/g, '\n').replace(/&nbsp;/g, ' ');
      combinedContent += propAssignSpouseText;
    }

    // 13. Personal Property Memorandum - CLIENT (separate for each grantor)
    console.log('Adding Personal Property Memorandum...');
    combinedContent += addDocumentSeparator('PERSONAL PROPERTY MEMORANDUM - ' + (isJoint ? 'CLIENT' : ''));
    const propMemoTemplate = personalPropertyMemorandumTemplate('client');
    const propMemoText = processTemplate(propMemoTemplate, templateData).replace(/<[^>]*>/g, '\n').replace(/&nbsp;/g, ' ');
    combinedContent += propMemoText;

    // 14. Personal Property Memorandum - SPOUSE (if joint trust)
    if (isJoint) {
      combinedContent += addDocumentSeparator('PERSONAL PROPERTY MEMORANDUM - SPOUSE');
      const propMemoSpouseTemplate = personalPropertyMemorandumTemplate('spouse');
      const propMemoSpouseText = processTemplate(propMemoSpouseTemplate, templateData).replace(/<[^>]*>/g, '\n').replace(/&nbsp;/g, ' ');
      combinedContent += propMemoSpouseText;
    }

    console.log('Total combined content length:', combinedContent.length);

    // Replace [PAGE_BREAK] markers with form feed characters that the PDF generator will recognize
    combinedContent = combinedContent.replace(/\[PAGE_BREAK\]/g, '\f');

    // Generate single PDF with all content
    const pdfDoc = generatePDFFromText(combinedContent, 'Complete Estate Planning Package', formData);

    // Convert jsPDF document to Blob for upload
    const pdfBlob = pdfDoc.output('blob');
    console.log('PDF blob created, size:', pdfBlob.size, 'bytes');

    return pdfBlob;

  } catch (error) {
    console.error('Error generating complete package:', error);
    throw error;
  }
};

/**
 * Generate Complete Estate Planning Package as Word Document
 * @param {Object} formData - Complete form data
 * @returns {Promise<Blob>} Word document as Blob
 */
export const generateCompleteEstatePlanningPackageWord = async (formData) => {
  console.log('=== Generating Complete Estate Planning Package (Word) ===');

  // Add currentDate if not present
  if (!formData.currentDate) {
    const today = new Date();
    const months = ['January', 'February', 'March', 'April', 'May', 'June',
                   'July', 'August', 'September', 'October', 'November', 'December'];
    formData.currentDate = `${months[today.getMonth()]} ${today.getDate()}, ${today.getFullYear()}`;
  }

  const isJoint = formData.isJoint || formData.trustType === 'joint';
  const templateData = prepareTemplateData(formData);
  let combinedContent = '';

  try {
    // Helper function to add document separator
    const addDocumentSeparator = (title) => {
      return `\n\n\n[PAGE_BREAK]\n\n\n${title}\n\n`;
    };

    // INTRO PAGES - Portfolio Cover and Information Pages

    // 1. Cover Page
    console.log('Adding Cover Page...');
    const coverTemplate = estatePlanningCoverPageTemplate();
    const coverText = processTemplate(coverTemplate, templateData).replace(/<[^>]*>/g, '\n').replace(/&nbsp;/g, ' ');
    combinedContent += coverText;

    // 2. Table of Contents
    console.log('Adding Table of Contents...');
    combinedContent += addDocumentSeparator('');
    const tocTemplate = tableOfContentsTemplate();
    const tocText = processTemplate(tocTemplate, templateData).replace(/<[^>]*>/g, '\n').replace(/&nbsp;/g, ' ');
    combinedContent += tocText;

    // 3. Introduction Page
    console.log('Adding Introduction Page...');
    combinedContent += addDocumentSeparator('');
    const introTemplate = introductionPageTemplate();
    const introText = processTemplate(introTemplate, templateData).replace(/<[^>]*>/g, '\n').replace(/&nbsp;/g, ' ');
    combinedContent += introText;

    // 4. Overview Page (Trust Information)
    console.log('Adding Overview Page...');
    combinedContent += addDocumentSeparator('');
    const overviewTemplate = overviewPageTemplate();
    const overviewText = processTemplate(overviewTemplate, templateData).replace(/<[^>]*>/g, '\n').replace(/&nbsp;/g, ' ');
    combinedContent += overviewText;

    // 5. Revocable Living Trust Section Page
    console.log('Adding Revocable Living Trust Section Page...');
    combinedContent += addDocumentSeparator('');
    const trustSectionTemplate = revocableLivingTrustSectionPageTemplate();
    const trustSectionText = processTemplate(trustSectionTemplate, templateData).replace(/<[^>]*>/g, '\n').replace(/&nbsp;/g, ' ');
    combinedContent += trustSectionText;

    // LEGAL DOCUMENTS START HERE

    // 6. Certificate of Trust (joint document - one for both grantors)
    console.log('Adding Certificate of Trust...');
    combinedContent += addDocumentSeparator('');
    const certTemplate = certificateOfTrustTemplate();
    const certText = processTemplate(certTemplate, templateData).replace(/<[^>]*>/g, '\n').replace(/&nbsp;/g, ' ');
    combinedContent += certText;

    // 2. Trustee Affidavit (joint document - one for both grantors)
    console.log('Adding Trustee Affidavit...');
    combinedContent += addDocumentSeparator('TRUSTEE AFFIDAVIT');
    const affidavitTemplate = trusteeAffidavitTemplate();
    const affidavitText = processTemplate(affidavitTemplate, templateData).replace(/<[^>]*>/g, '\n').replace(/&nbsp;/g, ' ');
    combinedContent += affidavitText;

    // 3. Pour Over Will - CLIENT (separate for each grantor)
    console.log('Adding Pour Over Will...');
    combinedContent += addDocumentSeparator('POUR OVER WILL - ' + (isJoint ? 'CLIENT' : ''));
    const pourOverTemplate = pourOverWillTemplate('client');
    const pourOverText = processTemplate(pourOverTemplate, templateData).replace(/<[^>]*>/g, '\n').replace(/&nbsp;/g, ' ');
    combinedContent += pourOverText;

    // 4. Pour Over Will - SPOUSE (if joint trust)
    if (isJoint) {
      combinedContent += addDocumentSeparator('POUR OVER WILL - SPOUSE');
      const pourOverSpouseTemplate = pourOverWillTemplate('spouse');
      const pourOverSpouseText = processTemplate(pourOverSpouseTemplate, templateData).replace(/<[^>]*>/g, '\n').replace(/&nbsp;/g, ' ');
      combinedContent += pourOverSpouseText;
    }

    // ADDITIONAL PORTFOLIO SECTIONS

    // 5. Nominations Page
    console.log('Adding Nominations Page...');
    combinedContent += addDocumentSeparator('');
    const nominationsTemplate = nominationsPageTemplate();
    const nominationsText = processTemplate(nominationsTemplate, templateData).replace(/<[^>]*>/g, '\n').replace(/&nbsp;/g, ' ');
    combinedContent += nominationsText;

    // 6. Confirmation of Names and Fiduciaries
    console.log('Adding Confirmation of Names and Fiduciaries...');
    combinedContent += addDocumentSeparator('');
    const confirmationTemplate = confirmationOfNamesTemplate();
    const confirmationText = processTemplate(confirmationTemplate, templateData).replace(/<[^>]*>/g, '\n').replace(/&nbsp;/g, ' ');
    combinedContent += confirmationText;

    // 7. Personal Information Page
    console.log('Adding Personal Information Page...');
    combinedContent += addDocumentSeparator('');
    const personalInfoTemplate = personalInformationPageTemplate();
    const personalInfoText = processTemplate(personalInfoTemplate, templateData).replace(/<[^>]*>/g, '\n').replace(/&nbsp;/g, ' ');
    combinedContent += personalInfoText;

    // 8. Funding Instructions Page
    console.log('Adding Funding Instructions Page...');
    combinedContent += addDocumentSeparator('');
    const fundingTemplate = fundingInstructionsPageTemplate();
    const fundingText = processTemplate(fundingTemplate, templateData).replace(/<[^>]*>/g, '\n').replace(/&nbsp;/g, ' ');
    combinedContent += fundingText;

    // POWER OF ATTORNEY AND HEALTHCARE DOCUMENTS

    // 9. Durable Power of Attorney - CLIENT (separate for each grantor)
    console.log('Adding Durable Power of Attorney...');
    combinedContent += addDocumentSeparator('DURABLE POWER OF ATTORNEY - ' + (isJoint ? 'CLIENT' : ''));
    const durableTemplate = durablePowerOfAttorneyTemplate('client');
    const durableText = processTemplate(durableTemplate, templateData).replace(/<[^>]*>/g, '\n').replace(/&nbsp;/g, ' ');
    combinedContent += durableText;

    // 6. Durable Power of Attorney - SPOUSE (if joint trust)
    if (isJoint) {
      combinedContent += addDocumentSeparator('DURABLE POWER OF ATTORNEY - SPOUSE');
      const durableSpouseTemplate = durablePowerOfAttorneyTemplate('spouse');
      const durableSpouseText = processTemplate(durableSpouseTemplate, templateData).replace(/<[^>]*>/g, '\n').replace(/&nbsp;/g, ' ');
      combinedContent += durableSpouseText;
    }

    // 7. Advanced Healthcare Directive - CLIENT (separate for each grantor)
    console.log('Adding Advanced Healthcare Directive...');
    combinedContent += addDocumentSeparator('ADVANCED HEALTHCARE DIRECTIVE - ' + (isJoint ? 'CLIENT' : ''));
    const healthcareTemplate = advancedHealthcareDirectiveTemplate('client');
    const healthcareText = processTemplate(healthcareTemplate, templateData).replace(/<[^>]*>/g, '\n').replace(/&nbsp;/g, ' ');
    combinedContent += healthcareText;

    // 8. Advanced Healthcare Directive - SPOUSE (if joint trust)
    if (isJoint) {
      combinedContent += addDocumentSeparator('ADVANCED HEALTHCARE DIRECTIVE - SPOUSE');
      const healthcareSpouseTemplate = advancedHealthcareDirectiveTemplate('spouse');
      const healthcareSpouseText = processTemplate(healthcareSpouseTemplate, templateData).replace(/<[^>]*>/g, '\n').replace(/&nbsp;/g, ' ');
      combinedContent += healthcareSpouseText;
    }

    // 9. HIPAA Authorization - CLIENT (separate for each grantor)
    console.log('Adding HIPAA Authorization...');
    combinedContent += addDocumentSeparator('HIPAA AUTHORIZATION - ' + (isJoint ? 'CLIENT' : ''));
    const hipaaTemplate = hipaaAuthorizationTemplate('client');
    const hipaaText = processTemplate(hipaaTemplate, templateData).replace(/<[^>]*>/g, '\n').replace(/&nbsp;/g, ' ');
    combinedContent += hipaaText;

    // 10. HIPAA Authorization - SPOUSE (if joint trust)
    if (isJoint) {
      combinedContent += addDocumentSeparator('HIPAA AUTHORIZATION - SPOUSE');
      const hipaaSpouseTemplate = hipaaAuthorizationTemplate('spouse');
      const hipaaSpouseText = processTemplate(hipaaSpouseTemplate, templateData).replace(/<[^>]*>/g, '\n').replace(/&nbsp;/g, ' ');
      combinedContent += hipaaSpouseText;
    }

    // 11. Personal Property Assignment - CLIENT (separate for each grantor)
    console.log('Adding Personal Property Assignment...');
    combinedContent += addDocumentSeparator('PERSONAL PROPERTY ASSIGNMENT - ' + (isJoint ? 'CLIENT' : ''));
    const propAssignTemplate = personalPropertyAssignmentTemplate('client');
    const propAssignText = processTemplate(propAssignTemplate, templateData).replace(/<[^>]*>/g, '\n').replace(/&nbsp;/g, ' ');
    combinedContent += propAssignText;

    // 12. Personal Property Assignment - SPOUSE (if joint trust)
    if (isJoint) {
      combinedContent += addDocumentSeparator('PERSONAL PROPERTY ASSIGNMENT - SPOUSE');
      const propAssignSpouseTemplate = personalPropertyAssignmentTemplate('spouse');
      const propAssignSpouseText = processTemplate(propAssignSpouseTemplate, templateData).replace(/<[^>]*>/g, '\n').replace(/&nbsp;/g, ' ');
      combinedContent += propAssignSpouseText;
    }

    // 13. Personal Property Memorandum - CLIENT (separate for each grantor)
    console.log('Adding Personal Property Memorandum...');
    combinedContent += addDocumentSeparator('PERSONAL PROPERTY MEMORANDUM - ' + (isJoint ? 'CLIENT' : ''));
    const propMemoTemplate = personalPropertyMemorandumTemplate('client');
    const propMemoText = processTemplate(propMemoTemplate, templateData).replace(/<[^>]*>/g, '\n').replace(/&nbsp;/g, ' ');
    combinedContent += propMemoText;

    // 14. Personal Property Memorandum - SPOUSE (if joint trust)
    if (isJoint) {
      combinedContent += addDocumentSeparator('PERSONAL PROPERTY MEMORANDUM - SPOUSE');
      const propMemoSpouseTemplate = personalPropertyMemorandumTemplate('spouse');
      const propMemoSpouseText = processTemplate(propMemoSpouseTemplate, templateData).replace(/<[^>]*>/g, '\n').replace(/&nbsp;/g, ' ');
      combinedContent += propMemoSpouseText;
    }

    console.log('Total combined content length:', combinedContent.length);

    // Replace [PAGE_BREAK] markers with form feed characters
    combinedContent = combinedContent.replace(/\[PAGE_BREAK\]/g, '\f');

    // Generate Word document with all content
    return generateWordFromText(combinedContent, 'Complete Estate Planning Package', formData);

  } catch (error) {
    console.error('Error generating complete package (Word):', error);
    throw error;
  }
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
