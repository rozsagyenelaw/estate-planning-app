import { useEffect } from 'react';
import { useFormContext } from '../../../context/FormContext';
import { Card, Button, Autocomplete, Input, Radio, Select, Checkbox } from '../../common';
import {
  DEFAULT_RESIDUARY_BENEFICIARY,
  DISTRIBUTION_TYPE,
  SEX_OPTIONS,
} from '../../../utils/constants';
import { getNameSuggestions } from '../../../services/autocompleteService';

const ResiduaryDistributionSection = () => {
  const { formData, updateFormData, addArrayItem, updateArrayItem, removeArrayItem } =
    useFormContext();
  const residuaryBeneficiaries = formData.residuaryBeneficiaries || [];

  // Auto-calculate equal shares when even split is enabled
  useEffect(() => {
    if (
      formData.residuaryEvenSplit &&
      residuaryBeneficiaries.length > 0
    ) {
      const share = (100 / residuaryBeneficiaries.length).toFixed(2);
      residuaryBeneficiaries.forEach((_, index) => {
        updateArrayItem('residuaryBeneficiaries', index, { share });
      });
    }
  }, [formData.residuaryEvenSplit, residuaryBeneficiaries.length]);

  const handleAddBeneficiary = () => {
    addArrayItem('residuaryBeneficiaries', { ...DEFAULT_RESIDUARY_BENEFICIARY });
  };

  const handleRemoveBeneficiary = (index) => {
    if (window.confirm('Are you sure you want to remove this beneficiary?')) {
      removeArrayItem('residuaryBeneficiaries', index);
    }
  };

  const handleBeneficiaryChange = (index, field, value) => {
    updateArrayItem('residuaryBeneficiaries', index, { [field]: value });
  };

  const handleAddAgeMilestone = (beneficiaryIndex) => {
    const beneficiary = residuaryBeneficiaries[beneficiaryIndex];
    const newMilestones = [...(beneficiary.ageMilestones || [{ age: '', percentage: '' }]), { age: '', percentage: '' }];
    updateArrayItem('residuaryBeneficiaries', beneficiaryIndex, { ageMilestones: newMilestones });
  };

  const handleRemoveAgeMilestone = (beneficiaryIndex, milestoneIndex) => {
    const beneficiary = residuaryBeneficiaries[beneficiaryIndex];
    const newMilestones = beneficiary.ageMilestones.filter((_, i) => i !== milestoneIndex);
    updateArrayItem('residuaryBeneficiaries', beneficiaryIndex, { ageMilestones: newMilestones });
  };

  const handleAgeMilestoneChange = (beneficiaryIndex, milestoneIndex, field, value) => {
    const beneficiary = residuaryBeneficiaries[beneficiaryIndex];
    const newMilestones = (beneficiary.ageMilestones || [{ age: '', percentage: '' }]).map((milestone, i) =>
      i === milestoneIndex ? { ...milestone, [field]: value } : milestone
    );
    updateArrayItem('residuaryBeneficiaries', beneficiaryIndex, { ageMilestones: newMilestones });
  };

  const calculateTotalPercentage = () => {
    return residuaryBeneficiaries
      .reduce((sum, b) => sum + parseFloat(b.share || 0), 0)
      .toFixed(2);
  };

  const totalPercentage = calculateTotalPercentage();
  const isValidTotal = Math.abs(parseFloat(totalPercentage) - 100) < 0.01;

  return (
    <Card title="Residuary Distribution" collapsible defaultOpen={false}>
      <div className="space-y-6">
        <p className="text-sm text-gray-600">
          The residuary estate is everything that remains after specific distributions.
          Specify who receives what percentage of your remaining estate.
        </p>

        <Checkbox
          label="Even Split (Automatically divide equally among all beneficiaries)"
          checked={formData.residuaryEvenSplit}
          onChange={(e) => updateFormData({ residuaryEvenSplit: e.target.checked })}
        />

        <Radio
          label="Distribution Options"
          name="residuary-distribution-type"
          options={[
            { value: 'descendants', label: 'Distribute to Descendants' },
            { value: 'other', label: 'Distribute to Other Beneficiaries' },
            { value: 'individuals', label: 'Distribute to Specific Individuals' },
          ]}
          value={formData.residuaryDistributionType}
          onChange={(e) =>
            updateFormData({ residuaryDistributionType: e.target.value })
          }
        />

        {formData.residuaryDistributionType === 'individuals' && (
          <>
            {residuaryBeneficiaries.length === 0 ? (
              <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                <p className="text-gray-500 mb-4">No residuary beneficiaries added yet</p>
                <Button onClick={handleAddBeneficiary} variant="primary">
                  Add First Beneficiary
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {residuaryBeneficiaries.map((beneficiary, index) => (
                  <div
                    key={index}
                    className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-md font-semibold text-gray-800">
                        Beneficiary #{index + 1}
                      </h4>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleRemoveBeneficiary(index)}
                      >
                        Remove
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Autocomplete
                        label="Name"
                        value={beneficiary.name}
                        onChange={(e) =>
                          handleBeneficiaryChange(index, 'name', e.target.value)
                        }
                        onSelect={(value) =>
                          handleBeneficiaryChange(index, 'name', value)
                        }
                        suggestions={getNameSuggestions()}
                        placeholder="Enter beneficiary name"
                        required
                      />

                      <Radio
                        label="Sex"
                        name={`beneficiary-sex-${index}`}
                        options={SEX_OPTIONS}
                        value={beneficiary.sex}
                        onChange={(e) =>
                          handleBeneficiaryChange(index, 'sex', e.target.value)
                        }
                      />

                      <Input
                        label="Relation"
                        value={beneficiary.relation}
                        onChange={(e) =>
                          handleBeneficiaryChange(index, 'relation', e.target.value)
                        }
                        placeholder="e.g., daughter, friend, nephew"
                      />

                      <Input
                        label="Share (%)"
                        type="number"
                        value={beneficiary.share}
                        onChange={(e) =>
                          handleBeneficiaryChange(index, 'share', e.target.value)
                        }
                        placeholder="25"
                        disabled={formData.residuaryEvenSplit}
                        required
                      />

                      <Select
                        label="Distribution Type (O/G/N)"
                        options={DISTRIBUTION_TYPE}
                        value={beneficiary.distributionType}
                        onChange={(e) =>
                          handleBeneficiaryChange(
                            index,
                            'distributionType',
                            e.target.value
                          )
                        }
                        required
                      />
                    </div>

                    {/* Age-Based Milestones */}
                    {beneficiary.distributionType === 'guardian' && (
                      <div className="ml-4 p-4 bg-gray-50 rounded-lg space-y-3">
                        <p className="text-sm font-medium text-gray-700">
                          Age-Based Distribution Milestones:
                        </p>
                        {(beneficiary.ageMilestones || [{ age: '', percentage: '' }]).map((milestone, milestoneIndex) => (
                          <div
                            key={milestoneIndex}
                            className="flex items-end gap-3 p-3 bg-white rounded border border-gray-200"
                          >
                            <Input
                              label="Age"
                              type="number"
                              value={milestone.age}
                              onChange={(e) =>
                                handleAgeMilestoneChange(
                                  index,
                                  milestoneIndex,
                                  'age',
                                  e.target.value
                                )
                              }
                              placeholder="25"
                              className="flex-1"
                            />
                            <Input
                              label="Percentage"
                              type="number"
                              value={milestone.percentage}
                              onChange={(e) =>
                                handleAgeMilestoneChange(
                                  index,
                                  milestoneIndex,
                                  'percentage',
                                  e.target.value
                                )
                              }
                              placeholder="50"
                              className="flex-1"
                            />
                            {beneficiary.ageMilestones?.length > 1 && (
                              <Button
                                variant="danger"
                                size="sm"
                                onClick={() => handleRemoveAgeMilestone(index, milestoneIndex)}
                              >
                                Remove
                              </Button>
                            )}
                          </div>
                        ))}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleAddAgeMilestone(index)}
                        >
                          + Add Age Milestone
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {residuaryBeneficiaries.length > 0 && (
              <div className="flex justify-center mt-4">
                <Button onClick={handleAddBeneficiary} variant="outline">
                  + Add Another Beneficiary
                </Button>
              </div>
            )}

            {residuaryBeneficiaries.length > 0 && (
              <div
                className={`mt-4 p-3 border rounded-lg ${
                  isValidTotal
                    ? 'bg-green-50 border-green-200'
                    : 'bg-red-50 border-red-200'
                }`}
              >
                <p
                  className={`text-sm ${
                    isValidTotal ? 'text-green-800' : 'text-red-800'
                  }`}
                >
                  <strong>Total Distribution:</strong> {totalPercentage}%
                  {!isValidTotal && (
                    <span className="ml-2">(Must equal 100%)</span>
                  )}
                  {isValidTotal && (
                    <span className="ml-2">✓ Valid</span>
                  )}
                </p>
              </div>
            )}
          </>
        )}

        {formData.residuaryDistributionType !== 'individuals' && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              {formData.residuaryDistributionType === 'descendants' ? (
                <>
                  The residuary estate will be distributed to your descendants according to
                  the trust provisions.
                </>
              ) : (
                <>
                  The residuary estate will be distributed to other beneficiaries as
                  specified in the trust provisions.
                </>
              )}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ResiduaryDistributionSection;
