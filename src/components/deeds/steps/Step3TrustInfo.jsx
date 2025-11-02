/**
 * Step 3: Collect Trust Information
 *
 * Collect trust details and new vesting information
 */

import { useEffect } from 'react';
import { Card, Button, Input } from '../../common';

const VESTING_OPTIONS = [
  'Single woman, as her sole and separate property',
  'Unmarried woman, as her sole and separate property',
  'Single man, as his sole and separate property',
  'Unmarried man, as his sole and separate property',
  'Husband and wife as joint tenants',
  'Husband and wife as community property',
  'Husband and wife as community property with right of survivorship',
  // This one is dynamic and will be constructed below
  'TRUST_DESIGNATION'
];

const Step3TrustInfo = ({ formData, updateFormData, nextStep, prevStep, clientData, setError }) => {
  // Auto-generate trust designation option
  const trustDesignationOption = formData.trustorName && formData.trustName && formData.trustDate
    ? `${formData.trustorName}, Trustee of the ${formData.trustName}, dated ${formData.trustDate}`
    : 'Trustee of trust (fill in trust information below)';

  const vestingOptions = VESTING_OPTIONS.map(option =>
    option === 'TRUST_DESIGNATION' ? trustDesignationOption : option
  );

  // Auto-select trust designation if not already selected
  useEffect(() => {
    if (!formData.newVesting && trustDesignationOption) {
      updateFormData({ newVesting: trustDesignationOption });
    }
  }, [trustDesignationOption]);

  const handleChange = (field, value) => {
    updateFormData({ [field]: value });
  };

  const handleContinue = () => {
    // Validation
    if (!formData.trustorName?.trim()) {
      setError('Trustor name is required');
      return;
    }

    if (!formData.trusteeName?.trim()) {
      setError('Trustee name is required');
      return;
    }

    if (!formData.trustName?.trim()) {
      setError('Trust name is required');
      return;
    }

    if (!formData.trustDate?.trim()) {
      setError('Trust date is required');
      return;
    }

    if (!formData.newVesting) {
      setError('Please select how the property will be held');
      return;
    }

    setError('');
    nextStep();
  };

  return (
    <div className="space-y-6">
      <Card>
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Step 3: Trust Information
            </h2>
            <p className="text-gray-600">
              Provide the trust details for the transfer. Most of this should be pre-filled from the client's information.
            </p>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
            <div className="flex items-start">
              <span className="text-blue-600 mr-3 text-xl">ℹ️</span>
              <div>
                <h4 className="text-blue-900 font-semibold mb-1">Trust Transfer</h4>
                <p className="text-blue-800 text-sm">
                  This deed will transfer the property from the current owners (grantors) into the trust.
                  The property will be held by the trustee(s) for the benefit of the trust beneficiaries.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Trustor Information */}
      <Card>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Trustor Information
          </h3>

          <Input
            label="Trustor Name(s)"
            value={formData.trustorName}
            onChange={(e) => handleChange('trustorName', e.target.value)}
            required
            placeholder="John Doe and Jane Doe"
            helperText="The person(s) who created the trust. For joint trusts, use 'and' between names."
          />
        </div>
      </Card>

      {/* Trustee Information */}
      <Card>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Trustee Information
          </h3>

          <Input
            label="Trustee Name(s)"
            value={formData.trusteeName}
            onChange={(e) => handleChange('trusteeName', e.target.value)}
            required
            placeholder="John Doe and Jane Doe"
            helperText="The person(s) managing the trust. Often the same as the trustor(s)."
          />
        </div>
      </Card>

      {/* Trust Details */}
      <Card>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Trust Details
          </h3>

          <Input
            label="Trust Name"
            value={formData.trustName}
            onChange={(e) => handleChange('trustName', e.target.value)}
            required
            placeholder="The John Doe and Jane Doe Living Trust"
            helperText="The full legal name of the trust"
          />

          <Input
            label="Trust Date"
            type="date"
            value={formData.trustDate}
            onChange={(e) => handleChange('trustDate', e.target.value)}
            required
            helperText="The date the trust was created or last amended"
          />
        </div>
      </Card>

      {/* New Vesting */}
      <Card>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">
            How Property Will Be Held
          </h3>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
            <div className="flex items-start">
              <span className="text-yellow-600 mr-3 text-xl">⚠️</span>
              <div>
                <h4 className="text-yellow-900 font-semibold mb-1">Important</h4>
                <p className="text-yellow-800 text-sm">
                  This determines how the property will be titled after the transfer.
                  For trust transfers, typically select the trustee designation option.
                </p>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              New Vesting *
            </label>
            <div className="space-y-2">
              {vestingOptions.map((option) => (
                <label
                  key={option}
                  className={`flex items-start p-3 border-2 rounded-lg cursor-pointer transition-all
                    ${formData.newVesting === option
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                    }`}
                >
                  <input
                    type="radio"
                    name="newVesting"
                    value={option}
                    checked={formData.newVesting === option}
                    onChange={(e) => handleChange('newVesting', e.target.value)}
                    className="mt-1 mr-3 text-blue-600 focus:ring-blue-500"
                  />
                  <span className={`text-sm
                    ${formData.newVesting === option
                      ? 'text-blue-900 font-medium'
                      : 'text-gray-700'
                    }`}>
                    {option}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Summary Preview */}
      {formData.trustorName && formData.trustName && formData.newVesting && (
        <Card>
          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
            <div className="flex items-start">
              <span className="text-green-600 mr-3 text-xl">✓</span>
              <div className="flex-1">
                <h4 className="text-green-900 font-semibold mb-2">Transfer Summary</h4>
                <div className="text-sm text-green-800 space-y-1">
                  <p>
                    <strong>From:</strong> {(formData.grantorNames || []).join(' and ') || 'Current Owners'}
                    {formData.currentVesting && ` (${formData.currentVesting})`}
                  </p>
                  <p>
                    <strong>To:</strong> {formData.trusteeName}, Trustee of the {formData.trustName}
                  </p>
                  <p>
                    <strong>Property:</strong> {formData.propertyAddress?.street || ''}, {formData.propertyAddress?.city || ''}
                  </p>
                  <p>
                    <strong>New Vesting:</strong> {formData.newVesting}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={prevStep}>
          ← Back
        </Button>
        <Button variant="primary" onClick={handleContinue}>
          Continue to Review Deed →
        </Button>
      </div>
    </div>
  );
};

export default Step3TrustInfo;
