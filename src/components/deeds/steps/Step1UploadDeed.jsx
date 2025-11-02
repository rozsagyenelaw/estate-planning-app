/**
 * Step 1: Upload Original Deed
 *
 * Allows client to upload their current recorded deed
 * Automatically extracts text using Google Cloud Vision API
 */

import { useState } from 'react';
import { Card, Button } from '../../common';
import { uploadAndExtractDeed, getConfidenceLevel } from '../../../services/deedOCRService';

const Step1UploadDeed = ({ formData, updateFormData, nextStep, clientId, setError }) => {
  const [uploading, setUploading] = useState(false);
  const [extracting, setExtracting] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadComplete, setUploadComplete] = useState(!!formData.originalDeedUrl);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      setError('Please upload a PDF file');
      return;
    }

    if (file.size > 20 * 1024 * 1024) {
      setError('File size must be less than 20MB');
      return;
    }

    setSelectedFile(file);
    setError('');
  };

  const handleUploadAndExtract = async () => {
    if (!selectedFile) {
      setError('Please select a file first');
      return;
    }

    setUploading(true);
    setExtracting(true);
    setError('');

    try {
      // Upload and extract in one step
      const result = await uploadAndExtractDeed(selectedFile, clientId);

      // Update form data with upload info
      updateFormData({
        originalDeedFile: selectedFile,
        originalDeedUrl: result.uploadInfo.downloadURL,
        originalDeedPath: result.uploadInfo.filePath,

        // Extracted data
        apn: result.extractedData.apn || '',
        propertyAddress: {
          street: result.extractedData.propertyAddress?.street || '',
          city: result.extractedData.propertyAddress?.city || '',
          state: result.extractedData.propertyAddress?.state || 'CA',
          zip: result.extractedData.propertyAddress?.zip || ''
        },
        grantorNames: result.extractedData.grantorNames || [],
        legalDescription: result.extractedData.legalDescription || '',
        recordingInfo: {
          book: result.extractedData.recordingInfo?.book || '',
          page: result.extractedData.recordingInfo?.page || '',
          instrumentNumber: result.extractedData.recordingInfo?.instrumentNumber || '',
          recordingDate: result.extractedData.recordingInfo?.recordingDate || ''
        },
        currentVesting: result.extractedData.currentVesting || '',
        ocrConfidence: result.extractedData.ocrConfidence || 0,
        rawOCRText: result.extractedData.rawOCRText || ''
      });

      setUploadComplete(true);
      setUploading(false);
      setExtracting(false);

      // Auto-advance after 1 second
      setTimeout(() => {
        nextStep();
      }, 1000);

    } catch (err) {
      console.error('Error uploading and extracting deed:', err);
      setError(err.message || 'Failed to upload and extract deed. Please try again.');
      setUploading(false);
      setExtracting(false);
    }
  };

  const confidenceInfo = formData.ocrConfidence
    ? getConfidenceLevel(formData.ocrConfidence)
    : null;

  return (
    <Card>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Step 1: Upload Original Deed
          </h2>
          <p className="text-gray-600">
            Upload the client's current recorded deed. We'll automatically extract all the information using advanced OCR technology.
          </p>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
          <div className="flex items-start">
            <span className="text-blue-600 mr-3 text-xl">ℹ️</span>
            <div>
              <h4 className="text-blue-900 font-semibold mb-2">What you'll need:</h4>
              <ul className="text-blue-800 text-sm space-y-1 list-disc list-inside">
                <li>The client's current recorded deed (PDF format)</li>
                <li>File size must be less than 20MB</li>
                <li>Ensure the deed is clear and readable</li>
                <li>All pages should be included</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Upload Section */}
        {!uploadComplete ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Select Deed PDF
              </label>
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileSelect}
                disabled={uploading}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-3 file:px-6
                  file:rounded-lg file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100
                  cursor-pointer
                  disabled:opacity-50 disabled:cursor-not-allowed"
              />
              {selectedFile && (
                <p className="mt-2 text-sm text-gray-600">
                  Selected: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                </p>
              )}
            </div>

            <Button
              variant="primary"
              onClick={handleUploadAndExtract}
              disabled={!selectedFile || uploading}
              className="w-full py-4"
            >
              {uploading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  {extracting ? 'Extracting Information...' : 'Uploading...'}
                </div>
              ) : (
                '📤 Upload and Extract Information'
              )}
            </Button>

            {uploading && (
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
                <div className="flex items-start">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-yellow-600 mr-3 mt-0.5"></div>
                  <div>
                    <h4 className="text-yellow-900 font-semibold mb-1">Processing</h4>
                    <p className="text-yellow-800 text-sm">
                      {extracting
                        ? 'Extracting deed information using Google Cloud Vision API. This may take 30-60 seconds...'
                        : 'Uploading deed to secure storage...'
                      }
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {/* Success message */}
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
              <div className="flex items-start">
                <span className="text-green-600 mr-3 text-xl">✓</span>
                <div className="flex-1">
                  <h4 className="text-green-900 font-semibold mb-1">Upload Complete</h4>
                  <p className="text-green-800 text-sm mb-3">
                    Deed uploaded and information extracted successfully!
                  </p>

                  {/* Confidence indicator */}
                  {confidenceInfo && (
                    <div className="mt-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-700">
                          OCR Confidence:
                        </span>
                        <span className={`px-2 py-1 rounded text-xs font-semibold
                          ${confidenceInfo.color === 'green' ? 'bg-green-100 text-green-800' : ''}
                          ${confidenceInfo.color === 'yellow' ? 'bg-yellow-100 text-yellow-800' : ''}
                          ${confidenceInfo.color === 'red' ? 'bg-red-100 text-red-800' : ''}
                        `}>
                          {confidenceInfo.level} ({(formData.ocrConfidence * 100).toFixed(0)}%)
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">
                        {confidenceInfo.description}
                      </p>
                    </div>
                  )}

                  {/* Extracted data preview */}
                  <div className="mt-4 p-3 bg-white rounded border border-green-200">
                    <h5 className="text-sm font-semibold text-gray-800 mb-2">Extracted Information:</h5>
                    <ul className="text-sm text-gray-700 space-y-1">
                      {formData.apn && (
                        <li>• APN: {formData.apn}</li>
                      )}
                      {formData.propertyAddress?.street && (
                        <li>• Address: {formData.propertyAddress.street}</li>
                      )}
                      {formData.grantorNames.length > 0 && (
                        <li>• Grantors: {formData.grantorNames.join(', ')}</li>
                      )}
                      {formData.legalDescription && (
                        <li>• Legal Description: {formData.legalDescription.substring(0, 100)}...</li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => {
                  setUploadComplete(false);
                  setSelectedFile(null);
                }}
              >
                ← Upload Different Deed
              </Button>
              <Button variant="primary" onClick={nextStep}>
                Continue to Review →
              </Button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default Step1UploadDeed;
