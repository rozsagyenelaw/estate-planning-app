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
          <div className="ml-6 p-4 bg-yellow-50 border border-yellow-300 rounded-lg">
            <p className="text-sm text-yellow-800 font-semibold">
              ⚠️ Restatement Mode Active
            </p>
            <p className="text-xs text-yellow-700 mt-1">
              You will be asked to provide the exact original trust name and date in the Trust Name section below.
            </p>
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
