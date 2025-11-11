/**
 * Trust Transfer Deed Document Generation Service
 *
 * Generates Trust Transfer Deeds using docxtemplater
 */

import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';
import { saveAs } from 'file-saver';

/**
 * Generate Trust Transfer Deed
 * @param {Object} data - All form data from the wizard
 * @returns {Promise<Blob>} - Generated document blob
 */
export const generateTrustTransferDeed = async (data) => {
  try {
    // TEMPORARY: Generate simple text file instead of Word document
    // TODO: Fix Word template issues
    const templateData = prepareTemplateData(data);
    console.log('Generating trust transfer deed with data:', templateData);

    // Create simple text content matching the exact format of Balwadala deed
    const content = `RECORDING REQUESTED BY
${templateData.trustName}

WHEN RECORDED MAIL TO
${templateData.trustorNames}
${templateData.propertyStreet}
${templateData.propertyCity}, ${templateData.propertyState} ${templateData.propertyZip}

APN: ${templateData.apn}                    Escrow No. ______________

TRUST TRANSFER DEED

(Grant Deed Excluded from Reappraisal Under Proposition 13,
i.e., Calif. Const. Art 13A Section 1, et seq.)

DOCUMENTARY TRANSFER TAX IS: $ 0.00

The undersigned Grantor(s) declare(s) under penalty of perjury that the foregoing is true
and correct: THERE IS NO CONSIDERATION FOR THIS TRANSFER.

This is a Trust Transfer under section 62 of the Revenue and Taxation Code and
Grantor(s) has/have checked the applicable exclusions:

[X] This conveyance transfers the Grantors interest into his or her revocable trust, R&T 11930.

GRANTOR(S) ${templateData.grantorNamesWithVesting}, hereby GRANT(s) to ${templateData.trusteeDesignation} the real property in the CITY OF ${templateData.propertyCity}, County of ${templateData.county} State of ${templateData.propertyState}, described as:

${templateData.legalDescription}

Commonly known as: ${templateData.propertyStreet}, ${templateData.propertyCity}, ${templateData.propertyState} ${templateData.propertyZip}

Dated: ${templateData.currentDate}

_________________________________     _________________________________
${templateData.signatoryName1}                                        ${templateData.signatoryName2}


MAIL TAX STATEMENTS TO:
${templateData.trustorNames}
${templateData.propertyStreet}
${templateData.propertyCity}, ${templateData.propertyState} ${templateData.propertyZip}





A notary public or other officer completing this certificate verifies only the identity of the individual who signed the document to which this certificate is attached, and not the truthfulness, accuracy, or validity of that document.

STATE OF CALIFORNIA      )
                                                   ) SS.
COUNTY OF ${templateData.county} )

On ________________, before me, ___________________________________, a Notary Public,
personally appeared ____________________________________________, who proved to me on
the basis of satisfactory evidence to be the person whose name is subscribed to the within
instrument acknowledged to me that he/she/they executed the same in his/her/their
authorized capacity, and that by his/her/their signature on the instrument the person, or
the entity upon behalf of which the person acted, executed the instrument.

I certify under PENALTY OF PERJURY under the laws of the State of California that the
foregoing paragraph is true and correct.

WITNESS my hand and official seal.

Notary Public __________________________________ (SEAL)

Print Name of Notary _______________________________

My Commission Expires: ______________.
`;

    // Create a blob from the text content
    const blob = new Blob([content], { type: 'text/plain' });

    return blob;
  } catch (error) {
    console.error('Error generating trust transfer deed:', error);

    // If it's a template error, provide more detailed information
    if (error.name === 'TemplateError' || error.name === 'XTTemplateError') {
      console.error('Full error object:', JSON.stringify(error, null, 2));

      if (error.properties && error.properties.errors) {
        console.error('Template errors:', error.properties.errors);
        const errorDetails = error.properties.errors
          .map(e => `${e.message} at ${e.name} (line:${e.properties?.offset || 'unknown'})`)
          .join('; ');
        throw new Error(`Template error: ${errorDetails}`);
      }
    }

    throw new Error('Failed to generate trust transfer deed: ' + error.message);
  }
};

/**
 * Prepare template data from form data
 */
function prepareTemplateData(data) {
  const {
    trustName,
    trustorName,
    trusteeName,
    trustDate,
    apn,
    propertyAddress,
    grantorNames,
    legalDescription,
    currentVesting,
    recordingInfo,
    newVesting,
  } = data;

  // Format grantor names with current vesting
  const grantorNamesWithVesting = formatGrantorNamesWithVesting(grantorNames, currentVesting);

  // Format trustee designation
  const trusteeDesignation = formatTrusteeDesignation(trusteeName, trustName, trustDate);

  // Get county from property address
  const county = extractCounty(propertyAddress?.city || '');

  // Format current date
  const currentDate = formatDate(new Date());

  // Prepare signatory names (for signature blocks)
  const signatoryName1 = (grantorNames && grantorNames[0]) || '';
  const signatoryName2 = (grantorNames && grantorNames[1]) || '';

  // Format trustor names for mailing address
  const trustorNames = formatTrustorNames(grantorNames);

  return {
    // Trust information
    trustName: trustName || '',
    trustorNames: trustorNames,
    trusteeName: trusteeName || '',
    trustDate: trustDate || '',

    // Property information
    apn: apn || '',
    propertyStreet: propertyAddress?.street || '',
    propertyCity: propertyAddress?.city || '',
    propertyState: propertyAddress?.state || 'CA',
    propertyZip: propertyAddress?.zip || '',

    // Grantor information
    grantorNamesWithVesting: grantorNamesWithVesting,

    // Trustee designation for grantee
    trusteeDesignation: trusteeDesignation,

    // Legal description
    legalDescription: legalDescription || '',

    // Recording info (optional)
    recordingBook: recordingInfo?.book || '',
    recordingPage: recordingInfo?.page || '',
    instrumentNumber: recordingInfo?.instrumentNumber || '',
    recordingDate: recordingInfo?.recordingDate || '',

    // Dates
    currentDate: currentDate,

    // County
    county: county,

    // Signature blocks
    signatoryName1: signatoryName1,
    signatoryName2: signatoryName2,

    // New vesting
    newVesting: newVesting || ''
  };
}

/**
 * Format grantor names with current vesting
 * e.g., "John Doe AND Jane Doe, HUSBAND AND WIFE AS JOINT TENANTS"
 */
function formatGrantorNamesWithVesting(grantorNames, currentVesting) {
  if (!grantorNames || grantorNames.length === 0) {
    return '';
  }

  const names = grantorNames.join(' AND ');
  const vestingUpper = currentVesting ? `, ${currentVesting.toUpperCase()}` : '';

  return `${names}${vestingUpper}`;
}

/**
 * Format trustee designation
 * e.g., "John Doe AND Jane Doe, TRUSTEES OF THE John Doe and Jane Doe Living Trust DATED January 1, 2024"
 */
function formatTrusteeDesignation(trusteeName, trustName, trustDate) {
  const trusteeUpper = trusteeName ? trusteeName.toUpperCase() : '';
  const trustNameUpper = trustName ? trustName.toUpperCase() : '';
  const formattedDate = trustDate ? formatDate(new Date(trustDate)).toUpperCase() : '';

  return `${trusteeUpper}, TRUSTEES OF THE ${trustNameUpper} DATED ${formattedDate}, AND ANY AMENDMENTS THERETO`;
}

/**
 * Format trustor names for mailing address
 * e.g., "John Doe and Jane Doe"
 */
function formatTrustorNames(grantorNames) {
  if (!grantorNames || grantorNames.length === 0) {
    return '';
  }

  if (grantorNames.length === 1) {
    return grantorNames[0];
  }

  if (grantorNames.length === 2) {
    return `${grantorNames[0]} and ${grantorNames[1]}`;
  }

  // More than 2 grantors
  const allButLast = grantorNames.slice(0, -1).join(', ');
  const last = grantorNames[grantorNames.length - 1];
  return `${allButLast}, and ${last}`;
}

/**
 * Extract county from city name (this is a simple mapping, can be enhanced)
 */
function extractCounty(city) {
  const cityToCounty = {
    'Los Angeles': 'Los Angeles',
    'Beverly Hills': 'Los Angeles',
    'Santa Monica': 'Los Angeles',
    'Pasadena': 'Los Angeles',
    'Burbank': 'Los Angeles',
    'Glendale': 'Los Angeles',
    'Long Beach': 'Los Angeles',

    'Ventura': 'Ventura',
    'Oxnard': 'Ventura',
    'Thousand Oaks': 'Ventura',
    'Simi Valley': 'Ventura',

    'San Bernardino': 'San Bernardino',
    'Fontana': 'San Bernardino',
    'Rancho Cucamonga': 'San Bernardino',
    'Ontario': 'San Bernardino',

    'Riverside': 'Riverside',
    'Corona': 'Riverside',
    'Moreno Valley': 'Riverside',
    'Temecula': 'Riverside',

    'Santa Ana': 'Orange',
    'Anaheim': 'Orange',
    'Irvine': 'Orange',
    'Huntington Beach': 'Orange',
    'Orange': 'Orange'
  };

  return cityToCounty[city] || 'Los Angeles'; // Default to Los Angeles
}

/**
 * Format date to readable string
 */
function formatDate(date) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

/**
 * Download Trust Transfer Deed
 */
export const downloadTrustTransferDeed = async (data, fileName = 'Trust_Transfer_Deed') => {
  try {
    const blob = await generateTrustTransferDeed(data);
    // TEMPORARY: Downloading as .txt instead of .docx
    saveAs(blob, `${fileName}.txt`);
    return true;
  } catch (error) {
    console.error('Error downloading trust transfer deed:', error);
    throw error;
  }
};

/**
 * Preview Trust Transfer Deed (open in new window)
 */
export const previewTrustTransferDeed = async (data) => {
  try {
    const blob = await generateTrustTransferDeed(data);
    const url = URL.createObjectURL(blob);

    // Open in new window
    window.open(url, '_blank');

    // Clean up after a delay
    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 10000);

    return true;
  } catch (error) {
    console.error('Error previewing trust transfer deed:', error);
    throw error;
  }
};
