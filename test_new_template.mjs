import fs from 'fs';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';

console.log('Testing NEW Single Living Trust Template\n');

try {
  const templatePath = './public/templates/single_living_trust_template.docx';
  const content = fs.readFileSync(templatePath, 'binary');
  const zip = new PizZip(content);

  // Use default docxtemplater parser
  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
  });

  // Comprehensive test data
  const testData = {
    trustName: 'The Smith Family Living Trust',
    trustDate: 'January 15, 2025',
    grantorFullName: 'John Robert Smith',
    fullName: 'John Robert Smith',
    maritalStatus: 'I am single.',
    childrenStatement: 'I have two children.',
    childrenReferences: 'Jane Elizabeth Smith and Robert Michael Smith',

    // Restatement
    isRestatement: false,
    notIsRestatement: true,
    originalTrustName: '',
    originalTrustDate: '',

    // Children array
    children: [
      {
        fullName: 'Jane Elizabeth Smith',
        dateOfBirth: 'June 15, 1990'
      },
      {
        fullName: 'Robert Michael Smith',
        dateOfBirth: 'March 22, 1992'
      }
    ],

    // Successor trustees
    successorTrusteesDuringIncapacityFormatted: '1. Jane Elizabeth Smith\n2. Robert Michael Smith',
    successorTrusteesAfterDeathFormatted: '1. Jane Elizabeth Smith\n2. Robert Michael Smith',

    // Specific distributions
    hasSpecificDistributions: true,
    notHasSpecificDistributions: false,
    specificDistributions: [
      {
        beneficiaryName: 'Jane Elizabeth Smith',
        property: 'The family home located at 123 Main Street',
        hasAgeCondition: true,
        conditionAge: 25
      },
      {
        beneficiaryName: 'Robert Michael Smith',
        property: 'The vacation cabin in Lake Tahoe',
        hasAgeCondition: false,
        conditionAge: null
      }
    ],

    // Beneficiaries
    beneficiaries: [
      {
        fullName: 'Jane Elizabeth Smith',
        relationship: 'daughter',
        dateOfBirth: 'June 15, 1990',
        percentage: 50,
        isNotLast: true
      },
      {
        fullName: 'Robert Michael Smith',
        relationship: 'son',
        dateOfBirth: 'March 22, 1992',
        percentage: 50,
        isNotLast: false
      }
    ],

    // General needs trusts
    hasGeneralNeeds: true,
    notHasGeneralNeeds: false,
    generalNeeds: [
      {
        sectionNumber: '6.1',
        beneficiaryName: 'Jane Elizabeth Smith',
        hasAgeCondition: true,
        terminationAge: 30
      }
    ],

    // Assets
    sectionNumber: '01',
    tpp_section_num: '02',
    assets: 'All personal property, real estate, bank accounts, investment accounts, and other assets transferred to this trust'
  };

  console.log('Rendering template...');
  doc.render(testData);

  const buf = doc.getZip().generate({ type: 'nodebuffer', compression: 'DEFLATE' });
  fs.writeFileSync('/tmp/test_output_NEW.docx', buf);

  console.log('\n✓ SUCCESS! No errors!');
  console.log('✓ Generated: /tmp/test_output_NEW.docx');
  console.log('✓ Size:', buf.length, 'bytes');
  console.log('\nPlease review the generated document to ensure all sections appear correctly.');

} catch (error) {
  console.error('\n✗ FAILED with errors:\n');
  console.error(error.message);

  if (error.properties?.errors) {
    console.error(`\nTotal errors: ${error.properties.errors.length}`);
    console.error('\nFirst 10 errors:');
    error.properties.errors.slice(0, 10).forEach((err, i) => {
      console.error(`\n${i + 1}. ${err.message}`);
      console.error(`   Tag: ${err.properties?.xtag}`);
      console.error(`   Explanation: ${err.properties?.explanation}`);
    });
  }

  process.exit(1);
}
