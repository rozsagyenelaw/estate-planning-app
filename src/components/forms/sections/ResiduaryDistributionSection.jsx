import { useFormContext } from '../../../context/FormContext';
import { Card, Input, Select, Button, Autocomplete } from '../../common';
import { parseFullName, combineNameParts } from '../../../utils/nameParser';

const ResiduaryDistributionSection = () => {
  const { formData, updateFormData, addArrayItem, updateArrayItem, removeArrayItem } = useFormContext();

  // Generate suggestions from children
  const childrenSuggestions = (formData.children || []).map(child =>
    combineNameParts(child.firstName, child.middleName, child.lastName)
  ).filter(name => name.length > 0);

  const handleTypeChange = (value) => {
    updateFormData({ residuaryDistributionType: value });
  };

  const handleEvenSplitChange = (e) => {
    updateFormData({ residuaryEvenSplit: e.target.checked });
  };

  const handleAddBeneficiary = () => {
    addArrayItem('residuaryBeneficiaries', {
      name: '',
      firstName: '',
      middleName: '',
      lastName: '',
      percentage: '',
      relationship: '',
      contingentBeneficiaryType: 'descendants', // descendants, other_beneficiaries, individuals
      contingentIndividuals: '', // Comma-separated names if individuals selected
    });
  };

  const handleUpdateBeneficiary = (index, field, value) => {
    updateArrayItem('residuaryBeneficiaries', index, { [field]: value });
  };

  // Store raw input without parsing
  const handleUpdateBeneficiaryNameInput = (index, fullName) => {
    updateArrayItem('residuaryBeneficiaries', index, {
      name: fullName, // Store raw input
    });
  };

  // Parse name when done typing (on blur or select)
  const parseBeneficiaryName = (index, fullName) => {
    const parsed = parseFullName(fullName);
    updateArrayItem('residuaryBeneficiaries', index, {
      name: fullName,
      firstName: parsed.firstName,
      middleName: parsed.middleName,
      lastName: parsed.lastName,
    });
  };

  const handleRemoveBeneficiary = (index) => {
    removeArrayItem('residuaryBeneficiaries', index);
  };

  const autofillFromChildren = () => {
    // Populate beneficiaries from children with equal shares
    if (formData.children && formData.children.length > 0) {
      const sharePerChild = Math.floor(100 / formData.children.length);
      const beneficiaries = formData.children.map((child) => {
        const fullName = combineNameParts(child.firstName, child.middleName, child.lastName);
        return {
          name: fullName,
          firstName: child.firstName || '',
          middleName: child.middleName || '',
          lastName: child.lastName || '',
          relationship: 'child',
          dateOfBirth: child.dateOfBirth || '',
          percentage: sharePerChild,
          contingentBeneficiaryType: 'descendants', // Default to descendants
          contingentIndividuals: '',
        };
      });
      updateFormData({ residuaryBeneficiaries: beneficiaries });
    }
  };

  return (
    <Card>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Residuary Distribution</h3>
            <p className="text-sm text-gray-600 mt-1">
              Specify how the remainder of your estate should be distributed after specific bequests
            </p>
          </div>
          {formData.children && formData.children.length > 0 && formData.residuaryDistributionType === 'individuals' && (
            <Button variant="outline" onClick={autofillFromChildren}>
              Autofill from Children
            </Button>
          )}
        </div>

        <Select
          label="Distribution Type"
          value={formData.residuaryDistributionType || 'descendants'}
          onChange={(e) => handleTypeChange(e.target.value)}
          options={[
            { value: 'descendants', label: 'To my descendants per stirpes' },
            { value: 'individuals', label: 'To specific individuals' },
            { value: 'other', label: 'Other distribution' },
          ]}
        />

        {formData.residuaryDistributionType === 'individuals' && (
          <>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="evenSplit"
                checked={formData.residuaryEvenSplit || false}
                onChange={handleEvenSplitChange}
                className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <label htmlFor="evenSplit" className="text-sm text-gray-700">
                Split evenly among all beneficiaries
              </label>
            </div>

            {formData.residuaryBeneficiaries && formData.residuaryBeneficiaries.length > 0 ? (
              <div className="space-y-4">
                {formData.residuaryBeneficiaries.map((ben, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-3">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium text-gray-700">Beneficiary {index + 1}</h4>
                      <button
                        type="button"
                        onClick={() => handleRemoveBeneficiary(index)}
                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <Autocomplete
                        label="Full Name"
                        value={ben.name !== undefined ? ben.name : combineNameParts(ben.firstName, ben.middleName, ben.lastName)}
                        onChange={(e) => handleUpdateBeneficiaryNameInput(index, e.target.value)}
                        onSelect={(value) => parseBeneficiaryName(index, value)}
                        onBlur={(e) => parseBeneficiaryName(index, e.target.value)}
                        suggestions={childrenSuggestions}
                        placeholder="e.g., John Michael Smith"
                      />
                      <Input
                        label="Relationship"
                        value={ben.relationship || ''}
                        onChange={(e) => handleUpdateBeneficiary(index, 'relationship', e.target.value)}
                        placeholder="e.g., Son, Daughter, Friend"
                      />
                    </div>

                    {!formData.residuaryEvenSplit && (
                      <Input
                        label="Percentage"
                        value={ben.percentage || ''}
                        onChange={(e) => handleUpdateBeneficiary(index, 'percentage', e.target.value)}
                        placeholder="e.g., 25%, 50%"
                      />
                    )}

                    {/* Contingent Beneficiaries Section */}
                    <div className="pt-3 border-t border-gray-200">
                      <h5 className="text-sm font-medium text-gray-700 mb-2">
                        If this beneficiary predeceases, their share goes to:
                      </h5>

                      <Select
                        label="Contingent Beneficiary"
                        value={ben.contingentBeneficiaryType || 'descendants'}
                        onChange={(e) => handleUpdateBeneficiary(index, 'contingentBeneficiaryType', e.target.value)}
                        options={[
                          { value: 'descendants', label: 'Their descendants' },
                          { value: 'other_beneficiaries', label: 'Other beneficiaries (pro rata)' },
                          { value: 'individuals', label: 'Specific individuals' },
                          { value: 'lapse', label: 'Lapse (goes back to trust)' },
                        ]}
                      />

                      {ben.contingentBeneficiaryType === 'individuals' && (
                        <div className="mt-2">
                          <Input
                            label="Individual Names"
                            value={ben.contingentIndividuals || ''}
                            onChange={(e) => handleUpdateBeneficiary(index, 'contingentIndividuals', e.target.value)}
                            placeholder="e.g., John Smith, Jane Doe"
                            helperText="Enter names separated by commas"
                          />
                        </div>
                      )}

                      {ben.contingentBeneficiaryType === 'descendants' && (
                        <div className="mt-2 bg-blue-50 border border-blue-200 rounded p-2">
                          <p className="text-xs text-blue-800">
                            The share will pass to this beneficiary's descendants per stirpes
                          </p>
                        </div>
                      )}

                      {ben.contingentBeneficiaryType === 'other_beneficiaries' && (
                        <div className="mt-2 bg-green-50 border border-green-200 rounded p-2">
                          <p className="text-xs text-green-800">
                            The share will be redistributed proportionally among the remaining beneficiaries
                          </p>
                        </div>
                      )}

                      {ben.contingentBeneficiaryType === 'lapse' && (
                        <div className="mt-2 bg-purple-50 border border-purple-200 rounded p-2">
                          <p className="text-xs text-purple-800">
                            The share will lapse and remain in the trust estate
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 bg-gray-50 rounded-lg">
                <p className="text-gray-500 text-sm">No beneficiaries added yet</p>
              </div>
            )}

            <Button type="button" onClick={handleAddBeneficiary} variant="secondary">
              + Add Beneficiary
            </Button>
          </>
        )}

        {formData.residuaryDistributionType === 'descendants' && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              The remainder of your estate will be distributed to your descendants per stirpes
              (meaning if a child predeceases you, their share goes to their descendants).
            </p>
          </div>
        )}

        {formData.residuaryDistributionType === 'other' && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="text-sm text-gray-600">
              Please consult with your attorney to specify custom distribution instructions.
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ResiduaryDistributionSection;
