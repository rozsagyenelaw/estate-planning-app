/**
 * Template Engine for Estate Planning Documents
 *
 * Supports:
 * - Simple placeholders: {{VARIABLE_NAME}}
 * - Conditionals: {{#IF_CONDITION}}...{{/IF_CONDITION}}
 * - Loops: {{#EACH_ARRAY}}{{ITEM_PROPERTY}}{{/EACH_ARRAY}}
 * - Nested conditionals and loops
 */

/**
 * Main template processor
 * @param {string} template - The template string with placeholders
 * @param {object} data - The data object to fill in placeholders
 * @returns {string} - Processed template
 */
export const processTemplate = (template, data) => {
  let processed = template;

  // Process loops first (they may contain conditionals)
  processed = processLoops(processed, data);

  // Process conditionals
  processed = processConditionals(processed, data);

  // Replace simple placeholders
  processed = replaceSimplePlaceholders(processed, data);

  return processed;
};

/**
 * Replace simple placeholders like {{VARIABLE_NAME}}
 * @param {string} text - Text with placeholders
 * @param {object} data - Data object
 * @returns {string} - Text with placeholders replaced
 */
const replaceSimplePlaceholders = (text, data) => {
  return text.replace(/\{\{([A-Z_][A-Z0-9_]*)\}\}/g, (match, key) => {
    const value = getNestedValue(data, key);
    return value !== undefined && value !== null ? value : match;
  });
};

/**
 * Process conditional blocks like {{#IF_CONDITION}}...{{/IF_CONDITION}}
 * @param {string} text - Text with conditional blocks
 * @param {object} data - Data object
 * @returns {string} - Text with conditionals processed
 */
const processConditionals = (text, data) => {
  const conditionalRegex = /\{\{#IF_([A-Z_][A-Z0-9_]*)\}\}([\s\S]*?)\{\{\/IF_\1\}\}/g;

  return text.replace(conditionalRegex, (match, condition, content) => {
    const value = getNestedValue(data, condition);

    // Check if condition is true
    if (value === true || value === 'true' || (typeof value === 'string' && value.length > 0)) {
      return content;
    }

    return ''; // Remove block if condition is false
  });
};

/**
 * Process loop blocks like {{#EACH_ARRAY}}...{{/EACH_ARRAY}}
 * @param {string} text - Text with loop blocks
 * @param {object} data - Data object
 * @returns {string} - Text with loops processed
 */
const processLoops = (text, data) => {
  const loopRegex = /\{\{#EACH_([A-Z_][A-Z0-9_]*)\}\}([\s\S]*?)\{\{\/EACH_\1\}\}/g;

  return text.replace(loopRegex, (match, arrayName, content) => {
    const array = getNestedValue(data, arrayName);

    if (!Array.isArray(array) || array.length === 0) {
      return ''; // Remove block if no array or empty
    }

    // Process each item in the array
    return array.map((item, index) => {
      let itemContent = content;

      // Add index to item data
      const itemData = { ...item, INDEX: index + 1, ZERO_INDEX: index };

      // Replace item placeholders (both ITEM.PROPERTY and just PROPERTY)
      itemContent = itemContent.replace(/\{\{ITEM\.([A-Z_][A-Z0-9_]*)\}\}/g, (m, key) => {
        const value = itemData[key];
        return value !== undefined && value !== null ? value : m;
      });

      // Also support direct property access within loop
      itemContent = itemContent.replace(/\{\{([A-Z_][A-Z0-9_]*)\}\}/g, (m, key) => {
        const value = itemData[key];
        return value !== undefined && value !== null ? value : m;
      });

      return itemContent;
    }).join('');
  });
};

/**
 * Get nested value from object using key path
 * Supports both DOT.NOTATION and UNDERSCORE_NOTATION
 * @param {object} obj - Object to search
 * @param {string} key - Key or path to value
 * @returns {any} - Value at key path
 */
const getNestedValue = (obj, key) => {
  // Convert to lowercase for case-insensitive lookup
  const lowerKey = key.toLowerCase();

  // Direct key lookup (case-insensitive)
  for (const objKey in obj) {
    if (objKey.toLowerCase() === lowerKey) {
      return obj[objKey];
    }
  }

  // Try path lookup (e.g., "client.name" -> obj.client.name)
  const pathParts = lowerKey.split(/[._]/);
  let value = obj;

  for (const part of pathParts) {
    if (value && typeof value === 'object') {
      // Find key case-insensitively
      const foundKey = Object.keys(value).find(k => k.toLowerCase() === part);
      if (foundKey) {
        value = value[foundKey];
      } else {
        return undefined;
      }
    } else {
      return undefined;
    }
  }

  return value;
};

/**
 * Format date for display in documents
 * @param {string} dateString - Date string to format
 * @returns {string} - Formatted date (e.g., "January 15, 2024")
 */
export const formatDateForDocument = (dateString) => {
  if (!dateString) return '';

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
};

/**
 * Format name for legal documents (handles empty middle names)
 * @param {string} firstName - First name
 * @param {string} middleName - Middle name (optional)
 * @param {string} lastName - Last name
 * @returns {string} - Formatted full name
 */
export const formatLegalName = (firstName, middleName, lastName) => {
  if (middleName && middleName.trim()) {
    return `${firstName} ${middleName} ${lastName}`;
  }
  return `${firstName} ${lastName}`;
};

/**
 * Prepare form data for template processing
 * Converts form data structure to template-friendly format with uppercase keys
 * @param {object} formData - Form data from FormContext
 * @returns {object} - Template-ready data
 */
export const prepareTemplateData = (formData) => {
  const data = {
    // Trust Information
    IS_RESTATEMENT: formData.isRestatement,
    NOT_RESTATEMENT: !formData.isRestatement,
    IS_JOINT: formData.isJoint,
    TRUST_NAME: formData.trustName || '',
    ORIGINAL_TRUST_NAME: formData.originalTrustName || '',
    ORIGINAL_TRUST_DATE: formData.originalTrustDate ? formatDateForDocument(formData.originalTrustDate) : '',

    // Client Information
    CLIENT_FIRST_NAME: formData.client?.firstName || '',
    CLIENT_MIDDLE_NAME: formData.client?.middleName || '',
    CLIENT_LAST_NAME: formData.client?.lastName || '',
    CLIENT_NAME: formatLegalName(
      formData.client?.firstName || '',
      formData.client?.middleName || '',
      formData.client?.lastName || ''
    ),
    CLIENT_ADDRESS: formData.client?.address || '',
    CLIENT_CITY: formData.client?.city || '',
    CLIENT_STATE: formData.client?.state || '',
    CLIENT_ZIP: formData.client?.zip || '',
    CLIENT_COUNTY: formData.client?.county || '',
    CLIENT_PHONE: formData.client?.phone || '',
    CLIENT_EMAIL: formData.client?.email || '',
    CLIENT_SSN: formData.client?.ssn || '',
    CLIENT_DOB: formData.client?.dateOfBirth ? formatDateForDocument(formData.client.dateOfBirth) : '',
    CLIENT_SEX: formData.client?.sex || '',
    CLIENT_MARITAL_STATUS: formData.client?.maritalStatus || '',

    // Spouse Information (if joint)
    SPOUSE_FIRST_NAME: formData.spouse?.firstName || '',
    SPOUSE_MIDDLE_NAME: formData.spouse?.middleName || '',
    SPOUSE_LAST_NAME: formData.spouse?.lastName || '',
    SPOUSE_NAME: formData.spouse ? formatLegalName(
      formData.spouse?.firstName || '',
      formData.spouse?.middleName || '',
      formData.spouse?.lastName || ''
    ) : '',
    SPOUSE_ADDRESS: formData.spouse?.address || '',
    SPOUSE_CITY: formData.spouse?.city || '',
    SPOUSE_STATE: formData.spouse?.state || '',
    SPOUSE_ZIP: formData.spouse?.zip || '',
    SPOUSE_COUNTY: formData.spouse?.county || '',
    SPOUSE_PHONE: formData.spouse?.phone || '',
    SPOUSE_EMAIL: formData.spouse?.email || '',
    SPOUSE_SSN: formData.spouse?.ssn || '',
    SPOUSE_DOB: formData.spouse?.dateOfBirth ? formatDateForDocument(formData.spouse.dateOfBirth) : '',
    SPOUSE_SEX: formData.spouse?.sex || '',

    // Current Date
    CURRENT_DATE: formatDateForDocument(new Date().toISOString()),
    NOTARY_DATE: '____________________', // To be filled at notarization

    // Arrays for loops
    CHILDREN: (formData.children || []).map(child => ({
      NAME: child.name || '',
      BIRTHDAY: child.birthday ? formatDateForDocument(child.birthday) : '',
      RELATION: child.relation || ''
    })),

    SUCCESSOR_TRUSTEES: (formData.successorTrustees || []).map(trustee => ({
      NAME: trustee.name || '',
      ADDRESS: trustee.address || '',
      PHONE: trustee.phone || '',
      JOINTLY: trustee.jointly ? 'jointly with the next successor trustee' : ''
    })),

    SPECIFIC_DISTRIBUTIONS: (formData.specificDistributions || []).map(dist => ({
      BENEFICIARY_NAME: dist.beneficiaryName || '',
      DESCRIPTION: dist.description || '',
      DISTRIBUTION_TYPE: dist.distributionType || '',
      AGE_DISTRIBUTIONS: (dist.ageDistributions || []).map(age => ({
        AGE: age.age || '',
        PERCENTAGE: age.percentage || ''
      })),
      LAPSE_TO: dist.lapseTo || ''
    })),

    RESIDUARY_BENEFICIARIES: (formData.residuaryBeneficiaries || []).map(ben => ({
      NAME: ben.name || '',
      SHARE: ben.share || '',
      DISTRIBUTION_TYPE: ben.distributionType || '',
      BIRTHDAY: ben.birthday ? formatDateForDocument(ben.birthday) : ''
    })),

    // Charitable Distribution
    HAS_CHARITABLE: formData.charitableDistribution?.organizationName ? true : false,
    CHARITY_NAME: formData.charitableDistribution?.organizationName || '',
    CHARITY_ADDRESS: formData.charitableDistribution?.address || '',
    CHARITY_TAX_ID: formData.charitableDistribution?.taxId || '',
    CHARITY_AMOUNT: formData.charitableDistribution?.amount || '',
    CHARITY_PERCENTAGE: formData.charitableDistribution?.percentage || '',

    // Pour Over Will
    POUROVER_CLIENT_REPS: (formData.pourOverWill?.client || []).map(rep => ({
      NAME: rep.name || ''
    })),

    POUROVER_SPOUSE_REPS: (formData.pourOverWill?.spouse || []).map(rep => ({
      NAME: rep.name || ''
    })),

    // Guardians
    GUARDIANS: (formData.guardians || []).map(guardian => ({
      NAME: guardian.name || '',
      ADDRESS: guardian.address || '',
      PHONE: guardian.phone || '',
      JOINTLY: guardian.jointly ? 'jointly with the next guardian' : ''
    })),

    // Durable POA
    DPOA_CLIENT_REPS: (formData.durablePOA?.client || []).map(rep => ({
      NAME: rep.name || '',
      JOINTLY: rep.jointly ? 'jointly with the next representative' : ''
    })),

    DPOA_SPOUSE_REPS: (formData.durablePOA?.spouse || []).map(rep => ({
      NAME: rep.name || '',
      JOINTLY: rep.jointly ? 'jointly with the next representative' : ''
    })),

    // Healthcare POA
    HCPOA_CLIENT_REPS: (formData.healthcarePOA?.client || []).map(rep => ({
      NAME: rep.name || '',
      ADDRESS: rep.address || '',
      PHONE: rep.phone || '',
      JOINTLY: rep.jointly ? 'jointly with the next representative' : ''
    })),

    HCPOA_SPOUSE_REPS: (formData.healthcarePOA?.spouse || []).map(rep => ({
      NAME: rep.name || '',
      ADDRESS: rep.address || '',
      PHONE: rep.phone || '',
      JOINTLY: rep.jointly ? 'jointly with the next representative' : ''
    })),

    // Anatomical Gifts
    CLIENT_ANATOMICAL_GIFT: formData.anatomicalGifts?.client || '',
    SPOUSE_ANATOMICAL_GIFT: formData.anatomicalGifts?.spouse || '',
  };

  return data;
};

export default {
  processTemplate,
  prepareTemplateData,
  formatDateForDocument,
  formatLegalName
};
