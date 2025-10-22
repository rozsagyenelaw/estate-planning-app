import { useFormContext } from '../../../context/FormContext';
import { Card, Radio, Checkbox, Input, DatePicker } from '../../common';
import { TRUST_TYPE_OPTIONS } from '../../../utils/constants';

const TrustTypeSection = () => {
  const { formData, updateFormData, setTrustType } = useFormContext();

  const handleTrustTypeChange = (e) => {
    setTrustType(e.target.value);
  };

  const handleRestatementChange = (e) => {
    updateFormData({ isRestatement: e.target.checked });
  };

  // Get current trust type label for display
  const getCurrentTypeLabel = () => {
    const selectedOption = TRUST_TYPE_OPTIONS.find(opt => opt.value === formData.trustType);
    return selectedOption ? selectedOption.label : 'Single Trust (Revocable)';
  };

  return (
    <Card title="Trust Type Configuration">
      <div className="space-y-6">
        <Radio
          label="Select Trust Type"
          name="trustType"
          options={TRUST_TYPE_OPTIONS}
          value={formData.trustType}
          onChange={handleTrustTypeChange}
          required
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
            <strong>Current Selection:</strong> {getCurrentTypeLabel()}
            {formData.isRestatement && ' (Restatement)'}
          </p>
          {(formData.trustType === 'single_irrevocable' || formData.trustType === 'joint_irrevocable') && (
            <p className="text-sm text-orange-700 mt-2">
              <strong>Note:</strong> Irrevocable trusts cannot be amended or revoked. The grantor(s) cannot serve as trustee.
            </p>
          )}
        </div>
      </div>
    </Card>
  );
};

export default TrustTypeSection;
