/**
 * Test DOCX Template Filling
 * Tests if we can load and fill a DOCX template with sample data
 */

import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';
import fs from 'fs';

console.log('\n================================');
console.log('Testing DOCX Template Filling');
console.log('================================\n');

// Load the DOCX template
const templatePath = './public/templates/single_living_trust_template.docx';

try {
  console.log('📄 Loading template:', templatePath);
  const content = fs.readFileSync(templatePath, 'binary');

  console.log('✅ Template loaded successfully! Size:', content.length, 'bytes\n');

  // Create a new instance of docxtemplater
  console.log('🔧 Initializing docxtemplater...');
  const zip = new PizZip(content);
  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
  });

  console.log('✅ Docxtemplater initialized\n');

  // Sample data to fill template
  const sampleData = {
    client: {
      firstName: 'John',
      middleName: 'Michael',
      lastName: 'Smith',
      fullName: 'John Michael Smith',
      address: '123 Main Street',
      city: 'Los Angeles',
      state: 'California',
      zip: '90001',
      county: 'Los Angeles',
      phone: '555-123-4567',
      email: 'john.smith@email.com',
      ssn: '123-45-6789',
      dateOfBirth: '01/15/1975',
      sex: 'Male',
      maritalStatus: 'Single',
      notaryDate: 'December 23, 2024',
    },
    trust: {
      name: 'Smith Family Living Trust',
      type: 'single',
      isJoint: 'No',
      isIrrevocable: 'No',
      isRestatement: 'No',
      currentDate: 'December 23, 2024',
    },
    children: [
      {
        firstName: 'Sarah',
        lastName: 'Smith',
        dateOfBirth: '03/20/2005',
        relation: 'Daughter'
      },
      {
        firstName: 'David',
        lastName: 'Smith',
        dateOfBirth: '07/10/2008',
        relation: 'Son'
      }
    ],
    numChildren: 2,
    childrenList: '1. Sarah Smith, born 03/20/2005\n2. David Smith, born 07/10/2008',
    successorTrustees: [
      {
        firstName: 'Jane',
        lastName: 'Doe',
        address: '456 Oak Avenue',
        phone: '555-987-6543',
        email: 'jane.doe@email.com'
      }
    ],
    numTrustees: 1,
    trusteesList: '1. Jane Doe',
    guardians: [
      {
        firstName: 'Robert',
        lastName: 'Johnson',
        address: '789 Pine Street',
        phone: '555-456-7890'
      }
    ],
    guardiansList: '1. Robert Johnson',
  };

  console.log('📝 Filling template with sample data...');
  console.log('Sample data keys:', Object.keys(sampleData).join(', '), '\n');

  // Fill the template
  doc.render(sampleData);

  console.log('✅ Template filled successfully!\n');

  // Generate the output document
  console.log('💾 Generating output document...');
  const output = doc.getZip().generate({
    type: 'nodebuffer',
    mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  });

  // Save to test file
  const outputPath = './test-output-single-trust.docx';
  fs.writeFileSync(outputPath, output);

  console.log('✅ Output document generated!');
  console.log('📁 Saved to:', outputPath);
  console.log('📏 Size:', output.length, 'bytes\n');

  console.log('================================');
  console.log('✅ ALL TESTS PASSED!');
  console.log('================================\n');
  console.log('The DOCX template system is working correctly!');
  console.log('You can open the generated file:', outputPath);
  console.log('\n');

} catch (error) {
  console.log('\n================================');
  console.log('❌ TEST FAILED');
  console.log('================================\n');
  console.error('Error:', error.message);

  if (error.properties && error.properties.errors) {
    console.log('\n📋 Template errors:');
    error.properties.errors.forEach((err, index) => {
      console.log(`\n${index + 1}. ${err.message}`);
      console.log('   Part:', err.part);
      if (err.properties) {
        console.log('   Properties:', JSON.stringify(err.properties, null, 2));
      }
    });
  }

  console.log('\n');
  process.exit(1);
}
