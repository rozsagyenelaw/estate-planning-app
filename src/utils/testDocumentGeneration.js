/**
 * Test Document Generation
 * Creates sample form data and tests the document generation system
 */

import { processTemplate, prepareTemplateData } from '../services/templateEngine.js';
import { singleLivingTrustTemplate } from '../templates/singleLivingTrust.js';

/**
 * Sample form data for testing - SINGLE TRUST
 */
export const sampleFormData = {
  // Trust Type
  trustType: 'SINGLE',
  isJoint: false,
  isRestatement: true,
  originalTrustName: 'John M. Smith Living Trust',
  originalTrustDate: '2020-01-15',

  // Trust Name
  trustName: 'John M. Smith Living Trust',
  customTrustName: false,

  // Client Information
  client: {
    firstName: 'John',
    middleName: 'Michael',
    lastName: 'Smith',
    address: '123 Main Street',
    city: 'San Francisco',
    state: 'CA',
    zip: '94102',
    county: 'San Francisco',
    phone: '(415) 555-0123',
    email: 'john.smith@example.com',
    ssn: '123-45-6789',
    dateOfBirth: '1965-06-15',
    sex: 'Male',
    maritalStatus: 'Divorced'
  },

  // Spouse (null for single trust)
  spouse: null,

  // Children
  children: [
    {
      name: 'Sarah Elizabeth Smith',
      birthday: '1990-03-12',
      relation: 'Daughter'
    },
    {
      name: 'Michael James Smith',
      birthday: '1992-08-24',
      relation: 'Son'
    },
    {
      name: 'Emily Grace Smith',
      birthday: '1995-11-30',
      relation: 'Daughter'
    }
  ],

  // Successor Trustees
  successorTrustees: [
    {
      name: 'Sarah Elizabeth Smith',
      address: '456 Oak Avenue, Los Angeles, CA 90001',
      phone: '(310) 555-0145',
      jointly: false
    },
    {
      name: 'Robert Johnson',
      address: '789 Pine Street, San Diego, CA 92101',
      phone: '(619) 555-0167',
      jointly: false
    }
  ],

  // Specific Distributions
  specificDistributions: [
    {
      beneficiaryName: 'Sarah Elizabeth Smith',
      description: 'All personal jewelry and family photos',
      distributionType: 'age-based',
      ageDistributions: [
        { age: '25', percentage: '50' },
        { age: '30', percentage: '50' }
      ],
      lapseTo: 'the residuary estate'
    },
    {
      beneficiaryName: 'Michael James Smith',
      description: 'The vintage automobile collection',
      distributionType: 'outright',
      ageDistributions: [],
      lapseTo: ''
    },
    {
      beneficiaryName: 'Emily Grace Smith',
      description: '$50,000 in cash',
      distributionType: 'age-based',
      ageDistributions: [
        { age: '21', percentage: '33' },
        { age: '25', percentage: '33' },
        { age: '30', percentage: '34' }
      ],
      lapseTo: 'the residuary estate'
    },
    {
      beneficiaryName: 'American Red Cross',
      description: '$10,000 in cash for disaster relief programs',
      distributionType: 'outright',
      ageDistributions: [],
      lapseTo: 'the residuary estate'
    }
  ],

  // Residuary Distribution
  residuaryBeneficiaries: [
    {
      name: 'Sarah Elizabeth Smith',
      share: '40',
      distributionType: 'outright',
      birthday: '1990-03-12'
    },
    {
      name: 'Michael James Smith',
      share: '30',
      distributionType: 'guardian',
      birthday: '1992-08-24'
    },
    {
      name: 'Emily Grace Smith',
      share: '30',
      distributionType: 'guardian',
      birthday: '1995-11-30'
    }
  ],

  // General Needs Trust
  generalNeedsTrust: {
    enabled: false,
    beneficiaryName: '',
    specialProvisions: ''
  },

  // Charitable Distribution
  charitableDistribution: {
    organizationName: '',
    address: '',
    taxId: '',
    amount: '',
    percentage: ''
  },

  // Pour Over Will
  pourOverWill: {
    client: [
      { name: 'Sarah Elizabeth Smith' },
      { name: 'Robert Johnson' }
    ],
    spouse: []
  },

  // Guardians
  guardians: [
    {
      name: 'Robert and Jennifer Johnson',
      address: '789 Pine Street, San Diego, CA 92101',
      phone: '(619) 555-0167',
      jointly: true
    },
    {
      name: 'Patricia Williams',
      address: '321 Elm Street, Sacramento, CA 95814',
      phone: '(916) 555-0189',
      jointly: false
    }
  ],

  // Durable Power of Attorney
  durablePOA: {
    client: [
      { name: 'Sarah Elizabeth Smith', jointly: false },
      { name: 'Robert Johnson', jointly: false }
    ],
    spouse: []
  },

  // Healthcare Power of Attorney
  healthcarePOA: {
    client: [
      {
        name: 'Sarah Elizabeth Smith',
        address: '456 Oak Avenue, Los Angeles, CA 90001',
        phone: '(310) 555-0145',
        jointly: false
      },
      {
        name: 'Michael James Smith',
        address: '654 Maple Drive, San Jose, CA 95110',
        phone: '(408) 555-0156',
        jointly: false
      }
    ],
    spouse: []
  },

  // Anatomical Gifts
  anatomicalGifts: {
    client: 'any_purpose',
    spouse: ''
  }
};

/**
 * Test the document generation system
 */
export const testDocumentGeneration = () => {
  console.log('=== Testing Document Generation System ===\n');

  try {
    // Step 1: Prepare template data
    console.log('Step 1: Preparing template data...');
    const templateData = prepareTemplateData(sampleFormData);
    console.log('✓ Template data prepared successfully');
    console.log('Sample data keys:', Object.keys(templateData).slice(0, 10).join(', '), '...\n');

    // Step 2: Process template
    console.log('Step 2: Processing template with data...');
    const processedHtml = processTemplate(singleLivingTrustTemplate, templateData);
    console.log('✓ Template processed successfully');
    console.log('Generated HTML length:', processedHtml.length, 'characters\n');

    // Step 3: Check for unprocessed placeholders
    console.log('Step 3: Checking for unprocessed placeholders...');
    const placeholderRegex = /\{\{([A-Z_][A-Z0-9_]*)\}\}/g;
    const unprocessedPlaceholders = [];
    let match;
    while ((match = placeholderRegex.exec(processedHtml)) !== null) {
      if (!unprocessedPlaceholders.includes(match[1])) {
        unprocessedPlaceholders.push(match[1]);
      }
    }

    if (unprocessedPlaceholders.length > 0) {
      console.log('⚠ Found unprocessed placeholders:', unprocessedPlaceholders.join(', '));
    } else {
      console.log('✓ All placeholders processed successfully');
    }

    // Step 4: Display sample of processed content
    console.log('\nStep 4: Sample of processed content:');
    console.log('-----------------------------------');
    const sampleContent = processedHtml.substring(0, 1000);
    console.log(sampleContent);
    console.log('...\n');

    // Step 5: Check for key content
    console.log('Step 5: Verifying key content...');
    const checks = [
      { name: 'Trust Name', content: 'John M. Smith Living Trust' },
      { name: 'Client Name', content: 'John Michael Smith' },
      { name: 'Restatement', content: 'FIRST RESTATEMENT' },
      { name: 'Children Section', content: 'Sarah Elizabeth Smith' },
      { name: 'Trustees Section', content: 'Robert Johnson' }
    ];

    checks.forEach(check => {
      if (processedHtml.includes(check.content)) {
        console.log(`✓ ${check.name} found`);
      } else {
        console.log(`✗ ${check.name} NOT found`);
      }
    });

    console.log('\n=== Document Generation Test Complete ===');
    console.log('\nNext step: Click "Generate Living Trust" button in the UI to create the PDF');

    return {
      success: true,
      templateData,
      processedHtml,
      unprocessedPlaceholders
    };

  } catch (error) {
    console.error('✗ Error during testing:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * Sample form data for testing - JOINT TRUST
 */
export const sampleJointTrustData = {
  // Trust Type
  trustType: 'JOINT',
  isJoint: true,
  isRestatement: true,
  originalTrustName: 'The Karen Nikolaevich Bagramyan and Lilit Arakelyan Living Trust',
  originalTrustDate: '2020-01-10',

  // Trust Name
  trustName: 'The Karen Nikolaevich Bagramyan and Lilit Arakelyan Living Trust',
  customTrustName: false,

  // Client Information
  client: {
    firstName: 'Karen',
    middleName: 'Nikolaevich',
    lastName: 'Bagramyan',
    address: '450 N Brand Blvd, Suite 623',
    city: 'Glendale',
    state: 'CA',
    zip: '91203',
    county: 'Los Angeles',
    phone: '(818) 555-0100',
    email: 'karen.b@example.com',
    ssn: '123-45-6789',
    dateOfBirth: '1975-03-20',
    sex: 'Male',
    maritalStatus: 'Married'
  },

  // Spouse Information
  spouse: {
    firstName: 'Lilit',
    middleName: '',
    lastName: 'Arakelyan',
    address: '450 N Brand Blvd, Suite 623',
    city: 'Glendale',
    state: 'CA',
    zip: '91203',
    county: 'Los Angeles',
    phone: '(818) 555-0101',
    email: 'lilit.a@example.com',
    ssn: '987-65-4321',
    dateOfBirth: '1978-08-15',
    sex: 'Female',
    maritalStatus: 'Married'
  },

  // Children
  children: [
    {
      name: 'Rita Bagramyan',
      birthday: '2005-12-15',
      relation: 'Daughter'
    },
    {
      name: 'Artur Bagramian',
      birthday: '2011-04-11',
      relation: 'Son'
    }
  ],

  // Successor Trustees
  successorTrustees: [
    {
      name: 'Rita Bagramyan and Artur Bagramian',
      address: '450 N Brand Blvd, Suite 623, Glendale, CA 91203',
      phone: '(818) 555-0102',
      jointly: true
    }
  ],

  // Specific Distributions
  specificDistributions: [
    {
      beneficiaryName: 'Rita Bagramyan',
      description: '112 S. Everett St. Glendale, CA 91205',
      distributionType: 'outright',
      ageDistributions: [],
      lapseTo: 'the residuary estate'
    },
    {
      beneficiaryName: 'Artur Bagramian',
      description: '1351 Carlton Dr. Glendale, CA 91205',
      distributionType: 'outright',
      ageDistributions: [],
      lapseTo: 'the residuary estate'
    }
  ],

  // Residuary Distribution
  residuaryBeneficiaries: [
    {
      name: 'Artur Bagramian',
      share: '100',
      distributionType: 'guardian',
      birthday: '2011-04-11'
    }
  ],

  // General Needs Trust
  generalNeedsTrust: {
    enabled: false,
    beneficiaryName: '',
    specialProvisions: ''
  },

  // Charitable Distribution
  charitableDistribution: {
    organizationName: '',
    address: '',
    taxId: '',
    amount: '',
    percentage: ''
  },

  // Pour Over Will
  pourOverWill: {
    client: [
      { name: 'Rita Bagramyan' },
      { name: 'Artur Bagramian' }
    ],
    spouse: [
      { name: 'Rita Bagramyan' },
      { name: 'Artur Bagramian' }
    ]
  },

  // Guardians
  guardians: [
    {
      name: 'Family Member (To Be Named)',
      address: 'TBD',
      phone: '(818) 555-0000',
      jointly: false
    }
  ],

  // Durable Power of Attorney
  durablePOA: {
    client: [
      { name: 'Rita Bagramyan', jointly: false },
      { name: 'Artur Bagramian', jointly: false }
    ],
    spouse: [
      { name: 'Rita Bagramyan', jointly: false },
      { name: 'Artur Bagramian', jointly: false }
    ]
  },

  // Healthcare Power of Attorney
  healthcarePOA: {
    client: [
      {
        name: 'Rita Bagramyan',
        address: '450 N Brand Blvd, Glendale, CA 91203',
        phone: '(818) 555-0103',
        jointly: false
      }
    ],
    spouse: [
      {
        name: 'Rita Bagramyan',
        address: '450 N Brand Blvd, Glendale, CA 91203',
        phone: '(818) 555-0103',
        jointly: false
      }
    ]
  },

  // Anatomical Gifts
  anatomicalGifts: {
    client: 'any_purpose',
    spouse: 'any_purpose'
  }
};

export default testDocumentGeneration;
