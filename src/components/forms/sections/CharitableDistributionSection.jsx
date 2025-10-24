import { useFormContext } from '../../../context/FormContext';
import { Card, Input, Button } from '../../common';

const CharitableDistributionSection = () => {
  const { formData, addArrayItem, updateArrayItem, removeArrayItem } = useFormContext();

  const handleAdd = () => {
    addArrayItem('charitableDistributions', {
      charityName: '',
      amount: '',
      taxId: '',
      purpose: '',
    });
  };

  const handleUpdate = (index, field, value) => {
    updateArrayItem('charitableDistributions', index, { [field]: value });
  };

  const handleRemove = (index) => {
    removeArrayItem('charitableDistributions', index);
  };

  return (
    <Card>
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Charitable Distributions</h3>
          <p className="text-sm text-gray-600 mt-1">
            Specify charitable organizations to receive bequests from your estate
          </p>
        </div>

        {formData.charitableDistributions && formData.charitableDistributions.length > 0 ? (
          <div className="space-y-4">
            {formData.charitableDistributions.map((charity, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium text-gray-700">Charitable Gift {index + 1}</h4>
                  <button
                    type="button"
                    onClick={() => handleRemove(index)}
                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                  >
                    Remove
                  </button>
                </div>

                <Input
                  label="Charity Name"
                  value={charity.charityName || ''}
                  onChange={(e) => handleUpdate(index, 'charityName', e.target.value)}
                  placeholder="Full legal name of the charity"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Input
                    label="Amount or Percentage"
                    value={charity.amount || ''}
                    onChange={(e) => handleUpdate(index, 'amount', e.target.value)}
                    placeholder="e.g., $10,000 or 10%"
                  />
                  <Input
                    label="Tax ID / EIN (Optional)"
                    value={charity.taxId || ''}
                    onChange={(e) => handleUpdate(index, 'taxId', e.target.value)}
                    placeholder="e.g., 12-3456789"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Purpose or Designation (Optional)
                  </label>
                  <textarea
                    value={charity.purpose || ''}
                    onChange={(e) => handleUpdate(index, 'purpose', e.target.value)}
                    placeholder="Specify how the gift should be used (e.g., for education programs, unrestricted, etc.)"
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 bg-gray-50 rounded-lg">
            <p className="text-gray-500 text-sm">No charitable distributions added yet</p>
          </div>
        )}

        <Button type="button" onClick={handleAdd} variant="secondary">
          + Add Charitable Distribution
        </Button>
      </div>
    </Card>
  );
};

export default CharitableDistributionSection;
