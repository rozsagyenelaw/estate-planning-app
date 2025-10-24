import { useFormContext } from '../../../context/FormContext';
import { Card } from '../../common';

const SpecificDistributionSection = () => {
  const { formData, updateFormData } = useFormContext();

  return (
    <Card>
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">SpecificDistributionSection</h3>
          <p className="text-sm text-gray-600 mt-1">
            Configure SpecificDistributionSection settings
          </p>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800">
            <strong>Placeholder:</strong> Add your specific form fields for SpecificDistributionSection here.
          </p>
        </div>
      </div>
    </Card>
  );
};

export default SpecificDistributionSection;
