import { useFormContext } from '../../../context/FormContext';
import { Card, Input, Button, Autocomplete } from '../../common';
import { getNameSuggestions, addNameSuggestion } from '../../../services/autocompleteService';

const SpecificDistributionSection = () => {
  const { formData, addArrayItem, updateArrayItem, removeArrayItem } = useFormContext();
  const nameSuggestions = getNameSuggestions();

  const handleAdd = () => {
    addArrayItem('specificDistributions', {
      beneficiary: '',
      description: '',
      percentage: '',
    });
  };

  const handleUpdate = (index, field, value) => {
    updateArrayItem('specificDistributions', index, { [field]: value });

    // Add to autocomplete suggestions
    if (field === 'beneficiary' && value) {
      addNameSuggestion(value);
    }
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
                  suggestions={nameSuggestions}
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
