/**
 * DOCX Template Service
 * Uses docxtemplater to fill Word document templates with form data
 */

import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';
import expressions from 'angular-expressions';

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
      dateOfBirth: formData.client?.dateOfBirth || '',
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
      dateOfBirth: formData.spouse.dateOfBirth || '',
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
      currentDate: formData.currentDate || new Date().toLocaleDateString(),
    },

    // Children
    children: formData.children || [],
    numChildren: formData.children?.length || 0,
    childrenList: (formData.children || []).map((c, i) =>
      `${i + 1}. ${c.firstName} ${c.lastName}, born ${c.dateOfBirth}`
    ).join('\n'),

    // Children statement (for templates)
    childrenStatement: formData.children && formData.children.length > 0
      ? formData.children.length === 1
        ? `I have one child, ${formData.children[0].firstName} ${formData.children[0].lastName}, born ${formData.children[0].dateOfBirth}.`
        : `I have ${formData.children.length} children.`
      : 'I have no children.',

    // First child info (for templates that reference first child specifically)
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

    // Example child (same as first child for template compatibility)
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

    // Successor Trustees
    successorTrustees: formData.successorTrustees || [],
    numTrustees: formData.successorTrustees?.length || 0,
    trusteesList: (formData.successorTrustees || []).map((t, i) =>
      `${i + 1}. ${t.firstName} ${t.lastName}`
    ).join('\n'),

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
    trustName: formData.trustName || '',
    trustDate: formData.currentDate || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    documentDate: formData.currentDate || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),

    // Restatement information
    isRestatement: formData.isRestatement || false,
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
        ? `I have one child: ${formData.children[0].firstName} ${formData.children[0].lastName}, born ${formData.children[0].dateOfBirth}.`
        : formData.children.length === 2
          ? `I have two children: ${formData.children[0].firstName} ${formData.children[0].lastName}, born ${formData.children[0].dateOfBirth}, and ${formData.children[1].firstName} ${formData.children[1].lastName}, born ${formData.children[1].dateOfBirth}.`
          : `I have ${formData.children.length} children: ` + (formData.children || []).map((c, i) => 
              i === formData.children.length - 1 
                ? `and ${c.firstName} ${c.lastName}, born ${c.dateOfBirth}`
                : `${c.firstName} ${c.lastName}, born ${c.dateOfBirth}`
            ).join('; ') + '.'
      : 'I have no children.',

    childrenReferences: (formData.children || []).map(c =>
      `${c.firstName || ''} ${c.lastName || ''}`.trim()
    ).join(' and '),

    // Trustees placeholders - formatted for docxtemplater
    successorTrusteesList: (formData.successorTrustees || []).map(t =>
      `${t.firstName || ''} ${t.lastName || ''}`.trim()
    ).join(', then '),

    successorTrusteesDuringIncapacityFormatted: (formData.successorTrustees || []).map(t =>
      `${t.firstName || ''} ${t.lastName || ''}`.trim()
    ).join(', then '),

    successorTrusteesAfterDeathFormatted: (formData.successorTrustees || []).map(t =>
      `${t.firstName || ''} ${t.lastName || ''}`.trim()
    ).join(', then '),

    // ===== BENEFICIARIES - COMPLETE DATA STRUCTURE FOR DOCXTEMPLATER =====
    // This is the array that will be looped over in the template
    beneficiaries: (formData.residuaryBeneficiaries || []).map((beneficiary, index) => {
      // Calculate section number (01, 02, 03, etc.)
      const sectionNumber = String(index + 1).padStart(2, '0');
      
      // Get pronouns based on sex
      const sex = beneficiary.sex || '';
      const pronounPossessive = getPronounPossessive(sex);
      const pronounObjective = getPronounObjective(sex);
      const pronounReflexive = getPronounReflexive(sex);
      
      // Full name
      const fullName = beneficiary.name || `${beneficiary.firstName || ''} ${beneficiary.lastName || ''}`.trim();
      
      // Determine distribution type flags
      let distributeOutright = false;
      let hasAgeDistribution = false;
      let hasGeneralNeedsTrust = false;
      
      if (beneficiary.distributionType === 'outright' || !beneficiary.distributionType) {
        distributeOutright = true;
      } else if (beneficiary.distributionType === 'age-based' || beneficiary.distributionType === 'ageDistribution') {
        hasAgeDistribution = true;
      } else if (beneficiary.distributionType === 'general-needs' || beneficiary.distributionType === 'guardian') {
        hasGeneralNeedsTrust = true;
      }
      
      // Process age distribution rules if they exist
      const ageDistributionRules = (beneficiary.ageDistributions || beneficiary.ageDistributionRules || []).map((rule, ruleIndex) => ({
        sectionNumber: String(ruleIndex + 1).padStart(2, '0'),
        percentage: rule.percentage || 0,
        timing: rule.timing || `when ${pronounObjective} reaches age ${rule.age || 0}`,
        age: rule.age || 0,
      }));
      
      return {
        sectionNumber: sectionNumber,
        fullName: fullName,
        firstName: beneficiary.firstName || '',
        lastName: beneficiary.lastName || '',
        relationship: beneficiary.relationship || 'beneficiary',
        dateOfBirth: beneficiary.dateOfBirth || beneficiary.birthday || '',
        percentage: beneficiary.share || beneficiary.percentage || 0,
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
      };
    }),

    // Power of appointment default values (if not provided per beneficiary)
    limitedSharePercentage: '5%',
    limitedShareAmount: '$5,000',
    limitedShareAmountWords: 'Five Thousand Dollars',

    // Specific Distributions flag and array
    hasSpecificDistributions: formData.specificDistributions && formData.specificDistributions.length > 0,
    specificDistributions: (formData.specificDistributions || []).map((dist, index) => ({
      sectionNumber: String(index + 1).padStart(2, '0'),
      beneficiaryName: dist.beneficiaryName || dist.name || '',
      propertyDescription: dist.description || dist.propertyDescription || '',
      hasAgeCondition: dist.hasAgeCondition || false,
      conditionAge: dist.conditionAge || dist.age || '',
      conditionPerson: dist.conditionPerson || dist.beneficiaryName || '',
    })),

    // Section numbering helpers
    sectionNumber: '01',
    nextSectionNumber: '02',
    tpp_section_num: formData.specificDistributions && formData.specificDistributions.length > 0
      ? String(formData.specificDistributions.length + 1).padStart(2, '0')
      : '01',

    // Beneficiary distribution (formatted for simple templates)
    beneficiaryDistribution: (formData.residuaryBeneficiaries || []).map(b =>
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
    primarySuccessor: formData.residuaryBeneficiaries && formData.residuaryBeneficiaries.length > 0
      ? formData.residuaryBeneficiaries[0].name || `${formData.residuaryBeneficiaries[0].firstName || ''} ${formData.residuaryBeneficiaries[0].lastName || ''}`.trim()
      : '',

    secondarySuccessor: formData.residuaryBeneficiaries && formData.residuaryBeneficiaries.length > 1
      ? formData.residuaryBeneficiaries[1].name || `${formData.residuaryBeneficiaries[1].firstName || ''} ${formData.residuaryBeneficiaries[1].lastName || ''}`.trim()
      : '',

    // ==== JOINT TRUST PLACEHOLDERS ====
    jointTrustName: formData.trustName || '',
    jointStreetAddress: formData.client?.address || '',
    jointZipCode: formData.client?.zip || '',

    // Spouse 1 and Spouse 2 (for joint trusts)
    spouse1FullName: formData.client ? `${formData.client.firstName || ''} ${formData.client.middleName || ''} ${formData.client.lastName || ''}`.trim() : '',
    spouse1DateOfBirth: formData.client?.dateOfBirth || '',

    spouse2FullName: formData.spouse ? `${formData.spouse.firstName || ''} ${formData.spouse.middleName || ''} ${formData.spouse.lastName || ''}`.trim() : '',
    spouse2DateOfBirth: formData.spouse?.dateOfBirth || '',

    // Beneficiary distribution guidelines
    beneficiaryDistributionGuidelines: formData.residuaryBeneficiaries && formData.residuaryBeneficiaries.length > 0
      ? (formData.residuaryBeneficiaries || []).map(b =>
          `${b.name || `${b.firstName} ${b.lastName}`} shall receive ${b.share || b.percentage}% of the trust estate${b.distributionType === 'guardian' ? ', to be held in trust until age of majority' : ''}`
        ).join('. ')
      : 'The trust estate shall be distributed equally among all living children.',

    // Beneficiary trust distribution details
    beneficiaryTrustDistribution: (formData.residuaryBeneficiaries || [])
      .filter(b => b.distributionType === 'guardian' || b.distributionType === 'age-based')
      .map(b => `${b.name || `${b.firstName} ${b.lastName}`}'s share shall be held in trust and distributed according to the terms herein`)
      .join('. '),

    // If beneficiary deceased
    beneficiaryIfDeceased: 'If any beneficiary is deceased, their share shall be distributed to their living descendants, per stirpes. If there are no living descendants, the share shall be distributed equally among the surviving beneficiaries.',

    // Power of appointment
    beneficiaryPowerOfAppointment: 'Each beneficiary shall have a limited power of appointment over their share of the trust estate.',
  };

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
      // Handle empty tag for {{^}} else syntax - just return true
      if (tag === '' || tag === '^') {
        return {
          get: function() {
            return true;
          }
        };
      }

      // Handle control flow keywords that docxtemplater passes to parser
      let cleanTag = tag;

      // Handle "if " prefix - just remove it
      if (cleanTag.startsWith('if ')) {
        cleanTag = cleanTag.substring(3);
      }

      // Handle "not " prefix - convert to logical not for angular-expressions
      if (cleanTag.startsWith('not ')) {
        cleanTag = '!(' + cleanTag.substring(4) + ')';
      }

      try {
        const expr = expressions.compile(cleanTag);
        return {
          get: function(scope, context) {
            let obj = {};
            const scopeList = context.scopeList;
            const num = context.num;
            for (let i = 0, len = num + 1; i < len; i++) {
              obj = Object.assign(obj, scopeList[i]);
            }
            // Add loop helper - get the array length from the parent scope
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

    console.log('Filling DOCX template with data:', Object.keys(data));
    console.log('isRestatement:', data.isRestatement);
    console.log('hasSpecificDistributions:', data.hasSpecificDistributions);
    console.log('Number of specificDistributions:', data.specificDistributions?.length || 0);
    console.log('Number of beneficiaries:', data.beneficiaries?.length || 0);
    if (data.beneficiaries && data.beneficiaries.length > 0) {
      console.log('First beneficiary:', data.beneficiaries[0]);
    }

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
