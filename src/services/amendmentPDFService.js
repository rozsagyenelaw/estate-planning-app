/**
 * Amendment PDF Generator Service
 * Generates trust amendment PDFs using jsPDF
 * Based on the Grozovskaya amendment template format
 */

import { jsPDF } from 'jspdf';
import { getOrdinalName } from './amendmentService';

/**
 * Generate amendment PDF
 * @param {Object} amendmentData - Amendment data
 * @returns {Blob} - PDF blob
 */
export const generateAmendmentPDF = (amendmentData) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: 'letter'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 72; // 1 inch margins
  const maxWidth = pageWidth - (margin * 2);
  const lineHeight = 14;
  let yPosition = margin;

  // Helper function to add text with automatic page breaks
  const addText = (text, fontSize = 12, fontStyle = 'normal', align = 'left', indent = 0) => {
    doc.setFontSize(fontSize);
    doc.setFont('times', fontStyle);

    const effectiveMaxWidth = maxWidth - indent;
    const lines = doc.splitTextToSize(text, effectiveMaxWidth);

    lines.forEach((line) => {
      // Check if we need a new page
      if (yPosition + lineHeight > pageHeight - margin) {
        doc.addPage();
        yPosition = margin;
      }

      if (align === 'center') {
        doc.text(line, pageWidth / 2, yPosition, { align: 'center' });
      } else if (align === 'right') {
        doc.text(line, pageWidth - margin, yPosition, { align: 'right' });
      } else {
        doc.text(line, margin + indent, yPosition);
      }

      yPosition += lineHeight;
    });
  };

  const addSpacing = (lines = 1) => {
    yPosition += lineHeight * lines;

    // Check if we need a new page
    if (yPosition > pageHeight - margin) {
      doc.addPage();
      yPosition = margin;
    }
  };

  // Extract trust name from trustorName or amendmentData
  const trustName = amendmentData.trustName || `THE ${amendmentData.trustorName.toUpperCase()} LIVING TRUST`;
  const ordinalName = getOrdinalName(amendmentData.amendmentNumber);

  // ========== HEADER ==========
  addText(trustName, 14, 'bold', 'center');
  addSpacing(0.5);
  addText(`${ordinalName.toUpperCase()} AMENDMENT`, 14, 'bold', 'center');
  addSpacing(1);

  // ========== PREAMBLE ==========
  addText(
    `THIS ${ordinalName.toUpperCase()} AMENDMENT to the trust Agreement made between ${amendmentData.trustorName} as the Trustor and ${amendmentData.trusteeName} hereinafter referred to as the Trustee.`,
    12,
    'normal'
  );
  addSpacing(1);

  // ========== WHEREAS CLAUSES ==========
  addText(
    `WHEREAS, the Trustor and the Trustee entered into a Revocable Living Trust dated ${amendmentData.originalTrustDate}, hereinafter called the Trust Agreement.`,
    12,
    'normal'
  );
  addSpacing(1);

  addText(
    `WHEREAS, the Trustor is desirous of modifying and amending the Trust Agreement and the Trustee is agreeable to the modification and amendments contained herein,`,
    12,
    'normal'
  );
  addSpacing(1);

  // ========== NOW THEREFORE ==========
  addText(
    'NOW THEREFORE IT IS AGREED: THE FOLLOWING ARTICLES SHALL BE AMENDED AS FOLLOWS:',
    12,
    'bold'
  );
  addSpacing(2);

  // ========== SECTIONS ==========
  if (amendmentData.sections && amendmentData.sections.length > 0) {
    amendmentData.sections.forEach((section, index) => {
      // Section title (combines article number and title on same line)
      const sectionHeader = section.articleNumber && section.sectionTitle
        ? `${section.articleNumber} ${section.sectionTitle}`
        : section.sectionTitle || section.articleNumber || '';

      if (sectionHeader) {
        addText(sectionHeader, 12, 'bold');
        addSpacing(0.5);
      }

      // Section text
      if (section.sectionText) {
        addText(section.sectionText, 12, 'normal', 'left', 0);
        addSpacing(2);
      }
    });
  }

  // ========== RATIFICATION CLAUSE ==========
  addSpacing(2);
  addText(
    `Except as expressly amended herein, all other terms and provisions of the Trust Agreement dated ${amendmentData.originalTrustDate} shall remain in full force and effect and are hereby ratified and confirmed.`,
    12,
    'normal'
  );
  addSpacing(2);

  // ========== SCHEDULE OF ASSETS ==========
  if (amendmentData.scheduleOfAssets && amendmentData.scheduleOfAssets.trim()) {
    addSpacing(2);
    addText('Schedule of Assets', 12, 'bold');
    addSpacing(1);
    addText(amendmentData.scheduleOfAssets, 12, 'normal');
    addSpacing(2);
  }

  // ========== SIGNATURE BLOCK ==========
  addSpacing(2);

  // Get current year for signature block
  const currentYear = new Date().getFullYear();

  // Check if joint trust (trustor name contains "and")
  const isJoint = amendmentData.trustorName.toLowerCase().includes(' and ');
  const trustors = isJoint
    ? amendmentData.trustorName.split(/\s+and\s+/i).map(name => name.trim())
    : [amendmentData.trustorName];

  // IN WITNESS WHEREOF line - singular or plural
  const witnessText = isJoint
    ? `IN WITNESS WHEREOF, Trustors have hereunto subscribed their names to the Amendment to this TRUST on __________, ${currentYear}.`
    : `IN WITNESS WHEREOF, Trustor has hereunto subscribed her name to the Amendment to this TRUST on __________, ${currentYear}.`;

  addText(witnessText, 12, 'normal');
  addSpacing(3);

  // Signature lines - one for each trustor
  trustors.forEach((trustor, index) => {
    addText('_________________________________________', 12, 'normal');
    addSpacing(0.5);
    addText(`${trustor}, Trustor and Trustee`, 12, 'normal');

    if (index < trustors.length - 1) {
      addSpacing(3);
    } else {
      addSpacing(2);
    }
  });

  // ========== NOTARY ACKNOWLEDGMENT (CALIFORNIA) ==========
  addSpacing(2);

  // Check if we need a new page for notary block
  if (yPosition + (lineHeight * 25) > pageHeight - margin) {
    doc.addPage();
    yPosition = margin;
  }

  // Notary disclaimer
  addText(
    'A notary public or other officer completing this certificate verifies only the identity of the individual who signed the document to which this certificate is attached, and not the truthfulness, accuracy, or validity of that document.',
    10,
    'normal'
  );
  addSpacing(2);

  // State and County
  addText('STATE OF CALIFORNIA )', 12, 'normal');
  addSpacing(0.5);
  addText('COUNTY OF LOS ANGELES )', 12, 'normal');
  addSpacing(2);

  // Main notary text
  addText(
    `On ___________, before me, __________________________, Notary Public, personally appeared ${amendmentData.trustorName} who proved to me on the basis of satisfactory evidence to be the person(s) whose name(s) is/are subscribed to the within instrument and acknowledged to me that he/she/they executed the same in his/her/their authorized capacity(ies), and that by his/her/their signature(s) on the instrument the person(s), or the entity upon behalf of which the person(s) acted, executed the instrument.`,
    10,
    'normal'
  );
  addSpacing(2);

  addText(
    'I certify under PENALTY OF PERJURY under the laws of the State of California that the foregoing paragraph is true and correct.',
    10,
    'normal'
  );
  addSpacing(2);

  addText('WITNESS my hand and official seal.', 10, 'normal');
  addSpacing(3);

  addText('Signature ________________________________________________________(Seal)', 10, 'normal');
  addSpacing(1);
  addText('My Commission Expires: ___________', 10, 'normal');

  // Return the PDF as a blob
  return doc.output('blob');
};

/**
 * Download amendment PDF
 * @param {Object} amendmentData - Amendment data
 * @param {string} fileName - File name (without .pdf extension)
 */
export const downloadAmendmentPDF = (amendmentData, fileName) => {
  const pdfBlob = generateAmendmentPDF(amendmentData);
  const url = URL.createObjectURL(pdfBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${fileName}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Preview amendment PDF in new window
 * @param {Object} amendmentData - Amendment data
 */
export const previewAmendmentPDF = (amendmentData) => {
  const pdfBlob = generateAmendmentPDF(amendmentData);
  const url = URL.createObjectURL(pdfBlob);
  window.open(url, '_blank');
};
