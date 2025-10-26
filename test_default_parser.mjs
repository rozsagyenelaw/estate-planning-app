import fs from 'fs';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';

console.log('Testing with Default Parser\n');

try {
  const templatePath = './public/templates/single_living_trust_template.docx';
  const content = fs.readFileSync(templatePath, 'binary');
  const zip = new PizZip(content);

  // Use DEFAULT parser - no custom parser at all
  // Try using InspectModule to see what's going on
  const InspectModule = require('docxtemplater/js/inspect-module.js');
  const iModule = InspectModule();

  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
    modules: [iModule],
  });

  const testData = {
    trustName: 'The Smith Family Living Trust',
    trustDate: 'January 15, 2025',
    originalTrustName: 'Original Trust Name',
    originalTrustDate: 'January 1, 2020',
    grantorFullName: 'John Smith',
    fullName: 'John Smith',
    maritalStatus: 'I am single.',
    childrenStatement: 'I have two children.',
    childrenReferences: 'Jane Smith and Bob Smith',
    isRestatement: false,
    hasSpecificDistributions: true,
    beneficiaries: [
      { fullName: 'Jane Smith', relationship: 'daughter', dateOfBirth: 'June 15, 1990', percentage: 50 },
      { fullName: 'Bob Smith', relationship: 'son', percentage: 50 }
    ],
    specificDistributions: [
      { beneficiaryName: 'Jane Smith', property: 'The family home', hasAgeCondition: true, conditionAge: 25 }
    ],
    successorTrusteesDuringIncapacityFormatted: '1. Jane Smith\n2. Bob Smith',
    successorTrusteesAfterDeathFormatted: '1. Jane Smith\n2. Bob Smith',
    sectionNumber: '01',
    tpp_section_num: '02',
    assets: 'Personal property'
  };

  console.log('Rendering with default parser...');
  doc.render(testData);

  const buf = doc.getZip().generate({ type: 'nodebuffer', compression: 'DEFLATE' });
  fs.writeFileSync('/tmp/test_default_output.docx', buf);

  console.log('\n✓ SUCCESS!');
  console.log('✓ Generated: /tmp/test_default_output.docx');
  console.log('✓ File size:', buf.length, 'bytes');
  console.log('\nNo errors - template works with default parser!');

} catch (error) {
  console.error('\n✗ ERROR:', error.message);
  if (error.properties?.errors) {
    console.error(`\nTotal errors: ${error.properties.errors.length}`);
    console.error('\nFirst 5 errors:');
    error.properties.errors.slice(0, 5).forEach((err, i) => {
      console.error(`\n${i + 1}. ${err.message}`);
      console.error('   Tag:', err.properties?.xtag);
      console.error('   Explanation:', err.properties?.explanation);
    });
  }
  process.exit(1);
}
