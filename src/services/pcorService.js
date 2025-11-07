/**
 * PCOR Form Filling Service
 *
 * Fills official county PCOR forms using pdf-lib
 *
 * NOTE: This service requires the actual PCOR forms to be uploaded to:
 * /public/templates/los-angeles-pcor.pdf
 * /public/templates/ventura-pcor.pdf
 * /public/templates/san-bernardino-pcor.pdf
 * /public/templates/riverside-pcor.pdf
 * /public/templates/orange-pcor.pdf
 */

import { PDFDocument } from 'pdf-lib';

/**
 * Fill PCOR form with deed data
 * @param {Object} formData - All form data from the wizard
 * @param {string} countyId - County ID (e.g., 'los-angeles')
 * @returns {Promise<Blob>} - Filled PDF blob
 */
export const fillPCORForm = async (formData, countyId) => {
  try {
    // Load the appropriate PCOR template
    const templatePath = `/templates/${countyId}-pcor.pdf`;

    const response = await fetch(templatePath);

    if (!response.ok) {
      throw new Error(`PCOR form for ${countyId} not found. Please upload the form to ${templatePath}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);

    // Get the form
    const form = pdfDoc.getForm();
    const fields = form.getFields();

    // Check if the PDF has any form fields
    if (fields.length === 0) {
      throw new Error(`The ${countyId} PCOR PDF has no fillable form fields. Please upload a fillable PDF form (not a flattened or scanned PDF). You can obtain fillable PCOR forms from the county assessor's website.`);
    }

    console.log(`Filling ${countyId} PCOR - ${fields.length} form fields found`);

    // Fill the form based on county
    // Each county may have different field names
    switch (countyId) {
      case 'los-angeles':
        fillLosAngelesPCOR(form, formData);
        break;
      case 'ventura':
        fillVenturaPCOR(form, formData);
        break;
      case 'san-bernardino':
        fillSanBernardinoPCOR(form, formData);
        break;
      case 'riverside':
        fillRiversidePCOR(form, formData);
        break;
      case 'orange':
        fillOrangePCOR(form, formData);
        break;
      default:
        throw new Error(`Unsupported county: ${countyId}`);
    }

    // Flatten the form (make it non-editable)
    // form.flatten();

    // Save the filled PDF
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });

    return blob;
  } catch (error) {
    console.error('Error filling PCOR form:', error);
    throw new Error(`Failed to fill PCOR form: ${error.message}`);
  }
};

/**
 * Fill Los Angeles County PCOR
 *
 * Field names discovered by inspecting the actual PDF form
 */
function fillLosAngelesPCOR(form, data) {
  try {
    console.log('='.repeat(80));
    console.log('FILLING LOS ANGELES/RIVERSIDE/SAN BERNARDINO PCOR');
    console.log('='.repeat(80));
    console.log('Full data object:', JSON.stringify(data, null, 2));

    // Helper function to safely get a field
    const getField = (fieldName) => {
      try {
        return form.getField(fieldName);
      } catch (e) {
        console.warn(`⚠️ Field not found: ${fieldName}`);
        return null;
      }
    };

    // Helper function to safely set text
    const setText = (fieldName, value) => {
      try {
        const field = getField(fieldName);
        if (field) {
          const fieldType = field.constructor.name;
          console.log(`Found field: ${fieldName}, Type: ${fieldType}`);

          // Use duck-typing to check if it's a text field (works with minified builds)
          if (typeof field.setText === 'function') {
            field.setText(String(value || ''));
            console.log(`✓ Set ${fieldName} = ${value}`);
          } else {
            console.warn(`⚠️ Field ${fieldName} is not a text field, it's ${fieldType}`);
          }
        } else {
          console.warn(`⚠️ Field ${fieldName} not found in form`);
        }
      } catch (e) {
        console.error(`❌ Could not set text for ${fieldName}:`, e.message);
      }
    };

    // Helper function to safely check a checkbox
    const checkBox = (fieldName) => {
      try {
        const field = getField(fieldName);
        if (field) {
          const fieldType = field.constructor.name;
          console.log(`Found checkbox: ${fieldName}, Type: ${fieldType}`);

          // Use duck-typing to check if it's a checkbox (works with minified builds)
          if (typeof field.check === 'function') {
            field.check();
            console.log(`✓ Checked ${fieldName}`);
          } else {
            console.warn(`⚠️ Field ${fieldName} is not a checkbox, it's ${fieldType}`);
          }
        } else {
          console.warn(`⚠️ Checkbox ${fieldName} not found in form`);
        }
      } catch (e) {
        console.error(`❌ Could not check ${fieldName}:`, e.message);
      }
    };

    // Prepare data
    console.log('\n--- PREPARING DATA ---');
    console.log('grantorNames:', data.grantorNames);
    console.log('trusteeName:', data.trusteeName);
    console.log('trustName:', data.trustName);
    console.log('trustDate:', data.trustDate);
    console.log('propertyAddress:', data.propertyAddress);
    console.log('apn:', data.apn);

    const grantorNames = (data.grantorNames || []).join(' AND ').toUpperCase();
    const trusteeName = (data.trusteeName || '').toUpperCase();
    const trustName = (data.trustName || '').toUpperCase();
    const trustDate = data.trustDate || '';
    const propertyStreet = data.propertyAddress?.street || '';
    const propertyCity = data.propertyAddress?.city || '';
    const propertyState = data.propertyAddress?.state || 'CA';
    const propertyZip = data.propertyAddress?.zip || '';
    const apn = data.apn || '';

    console.log('\n--- FORMATTED DATA ---');
    console.log('grantorNames (formatted):', grantorNames);
    console.log('trustName (formatted):', trustName);
    console.log('propertyStreet:', propertyStreet);
    console.log('propertyCity:', propertyCity);
    console.log('propertyZip:', propertyZip);
    console.log('apn:', apn);

    // Format transferee (buyer) - this is the trustees with trust designation
    // In a trust transfer, the grantors become trustees, so we use grantorNames + trustee designation
    const transfereeFullAddress = `${grantorNames}, TRUSTEES OF THE ${trustName} DATED ${trustDate}\n${propertyStreet}\n${propertyCity}, ${propertyState} ${propertyZip}`;
    const propertyFullAddress = `${propertyStreet}, ${propertyCity}, ${propertyState} ${propertyZip}`;

    console.log('\n--- STARTING TO FILL FIELDS ---');

    // 1. TRANSFEREE (Buyer) Information - Person receiving property (as trustees)
    console.log('\n1. Filling TRANSFEREE field...');
    setText('Name and mailing address of buyer/transferee', transfereeFullAddress);

    console.log('\n2. Filling ZIP CODE field...');
    setText('ZIP code', propertyZip);

    // 3. PROPERTY Information
    console.log('\n3. Filling APN field...');
    setText('Assessors parcel number', apn);

    console.log('\n4. Filling PROPERTY ADDRESS field...');
    setText('street address or physical location of real property', propertyFullAddress);

    // 4. TRANSFEROR (Seller) Information
    console.log('\n5. Filling SELLER/TRANSFEROR field...');
    setText('seller transferor', grantorNames);

    // 14-17. MAIL TAX STATEMENTS TO
    setText('mail property tax information to (name)', grantorNames);
    setText('Mail property tax informatino to address', propertyStreet);
    setText('city', propertyCity);
    setText('state', propertyState);

    // 154-155. SIGNATURE SECTION
    setText('Name of buyer/transferee/personal representative/corporate officer (please print)', grantorNames);
    setText('title', 'TRUSTOR/TRUSTEE');

    // CHECKBOXES - Check all the "NO" boxes for questions that don't apply to trust transfers

    // Question A - Transfer between spouses? NO
    checkBox('A. This transfer is solely between spouses (addition or removal of a spouse, death of a spouse, divorce settlement, etc.)_no1');

    // Question B - Transfer between domestic partners? NO
    checkBox('B. This transfer is solely between domestic partners currently registered with the California Secretary of State (addition or removal of a partner, death of a partner, termination settlement, etc.)_no');

    // Question C - Transfer between parents/children or grandparents/grandchildren? NO
    checkBox('C. This is a transfer between: parents and children or grandparents and grandchildren_no');

    // Question D - Result of cotenant's death? NO
    checkBox('D.This transfer is the result of a cotenant\'s death_no');

    // Question E - Replacement of principal residence by person 55+? NO
    checkBox('E. This transaction is to replace a principal residence by a person 55 years of age or older_no');

    // Question F - Replacement of principal residence by severely disabled person? NO
    checkBox('F. This transaction is to replace a principal residence by a person who is severely disabled. No');

    // Question G - Replacement due to wildfire/natural disaster? NO
    checkBox('G. This transaction is to replace a principal residence substantially damaged or destroyed by a wildfire or natural disaster for which the Governor proclaimed a state of emergency. No');

    // Question H - Name correction only? NO
    checkBox('H. This transaction is only a correction of the name(s) of the person(s) holding title to the property (e.g. a name change upon marriage) If yes, please explain: _ no');

    // Question I - Lender's interest document? NO
    checkBox('I. The recorded document creates, terminates, or reconveys a lender\'s interest in the property_no');

    // Question J - Recorded for financing purposes only? NO
    checkBox('J. This transaction is recorded only as a requirement for financing purposes or to create, terminate, or reconvey a security interest (e.g., cosigner)‑no');

    // Question K - Substitutes a trustee? NO
    checkBox('K. The recorded document substitutes a trustee of a trust, mortgage, or other similar documentI. The recorded document substitutes a trustee of a trust, mortgage, or other similar document_no');

    // Question L1 - Revocable trust transfer? YES (THIS IS THE KEY ONE!)
    // Field name ends with "1" for "Yes" checkbox
    checkBox('L1. This is a transfer of property to/from a revocable trust that may be revoked by the transferor and is for the benefit of the transferor and/or the transferor\'s spouse and/or registered domestic partner1');

    // Question L2 - Irrevocable trust? NO
    checkBox('L2. This is a transfer of property to/from an irrevocable trust for the benefit of the creator/grantor/trustor and/or grantor\'s trustor\'s spouse grantor\'s/trustor\'s registered domestic partner_no');

    // Question M - Subject to lease 35+ years? NO
    checkBox('M. This property is subject to a lease with a remaining lease term of 35 years or more including written options_no');

    // Question N - Proportional interests remain same? NO
    checkBox('N. This is a transfer between parties in which proportional interests of the transferor(s) and transferee(s) in each and every parcel being transferred remain exactly the same after the transfer no');

    // Question O - Subsidized low-income housing? NO
    checkBox('O. This is a transfer subject to subsidized low-income housing requirements with governmentally imposed restrictions imposed by specified nonprofit corporations no');

    // Question P - First purchaser with solar energy system? NO
    checkBox('P. This transfer is to the first purchaser of a new building containing a leased or owned active solar energy system. No');

    // Question Q - Other? NO
    checkBox('Q. Other. This transfer to no');

    // Disabled veteran? NO
    console.log('\nFilling disabled veteran checkbox...');
    checkBox('Are you a disabled veteran or an unmarried surviving spouse of a disabled veteran who was compensated at 100% by the Department of Veterans Affairs or an unmarried surviving spouse of a 100% rated disabled veteran? No');

    console.log('\n' + '='.repeat(80));
    console.log('✓ PCOR FILLING COMPLETED SUCCESSFULLY');
    console.log('='.repeat(80));

  } catch (error) {
    console.error('❌ ERROR FILLING PCOR:', error);
    console.error('Stack trace:', error.stack);
    throw error;
  }
}

/**
 * Fill Ventura County PCOR
 */
function fillVenturaPCOR(form, data) {
  // Ventura may have similar or different field names
  // Will need to inspect actual form
  fillLosAngelesPCOR(form, data); // Use same logic for now
}

/**
 * Fill San Bernardino County PCOR
 */
function fillSanBernardinoPCOR(form, data) {
  fillLosAngelesPCOR(form, data); // Use same logic for now
}

/**
 * Fill Riverside County PCOR
 */
function fillRiversidePCOR(form, data) {
  fillLosAngelesPCOR(form, data); // Use same logic for now
}

/**
 * Fill Orange County PCOR
 */
function fillOrangePCOR(form, data) {
  fillLosAngelesPCOR(form, data); // Use same logic for now
}

/**
 * Utility: Inspect PDF form fields
 * Use this to discover field names in the actual PCOR forms
 */
export const inspectPCORFields = async (countyId) => {
  try {
    const templatePath = `/templates/${countyId}-pcor.pdf`;
    const response = await fetch(templatePath);

    if (!response.ok) {
      throw new Error(`PCOR form not found: ${templatePath}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    const form = pdfDoc.getForm();
    const fields = form.getFields();

    const fieldInfo = fields.map(field => ({
      name: field.getName(),
      type: field.constructor.name,
      // For text fields, get current value
      value: field.constructor.name === 'PDFTextField' ? field.getText() : null
    }));

    console.log(`${countyId} PCOR Fields:`, fieldInfo);
    return fieldInfo;

  } catch (error) {
    console.error('Error inspecting PCOR fields:', error);
    throw error;
  }
};

/**
 * Download filled PCOR
 */
export const downloadPCOR = async (formData, countyId, fileName = 'PCOR') => {
  try {
    const blob = await fillPCORForm(formData, countyId);
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${fileName}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    return true;
  } catch (error) {
    console.error('Error downloading PCOR:', error);
    throw error;
  }
};
