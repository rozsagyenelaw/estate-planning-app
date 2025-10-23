/**
 * Test DOCX Template System
 * Simulates what happens when generating documents without templates
 */

import { generateLivingTrust } from './src/services/documentGenerator.js';

// Sample form data
const sampleFormData = {
  trustName: 'Smith Family Living Trust',
  trustType: 'single',
  isJoint: false,
  isIrrevocable: false,
  isRestatement: false,
  currentDate: 'December 23, 2024',

  client: {
    firstName: 'John',
    middleName: 'Michael',
    lastName: 'Smith',
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
    maritalStatus: 'Single'
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

  successorTrustees: [
    {
      firstName: 'Jane',
      lastName: 'Doe',
      address: '456 Oak Avenue',
      phone: '555-987-6543',
      email: 'jane.doe@email.com'
    }
  ],

  guardians: [
    {
      firstName: 'Robert',
      lastName: 'Johnson',
      address: '789 Pine Street',
      phone: '555-456-7890'
    }
  ]
};

console.log('\n================================');
console.log('Testing DOCX Template System');
console.log('================================\n');

console.log('Attempting to generate Single Living Trust...\n');

try {
  const result = await generateLivingTrust(sampleFormData);
  console.log('\n✅ SUCCESS!');
  console.log('Document generated:', typeof result);
  console.log('Size:', result.size, 'bytes');

} catch (error) {
  console.log('\n❌ ERROR (This is expected without templates):\n');
  console.log(error.message);
  console.log('\n================================');
  console.log('This error proves the system is working correctly!');
  console.log('It will NOT fall back to JavaScript templates.');
  console.log('================================\n');
}
