import { useFormContext } from '../../../context/FormContext';
import { Card, Checkbox, Input, DatePicker } from '../../common';

const TrustTypeSection = () => {
  const { formData, updateFormData, toggleTrustType } = useFormContext();

  const handleJointChange = (e) => {
    toggleTrustType(e.target.checked);
  };

  const handleRestatementChange = (e) => {
    updateFormData({ isRestatement: e.target.checked });
  };

  return (
    <Card title="Trust Type Configuration">
      <div className="space-y-4">
        <Checkbox
          label="Joint Documents (Check if creating joint trust with spouse)"
          checked={formData.isJoint}
          onChange={handleJointChange}
        />

        <Checkbox
          label="Restatement (Check if this is a restatement of an existing trust)"
          checked={formData.isRestatement}
          onChange={handleRestatementChange}
        />

        {formData.isRestatement && (
          <div className="ml-6 space-y-4 p-4 bg-gray-50 rounded-lg">
            <Input
              label="Original Trust Name"
              value={formData.originalTrustName}
              onChange={(e) => updateFormData({ originalTrustName: e.target.value })}
              placeholder="Enter original trust name"
              required
            />

            <DatePicker
              label="Original Trust Date"
              value={formData.originalTrustDate}
              onChange={(e) => updateFormData({ originalTrustDate: e.target.value })}
              required
            />
          </div>
        )}

        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Current Selection:</strong> {formData.isJoint ? 'Joint Trust' : 'Single Trust'}
            {formData.isRestatement && ' (Restatement)'}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default TrustTypeSection;
