/**
 * Template Validation Test
 * Validates that all templates can be processed without errors
 * (Does not generate PDFs - that requires browser environment)
 */

import { sampleJointTrustData } from './src/utils/testDocumentGeneration.js';
import { prepareTemplateData } from './src/services/templateEngine.js';
import { estatePlanningCoverPageTemplate } from './src/templates/estatePlanningCoverPage.js';
import { tableOfContentsTemplate } from './src/templates/tableOfContents.js';
import { jointLivingTrustTemplate } from './src/templates/jointLivingTrust.js';
import { certificateOfTrustTemplate } from './src/templates/certificateOfTrust.js';
import { trusteeAffidavitTemplate } from './src/templates/trusteeAffidavit.js';
import { pourOverWillTemplate } from './src/templates/pourOverWill.js';
import { durablePowerOfAttorneyTemplate } from './src/templates/durablePowerOfAttorney.js';
import { advancedHealthcareDirectiveTemplate } from './src/templates/advancedHealthcareDirective.js';
import { hipaaAuthorizationTemplate } from './src/templates/hipaaAuthorization.js';
import { personalPropertyAssignmentTemplate } from './src/templates/personalPropertyAssignment.js';
import { personalPropertyMemorandumTemplate } from './src/templates/personalPropertyMemorandum.js';
import { memorialInstructionsTemplate } from './src/templates/memorialInstructions.js';
import { confirmationOfNamesTemplate } from './src/templates/confirmationOfNames.js';

console.log('='.repeat(70));
console.log('TEMPLATE VALIDATION TEST');
console.log('='.repeat(70));
console.log('\n📋 Test Data:');
console.log('  Trust Type: JOINT');
console.log('  Client: Karen Nikolaevich Bagramyan');
console.log('  Spouse: Lilit Arakelyan');
console.log('  Children: 2 (Rita and Artur)');
console.log('  Trust Date: January 10, 2025');
console.log('\n' + '-'.repeat(70));

try {
  console.log('\n🔧 Preparing template data...');
  const templateData = prepareTemplateData(sampleJointTrustData);
  console.log('✅ Template data prepared');
  console.log(`   - Total data keys: ${Object.keys(templateData).length}`);

  const documents = [
    { num: '01', name: 'Estate Planning Cover Page', template: estatePlanningCoverPageTemplate, isFunction: true },
    { num: '02', name: 'Table of Contents', template: tableOfContentsTemplate, isFunction: true },
    { num: '03', name: 'Joint Living Trust', template: jointLivingTrustTemplate, isFunction: false },
    { num: '04', name: 'Certificate of Trust', template: certificateOfTrustTemplate, isFunction: true },
    { num: '05', name: 'Trustee Affidavit', template: trusteeAffidavitTemplate, isFunction: true },
    { num: '06', name: 'Confirmation of Names', template: confirmationOfNamesTemplate, isFunction: true },
    { num: '07', name: 'Pour Over Will - Client', template: () => pourOverWillTemplate('client'), isFunction: true },
    { num: '08', name: 'Durable POA - Client', template: () => durablePowerOfAttorneyTemplate('client'), isFunction: true },
    { num: '09', name: 'Healthcare Directive - Client', template: () => advancedHealthcareDirectiveTemplate('client'), isFunction: true },
    { num: '10', name: 'HIPAA Authorization - Client', template: () => hipaaAuthorizationTemplate('client'), isFunction: true },
    { num: '11', name: 'Pour Over Will - Spouse', template: () => pourOverWillTemplate('spouse'), isFunction: true },
    { num: '12', name: 'Durable POA - Spouse', template: () => durablePowerOfAttorneyTemplate('spouse'), isFunction: true },
    { num: '13', name: 'Healthcare Directive - Spouse', template: () => advancedHealthcareDirectiveTemplate('spouse'), isFunction: true },
    { num: '14', name: 'HIPAA Authorization - Spouse', template: () => hipaaAuthorizationTemplate('spouse'), isFunction: true },
    { num: '15', name: 'Personal Property Assignment', template: personalPropertyAssignmentTemplate, isFunction: true },
    { num: '16', name: 'Personal Property Memorandum', template: personalPropertyMemorandumTemplate, isFunction: true },
    { num: '17', name: 'Memorial Instructions - Client', template: () => memorialInstructionsTemplate('client'), isFunction: true },
    { num: '18', name: 'Memorial Instructions - Spouse', template: () => memorialInstructionsTemplate('spouse'), isFunction: true },
  ];

  console.log('\n📄 Validating templates...\n');
  console.log('-'.repeat(70));

  let successCount = 0;
  let errors = [];

  for (const doc of documents) {
    try {
      const html = doc.isFunction ? doc.template() : doc.template;

      if (!html || html.length === 0) {
        throw new Error('Template returned empty content');
      }

      // Check for basic HTML structure
      if (!html.includes('<!DOCTYPE html>') && !html.includes('<html>')) {
        throw new Error('Template missing HTML structure');
      }

      console.log(`${doc.num}. ✅ ${doc.name}`);
      console.log(`    Length: ${html.length} characters`);
      successCount++;
    } catch (error) {
      console.log(`${doc.num}. ❌ ${doc.name}`);
      console.log(`    Error: ${error.message}`);
      errors.push({ doc: doc.name, error: error.message });
    }
  }

  console.log('-'.repeat(70));
  console.log(`\n📊 Results: ${successCount}/${documents.length} templates valid`);

  if (errors.length > 0) {
    console.log('\n❌ Errors found:');
    errors.forEach(err => {
      console.log(`   - ${err.doc}: ${err.error}`);
    });
  } else {
    console.log('\n✅ All templates validated successfully!');
  }

  console.log('\n📝 Sample HTML Preview (Cover Page):');
  console.log('-'.repeat(70));
  const coverHtml = estatePlanningCoverPageTemplate();
  console.log(coverHtml.substring(0, 500) + '...\n');

  console.log('='.repeat(70));
  console.log('✅ VALIDATION COMPLETE');
  console.log('='.repeat(70));
  console.log('\n🌐 Next Step: Test in browser at http://localhost:5174/');
  console.log('   1. Fill out the form with test data');
  console.log('   2. Click "Generate Complete Estate Plan"');
  console.log('   3. Verify all 18-20 PDFs are generated\n');

  process.exit(errors.length > 0 ? 1 : 0);

} catch (error) {
  console.error('\n❌ VALIDATION FAILED!');
  console.error('='.repeat(70));
  console.error('Error:', error.message);
  console.error('\nStack trace:');
  console.error(error.stack);
  console.error('='.repeat(70));
  process.exit(1);
}
