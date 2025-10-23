/**
 * PDF Template Service
 * Loads PDF templates and fills in placeholders with client data
 */

import { PDFDocument } from 'pdf-lib';

/**
 * Load a PDF template from the public folder
 * @param {string} templatePath - Path to template (e.g., '/templates/estate_planning_portfolio_template.pdf')
 * @returns {Promise<Uint8Array>} - PDF bytes
 */
export const loadPDFTemplate = async (templatePath) => {
  try {
    const response = await fetch(templatePath);
    if (!response.ok) {
      throw new Error(`Failed to load template: ${response.statusText}`);
    }
    const arrayBuffer = await response.arrayBuffer();
    return new Uint8Array(arrayBuffer);
  } catch (error) {
    console.error('Error loading PDF template:', error);
    throw error;
  }
};

/**
 * Fill PDF template with form data
 * This function replaces text placeholders in the PDF
 * @param {Uint8Array} templateBytes - PDF template bytes
 * @param {Object} formData - Form data with client information
 * @returns {Promise<Blob>} - Filled PDF as Blob
 */
export const fillPDFTemplate = async (templateBytes, formData) => {
  try {
    // Load the PDF
    const pdfDoc = await PDFDocument.load(templateBytes);

    // Get all pages
    const pages = pdfDoc.getPages();

    // Create placeholder mapping
    const placeholders = createPlaceholderMap(formData);

    console.log('Filling PDF template with placeholders:', Object.keys(placeholders).length);

    // For each page, try to replace text
    // NOTE: pdf-lib doesn't directly support text replacement in existing content
    // We need to use a different approach or library for that

    // Save the PDF
    const pdfBytes = await pdfDoc.save();

    // Convert to Blob
    return new Blob([pdfBytes], { type: 'application/pdf' });

  } catch (error) {
    console.error('Error filling PDF template:', error);
    throw error;
  }
};

/**
 * Alternative: Fill PDF Form Fields (if template has form fields)
 * @param {Uint8Array} templateBytes - PDF template bytes
 * @param {Object} formData - Form data with client information
 * @returns {Promise<Blob>} - Filled PDF as Blob
 */
export const fillPDFFormFields = async (templateBytes, formData) => {
  try {
    const pdfDoc = await PDFDocument.load(templateBytes);
    const form = pdfDoc.getForm();

    // Get all form fields
    const fields = form.getFields();
    console.log('Found form fields:', fields.map(f => f.getName()));

    // Create placeholder mapping
    const placeholders = createPlaceholderMap(formData);

    // Fill each field
    fields.forEach(field => {
      const fieldName = field.getName();
      const value = placeholders[fieldName];

      if (value !== undefined) {
        try {
          const fieldType = field.constructor.name;

          if (fieldType === 'PDFTextField') {
            field.setText(String(value));
          } else if (fieldType === 'PDFCheckBox') {
            if (value === true || value === 'true' || value === 'yes') {
              field.check();
            } else {
              field.uncheck();
            }
          }

          console.log(`Filled field: ${fieldName} = ${value}`);
        } catch (err) {
          console.warn(`Could not fill field ${fieldName}:`, err);
        }
      }
    });

    // Flatten the form (optional - makes fields non-editable)
    // form.flatten();

    // Save the PDF
    const pdfBytes = await pdfDoc.save();

    // Convert to Blob
    return new Blob([pdfBytes], { type: 'application/pdf' });

  } catch (error) {
    console.error('Error filling PDF form fields:', error);
    throw error;
  }
};

/**
 * Create a map of placeholders to values from form data
 * @param {Object} formData - Form data
 * @returns {Object} - Placeholder map
 */
const createPlaceholderMap = (formData) => {
  const map = {};

  // Client information
  if (formData.client) {
    map['CLIENT_FIRST_NAME'] = formData.client.firstName || '';
    map['CLIENT_MIDDLE_NAME'] = formData.client.middleName || '';
    map['CLIENT_LAST_NAME'] = formData.client.lastName || '';
    map['CLIENT_FULL_NAME'] = `${formData.client.firstName || ''} ${formData.client.middleName || ''} ${formData.client.lastName || ''}`.trim();
    map['CLIENT_ADDRESS'] = formData.client.address || '';
    map['CLIENT_CITY'] = formData.client.city || '';
    map['CLIENT_STATE'] = formData.client.state || '';
    map['CLIENT_ZIP'] = formData.client.zip || '';
    map['CLIENT_COUNTY'] = formData.client.county || '';
    map['CLIENT_PHONE'] = formData.client.phone || '';
    map['CLIENT_EMAIL'] = formData.client.email || '';
    map['CLIENT_SSN'] = formData.client.ssn || '';
    map['CLIENT_DOB'] = formData.client.dateOfBirth || '';
    map['CLIENT_SEX'] = formData.client.sex || '';
    map['CLIENT_MARITAL_STATUS'] = formData.client.maritalStatus || '';
    map['CLIENT_NOTARY_DATE'] = formData.client.notaryDate || '';
  }

  // Spouse information
  if (formData.spouse && formData.isJoint) {
    map['SPOUSE_FIRST_NAME'] = formData.spouse.firstName || '';
    map['SPOUSE_MIDDLE_NAME'] = formData.spouse.middleName || '';
    map['SPOUSE_LAST_NAME'] = formData.spouse.lastName || '';
    map['SPOUSE_FULL_NAME'] = `${formData.spouse.firstName || ''} ${formData.spouse.middleName || ''} ${formData.spouse.lastName || ''}`.trim();
    map['SPOUSE_ADDRESS'] = formData.spouse.address || '';
    map['SPOUSE_CITY'] = formData.spouse.city || '';
    map['SPOUSE_STATE'] = formData.spouse.state || '';
    map['SPOUSE_ZIP'] = formData.spouse.zip || '';
    map['SPOUSE_COUNTY'] = formData.spouse.county || '';
    map['SPOUSE_PHONE'] = formData.spouse.phone || '';
    map['SPOUSE_EMAIL'] = formData.spouse.email || '';
    map['SPOUSE_SSN'] = formData.spouse.ssn || '';
    map['SPOUSE_DOB'] = formData.spouse.dateOfBirth || '';
    map['SPOUSE_SEX'] = formData.spouse.sex || '';
    map['SPOUSE_NOTARY_DATE'] = formData.spouse.notaryDate || '';
  }

  // Trust information
  map['TRUST_NAME'] = formData.trustName || '';
  map['TRUST_TYPE'] = formData.trustType || '';
  map['IS_JOINT'] = formData.isJoint ? 'Yes' : 'No';
  map['IS_IRREVOCABLE'] = formData.isIrrevocable ? 'Yes' : 'No';
  map['IS_RESTATEMENT'] = formData.isRestatement ? 'Yes' : 'No';
  map['ORIGINAL_TRUST_NAME'] = formData.originalTrustName || '';
  map['ORIGINAL_TRUST_DATE'] = formData.originalTrustDate || '';
  map['CURRENT_DATE'] = formData.currentDate || new Date().toLocaleDateString();

  // Children
  if (formData.children && formData.children.length > 0) {
    map['NUM_CHILDREN'] = String(formData.children.length);
    formData.children.forEach((child, index) => {
      map[`CHILD_${index + 1}_FIRST_NAME`] = child.firstName || '';
      map[`CHILD_${index + 1}_LAST_NAME`] = child.lastName || '';
      map[`CHILD_${index + 1}_DOB`] = child.dateOfBirth || '';
      map[`CHILD_${index + 1}_RELATION`] = child.relation || '';
      map[`CHILD_${index + 1}_FULL_NAME`] = `${child.firstName || ''} ${child.lastName || ''}`.trim();
    });

    // Combined children list
    map['CHILDREN_LIST'] = formData.children.map((c, i) =>
      `${i + 1}. ${c.firstName} ${c.lastName}, born ${c.dateOfBirth}`
    ).join('\n');
  } else {
    map['NUM_CHILDREN'] = '0';
    map['CHILDREN_LIST'] = 'None';
  }

  // Successor Trustees
  if (formData.successorTrustees && formData.successorTrustees.length > 0) {
    map['NUM_TRUSTEES'] = String(formData.successorTrustees.length);
    formData.successorTrustees.forEach((trustee, index) => {
      map[`TRUSTEE_${index + 1}_FIRST_NAME`] = trustee.firstName || '';
      map[`TRUSTEE_${index + 1}_LAST_NAME`] = trustee.lastName || '';
      map[`TRUSTEE_${index + 1}_ADDRESS`] = trustee.address || '';
      map[`TRUSTEE_${index + 1}_PHONE`] = trustee.phone || '';
      map[`TRUSTEE_${index + 1}_EMAIL`] = trustee.email || '';
      map[`TRUSTEE_${index + 1}_FULL_NAME`] = `${trustee.firstName || ''} ${trustee.lastName || ''}`.trim();
    });

    // Combined trustees list
    map['TRUSTEES_LIST'] = formData.successorTrustees.map((t, i) =>
      `${i + 1}. ${t.firstName} ${t.lastName}`
    ).join('\n');
  } else {
    map['NUM_TRUSTEES'] = '0';
    map['TRUSTEES_LIST'] = 'None designated';
  }

  // Guardians
  if (formData.guardians && formData.guardians.length > 0) {
    formData.guardians.forEach((guardian, index) => {
      map[`GUARDIAN_${index + 1}_FIRST_NAME`] = guardian.firstName || '';
      map[`GUARDIAN_${index + 1}_LAST_NAME`] = guardian.lastName || '';
      map[`GUARDIAN_${index + 1}_ADDRESS`] = guardian.address || '';
      map[`GUARDIAN_${index + 1}_PHONE`] = guardian.phone || '';
    });

    map['GUARDIANS_LIST'] = formData.guardians.map((g, i) =>
      `${i + 1}. ${g.firstName} ${g.lastName}`
    ).join('\n');
  } else {
    map['GUARDIANS_LIST'] = 'None designated';
  }

  // POA Agents - Client
  if (formData.durablePOA?.client && formData.durablePOA.client.length > 0) {
    formData.durablePOA.client.forEach((agent, index) => {
      map[`CLIENT_POA_${index + 1}_FIRST_NAME`] = agent.firstName || '';
      map[`CLIENT_POA_${index + 1}_LAST_NAME`] = agent.lastName || '';
      map[`CLIENT_POA_${index + 1}_ADDRESS`] = agent.address || '';
      map[`CLIENT_POA_${index + 1}_PHONE`] = agent.phone || '';
    });
  }

  // POA Agents - Spouse
  if (formData.durablePOA?.spouse && formData.durablePOA.spouse.length > 0) {
    formData.durablePOA.spouse.forEach((agent, index) => {
      map[`SPOUSE_POA_${index + 1}_FIRST_NAME`] = agent.firstName || '';
      map[`SPOUSE_POA_${index + 1}_LAST_NAME`] = agent.lastName || '';
      map[`SPOUSE_POA_${index + 1}_ADDRESS`] = agent.address || '';
      map[`SPOUSE_POA_${index + 1}_PHONE`] = agent.phone || '';
    });
  }

  // Healthcare Agents - Client
  if (formData.healthcarePOA?.client && formData.healthcarePOA.client.length > 0) {
    formData.healthcarePOA.client.forEach((agent, index) => {
      map[`CLIENT_HEALTHCARE_${index + 1}_FIRST_NAME`] = agent.firstName || '';
      map[`CLIENT_HEALTHCARE_${index + 1}_LAST_NAME`] = agent.lastName || '';
      map[`CLIENT_HEALTHCARE_${index + 1}_PHONE`] = agent.phone || '';
    });
  }

  // Healthcare Agents - Spouse
  if (formData.healthcarePOA?.spouse && formData.healthcarePOA.spouse.length > 0) {
    formData.healthcarePOA.spouse.forEach((agent, index) => {
      map[`SPOUSE_HEALTHCARE_${index + 1}_FIRST_NAME`] = agent.firstName || '';
      map[`SPOUSE_HEALTHCARE_${index + 1}_LAST_NAME`] = agent.lastName || '';
      map[`SPOUSE_HEALTHCARE_${index + 1}_PHONE`] = agent.phone || '';
    });
  }

  // Anatomical Gifts
  map['CLIENT_ANATOMICAL_GIFT'] = formData.anatomicalGifts?.client || 'none';
  map['SPOUSE_ANATOMICAL_GIFT'] = formData.anatomicalGifts?.spouse || 'none';

  return map;
};

/**
 * Generate Estate Planning Package from PDF Template
 * @param {Object} formData - Form data
 * @param {string} templatePath - Path to PDF template
 * @returns {Promise<Blob>} - Filled PDF as Blob
 */
export const generateFromPDFTemplate = async (formData, templatePath) => {
  try {
    console.log('Loading PDF template from:', templatePath);
    const templateBytes = await loadPDFTemplate(templatePath);

    console.log('Filling PDF template with form data...');
    const filledPDF = await fillPDFFormFields(templateBytes, formData);

    console.log('PDF template filled successfully, size:', filledPDF.size, 'bytes');
    return filledPDF;

  } catch (error) {
    console.error('Error generating from PDF template:', error);
    throw error;
  }
};

/**
 * Check if a PDF template exists
 * @param {string} templatePath - Path to PDF template
 * @returns {Promise<boolean>} - True if template exists
 */
export const templateExists = async (templatePath) => {
  try {
    const response = await fetch(templatePath, { method: 'HEAD' });
    return response.ok;
  } catch (error) {
    return false;
  }
};
