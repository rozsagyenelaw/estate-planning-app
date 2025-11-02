import { useFormContext } from '../../../context/FormContext';
import { Card, Input, Select, Button, Autocomplete } from '../../common';
import { parseFullName, combineNameParts } from '../../../utils/nameParser';

const ChildrenSection = () => {
  const { formData, updateFormData } = useFormContext();
  const children = formData.children || [];

  const addChild = () => {
    updateFormData({
      children: [
        ...children,
        { firstName: '', middleName: '', lastName: '', dateOfBirth: '', gender: '', relation: 'child' }
      ]
    });
  };

  const updateChild = (index, field, value) => {
    const updatedChildren = [...children];
    updatedChildren[index] = { ...updatedChildren[index], [field]: value };
    updateFormData({ children: updatedChildren });
  };

  // Update raw input without parsing
  const updateChildFullNameInput = (index, fullName) => {
    const updatedChildren = [...children];
    updatedChildren[index] = {
      ...updatedChildren[index],
      fullName: fullName, // Store raw input
    };
    updateFormData({ children: updatedChildren });
  };

  // Parse name when done typing (on blur or select)
  const parseChildFullName = (index, fullName) => {
    const parsed = parseFullName(fullName);
    const updatedChildren = [...children];
    updatedChildren[index] = {
      ...updatedChildren[index],
      fullName: fullName,
      firstName: parsed.firstName,
      middleName: parsed.middleName,
      lastName: parsed.lastName,
    };
    updateFormData({ children: updatedChildren });
  };

  const removeChild = (index) => {
    updateFormData({
      children: children.filter((_, i) => i !== index)
    });
  };

  return (
    <Card>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Children</h3>
            <p className="text-sm text-gray-600 mt-1">
              Add information about children who will be beneficiaries
            </p>
          </div>
          <Button variant="primary" onClick={addChild}>
            + Add Child
          </Button>
        </div>

        {children.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No children added yet. Click "Add Child" to begin.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {children.map((child, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-3">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-700">Child {index + 1}</h4>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeChild(index)}
                  >
                    Remove
                  </Button>
                </div>

                <Autocomplete
                  label="Full Name"
                  value={child.fullName !== undefined ? child.fullName : combineNameParts(child.firstName, child.middleName, child.lastName)}
                  onChange={(e) => updateChildFullNameInput(index, e.target.value)}
                  onSelect={(value) => parseChildFullName(index, value)}
                  onBlur={(e) => parseChildFullName(index, e.target.value)}
                  placeholder="e.g., Emily Rose Johnson"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Input
                    label="Date of Birth"
                    type="date"
                    value={child.dateOfBirth || ''}
                    onChange={(e) => updateChild(index, 'dateOfBirth', e.target.value)}
                  />
                  <Select
                    label="Gender"
                    value={child.gender || ''}
                    onChange={(e) => updateChild(index, 'gender', e.target.value)}
                    options={[
                      { value: '', label: 'Select gender' },
                      { value: 'male', label: 'Male' },
                      { value: 'female', label: 'Female' },
                      { value: 'other', label: 'Other/Prefer not to specify' }
                    ]}
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

export default ChildrenSection;
