import { useFormContext } from '../../../context/FormContext';
import { Card, Radio } from '../../common';

const TrustTypeSection = () => {
  const { formData, updateFormData } = useFormContext();

  const handleTrustTypeChange = (value) => {
    updateFormData({ 
      isJoint: value === 'joint',
      trustType: value
    });
  };

  return (
    <Card>
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Trust Type</h3>
          <p className="text-sm text-gray-600 mt-1">
            Select whether this is a single or joint trust
          </p>
        </div>

        <div className="space-y-3">
          <Radio
            label="Single Trust"
            name="trustType"
            value="single"
            checked={formData.trustType === 'single' || (!formData.isJoint && !formData.trustType)}
            onChange={() => handleTrustTypeChange('single')}
          />
          <Radio
            label="Joint Trust (Married Couple)"
            name="trustType"
            value="joint"
            checked={formData.isJoint || formData.trustType === 'joint'}
            onChange={() => handleTrustTypeChange('joint')}
          />
        </div>
      </div>
    </Card>
  );
};

export default TrustTypeSection;
