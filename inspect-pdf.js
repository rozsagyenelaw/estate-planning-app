/**
 * Inspect PDF Template to check for form fields
 */

import { PDFDocument } from 'pdf-lib';
import fs from 'fs';

async function inspectPDF(pdfPath) {
  console.log('\n================================');
  console.log(`Inspecting: ${pdfPath}`);
  console.log('================================\n');

  try {
    const pdfBytes = fs.readFileSync(pdfPath);
    const pdfDoc = await PDFDocument.load(pdfBytes);

    console.log(`Total pages: ${pdfDoc.getPageCount()}`);

    // Try to get form
    try {
      const form = pdfDoc.getForm();
      const fields = form.getFields();

      console.log(`\nForm fields found: ${fields.length}`);

      if (fields.length > 0) {
        console.log('\n--- Form Field Names ---');
        fields.forEach((field, index) => {
          const fieldName = field.getName();
          const fieldType = field.constructor.name;
          console.log(`${index + 1}. ${fieldName} (${fieldType})`);
        });
      } else {
        console.log('\n⚠️  NO FORM FIELDS FOUND!');
        console.log('This PDF has text placeholders but no interactive form fields.');
        console.log('You need to add form fields using Adobe Acrobat or PDFescape.');
      }
    } catch (formError) {
      console.log('\n⚠️  NO FORM DETECTED!');
      console.log('This PDF does not have a form. It likely has text placeholders.');
      console.log('Error:', formError.message);
    }

  } catch (error) {
    console.error('Error loading PDF:', error);
  }
}

// Inspect all uploaded templates
const templates = [
  './public/templates/single_living_trust_template.pdf',
  './public/templates/joint_living_trust_template.pdf',
  './public/templates/single_estate_planning_template.pdf',
  './public/templates/joint_estate_planning_template.pdf',
];

console.log('Starting PDF inspection...\n');

for (const template of templates) {
  if (fs.existsSync(template)) {
    await inspectPDF(template);
  } else {
    console.log(`\n❌ File not found: ${template}`);
  }
}

console.log('\n================================');
console.log('Inspection complete!');
console.log('================================\n');
