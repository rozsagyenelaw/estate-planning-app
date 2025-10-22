import { useFormContext } from '../../../context/FormContext';
import { Card, Button, Checkbox, Autocomplete, Input } from '../../common';
import { DEFAULT_TRUSTEE } from '../../../utils/constants';
import {
  getNameSuggestions,
  getAddressSuggestions,
  getPhoneSuggestions,
} from '../../../services/autocompleteService';
import { formatPhoneNumber } from '../../../utils/formatters';

const SuccessorTrusteesSection = () => {
  const { formData, addArrayItem, updateArrayItem, removeArrayItem } = useFormContext();
  const successorTrustees = formData.successorTrustees || [];

  const handleAddTrustee = () => {
    addArrayItem('successorTrustees', { ...DEFAULT_TRUSTEE });
  };

  const handleRemoveTrustee = (index) => {
    if (window.confirm('Are you sure you want to remove this successor trustee?')) {
      removeArrayItem('successorTrustees', index);
    }
  };

  const handleTrusteeChange = (index, field, value) => {
    if (field === 'phone') {
      value = formatPhoneNumber(value);
    }
    updateArrayItem('successorTrustees', index, { [field]: value });
  };

  return (
    <Card title="Successor Trustees" collapsible defaultOpen={false}>
      <div className="space-y-6">
        <p className="text-sm text-gray-600">
          Add successor trustees who will manage the trust if the primary trustee(s) cannot serve.
          List them in order of preference.
        </p>

        {successorTrustees.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <p className="text-gray-500 mb-4">No successor trustees added yet</p>
            <Button onClick={handleAddTrustee} variant="primary">
              Add First Successor Trustee
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {successorTrustees.map((trustee, index) => (
              <div
                key={index}
                className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-md font-semibold text-gray-800">
                      Successor Trustee #{index + 1}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {index === 0 ? 'First in line' : `${index + 1}${index === 1 ? 'nd' : index === 2 ? 'rd' : 'th'} in line`}
                    </p>
                  </div>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleRemoveTrustee(index)}
                  >
                    Remove
                  </Button>
                </div>

                <div className="space-y-4">
                  <Autocomplete
                    label="Name"
                    value={trustee.name}
                    onChange={(e) => handleTrusteeChange(index, 'name', e.target.value)}
                    onSelect={(value) => handleTrusteeChange(index, 'name', value)}
                    suggestions={getNameSuggestions()}
                    placeholder="Enter trustee's full name"
                    required
                  />

                  <Autocomplete
                    label="Address"
                    value={trustee.address}
                    onChange={(e) => handleTrusteeChange(index, 'address', e.target.value)}
                    onSelect={(value) => handleTrusteeChange(index, 'address', value)}
                    suggestions={getAddressSuggestions()}
                    placeholder="Enter trustee's address"
                    required
                  />

                  <Input
                    label="Phone Number"
                    value={trustee.phone}
                    onChange={(e) => handleTrusteeChange(index, 'phone', e.target.value)}
                    placeholder="(XXX) XXX-XXXX"
                    maxLength={14}
                    required
                  />

                  <Checkbox
                    label="Jointly (Check if this trustee must act jointly with the next trustee)"
                    checked={trustee.jointly}
                    onChange={(e) =>
                      handleTrusteeChange(index, 'jointly', e.target.checked)
                    }
                    helperText="If checked, this trustee and the next one must act together"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {successorTrustees.length > 0 && (
          <div className="flex justify-center mt-4">
            <Button onClick={handleAddTrustee} variant="outline">
              + Add Another Successor Trustee
            </Button>
          </div>
        )}

        {successorTrustees.length > 0 && (
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Total Successor Trustees:</strong> {successorTrustees.length}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default SuccessorTrusteesSection;
