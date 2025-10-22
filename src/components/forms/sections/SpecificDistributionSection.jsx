import { useFormContext } from '../../../context/FormContext';
import { Card, Button, Autocomplete, Input, Radio, Checkbox, Select } from '../../common';
import { DEFAULT_SPECIFIC_DISTRIBUTION, LAPSE_OPTIONS } from '../../../utils/constants';
import { getNameSuggestions, addNameSuggestion } from '../../../services/autocompleteService';

const SpecificDistributionSection = () => {
  const { formData, addArrayItem, updateArrayItem, removeArrayItem } = useFormContext();
  const specificDistributions = formData.specificDistributions || [];

  const handleAddDistribution = () => {
    addArrayItem('specificDistributions', { ...DEFAULT_SPECIFIC_DISTRIBUTION });
  };

  const handleRemoveDistribution = (index) => {
    if (window.confirm('Are you sure you want to remove this specific distribution?')) {
      removeArrayItem('specificDistributions', index);
    }
  };

  const handleDistributionChange = (index, field, value) => {
    updateArrayItem('specificDistributions', index, { [field]: value });
  };

  const handleAddAgeDistribution = (distIndex) => {
    const distribution = specificDistributions[distIndex];
    const newAgeDistributions = [
      ...(distribution.ageDistributions || [{ age: '', percentage: '' }]),
      { age: '', percentage: '' },
    ];
    updateArrayItem('specificDistributions', distIndex, {
      ageDistributions: newAgeDistributions,
    });
  };

  const handleRemoveAgeDistribution = (distIndex, ageIndex) => {
    const distribution = specificDistributions[distIndex];
    const newAgeDistributions = (distribution.ageDistributions || [{ age: '', percentage: '' }]).filter(
      (_, i) => i !== ageIndex
    );
    updateArrayItem('specificDistributions', distIndex, {
      ageDistributions: newAgeDistributions,
    });
  };

  const handleAgeDistributionChange = (distIndex, ageIndex, field, value) => {
    const distribution = specificDistributions[distIndex];
    const newAgeDistributions = (distribution.ageDistributions || [{ age: '', percentage: '' }]).map((ad, i) =>
      i === ageIndex ? { ...ad, [field]: value } : ad
    );
    updateArrayItem('specificDistributions', distIndex, {
      ageDistributions: newAgeDistributions,
    });
  };

  return (
    <Card title="Specific Distribution" collapsible defaultOpen={false}>
      <div className="space-y-6">
        <p className="text-sm text-gray-600">
          Specify particular items or property to be distributed to specific beneficiaries.
          You can set age-based or event-based distribution conditions.
        </p>

        {specificDistributions.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <p className="text-gray-500 mb-4">No specific distributions added yet</p>
            <Button onClick={handleAddDistribution} variant="primary">
              Add First Specific Distribution
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {specificDistributions.map((distribution, distIndex) => (
              <div
                key={distIndex}
                className="p-4 bg-white border-2 border-gray-300 rounded-lg shadow-sm"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-md font-semibold text-gray-800">
                    Specific Distribution #{distIndex + 1}
                  </h4>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleRemoveDistribution(distIndex)}
                  >
                    Remove
                  </Button>
                </div>

                <div className="space-y-4">
                  <Autocomplete
                    label="Beneficiary"
                    value={distribution.beneficiary}
                    onChange={(e) =>
                      handleDistributionChange(distIndex, 'beneficiary', e.target.value)
                    }
                    onSelect={(value) =>
                      handleDistributionChange(distIndex, 'beneficiary', value)
                    }
                    onBlur={(e) => addNameSuggestion(e.target.value)}
                    suggestions={getNameSuggestions()}
                    placeholder="Enter beneficiary name"
                    required
                  />

                  <Input
                    label="Description of Item/Property"
                    value={distribution.description}
                    onChange={(e) =>
                      handleDistributionChange(distIndex, 'description', e.target.value)
                    }
                    placeholder="e.g., My diamond ring, 123 Main St property, etc."
                    required
                  />

                  <Radio
                    label="Distribution Type"
                    name={`distribution-type-${distIndex}`}
                    options={[
                      { value: 'age', label: 'Age-Based Distribution' },
                      { value: 'event', label: 'Event-Based Distribution' },
                    ]}
                    value={distribution.distributionType}
                    onChange={(e) =>
                      handleDistributionChange(distIndex, 'distributionType', e.target.value)
                    }
                  />

                  {(distribution.distributionType === 'age' || !distribution.distributionType) ? (
                    <div className="ml-4 p-4 bg-gray-50 rounded-lg space-y-3">
                      <p className="text-sm font-medium text-gray-700">
                        Age-Based Distributions:
                      </p>
                      {(distribution.ageDistributions || [{ age: '', percentage: '' }]).map((ageDist, ageIndex) => (
                        <div
                          key={ageIndex}
                          className="flex items-end gap-3 p-3 bg-white rounded border border-gray-200"
                        >
                          <Input
                            label="Age"
                            type="number"
                            value={ageDist.age}
                            onChange={(e) =>
                              handleAgeDistributionChange(
                                distIndex,
                                ageIndex,
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
                            value={ageDist.percentage}
                            onChange={(e) =>
                              handleAgeDistributionChange(
                                distIndex,
                                ageIndex,
                                'percentage',
                                e.target.value
                              )
                            }
                            placeholder="50"
                            className="flex-1"
                          />
                          {(distribution.ageDistributions || [{ age: '', percentage: '' }]).length > 1 && (
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => handleRemoveAgeDistribution(distIndex, ageIndex)}
                            >
                              Remove
                            </Button>
                          )}
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleAddAgeDistribution(distIndex)}
                      >
                        + Add Age Milestone
                      </Button>
                    </div>
                  ) : (
                    <Input
                      label="Event Description"
                      value={distribution.eventDescription}
                      onChange={(e) =>
                        handleDistributionChange(
                          distIndex,
                          'eventDescription',
                          e.target.value
                        )
                      }
                      placeholder="e.g., upon graduation from college"
                      className="ml-4"
                    />
                  )}

                  <Checkbox
                    label="Include Descendants (if beneficiary predeceases)"
                    checked={distribution.descendants}
                    onChange={(e) =>
                      handleDistributionChange(distIndex, 'descendants', e.target.checked)
                    }
                  />

                  <Select
                    label="If Gift Lapses"
                    options={LAPSE_OPTIONS}
                    value={distribution.lapse}
                    onChange={(e) =>
                      handleDistributionChange(distIndex, 'lapse', e.target.value)
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {specificDistributions.length > 0 && (
          <div className="flex justify-center mt-4">
            <Button onClick={handleAddDistribution} variant="outline">
              + Add Another Specific Distribution
            </Button>
          </div>
        )}

        {specificDistributions.length > 0 && (
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Total Specific Distributions:</strong>{' '}
              {specificDistributions.length}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default SpecificDistributionSection;
