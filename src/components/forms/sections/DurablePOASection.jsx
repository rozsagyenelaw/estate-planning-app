import { useFormContext } from '../../../context/FormContext';
import { Card, Button, Checkbox, Autocomplete } from '../../common';
import { getNameSuggestions, addNameSuggestion } from '../../../services/autocompleteService';

const DurablePOASection = () => {
  const { formData, updateFormData } = useFormContext();

  const handleAddRepresentative = (type) => {
    const key = type === 'client' ? 'client' : 'spouse';
    const representatives = [
      ...formData.durablePOA[key],
      { name: '', jointly: false },
    ];
    updateFormData({
      durablePOA: {
        ...formData.durablePOA,
        [key]: representatives,
      },
    });
  };

  const handleRemoveRepresentative = (type, index) => {
    if (window.confirm('Are you sure you want to remove this representative?')) {
      const key = type === 'client' ? 'client' : 'spouse';
      const representatives = formData.durablePOA[key].filter((_, i) => i !== index);
      updateFormData({
        durablePOA: {
          ...formData.durablePOA,
          [key]: representatives,
        },
      });
    }
  };

  const handleRepresentativeChange = (type, index, field, value) => {
    const key = type === 'client' ? 'client' : 'spouse';
    const representatives = formData.durablePOA[key].map((rep, i) =>
      i === index ? { ...rep, [field]: value } : rep
    );
    updateFormData({
      durablePOA: {
        ...formData.durablePOA,
        [key]: representatives,
      },
    });
  };

  const renderRepresentativesList = (type, label) => {
    const representatives = formData.durablePOA[type];

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">
          {label} Representatives
        </h3>

        {representatives.length === 0 ? (
          <div className="text-center py-6 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <p className="text-gray-500 mb-3 text-sm">
              No {label.toLowerCase()} representatives added yet
            </p>
            <Button
              onClick={() => handleAddRepresentative(type)}
              variant="primary"
              size="sm"
            >
              Add {label} Representative
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
                + Add Another {label} Representative
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <Card title="Durable Power of Attorney" collapsible defaultOpen={false}>
      <div className="space-y-6">
        <p className="text-sm text-gray-600">
          Designate representatives to manage your financial and legal affairs if you
          become incapacitated. List them in order of preference.
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
        {(formData.durablePOA.client.length > 0 ||
          formData.durablePOA.spouse.length > 0) && (
          <div className="mt-4 p-3 bg-indigo-50 border border-indigo-200 rounded-lg">
            <p className="text-sm text-indigo-800">
              <strong>Total Representatives:</strong> {formData.durablePOA.client.length}
              {formData.isJoint &&
                ` (Client) + ${formData.durablePOA.spouse.length} (Spouse)`}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default DurablePOASection;
