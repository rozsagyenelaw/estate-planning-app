import { useFormContext } from '../../../context/FormContext';
import { Card, Input, Button, Autocomplete } from '../../common';
import { getNameSuggestions, addNameSuggestion } from '../../../services/autocompleteService';

const SNTBeneficiarySection = () => {
  const { formData, updateFormData } = useFormContext();
  const sntData = formData.sntData || {};
  const beneficiary = sntData.beneficiary || {};
  const governmentBenefits = sntData.governmentBenefits || {};
  const remainderBeneficiaries = sntData.remainderBeneficiaries || [];

  const nameSuggestions = getNameSuggestions();

  // Update SNT beneficiary info
  const updateBeneficiary = (field, value) => {
    updateFormData({
      sntData: {
        ...sntData,
        beneficiary: {
          ...beneficiary,
          [field]: value
        }
      }
    });

    if ((field === 'firstName' || field === 'lastName') && value) {
      addNameSuggestion(value);
    }
  };

  // Update if this is a joint trust (2 grantors)
  const isSNT = formData.trustType === 'first_party_snt' || formData.trustType === 'third_party_snt';
  const showJointGrantor = isSNT && (formData.isJoint || formData.trustType?.includes('joint'));

  // Update government benefits
  const updateBenefits = (field, value) => {
    updateFormData({
      sntData: {
        ...sntData,
        governmentBenefits: {
          ...governmentBenefits,
          [field]: value
        }
      }
    });
  };

  // Add remainder beneficiary
  const addRemainderBeneficiary = () => {
    updateFormData({
      sntData: {
        ...sntData,
        remainderBeneficiaries: [
          ...remainderBeneficiaries,
          { firstName: '', lastName: '', relationship: '', percentage: '' }
        ]
      }
    });
  };

  // Update remainder beneficiary
  const updateRemainderBeneficiary = (index, field, value) => {
    const updated = [...remainderBeneficiaries];
    updated[index] = { ...updated[index], [field]: value };
    updateFormData({
      sntData: {
        ...sntData,
        remainderBeneficiaries: updated
      }
    });

    if ((field === 'firstName' || field === 'lastName') && value) {
      addNameSuggestion(value);
    }
  };

  // Remove remainder beneficiary
  const removeRemainderBeneficiary = (index) => {
    updateFormData({
      sntData: {
        ...sntData,
        remainderBeneficiaries: remainderBeneficiaries.filter((_, i) => i !== index)
      }
    });
  };

  return (
    <>
      {/* Primary Beneficiary Information */}
      <Card>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Primary Beneficiary Information</h3>
            <p className="text-sm text-gray-600 mt-1">
              Information about the person with special needs who will benefit from this trust
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Autocomplete
              label="First Name"
              value={beneficiary.firstName || ''}
              onChange={(e) => updateBeneficiary('firstName', e.target.value)}
              onSelect={(value) => updateBeneficiary('firstName', value)}
              suggestions={nameSuggestions}
              required
            />
            <Input
              label="Middle Name"
              value={beneficiary.middleName || ''}
              onChange={(e) => updateBeneficiary('middleName', e.target.value)}
            />
            <Autocomplete
              label="Last Name"
              value={beneficiary.lastName || ''}
              onChange={(e) => updateBeneficiary('lastName', e.target.value)}
              onSelect={(value) => updateBeneficiary('lastName', value)}
              suggestions={nameSuggestions}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Date of Birth"
              type="date"
              value={beneficiary.dateOfBirth || ''}
              onChange={(e) => updateBeneficiary('dateOfBirth', e.target.value)}
              required
            />
            <Input
              label="Social Security Number"
              type="text"
              value={beneficiary.ssn || ''}
              onChange={(e) => updateBeneficiary('ssn', e.target.value)}
              placeholder="XXX-XX-XXXX"
              required
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gender <span className="text-red-500">*</span>
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={beneficiary.sex || ''}
                onChange={(e) => updateBeneficiary('sex', e.target.value)}
                required
              >
                <option value="">Select...</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Disability Description <span className="text-red-500">*</span>
            </label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows="4"
              value={beneficiary.disabilityDescription || ''}
              onChange={(e) => updateBeneficiary('disabilityDescription', e.target.value)}
              placeholder="Describe the beneficiary's disability and special needs..."
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Provide a detailed description of the beneficiary's disability and care requirements
            </p>
          </div>
        </div>
      </Card>

      {/* Government Benefits */}
      <Card>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Government Benefits</h3>
            <p className="text-sm text-gray-600 mt-1">
              Select all government benefits the beneficiary is currently receiving
            </p>
          </div>

          <div className="space-y-3">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                checked={governmentBenefits.ssi || false}
                onChange={(e) => updateBenefits('ssi', e.target.checked)}
              />
              <span className="ml-2 text-sm text-gray-700">
                SSI (Supplemental Security Income)
              </span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                checked={governmentBenefits.ssdi || false}
                onChange={(e) => updateBenefits('ssdi', e.target.checked)}
              />
              <span className="ml-2 text-sm text-gray-700">
                SSDI (Social Security Disability Insurance)
              </span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                checked={governmentBenefits.mediCal || false}
                onChange={(e) => updateBenefits('mediCal', e.target.checked)}
              />
              <span className="ml-2 text-sm text-gray-700">
                Medi-Cal
              </span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                checked={governmentBenefits.medicare || false}
                onChange={(e) => updateBenefits('medicare', e.target.checked)}
              />
              <span className="ml-2 text-sm text-gray-700">
                Medicare
              </span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                checked={governmentBenefits.housingAssistance || false}
                onChange={(e) => updateBenefits('housingAssistance', e.target.checked)}
              />
              <span className="ml-2 text-sm text-gray-700">
                Housing Assistance (Section 8, etc.)
              </span>
            </label>

            <div className="mt-3">
              <Input
                label="Other Benefits"
                value={governmentBenefits.other || ''}
                onChange={(e) => updateBenefits('other', e.target.value)}
                placeholder="List any other government benefits..."
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Notary Information */}
      <Card>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Notary Information</h3>
            <p className="text-sm text-gray-600 mt-1">
              Information for notarization of the trust document
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Notary Name"
              value={sntData.notaryName || ''}
              onChange={(e) => updateFormData({
                sntData: { ...sntData, notaryName: e.target.value }
              })}
              placeholder="Full name of notary"
            />
            <Input
              label="Notary Date"
              type="date"
              value={sntData.notaryDate || ''}
              onChange={(e) => updateFormData({
                sntData: { ...sntData, notaryDate: e.target.value }
              })}
            />
          </div>
        </div>
      </Card>

      {/* Schedule A Property */}
      <Card>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Schedule A - Trust Property</h3>
            <p className="text-sm text-gray-600 mt-1">
              List the property or assets being transferred to the trust
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Property Description
            </label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows="6"
              value={sntData.scheduleAProperty || ''}
              onChange={(e) => updateFormData({
                sntData: { ...sntData, scheduleAProperty: e.target.value }
              })}
              placeholder="Enter property description, including real estate, bank accounts, investments, personal property, etc."
            />
            <p className="text-xs text-gray-500 mt-1">
              Be as specific as possible when describing trust property
            </p>
          </div>
        </div>
      </Card>

      {/* Remainder Beneficiaries */}
      <Card>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Remainder Beneficiaries</h3>
              <p className="text-sm text-gray-600 mt-1">
                Who will receive the remaining trust assets after the primary beneficiary's death (maximum 3)
              </p>
            </div>
            {remainderBeneficiaries.length < 3 && (
              <Button variant="primary" onClick={addRemainderBeneficiary}>
                + Add Beneficiary
              </Button>
            )}
          </div>

          {remainderBeneficiaries.length === 0 ? (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <p className="text-gray-500">No remainder beneficiaries added yet.</p>
              <p className="text-xs text-gray-400 mt-2">
                Add beneficiaries who will receive trust assets after the primary beneficiary
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {remainderBeneficiaries.map((rb, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-3">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-700">
                      Remainder Beneficiary {index + 1}
                    </h4>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeRemainderBeneficiary(index)}
                    >
                      Remove
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    <Autocomplete
                      label="First Name"
                      value={rb.firstName || ''}
                      onChange={(e) => updateRemainderBeneficiary(index, 'firstName', e.target.value)}
                      onSelect={(value) => updateRemainderBeneficiary(index, 'firstName', value)}
                      suggestions={nameSuggestions}
                      required
                    />
                    <Autocomplete
                      label="Last Name"
                      value={rb.lastName || ''}
                      onChange={(e) => updateRemainderBeneficiary(index, 'lastName', e.target.value)}
                      onSelect={(value) => updateRemainderBeneficiary(index, 'lastName', value)}
                      suggestions={nameSuggestions}
                      required
                    />
                    <Input
                      label="Relationship"
                      value={rb.relationship || ''}
                      onChange={(e) => updateRemainderBeneficiary(index, 'relationship', e.target.value)}
                      placeholder="e.g., Son, Daughter"
                      required
                    />
                    <Input
                      label="Percentage"
                      value={rb.percentage || ''}
                      onChange={(e) => updateRemainderBeneficiary(index, 'percentage', e.target.value)}
                      placeholder="e.g., 50%"
                      required
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>
    </>
  );
};

export default SNTBeneficiarySection;
