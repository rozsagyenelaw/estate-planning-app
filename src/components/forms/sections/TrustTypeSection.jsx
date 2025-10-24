import { useFormContext } from '../../../context/FormContext';
import { Card, Input, Checkbox } from '../../common';
import { TRUST_TYPE_OPTIONS } from '../../../utils/constants';

const TrustTypeSection = () => {
  const { formData, updateFormData } = useFormContext();

  const handleTrustTypeChange = (value) => {
    const isJoint = value === 'joint' || value === 'joint_irrevocable';
    const isIrrevocable = value === 'single_irrevocable' || value === 'joint_irrevocable';

    updateFormData({
      trustType: value,
      isJoint,
      isIrrevocable
    });
  };

  const handleRestatementChange = (checked) => {
    updateFormData({
      isRestatement: checked,
      // Clear restatement fields if unchecking
      ...(checked ? {} : {
        originalTrustName: '',
        originalTrustDate: '',
      })
    });
  };

  const handleRestatementFieldChange = (field, value) => {
    updateFormData({
      [field]: value
    });
  };

  return (
    <>
      <Card>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Trust Type</h3>
            <p className="text-sm text-gray-600 mt-1">
              Select the type of trust you want to create
            </p>
          </div>

          <div className="space-y-3">
            {TRUST_TYPE_OPTIONS.map((option) => (
              <div key={option.value} className="flex items-start">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id={`trustType-${option.value}`}
                    name="trustType"
                    value={option.value}
                    checked={formData.trustType === option.value}
                    onChange={() => handleTrustTypeChange(option.value)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <label
                    htmlFor={`trustType-${option.value}`}
                    className="ml-3 block text-sm font-medium text-gray-900"
                  >
                    {option.label}
                  </label>
                </div>
                <p className="ml-7 text-xs text-gray-500 mt-0.5">{option.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Restatement Section */}
      <Card>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Trust Restatement</h3>
            <p className="text-sm text-gray-600 mt-1">
              Check this if you are restating an existing trust
            </p>
          </div>

          <Checkbox
            label="This is a restatement of an existing trust"
            checked={formData.isRestatement || false}
            onChange={(e) => handleRestatementChange(e.target.checked)}
          />

          {formData.isRestatement && (
            <div className="space-y-4 pl-6 border-l-2 border-blue-200">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-sm text-blue-800">
                  <strong>Restatement:</strong> A restatement replaces and supersedes all prior versions
                  of the trust while maintaining the original trust date.
                </p>
              </div>

              <Input
                label="Original Trust Name"
                value={formData.originalTrustName || ''}
                onChange={(e) => handleRestatementFieldChange('originalTrustName', e.target.value)}
                placeholder="e.g., The John Smith Living Trust"
                required={formData.isRestatement}
              />

              <Input
                label="Original Trust Date"
                type="date"
                value={formData.originalTrustDate || ''}
                onChange={(e) => handleRestatementFieldChange('originalTrustDate', e.target.value)}
                required={formData.isRestatement}
              />

              <div className="text-sm text-gray-600">
                The restatement date will be set to today's date automatically.
              </div>
            </div>
          )}
        </div>
      </Card>
    </>
  );
};

export default TrustTypeSection;
