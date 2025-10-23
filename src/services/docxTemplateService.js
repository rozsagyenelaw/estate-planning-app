/**
 * DOCX Template Service
 * Uses docxtemplater to fill Word document templates with form data
 */

import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';

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

    // POA Agents - Client
    clientPOA: formData.durablePOA?.client || [],

    // POA Agents - Spouse
    spousePOA: formData.durablePOA?.spouse || [],

    // Healthcare Agents - Client
    clientHealthcare: formData.healthcarePOA?.client || [],

    // Healthcare Agents - Spouse
    spouseHealthcare: formData.healthcarePOA?.spouse || [],

    // Anatomical Gifts
    anatomicalGifts: {
      client: formData.anatomicalGifts?.client || 'none',
      spouse: formData.anatomicalGifts?.spouse || 'none',
    },
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
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
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
    const contentType = response.headers.get('content-type');
    console.log('DOCX template content-type:', contentType);

    if (response.ok && contentType && contentType.includes('html')) {
      console.warn('❌ DOCX template path returns HTML (SPA fallback) - file does not exist');
      return false;
    }

    if (response.ok) {
      console.log('✅ DOCX template found!');
      return true;
    }

    console.warn('❌ DOCX template not found (status:', response.status, ')');
    return false;
  } catch (error) {
    console.error('❌ Error checking DOCX template:', error);
    return false;
  }
};
