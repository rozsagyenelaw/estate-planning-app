/**
 * Firebase Cloud Functions for Estate Planning App
 *
 * OCR Extraction using Google Cloud Vision API
 */

import { onRequest } from 'firebase-functions/v2/https';
import { initializeApp } from 'firebase-admin/app';
import { getStorage } from 'firebase-admin/storage';
import vision from '@google-cloud/vision';

// Initialize Firebase Admin
initializeApp();

/**
 * Extract text from deed PDF using Google Cloud Vision API
 *
 * Expected request body:
 * {
 *   fileUrl: string - Firebase Storage URL of the deed PDF
 * }
 *
 * Returns:
 * {
 *   success: boolean,
 *   extractedData: {
 *     apn: string,
 *     propertyAddress: {...},
 *     grantorNames: string[],
 *     legalDescription: string,
 *     recordingInfo: {...},
 *     currentVesting: string,
 *     rawText: string,
 *     confidence: number
 *   }
 * }
 */
export const extractDeedInfo = onRequest(
  {
    cors: true,
    maxInstances: 10,
    timeoutSeconds: 300,
    memory: '1GiB'
  },
  async (req, res) => {
    // Only allow POST requests
    if (req.method !== 'POST') {
      return res.status(405).json({
        success: false,
        error: 'Method not allowed'
      });
    }

    try {
      const { fileUrl } = req.body;

      if (!fileUrl) {
        return res.status(400).json({
          success: false,
          error: 'Missing fileUrl in request body'
        });
      }

      console.log('Extracting deed info from:', fileUrl);

      // Create Vision API client
      const visionClient = new vision.ImageAnnotatorClient();

      // Download file from Firebase Storage
      const bucket = getStorage().bucket();

      // Extract the file path from the URL
      const filePathMatch = fileUrl.match(/\/o\/(.+?)\?/);
      if (!filePathMatch) {
        throw new Error('Invalid Firebase Storage URL');
      }

      const filePath = decodeURIComponent(filePathMatch[1]);
      const file = bucket.file(filePath);

      // Check if file exists
      const [exists] = await file.exists();
      if (!exists) {
        throw new Error('File not found in storage');
      }

      console.log('Processing file:', filePath);

      // Use Vision API Async PDF Detection
      // Vision API supports PDF files directly via async batch annotation
      const gcsSourceUri = `gs://${bucket.name}/${filePath}`;
      const gcsDestinationUri = `gs://${bucket.name}/ocr-output/${filePath}-output`;

      console.log('Source URI:', gcsSourceUri);

      // For synchronous processing, we'll use asyncBatchAnnotateFiles
      // which returns results immediately for small PDFs
      const [operation] = await visionClient.asyncBatchAnnotateFiles({
        requests: [
          {
            inputConfig: {
              gcsSource: {
                uri: gcsSourceUri,
              },
              mimeType: 'application/pdf',
            },
            features: [{ type: 'DOCUMENT_TEXT_DETECTION' }],
            outputConfig: {
              gcsDestination: {
                uri: gcsDestinationUri,
              },
              batchSize: 1,
            },
          },
        ],
      });

      console.log('Waiting for OCR operation to complete...');
      const [filesResponse] = await operation.promise();

      console.log('OCR complete, processing results...');

      // Get the output files
      const destinationPrefix = gcsDestinationUri.replace(`gs://${bucket.name}/`, '');
      const [files] = await bucket.getFiles({ prefix: destinationPrefix });

      if (!files || files.length === 0) {
        throw new Error('No OCR output files found');
      }

      console.log(`Found ${files.length} output file(s)`);

      // Extract text from all pages (Vision API creates one JSON file per page)
      let rawText = '';
      let totalConfidence = 0;
      let pageCount = 0;

      // Sort files to ensure correct page order
      const sortedFiles = files.sort((a, b) => a.name.localeCompare(b.name));

      for (const outputFile of sortedFiles) {
        try {
          const [outputData] = await outputFile.download();
          const outputJson = JSON.parse(outputData.toString());

          console.log(`Processing ${outputFile.name}`);

          // Each file contains responses for one or more pages
          if (outputJson.responses) {
            for (const response of outputJson.responses) {
              if (response.fullTextAnnotation) {
                rawText += response.fullTextAnnotation.text + '\n\n';
                if (response.fullTextAnnotation.pages) {
                  for (const page of response.fullTextAnnotation.pages) {
                    if (page.confidence) {
                      totalConfidence += page.confidence;
                      pageCount++;
                    }
                  }
                }
              }
            }
          }
        } catch (err) {
          console.error(`Error processing ${outputFile.name}:`, err.message);
        }
      }

      if (!rawText) {
        return res.status(400).json({
          success: false,
          error: 'No text detected in document'
        });
      }

      console.log('Extracted text length:', rawText.length, 'characters');

      // Clean up output files
      for (const file of files) {
        await file.delete().catch(err => console.error('Error deleting output file:', err));
      }

      // Extract structured data from the raw text
      const extractedData = parseDeepInfo(rawText);

      // Calculate average confidence
      const confidence = pageCount > 0 ? totalConfidence / pageCount : 0.9;

      return res.status(200).json({
        success: true,
        extractedData: {
          ...extractedData,
          rawOCRText: rawText,
          ocrConfidence: confidence
        }
      });

    } catch (error) {
      console.error('Error extracting deed info:', error);
      return res.status(500).json({
        success: false,
        error: error.message || 'Internal server error'
      });
    }
  }
);

/**
 * Parse deed information from raw OCR text
 */
function parseDeepInfo(text) {
  const data = {
    apn: extractAPN(text),
    propertyAddress: extractPropertyAddress(text),
    grantorNames: extractGrantorNames(text),
    legalDescription: extractLegalDescription(text),
    recordingInfo: extractRecordingInfo(text),
    currentVesting: extractCurrentVesting(text)
  };

  return data;
}

/**
 * Extract APN (Assessor's Parcel Number)
 * Common formats: 1234-567-890, 1234-56-789, 1234567890, A.P. # 1234-567-890
 */
function extractAPN(text) {
  // Look for common APN labels with flexible formatting
  const apnPatterns = [
    // "A.P. # 1234-567-890" or "A.P.# 1234-567-890"
    /A\.P\.?\s*#?\s*:?\s*([0-9]{3,4}[-\s]?[0-9]{2,3}[-\s]?[0-9]{3,4})/i,
    // "APN: 1234-567-890" or "APN 1234-567-890"
    /(?:APN|A\.P\.N\.?)[\s:#]*([0-9]{3,4}[-\s]?[0-9]{2,3}[-\s]?[0-9]{3,4})/i,
    // "Assessor's Parcel Number: 1234-567-890"
    /Assessor'?s?\s+Parcel\s+Number[\s:#]*([0-9]{3,4}[-\s]?[0-9]{2,3}[-\s]?[0-9]{3,4})/i,
    // "Parcel Number 1234-567-890"
    /Parcel\s+Number[\s:#]*([0-9]{3,4}[-\s]?[0-9]{2,3}[-\s]?[0-9]{3,4})/i,
    // Long format without dashes: "APN: 1234567890"
    /(?:APN|A\.P\.N\.?)[\s:#]*([0-9]{10,14})/i,
    // "Parcel ID"
    /Parcel\s+ID[\s:#]*([0-9-]+)/i,
    // "AP#" or "AP #"
    /AP\s*#?\s*:?\s*([0-9-]+)/i,
    // Standalone pattern near "Assessor" keyword
    /Assessor[^\d]*([0-9]{3,4}[-\s][0-9]{2,3}[-\s][0-9]{3,4})/i
  ];

  for (const pattern of apnPatterns) {
    const match = text.match(pattern);
    if (match && match[1]) {
      // Clean up the APN (remove extra spaces)
      return match[1].trim().replace(/\s+/g, '-');
    }
  }

  return '';
}

/**
 * Extract property address
 */
function extractPropertyAddress(text) {
  // Try "Also Known as:" pattern first (most specific)
  const alsoKnownPattern = /Also Known as:\s*(\d+(?:\s+\w+)*?\s+(?:Street|St|Avenue|Ave|Road|Rd|Drive|Dr|Lane|Ln|Boulevard|Blvd|Way|Court|Ct|Circle|Cir|Place|Pl))[,\s]+([A-Za-z\s]+?)[,\s]+([A-Z]{2})\s+(\d{5}(?:-\d{4})?)/i;
  const alsoKnownMatch = text.match(alsoKnownPattern);

  if (alsoKnownMatch) {
    return {
      street: alsoKnownMatch[1]?.trim() || '',
      city: alsoKnownMatch[2]?.trim() || '',
      state: alsoKnownMatch[3]?.trim() || '',
      zip: alsoKnownMatch[4]?.trim() || ''
    };
  }

  // Try to find full address with comprehensive street pattern
  // This handles: "3034 WEST GLEN HOLLY DRIVE, ANAHEIM, CA 92804"
  const fullAddressPattern = /(\d+(?:\s+\w+)*?\s+(?:Street|St|Avenue|Ave|Road|Rd|Drive|Dr|Lane|Ln|Boulevard|Blvd|Way|Court|Ct|Circle|Cir|Place|Pl))[,\s]+([A-Z][a-zA-Z\s]+?)[,\s]+([A-Z]{2})\s+(\d{5}(?:-\d{4})?)/i;
  const fullMatch = text.match(fullAddressPattern);

  if (fullMatch) {
    // Clean up the city name (remove extra spaces and normalize)
    const city = fullMatch[2]
      ?.trim()
      .replace(/\s+/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');

    return {
      street: fullMatch[1]?.trim() || '',
      city: city || '',
      state: fullMatch[3]?.trim() || '',
      zip: fullMatch[4]?.trim() || ''
    };
  }

  // Fallback: try to extract any address-like pattern
  const simplePattern = /(\d+\s+[^\d,]+?)(?:,\s*|\s+)([A-Z]{2,})\s*,?\s*([A-Z]{2})\s+(\d{5})/i;
  const simpleMatch = text.match(simplePattern);

  if (simpleMatch) {
    return {
      street: simpleMatch[1]?.trim() || '',
      city: simpleMatch[2]?.trim() || '',
      state: simpleMatch[3]?.trim() || '',
      zip: simpleMatch[4]?.trim() || ''
    };
  }

  return {
    street: '',
    city: '',
    state: '',
    zip: ''
  };
}

/**
 * Extract grantor names (current owners transferring to trust)
 * IMPORTANT: The grantor for the NEW deed is the GRANTEE from the PREVIOUS deed
 */
function extractGrantorNames(text) {
  const grantorNames = [];

  // Pattern 1: Look for grantee after "hereby GRANT(s) to:"
  // This is the person who RECEIVED the property and is now the current owner
  const granteePattern1 = /hereby GRANT\(s\)\s+to:?\s*([^\n]+?)(?=\s+the real property|$)/is;
  const match1 = text.match(granteePattern1);

  if (match1 && match1[1]) {
    let nameText = match1[1].trim();

    // Remove trustee designation if present - we just want the name(s)
    // e.g., "John Doe, Trustee of..." becomes "John Doe"
    nameText = nameText.replace(/,?\s*(?:Trustee|TRUSTEE).*$/i, '');

    // Split by "AND" (uppercase) or "and" to handle multiple grantees
    const names = nameText
      .split(/\s+(?:AND|and)\s+/)
      .map(name => name.trim())
      .filter(name => name.length > 3 && name.length < 200);

    if (names.length > 0) {
      grantorNames.push(...names);
      return grantorNames;
    }
  }

  // Pattern 2: Look for "GRANTEE:" or "TO:" label (less common)
  const granteePattern2 = /(?:GRANTEE|TO):?\s+([^\n]+)/i;
  const match2 = text.match(granteePattern2);

  if (match2 && match2[1]) {
    let nameText = match2[1].trim();
    nameText = nameText.replace(/,?\s*(?:Trustee|TRUSTEE).*$/i, '');

    const names = nameText
      .split(/\s+(?:AND|and)\s+/)
      .map(name => name.trim())
      .filter(name => name.length > 3 && name.length < 200);

    if (names.length > 0) {
      grantorNames.push(...names);
    }
  }

  return grantorNames.length > 0 ? grantorNames : [];
}

/**
 * Extract legal description
 * This is critical - must be exact
 */
function extractLegalDescription(text) {
  // Pattern 1: Look for description after "described as:"
  const describedAsPattern = /described as:\s*([^]+?)(?=Also Known as|APN|A\.P\.|Assessor|DATED|Dated|Page \d+|$)/is;
  const match1 = text.match(describedAsPattern);

  if (match1 && match1[1]) {
    let description = match1[1].trim();
    description = description
      .replace(/\s+/g, ' ')
      .replace(/\n+/g, ' ')
      .trim();

    if (description.length > 20 && description.length < 5000) {
      return description;
    }
  }

  // Pattern 2: Look for Lot/Tract pattern directly
  const lotTractPattern = /(Lot \d+[^]+?(?:County Recorder|Office of the County))/is;
  const match2 = text.match(lotTractPattern);

  if (match2 && match2[1]) {
    let description = match2[1].trim();
    description = description
      .replace(/\s+/g, ' ')
      .replace(/\n+/g, ' ')
      .trim();

    if (description.length > 20 && description.length < 5000) {
      return description;
    }
  }

  // Pattern 3: Look for legal description section
  const legalPatterns = [
    /(?:LEGAL DESCRIPTION|Legal Description)[:\s]+(.+?)(?=(?:APN|Assessor|Recording|NOTICE|SUBJECT TO|Escrow|Page \d+|$))/is,
    /(?:The land referred to|described as follows)[:\s]+(.+?)(?=(?:APN|Assessor|Recording|NOTICE|SUBJECT TO|$))/is
  ];

  for (const pattern of legalPatterns) {
    const match = text.match(pattern);
    if (match && match[1]) {
      let description = match[1].trim();
      description = description
        .replace(/\s+/g, ' ')
        .replace(/\n+/g, ' ')
        .trim();

      if (description.length > 20 && description.length < 5000) {
        return description;
      }
    }
  }

  return '';
}

/**
 * Extract recording information
 */
function extractRecordingInfo(text) {
  const info = {
    book: '',
    page: '',
    instrumentNumber: '',
    recordingDate: ''
  };

  // Book number
  const bookMatch = text.match(/(?:Book|Bk\.?)\s*(\d+)/i);
  if (bookMatch) info.book = bookMatch[1];

  // Page number
  const pageMatch = text.match(/(?:Page|Pg\.?)\s*(\d+)/i);
  if (pageMatch) info.page = pageMatch[1];

  // Instrument number
  const instrumentMatch = text.match(/(?:Instrument|Instr\.?|Document|Doc\.?)\s*(?:No\.?|Number|#)?\s*(\d+[-]?\d*)/i);
  if (instrumentMatch) info.instrumentNumber = instrumentMatch[1];

  // Recording date
  const dateMatch = text.match(/(?:Recorded|Recording Date|Date Recorded)[:\s]+(\d{1,2}[-\/]\d{1,2}[-\/]\d{2,4}|\w+\s+\d{1,2},\s*\d{4})/i);
  if (dateMatch) info.recordingDate = dateMatch[1];

  return info;
}

/**
 * Extract current vesting (how they currently hold title)
 */
function extractCurrentVesting(text) {
  const vestingPatterns = [
    /as\s+(husband and wife as joint tenants|husband and wife as community property|joint tenants|community property|his\/her sole and separate property|unmarried (?:man|woman))/i,
    /(single (?:man|woman), as (?:his|her) sole and separate property)/i
  ];

  for (const pattern of vestingPatterns) {
    const match = text.match(pattern);
    if (match && match[1]) {
      return match[1].trim();
    }
  }

  return '';
}

/**
 * Calculate average confidence from Vision API response
 */
function calculateConfidence(fullTextAnnotation) {
  if (!fullTextAnnotation.pages || fullTextAnnotation.pages.length === 0) {
    return 0;
  }

  let totalConfidence = 0;
  let wordCount = 0;

  fullTextAnnotation.pages.forEach(page => {
    page.blocks?.forEach(block => {
      block.paragraphs?.forEach(paragraph => {
        paragraph.words?.forEach(word => {
          if (word.confidence) {
            totalConfidence += word.confidence;
            wordCount++;
          }
        });
      });
    });
  });

  return wordCount > 0 ? (totalConfidence / wordCount) : 0;
}
