/**
 * Step 2: Review/Edit Extracted Deed Information
 *
 * Display extracted data side-by-side with original deed
 * Allow manual corrections of any OCR errors
 */

import { useState } from 'react';
import { Card, Button, Input } from '../../common';
import { validateDeedData, getConfidenceLevel } from '../../../services/deedOCRService';

const VESTING_OPTIONS = [
  '',  // Empty option for "not selected"
  'Single woman, as her sole and separate property',
  'Unmarried woman, as her sole and separate property',
  'Single man, as his sole and separate property',
  'Unmarried man, as his sole and separate property',
  'Husband and wife as joint tenants',
  'Husband and wife as community property',
  'Husband and wife as community property with right of survivorship',
  'Joint tenants',
  'Tenants in common',
  'Community property',
  'Community property with right of survivorship',
  'As trustees of a trust'
];

const Step2ReviewExtraction = ({ formData, updateFormData, nextStep, prevStep, setError }) => {
  const [showRawText, setShowRawText] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);

  const handleChange = (field, value) => {
    updateFormData({ [field]: value });
    // Clear validation errors when user makes changes
    setValidationErrors([]);
  };

  const handleNestedChange = (parent, field, value) => {
    updateFormData({
      [parent]: {
        ...(formData[parent] || {}),
        [field]: value
      }
    });
    setValidationErrors([]);
  };

  const handleGrantorChange = (index, value) => {
    const currentGrantors = formData.grantorNames || [];
    const newGrantors = [...currentGrantors];
    newGrantors[index] = value;
    updateFormData({ grantorNames: newGrantors });
    setValidationErrors([]);
  };

  const addGrantor = () => {
    const currentGrantors = formData.grantorNames || [];
    updateFormData({
      grantorNames: [...currentGrantors, '']
    });
  };

  const removeGrantor = (index) => {
    const currentGrantors = formData.grantorNames || [];
    const newGrantors = currentGrantors.filter((_, i) => i !== index);
    updateFormData({ grantorNames: newGrantors });
  };

  const handleContinue = () => {
    // Validate data before continuing
    const validation = validateDeedData(formData);

    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      setError('Please correct the highlighted fields before continuing');
      window.scrollTo(0, 0);
      return;
    }

    setError('');
    nextStep();
  };

  const confidenceInfo = getConfidenceLevel(formData.ocrConfidence);

  return (
    <div className="space-y-6">
      <Card>
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Step 2: Review Extracted Information
            </h2>
            <p className="text-gray-600">
              Review and edit the information extracted from the deed. Make sure everything is accurate, especially the legal description.
            </p>
          </div>

          {/* OCR Confidence Indicator */}
          <div className={`p-4 rounded border-l-4
            ${confidenceInfo.color === 'green' ? 'bg-green-50 border-green-500' : ''}
            ${confidenceInfo.color === 'yellow' ? 'bg-yellow-50 border-yellow-500' : ''}
            ${confidenceInfo.color === 'red' ? 'bg-red-50 border-red-500' : ''}
          `}>
            <div className="flex items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-gray-900">
                    OCR Confidence: {confidenceInfo.level}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-xs font-semibold
                    ${confidenceInfo.color === 'green' ? 'bg-green-100 text-green-800' : ''}
                    ${confidenceInfo.color === 'yellow' ? 'bg-yellow-100 text-yellow-800' : ''}
                    ${confidenceInfo.color === 'red' ? 'bg-red-100 text-red-800' : ''}
                  `}>
                    {(formData.ocrConfidence * 100).toFixed(0)}%
                  </span>
                </div>
                <p className={`text-sm
                  ${confidenceInfo.color === 'green' ? 'text-green-800' : ''}
                  ${confidenceInfo.color === 'yellow' ? 'text-yellow-800' : ''}
                  ${confidenceInfo.color === 'red' ? 'text-red-800' : ''}
                `}>
                  {confidenceInfo.description}
                </p>
              </div>
            </div>
          </div>

          {/* Validation Errors */}
          {validationErrors.length > 0 && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
              <div className="flex items-start">
                <span className="text-red-600 mr-3 text-xl">⚠️</span>
                <div className="flex-1">
                  <h4 className="text-red-800 font-semibold mb-2">Please fix the following errors:</h4>
                  <ul className="text-red-700 text-sm space-y-1 list-disc list-inside">
                    {validationErrors.map((error, index) => (
                      <li key={index}>{error.message}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* APN */}
      <Card>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Assessor's Parcel Number (APN)
          </h3>
          <Input
            label="APN"
            value={formData.apn}
            onChange={(e) => handleChange('apn', e.target.value)}
            required
            error={validationErrors.find(e => e.field === 'apn')}
            placeholder="1234-567-890"
          />
        </div>
      </Card>

      {/* Property Address */}
      <Card>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Property Address
          </h3>

          <Input
            label="Street Address"
            value={formData.propertyAddress?.street || ''}
            onChange={(e) => handleNestedChange('propertyAddress', 'street', e.target.value)}
            required
            error={validationErrors.find(e => e.field === 'propertyAddress.street')}
            placeholder="123 Main Street"
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="City"
              value={formData.propertyAddress?.city || ''}
              onChange={(e) => handleNestedChange('propertyAddress', 'city', e.target.value)}
              required
              error={validationErrors.find(e => e.field === 'propertyAddress.city')}
              placeholder="Los Angeles"
            />

            <Input
              label="State"
              value={formData.propertyAddress?.state || ''}
              onChange={(e) => handleNestedChange('propertyAddress', 'state', e.target.value)}
              required
              error={validationErrors.find(e => e.field === 'propertyAddress.state')}
              placeholder="CA"
            />
          </div>

          <Input
            label="ZIP Code"
            value={formData.propertyAddress?.zip || ''}
            onChange={(e) => handleNestedChange('propertyAddress', 'zip', e.target.value)}
            required
            error={validationErrors.find(e => e.field === 'propertyAddress.zip')}
            placeholder="90001"
          />
        </div>
      </Card>

      {/* Grantor Names */}
      <Card>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              Grantor Names (Current Owners)
            </h3>
            <Button variant="outline" size="sm" onClick={addGrantor}>
              + Add Grantor
            </Button>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded">
            <p className="text-sm text-blue-800">
              These are the current owners who will be transferring the property into the trust.
              They should match the GRANTEES from the original deed.
              {(formData.grantorNames || []).length === 0 && (
                <span className="font-semibold"> Click "+ Add Grantor" to add the owner names.</span>
              )}
            </p>
          </div>

          {(formData.grantorNames || []).length === 0 ? (
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-3 rounded">
              <p className="text-sm text-yellow-800">
                No grantor names were extracted from the deed. Please click "+ Add Grantor" to manually enter the owner names.
              </p>
            </div>
          ) : null}

          {(formData.grantorNames || []).map((grantor, index) => (
            <div key={index} className="flex items-center gap-2">
              <Input
                label={`Grantor ${index + 1}`}
                value={grantor}
                onChange={(e) => handleGrantorChange(index, e.target.value)}
                required
                error={validationErrors.find(e => e.field === 'grantorNames')}
                placeholder="John Doe"
                className="flex-1"
              />
              {(formData.grantorNames || []).length > 1 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeGrantor(index)}
                  className="mt-6 text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  Remove
                </Button>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Legal Description */}
      <Card>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Legal Description
          </h3>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-3 rounded">
            <div className="flex items-start">
              <span className="text-yellow-600 mr-2">⚠️</span>
              <p className="text-sm text-yellow-800">
                <strong>CRITICAL:</strong> The legal description must be EXACT and COMPLETE.
                Any errors or omissions can cause serious legal issues.
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Legal Description *
            </label>
            <textarea
              value={formData.legalDescription}
              onChange={(e) => handleChange('legalDescription', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[200px] font-mono text-sm
                ${validationErrors.find(e => e.field === 'legalDescription')
                  ? 'border-red-500'
                  : 'border-gray-300'
                }`}
              placeholder="LOT 123 OF TRACT NO. 12345..."
            />
            {validationErrors.find(e => e.field === 'legalDescription') && (
              <p className="mt-1 text-sm text-red-600">
                {validationErrors.find(e => e.field === 'legalDescription').message}
              </p>
            )}
            <p className="mt-1 text-xs text-gray-500">
              Characters: {formData.legalDescription.length}
            </p>
          </div>
        </div>
      </Card>

      {/* Recording Information */}
      <Card>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Recording Information
          </h3>

          <p className="text-sm text-gray-600">
            Optional: Information about the original deed's recording
          </p>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Book Number"
              value={formData.recordingInfo?.book || ''}
              onChange={(e) => handleNestedChange('recordingInfo', 'book', e.target.value)}
              placeholder="12345"
            />

            <Input
              label="Page Number"
              value={formData.recordingInfo?.page || ''}
              onChange={(e) => handleNestedChange('recordingInfo', 'page', e.target.value)}
              placeholder="678"
            />
          </div>

          <Input
            label="Instrument Number"
            value={formData.recordingInfo?.instrumentNumber || ''}
            onChange={(e) => handleNestedChange('recordingInfo', 'instrumentNumber', e.target.value)}
            placeholder="2023-000123456"
          />

          <Input
            label="Recording Date"
            value={formData.recordingInfo?.recordingDate || ''}
            onChange={(e) => handleNestedChange('recordingInfo', 'recordingDate', e.target.value)}
            placeholder="01/15/2023"
          />
        </div>
      </Card>

      {/* Current Vesting */}
      <Card>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Current Vesting
          </h3>

          <p className="text-sm text-gray-600">
            How the property is currently held (optional)
          </p>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Current Vesting
            </label>
            <select
              value={formData.currentVesting || ''}
              onChange={(e) => handleChange('currentVesting', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {VESTING_OPTIONS.map((option, index) => (
                <option key={index} value={option}>
                  {option || '-- Select Current Vesting --'}
                </option>
              ))}
            </select>
            <p className="mt-1 text-xs text-gray-500">
              Select how the property is currently held by the grantor(s)
            </p>
          </div>
        </div>
      </Card>

      {/* Raw OCR Text (Optional) */}
      <Card>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              Raw OCR Text
            </h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowRawText(!showRawText)}
            >
              {showRawText ? 'Hide' : 'Show'}
            </Button>
          </div>

          {showRawText && (
            <div>
              <textarea
                value={formData.rawOCRText}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 font-mono text-xs min-h-[300px]"
              />
              <p className="mt-1 text-xs text-gray-500">
                This is the complete raw text extracted by OCR. You can reference this if needed.
              </p>
            </div>
          )}
        </div>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={prevStep}>
          ← Back
        </Button>
        <Button variant="primary" onClick={handleContinue}>
          Continue to Trust Info →
        </Button>
      </div>
    </div>
  );
};

export default Step2ReviewExtraction;
