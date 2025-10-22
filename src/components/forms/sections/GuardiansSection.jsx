import { useFormContext } from '../../../context/FormContext';
import { Card, Button, Checkbox, Autocomplete, Input } from '../../common';
import { DEFAULT_GUARDIAN } from '../../../utils/constants';
import {
  getNameSuggestions,
  getAddressSuggestions,
  getPhoneSuggestions,
} from '../../../services/autocompleteService';
import { formatPhoneNumber } from '../../../utils/formatters';

const GuardiansSection = () => {
  const { formData, addArrayItem, updateArrayItem, removeArrayItem } = useFormContext();
  const guardians = formData.guardians || [];

  const handleAddGuardian = () => {
    addArrayItem('guardians', { ...DEFAULT_GUARDIAN });
  };

  const handleRemoveGuardian = (index) => {
    if (window.confirm('Are you sure you want to remove this guardian?')) {
      removeArrayItem('guardians', index);
    }
  };

  const handleGuardianChange = (index, field, value) => {
    if (field === 'phone') {
      value = formatPhoneNumber(value);
    }
    updateArrayItem('guardians', index, { [field]: value });
  };

  return (
    <Card title="Guardians" collapsible defaultOpen={false}>
      <div className="space-y-6">
        <p className="text-sm text-gray-600">
          Designate guardians for any minor children. Guardians will have custody and care
          of minor children if both parents are deceased. List them in order of preference.
        </p>

        {guardians.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <p className="text-gray-500 mb-4">No guardians added yet</p>
            <Button onClick={handleAddGuardian} variant="primary">
              Add First Guardian
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {guardians.map((guardian, index) => (
              <div
                key={index}
                className="p-4 bg-white border-2 border-orange-300 rounded-lg shadow-sm"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-md font-semibold text-gray-800">
                      Guardian #{index + 1}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {index === 0
                        ? 'First choice'
                        : `${index + 1}${
                            index === 1 ? 'nd' : index === 2 ? 'rd' : 'th'
                          } choice`}
                    </p>
                  </div>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleRemoveGuardian(index)}
                  >
                    Remove
                  </Button>
                </div>

                <div className="space-y-4">
                  <Autocomplete
                    label="Name"
                    value={guardian.name}
                    onChange={(e) => handleGuardianChange(index, 'name', e.target.value)}
                    onSelect={(value) => handleGuardianChange(index, 'name', value)}
                    suggestions={getNameSuggestions()}
                    placeholder="Enter guardian's full name"
                    required
                  />

                  <Autocomplete
                    label="Address"
                    value={guardian.address}
                    onChange={(e) =>
                      handleGuardianChange(index, 'address', e.target.value)
                    }
                    onSelect={(value) => handleGuardianChange(index, 'address', value)}
                    suggestions={getAddressSuggestions()}
                    placeholder="Enter guardian's address"
                    required
                  />

                  <Input
                    label="Phone Number"
                    value={guardian.phone}
                    onChange={(e) => handleGuardianChange(index, 'phone', e.target.value)}
                    placeholder="(XXX) XXX-XXXX"
                    maxLength={14}
                    required
                  />

                  <Checkbox
                    label="Jointly (Check if this guardian must serve jointly with the next guardian)"
                    checked={guardian.jointly}
                    onChange={(e) =>
                      handleGuardianChange(index, 'jointly', e.target.checked)
                    }
                    helperText="If checked, this guardian and the next one must serve together"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {guardians.length > 0 && (
          <div className="flex justify-center mt-4">
            <Button onClick={handleAddGuardian} variant="outline">
              + Add Another Guardian
            </Button>
          </div>
        )}

        {guardians.length > 0 && (
          <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
            <p className="text-sm text-orange-800">
              <strong>Total Guardians:</strong> {guardians.length}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default GuardiansSection;
