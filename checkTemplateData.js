/**
 * Check what data is available in templateData
 */

import { sampleJointTrustData } from './src/utils/testDocumentGeneration.js';
import { prepareTemplateData } from './src/services/templateEngine.js';

console.log('='.repeat(70));
console.log('TEMPLATE DATA INSPECTION');
console.log('='.repeat(70));

const templateData = prepareTemplateData(sampleJointTrustData);

console.log('\nAll available data keys:');
console.log('-'.repeat(70));
Object.keys(templateData).sort().forEach(key => {
  const value = templateData[key];
  const preview = typeof value === 'string'
    ? (value.length > 50 ? value.substring(0, 50) + '...' : value)
    : (typeof value === 'object' ? JSON.stringify(value).substring(0, 50) + '...' : value);
  console.log(`${key.padEnd(30)} = ${preview}`);
});

console.log('\n' + '='.repeat(70));
console.log('\nLooking for specific placeholders:');
console.log('-'.repeat(70));

const needed = [
  'CLIENT_FULL_NAME',
  'SPOUSE_FULL_NAME',
  'TRUST_DATE_FORMATTED',
  'SUCCESSOR_TRUSTEE_NAME',
  'DPOA_SUCCESSOR_NAME',
  'HEALTHCARE_SUCCESSOR_NAME',
  'POUROVER_SUCCESSOR_REP'
];

needed.forEach(key => {
  if (templateData[key]) {
    console.log(`✅ ${key} = ${templateData[key]}`);
  } else {
    console.log(`❌ ${key} = NOT FOUND`);
  }
});

console.log('\n' + '='.repeat(70));
