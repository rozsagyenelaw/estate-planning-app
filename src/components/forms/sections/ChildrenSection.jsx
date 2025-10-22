import { useFormContext } from '../../../context/FormContext';
import { Card, Button, Input, DatePicker, Select, Autocomplete } from '../../common';
import { DEFAULT_CHILD, RELATION_OPTIONS } from '../../../utils/constants';
import { getNameSuggestions } from '../../../services/autocompleteService';

const ChildrenSection = () => {
  const { formData, addArrayItem, updateArrayItem, removeArrayItem } = useFormContext();

  const handleAddChild = () => {
    addArrayItem('children', { ...DEFAULT_CHILD });
  };

  const handleRemoveChild = (index) => {
    if (window.confirm('Are you sure you want to remove this child?')) {
      removeArrayItem('children', index);
    }
  };

  const handleChildChange = (index, field, value) => {
    updateArrayItem('children', index, { [field]: value });
  };

  return (
    <Card title="Children" collapsible defaultOpen={false}>
      <div className="space-y-6">
        <p className="text-sm text-gray-600">
          Add all children and their information. This will be used for distribution and guardianship purposes.
        </p>

        {formData.children.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <p className="text-gray-500 mb-4">No children added yet</p>
            <Button onClick={handleAddChild} variant="primary">
              Add First Child
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {formData.children.map((child, index) => (
              <div
                key={index}
                className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-md font-semibold text-gray-800">
                    Child #{index + 1}
                  </h4>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleRemoveChild(index)}
                  >
                    Remove
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Autocomplete
                    label="Name"
                    value={child.name}
                    onChange={(e) => handleChildChange(index, 'name', e.target.value)}
                    onSelect={(value) => handleChildChange(index, 'name', value)}
                    suggestions={getNameSuggestions()}
                    placeholder="Enter child's full name"
                    required
                  />

                  <DatePicker
                    label="Birthday"
                    value={child.birthday}
                    onChange={(e) => handleChildChange(index, 'birthday', e.target.value)}
                    required
                  />

                  <Select
                    label="Relation"
                    options={RELATION_OPTIONS.filter(r =>
                      ['son', 'daughter', 'grandson', 'granddaughter'].includes(r.value)
                    )}
                    value={child.relation}
                    onChange={(e) => handleChildChange(index, 'relation', e.target.value)}
                    required
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {formData.children.length > 0 && (
          <div className="flex justify-center mt-4">
            <Button onClick={handleAddChild} variant="outline">
              + Add Another Child
            </Button>
          </div>
        )}

        {formData.children.length > 0 && (
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Total Children:</strong> {formData.children.length}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ChildrenSection;
