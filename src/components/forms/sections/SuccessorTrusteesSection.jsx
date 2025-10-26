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

        {trustees.length > 1 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <label className="block text-sm font-semibold text-gray-800 mb-3">
              How should successor trustees serve?
            </label>
            <div className="space-y-2">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="trusteesServeType"
                  value="together"
                  checked={formData.trusteesServeType === 'together'}
                  onChange={(e) => updateFormData({ trusteesServeType: e.target.value })}
                  className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">
                  <strong>Together (Co-Trustees)</strong> - All trustees serve jointly and must agree on decisions
                </span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="trusteesServeType"
                  value="sequential"
                  checked={formData.trusteesServeType === 'sequential'}
                  onChange={(e) => updateFormData({ trusteesServeType: e.target.value })}
                  className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">
                  <strong>After Each Other (Sequential)</strong> - Trustees serve one at a time in the order listed
                </span>
              </label>
            </div>
          </div>
        )}

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
