import { useFormContext } from '../../../context/FormContext';
import { Card, Button, Autocomplete, Input } from '../../common';
import { DEFAULT_NEEDS_TRUST } from '../../../utils/constants';
import { getNameSuggestions } from '../../../services/autocompleteService';

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
                    suggestions={getNameSuggestions()}
                    placeholder="Enter beneficiary name"
                    required
                  />

                  <Input
                    label="Age Restrictions (Optional)"
                    value={trust.ageRestrictions}
                    onChange={(e) =>
                      handleNeedsTrustChange(index, 'ageRestrictions', e.target.value)
                    }
                    placeholder="e.g., Until age 25"
                    helperText="Specify any age-related conditions for this trust"
                  />

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
