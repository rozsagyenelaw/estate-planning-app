import { useEffect } from 'react';
import { useFormContext } from '../../../context/FormContext';
import { Card, Checkbox, Input } from '../../common';
import { generateTrustName } from '../../../utils/formatters';

const TrustNameSection = () => {
  const { formData, updateFormData } = useFormContext();

  // Debug: log formData changes
  console.log('TrustNameSection - formData.isRestatement:', formData.isRestatement);
  console.log('TrustNameSection - formData.customTrustName:', formData.customTrustName);

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
      <div className="space-y-6">
        {/* Show restatement fields first if restatement is active */}
        {formData.isRestatement && (
          <div className="p-4 bg-yellow-50 border-2 border-yellow-400 rounded-lg space-y-4">
            <div className="flex items-start gap-2">
              <span className="text-2xl">📋</span>
              <div>
                <h4 className="font-semibold text-yellow-900 text-lg">Restatement Information</h4>
                <p className="text-sm text-yellow-800 mt-1">
                  Enter the EXACT name and date of the original trust being restated
                </p>
              </div>
            </div>

            <Input
              label="Original Trust Name (Exact Name)"
              value={formData.originalTrustName || ''}
              onChange={(e) => updateFormData({ originalTrustName: e.target.value })}
              placeholder='e.g., "The Smith Family Trust"'
              required
              className="bg-white"
            />

            <Input
              label="Original Trust Date (Include if part of the trust name)"
              value={formData.originalTrustDate || ''}
              onChange={(e) => updateFormData({ originalTrustDate: e.target.value })}
              placeholder='e.g., "dated January 15, 2010" or "01/15/2010"'
              required
              className="bg-white"
            />

            <div className="text-xs text-yellow-700 bg-yellow-100 p-2 rounded">
              <strong>Example:</strong> If the original trust was "The Smith Family Trust dated January 15, 2010",
              enter the exact name above and the date as it appears in the original document.
            </div>
          </div>
        )}

        {/* Regular trust name section */}
        <div className="space-y-4">
          <Checkbox
            label="Use Custom Living Trust Name (Check to enter your own trust name)"
            checked={formData.customTrustName}
            onChange={handleCustomNameToggle}
          />

          {formData.customTrustName ? (
            <div className="space-y-2">
              <Input
                label="Custom Trust Name"
                value={formData.trustName}
                onChange={(e) => updateFormData({ trustName: e.target.value })}
                placeholder='e.g., "The Johnson Family Trust" or "Jane Doe Living Trust"'
                required
              />
              <p className="text-xs text-gray-600 italic">
                💡 Tip: Include "Living Trust" or "Family Trust" in the name
              </p>
            </div>
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

          <div className="text-xs text-gray-500 mt-2 bg-gray-50 p-3 rounded">
            <strong>Auto-generation format:</strong>
            {formData.isJoint ? (
              <p className="mt-1">Joint trusts: "[Client Name] & [Spouse Name] Family Trust"</p>
            ) : (
              <p className="mt-1">Single trusts: "[Client Name] Living Trust"</p>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TrustNameSection;
