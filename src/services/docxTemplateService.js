/**
 * DOCX Template Service
 * Uses docxtemplater to fill Word document templates with form data
 */

import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';

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
    trustName: formData.trustName || '',
    trustDate: formData.currentDate || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    grantorFullName: `${formData.client?.firstName || ''} ${formData.client?.middleName || ''} ${formData.client?.lastName || ''}`.trim(),
    maritalStatus: getMaritalStatusStatement(formData.client?.maritalStatus),

    // Children placeholders
    childrenStatement: formData.children && formData.children.length > 0
      ? formData.children.length === 1
        ? `I have one child, ${formData.children[0].name || (formData.children[0].firstName + ' ' + formData.children[0].lastName)}, born ${formData.children[0].birthday || formData.children[0].dateOfBirth}.`
        : `I have ${formData.children.length} children.`
      : 'I have no children.',

    childrenTable: (formData.children || []).map((c, i) =>
      `${i + 1}. ${c.name || (c.firstName + ' ' + c.lastName)}, born ${c.birthday || c.dateOfBirth}`
    ).join('\n'),

    childrenReferences: (formData.children || []).map(c =>
      c.name || `${c.firstName || ''} ${c.lastName || ''}`.trim()
    ).join(', '),

    // Trustees placeholders
    successorTrusteesList: (formData.successorTrustees || []).map((t, i) =>
      `${i + 1}. ${t.name || `${t.firstName || ''} ${t.lastName || ''}`.trim()}`
    ).join('\n'),

    successorTrusteesDuringIncapacity: (formData.successorTrustees || []).map(t =>
      t.name || `${t.firstName || ''} ${t.lastName || ''}`.trim()
    ).join(', '),

    successorTrusteesAfterDeath: (formData.successorTrustees || []).map(t =>
      t.name || `${t.firstName || ''} ${t.lastName || ''}`.trim()
    ).join(', '),

    // Beneficiary distribution
    beneficiaryDistribution: (formData.residuaryBeneficiaries || []).map(b =>
      `${b.name}: ${b.share}%`
    ).join(', '),

    // Assets (placeholder for future use)
    assets: 'All property transferred to this trust',
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

    // Fix split tags in the ZIP
    // When Word formats text, it often splits {placeholders} across multiple XML elements
    // We need to merge these back together
    const documentXml = zip.file('word/document.xml').asText();

    // Simple regex to merge split placeholders
    // Match: {</w:t>...<w:t>text</w:t>...<w:t>}
    const mergedXml = documentXml.replace(
      /\{([^}]*?)<\/w:t>([\s\S]*?)<w:t>([^}]*?)\}/g,
      function(match, before, middle, after) {
        // Extract just the text content from middle section
        const middleText = middle.replace(/<[^>]+>/g, '');
        return `{${before}${middleText}${after}}`;
      }
    );

    // Update the zip with merged content
    zip.file('word/document.xml', mergedXml);

    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
      nullGetter: function(part) {
        // Return empty string for undefined values instead of throwing error
        return '';
      },
    });

    // Prepare data
    const data = prepareTemplateData(formData);

    console.log('Filling DOCX template with data:', Object.keys(data));

    // Fill the template
    doc.render(data);

    // Generate the filled document
    const output = doc.getZip().generate({
      type: 'blob',
      mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    });

    console.log('DOCX template filled successfully, size:', output.size, 'bytes');
    return output;

  } catch (error) {
    console.error('Error filling DOCX template:', error);
    if (error.properties && error.properties.errors) {
      console.error('Template errors:', error.properties.errors);
      console.error('=== DETAILED ERROR INFO ===');
      error.properties.errors.forEach((err, i) => {
        console.error(`\nError ${i + 1}:`);
        console.error('  Message:', err.message);
        console.error('  Tag:', err.properties?.xtag || 'N/A');
        console.error('  Context:', err.properties?.context?.substring(0, 150) || 'N/A');
        console.error('  Explanation:', err.properties?.explanation || 'N/A');
        console.error('  File:', err.properties?.file || 'N/A');
      });
      console.error('=========================');
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
