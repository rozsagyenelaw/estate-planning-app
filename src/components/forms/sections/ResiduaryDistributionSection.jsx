import { useFormContext } from '../../../context/FormContext';
import { Card } from '../../common';

const ResiduaryDistributionSection = () => {
  const { formData, updateFormData } = useFormContext();

  return (
    <Card>
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">ResiduaryDistributionSection</h3>
          <p className="text-sm text-gray-600 mt-1">
            Configure ResiduaryDistributionSection settings
          </p>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800">
            <strong>Placeholder:</strong> Add your specific form fields for ResiduaryDistributionSection here.
          </p>
        </div>
      </div>
    </Card>
  );
};

export default ResiduaryDistributionSection;
