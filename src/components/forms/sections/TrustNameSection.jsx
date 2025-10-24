import { useFormContext } from '../../../context/FormContext';
import { Card, Input } from '../../common';

const TrustNameSection = () => {
  const { formData, updateFormData } = useFormContext();

  return (
    <Card>
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Trust Name</h3>
          <p className="text-sm text-gray-600 mt-1">
            The name of your living trust (will be auto-generated if left blank)
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

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> If you leave this blank, the trust name will be automatically generated using the client names and current date.
          </p>
        </div>
      </div>
    </Card>
  );
};

export default TrustNameSection;
