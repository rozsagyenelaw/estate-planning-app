import { useState } from 'react';
import { useFormContext } from '../../../context/FormContext';
import { Card, Input, Select, Button, Autocomplete } from '../../common';
import { parseFullName, combineNameParts } from '../../../utils/nameParser';

const SuccessorTrusteesSection = () => {
  const { formData, updateFormData } = useFormContext();
  const trustees = formData.successorTrustees || [];

  const addTrustee = () => {
    updateFormData({
      successorTrustees: [
        ...trustees,
        { firstName: '', middleName: '', lastName: '', relationship: '' }
      ]
    });
  };

  const updateTrustee = (index, field, value) => {
    const updatedTrustees = [...trustees];
    updatedTrustees[index] = { ...updatedTrustees[index], [field]: value };
    updateFormData({ successorTrustees: updatedTrustees });
  };

  // Store raw input without parsing
  const updateTrusteeFullNameInput = (index, fullName) => {
    const updatedTrustees = [...trustees];
    updatedTrustees[index] = {
      ...updatedTrustees[index],
      fullName: fullName, // Store raw input
    };
    updateFormData({ successorTrustees: updatedTrustees });
  };

  // Parse name when done typing (on blur or select)
  const parseTrusteeFullName = (index, fullName) => {
    const parsed = parseFullName(fullName);
    const updatedTrustees = [...trustees];
    updatedTrustees[index] = {
      ...updatedTrustees[index],
      fullName: fullName,
      firstName: parsed.firstName,
      middleName: parsed.middleName,
      lastName: parsed.lastName,
    };
    updateFormData({ successorTrustees: updatedTrustees });
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
              Trustee Grouping
            </label>
            <p className="text-xs text-gray-600 mb-3">
              Use the "Group Type" dropdown to create joint groups. Select "Joint with following trustees" to start/continue a group. Select "Stop group here" to end the current group.
            </p>
            <div className="text-xs text-gray-500 space-y-1">
              <div><strong>Example 1:</strong> Trustee 1 (Joint) + Trustee 2 (Stop) = Trustees 1 &amp; 2 serve jointly or the survivor of them, then Trustee 3 (Stop) = Trustee 3 serves alone</div>
              <div><strong>Example 2:</strong> Trustee 1 (Joint) + Trustee 2 (Joint) + Trustee 3 (Stop) = All 3 serve jointly or the survivor of them</div>
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Autocomplete
                    label="Full Name"
                    value={trustee.fullName !== undefined ? trustee.fullName : combineNameParts(trustee.firstName, trustee.middleName, trustee.lastName)}
                    onChange={(e) => updateTrusteeFullNameInput(index, e.target.value)}
                    onSelect={(value) => parseTrusteeFullName(index, value)}
                    onBlur={(e) => parseTrusteeFullName(index, e.target.value)}
                    placeholder="e.g., John Michael Smith"
                  />
                  <Input
                    label="Relationship"
                    value={trustee.relationship || ''}
                    onChange={(e) => updateTrustee(index, 'relationship', e.target.value)}
                    placeholder="e.g., Son, Daughter, Friend"
                  />
                </div>

                {trustees.length > 1 && (
                  <Select
                    label="Group Type"
                    value={trustee.groupType || 'individual'}
                    onChange={(e) => updateTrustee(index, 'groupType', e.target.value)}
                    options={[
                      {
                        value: 'individual',
                        label: index === trustees.length - 1
                          ? 'Last trustee (automatically ends group)'
                          : 'Stop group here (end joint group or serve alone)'
                      },
                      {
                        value: 'joint',
                        label: index === trustees.length - 1
                          ? 'Last trustee (automatically ends group)'
                          : 'Joint with following trustees'
                      }
                    ]}
                    disabled={index === trustees.length - 1}
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};

export default SuccessorTrusteesSection;
