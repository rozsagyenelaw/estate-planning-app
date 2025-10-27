// Test joint living trust template loading and data preparation

import { getDOCXTemplatePath, getDOCXTemplateName } from './src/services/docxTemplateConfig.js';

console.log('=== TESTING JOINT LIVING TRUST TEMPLATE LOADING ===\n');

// Test 1: Form data with isJoint = true
const testFormDataJoint = {
  isJoint: true,
  client: {
    firstName: 'John',
    lastName: 'Doe',
  },
  spouse: {
    firstName: 'Jane',
    lastName: 'Doe',
  },
  trustType: 'revocable',
  successorTrustees: [
    { firstName: 'Udo', lastName: 'Gyene' },
    { firstName: 'Ilona', lastName: 'Farag' }
  ],
  trusteesServeType: 'sequential',
  children: [
    { firstName: 'Child1', lastName: 'Doe', dateOfBirth: '2020-01-15' },
    { firstName: 'Child2', lastName: 'Doe', dateOfBirth: '2022-05-20' }
  ]
};

// Test 2: Form data with isJoint = false (single trust)
const testFormDataSingle = {
  isJoint: false,
  client: {
    firstName: 'John',
    lastName: 'Doe',
  },
  trustType: 'revocable',
};

console.log('TEST 1: Joint Trust Detection');
console.log('==============================');
console.log('Form data isJoint:', testFormDataJoint.isJoint);
console.log('Has spouse:', !!testFormDataJoint.spouse);
const jointTemplatePath = getDOCXTemplatePath(testFormDataJoint, false);
const jointTemplateName = getDOCXTemplateName(testFormDataJoint, false);
console.log('Template selected:', jointTemplateName);
console.log('Template path:', jointTemplatePath);
console.log('Expected: /templates/joint_living_trust_template.docx');
console.log('Match:', jointTemplatePath === '/templates/joint_living_trust_template.docx' ? '✓ PASS' : '✗ FAIL');
console.log('');

console.log('TEST 2: Single Trust Detection');
console.log('==============================');
console.log('Form data isJoint:', testFormDataSingle.isJoint);
const singleTemplatePath = getDOCXTemplatePath(testFormDataSingle, false);
const singleTemplateName = getDOCXTemplateName(testFormDataSingle, false);
console.log('Template selected:', singleTemplateName);
console.log('Template path:', singleTemplatePath);
console.log('Expected: /templates/single_living_trust_template.docx');
console.log('Match:', singleTemplatePath === '/templates/single_living_trust_template.docx' ? '✓ PASS' : '✗ FAIL');
console.log('');

console.log('TEST 3: Check Template File Exists');
console.log('===================================');
console.log('Checking if template files exist in public/templates/...');
console.log('');
console.log('Run this command to verify:');
console.log('  ls -lh public/templates/*.docx');
console.log('');

console.log('TEST 4: Data Preparation Check');
console.log('===============================');
console.log('Joint trust form data has:');
console.log('  - isJoint:', testFormDataJoint.isJoint);
console.log('  - client.firstName:', testFormDataJoint.client.firstName);
console.log('  - spouse.firstName:', testFormDataJoint.spouse?.firstName || '(missing)');
console.log('  - trustType:', testFormDataJoint.trustType);
console.log('  - successorTrustees:', testFormDataJoint.successorTrustees.length);
console.log('  - trusteesServeType:', testFormDataJoint.trusteesServeType);
console.log('  - children:', testFormDataJoint.children.length);
console.log('');

console.log('=== NEXT STEPS ===');
console.log('1. Verify the joint template uses Docxtemplater syntax (not Jinja2)');
console.log('2. Check browser console when generating a joint trust document');
console.log('3. Look for any error messages about template rendering');
console.log('4. Verify formData.isJoint is set to true in the form');
