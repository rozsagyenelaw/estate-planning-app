/**
 * Test Single Estate Planning Template
 * Tests the complete estate planning template with all placeholders
 */

import { generateFromDOCXTemplate } from './src/services/docxTemplateService.js';
import fs from 'fs';

console.log('\n================================');
console.log('Testing Single Estate Planning Template');
console.log('================================\n');

// Comprehensive sample data matching the template requirements
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
    maritalStatus: 'Single',
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
  ],

  durablePOA: {
    client: [
      {
        firstName: 'Alice',
        lastName: 'Brown',
        sex: 'Female',
      },
      {
        firstName: 'Bob',
        lastName: 'Wilson',
        sex: 'Male',
      }
    ]
  },

  healthcarePOA: {
    client: [
      {
        firstName: 'Carol',
        lastName: 'Davis',
      },
      {
        firstName: 'Dan',
        lastName: 'Miller',
      }
    ]
  },

  pourOverWill: {
    client: {
      personalRepresentatives: [
        {
          firstName: 'Eve',
          lastName: 'Anderson',
        },
        {
          firstName: 'Frank',
          lastName: 'Taylor',
        }
      ]
    }
  },

  anatomicalGifts: {
    client: 'any',
  }
};

const templatePath = '/templates/single_estate_planning_template.docx';

console.log('📄 Loading template:', templatePath);
console.log('📝 Sample data includes:');
console.log('   - Client:', sampleFormData.client.firstName, sampleFormData.client.lastName);
console.log('   - Marital Status:', sampleFormData.client.maritalStatus);
console.log('   - Children:', sampleFormData.children.length);
console.log('   - POA Agents:', sampleFormData.durablePOA.client.length);
console.log('   - Healthcare Agents:', sampleFormData.healthcarePOA.client.length);
console.log('   - Personal Reps:', sampleFormData.pourOverWill.client.personalRepresentatives.length);
console.log('');

try {
  const result = await generateFromDOCXTemplate(sampleFormData, templatePath);

  console.log('\n✅ SUCCESS!');
  console.log('Document generated successfully');
  console.log('Size:', result.size, 'bytes');
  console.log('Type:', result.type);

  // Save to test file
  const arrayBuffer = await result.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  fs.writeFileSync('./test-output-estate-plan.docx', buffer);

  console.log('\n📁 Saved to: test-output-estate-plan.docx');
  console.log('✨ You can open this file to verify all placeholders were filled correctly!');
  console.log('\n================================');
  console.log('✅ TEST PASSED');
  console.log('================================\n');

} catch (error) {
  console.log('\n================================');
  console.log('❌ TEST FAILED');
  console.log('================================\n');
  console.error('Error:', error.message);

  if (error.properties && error.properties.errors) {
    console.log('\n📋 Template errors:');
    error.properties.errors.forEach((err, index) => {
      console.log(`\n${index + 1}. ${err.message}`);
      if (err.properties) {
        console.log('   Context:', err.properties.context?.substring(0, 100));
        console.log('   Tag:', err.properties.xtag);
      }
    });
  }

  console.log('\n');
  process.exit(1);
}
