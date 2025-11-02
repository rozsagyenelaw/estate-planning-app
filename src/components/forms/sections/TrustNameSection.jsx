import { useFormContext } from '../../../context/FormContext';
import { Card, Input } from '../../common';

const TrustNameSection = () => {
  const { formData, updateFormData } = useFormContext();

  // Get today's date in YYYY-MM-DD format for the date input default
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  return (
    <Card>
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Trust Information</h3>
          <p className="text-sm text-gray-600 mt-1">
            Enter the trust name and date
          </p>
        </div>

        <Input
          label="Trust Name (Optional)"
          name="trustName"
          value={formData.trustName || ''}
          onChange={(e) => updateFormData({ trustName: e.target.value })}
          placeholder={formData.isJoint
            ? `The ${formData.client?.firstName || ''} ${formData.client?.lastName || ''} and ${formData.spouse?.firstName || ''} ${formData.spouse?.lastName || ''} Living Trust`
            : `The ${formData.client?.firstName || ''} ${formData.client?.lastName || ''} Living Trust`
          }
        />

        <Input
          label="Trust Date"
          name="trustDate"
          type="date"
          value={formData.trustDate || formData.currentDate || getTodayDate()}
          onChange={(e) => updateFormData({
            trustDate: e.target.value,
            currentDate: e.target.value
          })}
          required
        />

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>Trust Name:</strong> If you leave this blank, the trust name will be automatically generated using the client names and trust date.
          </p>
          <p className="text-sm text-blue-800 mt-2">
            <strong>Trust Date:</strong> This is the effective date of the trust (defaults to today's date).
          </p>
        </div>
      </div>
    </Card>
  );
};

export default TrustNameSection;
