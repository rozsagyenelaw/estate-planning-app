import { useState } from 'react';
import { useFormContext } from '../../context/FormContext';
import { Button, Card } from '../common';

// Import form sections
import TrustTypeSection from './sections/TrustTypeSection';
import ClientInfoSection from './sections/ClientInfoSection';
import TrustNameSection from './sections/TrustNameSection';
import ChildrenSection from './sections/ChildrenSection';
import SuccessorTrusteesSection from './sections/SuccessorTrusteesSection';

const EstatePlanningForm = () => {
  const { formData } = useFormContext();
  const [loading, setLoading] = useState(false);

  const handleGenerateTrust = async () => {
    setLoading(true);
    try {
      // TODO: Implement trust generation
      console.log('Generating trust...', formData);
      alert('Trust generation will be implemented with your document templates');
    } catch (error) {
      console.error('Error generating trust:', error);
      alert('Error generating trust');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateAllDocuments = async () => {
    setLoading(true);
    try {
      // TODO: Implement all documents generation
      console.log('Generating all documents...', formData);
      alert('Document generation will be implemented with your templates');
    } catch (error) {
      console.error('Error generating documents:', error);
      alert('Error generating documents');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-6">
        {/* Trust Type Selection */}
        <TrustTypeSection />

        {/* Client Information */}
        <ClientInfoSection />

        {/* Living Trust Name */}
        <TrustNameSection />

        {/* Children */}
        <ChildrenSection />

        {/* Successor Trustees */}
        <SuccessorTrusteesSection />

        {/* Specific Distribution */}
        <Card title="Specific Distribution" collapsible defaultOpen={false}>
          <p className="text-gray-600">Coming soon...</p>
        </Card>

        {/* Residuary Distribution */}
        <Card title="Residuary Distribution" collapsible defaultOpen={false}>
          <p className="text-gray-600">Coming soon...</p>
        </Card>

        {/* General Needs Trust */}
        <Card title="General Needs Trust" collapsible defaultOpen={false}>
          <p className="text-gray-600">Coming soon...</p>
        </Card>

        {/* Charitable Distribution */}
        <Card title="Charitable Distribution" collapsible defaultOpen={false}>
          <p className="text-gray-600">Coming soon...</p>
        </Card>

        {/* Pour Over Will Representatives */}
        <Card title="Pour Over Will Representatives" collapsible defaultOpen={false}>
          <p className="text-gray-600">Coming soon...</p>
        </Card>

        {/* Guardians */}
        <Card title="Guardians" collapsible defaultOpen={false}>
          <p className="text-gray-600">Coming soon...</p>
        </Card>

        {/* Durable Power of Attorney */}
        <Card title="Durable Power of Attorney" collapsible defaultOpen={false}>
          <p className="text-gray-600">Coming soon...</p>
        </Card>

        {/* Healthcare Power of Attorney */}
        <Card title="Healthcare Power of Attorney" collapsible defaultOpen={false}>
          <p className="text-gray-600">Coming soon...</p>
        </Card>

        {/* Anatomical Gifts */}
        <Card title="Anatomical Gifts" collapsible defaultOpen={false}>
          <p className="text-gray-600">Coming soon...</p>
        </Card>

        {/* Generate Buttons */}
        <Card>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="secondary"
              size="lg"
              onClick={handleGenerateTrust}
              loading={loading}
              disabled={loading}
            >
              Generate Living Trust
            </Button>
            <Button
              variant="primary"
              size="lg"
              onClick={handleGenerateAllDocuments}
              loading={loading}
              disabled={loading}
            >
              Generate Complete Estate Plan
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default EstatePlanningForm;
