import { useFormContext } from '../../../context/FormContext';
import { Card, Button, Checkbox, Autocomplete, Input } from '../../common';
import {
  getNameSuggestions,
  addNameSuggestion,
  getAddressSuggestions,
  addAddressSuggestion,
  getPhoneSuggestions,
  addPhoneSuggestion,
} from '../../../services/autocompleteService';
import { formatPhoneNumber } from '../../../utils/formatters';

const HealthcarePOASection = () => {
  const { formData, updateFormData } = useFormContext();

  const handleAddRepresentative = (type) => {
    const key = type === 'client' ? 'client' : 'spouse';
    const representatives = [
      ...formData.healthcarePOA[key],
      { name: '', address: '', phone: '', jointly: false },
    ];
    updateFormData({
      healthcarePOA: {
        ...formData.healthcarePOA,
        [key]: representatives,
      },
    });
  };

  const handleRemoveRepresentative = (type, index) => {
    if (window.confirm('Are you sure you want to remove this representative?')) {
      const key = type === 'client' ? 'client' : 'spouse';
      const representatives = formData.healthcarePOA[key].filter((_, i) => i !== index);
      updateFormData({
        healthcarePOA: {
          ...formData.healthcarePOA,
          [key]: representatives,
        },
      });
    }
  };

  const handleRepresentativeChange = (type, index, field, value) => {
    if (field === 'phone') {
      value = formatPhoneNumber(value);
    }
    const key = type === 'client' ? 'client' : 'spouse';
    const representatives = formData.healthcarePOA[key].map((rep, i) =>
      i === index ? { ...rep, [field]: value } : rep
    );
    updateFormData({
      healthcarePOA: {
        ...formData.healthcarePOA,
        [key]: representatives,
      },
    });
  };

  const renderRepresentativesList = (type, label) => {
    const representatives = formData.healthcarePOA[type];

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">
          {label} Healthcare Representatives
        </h3>

        {representatives.length === 0 ? (
          <div className="text-center py-6 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <p className="text-gray-500 mb-3 text-sm">
              No {label.toLowerCase()} healthcare representatives added yet
            </p>
            <Button
              onClick={() => handleAddRepresentative(type)}
              variant="primary"
              size="sm"
            >
              Add {label} Healthcare Representative
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {representatives.map((rep, index) => (
              <div
                key={index}
                className="p-3 bg-white border border-gray-200 rounded-lg"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-700">
                    Representative {index + 1}
                    {index === 0 && ' (Primary)'}
                  </span>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleRemoveRepresentative(type, index)}
                  >
                    Remove
                  </Button>
                </div>

                <div className="space-y-3">
                  <Autocomplete
                    label="Name"
                    value={rep.name}
                    onChange={(e) =>
                      handleRepresentativeChange(type, index, 'name', e.target.value)
                    }
                    onSelect={(value) =>
                      handleRepresentativeChange(type, index, 'name', value)
                    }
                    onBlur={(e) => addNameSuggestion(e.target.value)}
                    suggestions={getNameSuggestions()}
                    placeholder="Enter representative name"
                    required
                  />

                  <Autocomplete
                    label="Address"
                    value={rep.address}
                    onChange={(e) =>
                      handleRepresentativeChange(type, index, 'address', e.target.value)
                    }
                    onSelect={(value) =>
                      handleRepresentativeChange(type, index, 'address', value)
                    }
                    onBlur={(e) => addAddressSuggestion(e.target.value)}
                    suggestions={getAddressSuggestions()}
                    placeholder="Enter address"
                    required
                  />

                  <Autocomplete
                    label="Phone Number"
                    value={rep.phone}
                    onChange={(e) =>
                      handleRepresentativeChange(type, index, 'phone', e.target.value)
                    }
                    onSelect={(value) =>
                      handleRepresentativeChange(type, index, 'phone', value)
                    }
                    onBlur={(e) => addPhoneSuggestion(e.target.value)}
                    suggestions={getPhoneSuggestions()}
                    placeholder="(XXX) XXX-XXXX"
                    maxLength={14}
                    required
                  />

                  <Checkbox
                    label="Jointly (must act with next representative)"
                    checked={rep.jointly}
                    onChange={(e) =>
                      handleRepresentativeChange(
                        type,
                        index,
                        'jointly',
                        e.target.checked
                      )
                    }
                  />
                </div>
              </div>
            ))}

            <div className="flex justify-center mt-3">
              <Button
                onClick={() => handleAddRepresentative(type)}
                variant="outline"
                size="sm"
              >
                + Add Another {label} Healthcare Representative
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <Card title="Healthcare Power of Attorney" collapsible defaultOpen={false}>
      <div className="space-y-6">
        <p className="text-sm text-gray-600">
          Designate representatives to make healthcare decisions on your behalf if you
          become unable to do so. Include complete contact information for each
          representative.
        </p>

        {/* Client Representatives */}
        {renderRepresentativesList('client', 'Client')}

        {/* Spouse Representatives (only for joint trusts) */}
        {formData.isJoint && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            {renderRepresentativesList('spouse', 'Spouse')}
          </div>
        )}

        {/* Summary */}
        {(formData.healthcarePOA.client.length > 0 ||
          formData.healthcarePOA.spouse.length > 0) && (
          <div className="mt-4 p-3 bg-teal-50 border border-teal-200 rounded-lg">
            <p className="text-sm text-teal-800">
              <strong>Total Healthcare Representatives:</strong>{' '}
              {formData.healthcarePOA.client.length}
              {formData.isJoint &&
                ` (Client) + ${formData.healthcarePOA.spouse.length} (Spouse)`}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default HealthcarePOASection;
