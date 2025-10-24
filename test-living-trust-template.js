/**
 * Test Living Trust Template
 */

import fs from 'fs';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';

const sampleFormData = {
  trustName: 'Smith Family Living Trust',
  trustType: 'single',
  isJoint: false,
  isIrrevocable: false,
  currentDate: 'December 23, 2024',

  client: {
    firstName: 'John',
    middleName: 'Michael',
    lastName: 'Smith',
    sex: 'Male',
    maritalStatus: 'Single',
  },

  children: [
    {
      firstName: 'Sarah',
      lastName: 'Smith',
      dateOfBirth: '03/20/2005',
      relation: 'Daughter'
    }
  ],
};

// Helper functions
const getMaritalStatusStatement = (maritalStatus) => {
  const status = (maritalStatus || '').toLowerCase();
  if (status === 'single' || status === 'unmarried') return 'I am not married';
  else if (status === 'married') return 'I am married';
  else if (status === 'divorced') return 'I am divorced';
  else if (status === 'widowed') return 'I am widowed';
  return '';
};

// Prepare template data
const templateData = {
  trust: {
    name: sampleFormData.trustName || '',
    currentDate: sampleFormData.currentDate || '',
  },
  client: {
    firstName: sampleFormData.client?.firstName || '',
    middleName: sampleFormData.client?.middleName || '',
    lastName: sampleFormData.client?.lastName || '',
    fullName: `${sampleFormData.client?.firstName || ''} ${sampleFormData.client?.middleName || ''} ${sampleFormData.client?.lastName || ''}`.trim(),
    maritalStatus: sampleFormData.client?.maritalStatus || '',
    maritalStatusStatement: getMaritalStatusStatement(sampleFormData.client?.maritalStatus),
  },
  firstChild: sampleFormData.children && sampleFormData.children.length > 0 ? {
    firstName: sampleFormData.children[0].firstName || '',
    lastName: sampleFormData.children[0].lastName || '',
    fullName: `${sampleFormData.children[0].firstName || ''} ${sampleFormData.children[0].lastName || ''}`.trim(),
  } : {
    firstName: '',
    lastName: '',
    fullName: '',
  },
  numChildren: sampleFormData.children ? sampleFormData.children.length : 0,
  numChildrenAll: sampleFormData.children ? sampleFormData.children.length : 0,
};

const templatePath = './public/templates/single_living_trust_template.docx';

console.log('\n================================');
console.log('Testing Single Living Trust Template');
console.log('================================\n');

try {
  const content = fs.readFileSync(templatePath);
  const zip = new PizZip(content);

  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
    nullGetter: () => '',
  });

  doc.render(templateData);

  const buf = doc.getZip().generate({
    type: 'nodebuffer',
    compression: 'DEFLATE',
  });

  fs.writeFileSync('./test-output-living-trust.docx', buf);

  console.log('✅ SUCCESS!');
  console.log('Size:', buf.length, 'bytes');
  console.log('\n📁 Saved to: test-output-living-trust.docx\n');

} catch (error) {
  console.log('❌ FAILED\n');
  console.error('Error:', error.message);

  if (error.properties && error.properties.errors) {
    console.log('\n📋 Template errors:');
    error.properties.errors.forEach((err, index) => {
      console.log(`\nError ${index + 1}:`);
      console.log('  Message:', err.message);
      console.log('  Tag:', err.properties?.xtag || 'N/A');
      console.log('  Context:', err.properties?.context?.substring(0, 150) || 'N/A');
      console.log('  Explanation:', err.properties?.explanation || 'N/A');
    });
  }
  console.log('\n');
  process.exit(1);
}
