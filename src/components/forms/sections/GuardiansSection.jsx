import { useState } from 'react';
import { useFormContext } from '../../../context/FormContext';
import { Card, Input, Button, Autocomplete } from '../../common';
import { getNameSuggestions, addNameSuggestion } from '../../../services/autocompleteService';

const GuardiansSection = () => {
  const { formData, updateFormData } = useFormContext();
  const guardians = formData.guardians || [];
  const nameSuggestions = getNameSuggestions();

  const addGuardian = () => {
    updateFormData({
      guardians: [
        ...guardians,
        { firstName: '', lastName: '', relationship: '' }
      ]
    });
  };

  const updateGuardian = (index, field, value) => {
    const updatedGuardians = [...guardians];
    updatedGuardians[index] = { ...updatedGuardians[index], [field]: value };
    updateFormData({ guardians: updatedGuardians });

    // Add to autocomplete suggestions
    if ((field === 'firstName' || field === 'lastName') && value) {
      addNameSuggestion(value);
    }
  };

  const removeGuardian = (index) => {
    updateFormData({
      guardians: guardians.filter((_, i) => i !== index)
    });
  };

  return (
    <Card>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Guardians for Minor Children</h3>
            <p className="text-sm text-gray-600 mt-1">
              Designate guardians to care for minor children
            </p>
          </div>
          <Button variant="primary" onClick={addGuardian}>
            + Add Guardian
          </Button>
        </div>

        {guardians.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No guardians added yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {guardians.map((guardian, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-3">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-700">
                    Guardian {index + 1} {index === 0 ? '(Primary)' : ''}
                  </h4>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeGuardian(index)}
                  >
                    Remove
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <Autocomplete
                    label="First Name"
                    value={guardian.firstName || ''}
                    onChange={(e) => updateGuardian(index, 'firstName', e.target.value)}
                    onSelect={(value) => updateGuardian(index, 'firstName', value)}
                    suggestions={nameSuggestions}
                  />
                  <Autocomplete
                    label="Last Name"
                    value={guardian.lastName || ''}
                    onChange={(e) => updateGuardian(index, 'lastName', e.target.value)}
                    onSelect={(value) => updateGuardian(index, 'lastName', value)}
                    suggestions={nameSuggestions}
                  />
                  <Input
                    label="Relationship"
                    value={guardian.relationship || ''}
                    onChange={(e) => updateGuardian(index, 'relationship', e.target.value)}
                    placeholder="e.g., Sister, Brother, Friend"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};

export default GuardiansSection;
