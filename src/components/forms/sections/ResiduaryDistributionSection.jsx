import { useFormContext } from '../../../context/FormContext';
import { Card, Input, Select, Button } from '../../common';

const ResiduaryDistributionSection = () => {
  const { formData, updateFormData, addArrayItem, updateArrayItem, removeArrayItem } = useFormContext();

  const handleTypeChange = (value) => {
    updateFormData({ residuaryDistributionType: value });
  };

  const handleEvenSplitChange = (e) => {
    updateFormData({ residuaryEvenSplit: e.target.checked });
  };

  const handleAddBeneficiary = () => {
    addArrayItem('residuaryBeneficiaries', {
      name: '',
      percentage: '',
      relationship: '',
    });
  };

  const handleUpdateBeneficiary = (index, field, value) => {
    updateArrayItem('residuaryBeneficiaries', index, { [field]: value });
  };

  const handleRemoveBeneficiary = (index) => {
    removeArrayItem('residuaryBeneficiaries', index);
  };

  return (
    <Card>
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Residuary Distribution</h3>
          <p className="text-sm text-gray-600 mt-1">
            Specify how the remainder of your estate should be distributed after specific bequests
          </p>
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
                      <Input
                        label="Name"
                        value={ben.name || ''}
                        onChange={(e) => handleUpdateBeneficiary(index, 'name', e.target.value)}
                        placeholder="Beneficiary name"
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
