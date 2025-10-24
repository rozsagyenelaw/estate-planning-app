/**
 * Test DOCX Template - Node.js Version
 * Directly reads file instead of using fetch
 */

import fs from 'fs';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';

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

// Helper functions (same as in docxTemplateService.js)
const getMaritalStatusStatement = (maritalStatus) => {
  const status = (maritalStatus || '').toLowerCase();
  if (status === 'single' || status === 'unmarried') {
    return 'I am not married';
  } else if (status === 'married') {
    return 'I am married';
  } else if (status === 'divorced') {
    return 'I am divorced';
  } else if (status === 'widowed') {
    return 'I am widowed';
  }
  return '';
};

const getPronounPossessive = (sex) => {
  const gender = (sex || '').toLowerCase();
  if (gender === 'male' || gender === 'm') {
    return 'his';
  } else if (gender === 'female' || gender === 'f') {
    return 'her';
  }
  return 'their';
};

// Prepare template data
const prepareTemplateData = (formData) => {
  const childrenStatement = formData.children && formData.children.length > 0
    ? `I have ${formData.children.length} ${formData.children.length === 1 ? 'child' : 'children'}: ${formData.children.map(c => `${c.firstName} ${c.lastName}`).join(', ')}.`
    : 'I have no children.';

  return {
    trust: {
      name: formData.trustName || '',
      currentDate: formData.currentDate || '',
      isJoint: formData.isJoint ? 'Yes' : 'No',
      isIrrevocable: formData.isIrrevocable ? 'Yes' : 'No',
    },
    client: {
      firstName: formData.client?.firstName || '',
      middleName: formData.client?.middleName || '',
      lastName: formData.client?.lastName || '',
      fullName: `${formData.client?.firstName || ''} ${formData.client?.middleName || ''} ${formData.client?.lastName || ''}`.trim(),
      address: formData.client?.address || '',
      city: formData.client?.city || '',
      state: formData.client?.state || '',
      zip: formData.client?.zip || '',
      county: formData.client?.county || '',
      dateOfBirth: formData.client?.dateOfBirth || '',
      maritalStatus: formData.client?.maritalStatus || '',
      maritalStatusStatement: getMaritalStatusStatement(formData.client?.maritalStatus),
    },
    childrenStatement,
    firstChild: formData.children && formData.children.length > 0 ? {
      firstName: formData.children[0].firstName || '',
      lastName: formData.children[0].lastName || '',
      dateOfBirth: formData.children[0].dateOfBirth || '',
      fullName: `${formData.children[0].firstName || ''} ${formData.children[0].lastName || ''}`.trim(),
      relation: formData.children[0].relation || 'child',
    } : {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      fullName: '',
      relation: '',
    },
    exampleChild: formData.children && formData.children.length > 0 ? {
      firstName: formData.children[0].firstName || '',
      lastName: formData.children[0].lastName || '',
      dateOfBirth: formData.children[0].dateOfBirth || '',
      fullName: `${formData.children[0].firstName || ''} ${formData.children[0].lastName || ''}`.trim(),
      relation: formData.children[0].relation || 'child',
    } : {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      fullName: '',
      relation: '',
    },
    clientPOA1: formData.durablePOA?.client && formData.durablePOA.client.length > 0 ? {
      firstName: formData.durablePOA.client[0].firstName || '',
      lastName: formData.durablePOA.client[0].lastName || '',
      fullName: `${formData.durablePOA.client[0].firstName || ''} ${formData.durablePOA.client[0].lastName || ''}`.trim(),
      pronounPossessive: getPronounPossessive(formData.durablePOA.client[0].sex),
    } : {
      firstName: '',
      lastName: '',
      fullName: '',
      pronounPossessive: 'their',
    },
    clientPOA2: formData.durablePOA?.client && formData.durablePOA.client.length > 1 ? {
      firstName: formData.durablePOA.client[1].firstName || '',
      lastName: formData.durablePOA.client[1].lastName || '',
      fullName: `${formData.durablePOA.client[1].firstName || ''} ${formData.durablePOA.client[1].lastName || ''}`.trim(),
    } : {
      firstName: '',
      lastName: '',
      fullName: '',
    },
    clientHealthcare1: formData.healthcarePOA?.client && formData.healthcarePOA.client.length > 0 ? {
      firstName: formData.healthcarePOA.client[0].firstName || '',
      lastName: formData.healthcarePOA.client[0].lastName || '',
      fullName: `${formData.healthcarePOA.client[0].firstName || ''} ${formData.healthcarePOA.client[0].lastName || ''}`.trim(),
    } : {
      firstName: '',
      lastName: '',
      fullName: '',
    },
    clientHealthcare2: formData.healthcarePOA?.client && formData.healthcarePOA.client.length > 1 ? {
      firstName: formData.healthcarePOA.client[1].firstName || '',
      lastName: formData.healthcarePOA.client[1].lastName || '',
      fullName: `${formData.healthcarePOA.client[1].firstName || ''} ${formData.healthcarePOA.client[1].lastName || ''}`.trim(),
    } : {
      firstName: '',
      lastName: '',
      fullName: '',
    },
    clientPourOverRep1: formData.pourOverWill?.client?.personalRepresentatives && formData.pourOverWill.client.personalRepresentatives.length > 0 ? {
      firstName: formData.pourOverWill.client.personalRepresentatives[0].firstName || '',
      lastName: formData.pourOverWill.client.personalRepresentatives[0].lastName || '',
      fullName: `${formData.pourOverWill.client.personalRepresentatives[0].firstName || ''} ${formData.pourOverWill.client.personalRepresentatives[0].lastName || ''}`.trim(),
    } : {
      firstName: '',
      lastName: '',
      fullName: '',
    },
    clientPourOverRep2: formData.pourOverWill?.client?.personalRepresentatives && formData.pourOverWill.client.personalRepresentatives.length > 1 ? {
      firstName: formData.pourOverWill.client.personalRepresentatives[1].firstName || '',
      lastName: formData.pourOverWill.client.personalRepresentatives[1].lastName || '',
      fullName: `${formData.pourOverWill.client.personalRepresentatives[1].firstName || ''} ${formData.pourOverWill.client.personalRepresentatives[1].lastName || ''}`.trim(),
    } : {
      firstName: '',
      lastName: '',
      fullName: '',
    },
  };
};

const templatePath = './public/templates/single_estate_planning_template.docx';

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
  // Read template file directly
  const content = fs.readFileSync(templatePath);
  const zip = new PizZip(content);

  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
    nullGetter: () => '',
  });

  // Prepare and set data
  const templateData = prepareTemplateData(sampleFormData);

  console.log('🔧 Prepared template data with placeholders:');
  console.log('   - client.maritalStatusStatement:', templateData.client.maritalStatusStatement);
  console.log('   - clientPOA1.pronounPossessive:', templateData.clientPOA1.pronounPossessive);
  console.log('   - firstChild.relation:', templateData.firstChild.relation);
  console.log('');

  doc.setData(templateData);

  // Render the document
  doc.render();

  // Generate buffer
  const buf = doc.getZip().generate({
    type: 'nodebuffer',
    compression: 'DEFLATE',
  });

  // Save to test file
  fs.writeFileSync('./test-output-estate-plan.docx', buf);

  console.log('\n✅ SUCCESS!');
  console.log('Document generated successfully');
  console.log('Size:', buf.length, 'bytes');
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
      console.log('   Tag:', err.properties?.xtag || 'N/A');
      console.log('   Context:', err.properties?.context?.substring(0, 100) || 'N/A');
      console.log('   Explanation:', err.properties?.explanation || 'N/A');
      console.log('   File:', err.properties?.file || 'N/A');
    });
  }

  console.log('\n');
  process.exit(1);
}
