/**
 * Template Engine Service
 * Processes HTML/text templates and prepares data for document generation
 */

import { formatDate, formatPhoneNumber } from '../utils/formatters';

/**
 * Process a template string by replacing placeholders with actual data
 * Supports various placeholder formats:
 * - {{placeholder}}
 * - ${placeholder}
 * - {placeholder}
 * @param {string} template - Template string with placeholders
 * @param {Object} data - Data object with values to replace placeholders
 * @returns {string} - Processed template with placeholders replaced
 */
export const processTemplate = (template, data) => {
  if (!template || typeof template !== 'string') {
    console.warn('Invalid template provided to processTemplate');
    return '';
  }

  if (!data || typeof data !== 'object') {
    console.warn('Invalid data provided to processTemplate');
    return template;
  }

  let processed = template;

  // Helper function to safely get nested property
  const getNestedProperty = (obj, path) => {
    const keys = path.split('.');
    let result = obj;
    for (const key of keys) {
      if (result && typeof result === 'object' && key in result) {
        result = result[key];
      } else {
        return undefined;
      }
    }
    return result;
  };

  // Process {{placeholder}} format
  processed = processed.replace(/\{\{([^}]+)\}\}/g, (match, key) => {
    const trimmedKey = key.trim();
    const value = getNestedProperty(data, trimmedKey);
    return value !== undefined && value !== null ? String(value) : '';
  });

  // Process ${placeholder} format
  processed = processed.replace(/\$\{([^}]+)\}/g, (match, key) => {
    const trimmedKey = key.trim();
    const value = getNestedProperty(data, trimmedKey);
    return value !== undefined && value !== null ? String(value) : '';
  });

  // Process {placeholder} format (only if not preceded by $ or {)
  processed = processed.replace(/(?<!\$)(?<!\{)\{([^{}]+)\}/g, (match, key) => {
    const trimmedKey = key.trim();
    const value = getNestedProperty(data, trimmedKey);
    return value !== undefined && value !== null ? String(value) : '';
  });

  return processed;
};

/**
 * Get marital status statement in sentence form
 * @param {string} maritalStatus - Marital status (single, married, divorced, widowed)
 * @returns {string} - Marital status statement
 */
const getMaritalStatusStatement = (maritalStatus) => {
  const status = (maritalStatus || '').toLowerCase().trim();
  
  if (status === 'single' || status === 'unmarried' || status === 'never married') {
    return 'I am not married';
  } else if (status === 'married') {
    return 'I am married';
  } else if (status === 'divorced') {
    return 'I am divorced';
  } else if (status === 'widowed' || status === 'widow' || status === 'widower') {
    return 'I am widowed';
  } else if (status === 'separated') {
    return 'I am separated';
  } else if (status === 'domestic partnership' || status === 'registered domestic partner') {
    return 'I am in a registered domestic partnership';
  }
  
  return status ? `My marital status is ${status}` : '';
};

/**
 * Get pronoun based on sex
 * @param {string} sex - Sex (male, female, m, f)
 * @returns {Object} - Object with pronoun variations
 */
const getPronouns = (sex) => {
  const gender = (sex || '').toLowerCase().trim();
  
  if (gender === 'male' || gender === 'm') {
    return {
      subject: 'he',
      object: 'him',
      possessive: 'his',
      possessivePronoun: 'his',
      reflexive: 'himself'
    };
  } else if (gender === 'female' || gender === 'f') {
    return {
      subject: 'she',
      object: 'her',
      possessive: 'her',
      possessivePronoun: 'hers',
      reflexive: 'herself'
    };
  }
  
  // Default to they/them/their
  return {
    subject: 'they',
    object: 'them',
    possessive: 'their',
    possessivePronoun: 'theirs',
    reflexive: 'themselves'
  };
};

/**
 * Format a person's full name
 * @param {Object} person - Person object with firstName, middleName, lastName
 * @returns {string} - Formatted full name
 */
const formatFullName = (person) => {
  if (!person) return '';
  
  const parts = [];
  if (person.firstName) parts.push(person.firstName);
  if (person.middleName) parts.push(person.middleName);
  if (person.lastName) parts.push(person.lastName);
  
  return parts.join(' ');
};

/**
 * Format a person's full address
 * @param {Object} person - Person object with address, city, state, zip
 * @returns {string} - Formatted full address
 */
const formatFullAddress = (person) => {
  if (!person) return '';
  
  const parts = [];
  if (person.address) parts.push(person.address);
  
  const cityStateZip = [];
  if (person.city) cityStateZip.push(person.city);
  if (person.state) cityStateZip.push(person.state);
  if (person.zip) cityStateZip.push(person.zip);
  
  if (cityStateZip.length > 0) {
    parts.push(cityStateZip.join(', '));
  }
  
  return parts.join(', ');
};

/**
 * Format a list of children for display
 * @param {Array} children - Array of child objects
 * @returns {string} - Formatted children list
 */
const formatChildrenList = (children) => {
  if (!children || children.length === 0) return 'None';
  
  return children.map((child, index) => {
    const name = formatFullName(child);
    const dob = child.dateOfBirth ? `, born ${child.dateOfBirth}` : '';
    const relation = child.relation ? ` (${child.relation})` : '';
    return `${index + 1}. ${name}${dob}${relation}`;
  }).join('\n');
};

/**
 * Get children statement for narrative text
 * @param {Array} children - Array of child objects
 * @returns {string} - Children statement
 */
const getChildrenStatement = (children) => {
  if (!children || children.length === 0) {
    return 'I have no children.';
  }
  
  if (children.length === 1) {
    const child = children[0];
    const name = formatFullName(child);
    const dob = child.dateOfBirth ? `, born ${child.dateOfBirth}` : '';
    return `I have one child, ${name}${dob}.`;
  }
  
  const names = children.map(c => formatFullName(c)).join(', ');
  return `I have ${children.length} children: ${names}.`;
};

/**
 * Format a list of trustees for display
 * @param {Array} trustees - Array of trustee objects
 * @returns {string} - Formatted trustees list
 */
const formatTrusteesList = (trustees) => {
  if (!trustees || trustees.length === 0) return 'None designated';
  
  return trustees.map((trustee, index) => {
    const name = formatFullName(trustee);
    const contact = [];
    if (trustee.address) contact.push(trustee.address);
    if (trustee.phone) contact.push(formatPhoneNumber(trustee.phone));
    if (trustee.email) contact.push(trustee.email);
    
    const contactInfo = contact.length > 0 ? ` (${contact.join(', ')})` : '';
    return `${index + 1}. ${name}${contactInfo}`;
  }).join('\n');
};

/**
 * Format a list of guardians for display
 * @param {Array} guardians - Array of guardian objects
 * @returns {string} - Formatted guardians list
 */
const formatGuardiansList = (guardians) => {
  if (!guardians || guardians.length === 0) return 'None designated';
  
  return guardians.map((guardian, index) => {
    const name = formatFullName(guardian);
    const contact = [];
    if (guardian.address) contact.push(guardian.address);
    if (guardian.phone) contact.push(formatPhoneNumber(guardian.phone));
    
    const contactInfo = contact.length > 0 ? ` (${contact.join(', ')})` : '';
    return `${index + 1}. ${name}${contactInfo}`;
  }).join('\n');
};

/**
 * Format a list of agents (POA or Healthcare) for display
 * @param {Array} agents - Array of agent objects
 * @returns {string} - Formatted agents list
 */
const formatAgentsList = (agents) => {
  if (!agents || agents.length === 0) return 'None designated';
  
  return agents.map((agent, index) => {
    const name = formatFullName(agent);
    const contact = [];
    if (agent.address) contact.push(agent.address);
    if (agent.phone) contact.push(formatPhoneNumber(agent.phone));
    if (agent.email) contact.push(agent.email);
    
    const contactInfo = contact.length > 0 ? ` (${contact.join(', ')})` : '';
    return `${index + 1}. ${name}${contactInfo}`;
  }).join('\n');
};

/**
 * Prepare comprehensive template data from form data
 * Flattens and enriches form data for template processing
 * @param {Object} formData - Raw form data
 * @returns {Object} - Prepared template data with all necessary fields
 */
export const prepareTemplateData = (formData) => {
  if (!formData) {
    console.warn('No form data provided to prepareTemplateData');
    return {};
  }

  // Get current date if not provided
  const currentDate = formData.currentDate || new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Prepare client data
  const client = formData.client || {};
  const clientPronouns = getPronouns(client.sex);
  const clientFullName = formatFullName(client);
  const clientFullAddress = formatFullAddress(client);

  // Prepare spouse data (if joint trust)
  const isJoint = formData.isJoint || formData.trustType === 'joint';
  const spouse = isJoint && formData.spouse ? formData.spouse : {};
  const spousePronouns = getPronouns(spouse.sex);
  const spouseFullName = formatFullName(spouse);
  const spouseFullAddress = formatFullAddress(spouse);

  // Prepare children data
  const children = formData.children || [];
  const childrenList = formatChildrenList(children);
  const childrenStatement = getChildrenStatement(children);

  // First child data (for templates that reference the first child)
  const firstChild = children.length > 0 ? children[0] : {};
  const firstChildFullName = formatFullName(firstChild);
  const firstChildPronouns = getPronouns(firstChild.sex);

  // Prepare trustee data
  const successorTrustees = formData.successorTrustees || [];
  const trusteesList = formatTrusteesList(successorTrustees);

  // Prepare guardian data
  const guardians = formData.guardians || [];
  const guardiansList = formatGuardiansList(guardians);

  // Prepare POA data - Client
  const clientPOAAgents = formData.durablePOA?.client || [];
  const clientPOA1 = clientPOAAgents.length > 0 ? clientPOAAgents[0] : {};
  const clientPOA1FullName = formatFullName(clientPOA1);
  const clientPOA1Pronouns = getPronouns(clientPOA1.sex);
  const clientPOA2 = clientPOAAgents.length > 1 ? clientPOAAgents[1] : {};
  const clientPOA2FullName = formatFullName(clientPOA2);
  const clientPOAList = formatAgentsList(clientPOAAgents);

  // Prepare POA data - Spouse
  const spousePOAAgents = formData.durablePOA?.spouse || [];
  const spousePOA1 = spousePOAAgents.length > 0 ? spousePOAAgents[0] : {};
  const spousePOA1FullName = formatFullName(spousePOA1);
  const spousePOA1Pronouns = getPronouns(spousePOA1.sex);
  const spousePOA2 = spousePOAAgents.length > 1 ? spousePOAAgents[1] : {};
  const spousePOA2FullName = formatFullName(spousePOA2);
  const spousePOAList = formatAgentsList(spousePOAAgents);

  // Prepare Healthcare POA data - Client
  const clientHealthcareAgents = formData.healthcarePOA?.client || [];
  const clientHealthcare1 = clientHealthcareAgents.length > 0 ? clientHealthcareAgents[0] : {};
  const clientHealthcare1FullName = formatFullName(clientHealthcare1);
  const clientHealthcare2 = clientHealthcareAgents.length > 1 ? clientHealthcareAgents[1] : {};
  const clientHealthcare2FullName = formatFullName(clientHealthcare2);
  const clientHealthcareList = formatAgentsList(clientHealthcareAgents);

  // Prepare Healthcare POA data - Spouse
  const spouseHealthcareAgents = formData.healthcarePOA?.spouse || [];
  const spouseHealthcare1 = spouseHealthcareAgents.length > 0 ? spouseHealthcareAgents[0] : {};
  const spouseHealthcare1FullName = formatFullName(spouseHealthcare1);
  const spouseHealthcare2 = spouseHealthcareAgents.length > 1 ? spouseHealthcareAgents[1] : {};
  const spouseHealthcare2FullName = formatFullName(spouseHealthcare2);
  const spouseHealthcareList = formatAgentsList(spouseHealthcareAgents);

  // Prepare Pour Over Will personal representatives - Client
  const clientPourOverReps = formData.pourOverWill?.client?.personalRepresentatives || [];
  const clientPourOverRep1 = clientPourOverReps.length > 0 ? clientPourOverReps[0] : {};
  const clientPourOverRep1FullName = formatFullName(clientPourOverRep1);
  const clientPourOverRep2 = clientPourOverReps.length > 1 ? clientPourOverReps[1] : {};
  const clientPourOverRep2FullName = formatFullName(clientPourOverRep2);

  // Prepare Pour Over Will personal representatives - Spouse
  const spousePourOverReps = formData.pourOverWill?.spouse?.personalRepresentatives || [];
  const spousePourOverRep1 = spousePourOverReps.length > 0 ? spousePourOverReps[0] : {};
  const spousePourOverRep1FullName = formatFullName(spousePourOverRep1);
  const spousePourOverRep2 = spousePourOverReps.length > 1 ? spousePourOverReps[1] : {};
  const spousePourOverRep2FullName = formatFullName(spousePourOverRep2);

  // Prepare anatomical gifts data
  const clientAnatomicalGift = formData.anatomicalGifts?.client || 'none';
  const spouseAnatomicalGift = formData.anatomicalGifts?.spouse || 'none';

  // Prepare trust name (formatted for documents)
  let trustName = formData.trustName || '';
  if (!trustName) {
    if (isJoint) {
      trustName = `THE ${client.firstName?.toUpperCase()} ${client.lastName?.toUpperCase()} AND ${spouse.firstName?.toUpperCase()} ${spouse.lastName?.toUpperCase()} LIVING TRUST`;
    } else {
      trustName = `THE ${client.firstName?.toUpperCase()} ${client.lastName?.toUpperCase()} LIVING TRUST`;
    }
  }

  // Prepare trust date information
  const isRestatement = formData.isRestatement || false;
  const originalTrustName = formData.originalTrustName || '';
  const originalTrustDate = formData.originalTrustDate || '';

  // Build comprehensive data object
  const data = {
    // Current date
    currentDate: currentDate,
    today: currentDate,

    // Trust information
    trust: {
      name: trustName,
      type: formData.trustType || 'revocable',
      isJoint: isJoint,
      isIrrevocable: formData.isIrrevocable || false,
      isRestatement: isRestatement,
      originalName: originalTrustName,
      originalDate: originalTrustDate,
      currentDate: currentDate,
    },
    trustName: trustName,
    trustType: formData.trustType || 'revocable',
    isJoint: isJoint,
    isIrrevocable: formData.isIrrevocable || false,
    isRestatement: isRestatement,
    originalTrustName: originalTrustName,
    originalTrustDate: originalTrustDate,

    // Client information
    client: {
      firstName: client.firstName || '',
      middleName: client.middleName || '',
      lastName: client.lastName || '',
      fullName: clientFullName,
      address: client.address || '',
      city: client.city || '',
      state: client.state || '',
      zip: client.zip || '',
      county: client.county || '',
      fullAddress: clientFullAddress,
      phone: client.phone || '',
      phoneFormatted: formatPhoneNumber(client.phone),
      email: client.email || '',
      ssn: client.ssn || '',
      dateOfBirth: client.dateOfBirth || '',
      dob: client.dateOfBirth || '',
      sex: client.sex || '',
      gender: client.sex || '',
      maritalStatus: client.maritalStatus || '',
      maritalStatusStatement: getMaritalStatusStatement(client.maritalStatus),
      notaryDate: client.notaryDate || '',
      pronouns: clientPronouns,
      pronounSubject: clientPronouns.subject,
      pronounObject: clientPronouns.object,
      pronounPossessive: clientPronouns.possessive,
      pronounPossessivePronoun: clientPronouns.possessivePronoun,
      pronounReflexive: clientPronouns.reflexive,
    },
    clientFirstName: client.firstName || '',
    clientMiddleName: client.middleName || '',
    clientLastName: client.lastName || '',
    clientFullName: clientFullName,
    clientAddress: clientFullAddress,

    // Spouse information
    spouse: {
      firstName: spouse.firstName || '',
      middleName: spouse.middleName || '',
      lastName: spouse.lastName || '',
      fullName: spouseFullName,
      address: spouse.address || '',
      city: spouse.city || '',
      state: spouse.state || '',
      zip: spouse.zip || '',
      county: spouse.county || '',
      fullAddress: spouseFullAddress,
      phone: spouse.phone || '',
      phoneFormatted: formatPhoneNumber(spouse.phone),
      email: spouse.email || '',
      ssn: spouse.ssn || '',
      dateOfBirth: spouse.dateOfBirth || '',
      dob: spouse.dateOfBirth || '',
      sex: spouse.sex || '',
      gender: spouse.sex || '',
      notaryDate: spouse.notaryDate || '',
      pronouns: spousePronouns,
      pronounSubject: spousePronouns.subject,
      pronounObject: spousePronouns.object,
      pronounPossessive: spousePronouns.possessive,
      pronounPossessivePronoun: spousePronouns.possessivePronoun,
      pronounReflexive: spousePronouns.reflexive,
    },
    spouseFirstName: spouse.firstName || '',
    spouseMiddleName: spouse.middleName || '',
    spouseLastName: spouse.lastName || '',
    spouseFullName: spouseFullName,
    spouseAddress: spouseFullAddress,

    // Children information
    children: children,
    numChildren: children.length,
    hasChildren: children.length > 0,
    childrenList: childrenList,
    childrenStatement: childrenStatement,
    firstChild: {
      firstName: firstChild.firstName || '',
      middleName: firstChild.middleName || '',
      lastName: firstChild.lastName || '',
      fullName: firstChildFullName,
      dateOfBirth: firstChild.dateOfBirth || '',
      dob: firstChild.dateOfBirth || '',
      relation: firstChild.relation || 'child',
      sex: firstChild.sex || '',
      pronouns: firstChildPronouns,
      pronounSubject: firstChildPronouns.subject,
      pronounObject: firstChildPronouns.object,
      pronounPossessive: firstChildPronouns.possessive,
    },
    exampleChild: {
      firstName: firstChild.firstName || '',
      middleName: firstChild.middleName || '',
      lastName: firstChild.lastName || '',
      fullName: firstChildFullName,
      dateOfBirth: firstChild.dateOfBirth || '',
      relation: firstChild.relation || 'child',
    },

    // Successor Trustees information
    successorTrustees: successorTrustees,
    numTrustees: successorTrustees.length,
    hasTrustees: successorTrustees.length > 0,
    trusteesList: trusteesList,
    firstTrustee: successorTrustees.length > 0 ? {
      firstName: successorTrustees[0].firstName || '',
      lastName: successorTrustees[0].lastName || '',
      fullName: formatFullName(successorTrustees[0]),
      address: successorTrustees[0].address || '',
      phone: successorTrustees[0].phone || '',
      email: successorTrustees[0].email || '',
    } : {},

    // Guardians information
    guardians: guardians,
    numGuardians: guardians.length,
    hasGuardians: guardians.length > 0,
    guardiansList: guardiansList,
    firstGuardian: guardians.length > 0 ? {
      firstName: guardians[0].firstName || '',
      lastName: guardians[0].lastName || '',
      fullName: formatFullName(guardians[0]),
      address: guardians[0].address || '',
      phone: guardians[0].phone || '',
    } : {},

    // Durable POA - Client
    clientPOA: clientPOAAgents,
    clientPOAList: clientPOAList,
    clientPOA1: {
      firstName: clientPOA1.firstName || '',
      lastName: clientPOA1.lastName || '',
      fullName: clientPOA1FullName,
      address: clientPOA1.address || '',
      phone: clientPOA1.phone || '',
      email: clientPOA1.email || '',
      pronouns: clientPOA1Pronouns,
      pronounPossessive: clientPOA1Pronouns.possessive,
    },
    clientPOA2: {
      firstName: clientPOA2.firstName || '',
      lastName: clientPOA2.lastName || '',
      fullName: clientPOA2FullName,
      address: clientPOA2.address || '',
      phone: clientPOA2.phone || '',
      email: clientPOA2.email || '',
    },

    // Durable POA - Spouse
    spousePOA: spousePOAAgents,
    spousePOAList: spousePOAList,
    spousePOA1: {
      firstName: spousePOA1.firstName || '',
      lastName: spousePOA1.lastName || '',
      fullName: spousePOA1FullName,
      address: spousePOA1.address || '',
      phone: spousePOA1.phone || '',
      email: spousePOA1.email || '',
      pronouns: spousePOA1Pronouns,
      pronounPossessive: spousePOA1Pronouns.possessive,
    },
    spousePOA2: {
      firstName: spousePOA2.firstName || '',
      lastName: spousePOA2.lastName || '',
      fullName: spousePOA2FullName,
      address: spousePOA2.address || '',
      phone: spousePOA2.phone || '',
      email: spousePOA2.email || '',
    },

    // Healthcare POA - Client
    clientHealthcare: clientHealthcareAgents,
    clientHealthcareList: clientHealthcareList,
    clientHealthcare1: {
      firstName: clientHealthcare1.firstName || '',
      lastName: clientHealthcare1.lastName || '',
      fullName: clientHealthcare1FullName,
      address: clientHealthcare1.address || '',
      phone: clientHealthcare1.phone || '',
      email: clientHealthcare1.email || '',
    },
    clientHealthcare2: {
      firstName: clientHealthcare2.firstName || '',
      lastName: clientHealthcare2.lastName || '',
      fullName: clientHealthcare2FullName,
      address: clientHealthcare2.address || '',
      phone: clientHealthcare2.phone || '',
      email: clientHealthcare2.email || '',
    },

    // Healthcare POA - Spouse
    spouseHealthcare: spouseHealthcareAgents,
    spouseHealthcareList: spouseHealthcareList,
    spouseHealthcare1: {
      firstName: spouseHealthcare1.firstName || '',
      lastName: spouseHealthcare1.lastName || '',
      fullName: spouseHealthcare1FullName,
      address: spouseHealthcare1.address || '',
      phone: spouseHealthcare1.phone || '',
      email: spouseHealthcare1.email || '',
    },
    spouseHealthcare2: {
      firstName: spouseHealthcare2.firstName || '',
      lastName: spouseHealthcare2.lastName || '',
      fullName: spouseHealthcare2FullName,
      address: spouseHealthcare2.address || '',
      phone: spouseHealthcare2.phone || '',
      email: spouseHealthcare2.email || '',
    },

    // Pour Over Will - Client
    clientPourOverRep1: {
      firstName: clientPourOverRep1.firstName || '',
      lastName: clientPourOverRep1.lastName || '',
      fullName: clientPourOverRep1FullName,
      address: clientPourOverRep1.address || '',
      phone: clientPourOverRep1.phone || '',
    },
    clientPourOverRep2: {
      firstName: clientPourOverRep2.firstName || '',
      lastName: clientPourOverRep2.lastName || '',
      fullName: clientPourOverRep2FullName,
      address: clientPourOverRep2.address || '',
      phone: clientPourOverRep2.phone || '',
    },

    // Pour Over Will - Spouse
    spousePourOverRep1: {
      firstName: spousePourOverRep1.firstName || '',
      lastName: spousePourOverRep1.lastName || '',
      fullName: spousePourOverRep1FullName,
      address: spousePourOverRep1.address || '',
      phone: spousePourOverRep1.phone || '',
    },
    spousePourOverRep2: {
      firstName: spousePourOverRep2.firstName || '',
      lastName: spousePourOverRep2.lastName || '',
      fullName: spousePourOverRep2FullName,
      address: spousePourOverRep2.address || '',
      phone: spousePourOverRep2.phone || '',
    },

    // Anatomical Gifts
    anatomicalGifts: {
      client: clientAnatomicalGift,
      spouse: spouseAnatomicalGift,
    },
    clientAnatomicalGift: clientAnatomicalGift,
    spouseAnatomicalGift: spouseAnatomicalGift,

    // Law office information
    lawOffice: {
      name: 'LAW OFFICES OF ROZSA GYENE, PC',
      attorney: 'Rozsa Gyene',
      address: '450 N Brand Blvd, Suite 600',
      city: 'Glendale',
      state: 'California',
      zip: '91203',
      phone: '(818) 396-8257',
      email: 'rozsagyenelaw1@gmail.com',
      stateBar: 'California State Bar',
    },
  };

  return data;
};

/**
 * Validate template data
 * Checks if required fields are present in the data object
 * @param {Object} data - Template data object
 * @param {Array<string>} requiredFields - Array of required field paths (e.g., ['client.firstName', 'trustName'])
 * @returns {Object} - Validation result with isValid boolean and missing fields array
 */
export const validateTemplateData = (data, requiredFields = []) => {
  const missing = [];

  requiredFields.forEach(fieldPath => {
    const keys = fieldPath.split('.');
    let value = data;

    for (const key of keys) {
      if (value && typeof value === 'object' && key in value) {
        value = value[key];
      } else {
        missing.push(fieldPath);
        break;
      }
    }

    if (value === undefined || value === null || value === '') {
      if (!missing.includes(fieldPath)) {
        missing.push(fieldPath);
      }
    }
  });

  return {
    isValid: missing.length === 0,
    missingFields: missing,
  };
};

/**
 * Escape HTML special characters in a string
 * @param {string} str - String to escape
 * @returns {string} - Escaped string
 */
export const escapeHtml = (str) => {
  if (!str || typeof str !== 'string') return '';

  const htmlEscapes = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };

  return str.replace(/[&<>"']/g, char => htmlEscapes[char]);
};

/**
 * Convert plain text to HTML paragraphs
 * @param {string} text - Plain text
 * @returns {string} - HTML with paragraph tags
 */
export const textToHtml = (text) => {
  if (!text || typeof text !== 'string') return '';

  return text
    .split('\n\n')
    .map(para => `<p>${escapeHtml(para.trim())}</p>`)
    .join('\n');
};
