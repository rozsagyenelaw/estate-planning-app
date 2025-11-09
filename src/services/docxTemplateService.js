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
 * Get subject pronoun based on gender
 */
const getPronounSubject = (gender) => {
  const g = (gender || '').toLowerCase();
  if (g === 'male' || g === 'm') {
    return 'he';
  } else if (g === 'female' || g === 'f') {
    return 'she';
  }
  return 'they';
};

/**
 * Get possessive pronoun (standalone) based on gender
 * Examples: his, hers, theirs
 */
const getPronounPossessiveStandalone = (gender) => {
  const g = (gender || '').toLowerCase();
  if (g === 'male' || g === 'm') {
    return 'his';
  } else if (g === 'female' || g === 'f') {
    return 'hers';
  }
  return 'theirs';
};

/**
 * Generate all pronoun fields for a person based on their gender
 * @param {string} gender - "male", "female", or other
 * @returns {Object} - Object with all pronoun fields
 */
const generatePronouns = (gender) => {
  return {
    pronoun_subject: getPronounSubject(gender),           // he/she/they
    pronoun_object: getPronounObjective(gender),          // him/her/them
    pronoun_possessive: getPronounPossessive(gender),     // his/her/their
    pronoun_possessive_standalone: getPronounPossessiveStandalone(gender), // his/hers/theirs
    pronoun_reflexive: getPronounReflexive(gender)        // himself/herself/themselves
  };
};

/**
 * Render a single agent group label
 * @param {Object} group - Group object with groupType and agents array
 * @returns {string} - Formatted group label
 *
 * Examples:
 * - Individual: "Jane Doe"
 * - Joint (2 agents): "Jane Doe and Bob Smith jointly or the survivor of them"
 * - Joint (3+ agents): "Jane Doe, Bob Smith, and Alice Johnson jointly or the survivor of them"
 */
const renderGroupLabel = (group) => {
  if (!group || !group.agents || group.agents.length === 0) {
    return '';
  }

  const names = group.agents.map(agent =>
    agent.fullName || `${agent.firstName || ''} ${agent.lastName || ''}`.trim()
  );

  if (group.groupType === 'individual') {
    // Individual: just return the single name
    return names[0] || '';
  } else if (group.groupType === 'joint') {
    // Joint: "A and B jointly or the survivor of them"
    if (names.length === 1) {
      return names[0];
    } else if (names.length === 2) {
      return `${names[0]} and ${names[1]} jointly or the survivor of them`;
    } else {
      // For 3+: "A, B, and C jointly or the survivor of them"
      const allButLast = names.slice(0, -1).join(', ');
      const last = names[names.length - 1];
      return `${allButLast}, and ${last} jointly or the survivor of them`;
    }
  }

  return '';
};

/**
 * Render multiple groups sequentially with "then" chaining
 * @param {Array} groups - Array of group objects
 * @returns {string} - Formatted string with groups separated by ", then "
 *
 * Example: "Jane Doe and Bob Smith jointly or the survivor of them, then Alice Johnson, then Charlie Brown and Dana White jointly or the survivor of them"
 */
const renderGroupsSequential = (groups) => {
  if (!groups || groups.length === 0) {
    return '';
  }

  const labels = groups.map(group => renderGroupLabel(group)).filter(label => label !== '');
  return labels.join(', then ');
};

/**
 * Render groups as an array of labels (one per line for templates)
 * @param {Array} groups - Array of group objects
 * @returns {Array} - Array of label strings
 *
 * Used for template loops where each group needs to be on a separate line
 */
const renderGroupsOnePerLine = (groups) => {
  if (!groups || groups.length === 0) {
    return [];
  }

  return groups.map(group => renderGroupLabel(group)).filter(label => label !== '');
};

/**
 * Alias for renderGroupsSequential - renders groups with "then" separator
 * @param {Array} groups - Array of group objects
 * @returns {string} - Formatted string with groups separated by ", then "
 */
const renderGroupsWithThen = (groups) => {
  return renderGroupsSequential(groups);
};

/**
 * Build groups from a flat agent array for backward compatibility
 * Converts existing flat arrays into the new group structure
 * @param {Array} agents - Flat array of agents
 * @returns {Array} - Array of group objects (all individual by default)
 */
const buildGroupsFromFlatArray = (agents) => {
  if (!agents || agents.length === 0) {
    return [];
  }

  // Convert each agent into an individual group
  return agents.map(agent => ({
    groupType: 'individual',
    agents: [agent]
  }));
};

/**
 * Build groups from agents array with groupType field
 * @param {Array} agents - Array of agents with groupType field ('individual' or 'joint')
 * @returns {Array} - Array of group objects
 *
 * Logic:
 * - If agent.groupType === 'joint', collect consecutive 'joint' agents into one group
 * - If agent.groupType === 'individual' or undefined, create single-agent group
 * - Last agent is always individual
 */
const buildGroupsFromAgentsWithGroupType = (agents) => {
  if (!agents || agents.length === 0) {
    return [];
  }

  const groups = [];
  let i = 0;

  while (i < agents.length) {
    const agent = agents[i];
    const isLastAgent = i === agents.length - 1;

    // Last agent is always individual
    if (isLastAgent) {
      groups.push({
        groupType: 'individual',
        agents: [agent]
      });
      i++;
      continue;
    }

    // Check if this agent wants to be joint with next
    if (agent.groupType === 'joint') {
      // Start a joint group - collect this agent and all consecutive 'joint' agents
      const jointAgents = [agent];
      let j = i + 1;

      // Keep adding agents while they are marked 'joint' and not the last agent
      while (j < agents.length - 1 && agents[j].groupType === 'joint') {
        jointAgents.push(agents[j]);
        j++;
      }

      // Add the next agent (which ends the joint group)
      if (j < agents.length) {
        jointAgents.push(agents[j]);
      }

      groups.push({
        groupType: 'joint',
        agents: jointAgents
      });

      i = j + 1;
    } else {
      // Individual agent
      groups.push({
        groupType: 'individual',
        agents: [agent]
      });
      i++;
    }
  }

  return groups;
};

/**
 * Format the first (primary) group from a list of agent groups
 * @param {Array} groups - Array of group objects with groupType and agents
 * @returns {string} - Formatted first group (just names, with "jointly or the survivor of them" if joint)
 *
 * Example output:
 * "John Doe" (single agent)
 * "John Doe and Jane Smith jointly or the survivor of them" (joint, 2 agents)
 * "John Doe, Jane Smith and Bob Jones jointly or the survivor of them" (joint, 3+ agents)
 */
const formatFirstGroup = (groups) => {
  if (!groups || groups.length === 0) {
    return '';
  }

  const firstGroup = groups[0];
  if (!firstGroup || !firstGroup.agents || firstGroup.agents.length === 0) {
    return '';
  }

  // Get agent names
  const names = firstGroup.agents.map(agent =>
    agent.fullName || `${agent.firstName || ''} ${agent.lastName || ''}`.trim()
  ).filter(name => name !== '');

  if (names.length === 0) {
    return '';
  }

  // Format agent names
  let agentText;
  if (names.length === 1) {
    agentText = names[0];
  } else if (names.length === 2) {
    agentText = `${names[0]} and ${names[1]}`;
  } else {
    // 3+ names: "A, B and C"
    const allButLast = names.slice(0, -1).join(', ');
    agentText = `${allButLast} and ${names[names.length - 1]}`;
  }

  // Add "jointly or the survivor of them" for joint groups with multiple agents
  if (firstGroup.groupType === 'joint' && names.length > 1) {
    agentText += ' jointly or the survivor of them';
  }

  return agentText;
};

/**
 * Format successor groups (all groups EXCEPT the first) with conditional introductory text
 * @param {Array} groups - Array of group objects with groupType and agents
 * @param {string} actionVerb - "nominate" or "appoint"
 * @param {string} roleSuffix - Role label (e.g., "as successor Personal Representative.")
 * @returns {string} - Fully formatted successor text with conditional intros
 *
 * Example output:
 * "If the prior appointee is unwilling or unable to serve, I nominate Rozsa Gyene as successor guardian.
 * If all prior appointees are unwilling or unable to serve, I nominate Daniel Aroz as successor guardian."
 */
const formatSuccessorGroups = (groups, actionVerb, roleSuffix) => {
  if (!groups || groups.length <= 1) {
    // No successors if only 1 or 0 groups
    return '';
  }

  const sentences = [];
  const successorGroups = groups.slice(1); // Skip the first group

  for (let i = 0; i < successorGroups.length; i++) {
    const group = successorGroups[i];

    // Skip empty groups
    if (!group.agents || group.agents.length === 0) {
      continue;
    }

    // Get agent names
    const names = group.agents.map(agent =>
      agent.fullName || `${agent.firstName || ''} ${agent.lastName || ''}`.trim()
    ).filter(name => name !== '');

    if (names.length === 0) {
      continue;
    }

    // Determine introductory text
    let intro;
    if (i === 0) {
      // First successor
      intro = `If the prior appointee is unwilling or unable to serve, I ${actionVerb} `;
    } else {
      // All later successors
      intro = `If all prior appointees are unwilling or unable to serve, I ${actionVerb} `;
    }

    // Format agent names
    let agentText;
    if (names.length === 1) {
      agentText = names[0];
    } else if (names.length === 2) {
      agentText = `${names[0]} and ${names[1]}`;
    } else {
      // 3+ names: "A, B and C"
      const allButLast = names.slice(0, -1).join(', ');
      agentText = `${allButLast} and ${names[names.length - 1]}`;
    }

    // Add "jointly or the survivor of them" for joint groups with multiple agents
    if (group.groupType === 'joint' && names.length > 1) {
      agentText += ' jointly or the survivor of them';
    }

    // Construct full sentence
    const sentence = `${intro}${agentText} ${roleSuffix}`;
    sentences.push(sentence);
  }

  return sentences.join('\n');
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
export const prepareTemplateData = (formData) => {
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

      // Contingent Beneficiary Information
      contingentBeneficiaryType: dist.contingentBeneficiaryType || 'descendants',
      contingentIndividuals: dist.contingentIndividuals || '',
      contingent_descendants: (dist.contingentBeneficiaryType || 'descendants') === 'descendants',
      contingent_other_beneficiaries: (dist.contingentBeneficiaryType || 'descendants') === 'other_beneficiaries',
      contingent_individuals: (dist.contingentBeneficiaryType || 'descendants') === 'individuals',
      contingent_lapse: (dist.contingentBeneficiaryType || 'descendants') === 'lapse',
    }
  }));
  
  // Calculate tpp_section_num based on cleaned array
  const tppSectionNum = specificDistributionsWithSections.length > 0
    ? String(specificDistributionsWithSections.length + 1).padStart(2, '0')
    : '01';

  // ============================================================================
  // SANITIZE CHILDREN ARRAY
  // Remove any blank/incomplete children entries before building template outputs
  // ============================================================================
  const childrenSafe = (formData.children || []).filter(c => {
    if (!c) return false;
    const fullName = [c.firstName, c.middleName, c.lastName].filter(Boolean).join(' ');
    return fullName.length > 0;
  });
  console.log('Original children count:', formData.children?.length || 0);
  console.log('Sanitized children count:', childrenSafe.length);

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
      fullName: [formData.client?.firstName, formData.client?.middleName, formData.client?.lastName].filter(Boolean).join(' '),
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
      fullName: [formData.spouse.firstName, formData.spouse.middleName, formData.spouse.lastName].filter(Boolean).join(' '),
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
      currentDate: formatDateToUS(formData.trustDate || formData.currentDate) || new Date().toLocaleDateString('en-US'),
    },

    // Children
    children: childrenSafe,
    numChildren: childrenSafe.length,
    childrenList: childrenSafe.map((c, i) =>
      `${i + 1}. ${c.firstName} ${c.lastName}, born ${formatDateToUS(c.dateOfBirth)}`
    ).join('\n'),

    // Children statement (for templates) - Uses Oxford comma and proper formatting
    childrenStatement: (() => {
      if (childrenSafe.length === 0) return 'I have no children.';
      if (childrenSafe.length === 1) {
        const c = childrenSafe[0];
        const birthdate = formatDateToUS(c.dateOfBirth) || 'N/A';
        return `I have 1 child: ${c.firstName} ${c.lastName}, born ${birthdate}.`;
      }
      // 2 or more children
      const childPhrases = childrenSafe.map((c, i) => {
        const birthdate = formatDateToUS(c.dateOfBirth) || 'N/A';
        return `${c.firstName} ${c.lastName}, born ${birthdate}`;
      });
      // Use Oxford comma: "A, born X; B, born Y; and C, born Z."
      if (childrenSafe.length === 2) {
        return `I have ${childrenSafe.length} children: ${childPhrases[0]}; and ${childPhrases[1]}.`;
      }
      const allButLast = childPhrases.slice(0, -1).join('; ');
      const last = childPhrases[childPhrases.length - 1];
      return `I have ${childrenSafe.length} children: ${allButLast}; and ${last}.`;
    })(),

    // Children table (formatted for Word table placeholders)
    childrenTable: childrenSafe.length > 0
      ? childrenSafe.map(c => {
          const fullName = [c.firstName, c.middleName, c.lastName].filter(Boolean).join(' ');
          const birthdate = formatDateToUS(c.dateOfBirth) || 'N/A';
          const relationship = c.relation || c.relationship || 'child';
          return `${fullName} | ${relationship} | ${birthdate}`;
        }).join('\n')
      : 'None',

    // First child info (for templates that reference first child specifically)
    firstChild: childrenSafe.length > 0 ? {
      firstName: childrenSafe[0].firstName || '',
      lastName: childrenSafe[0].lastName || '',
      dateOfBirth: formatDateToUS(childrenSafe[0].dateOfBirth) || '',
      fullName: [childrenSafe[0].firstName, childrenSafe[0].lastName].filter(Boolean).join(' '),
      relation: childrenSafe[0].relation || 'child',
      gender: childrenSafe[0].gender || '',
      ...generatePronouns(childrenSafe[0].gender) // Add all pronoun fields
    } : {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      fullName: '',
      relation: '',
      gender: '',
      ...generatePronouns('') // Default to gender-neutral pronouns
    },

    // Example child (same as first child for template compatibility)
    exampleChild: childrenSafe.length > 0 ? {
      firstName: childrenSafe[0].firstName || '',
      lastName: childrenSafe[0].lastName || '',
      dateOfBirth: formatDateToUS(childrenSafe[0].dateOfBirth) || '',
      fullName: [childrenSafe[0].firstName, childrenSafe[0].lastName].filter(Boolean).join(' '),
      relation: childrenSafe[0].relation || 'child',
      gender: childrenSafe[0].gender || '',
      ...generatePronouns(childrenSafe[0].gender) // Add all pronoun fields
    } : {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      fullName: '',
      relation: '',
      gender: '',
      ...generatePronouns('') // Default to gender-neutral pronouns
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
    clientHealthcare3: formData.healthcarePOA?.client && formData.healthcarePOA.client.length > 2 ? {
      firstName: formData.healthcarePOA.client[2].firstName || '',
      lastName: formData.healthcarePOA.client[2].lastName || '',
      fullName: `${formData.healthcarePOA.client[2].firstName || ''} ${formData.healthcarePOA.client[2].lastName || ''}`.trim(),
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
    spouseHealthcare3: formData.healthcarePOA?.spouse && formData.healthcarePOA.spouse.length > 2 ? {
      firstName: formData.healthcarePOA.spouse[2].firstName || '',
      lastName: formData.healthcarePOA.spouse[2].lastName || '',
      fullName: `${formData.healthcarePOA.spouse[2].firstName || ''} ${formData.healthcarePOA.spouse[2].lastName || ''}`.trim(),
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

    // Anatomical Gifts Boolean Flags for Conditional Rendering
    anatomicalGifts_client_none: (formData.anatomicalGifts?.client || 'none') === 'none',
    anatomicalGifts_client_any: (formData.anatomicalGifts?.client || 'none') === 'any',
    anatomicalGifts_client_therapy: (formData.anatomicalGifts?.client || 'none') === 'therapy',
    anatomicalGifts_client_research: (formData.anatomicalGifts?.client || 'none') === 'research',
    anatomicalGifts_client_specific: (formData.anatomicalGifts?.client || 'none') === 'specific',
    anatomicalGifts_spouse_none: (formData.anatomicalGifts?.spouse || 'none') === 'none',
    anatomicalGifts_spouse_any: (formData.anatomicalGifts?.spouse || 'none') === 'any',
    anatomicalGifts_spouse_therapy: (formData.anatomicalGifts?.spouse || 'none') === 'therapy',
    anatomicalGifts_spouse_research: (formData.anatomicalGifts?.spouse || 'none') === 'research',
    anatomicalGifts_spouse_specific: (formData.anatomicalGifts?.spouse || 'none') === 'specific',

    // ===== FLAT PLACEHOLDERS FOR TEMPLATES =====
    // These match the placeholders in the DOCX templates exactly

    // Trust/Document basics
    trustName: (() => {
      // If trust name is explicitly provided, use it
      if (formData.trustName && formData.trustName.trim().length > 0) {
        return formData.trustName;
      }

      // Determine trust type suffix
      const isIrrevocable = formData.trustType === 'single_irrevocable' || formData.trustType === 'joint_irrevocable';
      const trustTypeSuffix = isIrrevocable ? 'Irrevocable Trust' : 'Living Trust';

      // Auto-generate trust name if not provided
      if (formData.isJoint && formData.client && formData.spouse) {
        const grantor1 = [formData.client.firstName, formData.client.middleName, formData.client.lastName].filter(Boolean).join(' ');
        const grantor2 = [formData.spouse.firstName, formData.spouse.middleName, formData.spouse.lastName].filter(Boolean).join(' ');
        return `The ${grantor1} and ${grantor2} ${trustTypeSuffix}`;
      }

      // For single trusts, generate from client name
      if (formData.client) {
        const clientName = [formData.client.firstName, formData.client.middleName, formData.client.lastName].filter(Boolean).join(' ');
        return clientName ? `The ${clientName} ${trustTypeSuffix}` : '';
      }

      return '';
    })(),
    trustDate: (() => {
      const date = formData.trustDate || formData.currentDate;
      if (!date) {
        return new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
      }
      // If it's in YYYY-MM-DD format from date input, format it properly
      return formatDateToUS(date);
    })(),
    documentDate: (() => {
      const date = formData.trustDate || formData.currentDate;
      if (!date) {
        return new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
      }
      // If it's in YYYY-MM-DD format from date input, format it properly
      return formatDateToUS(date);
    })(),

    // Alternative placeholder names (for templates that may use different conventions)
    // Note: Square brackets [TRUST NAME] won't work with docxtemplater - must use curly braces {trustName}
    // These are provided in case templates somehow reference them differently
    TRUST_NAME: (() => {
      // Use the same logic as trustName for consistency
      if (formData.trustName && formData.trustName.trim().length > 0) {
        return formData.trustName;
      }

      // Determine trust type suffix
      const isIrrevocable = formData.trustType === 'single_irrevocable' || formData.trustType === 'joint_irrevocable';
      const trustTypeSuffix = isIrrevocable ? 'Irrevocable Trust' : 'Living Trust';

      if (formData.isJoint && formData.client && formData.spouse) {
        const grantor1 = [formData.client.firstName, formData.client.middleName, formData.client.lastName].filter(Boolean).join(' ');
        const grantor2 = [formData.spouse.firstName, formData.spouse.middleName, formData.spouse.lastName].filter(Boolean).join(' ');
        return `The ${grantor1} and ${grantor2} ${trustTypeSuffix}`;
      }

      if (formData.client) {
        const clientName = [formData.client.firstName, formData.client.middleName, formData.client.lastName].filter(Boolean).join(' ');
        return clientName ? `The ${clientName} ${trustTypeSuffix}` : '';
      }

      return '';
    })(),
    DATE: (() => {
      const date = formData.trustDate || formData.currentDate;
      if (!date) {
        return new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
      }
      return formatDateToUS(date);
    })(),

    // Restatement information
    isRestatement: formData.isRestatement || false,
    notIsRestatement: !(formData.isRestatement || false),  // Helper for {{#if notIsRestatement}}
    originalTrustName: formData.originalTrustName || '',
    originalTrustDate: formData.originalTrustDate || '',

    // Client name variations (different templates use different names)
    grantorFullName: [formData.client?.firstName, formData.client?.middleName, formData.client?.lastName].filter(Boolean).join(' '),
    grantorDateOfBirth: formatDateToUS(formData.client?.dateOfBirth) || '',
    clientFullName: [formData.client?.firstName, formData.client?.middleName, formData.client?.lastName].filter(Boolean).join(' '),
    fullName: [formData.client?.firstName, formData.client?.middleName, formData.client?.lastName].filter(Boolean).join(' '),

    // Client address fields
    clientStreetAddress: formData.client?.address || '',
    city: formData.client?.city || '',
    state: formData.client?.state || '',
    clientZipCode: formData.client?.zip || '',
    county: formData.client?.county || '',

    // Marital status
    maritalStatus: getMaritalStatusStatement(formData.client?.maritalStatus),

    // Children placeholders - Uses childrenSafe (sanitized array)
    childrenStatement: (() => {
      if (childrenSafe.length === 0) return 'I have no children.';
      if (childrenSafe.length === 1) {
        const c = childrenSafe[0];
        const birthdate = formatDateToUS(c.dateOfBirth) || 'N/A';
        return `I have 1 child: ${c.firstName} ${c.lastName}, born ${birthdate}.`;
      }
      // 2 or more children
      const childPhrases = childrenSafe.map((c, i) => {
        const birthdate = formatDateToUS(c.dateOfBirth) || 'N/A';
        return `${c.firstName} ${c.lastName}, born ${birthdate}`;
      });
      // Use Oxford comma: "A, born X; B, born Y; and C, born Z."
      if (childrenSafe.length === 2) {
        return `I have ${childrenSafe.length} children: ${childPhrases[0]}; and ${childPhrases[1]}.`;
      }
      const allButLast = childPhrases.slice(0, -1).join('; ');
      const last = childPhrases[childPhrases.length - 1];
      return `I have ${childrenSafe.length} children: ${allButLast}; and ${last}.`;
    })(),

    childrenReferences: childrenSafe.map(c =>
      `${c.firstName || ''} ${c.lastName || ''}`.trim()
    ).join(' and '),

    // Children array for template loops - Uses childrenSafe with full data
    children: childrenSafe.map(child => ({
      fullName: [child.firstName, child.middleName, child.lastName].filter(Boolean).join(' '),
      firstName: child.firstName || '',
      middleName: child.middleName || '',
      lastName: child.lastName || '',
      dateOfBirth: formatDateToUS(child.dateOfBirth || child.birthday) || '',
      birthdate: formatDateToUS(child.dateOfBirth || child.birthday) || '', // Also provide 'birthdate' key
      gender: child.gender || '',
      relation: child.relation || child.relationship || 'child',
      ...generatePronouns(child.gender) // Add all pronoun fields
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

    // Current Trustee(s) - Used in irrevocable trusts and SNT where grantors ≠ trustees
    // For REVOCABLE trusts: returns the grantor(s) (client/spouse)
    // For IRREVOCABLE trusts and SNT: returns the separate current trustee(s)
    currentTrusteeFormatted: (() => {
      // Check if this is a trust type that requires separate trustees
      const isSNT = formData.trustType === 'first_party_snt' || formData.trustType === 'third_party_snt';
      const needsSeparateTrustees = formData.isIrrevocable || isSNT;

      // For IRREVOCABLE trusts and SNT: use separate current trustees
      if (needsSeparateTrustees && formData.currentTrustees && formData.currentTrustees.length > 0) {
        const trustees = formData.currentTrustees;
        const names = trustees.map(t => `${t.firstName || ''} ${t.lastName || ''}`.trim());

        if (names.length === 1) {
          return names[0];
        } else if (names.length === 2) {
          return `${names[0]} and ${names[1]} jointly or the survivor of them`;
        } else {
          // For 3+: "A, B, and C jointly or the survivor of them"
          const allButLast = names.slice(0, -1).join(', ');
          const last = names[names.length - 1];
          return `${allButLast}, and ${last} jointly or the survivor of them`;
        }
      }

      // For REVOCABLE trusts: grantors ARE the current trustees
      const clientName = [formData.client?.firstName, formData.client?.lastName].filter(Boolean).join(' ');

      if (formData.isJoint && formData.spouse) {
        const spouseName = [formData.spouse?.firstName, formData.spouse?.lastName].filter(Boolean).join(' ');
        return `${clientName} and ${spouseName} jointly or the survivor of them`;
      }

      return clientName;
    })(),

    // Successor Trustees - Formatted for irrevocable trusts (also works for revocable)
    firstSuccessorTrusteeFormatted: (() => {
      const trustees = formData.successorTrustees || [];
      if (trustees.length === 0) return '';

      let groups;
      if (trustees.some(t => t.groupType)) {
        groups = buildGroupsFromAgentsWithGroupType(trustees);
      } else {
        groups = buildGroupsFromFlatArray(trustees);
      }
      return formatFirstGroup(groups);
    })(),

    successorTrusteeSuccessorsFormatted: (() => {
      const trustees = formData.successorTrustees || [];
      if (trustees.length === 0) return '';

      let groups;
      if (trustees.some(t => t.groupType)) {
        groups = buildGroupsFromAgentsWithGroupType(trustees);
      } else {
        groups = buildGroupsFromFlatArray(trustees);
      }
      return formatSuccessorGroups(groups, 'appoint', 'as successor trustee.');
    })(),

    // ===== BENEFICIARIES - COMPLETE DATA STRUCTURE FOR DOCXTEMPLATER =====
    // This is the array that will be looped over in the template
    // CRITICAL: Uses cleanedBeneficiaries to avoid empty objects
    // Create this as a variable first so we can reference it for grouped arrays
    beneficiaries: (() => {
      return cleanedBeneficiaries.map((beneficiary, index, array) => {
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
      } else if (beneficiary.distributionType === 'general-needs' ||
                 beneficiary.distributionType === 'generalNeeds' ||
                 beneficiary.distributionType === 'guardian' ||
                 beneficiary.hasGeneralNeeds === true) {
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

          // Contingent Beneficiary Information
          contingentBeneficiaryType: beneficiary.contingentBeneficiaryType || 'descendants',
          contingentIndividuals: beneficiary.contingentIndividuals || '',
          contingent_descendants: (beneficiary.contingentBeneficiaryType || 'descendants') === 'descendants',
          contingent_other_beneficiaries: (beneficiary.contingentBeneficiaryType || 'descendants') === 'other_beneficiaries',
          contingent_individuals: (beneficiary.contingentBeneficiaryType || 'descendants') === 'individuals',
          contingent_lapse: (beneficiary.contingentBeneficiaryType || 'descendants') === 'lapse',
        }
      };

      console.log('  Final beneficiary data structure:', JSON.stringify(result, null, 2));

      return result;
      });
    })(),

    // Beneficiaries formatted as a narrative list (for confirmation/summary sections)
    beneficiariesFormatted: (() => {
      if (cleanedBeneficiaries.length === 0) return 'None specified';

      const beneficiaryNames = cleanedBeneficiaries.map(b => {
        const name = b.name || `${b.firstName || ''} ${b.lastName || ''}`.trim();
        const share = b.percentage || b.share || '';
        if (share) {
          return `${name} (${share})`;
        }
        return name;
      });

      if (beneficiaryNames.length === 1) {
        return beneficiaryNames[0];
      } else if (beneficiaryNames.length === 2) {
        return `${beneficiaryNames[0]} and ${beneficiaryNames[1]}`;
      } else {
        const allButLast = beneficiaryNames.slice(0, -1).join(', ');
        const last = beneficiaryNames[beneficiaryNames.length - 1];
        return `${allButLast}, and ${last}`;
      }
    })(),

    // Check if any beneficiary has Special Needs Trust distribution
    hasSpecialNeedsBeneficiary: cleanedBeneficiaries.some(b =>
      b.distributionType === 'specialNeeds' ||
      b.hasSpecialNeeds === true ||
      b.specialNeeds === true
    ),

    // Grouped beneficiaries by distribution type (for templates that separate sections)
    // This ensures outright distributions appear FIRST, then general needs trusts
    // Note: Must filter from cleanedBeneficiaries source data since we can't access
    // the processed beneficiaries array until after it's created
    outrightBeneficiariesList: (() => {
      return cleanedBeneficiaries
        .filter(b => b.distributionType === 'outright' ||
                     (!b.distributionType && !b.hasGeneralNeeds && !b.hasSpecialNeeds))
        .map(b => {
          const name = b.name || `${b.firstName || ''} ${b.lastName || ''}`.trim();
          const share = b.percentage || b.share || '';
          return { name, share };
        });
    })(),

    generalNeedsBeneficiariesList: (() => {
      return cleanedBeneficiaries
        .filter(b => b.distributionType === 'generalNeeds' || b.hasGeneralNeeds === true)
        .map(b => {
          const name = b.name || `${b.firstName || ''} ${b.lastName || ''}`.trim();
          return { name };
        });
    })(),

    hasOutrightBeneficiaries: cleanedBeneficiaries.some(b =>
      b.distributionType === 'outright' ||
      (!b.distributionType && !b.hasGeneralNeeds && !b.hasSpecialNeeds)
    ),

    hasGeneralNeedsBeneficiaries: cleanedBeneficiaries.some(b =>
      b.distributionType === 'generalNeeds' || b.hasGeneralNeeds === true
    ),

    // Formatted list of outright beneficiaries for narrative sections
    outrightBeneficiariesFormatted: (() => {
      const outright = cleanedBeneficiaries.filter(b =>
        b.distributionType === 'outright' ||
        (!b.distributionType && !b.hasGeneralNeeds && !b.hasSpecialNeeds)
      );

      if (outright.length === 0) return '';

      return outright.map(b => {
        const name = b.name || `${b.firstName || ''} ${b.lastName || ''}`.trim();
        const share = b.percentage || b.share || '';
        return `${name} (${share})`;
      }).join(', ');
    })(),

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
    spouse1FullName: formData.client ? [formData.client.firstName, formData.client.middleName, formData.client.lastName].filter(Boolean).join(' ') : '',
    spouse1DateOfBirth: formatDateToUS(formData.client?.dateOfBirth) || '',

    spouse2FullName: formData.spouse ? [formData.spouse.firstName, formData.spouse.middleName, formData.spouse.lastName].filter(Boolean).join(' ') : '',
    spouse2DateOfBirth: formatDateToUS(formData.spouse?.dateOfBirth) || '',

    // Grantor names (aliases for joint trust template compatibility)
    grantor1FullName: formData.client ? [formData.client.firstName, formData.client.middleName, formData.client.lastName].filter(Boolean).join(' ') : '',
    grantor2FullName: formData.spouse ? [formData.spouse.firstName, formData.spouse.middleName, formData.spouse.lastName].filter(Boolean).join(' ') : '',

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

    // Children count and minor children check (using childrenSafe)
    childrenCount: childrenSafe.length,
    hasMinorChildren: childrenSafe.some(child => {
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

    // Override children array to ensure fullName and formatted birthdate (using childrenSafe)
    children: childrenSafe.map(child => ({
      fullName: [child.firstName, child.middleName, child.lastName].filter(Boolean).join(' '),
      firstName: child.firstName || '',
      middleName: child.middleName || '',
      lastName: child.lastName || '',
      birthdate: formatDateToUS(child.dateOfBirth || child.birthday) || '',
      dateOfBirth: formatDateToUS(child.dateOfBirth || child.birthday) || '',
      relationship: child.relationship || 'child',
      gender: child.gender || '',
      ...generatePronouns(child.gender) // Add all pronoun fields
    })),

    // Override guardians array to ensure fullName
    guardians: (formData.guardians || []).map(guardian => ({
      fullName: `${guardian.firstName || ''} ${guardian.lastName || ''}`.trim(),
      firstName: guardian.firstName || '',
      lastName: guardian.lastName || '',
      relationship: guardian.relationship || 'guardian',
    })),

    // Successor trustees as 'successors' (for portfolio template)
    successors: (formData.successorTrustees || []).map(trustee => ({
      firstName: trustee.firstName || '',
      lastName: trustee.lastName || '',
      fullName: `${trustee.firstName || ''} ${trustee.lastName || ''}`.trim(),
      relationship: trustee.relationship || 'successor trustee',
    })),

    // POA Agents (for portfolio template loop) - add age field
    poaAgents: (formData.durablePOA?.client || []).map(agent => {
      let age = '';
      if (agent.dateOfBirth) {
        try {
          const birthDate = new Date(agent.dateOfBirth);
          const today = new Date();
          let calculatedAge = today.getFullYear() - birthDate.getFullYear();
          const monthDiff = today.getMonth() - birthDate.getMonth();
          if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            calculatedAge--;
          }
          age = calculatedAge.toString();
        } catch (e) {
          age = '';
        }
      }

      return {
        firstName: agent.firstName || '',
        lastName: agent.lastName || '',
        fullName: `${agent.firstName || ''} ${agent.lastName || ''}`.trim(),
        age: age,
        relationship: agent.relationship || 'attorney-in-fact',
      };
    }),

    // Healthcare Agents (for portfolio template loop)
    healthcareAgents: (formData.healthcarePOA?.client || []).map(agent => ({
      firstName: agent.firstName || '',
      lastName: agent.lastName || '',
      fullName: `${agent.firstName || ''} ${agent.lastName || ''}`.trim(),
      address: agent.address || '',
      city: agent.city || '',
      state: agent.state || '',
      zip: agent.zip || '',
      phone: agent.phone || '',
      relationship: agent.relationship || 'healthcare agent',
    })),

    // HIPAA Agents (for portfolio template loop)
    hipaaAgents: (formData.healthcarePOA?.client || []).map(agent => ({
      firstName: agent.firstName || '',
      lastName: agent.lastName || '',
      fullName: `${agent.firstName || ''} ${agent.lastName || ''}`.trim(),
      relationship: agent.relationship || 'HIPAA representative',
    })),

    // Personal Representatives (for portfolio template loop)
    personalRepresentatives: (formData.pourOverWill?.client?.personalRepresentatives || []).map(rep => ({
      firstName: rep.firstName || '',
      lastName: rep.lastName || '',
      fullName: `${rep.firstName || ''} ${rep.lastName || ''}`.trim(),
      relationship: rep.relationship || 'personal representative',
    })),

    // First POA Agent (for simpler template access)
    firstPoaAgent: (() => {
      const agents = formData.durablePOA?.client || [];
      if (agents.length === 0) return '';
      const agent = agents[0];
      return `${agent.firstName || ''} ${agent.lastName || ''}`.trim();
    })(),
    firstPoaAgentAge: (() => {
      const agents = formData.durablePOA?.client || [];
      if (agents.length === 0 || !agents[0].dateOfBirth) return '';
      try {
        const birthDate = new Date(agents[0].dateOfBirth);
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
    successorPoaAgents: (formData.durablePOA?.client || []).slice(1).map(agent => ({
      firstName: agent.firstName || '',
      lastName: agent.lastName || '',
      fullName: `${agent.firstName || ''} ${agent.lastName || ''}`.trim(),
      relationship: agent.relationship || 'attorney-in-fact',
    })),

    // First Healthcare Agent (for simpler template access)
    firstHealthcareAgent: (() => {
      const agents = formData.healthcarePOA?.client || [];
      if (agents.length === 0) return '';
      const agent = agents[0];
      return `${agent.firstName || ''} ${agent.lastName || ''}`.trim();
    })(),
    firstHealthcareAgentAddress: (() => {
      const agents = formData.healthcarePOA?.client || [];
      if (agents.length === 0) return '';
      return agents[0].address || '';
    })(),
    firstHealthcareAgentCity: (() => {
      const agents = formData.healthcarePOA?.client || [];
      if (agents.length === 0) return '';
      return agents[0].city || '';
    })(),
    firstHealthcareAgentState: (() => {
      const agents = formData.healthcarePOA?.client || [];
      if (agents.length === 0) return '';
      return agents[0].state || '';
    })(),
    firstHealthcareAgentZip: (() => {
      const agents = formData.healthcarePOA?.client || [];
      if (agents.length === 0) return '';
      return agents[0].zip || '';
    })(),
    firstHealthcareAgentPhone: (() => {
      const agents = formData.healthcarePOA?.client || [];
      if (agents.length === 0) return '';
      return agents[0].phone || '';
    })(),
    successorHealthcareAgents: (formData.healthcarePOA?.client || []).slice(1).map(agent => ({
      firstName: agent.firstName || '',
      lastName: agent.lastName || '',
      fullName: `${agent.firstName || ''} ${agent.lastName || ''}`.trim(),
      address: agent.address || '',
      city: agent.city || '',
      state: agent.state || '',
      zip: agent.zip || '',
      phone: agent.phone || '',
      relationship: agent.relationship || 'healthcare agent',
    })),

    // Pluralization helper (using childrenSafe)
    isPlural: childrenSafe.length > 1,

    // Boolean flags for conditionals (for template conditionals)
    hasMultipleSuccessors: (formData.successorTrustees || []).length > 1,
    hasMultipleGuardians: (formData.guardians || []).length > 1,
    hasMultiplePoaAgents: (formData.durablePOA?.client || []).length > 1,
    hasMultipleHealthcareAgents: (formData.healthcarePOA?.client || []).length > 1,
    hasMultipleHipaaAgents: (formData.healthcarePOA?.client || []).length > 1,
    hasMultiplePersonalRepresentatives: (formData.pourOverWill?.client?.personalRepresentatives || []).length > 1,

    // First Personal Representative (for simpler template access)
    firstPersonalRepresentative: (() => {
      const reps = formData.pourOverWill?.client?.personalRepresentatives || [];
      if (reps.length === 0) return '';
      return `${reps[0].firstName || ''} ${reps[0].lastName || ''}`.trim();
    })(),

    // Successor Personal Representatives (all except first)
    successorPersonalRepresentatives: (formData.pourOverWill?.client?.personalRepresentatives || []).slice(1).map(rep => ({
      firstName: rep.firstName || '',
      lastName: rep.lastName || '',
      fullName: `${rep.firstName || ''} ${rep.lastName || ''}`.trim(),
      relationship: rep.relationship || 'personal representative',
    })),

    // First Guardian (for simpler template access)
    firstGuardian: (() => {
      const guardians = formData.guardians || [];
      if (guardians.length === 0) return '';
      return `${guardians[0].firstName || ''} ${guardians[0].lastName || ''}`.trim();
    })(),

    // Successor Guardians (all except first)
    successorGuardians: (formData.guardians || []).slice(1).map(guardian => ({
      firstName: guardian.firstName || '',
      lastName: guardian.lastName || '',
      fullName: `${guardian.firstName || ''} ${guardian.lastName || ''}`.trim(),
      relationship: guardian.relationship || 'guardian',
    })),

    // ===== JOINT/INDIVIDUAL AGENT GROUPS =====
    // Support mixed joint + individual grouping for all fiduciary roles
    // Provides backward compatibility: if *Groups field exists, use it; otherwise build from flat array

    // POA Agent Groups
    poaAgentGroups: (() => {
      const agents = formData.durablePOA?.client || [];
      // Check if groups are explicitly provided
      if (formData.durablePOA?.clientGroups && Array.isArray(formData.durablePOA.clientGroups)) {
        return formData.durablePOA.clientGroups;
      }
      // Check if agents have groupType field (new UI)
      const hasGroupType = agents.some(agent => agent.groupType);
      if (hasGroupType) {
        return buildGroupsFromAgentsWithGroupType(agents);
      }
      // Backward compatibility: build individual groups from flat array
      return buildGroupsFromFlatArray(agents);
    })(),

    // Healthcare Agent Groups
    healthcareAgentGroups: (() => {
      const agents = formData.healthcarePOA?.client || [];
      if (formData.healthcarePOA?.clientGroups && Array.isArray(formData.healthcarePOA.clientGroups)) {
        return formData.healthcarePOA.clientGroups;
      }
      // Check if agents have groupType field (new UI)
      const hasGroupType = agents.some(agent => agent.groupType);
      if (hasGroupType) {
        return buildGroupsFromAgentsWithGroupType(agents);
      }
      return buildGroupsFromFlatArray(agents);
    })(),

    // Healthcare Agent Groups - SUCCESSORS ONLY (all groups except first)
    healthcareAgentGroupsSuccessors: (() => {
      const agents = formData.healthcarePOA?.client || [];
      let groups;
      if (formData.healthcarePOA?.clientGroups && Array.isArray(formData.healthcarePOA.clientGroups)) {
        groups = formData.healthcarePOA.clientGroups;
      } else {
        const hasGroupType = agents.some(agent => agent.groupType);
        if (hasGroupType) {
          groups = buildGroupsFromAgentsWithGroupType(agents);
        } else {
          groups = buildGroupsFromFlatArray(agents);
        }
      }
      // Return all groups except the first one, and rename 'agents' to 'healthcareAgents' for template
      return groups.slice(1).map(group => ({
        ...group,
        healthcareAgents: group.agents || []
      }));
    })(),

    // HIPAA Agent Groups (same as healthcare agents)
    hipaaAgentGroups: (() => {
      const agents = formData.healthcarePOA?.client || [];
      if (formData.healthcarePOA?.clientGroups && Array.isArray(formData.healthcarePOA.clientGroups)) {
        return formData.healthcarePOA.clientGroups;
      }
      // Check if agents have groupType field (new UI)
      const hasGroupType = agents.some(agent => agent.groupType);
      if (hasGroupType) {
        return buildGroupsFromAgentsWithGroupType(agents);
      }
      return buildGroupsFromFlatArray(agents);
    })(),

    // Trustee Groups During Incapacity
    trusteeGroupsDuringIncapacity: (() => {
      const trustees = formData.successorTrustees || [];
      if (formData.successorTrusteeGroups && Array.isArray(formData.successorTrusteeGroups)) {
        return formData.successorTrusteeGroups;
      }
      // Check if trustees have groupType field (new UI)
      const hasGroupType = trustees.some(trustee => trustee.groupType);
      if (hasGroupType) {
        return buildGroupsFromAgentsWithGroupType(trustees);
      }
      return buildGroupsFromFlatArray(trustees);
    })(),

    // Trustee Groups After Death (same as during incapacity for now)
    trusteeGroupsAfterDeath: (() => {
      const trustees = formData.successorTrustees || [];
      if (formData.successorTrusteeGroups && Array.isArray(formData.successorTrusteeGroups)) {
        return formData.successorTrusteeGroups;
      }
      // Check if trustees have groupType field (new UI)
      const hasGroupType = trustees.some(trustee => trustee.groupType);
      if (hasGroupType) {
        return buildGroupsFromAgentsWithGroupType(trustees);
      }
      return buildGroupsFromFlatArray(trustees);
    })(),

    // Personal Representative Groups
    personalRepresentativeGroups: (() => {
      const reps = formData.pourOverWill?.client?.personalRepresentatives || [];
      if (formData.pourOverWill?.client?.personalRepresentativeGroups && Array.isArray(formData.pourOverWill.client.personalRepresentativeGroups)) {
        return formData.pourOverWill.client.personalRepresentativeGroups;
      }
      // Check if reps have groupType field (new UI)
      const hasGroupType = reps.some(rep => rep.groupType);
      if (hasGroupType) {
        return buildGroupsFromAgentsWithGroupType(reps);
      }
      return buildGroupsFromFlatArray(reps);
    })(),

    // Guardian Groups
    guardianGroups: (() => {
      const guardians = formData.guardians || [];
      if (formData.guardianGroups && Array.isArray(formData.guardianGroups)) {
        return formData.guardianGroups;
      }
      // Check if guardians have groupType field (new UI)
      const hasGroupType = guardians.some(guardian => guardian.groupType);
      if (hasGroupType) {
        return buildGroupsFromAgentsWithGroupType(guardians);
      }
      return buildGroupsFromFlatArray(guardians);
    })(),

    // ===== PRE-RENDERED GROUP LABELS =====
    // These provide ready-to-use labels for templates (no need for complex template logic)

    // POA Agent Group Labels (array of strings)
    poaAgentGroupLabels: (() => {
      const agents = formData.durablePOA?.client || [];
      let groups;
      if (formData.durablePOA?.clientGroups && Array.isArray(formData.durablePOA.clientGroups)) {
        groups = formData.durablePOA.clientGroups;
      } else if (agents.some(agent => agent.groupType)) {
        groups = buildGroupsFromAgentsWithGroupType(agents);
      } else {
        groups = buildGroupsFromFlatArray(agents);
      }
      return renderGroupsOnePerLine(groups);
    })(),

    // POA Agent Groups Formatted (single string with "then" chaining)
    poaAgentGroupsFormatted: (() => {
      const agents = formData.durablePOA?.client || [];
      let groups;
      if (formData.durablePOA?.clientGroups && Array.isArray(formData.durablePOA.clientGroups)) {
        groups = formData.durablePOA.clientGroups;
      } else if (agents.some(agent => agent.groupType)) {
        groups = buildGroupsFromAgentsWithGroupType(agents);
      } else {
        groups = buildGroupsFromFlatArray(agents);
      }
      return renderGroupsWithThen(groups);
    })(),

    // Healthcare Agent Group Labels
    healthcareAgentGroupLabels: (() => {
      const agents = formData.healthcarePOA?.client || [];
      let groups;
      if (formData.healthcarePOA?.clientGroups && Array.isArray(formData.healthcarePOA.clientGroups)) {
        groups = formData.healthcarePOA.clientGroups;
      } else if (agents.some(agent => agent.groupType)) {
        groups = buildGroupsFromAgentsWithGroupType(agents);
      } else {
        groups = buildGroupsFromFlatArray(agents);
      }
      return renderGroupsOnePerLine(groups);
    })(),

    // Healthcare Agent Groups Formatted
    healthcareAgentGroupsFormatted: (() => {
      const agents = formData.healthcarePOA?.client || [];
      let groups;
      if (formData.healthcarePOA?.clientGroups && Array.isArray(formData.healthcarePOA.clientGroups)) {
        groups = formData.healthcarePOA.clientGroups;
      } else if (agents.some(agent => agent.groupType)) {
        groups = buildGroupsFromAgentsWithGroupType(agents);
      } else {
        groups = buildGroupsFromFlatArray(agents);
      }
      return renderGroupsWithThen(groups);
    })(),

    // HIPAA Agent Group Labels
    hipaaAgentGroupLabels: (() => {
      const agents = formData.healthcarePOA?.client || [];
      let groups;
      if (formData.healthcarePOA?.clientGroups && Array.isArray(formData.healthcarePOA.clientGroups)) {
        groups = formData.healthcarePOA.clientGroups;
      } else if (agents.some(agent => agent.groupType)) {
        groups = buildGroupsFromAgentsWithGroupType(agents);
      } else {
        groups = buildGroupsFromFlatArray(agents);
      }
      return renderGroupsOnePerLine(groups);
    })(),

    // HIPAA Agent Groups Formatted
    hipaaAgentGroupsFormatted: (() => {
      const agents = formData.healthcarePOA?.client || [];
      let groups;
      if (formData.healthcarePOA?.clientGroups && Array.isArray(formData.healthcarePOA.clientGroups)) {
        groups = formData.healthcarePOA.clientGroups;
      } else if (agents.some(agent => agent.groupType)) {
        groups = buildGroupsFromAgentsWithGroupType(agents);
      } else {
        groups = buildGroupsFromFlatArray(agents);
      }
      return renderGroupsWithThen(groups);
    })(),

    // Trustee Groups During Incapacity Labels
    trusteeGroupsDuringIncapacityLabels: (() => {
      const trustees = formData.successorTrustees || [];
      let groups;
      if (formData.successorTrusteeGroups && Array.isArray(formData.successorTrusteeGroups)) {
        groups = formData.successorTrusteeGroups;
      } else if (trustees.some(trustee => trustee.groupType)) {
        groups = buildGroupsFromAgentsWithGroupType(trustees);
      } else {
        groups = buildGroupsFromFlatArray(trustees);
      }
      return renderGroupsOnePerLine(groups);
    })(),

    // Trustee Groups During Incapacity Formatted
    trusteeGroupsDuringIncapacityFormatted: (() => {
      const trustees = formData.successorTrustees || [];
      let groups;
      if (formData.successorTrusteeGroups && Array.isArray(formData.successorTrusteeGroups)) {
        groups = formData.successorTrusteeGroups;
      } else if (trustees.some(trustee => trustee.groupType)) {
        groups = buildGroupsFromAgentsWithGroupType(trustees);
      } else {
        groups = buildGroupsFromFlatArray(trustees);
      }
      return renderGroupsWithThen(groups);
    })(),

    // Trustee Groups After Death Labels
    trusteeGroupsAfterDeathLabels: (() => {
      const trustees = formData.successorTrustees || [];
      let groups;
      if (formData.successorTrusteeGroups && Array.isArray(formData.successorTrusteeGroups)) {
        groups = formData.successorTrusteeGroups;
      } else if (trustees.some(trustee => trustee.groupType)) {
        groups = buildGroupsFromAgentsWithGroupType(trustees);
      } else {
        groups = buildGroupsFromFlatArray(trustees);
      }
      return renderGroupsOnePerLine(groups);
    })(),

    // Trustee Groups After Death Formatted
    trusteeGroupsAfterDeathFormatted: (() => {
      const trustees = formData.successorTrustees || [];
      let groups;
      if (formData.successorTrusteeGroups && Array.isArray(formData.successorTrusteeGroups)) {
        groups = formData.successorTrusteeGroups;
      } else if (trustees.some(trustee => trustee.groupType)) {
        groups = buildGroupsFromAgentsWithGroupType(trustees);
      } else {
        groups = buildGroupsFromFlatArray(trustees);
      }
      return renderGroupsWithThen(groups);
    })(),

    // Personal Representative Group Labels
    personalRepresentativeGroupLabels: (() => {
      const reps = formData.pourOverWill?.client?.personalRepresentatives || [];
      let groups;
      if (formData.pourOverWill?.client?.personalRepresentativeGroups && Array.isArray(formData.pourOverWill.client.personalRepresentativeGroups)) {
        groups = formData.pourOverWill.client.personalRepresentativeGroups;
      } else if (reps.some(rep => rep.groupType)) {
        groups = buildGroupsFromAgentsWithGroupType(reps);
      } else {
        groups = buildGroupsFromFlatArray(reps);
      }
      return renderGroupsOnePerLine(groups);
    })(),

    // Personal Representative Groups Formatted
    personalRepresentativeGroupsFormatted: (() => {
      const reps = formData.pourOverWill?.client?.personalRepresentatives || [];
      let groups;
      if (formData.pourOverWill?.client?.personalRepresentativeGroups && Array.isArray(formData.pourOverWill.client.personalRepresentativeGroups)) {
        groups = formData.pourOverWill.client.personalRepresentativeGroups;
      } else if (reps.some(rep => rep.groupType)) {
        groups = buildGroupsFromAgentsWithGroupType(reps);
      } else {
        groups = buildGroupsFromFlatArray(reps);
      }
      return renderGroupsWithThen(groups);
    })(),

    // Guardian Group Labels
    guardianGroupLabels: (() => {
      const guardians = formData.guardians || [];
      let groups;
      if (formData.guardianGroups && Array.isArray(formData.guardianGroups)) {
        groups = formData.guardianGroups;
      } else if (guardians.some(guardian => guardian.groupType)) {
        groups = buildGroupsFromAgentsWithGroupType(guardians);
      } else {
        groups = buildGroupsFromFlatArray(guardians);
      }
      return renderGroupsOnePerLine(groups);
    })(),

    // Guardian Groups Formatted
    guardianGroupsFormatted: (() => {
      const guardians = formData.guardians || [];
      let groups;
      if (formData.guardianGroups && Array.isArray(formData.guardianGroups)) {
        groups = formData.guardianGroups;
      } else if (guardians.some(guardian => guardian.groupType)) {
        groups = buildGroupsFromAgentsWithGroupType(guardians);
      } else {
        groups = buildGroupsFromFlatArray(guardians);
      }
      return renderGroupsWithThen(groups);
    })(),

    // ============================================================================
    // FIRST + SUCCESSOR FORMATTED FIELDS (for all 7 fiduciary roles)
    // ============================================================================

    // 1. Personal Representatives
    firstPersonalRepresentativeFormatted: (() => {
      const reps = formData.pourOverWill?.client?.personalRepresentatives || [];
      let groups;
      if (formData.pourOverWill?.client?.personalRepresentativeGroups && Array.isArray(formData.pourOverWill.client.personalRepresentativeGroups)) {
        groups = formData.pourOverWill.client.personalRepresentativeGroups;
      } else if (reps.some(rep => rep.groupType)) {
        groups = buildGroupsFromAgentsWithGroupType(reps);
      } else {
        groups = buildGroupsFromFlatArray(reps);
      }
      return formatFirstGroup(groups);
    })(),

    personalRepresentativeSuccessorsFormatted: (() => {
      const reps = formData.pourOverWill?.client?.personalRepresentatives || [];
      let groups;
      if (formData.pourOverWill?.client?.personalRepresentativeGroups && Array.isArray(formData.pourOverWill.client.personalRepresentativeGroups)) {
        groups = formData.pourOverWill.client.personalRepresentativeGroups;
      } else if (reps.some(rep => rep.groupType)) {
        groups = buildGroupsFromAgentsWithGroupType(reps);
      } else {
        groups = buildGroupsFromFlatArray(reps);
      }
      return formatSuccessorGroups(groups, 'nominate', 'as successor Personal Representative.');
    })(),

    // 2. Guardians
    firstGuardianFormatted: (() => {
      const guardians = formData.guardians || [];
      let groups;
      if (formData.guardianGroups && Array.isArray(formData.guardianGroups)) {
        groups = formData.guardianGroups;
      } else if (guardians.some(guardian => guardian.groupType)) {
        groups = buildGroupsFromAgentsWithGroupType(guardians);
      } else {
        groups = buildGroupsFromFlatArray(guardians);
      }
      return formatFirstGroup(groups);
    })(),

    guardianSuccessorsFormatted: (() => {
      const guardians = formData.guardians || [];
      let groups;
      if (formData.guardianGroups && Array.isArray(formData.guardianGroups)) {
        groups = formData.guardianGroups;
      } else if (guardians.some(guardian => guardian.groupType)) {
        groups = buildGroupsFromAgentsWithGroupType(guardians);
      } else {
        groups = buildGroupsFromFlatArray(guardians);
      }
      return formatSuccessorGroups(groups, 'nominate', 'as successor guardian.');
    })(),

    // 3. Trustees During Incapacity
    firstTrusteeIncapacityFormatted: (() => {
      const trustees = formData.successorTrustees || [];
      let groups;
      if (formData.trusteeGroupsDuringIncapacity && Array.isArray(formData.trusteeGroupsDuringIncapacity)) {
        groups = formData.trusteeGroupsDuringIncapacity;
      } else if (trustees.some(t => t.groupType)) {
        groups = buildGroupsFromAgentsWithGroupType(trustees);
      } else {
        groups = buildGroupsFromFlatArray(trustees);
      }
      return formatFirstGroup(groups);
    })(),

    trusteeIncapacitySuccessorsFormatted: (() => {
      const trustees = formData.successorTrustees || [];
      let groups;
      if (formData.trusteeGroupsDuringIncapacity && Array.isArray(formData.trusteeGroupsDuringIncapacity)) {
        groups = formData.trusteeGroupsDuringIncapacity;
      } else if (trustees.some(t => t.groupType)) {
        groups = buildGroupsFromAgentsWithGroupType(trustees);
      } else {
        groups = buildGroupsFromFlatArray(trustees);
      }
      return formatSuccessorGroups(groups, 'appoint', 'as successor trustee.');
    })(),

    // 4. Trustees After Death
    firstTrusteeAfterDeathFormatted: (() => {
      const trustees = formData.successorTrustees || [];
      let groups;
      if (formData.trusteeGroupsAfterDeath && Array.isArray(formData.trusteeGroupsAfterDeath)) {
        groups = formData.trusteeGroupsAfterDeath;
      } else if (trustees.some(t => t.groupType)) {
        groups = buildGroupsFromAgentsWithGroupType(trustees);
      } else {
        groups = buildGroupsFromFlatArray(trustees);
      }
      return formatFirstGroup(groups);
    })(),

    trusteeAfterDeathSuccessorsFormatted: (() => {
      const trustees = formData.successorTrustees || [];
      let groups;
      if (formData.trusteeGroupsAfterDeath && Array.isArray(formData.trusteeGroupsAfterDeath)) {
        groups = formData.trusteeGroupsAfterDeath;
      } else if (trustees.some(t => t.groupType)) {
        groups = buildGroupsFromAgentsWithGroupType(trustees);
      } else {
        groups = buildGroupsFromFlatArray(trustees);
      }
      return formatSuccessorGroups(groups, 'appoint', 'as successor trustee.');
    })(),

    // 5. Durable Power of Attorney Agents
    firstPoaAgentFormatted: (() => {
      const agents = formData.durablePOA?.client || [];
      let groups;
      if (formData.durablePOA?.clientGroups && Array.isArray(formData.durablePOA.clientGroups)) {
        groups = formData.durablePOA.clientGroups;
      } else if (agents.some(agent => agent.groupType)) {
        groups = buildGroupsFromAgentsWithGroupType(agents);
      } else {
        groups = buildGroupsFromFlatArray(agents);
      }
      return formatFirstGroup(groups);
    })(),

    poaAgentSuccessorsFormatted: (() => {
      const agents = formData.durablePOA?.client || [];
      let groups;
      if (formData.durablePOA?.clientGroups && Array.isArray(formData.durablePOA.clientGroups)) {
        groups = formData.durablePOA.clientGroups;
      } else if (agents.some(agent => agent.groupType)) {
        groups = buildGroupsFromAgentsWithGroupType(agents);
      } else {
        groups = buildGroupsFromFlatArray(agents);
      }
      return formatSuccessorGroups(groups, 'appoint', 'as successor agent under my Durable Power of Attorney.');
    })(),

    // 6. Healthcare Agents
    firstHealthcareAgentFormatted: (() => {
      const agents = formData.healthcarePOA?.client || [];
      let groups;
      if (formData.healthcarePOA?.clientGroups && Array.isArray(formData.healthcarePOA.clientGroups)) {
        groups = formData.healthcarePOA.clientGroups;
      } else if (agents.some(agent => agent.groupType)) {
        groups = buildGroupsFromAgentsWithGroupType(agents);
      } else {
        groups = buildGroupsFromFlatArray(agents);
      }
      return formatFirstGroup(groups);
    })(),

    healthcareAgentSuccessorsFormatted: (() => {
      const agents = formData.healthcarePOA?.client || [];
      let groups;
      if (formData.healthcarePOA?.clientGroups && Array.isArray(formData.healthcarePOA.clientGroups)) {
        groups = formData.healthcarePOA.clientGroups;
      } else if (agents.some(agent => agent.groupType)) {
        groups = buildGroupsFromAgentsWithGroupType(agents);
      } else {
        groups = buildGroupsFromFlatArray(agents);
      }
      return formatSuccessorGroups(groups, 'appoint', 'as successor agent under my Healthcare Power of Attorney.');
    })(),

    // Healthcare Agents - First Group Array
    firstHealthcareAgents: (() => {
      const agents = formData.healthcarePOA?.client || [];
      let groups;
      if (formData.healthcarePOA?.clientGroups && Array.isArray(formData.healthcarePOA.clientGroups)) {
        groups = formData.healthcarePOA.clientGroups;
      } else if (agents.some(agent => agent.groupType)) {
        groups = buildGroupsFromAgentsWithGroupType(agents);
      } else {
        groups = buildGroupsFromFlatArray(agents);
      }
      // Return agents from first group only, with required fields
      if (!groups || groups.length === 0 || !groups[0].agents) {
        return [];
      }
      return groups[0].agents.map(agent => ({
        fullName: agent.fullName || `${agent.firstName || ''} ${agent.lastName || ''}`.trim(),
        address: agent.address || '',
        city: agent.city || '',
        state: agent.state || '',
        zip: agent.zip || '',
        phone: agent.phone || ''
      }));
    })(),

    // Healthcare Agents - Successor Agents Array (flattened from all successor groups)
    healthcareAgentSuccessorAgents: (() => {
      const agents = formData.healthcarePOA?.client || [];
      let groups;
      if (formData.healthcarePOA?.clientGroups && Array.isArray(formData.healthcarePOA.clientGroups)) {
        groups = formData.healthcarePOA.clientGroups;
      } else if (agents.some(agent => agent.groupType)) {
        groups = buildGroupsFromAgentsWithGroupType(agents);
      } else {
        groups = buildGroupsFromFlatArray(agents);
      }
      // Return flattened list of all agents from successor groups (skip first group)
      if (!groups || groups.length <= 1) {
        return [];
      }
      const successorGroups = groups.slice(1);
      const allSuccessorAgents = [];
      successorGroups.forEach(group => {
        if (group.agents && group.agents.length > 0) {
          group.agents.forEach(agent => {
            allSuccessorAgents.push({
              fullName: agent.fullName || `${agent.firstName || ''} ${agent.lastName || ''}`.trim(),
              address: agent.address || '',
              city: agent.city || '',
              state: agent.state || '',
              zip: agent.zip || '',
              phone: agent.phone || ''
            });
          });
        }
      });
      return allSuccessorAgents;
    })(),

    // Healthcare Agents - SPOUSE - First Group Formatted
    spouseFirstHealthcareAgentFormatted: (() => {
      const agents = formData.healthcarePOA?.spouse || [];
      let groups;
      if (formData.healthcarePOA?.spouseGroups && Array.isArray(formData.healthcarePOA.spouseGroups)) {
        groups = formData.healthcarePOA.spouseGroups;
      } else if (agents.some(agent => agent.groupType)) {
        groups = buildGroupsFromAgentsWithGroupType(agents);
      } else {
        groups = buildGroupsFromFlatArray(agents);
      }
      return formatFirstGroup(groups);
    })(),

    // Healthcare Agents - SPOUSE - Successors Formatted
    spouseHealthcareAgentSuccessorsFormatted: (() => {
      const agents = formData.healthcarePOA?.spouse || [];
      let groups;
      if (formData.healthcarePOA?.spouseGroups && Array.isArray(formData.healthcarePOA.spouseGroups)) {
        groups = formData.healthcarePOA.spouseGroups;
      } else if (agents.some(agent => agent.groupType)) {
        groups = buildGroupsFromAgentsWithGroupType(agents);
      } else {
        groups = buildGroupsFromFlatArray(agents);
      }
      return formatSuccessorGroups(groups, 'appoint', 'as successor agent under my Healthcare Power of Attorney.');
    })(),

    // Healthcare Agents - SPOUSE - Successor Groups Array (for loops)
    spouseHealthcareAgentGroupsSuccessors: (() => {
      const agents = formData.healthcarePOA?.spouse || [];
      let groups;
      if (formData.healthcarePOA?.spouseGroups && Array.isArray(formData.healthcarePOA.spouseGroups)) {
        groups = formData.healthcarePOA.spouseGroups;
      } else {
        const hasGroupType = agents.some(agent => agent.groupType);
        if (hasGroupType) {
          groups = buildGroupsFromAgentsWithGroupType(agents);
        } else {
          groups = buildGroupsFromFlatArray(agents);
        }
      }
      // Return all groups except the first one, and rename 'agents' to 'spouseHealthcareAgents' for template
      return groups.slice(1).map(group => ({
        ...group,
        spouseHealthcareAgents: group.agents || []
      }));
    })(),

    // Healthcare Agents - SPOUSE - First Group Array (for detail display loop)
    spouseFirstHealthcareAgents: (() => {
      const agents = formData.healthcarePOA?.spouse || [];
      let groups;
      if (formData.healthcarePOA?.spouseGroups && Array.isArray(formData.healthcarePOA.spouseGroups)) {
        groups = formData.healthcarePOA.spouseGroups;
      } else if (agents.some(agent => agent.groupType)) {
        groups = buildGroupsFromAgentsWithGroupType(agents);
      } else {
        groups = buildGroupsFromFlatArray(agents);
      }
      // Return agents from first group only, with required fields
      if (!groups || groups.length === 0 || !groups[0].agents) {
        return [];
      }
      return groups[0].agents.map(agent => ({
        fullName: agent.fullName || `${agent.firstName || ''} ${agent.lastName || ''}`.trim(),
        address: agent.address || '',
        city: agent.city || '',
        state: agent.state || '',
        zip: agent.zip || '',
        phone: agent.phone || ''
      }));
    })(),

    // Healthcare Agents - SPOUSE - All agents array (for general loops)
    spouseHealthcareAgents: (formData.healthcarePOA?.spouse || []).map(agent => ({
      firstName: agent.firstName || '',
      lastName: agent.lastName || '',
      fullName: `${agent.firstName || ''} ${agent.lastName || ''}`.trim(),
      address: agent.address || '',
      city: agent.city || '',
      state: agent.state || '',
      zip: agent.zip || '',
      phone: agent.phone || '',
      relationship: agent.relationship || 'healthcare agent',
    })),

    // 7. HIPAA Agents
    firstHipaaAgentFormatted: (() => {
      const agents = formData.healthcarePOA?.client || [];
      let groups;
      if (formData.healthcarePOA?.clientGroups && Array.isArray(formData.healthcarePOA.clientGroups)) {
        groups = formData.healthcarePOA.clientGroups;
      } else if (agents.some(agent => agent.groupType)) {
        groups = buildGroupsFromAgentsWithGroupType(agents);
      } else {
        groups = buildGroupsFromFlatArray(agents);
      }
      return formatFirstGroup(groups);
    })(),

    hipaaAgentSuccessorsFormatted: (() => {
      const agents = formData.healthcarePOA?.client || [];
      let groups;
      if (formData.healthcarePOA?.clientGroups && Array.isArray(formData.healthcarePOA.clientGroups)) {
        groups = formData.healthcarePOA.clientGroups;
      } else if (agents.some(agent => agent.groupType)) {
        groups = buildGroupsFromAgentsWithGroupType(agents);
      } else {
        groups = buildGroupsFromFlatArray(agents);
      }
      return formatSuccessorGroups(groups, 'appoint', 'as successor agent under my HIPAA Authorization.');
    })(),

    // ============================================================================
    // SNT (Special Needs Trust) Data - Numbered Placeholders for Template
    // ============================================================================

    // Primary beneficiary name (single placeholder)
    beneficiaryName: (() => {
      if (!formData.sntData?.beneficiary) return '';
      const ben = formData.sntData.beneficiary;
      return [ben.firstName, ben.middleName, ben.lastName].filter(Boolean).join(' ');
    })(),

    // Disability description
    disability: formData.sntData?.beneficiary?.disabilityDescription || '',

    // Gender pronouns based on beneficiary sex
    his_her: (() => {
      const sex = formData.sntData?.beneficiary?.sex;
      if (sex === 'male') return 'his';
      if (sex === 'female') return 'her';
      return 'his/her';
    })(),

    he_she: (() => {
      const sex = formData.sntData?.beneficiary?.sex;
      if (sex === 'male') return 'he';
      if (sex === 'female') return 'she';
      return 'he/she';
    })(),

    him_her: (() => {
      const sex = formData.sntData?.beneficiary?.sex;
      if (sex === 'male') return 'him';
      if (sex === 'female') return 'her';
      return 'him/her';
    })(),

    // Grantor names (numbered, max 2)
    grantor1Name: (() => {
      if (!formData.client) return '';
      return [formData.client.firstName, formData.client.middleName, formData.client.lastName].filter(Boolean).join(' ');
    })(),

    grantor2Name: (() => {
      if (!formData.spouse) return '';
      return [formData.spouse.firstName, formData.spouse.middleName, formData.spouse.lastName].filter(Boolean).join(' ');
    })(),

    // Helper flags for grantors
    hasGrantor2: (() => {
      return !!formData.spouse && !!(formData.spouse.firstName || formData.spouse.lastName);
    })(),

    hasSingleGrantor: (() => {
      return !formData.spouse || !(formData.spouse.firstName || formData.spouse.lastName);
    })(),

    // Grantor names concatenated with proper "and" logic
    grantorNames: (() => {
      const name1 = formData.client ? [formData.client.firstName, formData.client.middleName, formData.client.lastName].filter(Boolean).join(' ') : '';
      const name2 = formData.spouse ? [formData.spouse.firstName, formData.spouse.middleName, formData.spouse.lastName].filter(Boolean).join(' ') : '';

      if (!name1) return name2;
      if (!name2) return name1;
      return `${name1} and ${name2}`;
    })(),

    // Current trustee names (numbered, max 2)
    currentTrustee1Name: (() => {
      const trustees = formData.currentTrustees || [];
      if (trustees.length === 0) return '';
      const t = trustees[0];
      return [t.firstName, t.middleName, t.lastName].filter(Boolean).join(' ');
    })(),

    currentTrustee2Name: (() => {
      const trustees = formData.currentTrustees || [];
      if (trustees.length < 2) return '';
      const t = trustees[1];
      return [t.firstName, t.middleName, t.lastName].filter(Boolean).join(' ');
    })(),

    // Helper flags for current trustees
    hasCurrentTrustee2: (() => {
      const trustees = formData.currentTrustees || [];
      return trustees.length >= 2;
    })(),

    hasSingleCurrentTrustee: (() => {
      const trustees = formData.currentTrustees || [];
      return trustees.length === 1;
    })(),

    // Current trustees concatenated with proper "and" logic
    currentTrusteesNames: (() => {
      const trustees = formData.currentTrustees || [];
      if (trustees.length === 0) return '';
      if (trustees.length === 1) {
        const t = trustees[0];
        return [t.firstName, t.middleName, t.lastName].filter(Boolean).join(' ');
      }
      if (trustees.length === 2) {
        const t1 = trustees[0];
        const t2 = trustees[1];
        const name1 = [t1.firstName, t1.middleName, t1.lastName].filter(Boolean).join(' ');
        const name2 = [t2.firstName, t2.middleName, t2.lastName].filter(Boolean).join(' ');
        return `${name1} and ${name2}`;
      }
      // More than 2: use first two with "and"
      const t1 = trustees[0];
      const t2 = trustees[1];
      const name1 = [t1.firstName, t1.middleName, t1.lastName].filter(Boolean).join(' ');
      const name2 = [t2.firstName, t2.middleName, t2.lastName].filter(Boolean).join(' ');
      return `${name1} and ${name2}`;
    })(),

    // Successor trustee names (numbered, max 2)
    successorTrustee1Name: (() => {
      const trustees = formData.successorTrustees || [];
      if (trustees.length === 0) return '';
      const t = trustees[0];
      return [t.firstName, t.middleName, t.lastName].filter(Boolean).join(' ');
    })(),

    successorTrustee2Name: (() => {
      const trustees = formData.successorTrustees || [];
      if (trustees.length < 2) return '';
      const t = trustees[1];
      return [t.firstName, t.middleName, t.lastName].filter(Boolean).join(' ');
    })(),

    // Remainder beneficiary names (numbered, max 3)
    remainderBeneficiary1Name: (() => {
      const beneficiaries = formData.sntData?.remainderBeneficiaries || [];
      if (beneficiaries.length === 0) return '';
      const b = beneficiaries[0];
      return [b.firstName, b.middleName, b.lastName].filter(Boolean).join(' ');
    })(),

    remainderBeneficiary2Name: (() => {
      const beneficiaries = formData.sntData?.remainderBeneficiaries || [];
      if (beneficiaries.length < 2) return '';
      const b = beneficiaries[1];
      return [b.firstName, b.middleName, b.lastName].filter(Boolean).join(' ');
    })(),

    remainderBeneficiary3Name: (() => {
      const beneficiaries = formData.sntData?.remainderBeneficiaries || [];
      if (beneficiaries.length < 3) return '';
      const b = beneficiaries[2];
      return [b.firstName, b.middleName, b.lastName].filter(Boolean).join(' ');
    })(),

    // Notary information
    notaryName: formData.sntData?.notaryName || '',
    notaryDate: formatDateToUS(formData.sntData?.notaryDate) || '',

    // Schedule A Property
    scheduleAProperty: formData.sntData?.scheduleAProperty || '',

    // Legacy/detailed placeholders for backward compatibility
    sntBeneficiary: (() => {
      if (!formData.sntData?.beneficiary) return null;
      const ben = formData.sntData.beneficiary;
      return {
        firstName: ben.firstName || '',
        middleName: ben.middleName || '',
        lastName: ben.lastName || '',
        fullName: [ben.firstName, ben.middleName, ben.lastName].filter(Boolean).join(' '),
        dateOfBirth: formatDateToUS(ben.dateOfBirth) || '',
        ssn: ben.ssn || '',
        sex: ben.sex || '',
        disabilityDescription: ben.disabilityDescription || '',
      };
    })(),

    // Government benefits being received
    sntGovernmentBenefits: (() => {
      if (!formData.sntData?.governmentBenefits) return null;
      const benefits = formData.sntData.governmentBenefits;
      const benefitsList = [];

      if (benefits.ssi) benefitsList.push('SSI (Supplemental Security Income)');
      if (benefits.ssdi) benefitsList.push('SSDI (Social Security Disability Insurance)');
      if (benefits.mediCal) benefitsList.push('Medi-Cal');
      if (benefits.medicare) benefitsList.push('Medicare');
      if (benefits.housingAssistance) benefitsList.push('Housing Assistance');
      if (benefits.other) benefitsList.push(benefits.other);

      return {
        ssi: benefits.ssi || false,
        ssdi: benefits.ssdi || false,
        mediCal: benefits.mediCal || false,
        medicare: benefits.medicare || false,
        housingAssistance: benefits.housingAssistance || false,
        other: benefits.other || '',
        list: benefitsList,
        formatted: benefitsList.join(', '),
        hasBenefits: benefitsList.length > 0,
      };
    })(),

    // Remainder beneficiaries
    sntRemainderBeneficiaries: (() => {
      if (!formData.sntData?.remainderBeneficiaries) return [];
      return formData.sntData.remainderBeneficiaries
        .filter(rb => {
          const name = [rb.firstName, rb.lastName].filter(Boolean).join(' ').trim();
          return name.length > 0 && rb.percentage;
        })
        .map(rb => ({
          firstName: rb.firstName || '',
          lastName: rb.lastName || '',
          fullName: [rb.firstName, rb.lastName].filter(Boolean).join(' '),
          relationship: rb.relationship || '',
          percentage: rb.percentage || '',
        }));
    })(),

    // Formatted list of remainder beneficiaries
    sntRemainderBeneficiariesFormatted: (() => {
      if (!formData.sntData?.remainderBeneficiaries) return '';
      const beneficiaries = formData.sntData.remainderBeneficiaries
        .filter(rb => {
          const name = [rb.firstName, rb.lastName].filter(Boolean).join(' ').trim();
          return name.length > 0 && rb.percentage;
        });

      if (beneficiaries.length === 0) return '';

      return beneficiaries.map(rb => {
        const name = [rb.firstName, rb.lastName].filter(Boolean).join(' ');
        return `${name} (${rb.percentage})`;
      }).join(', ');
    })(),

    // Helper flags
    isSNT: formData.trustType === 'first_party_snt' ||
           formData.trustType === 'third_party_snt' ||
           formData.trustType === 'joint_first_party_snt' ||
           formData.trustType === 'joint_third_party_snt',
    isFirstPartySNT: formData.trustType === 'first_party_snt' || formData.trustType === 'joint_first_party_snt',
    isThirdPartySNT: formData.trustType === 'third_party_snt' || formData.trustType === 'joint_third_party_snt',
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

            // Add angular-expressions iteration variables ($first, $last, $index)
            // These are used in the template with syntax like {#$first}...{/$first}
            const scopePath = context.scopePath;
            const scopePathItem = context.scopePathItem;
            const currentArray = scopePath.length > 0 ? scopeList[scopePath.length - 1] : [];
            const arrayLength = Array.isArray(currentArray) ? currentArray.length : 0;

            // Standard angular iteration variables
            obj.$index = num;
            obj.$first = num === 0;
            obj.$last = arrayLength > 0 && num === arrayLength - 1;
            obj.$middle = !obj.$first && !obj.$last;
            obj.$even = num % 2 === 0;
            obj.$odd = num % 2 === 1;

            // Debug: log when processing $first
            if (tag.includes('$first') && obj.fullName) {
              console.log(`[DEBUG] $first check: num=${num}, $first=${obj.$first}, fullName=${obj.fullName}`);
            }

            // Add loop helper for backward compatibility
            obj.loop = {
              index: num,
              first: obj.$first,
              last: obj.$last,
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
