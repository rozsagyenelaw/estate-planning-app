import { useFormContext } from '../../../context/FormContext';
import { Card, Button, Autocomplete, Input, Select } from '../../common';
import { DEFAULT_NEEDS_TRUST } from '../../../utils/constants';
import { getNameSuggestions, addNameSuggestion } from '../../../services/autocompleteService';

const GeneralNeedsTrustSection = () => {
  const { formData, addArrayItem, updateArrayItem, removeArrayItem } = useFormContext();

  // Safety check: ensure generalNeedsTrusts exists
  const generalNeedsTrusts = formData.generalNeedsTrusts || [];

  const handleAddNeedsTrust = () => {
    addArrayItem('generalNeedsTrusts', { ...DEFAULT_NEEDS_TRUST });
  };

  const handleRemoveNeedsTrust = (index) => {
    if (window.confirm('Are you sure you want to remove this needs trust?')) {
      removeArrayItem('generalNeedsTrusts', index);
    }
  };

  const handleNeedsTrustChange = (index, field, value) => {
    updateArrayItem('generalNeedsTrusts', index, { [field]: value });
  };

  const handleAddAgeMilestone = (trustIndex) => {
    const trust = generalNeedsTrusts[trustIndex];
    const newMilestones = [...(trust.ageMilestones || [{ age: '', percentage: '' }]), { age: '', percentage: '' }];
    updateArrayItem('generalNeedsTrusts', trustIndex, { ageMilestones: newMilestones });
  };

  const handleRemoveAgeMilestone = (trustIndex, milestoneIndex) => {
    const trust = generalNeedsTrusts[trustIndex];
    const newMilestones = (trust.ageMilestones || [{ age: '', percentage: '' }]).filter((_, i) => i !== milestoneIndex);
    updateArrayItem('generalNeedsTrusts', trustIndex, { ageMilestones: newMilestones });
  };

  const handleAgeMilestoneChange = (trustIndex, milestoneIndex, field, value) => {
    const trust = generalNeedsTrusts[trustIndex];
    const newMilestones = (trust.ageMilestones || [{ age: '', percentage: '' }]).map((milestone, i) =>
      i === milestoneIndex ? { ...milestone, [field]: value } : milestone
    );
    updateArrayItem('generalNeedsTrusts', trustIndex, { ageMilestones: newMilestones });
  };

  return (
    <Card title="General Needs Trust" collapsible defaultOpen={false}>
      <div className="space-y-6">
        <p className="text-sm text-gray-600">
          Create special needs trusts for beneficiaries who may require ongoing financial
          support with specific conditions or restrictions.
        </p>

        {generalNeedsTrusts.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <p className="text-gray-500 mb-4">No general needs trusts added yet</p>
            <Button onClick={handleAddNeedsTrust} variant="primary">
              Add First General Needs Trust
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {generalNeedsTrusts.map((trust, index) => (
              <div
                key={index}
                className="p-4 bg-white border-2 border-purple-300 rounded-lg shadow-sm"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-md font-semibold text-gray-800">
                    General Needs Trust #{index + 1}
                  </h4>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleRemoveNeedsTrust(index)}
                  >
                    Remove
                  </Button>
                </div>

                <div className="space-y-4">
                  <Autocomplete
                    label="Beneficiary"
                    value={trust.beneficiary}
                    onChange={(e) =>
                      handleNeedsTrustChange(index, 'beneficiary', e.target.value)
                    }
                    onSelect={(value) =>
                      handleNeedsTrustChange(index, 'beneficiary', value)
                    }
                    onBlur={(e) => addNameSuggestion(e.target.value)}
                    suggestions={getNameSuggestions()}
                    placeholder="Enter beneficiary name"
                    required
                  />

                  <Select
                    label="Distribution Type"
                    options={[
                      { value: 'age', label: 'Age-Based Milestones' },
                      { value: 'condition', label: 'Condition-Based' },
                    ]}
                    value={trust.distributionType || 'age'}
                    onChange={(e) =>
                      handleNeedsTrustChange(index, 'distributionType', e.target.value)
                    }
                  />

                  {(trust.distributionType === 'age' || !trust.distributionType) ? (
                    <div className="ml-4 p-4 bg-gray-50 rounded-lg space-y-3">
                      <p className="text-sm font-medium text-gray-700">
                        Age-Based Distribution Milestones:
                      </p>
                      {(trust.ageMilestones || [{ age: '', percentage: '' }]).map((milestone, milestoneIndex) => (
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
                          {(trust.ageMilestones || [{ age: '', percentage: '' }]).length > 1 && (
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
                  ) : (
                    <Input
                      label="Distribution Condition"
                      value={trust.condition || ''}
                      onChange={(e) =>
                        handleNeedsTrustChange(index, 'condition', e.target.value)
                      }
                      placeholder="e.g., upon completion of college degree"
                      helperText="Specify the condition that must be met for distribution"
                    />
                  )}

                  <Input
                    label="Distribution Percentage"
                    type="number"
                    value={trust.distributionPercentage}
                    onChange={(e) =>
                      handleNeedsTrustChange(
                        index,
                        'distributionPercentage',
                        e.target.value
                      )
                    }
                    placeholder="e.g., 50"
                    helperText="Percentage of funds to be held in this needs trust"
                  />

                  <div>
                    <label className="label-text">
                      Special Conditions
                    </label>
                    <textarea
                      value={trust.specialConditions}
                      onChange={(e) =>
                        handleNeedsTrustChange(
                          index,
                          'specialConditions',
                          e.target.value
                        )
                      }
                      placeholder="Enter any special conditions or instructions for this needs trust..."
                      className="input-field min-h-[100px]"
                      rows={4}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Describe any specific requirements, restrictions, or purposes for this
                      needs trust
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {generalNeedsTrusts.length > 0 && (
          <div className="flex justify-center mt-4">
            <Button onClick={handleAddNeedsTrust} variant="outline">
              + Add Another General Needs Trust
            </Button>
          </div>
        )}

        {generalNeedsTrusts.length > 0 && (
          <div className="mt-4 p-3 bg-purple-50 border border-purple-200 rounded-lg">
            <p className="text-sm text-purple-800">
              <strong>Total General Needs Trusts:</strong>{' '}
              {generalNeedsTrusts.length}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default GeneralNeedsTrustSection;
