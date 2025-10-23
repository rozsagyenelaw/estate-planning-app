/**
 * PDF Overlay Service
 * Overlays/stamps data onto existing PDF templates with text placeholders
 */

import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

/**
 * Load a PDF template
 */
const loadPDFTemplate = async (templatePath) => {
  try {
    const response = await fetch(templatePath);
    if (!response.ok) {
      throw new Error(`Failed to load template: ${response.statusText}`);
    }
    const arrayBuffer = await response.arrayBuffer();
    return new Uint8Array(arrayBuffer);
  } catch (error) {
    console.error('Error loading PDF template:', error);
    throw error;
  }
};

/**
 * Simple approach: Overlay data on first page at common positions
 * This is a basic implementation - positions would need to be tuned for your specific PDFs
 */
export const overlayDataOnPDF = async (templateBytes, formData) => {
  try {
    const pdfDoc = await PDFDocument.load(templateBytes);
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    const { width, height } = firstPage.getSize();

    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontSize = 11;

    // Example overlays - these positions are just examples
    // In reality, you'd need to position these where your placeholders are
    const overlays = [
      { x: 200, y: height - 100, text: formData.client?.firstName || '' },
      { x: 300, y: height - 100, text: formData.client?.lastName || '' },
    ];

    overlays.forEach(overlay => {
      firstPage.drawText(overlay.text, {
        x: overlay.x,
        y: overlay.y,
        size: fontSize,
        font: font,
        color: rgb(0, 0, 0),
      });
    });

    const pdfBytes = await pdfDoc.save();
    return new Blob([pdfBytes], { type: 'application/pdf' });

  } catch (error) {
    console.error('Error overlaying data on PDF:', error);
    throw error;
  }
};

/**
 * Better approach: Parse PDF to find placeholder positions
 * This is more complex but would actually find and replace placeholders
 */
export const intelligentPDFOverlay = async (templateBytes, formData) => {
  // This would require:
  // 1. Parsing the PDF to find text and positions
  // 2. Finding all ${PLACEHOLDER} locations
  // 3. Drawing white rectangles over them
  // 4. Drawing actual data in those positions

  // This is VERY complex and would take significant development time
  // For now, return null to fall back to JavaScript templates

  console.warn('Intelligent PDF overlay not yet implemented');
  return null;
};
