import { useState } from 'react';
import { useFormContext } from '../../context/FormContext';
import { Button, Card } from '../common';
import { generateLivingTrust, generateAllDocuments, downloadDocument } from '../../services/documentGenerator';
import { sampleFormData } from '../../utils/testDocumentGeneration';

// Import form sections
import TrustTypeSection from './sections/TrustTypeSection';
import ClientInfoSection from './sections/ClientInfoSection';
import TrustNameSection from './sections/TrustNameSection';
import ChildrenSection from './sections/ChildrenSection';
import SuccessorTrusteesSection from './sections/SuccessorTrusteesSection';
import SpecificDistributionSection from './sections/SpecificDistributionSection';
import ResiduaryDistributionSection from './sections/ResiduaryDistributionSection';
import GeneralNeedsTrustSection from './sections/GeneralNeedsTrustSection';
import CharitableDistributionSection from './sections/CharitableDistributionSection';
import PourOverWillSection from './sections/PourOverWillSection';
import GuardiansSection from './sections/GuardiansSection';
import DurablePOASection from './sections/DurablePOASection';
import HealthcarePOASection from './sections/HealthcarePOASection';
import AnatomicalGiftsSection from './sections/AnatomicalGiftsSection';

const EstatePlanningForm = () => {
  const { formData, setFormData } = useFormContext();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  const handleGenerateTrust = async () => {
    setLoading(true);
    setStatus('Generating Living Trust document...');
    try {
      const doc = await generateLivingTrust(formData);
      const filename = `${formData.trustName || 'Living_Trust'}_${new Date().toISOString().split('T')[0]}.pdf`;
      downloadDocument(doc, filename);
      setStatus('Living Trust generated successfully!');
      setTimeout(() => setStatus(''), 3000);
    } catch (error) {
      console.error('Error generating trust:', error);
      setStatus('Error generating trust. Please check the console for details.');
      setTimeout(() => setStatus(''), 5000);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateAllDocuments = async () => {
    setLoading(true);
    setStatus('Generating all estate planning documents...');
    try {
      const documents = await generateAllDocuments(formData);
      documents.forEach(({ name, doc }) => {
        downloadDocument(doc, name);
      });
      setStatus(`Successfully generated ${documents.length} documents!`);
      setTimeout(() => setStatus(''), 3000);
    } catch (error) {
      console.error('Error generating documents:', error);
      setStatus('Error generating documents. Please check the console for details.');
      setTimeout(() => setStatus(''), 5000);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadSampleData = () => {
    if (window.confirm('Load sample data? This will replace all current form data.')) {
      setFormData(sampleFormData);
      setStatus('Sample data loaded successfully!');
      setTimeout(() => setStatus(''), 3000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-6">
        {/* Test Data Button */}
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Quick Test</h3>
              <p className="text-sm text-gray-600 mt-1">
                Load sample data to quickly test document generation
              </p>
            </div>
            <Button
              variant="outline"
              onClick={handleLoadSampleData}
              disabled={loading}
            >
              Load Sample Data
            </Button>
          </div>
        </Card>

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
        <SpecificDistributionSection />

        {/* Residuary Distribution */}
        <ResiduaryDistributionSection />

        {/* General Needs Trust */}
        <GeneralNeedsTrustSection />

        {/* Charitable Distribution */}
        <CharitableDistributionSection />

        {/* Pour Over Will Representatives */}
        <PourOverWillSection />

        {/* Guardians */}
        <GuardiansSection />

        {/* Durable Power of Attorney */}
        <DurablePOASection />

        {/* Healthcare Power of Attorney */}
        <HealthcarePOASection />

        {/* Anatomical Gifts */}
        <AnatomicalGiftsSection />

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

          {/* Status Message */}
          {status && (
            <div className={`mt-4 p-3 rounded-lg text-center ${
              status.includes('Error')
                ? 'bg-red-50 text-red-800 border border-red-200'
                : 'bg-green-50 text-green-800 border border-green-200'
            }`}>
              {status}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default EstatePlanningForm;
