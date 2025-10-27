import fs from 'fs';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';

console.log('Testing FIXED template WITHOUT runtime processing\n');

try {
  const templatePath = './public/templates/single_living_trust_template_FIXED.docx';
  const content = fs.readFileSync(templatePath, 'binary');
  const zip = new PizZip(content);

  // NO PROCESSING - load directly
  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
  });

  const testData = {
    trustName: 'The Smith Family Living Trust',
    trustDate: 'January 15, 2025',
    grantorFullName: 'John Smith',
    fullName: 'John Smith',
    maritalStatus: 'I am single.',
    childrenStatement: 'I have two children.',
    childrenReferences: 'Jane Smith and Bob Smith',
    isRestatement: false,
    notIsRestatement: true,
    originalTrustName: '',
    originalTrustDate: '',
    hasSpecificDistributions: true,
    notHasSpecificDistributions: false,
    beneficiaries: [
      { fullName: 'Jane Smith', relationship: 'daughter', dateOfBirth: 'June 15, 1990', percentage: 50, isNotLast: true },
      { fullName: 'Bob Smith', relationship: 'son', percentage: 50, isNotLast: false }
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

  console.log('Rendering template...');
  doc.render(testData);

  const buf = doc.getZip().generate({ type: 'nodebuffer', compression: 'DEFLATE' });
  fs.writeFileSync('/tmp/test_output_noprocessing.docx', buf);

  console.log('\n✓ SUCCESS! No errors!');
  console.log('✓ Generated: /tmp/test_output_noprocessing.docx');
  console.log('✓ Size:', buf.length, 'bytes');

} catch (error) {
  console.error('\n✗ FAILED with errors:\n');
  console.error(error.message);

  if (error.properties?.errors) {
    console.error(`\nTotal errors: ${error.properties.errors.length}`);
  }

  process.exit(1);
}
