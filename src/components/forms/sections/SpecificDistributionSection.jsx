import { useFormContext } from '../../../context/FormContext';
import { Card, Input, Button, Autocomplete, Select } from '../../common';

const SpecificDistributionSection = () => {
  const { formData, addArrayItem, updateArrayItem, removeArrayItem } = useFormContext();

  const handleAdd = () => {
    addArrayItem('specificDistributions', {
      beneficiary: '',
      description: '',
      percentage: '',
      contingentBeneficiaryType: 'descendants',
      contingentIndividuals: '',
    });
  };

  const handleUpdate = (index, field, value) => {
    updateArrayItem('specificDistributions', index, { [field]: value });
  };

  const handleRemove = (index) => {
    removeArrayItem('specificDistributions', index);
  };

  return (
    <Card>
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Specific Distributions</h3>
          <p className="text-sm text-gray-600 mt-1">
            Specify particular items or assets to be distributed to specific beneficiaries
          </p>
        </div>

        {formData.specificDistributions && formData.specificDistributions.length > 0 ? (
          <div className="space-y-4">
            {formData.specificDistributions.map((dist, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium text-gray-700">Distribution {index + 1}</h4>
                  <button
                    type="button"
                    onClick={() => handleRemove(index)}
                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                  >
                    Remove
                  </button>
                </div>

                <Autocomplete
                  label="Beneficiary Name"
                  value={dist.beneficiary || ''}
                  onChange={(e) => handleUpdate(index, 'beneficiary', e.target.value)}
                  onSelect={(value) => handleUpdate(index, 'beneficiary', value)}
                  placeholder="Enter beneficiary name"
                />

                <Input
                  label="Description of Asset/Item"
                  value={dist.description || ''}
                  onChange={(e) => handleUpdate(index, 'description', e.target.value)}
                  placeholder="e.g., My 2020 Honda Accord, My diamond ring, etc."
                />

                <Input
                  label="Percentage or Amount (Optional)"
                  value={dist.percentage || ''}
                  onChange={(e) => handleUpdate(index, 'percentage', e.target.value)}
                  placeholder="e.g., 25%, $10,000, etc."
                />

                {/* Contingent Beneficiaries Section */}
                <div className="pt-3 border-t border-gray-200">
                  <h5 className="text-sm font-medium text-gray-700 mb-2">
                    If this beneficiary predeceases, this gift goes to:
                  </h5>

                  <Select
                    label="Contingent Beneficiary"
                    value={dist.contingentBeneficiaryType || 'descendants'}
                    onChange={(e) => handleUpdate(index, 'contingentBeneficiaryType', e.target.value)}
                    options={[
                      { value: 'descendants', label: 'Their descendants' },
                      { value: 'other_beneficiaries', label: 'Other beneficiaries (pro rata)' },
                      { value: 'individuals', label: 'Specific individuals' },
                      { value: 'lapse', label: 'Lapse (goes back to trust)' },
                    ]}
                  />

                  {dist.contingentBeneficiaryType === 'individuals' && (
                    <div className="mt-2">
                      <Input
                        label="Individual Names"
                        value={dist.contingentIndividuals || ''}
                        onChange={(e) => handleUpdate(index, 'contingentIndividuals', e.target.value)}
                        placeholder="e.g., John Smith, Jane Doe"
                        helperText="Enter names separated by commas"
                      />
                    </div>
                  )}

                  {dist.contingentBeneficiaryType === 'descendants' && (
                    <div className="mt-2 bg-blue-50 border border-blue-200 rounded p-2">
                      <p className="text-xs text-blue-800">
                        The gift will pass to this beneficiary's descendants per stirpes
                      </p>
                    </div>
                  )}

                  {dist.contingentBeneficiaryType === 'other_beneficiaries' && (
                    <div className="mt-2 bg-green-50 border border-green-200 rounded p-2">
                      <p className="text-xs text-green-800">
                        The gift will be redistributed proportionally among the remaining beneficiaries
                      </p>
                    </div>
                  )}

                  {dist.contingentBeneficiaryType === 'lapse' && (
                    <div className="mt-2 bg-purple-50 border border-purple-200 rounded p-2">
                      <p className="text-xs text-purple-800">
                        The gift will lapse and be distributed according to the residuary clause of the trust
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 bg-gray-50 rounded-lg">
            <p className="text-gray-500 text-sm">No specific distributions added yet</p>
          </div>
        )}

        <Button type="button" onClick={handleAdd} variant="secondary">
          + Add Specific Distribution
        </Button>
      </div>
    </Card>
  );
};

export default SpecificDistributionSection;
