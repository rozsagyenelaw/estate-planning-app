import { useFormContext } from '../../../context/FormContext';
import { Card, Button, Autocomplete } from '../../common';
import { getNameSuggestions, addNameSuggestion } from '../../../services/autocompleteService';

const PourOverWillSection = () => {
  const { formData, updateFormData } = useFormContext();

  const handleAddRepresentative = (type) => {
    const key = type === 'client' ? 'client' : 'spouse';
    const representatives = [...formData.pourOverRepresentatives[key], ''];
    updateFormData({
      pourOverRepresentatives: {
        ...formData.pourOverRepresentatives,
        [key]: representatives,
      },
    });
  };

  const handleRemoveRepresentative = (type, index) => {
    if (window.confirm('Are you sure you want to remove this representative?')) {
      const key = type === 'client' ? 'client' : 'spouse';
      const representatives = formData.pourOverRepresentatives[key].filter(
        (_, i) => i !== index
      );
      updateFormData({
        pourOverRepresentatives: {
          ...formData.pourOverRepresentatives,
          [key]: representatives,
        },
      });
    }
  };

  const handleRepresentativeChange = (type, index, value) => {
    const key = type === 'client' ? 'client' : 'spouse';
    const representatives = formData.pourOverRepresentatives[key].map((rep, i) =>
      i === index ? value : rep
    );
    updateFormData({
      pourOverRepresentatives: {
        ...formData.pourOverRepresentatives,
        [key]: representatives,
      },
    });
  };

  const renderRepresentativesList = (type, label) => {
    const representatives = formData.pourOverRepresentatives[type];

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">{label} Representatives</h3>

        {representatives.length === 0 ? (
          <div className="text-center py-6 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <p className="text-gray-500 mb-3 text-sm">
              No {label.toLowerCase()} representatives added yet
            </p>
            <Button onClick={() => handleAddRepresentative(type)} variant="primary" size="sm">
              Add {label} Representative
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {representatives.map((rep, index) => (
              <div
                key={index}
                className="flex items-end gap-3 p-3 bg-white border border-gray-200 rounded-lg"
              >
                <div className="flex-1">
                  <Autocomplete
                    label={`Representative ${index + 1}`}
                    value={rep}
                    onChange={(e) =>
                      handleRepresentativeChange(type, index, e.target.value)
                    }
                    onSelect={(value) =>
                      handleRepresentativeChange(type, index, value)
                    }
                    onBlur={(e) => addNameSuggestion(e.target.value)}
                    suggestions={getNameSuggestions()}
                    placeholder="Enter representative name"
                    required
                  />
                </div>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleRemoveRepresentative(type, index)}
                >
                  Remove
                </Button>
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
    <Card title="Pour Over Will Representatives" collapsible defaultOpen={false}>
      <div className="space-y-6">
        <p className="text-sm text-gray-600">
          Designate representatives who will administer the Pour Over Will. List them in
          order of preference.
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
        {(formData.pourOverRepresentatives.client.length > 0 ||
          formData.pourOverRepresentatives.spouse.length > 0) && (
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Total Representatives:</strong>{' '}
              {formData.pourOverRepresentatives.client.length}
              {formData.isJoint &&
                ` (Client) + ${formData.pourOverRepresentatives.spouse.length} (Spouse)`}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default PourOverWillSection;
