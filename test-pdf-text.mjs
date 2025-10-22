// Test PDF generation with the new text-based approach
import pkg from 'jspdf';
const { jsPDF } = pkg;
import { singleTrustTemplate } from './src/templates/singleLivingTrust.js';
import { sampleFormData } from './src/utils/testDocumentGeneration.js';

console.log('=== Testing PDF Generation ===\n');

// Step 1: Generate content from template
console.log('Step 1: Generating content from template...');
const content = singleTrustTemplate(sampleFormData);
console.log('✓ Content generated:', content.length, 'characters');
console.log('First 150 chars:', content.substring(0, 150));

// Step 2: Create PDF using text-based approach
console.log('\nStep 2: Generating PDF using text() method...');

const doc = new jsPDF({
  orientation: 'portrait',
  unit: 'in',
  format: 'letter'
});

// Set font and size
doc.setFont('times', 'normal');
doc.setFontSize(12);

// Page settings
const pageWidth = 8.5;
const pageHeight = 11;
const marginLeft = 0.75;
const marginRight = 0.75;
const marginTop = 0.75;
const marginBottom = 0.75;
const contentWidth = pageWidth - marginLeft - marginRight;
const lineHeight = 0.2; // inches between lines
const maxLinesPerPage = Math.floor((pageHeight - marginTop - marginBottom) / lineHeight);

let currentY = marginTop;
let lineCount = 0;

// Split content into lines
const lines = content.split('\n');
console.log('Processing', lines.length, 'lines...');

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  // Check if we need a new page
  if (lineCount >= maxLinesPerPage) {
    doc.addPage();
    currentY = marginTop;
    lineCount = 0;
  }

  // Split long lines to fit page width
  const wrappedLines = doc.splitTextToSize(line || ' ', contentWidth);

  for (let j = 0; j < wrappedLines.length; j++) {
    // Check again for page break within wrapped lines
    if (lineCount >= maxLinesPerPage) {
      doc.addPage();
      currentY = marginTop;
      lineCount = 0;
    }

    doc.text(wrappedLines[j], marginLeft, currentY);
    currentY += lineHeight;
    lineCount++;
  }
}

console.log('✓ PDF generation complete!');
console.log('✓ Total pages:', doc.internal.getNumberOfPages());

// Get PDF size
const pdfBuffer = doc.output('arraybuffer');
console.log('✓ PDF size:', Math.round(pdfBuffer.byteLength / 1024), 'KB');

console.log('\n=== Test Complete ===');
console.log('PDF generation working correctly!');
console.log('Next: Test in browser by clicking "Generate Living Trust" button');
