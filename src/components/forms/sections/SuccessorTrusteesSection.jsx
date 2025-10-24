import { useState } from 'react';
import { useFormContext } from '../../../context/FormContext';
import { Card, Input, Button, Autocomplete } from '../../common';
import { getNameSuggestions, addNameSuggestion } from '../../../services/autocompleteService';

const SuccessorTrusteesSection = () => {
  const { formData, updateFormData } = useFormContext();
  const trustees = formData.successorTrustees || [];
  const nameSuggestions = getNameSuggestions();

  const addTrustee = () => {
    updateFormData({
      successorTrustees: [
        ...trustees,
        { firstName: '', lastName: '', relationship: '' }
      ]
    });
  };

  const updateTrustee = (index, field, value) => {
    const updatedTrustees = [...trustees];
    updatedTrustees[index] = { ...updatedTrustees[index], [field]: value };
    updateFormData({ successorTrustees: updatedTrustees });

    // Add to autocomplete suggestions
    if ((field === 'firstName' || field === 'lastName') && value) {
      addNameSuggestion(value);
    }
  };

  const removeTrustee = (index) => {
    updateFormData({
      successorTrustees: trustees.filter((_, i) => i !== index)
    });
  };

  return (
    <Card>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Successor Trustees</h3>
            <p className="text-sm text-gray-600 mt-1">
              Trustees who will manage the trust if you become incapacitated or pass away
            </p>
          </div>
          <Button variant="primary" onClick={addTrustee}>
            + Add Trustee
          </Button>
        </div>

        {trustees.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No successor trustees added yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {trustees.map((trustee, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-3">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-700">
                    Successor Trustee {index + 1} {index === 0 ? '(Primary)' : ''}
                  </h4>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeTrustee(index)}
                  >
                    Remove
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <Autocomplete
                    label="First Name"
                    value={trustee.firstName || ''}
                    onChange={(e) => updateTrustee(index, 'firstName', e.target.value)}
                    onSelect={(value) => updateTrustee(index, 'firstName', value)}
                    suggestions={nameSuggestions}
                  />
                  <Autocomplete
                    label="Last Name"
                    value={trustee.lastName || ''}
                    onChange={(e) => updateTrustee(index, 'lastName', e.target.value)}
                    onSelect={(value) => updateTrustee(index, 'lastName', value)}
                    suggestions={nameSuggestions}
                  />
                  <Input
                    label="Relationship"
                    value={trustee.relationship || ''}
                    onChange={(e) => updateTrustee(index, 'relationship', e.target.value)}
                    placeholder="e.g., Son, Daughter, Friend"
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

export default SuccessorTrusteesSection;
