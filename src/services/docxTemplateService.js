/**
 * DOCX Template Service
 * Uses docxtemplater to fill Word document templates with form data
 */

import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';
import expressions from 'angular-expressions';

/**
 * Format date to US format (MM/DD/YYYY)
 * Handles YYYY-MM-DD, ISO dates, and Date objects
 */
const formatDateToUS = (dateString) => {
  if (!dateString) return '';

  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString; // Return original if invalid

    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;
  } catch (e) {
    return dateString; // Return original if error
  }
};

/**
 * Parse percentage value to a number
 * Handles: "50%", "50", 50 -> returns 50
 */
const parsePercentage = (value) => {
  if (!value && value !== 0) return 0;

  // If already a number, return it
  if (typeof value === 'number') return value;

  // If string, remove % symbol and parse
  const str = String(value).trim();
  const num = parseFloat(str.replace('%', ''));

  return isNaN(num) ? 0 : num;
};

/**
 * Get marital status statement
 */
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

/**
 * Get possessive pronoun based on sex
 */
const getPronounPossessive = (sex) => {
  const gender = (sex || '').toLowerCase();
  if (gender === 'male' || gender === 'm') {
    return 'his';
  } else if (gender === 'female' || gender === 'f') {
    return 'her';
  }
  return 'their';
};

/**
 * Get objective pronoun based on sex
 */
const getPronounObjective = (sex) => {
  const gender = (sex || '').toLowerCase();
  if (gender === 'male' || gender === 'm') {
    return 'him';
  } else if (gender === 'female' || gender === 'f') {
    return 'her';
  }
  return 'them';
};

/**
 * Get reflexive pronoun based on sex
 */
const getPronounReflexive = (sex) => {
  const gender = (sex || '').toLowerCase();
  if (gender === 'male' || gender === 'm') {
    return 'himself';
  } else if (gender === 'female' || gender === 'f') {
    return 'herself';
  }
  return 'themselves';
};

/**
 * Load a DOCX template from the public folder
 * @param {string} templatePath - Path to template (e.g., '/templates/single_living_trust_template.docx')
 * @returns {Promise<ArrayBuffer>} - Template as ArrayBuffer
 */
export const loadDOCXTemplate = async (templatePath) => {
  try {
    const response = await fetch(templatePath);
    if (!response.ok) {
      throw new Error(`Failed to load template: ${response.statusText}`);
    }
    const arrayBuffer = await response.arrayBuffer();
    return arrayBuffer;
  } catch (error) {
    console.error('Error loading DOCX template:', error);
    throw error;
  }
};

/**
 * Create template data object from form data
 * This flattens the formData into a simple object for docxtemplater
 * @param {Object} formData - Form data
 * @returns {Object} - Flattened data object
 */
const prepareTemplateData = (formData) => {
  console.log('=== PREPARING TEMPLATE DATA ===');
  console.log('Input formData keys:', Object.keys(formData));
  
  // ============================================================================
  // CRITICAL FIX: Clean specificDistributions and beneficiaries arrays
  // ============================================================================
  
  // Clean specificDistributions - remove empty objects
  let cleanedSpecificDistributions = [];
  if (formData.specificDistributions && Array.isArray(formData.specificDistributions)) {
    console.log('Original specificDistributions:', formData.specificDistributions);
    cleanedSpecificDistributions = formData.specificDistributions.filter(dist => {
      // Keep only distributions that have meaningful data
      // Form uses 'beneficiary' and 'description' field names
      const beneficiaryName = dist.beneficiaryName || dist.beneficiary;
      const propertyDesc = dist.propertyDescription || dist.description || dist.property;
      const hasData = dist &&
                      beneficiaryName &&
                      beneficiaryName.trim() !== '' &&
                      propertyDesc &&
                      propertyDesc.trim() !== '';
      if (!hasData && dist) {
        console.log('Removing empty distribution:', dist);
      }
      return hasData;
    });
    console.log('Cleaned specificDistributions:', cleanedSpecificDistributions);
  }
  
  // Add section numbers to specificDistributions
  const specificDistributionsWithSections = cleanedSpecificDistributions.map((dist, index) => ({
    distribution: {
      sectionNumber: String(index + 1).padStart(2, '0'),
      beneficiaryName: dist.beneficiaryName || dist.beneficiary || '',
      propertyDescription: dist.propertyDescription || dist.description || dist.property || '',
      property: dist.propertyDescription || dist.description || dist.property || '',
      percentage: dist.percentage || '',
      hasAgeCondition: dist.hasAgeCondition || false,
      conditionAge: dist.conditionAge || dist.age || '',
      conditionPerson: dist.conditionPerson || dist.beneficiaryName || dist.beneficiary || '',
    }
  }));
  
  // Calculate tpp_section_num based on cleaned array
  const tppSectionNum = specificDistributionsWithSections.length > 0
    ? String(specificDistributionsWithSections.length + 1).padStart(2, '0')
    : '01';
  
  const tppNum = parseInt(tppSectionNum);
  
  console.log('TPP section numbers:', {
    tpp_section_num: tppSectionNum,
    numSpecificDistributions: specificDistributionsWithSections.length,
  });
  
  // Clean residuary beneficiaries - remove empty objects
  let cleanedBeneficiaries = [];
  if (formData.residuaryBeneficiaries && Array.isArray(formData.residuaryBeneficiaries)) {
    console.log('Original residuaryBeneficiaries:', formData.residuaryBeneficiaries);
    cleanedBeneficiaries = formData.residuaryBeneficiaries.filter(ben => {
      // Keep only beneficiaries that have meaningful data
      const hasData = ben && 
                      (ben.name || ben.firstName || ben.fullName) &&
                      (ben.name?.trim() !== '' || ben.firstName?.trim() !== '' || ben.fullName?.trim() !== '') &&
                      (typeof ben.share !== 'undefined' || typeof ben.percentage !== 'undefined');
      if (!hasData && ben) {
        console.log('Removing empty beneficiary:', ben);
      }
      return hasData;
    });
    console.log('Cleaned beneficiaries count:', cleanedBeneficiaries.length);
  }

  const data = {
    // Client information
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
      phone: formData.client?.phone || '',
      email: formData.client?.email || '',
      ssn: formData.client?.ssn || '',
      dateOfBirth: formatDateToUS(formData.client?.dateOfBirth) || '',
      sex: formData.client?.sex || '',
      maritalStatus: formData.client?.maritalStatus || '',
      maritalStatusStatement: getMaritalStatusStatement(formData.client?.maritalStatus),
      notaryDate: formData.client?.notaryDate || '',
    },

    // Spouse information (if joint)
    spouse: formData.isJoint && formData.spouse ? {
      firstName: formData.spouse.firstName || '',
      middleName: formData.spouse.middleName || '',
      lastName: formData.spouse.lastName || '',
      fullName: `${formData.spouse.firstName || ''} ${formData.spouse.middleName || ''} ${formData.spouse.lastName || ''}`.trim(),
      address: formData.spouse.address || '',
      city: formData.spouse.city || '',
      state: formData.spouse.state || '',
      zip: formData.spouse.zip || '',
      county: formData.spouse.county || '',
      phone: formData.spouse.phone || '',
      email: formData.spouse.email || '',
      ssn: formData.spouse.ssn || '',
      dateOfBirth: formatDateToUS(formData.spouse.dateOfBirth) || '',
      sex: formData.spouse.sex || '',
      notaryDate: formData.spouse.notaryDate || '',
    } : {},

    // Trust information
    trust: {
      name: formData.trustName || '',
      type: formData.trustType || '',
      isJoint: formData.isJoint ? 'Yes' : 'No',
      isIrrevocable: formData.isIrrevocable ? 'Yes' : 'No',
      isRestatement: formData.isRestatement ? 'Yes' : 'No',
      originalTrustName: formData.originalTrustName || '',
      originalTrustDate: formData.originalTrustDate || '',
      currentDate: formData.currentDate || new Date().toLocaleDateString('en-US'),
    },

    // Children
    children: formData.children || [],
    numChildren: formData.children?.length || 0,
    childrenList: (formData.children || []).map((c, i) =>
      `${i + 1}. ${c.firstName} ${c.lastName}, born ${formatDateToUS(c.dateOfBirth)}`
    ).join('\n'),

    // Children statement (for templates)
    childrenStatement: formData.children && formData.children.length > 0
      ? formData.children.length === 1
        ? `I have one child, ${formData.children[0].firstName} ${formData.children[0].lastName}, born ${formatDateToUS(formData.children[0].dateOfBirth)}.`
        : `I have ${formData.children.length} children.`
      : 'I have no children.',

    // Children table (formatted for Word table placeholders)
    childrenTable: formData.children && formData.children.length > 0
      ? formData.children.map(c =>
          `${c.firstName || ''} ${c.lastName || ''}, born ${formatDateToUS(c.dateOfBirth) || 'N/A'}`
        ).join('; ')
      : 'None',

    // First child info (for templates that reference first child specifically)
    firstChild: formData.children && formData.children.length > 0 ? {
      firstName: formData.children[0].firstName || '',
      lastName: formData.children[0].lastName || '',
      dateOfBirth: formatDateToUS(formData.children[0].dateOfBirth) || '',
      fullName: `${formData.children[0].firstName || ''} ${formData.children[0].lastName || ''}`.trim(),
      relation: formData.children[0].relation || 'child',
    } : {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      fullName: '',
      relation: '',
    },

    // Example child (same as first child for template compatibility)
    exampleChild: formData.children && formData.children.length > 0 ? {
      firstName: formData.children[0].firstName || '',
      lastName: formData.children[0].lastName || '',
      dateOfBirth: formatDateToUS(formData.children[0].dateOfBirth) || '',
      fullName: `${formData.children[0].firstName || ''} ${formData.children[0].lastName || ''}`.trim(),
      relation: formData.children[0].relation || 'child',
    } : {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      fullName: '',
      relation: '',
    },

    // Successor Trustees
    successorTrustees: formData.successorTrustees || [],
    numTrustees: formData.successorTrustees?.length || 0,
    trusteesServeType: formData.trusteesServeType || 'sequential',
    trusteesList: (() => {
      const trustees = formData.successorTrustees || [];
      if (trustees.length === 0) return '';

      const names = trustees.map(t => `${t.firstName || ''} ${t.lastName || ''}`.trim());
      const serveType = formData.trusteesServeType || 'sequential';

      if (serveType === 'together') {
        // Format: "Name1 and Name2, jointly or the survivor of them"
        if (names.length === 1) return names[0];
        if (names.length === 2) return `${names[0]} and ${names[1]}, jointly or the survivor of them`;
        // For 3+: "Name1, Name2, and Name3, jointly or the survivor of them"
        const lastTwo = `${names[names.length - 2]}, and ${names[names.length - 1]}`;
        return `${names.slice(0, -2).join(', ')}, ${lastTwo}, jointly or the survivor of them`;
      } else {
        // Format: "Name1, then Name2" (sequential)
        return names.join(',\nthen ');
      }
    })(),

    // Guardians
    guardians: formData.guardians || [],
    guardiansList: (formData.guardians || []).map((g, i) =>
      `${i + 1}. ${g.firstName} ${g.lastName}`
    ).join('\n'),

    // POA Agents - Client (individual agents with pronouns)
    clientPOA: formData.durablePOA?.client || [],
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

    // POA Agents - Spouse
    spousePOA: formData.durablePOA?.spouse || [],
    spousePOA1: formData.durablePOA?.spouse && formData.durablePOA.spouse.length > 0 ? {
      firstName: formData.durablePOA.spouse[0].firstName || '',
      lastName: formData.durablePOA.spouse[0].lastName || '',
      fullName: `${formData.durablePOA.spouse[0].firstName || ''} ${formData.durablePOA.spouse[0].lastName || ''}`.trim(),
      pronounPossessive: getPronounPossessive(formData.durablePOA.spouse[0].sex),
    } : {
      firstName: '',
      lastName: '',
      fullName: '',
      pronounPossessive: 'their',
    },
    spousePOA2: formData.durablePOA?.spouse && formData.durablePOA.spouse.length > 1 ? {
      firstName: formData.durablePOA.spouse[1].firstName || '',
      lastName: formData.durablePOA.spouse[1].lastName || '',
      fullName: `${formData.durablePOA.spouse[1].firstName || ''} ${formData.durablePOA.spouse[1].lastName || ''}`.trim(),
    } : {
      firstName: '',
      lastName: '',
      fullName: '',
    },

    // Healthcare Agents - Client
    clientHealthcare: formData.healthcarePOA?.client || [],
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

    // Healthcare Agents - Spouse
    spouseHealthcare: formData.healthcarePOA?.spouse || [],
    spouseHealthcare1: formData.healthcarePOA?.spouse && formData.healthcarePOA.spouse.length > 0 ? {
      firstName: formData.healthcarePOA.spouse[0].firstName || '',
      lastName: formData.healthcarePOA.spouse[0].lastName || '',
      fullName: `${formData.healthcarePOA.spouse[0].firstName || ''} ${formData.healthcarePOA.spouse[0].lastName || ''}`.trim(),
    } : {
      firstName: '',
      lastName: '',
      fullName: '',
    },
    spouseHealthcare2: formData.healthcarePOA?.spouse && formData.healthcarePOA.spouse.length > 1 ? {
      firstName: formData.healthcarePOA.spouse[1].firstName || '',
      lastName: formData.healthcarePOA.spouse[1].lastName || '',
      fullName: `${formData.healthcarePOA.spouse[1].firstName || ''} ${formData.healthcarePOA.spouse[1].lastName || ''}`.trim(),
    } : {
      firstName: '',
      lastName: '',
      fullName: '',
    },

    // Pour-Over Will Personal Representatives - Client
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

    // Pour-Over Will Personal Representatives - Spouse
    spousePourOverRep1: formData.pourOverWill?.spouse?.personalRepresentatives && formData.pourOverWill.spouse.personalRepresentatives.length > 0 ? {
      firstName: formData.pourOverWill.spouse.personalRepresentatives[0].firstName || '',
      lastName: formData.pourOverWill.spouse.personalRepresentatives[0].lastName || '',
      fullName: `${formData.pourOverWill.spouse.personalRepresentatives[0].firstName || ''} ${formData.pourOverWill.spouse.personalRepresentatives[0].lastName || ''}`.trim(),
    } : {
      firstName: '',
      lastName: '',
      fullName: '',
    },
    spousePourOverRep2: formData.pourOverWill?.spouse?.personalRepresentatives && formData.pourOverWill.spouse.personalRepresentatives.length > 1 ? {
      firstName: formData.pourOverWill.spouse.personalRepresentatives[1].firstName || '',
      lastName: formData.pourOverWill.spouse.personalRepresentatives[1].lastName || '',
      fullName: `${formData.pourOverWill.spouse.personalRepresentatives[1].firstName || ''} ${formData.pourOverWill.spouse.personalRepresentatives[1].lastName || ''}`.trim(),
    } : {
      firstName: '',
      lastName: '',
      fullName: '',
    },

    // Anatomical Gifts
    anatomicalGifts: {
      client: formData.anatomicalGifts?.client || 'none',
      spouse: formData.anatomicalGifts?.spouse || 'none',
    },

    // ===== FLAT PLACEHOLDERS FOR TEMPLATES =====
    // These match the placeholders in the DOCX templates exactly

    // Trust/Document basics
    trustName: (() => {
      // Auto-generate trust name for joint trusts if not provided
      if (formData.isJoint && formData.client && formData.spouse) {
        const grantor1 = `${formData.client.firstName || ''} ${formData.client.middleName || ''} ${formData.client.lastName || ''}`.trim();
        const grantor2 = `${formData.spouse.firstName || ''} ${formData.spouse.middleName || ''} ${formData.spouse.lastName || ''}`.trim();

        // Use provided trust name only if it clearly indicates both spouses (contains "and" or "&")
        // This prevents incomplete names like "John Smith Living Trust" from being used for joint trusts
        if (formData.trustName &&
            (formData.trustName.includes(' and ') || formData.trustName.includes(' & ')) &&
            formData.trustName.includes(formData.client.lastName)) {
          return formData.trustName;
        }

        return `The ${grantor1} and ${grantor2} Living Trust`;
      }

      // For single trusts, use provided name or generate from client name
      return formData.trustName || (formData.client
        ? `The ${formData.client.firstName || ''} ${formData.client.middleName || ''} ${formData.client.lastName || ''} Living Trust`.trim()
        : '');
    })(),
    trustDate: formData.currentDate || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    documentDate: formData.currentDate || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),

    // Restatement information
    isRestatement: formData.isRestatement || false,
    notIsRestatement: !(formData.isRestatement || false),  // Helper for {{#if notIsRestatement}}
    originalTrustName: formData.originalTrustName || '',
    originalTrustDate: formData.originalTrustDate || '',

    // Client name variations (different templates use different names)
    grantorFullName: `${formData.client?.firstName || ''} ${formData.client?.middleName || ''} ${formData.client?.lastName || ''}`.trim(),
    clientFullName: `${formData.client?.firstName || ''} ${formData.client?.middleName || ''} ${formData.client?.lastName || ''}`.trim(),
    fullName: `${formData.client?.firstName || ''} ${formData.client?.middleName || ''} ${formData.client?.lastName || ''}`.trim(),

    // Client address fields
    clientStreetAddress: formData.client?.address || '',
    city: formData.client?.city || '',
    state: formData.client?.state || '',
    clientZipCode: formData.client?.zip || '',
    county: formData.client?.county || '',

    // Marital status
    maritalStatus: getMaritalStatusStatement(formData.client?.maritalStatus),

    // Children placeholders
    childrenStatement: formData.children && formData.children.length > 0
      ? formData.children.length === 1
        ? `I have one child: ${formData.children[0].firstName} ${formData.children[0].lastName}, born ${formatDateToUS(formData.children[0].dateOfBirth)}.`
        : formData.children.length === 2
          ? `I have two children: ${formData.children[0].firstName} ${formData.children[0].lastName}, born ${formatDateToUS(formData.children[0].dateOfBirth)}, and ${formData.children[1].firstName} ${formData.children[1].lastName}, born ${formatDateToUS(formData.children[1].dateOfBirth)}.`
          : `I have ${formData.children.length} children: ` + (formData.children || []).map((c, i) =>
              i === formData.children.length - 1
                ? `and ${c.firstName} ${c.lastName}, born ${formatDateToUS(c.dateOfBirth)}`
                : `${c.firstName} ${c.lastName}, born ${formatDateToUS(c.dateOfBirth)}`
            ).join('; ') + '.'
      : 'I have no children.',

    childrenReferences: (formData.children || []).map(c =>
      `${c.firstName || ''} ${c.lastName || ''}`.trim()
    ).join(' and '),

    // Children array for template loops
    children: (formData.children || []).map(child => ({
      fullName: `${child.firstName || ''} ${child.middleName || ''} ${child.lastName || ''}`.trim(),
      firstName: child.firstName || '',
      middleName: child.middleName || '',
      lastName: child.lastName || '',
      dateOfBirth: formatDateToUS(child.dateOfBirth || child.birthday) || '',
    })),

    // Trustees placeholders - formatted for docxtemplater
    successorTrusteesList: (() => {
      const trustees = formData.successorTrustees || [];
      if (trustees.length === 0) return '';

      const names = trustees.map(t => `${t.firstName || ''} ${t.lastName || ''}`.trim());
      const serveType = formData.trusteesServeType || 'sequential';

      if (serveType === 'together') {
        if (names.length === 1) return names[0];
        if (names.length === 2) return `${names[0]} and ${names[1]}, jointly or the survivor of them`;
        const lastTwo = `${names[names.length - 2]}, and ${names[names.length - 1]}`;
        return `${names.slice(0, -2).join(', ')}, ${lastTwo}, jointly or the survivor of them`;
      } else {
        return names.join(', then ');
      }
    })(),

    successorTrusteesDuringIncapacityFormatted: (() => {
      const trustees = formData.successorTrustees || [];
      if (trustees.length === 0) return '';

      const names = trustees.map(t => `${t.firstName || ''} ${t.lastName || ''}`.trim());
      const serveType = formData.trusteesServeType || 'sequential';

      if (serveType === 'together') {
        if (names.length === 1) return names[0];
        if (names.length === 2) return `${names[0]} and ${names[1]}, jointly or the survivor of them`;
        const lastTwo = `${names[names.length - 2]}, and ${names[names.length - 1]}`;
        return `${names.slice(0, -2).join(', ')}, ${lastTwo}, jointly or the survivor of them`;
      } else {
        return names.join(', then ');
      }
    })(),

    successorTrusteesAfterDeathFormatted: (() => {
      const trustees = formData.successorTrustees || [];
      if (trustees.length === 0) return '';

      const names = trustees.map(t => `${t.firstName || ''} ${t.lastName || ''}`.trim());
      const serveType = formData.trusteesServeType || 'sequential';

      if (serveType === 'together') {
        if (names.length === 1) return names[0];
        if (names.length === 2) return `${names[0]} and ${names[1]}, jointly or the survivor of them`;
        const lastTwo = `${names[names.length - 2]}, and ${names[names.length - 1]}`;
        return `${names.slice(0, -2).join(', ')}, ${lastTwo}, jointly or the survivor of them`;
      } else {
        return names.join(', then ');
      }
    })(),

    // ===== BENEFICIARIES - COMPLETE DATA STRUCTURE FOR DOCXTEMPLATER =====
    // This is the array that will be looped over in the template
    // CRITICAL: Uses cleanedBeneficiaries to avoid empty objects
    beneficiaries: cleanedBeneficiaries.map((beneficiary, index, array) => {
      // Calculate section number (02, 03, 04, etc. - starts at 02 because 01 is division)
      const sectionNumber = String(index + 2).padStart(2, '0');
      const isNotLast = index < array.length - 1;  // Helper for {{#if isNotLast}}

      // Get pronouns based on sex
      const sex = beneficiary.sex || '';
      const pronounPossessive = getPronounPossessive(sex);
      const pronounObjective = getPronounObjective(sex);
      const pronounReflexive = getPronounReflexive(sex);

      // Full name
      const fullName = beneficiary.name || `${beneficiary.firstName || ''} ${beneficiary.lastName || ''}`.trim();

      // Debug: Log beneficiary data
      console.log('Processing beneficiary:', fullName);
      console.log('  Full beneficiary object:', beneficiary);
      console.log('  beneficiary.share:', beneficiary.share);
      console.log('  beneficiary.percentage:', beneficiary.percentage);
      console.log('  Using percentage field (preferred):', beneficiary.percentage || beneficiary.share);
      console.log('  Parsed percentage:', parsePercentage(beneficiary.percentage || beneficiary.share));

      // CRITICAL FIX: Check if this beneficiary has a matching general needs trust
      const generalNeedsTrusts = formData.generalNeedsTrusts || [];
      console.log('  All general needs trusts:', generalNeedsTrusts);
      console.log('  Looking for match with fullName:', fullName);

      const matchingTrust = generalNeedsTrusts.find(trust =>
        (trust.beneficiaryName || '').trim().toLowerCase() === fullName.toLowerCase()
      );

      if (matchingTrust) {
        console.log('  ✓ Found matching general needs trust for:', fullName);
        console.log('  Trust distributions:', JSON.stringify(matchingTrust.distributions, null, 2));
      } else {
        console.log('  ✗ No matching general needs trust found for:', fullName);
      }

      // Debug beneficiary's own distribution settings
      console.log('  beneficiary.distributionType:', beneficiary.distributionType);
      console.log('  beneficiary.ageDistributions:', beneficiary.ageDistributions);
      console.log('  beneficiary.ageDistributionRules:', beneficiary.ageDistributionRules);

      // Determine distribution type flags
      let distributeOutright = false;
      let hasAgeDistribution = false;
      let hasGeneralNeedsTrust = false;
      let ageDistributionRules = [];

      if (matchingTrust && matchingTrust.distributions && matchingTrust.distributions.length > 0) {
        // If there's a matching general needs trust with distributions, use it
        console.log('  → Taking PATH 1: Using general needs trust distributions');
        hasGeneralNeedsTrust = true;
        hasAgeDistribution = true; // General needs trust uses age distributions

        // Map the distributions from the general needs trust
        ageDistributionRules = matchingTrust.distributions.map((rule, ruleIndex) => {
          const parsedPercentage = parsePercentage(rule.percentage);
          console.log(`    Distribution ${ruleIndex + 1}: age=${rule.age}, raw%=${rule.percentage}, parsed%=${parsedPercentage}`);
          return {
            ageRule: {
              sectionNumber: String(ruleIndex + 1).padStart(2, '0'),
              percentage: parsedPercentage,
              timing: rule.timing || `when ${pronounObjective} reaches age ${rule.age || 0}`,
              age: rule.age || 0,
            }
          };
        });
        console.log('  Final ageDistributionRules from general needs trust:', JSON.stringify(ageDistributionRules, null, 2));
      } else if (beneficiary.distributionType === 'age-based' || beneficiary.distributionType === 'ageDistribution') {
        console.log('  → Taking PATH 2: Using beneficiary age-based distributions');
        hasAgeDistribution = true;

        // Process age distribution rules from beneficiary if they exist
        const beneficiaryAgeRules = beneficiary.ageDistributions || beneficiary.ageDistributionRules || [];
        console.log('    beneficiaryAgeRules:', JSON.stringify(beneficiaryAgeRules, null, 2));
        ageDistributionRules = beneficiaryAgeRules.map((rule, ruleIndex) => ({
          ageRule: {
            sectionNumber: String(ruleIndex + 1).padStart(2, '0'),
            percentage: parsePercentage(rule.percentage),
            timing: rule.timing || `when ${pronounObjective} reaches age ${rule.age || 0}`,
            age: rule.age || 0,
          }
        }));
        console.log('  Final ageDistributionRules from beneficiary:', JSON.stringify(ageDistributionRules, null, 2));
      } else if (beneficiary.distributionType === 'general-needs' || beneficiary.distributionType === 'guardian') {
        console.log('  → Taking PATH 3: General needs trust (no age rules populated)');
        hasGeneralNeedsTrust = true;
      } else {
        console.log('  → Taking PATH 4: Distribute outright (default)');
        // Default to outright distribution
        distributeOutright = true;
      }
      
      const result = {
        beneficiary: {
          sectionNumber: sectionNumber,
          fullName: fullName,
          firstName: beneficiary.firstName || '',
          lastName: beneficiary.lastName || '',
          relationship: beneficiary.relationship || 'beneficiary',
          dateOfBirth: formatDateToUS(beneficiary.dateOfBirth || beneficiary.birthday) || '',
          percentage: parsePercentage(beneficiary.percentage || beneficiary.share),
          isNotLast: isNotLast,  // Helper for punctuation: {{#if isNotLast}}; and{{/if}}
          pronounPossessive: pronounPossessive,
          pronounObjective: pronounObjective,
          pronounReflexive: pronounReflexive,

          // Distribution type flags (only ONE should be true)
          distributeOutright: distributeOutright,
          hasAgeDistribution: hasAgeDistribution,
          hasGeneralNeedsTrust: hasGeneralNeedsTrust,

          // Age distribution rules (for hasAgeDistribution)
          ageDistributionRules: ageDistributionRules,

          // General needs trust termination age
          trustTerminationAge: beneficiary.trustTerminationAge || beneficiary.terminationAge || 25,

          // Power of appointment limits (for age-based distributions)
          limitedSharePercentage: beneficiary.limitedSharePercentage || '5%',
          limitedShareAmount: beneficiary.limitedShareAmount || '$5,000',
          limitedShareAmountWords: beneficiary.limitedShareAmountWords || 'Five Thousand Dollars',
        }
      };

      console.log('  Final beneficiary data structure:', JSON.stringify(result, null, 2));

      return result;
    }),

    // Power of appointment default values (if not provided per beneficiary)
    limitedSharePercentage: '5%',
    limitedShareAmount: '$5,000',
    limitedShareAmountWords: 'Five Thousand Dollars',

    // Specific Distributions flag and array
    // CRITICAL: Uses specificDistributionsWithSections (cleaned array)
    hasSpecificDistributions: specificDistributionsWithSections.length > 0,
    notHasSpecificDistributions: specificDistributionsWithSections.length === 0,  // Helper for {{#if notHasSpecificDistributions}}
    specificDistributions: specificDistributionsWithSections,

    // General Needs Trusts flag and array
    hasGeneralNeeds: formData.generalNeeds && formData.generalNeeds.length > 0,
    notHasGeneralNeeds: !(formData.generalNeeds && formData.generalNeeds.length > 0),
    generalNeeds: (formData.generalNeeds || []).map((gn, index) => ({
      sectionNumber: `6.${index + 1}`,
      beneficiaryName: gn.beneficiaryName || gn.name || '',
      hasAgeCondition: gn.hasAgeCondition || gn.terminationAge > 0 || false,
      terminationAge: gn.terminationAge || gn.age || '',
    })),

    // Section numbering helpers
    sectionNumber: '01',
    nextSectionNumber: '02',
    tpp_section_num: tppSectionNum,
    tpp_section_num_plus_1: String(tppNum + 1).padStart(2, '0'),
    tpp_section_num_plus_2: String(tppNum + 2).padStart(2, '0'),
    tpp_section_num_plus_3: String(tppNum + 3).padStart(2, '0'),
    tpp_section_num_plus_4: String(tppNum + 4).padStart(2, '0'),

    // Beneficiary distribution (formatted for simple templates)
    beneficiaryDistribution: cleanedBeneficiaries.map(b =>
      `${b.name || `${b.firstName} ${b.lastName}`}: ${b.share || b.percentage}%`
    ).join(', '),

    // Assets (placeholder for future use)
    assets: 'All property transferred to this trust',

    // ==== ESTATE PLANNING TEMPLATE PLACEHOLDERS ====
    // POA Agents
    poaAgentPrimary: formData.durablePOA?.client && formData.durablePOA.client.length > 0
      ? formData.durablePOA.client[0].name || `${formData.durablePOA.client[0].firstName || ''} ${formData.durablePOA.client[0].lastName || ''}`.trim()
      : '',

    poaAgentSuccessor: formData.durablePOA?.client && formData.durablePOA.client.length > 1
      ? formData.durablePOA.client[1].name || `${formData.durablePOA.client[1].firstName || ''} ${formData.durablePOA.client[1].lastName || ''}`.trim()
      : '',

    poaSuccessorAgentsList: (formData.durablePOA?.client || []).slice(1).map((agent, i) =>
      `${i + 1}. ${agent.name || `${agent.firstName || ''} ${agent.lastName || ''}`.trim()}`
    ).join('\n'),

    // Healthcare Agents
    healthCareAgentPrimary: formData.healthcarePOA?.client && formData.healthcarePOA.client.length > 0
      ? formData.healthcarePOA.client[0].name || `${formData.healthcarePOA.client[0].firstName || ''} ${formData.healthcarePOA.client[0].lastName || ''}`.trim()
      : '',

    healthCareAgentAlternate: formData.healthcarePOA?.client && formData.healthcarePOA.client.length > 1
      ? formData.healthcarePOA.client[1].name || `${formData.healthcarePOA.client[1].firstName || ''} ${formData.healthcarePOA.client[1].lastName || ''}`.trim()
      : '',

    healthCareSuccessorAgentsList: (formData.healthcarePOA?.client || []).slice(1).map((agent, i) =>
      `${i + 1}. ${agent.name || `${agent.firstName || ''} ${agent.lastName || ''}`.trim()}`
    ).join('\n'),

    // HIPAA Authorized Recipients (same as healthcare agents)
    hipaaAuthorizedRecipients: (formData.healthcarePOA?.client || []).map(agent =>
      agent.name || `${agent.firstName || ''} ${agent.lastName || ''}`.trim()
    ).join(', '),

    // Guardian Nomination
    guardianNomination: formData.guardians && formData.guardians.length > 0
      ? formData.guardians[0].name || `${formData.guardians[0].firstName || ''} ${formData.guardians[0].lastName || ''}`.trim()
      : '',

    // Executor/Personal Representative (from Pour Over Will)
    executorNomination: formData.pourOverWill?.client && formData.pourOverWill.client.length > 0
      ? formData.pourOverWill.client[0].name || `${formData.pourOverWill.client[0].firstName || ''} ${formData.pourOverWill.client[0].lastName || ''}`.trim()
      : '',

    // Primary and Secondary Successors (from residuary beneficiaries)
    primarySuccessor: cleanedBeneficiaries.length > 0
      ? cleanedBeneficiaries[0].name || `${cleanedBeneficiaries[0].firstName || ''} ${cleanedBeneficiaries[0].lastName || ''}`.trim()
      : '',

    secondarySuccessor: cleanedBeneficiaries.length > 1
      ? cleanedBeneficiaries[1].name || `${cleanedBeneficiaries[1].firstName || ''} ${cleanedBeneficiaries[1].lastName || ''}`.trim()
      : '',

    // ==== JOINT TRUST PLACEHOLDERS ====
    jointTrustName: formData.trustName || '',
    jointStreetAddress: formData.client?.address || '',
    jointZipCode: formData.client?.zip || '',

    // Spouse 1 and Spouse 2 (for joint trusts)
    spouse1FullName: formData.client ? `${formData.client.firstName || ''} ${formData.client.middleName || ''} ${formData.client.lastName || ''}`.trim() : '',
    spouse1DateOfBirth: formatDateToUS(formData.client?.dateOfBirth) || '',

    spouse2FullName: formData.spouse ? `${formData.spouse.firstName || ''} ${formData.spouse.middleName || ''} ${formData.spouse.lastName || ''}`.trim() : '',
    spouse2DateOfBirth: formatDateToUS(formData.spouse?.dateOfBirth) || '',

    // Grantor names (aliases for joint trust template compatibility)
    grantor1FullName: formData.client ? `${formData.client.firstName || ''} ${formData.client.middleName || ''} ${formData.client.lastName || ''}`.trim() : '',
    grantor2FullName: formData.spouse ? `${formData.spouse.firstName || ''} ${formData.spouse.middleName || ''} ${formData.spouse.lastName || ''}`.trim() : '',

    // Beneficiary distribution guidelines
    beneficiaryDistributionGuidelines: cleanedBeneficiaries.length > 0
      ? cleanedBeneficiaries.map(b =>
          `${b.name || `${b.firstName} ${b.lastName}`} shall receive ${b.share || b.percentage}% of the trust estate${b.distributionType === 'guardian' ? ', to be held in trust until age of majority' : ''}`
        ).join('. ')
      : 'The trust estate shall be distributed equally among all living children.',

    // Beneficiary trust distribution details
    beneficiaryTrustDistribution: cleanedBeneficiaries
      .filter(b => b.distributionType === 'guardian' || b.distributionType === 'age-based')
      .map(b => `${b.name || `${b.firstName} ${b.lastName}`}'s share shall be held in trust and distributed according to the terms herein`)
      .join('. '),

    // If beneficiary deceased
    beneficiaryIfDeceased: 'If any beneficiary is deceased, their share shall be distributed to their living descendants, per stirpes. If there are no living descendants, the share shall be distributed equally among the surviving beneficiaries.',

    // Power of appointment
    beneficiaryPowerOfAppointment: 'Each beneficiary shall have a limited power of appointment over their share of the trust estate.',

    // ==== ESTATE PLANNING PORTFOLIO PLACEHOLDERS ====
    // These match the single_estate_planning_template.docx placeholders

    // Client info (flat fields for portfolio template)
    address: formData.client?.address || '',
    zipCode: formData.client?.zip || '',
    birthdate: formatDateToUS(formData.client?.dateOfBirth) || '',
    age: (() => {
      if (!formData.client?.dateOfBirth) return '';
      try {
        const birthDate = new Date(formData.client.dateOfBirth);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        return age.toString();
      } catch (e) {
        return '';
      }
    })(),

    // Children count and minor children check
    childrenCount: (formData.children || []).length,
    hasMinorChildren: (formData.children || []).some(child => {
      if (!child.dateOfBirth) return false;
      try {
        const birthDate = new Date(child.dateOfBirth);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        return age < 18;
      } catch (e) {
        return false;
      }
    }),

    // Successor trustees as 'successors' (for portfolio template)
    successors: (formData.successorTrustees || []).map(trustee => ({
      firstName: trustee.firstName || '',
      lastName: trustee.lastName || '',
      fullName: `${trustee.firstName || ''} ${trustee.lastName || ''}`.trim(),
    })),

    // POA Agents (for portfolio template loop)
    poaAgents: (formData.durablePOA?.client || []).map(agent => ({
      firstName: agent.firstName || '',
      lastName: agent.lastName || '',
      fullName: `${agent.firstName || ''} ${agent.lastName || ''}`.trim(),
    })),

    // Healthcare Agents (for portfolio template loop)
    healthcareAgents: (formData.healthcarePOA?.client || []).map(agent => ({
      firstName: agent.firstName || '',
      lastName: agent.lastName || '',
      fullName: `${agent.firstName || ''} ${agent.lastName || ''}`.trim(),
    })),

    // HIPAA Agents (for portfolio template loop)
    hipaaAgents: (formData.healthcarePOA?.client || []).map(agent => ({
      firstName: agent.firstName || '',
      lastName: agent.lastName || '',
      fullName: `${agent.firstName || ''} ${agent.lastName || ''}`.trim(),
    })),

    // Pluralization helper
    isPlural: (formData.children || []).length > 1,

    // Boolean flags for conditionals (for template conditionals)
    hasMultipleSuccessors: (formData.successorTrustees || []).length > 1,
    hasMultipleGuardians: (formData.guardians || []).length > 1,
    hasMultiplePoaAgents: (formData.durablePOA?.client || []).length > 1,
    hasMultipleHealthcareAgents: (formData.healthcarePOA?.client || []).length > 1,
    hasMultipleHipaaAgents: (formData.healthcarePOA?.client || []).length > 1,
  };

  console.log('=== PREPARED DATA SUMMARY ===');
  console.log('specificDistributions:', data.specificDistributions.length, 'items');
  console.log('hasSpecificDistributions:', data.hasSpecificDistributions);
  console.log('beneficiaries:', data.beneficiaries.length, 'items');
  console.log('tpp_section_num:', data.tpp_section_num);
  if (data.specificDistributions.length > 0) {
    console.log('First specific distribution:', data.specificDistributions[0]);
  }
  if (data.beneficiaries.length > 0) {
    console.log('First beneficiary:', data.beneficiaries[0]);
  }
  console.log('=== END DATA PREPARATION ===');

  return data;
};

/**
 * Fill DOCX template with form data
 * @param {ArrayBuffer} templateBuffer - Template as ArrayBuffer
 * @param {Object} formData - Form data
 * @returns {Promise<Blob>} - Filled DOCX as Blob
 */
export const fillDOCXTemplate = async (templateBuffer, formData) => {
  try {
    // Load the template
    const zip = new PizZip(templateBuffer);

    // Fix split template tags in document.xml
    // Word often splits template tags across multiple <w:t> elements, breaking them
    let documentXml = zip.file('word/document.xml').asText();

    // Merge tags split across XML elements
    // Pattern: { ... (with possible XML in between) ... }
    const tagPattern = /\{([^{}]*?(?:<[^>]+>[^{}]*?)*?)\}/gs;
    documentXml = documentXml.replace(tagPattern, (match, content) => {
      // If there's no XML in the content, return as-is
      if (!content.includes('<')) {
        return match;
      }
      // Extract text content only
      const textOnly = content.replace(/<[^>]+>/g, '');
      return '{' + textOnly + '}';
    });

    // Handle double-brace tags {{  }}
    const doubleBracePattern = /\{\{([^{}]*?(?:<[^>]+>[^{}]*?)*?)\}\}/gs;
    documentXml = documentXml.replace(doubleBracePattern, (match, content) => {
      if (!content.includes('<')) {
        return match;
      }
      const textOnly = content.replace(/<[^>]+>/g, '');
      return '{{' + textOnly + '}}';
    });

    // Update the ZIP with merged XML
    zip.file('word/document.xml', documentXml);

    // Configure angular-expressions parser for conditionals and loops
    expressions.filters.not = function(input) {
      return !input;
    };

    function angularParser(tag) {
      try {
        const expr = expressions.compile(tag);
        return {
          get: function(scope, context) {
            let obj = {};
            const scopeList = context.scopeList;
            const num = context.num;
            for (let i = 0, len = num + 1; i < len; i++) {
              obj = Object.assign(obj, scopeList[i]);
            }
            // Add loop helper for backward compatibility (though we now use isNotLast in data)
            const currentArray = num > 0 ? scopeList[num - 1] : [];
            const arrayLength = Array.isArray(currentArray) ? currentArray.length : 0;
            obj.loop = {
              index: context.num,
              first: context.num === 0,
              last: arrayLength > 0 && context.num === arrayLength - 1,
            };
            return expr(obj);
          }
        };
      } catch (e) {
        console.error('Error parsing tag:', tag, e);
        // Return empty string for unparseable tags
        return {
          get: function() {
            return '';
          }
        };
      }
    }

    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
      parser: angularParser,
      nullGetter: function(part) {
        // Return empty string for undefined values instead of throwing error
        return '';
      },
    });

    // Prepare data
    const data = prepareTemplateData(formData);

    console.log('Filling DOCX template with data...');
    console.log('Template data keys:', Object.keys(data).length);

    // Fill the template
    console.log('Rendering template with docxtemplater...');
    doc.render(data);
    console.log('Template rendered successfully');

    // Generate the filled document
    const output = doc.getZip().generate({
      type: 'blob',
      mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    });

    console.log('DOCX template filled successfully, size:', output.size, 'bytes');
    return output;

  } catch (error) {
    console.error('Error filling DOCX template:', error);
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);

    if (error.properties) {
      console.error('Error properties:', error.properties);

      if (error.properties.errors) {
        console.error('=== DETAILED ERROR INFO ===');
        console.error(`Found ${error.properties.errors.length} errors:`);
        error.properties.errors.forEach((err, i) => {
          console.error(`\n--- Error ${i + 1} ---`);
          console.error('  Message:', err.message);
          console.error('  Name:', err.name);
          console.error('  Tag:', err.properties?.xtag || 'N/A');
          console.error('  Context:', err.properties?.context?.substring(0, 200) || 'N/A');
          console.error('  Explanation:', err.properties?.explanation || 'N/A');
          console.error('  File:', err.properties?.file || 'N/A');
          console.error('  Offset:', err.properties?.offset || 'N/A');
          if (err.stack) {
            console.error('  Stack:', err.stack.substring(0, 300));
          }
        });
        console.error('=========================');
      }

      if (error.properties.id) {
        console.error('Error ID:', error.properties.id);
      }
    }
    throw error;
  }
};

/**
 * Generate document from DOCX template
 * @param {Object} formData - Form data
 * @param {string} templatePath - Path to DOCX template
 * @returns {Promise<Blob>} - Filled DOCX as Blob
 */
export const generateFromDOCXTemplate = async (formData, templatePath) => {
  try {
    console.log('Loading DOCX template from:', templatePath);
    const templateBuffer = await loadDOCXTemplate(templatePath);

    console.log('Filling DOCX template with form data...');
    const filledDOCX = await fillDOCXTemplate(templateBuffer, formData);

    return filledDOCX;

  } catch (error) {
    console.error('Error generating from DOCX template:', error);
    throw error;
  }
};

/**
 * Check if a DOCX template exists
 * @param {string} templatePath - Path to DOCX template
 * @returns {Promise<boolean>} - True if template exists
 */
export const docxTemplateExists = async (templatePath) => {
  try {
    console.log('Checking if DOCX template exists at:', templatePath);
    const response = await fetch(templatePath, { method: 'HEAD' });
    console.log('DOCX template HEAD response status:', response.status, 'ok:', response.ok);

    // Check content type to avoid HTML being served instead of DOCX (SPA fallback)
    const contentType = response.headers.get('content-type') || '';
    console.log('DOCX template content-type:', contentType || '(empty)');

    // If response is OK and content-type is explicitly HTML, it's the SPA fallback
    if (response.ok && contentType.toLowerCase().includes('html')) {
      console.warn('❌ DOCX template path returns HTML (SPA fallback) - file does not exist');
      return false;
    }

    // Check Content-Length to ensure it's a real file (not an error page)
    const contentLength = response.headers.get('content-length');
    console.log('DOCX template content-length:', contentLength);

    if (response.ok && contentLength && parseInt(contentLength) > 1000) {
      console.log('✅ DOCX template found! Size:', contentLength, 'bytes');
      return true;
    }

    if (response.ok && !contentType.includes('html')) {
      // Empty content-type but 200 response - likely the file exists
      console.log('✅ DOCX template found (empty content-type but 200 OK)');
      return true;
    }

    console.warn('❌ DOCX template not found (status:', response.status, ')');
    return false;
  } catch (error) {
    console.error('❌ Error checking DOCX template:', error);
    return false;
  }
};
