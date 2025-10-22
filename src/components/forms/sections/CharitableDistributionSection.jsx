import { useFormContext } from '../../../context/FormContext';
import { Card, Button, Input } from '../../common';
import { DEFAULT_CHARITY } from '../../../utils/constants';

const CharitableDistributionSection = () => {
  const { formData, addArrayItem, updateArrayItem, removeArrayItem } = useFormContext();

  const handleAddCharity = () => {
    addArrayItem('charitableDistributions', { ...DEFAULT_CHARITY });
  };

  const handleRemoveCharity = (index) => {
    if (window.confirm('Are you sure you want to remove this charitable distribution?')) {
      removeArrayItem('charitableDistributions', index);
    }
  };

  const handleCharityChange = (index, field, value) => {
    updateArrayItem('charitableDistributions', index, { [field]: value });
  };

  return (
    <Card title="Charitable Distribution" collapsible defaultOpen={false}>
      <div className="space-y-6">
        <p className="text-sm text-gray-600">
          Designate charitable organizations to receive gifts from your estate. Include
          organization details and distribution amounts.
        </p>

        {formData.charitableDistributions.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <p className="text-gray-500 mb-4">
              No charitable distributions added yet
            </p>
            <Button onClick={handleAddCharity} variant="primary">
              Add First Charitable Distribution
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {formData.charitableDistributions.map((charity, index) => (
              <div
                key={index}
                className="p-4 bg-white border-2 border-green-300 rounded-lg shadow-sm"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-md font-semibold text-gray-800">
                    Charitable Organization #{index + 1}
                  </h4>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleRemoveCharity(index)}
                  >
                    Remove
                  </Button>
                </div>

                <div className="space-y-4">
                  <Input
                    label="Charity Name"
                    value={charity.name}
                    onChange={(e) =>
                      handleCharityChange(index, 'name', e.target.value)
                    }
                    placeholder="Enter full name of charitable organization"
                    required
                  />

                  <Input
                    label="Tax ID / EIN"
                    value={charity.taxId}
                    onChange={(e) =>
                      handleCharityChange(index, 'taxId', e.target.value)
                    }
                    placeholder="XX-XXXXXXX"
                    helperText="Federal Tax Identification Number"
                  />

                  <Input
                    label="Address"
                    value={charity.address}
                    onChange={(e) =>
                      handleCharityChange(index, 'address', e.target.value)
                    }
                    placeholder="Full address of charitable organization"
                    required
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Amount ($)"
                      type="number"
                      value={charity.amount}
                      onChange={(e) =>
                        handleCharityChange(index, 'amount', e.target.value)
                      }
                      placeholder="0.00"
                      helperText="Specific dollar amount"
                    />

                    <Input
                      label="Percentage (%)"
                      type="number"
                      value={charity.percentage}
                      onChange={(e) =>
                        handleCharityChange(index, 'percentage', e.target.value)
                      }
                      placeholder="0"
                      helperText="Or percentage of estate"
                    />
                  </div>

                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-xs text-yellow-800">
                      <strong>Note:</strong> You can specify either a fixed amount or a
                      percentage. If both are entered, the amount will take precedence.
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {formData.charitableDistributions.length > 0 && (
          <div className="flex justify-center mt-4">
            <Button onClick={handleAddCharity} variant="outline">
              + Add Another Charitable Distribution
            </Button>
          </div>
        )}

        {formData.charitableDistributions.length > 0 && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-800">
              <strong>Total Charitable Organizations:</strong>{' '}
              {formData.charitableDistributions.length}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default CharitableDistributionSection;
