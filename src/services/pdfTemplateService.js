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
 * @returns {Promise<Blob|null>} - Filled PDF as Blob, or null if no form fields found
 */
export const fillPDFFormFields = async (templateBytes, formData) => {
  try {
    const pdfDoc = await PDFDocument.load(templateBytes);

    // Check if PDF has a form
    let form;
    try {
      form = pdfDoc.getForm();
    } catch (formError) {
      console.warn('PDF does not have a form:', formError.message);
      return null; // No form found
    }

    // Get all form fields
    const fields = form.getFields();
    console.log('Found form fields:', fields.length);

    if (fields.length === 0) {
      console.warn('PDF has no form fields - cannot fill placeholders');
      return null; // No fields to fill
    }

    console.log('Form field names:', fields.map(f => f.getName()));

    // Create placeholder mapping
    const placeholders = createPlaceholderMap(formData);

    // Fill each field
    let filledCount = 0;
    fields.forEach(field => {
      const fieldName = field.getName();
      const value = placeholders[fieldName];

      if (value !== undefined) {
        try {
          const fieldType = field.constructor.name;

          if (fieldType === 'PDFTextField') {
            field.setText(String(value));
            filledCount++;
          } else if (fieldType === 'PDFCheckBox') {
            if (value === true || value === 'true' || value === 'yes') {
              field.check();
            } else {
              field.uncheck();
            }
            filledCount++;
          }

          console.log(`Filled field: ${fieldName} = ${value}`);
        } catch (err) {
          console.warn(`Could not fill field ${fieldName}:`, err);
        }
      }
    });

    console.log(`Successfully filled ${filledCount} out of ${fields.length} fields`);

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
 * Helper function to add field with multiple naming variations
 * Supports: FIELD_NAME, ${FIELD_NAME}, {{FIELD_NAME}}
 */
const addField = (map, fieldName, value) => {
  map[fieldName] = value;                    // Plain: CLIENT_FIRST_NAME
  map[`\${${fieldName}}`] = value;           // Dollar braces: ${CLIENT_FIRST_NAME}
  map[`{{${fieldName}}}`] = value;           // Double braces: {{CLIENT_FIRST_NAME}}
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
    addField(map, 'CLIENT_FIRST_NAME', formData.client.firstName || '');
    addField(map, 'CLIENT_MIDDLE_NAME', formData.client.middleName || '');
    addField(map, 'CLIENT_LAST_NAME', formData.client.lastName || '');
    addField(map, 'CLIENT_FULL_NAME', [formData.client.firstName, formData.client.middleName, formData.client.lastName].filter(Boolean).join(' '));
    addField(map, 'CLIENT_ADDRESS', formData.client.address || '');
    addField(map, 'CLIENT_CITY', formData.client.city || '');
    addField(map, 'CLIENT_STATE', formData.client.state || '');
    addField(map, 'CLIENT_ZIP', formData.client.zip || '');
    addField(map, 'CLIENT_COUNTY', formData.client.county || '');
    addField(map, 'CLIENT_PHONE', formData.client.phone || '');
    addField(map, 'CLIENT_EMAIL', formData.client.email || '');
    addField(map, 'CLIENT_SSN', formData.client.ssn || '');
    addField(map, 'CLIENT_DOB', formData.client.dateOfBirth || '');
    addField(map, 'CLIENT_SEX', formData.client.sex || '');
    addField(map, 'CLIENT_MARITAL_STATUS', formData.client.maritalStatus || '');
    addField(map, 'CLIENT_NOTARY_DATE', formData.client.notaryDate || '');
  }

  // Spouse information
  if (formData.spouse && formData.isJoint) {
    addField(map, 'SPOUSE_FIRST_NAME', formData.spouse.firstName || '');
    addField(map, 'SPOUSE_MIDDLE_NAME', formData.spouse.middleName || '');
    addField(map, 'SPOUSE_LAST_NAME', formData.spouse.lastName || '');
    addField(map, 'SPOUSE_FULL_NAME', [formData.spouse.firstName, formData.spouse.middleName, formData.spouse.lastName].filter(Boolean).join(' '));
    addField(map, 'SPOUSE_ADDRESS', formData.spouse.address || '');
    addField(map, 'SPOUSE_CITY', formData.spouse.city || '');
    addField(map, 'SPOUSE_STATE', formData.spouse.state || '');
    addField(map, 'SPOUSE_ZIP', formData.spouse.zip || '');
    addField(map, 'SPOUSE_COUNTY', formData.spouse.county || '');
    addField(map, 'SPOUSE_PHONE', formData.spouse.phone || '');
    addField(map, 'SPOUSE_EMAIL', formData.spouse.email || '');
    addField(map, 'SPOUSE_SSN', formData.spouse.ssn || '');
    addField(map, 'SPOUSE_DOB', formData.spouse.dateOfBirth || '');
    addField(map, 'SPOUSE_SEX', formData.spouse.sex || '');
    addField(map, 'SPOUSE_NOTARY_DATE', formData.spouse.notaryDate || '');
  }

  // Trust information
  addField(map, 'TRUST_NAME', formData.trustName || '');
  addField(map, 'TRUST_TYPE', formData.trustType || '');
  addField(map, 'IS_JOINT', formData.isJoint ? 'Yes' : 'No');
  addField(map, 'IS_IRREVOCABLE', formData.isIrrevocable ? 'Yes' : 'No');
  addField(map, 'IS_RESTATEMENT', formData.isRestatement ? 'Yes' : 'No');
  addField(map, 'ORIGINAL_TRUST_NAME', formData.originalTrustName || '');
  addField(map, 'ORIGINAL_TRUST_DATE', formData.originalTrustDate || '');
  addField(map, 'CURRENT_DATE', formData.currentDate || new Date().toLocaleDateString('en-US'));

  // Children
  if (formData.children && formData.children.length > 0) {
    addField(map, 'NUM_CHILDREN', String(formData.children.length));
    formData.children.forEach((child, index) => {
      addField(map, `CHILD_${index + 1}_FIRST_NAME`, child.firstName || '');
      addField(map, `CHILD_${index + 1}_LAST_NAME`, child.lastName || '');
      addField(map, `CHILD_${index + 1}_DOB`, child.dateOfBirth || '');
      addField(map, `CHILD_${index + 1}_RELATION`, child.relation || '');
      addField(map, `CHILD_${index + 1}_FULL_NAME`, `${child.firstName || ''} ${child.lastName || ''}`.trim());
    });

    // Combined children list
    const childrenList = formData.children.map((c, i) =>
      `${i + 1}. ${c.firstName} ${c.lastName}, born ${c.dateOfBirth}`
    ).join('\n');
    addField(map, 'CHILDREN_LIST', childrenList);
  } else {
    addField(map, 'NUM_CHILDREN', '0');
    addField(map, 'CHILDREN_LIST', 'None');
  }

  // Successor Trustees
  if (formData.successorTrustees && formData.successorTrustees.length > 0) {
    addField(map, 'NUM_TRUSTEES', String(formData.successorTrustees.length));
    formData.successorTrustees.forEach((trustee, index) => {
      addField(map, `TRUSTEE_${index + 1}_FIRST_NAME`, trustee.firstName || '');
      addField(map, `TRUSTEE_${index + 1}_LAST_NAME`, trustee.lastName || '');
      addField(map, `TRUSTEE_${index + 1}_ADDRESS`, trustee.address || '');
      addField(map, `TRUSTEE_${index + 1}_PHONE`, trustee.phone || '');
      addField(map, `TRUSTEE_${index + 1}_EMAIL`, trustee.email || '');
      addField(map, `TRUSTEE_${index + 1}_FULL_NAME`, `${trustee.firstName || ''} ${trustee.lastName || ''}`.trim());
    });

    // Combined trustees list
    const trusteesList = formData.successorTrustees.map((t, i) =>
      `${i + 1}. ${t.firstName} ${t.lastName}`
    ).join('\n');
    addField(map, 'TRUSTEES_LIST', trusteesList);
  } else {
    addField(map, 'NUM_TRUSTEES', '0');
    addField(map, 'TRUSTEES_LIST', 'None designated');
  }

  // Guardians
  if (formData.guardians && formData.guardians.length > 0) {
    formData.guardians.forEach((guardian, index) => {
      addField(map, `GUARDIAN_${index + 1}_FIRST_NAME`, guardian.firstName || '');
      addField(map, `GUARDIAN_${index + 1}_LAST_NAME`, guardian.lastName || '');
      addField(map, `GUARDIAN_${index + 1}_ADDRESS`, guardian.address || '');
      addField(map, `GUARDIAN_${index + 1}_PHONE`, guardian.phone || '');
    });

    const guardiansList = formData.guardians.map((g, i) =>
      `${i + 1}. ${g.firstName} ${g.lastName}`
    ).join('\n');
    addField(map, 'GUARDIANS_LIST', guardiansList);
  } else {
    addField(map, 'GUARDIANS_LIST', 'None designated');
  }

  // POA Agents - Client
  if (formData.durablePOA?.client && formData.durablePOA.client.length > 0) {
    formData.durablePOA.client.forEach((agent, index) => {
      addField(map, `CLIENT_POA_${index + 1}_FIRST_NAME`, agent.firstName || '');
      addField(map, `CLIENT_POA_${index + 1}_LAST_NAME`, agent.lastName || '');
      addField(map, `CLIENT_POA_${index + 1}_ADDRESS`, agent.address || '');
      addField(map, `CLIENT_POA_${index + 1}_PHONE`, agent.phone || '');
    });
  }

  // POA Agents - Spouse
  if (formData.durablePOA?.spouse && formData.durablePOA.spouse.length > 0) {
    formData.durablePOA.spouse.forEach((agent, index) => {
      addField(map, `SPOUSE_POA_${index + 1}_FIRST_NAME`, agent.firstName || '');
      addField(map, `SPOUSE_POA_${index + 1}_LAST_NAME`, agent.lastName || '');
      addField(map, `SPOUSE_POA_${index + 1}_ADDRESS`, agent.address || '');
      addField(map, `SPOUSE_POA_${index + 1}_PHONE`, agent.phone || '');
    });
  }

  // Healthcare Agents - Client
  if (formData.healthcarePOA?.client && formData.healthcarePOA.client.length > 0) {
    formData.healthcarePOA.client.forEach((agent, index) => {
      addField(map, `CLIENT_HEALTHCARE_${index + 1}_FIRST_NAME`, agent.firstName || '');
      addField(map, `CLIENT_HEALTHCARE_${index + 1}_LAST_NAME`, agent.lastName || '');
      addField(map, `CLIENT_HEALTHCARE_${index + 1}_PHONE`, agent.phone || '');
    });
  }

  // Healthcare Agents - Spouse
  if (formData.healthcarePOA?.spouse && formData.healthcarePOA.spouse.length > 0) {
    formData.healthcarePOA.spouse.forEach((agent, index) => {
      addField(map, `SPOUSE_HEALTHCARE_${index + 1}_FIRST_NAME`, agent.firstName || '');
      addField(map, `SPOUSE_HEALTHCARE_${index + 1}_LAST_NAME`, agent.lastName || '');
      addField(map, `SPOUSE_HEALTHCARE_${index + 1}_PHONE`, agent.phone || '');
    });
  }

  // Anatomical Gifts
  addField(map, 'CLIENT_ANATOMICAL_GIFT', formData.anatomicalGifts?.client || 'none');
  addField(map, 'SPOUSE_ANATOMICAL_GIFT', formData.anatomicalGifts?.spouse || 'none');

  return map;
};

/**
 * Generate Estate Planning Package from PDF Template
 * @param {Object} formData - Form data
 * @param {string} templatePath - Path to PDF template
 * @returns {Promise<Blob|null>} - Filled PDF as Blob, or null if PDF has no form fields
 */
export const generateFromPDFTemplate = async (formData, templatePath) => {
  try {
    console.log('Loading PDF template from:', templatePath);
    const templateBytes = await loadPDFTemplate(templatePath);

    console.log('Filling PDF template with form data...');
    const filledPDF = await fillPDFFormFields(templateBytes, formData);

    if (filledPDF === null) {
      console.warn('PDF template has no form fields - cannot use PDF template system');
      return null;
    }

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
    console.log('Checking if PDF template exists at:', templatePath);
    const response = await fetch(templatePath, { method: 'HEAD' });
    console.log('PDF template HEAD response status:', response.status, 'ok:', response.ok);

    // Check content type to avoid HTML being served instead of PDF (SPA fallback)
    const contentType = response.headers.get('content-type') || '';
    console.log('PDF template content-type:', contentType || '(empty)');

    // If response is OK and content-type is explicitly HTML, it's the SPA fallback
    if (response.ok && contentType.toLowerCase().includes('html')) {
      console.warn('❌ PDF template path returns HTML (SPA fallback) - file does not exist');
      return false;
    }

    // Check Content-Length to ensure it's a real file
    const contentLength = response.headers.get('content-length');
    console.log('PDF template content-length:', contentLength);

    if (response.ok && contentLength && parseInt(contentLength) > 1000) {
      console.log('✅ PDF template found! Size:', contentLength, 'bytes');
      return true;
    }

    if (response.ok && !contentType.includes('html')) {
      // Empty content-type but 200 response - likely the file exists
      console.log('✅ PDF template found (empty content-type but 200 OK)');
      return true;
    }

    console.warn('❌ PDF template not found (status:', response.status, ')');
    return false;
  } catch (error) {
    console.error('❌ Error checking PDF template:', error);
    return false;
  }
};
