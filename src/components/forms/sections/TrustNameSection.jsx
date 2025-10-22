import { useEffect } from 'react';
import { useFormContext } from '../../../context/FormContext';
import { Card, Checkbox, Input } from '../../common';
import { generateTrustName } from '../../../utils/formatters';

const TrustNameSection = () => {
  const { formData, updateFormData } = useFormContext();

  // Auto-generate trust name when not using custom name
  useEffect(() => {
    if (!formData.customTrustName && formData.client.name) {
      const autoName = generateTrustName(
        formData.client.name,
        formData.spouse?.name,
        formData.isJoint
      );
      updateFormData({ trustName: autoName });
    }
  }, [
    formData.customTrustName,
    formData.client.name,
    formData.spouse?.name,
    formData.isJoint,
  ]);

  const handleCustomNameToggle = (e) => {
    const isCustom = e.target.checked;
    updateFormData({ customTrustName: isCustom });

    // If switching back to auto-generate, create the name
    if (!isCustom && formData.client.name) {
      const autoName = generateTrustName(
        formData.client.name,
        formData.spouse?.name,
        formData.isJoint
      );
      updateFormData({ trustName: autoName });
    }
  };

  return (
    <Card title="Living Trust Name" collapsible defaultOpen={true}>
      <div className="space-y-4">
        <Checkbox
          label="Custom Living Trust Name (Check to enter a custom name)"
          checked={formData.customTrustName}
          onChange={handleCustomNameToggle}
        />

        {formData.customTrustName ? (
          <Input
            label="Trust Name"
            value={formData.trustName}
            onChange={(e) => updateFormData({ trustName: e.target.value })}
            placeholder="Enter custom trust name"
            required
          />
        ) : (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-800">
              <strong>Auto-Generated Trust Name:</strong>
            </p>
            <p className="text-lg font-semibold text-green-900 mt-2">
              {formData.trustName || 'Enter client name to generate trust name'}
            </p>
          </div>
        )}

        <div className="text-xs text-gray-500 mt-2">
          {formData.isJoint ? (
            <p>For joint trusts, the format will be: "[Client Name] & [Spouse Name] Family Trust"</p>
          ) : (
            <p>For single trusts, the format will be: "[Client Name] Living Trust"</p>
          )}
        </div>
      </div>
    </Card>
  );
};

export default TrustNameSection;
