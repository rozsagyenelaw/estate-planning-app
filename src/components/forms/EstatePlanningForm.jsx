import { useState } from 'react';
import { useFormContext } from '../../context/FormContext';
import { Button, Card } from '../common';
import { generateLivingTrust, generateLivingTrustWord, generateAllDocuments, generateCompleteEstatePlanningPackage, generateCompleteEstatePlanningPackageWord, downloadDocument } from '../../services/documentGenerator';
import { sampleFormData } from '../../utils/testDocumentGeneration';
import { saveFormDraft } from '../../services/autocompleteService';
import { saveClientWithDocuments, saveClientWithLivingTrust } from '../../services/clientDocumentService';

// Import form sections
import LoadClientSection from './sections/LoadClientSection';
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
  const [savedLivingTrust, setSavedLivingTrust] = useState(null);
  const [savedCompletePlan, setSavedCompletePlan] = useState(null);
  const [saveProgress, setSaveProgress] = useState({ percent: 0, message: '' });

  // Load sample data for testing
  const loadSampleData = () => {
    setFormData(sampleFormData);
    setStatus('Sample data loaded successfully!');
    setTimeout(() => setStatus(''), 3000);
  };

  const handleGenerateTrust = async () => {
    setLoading(true);
    setStatus('Generating Living Trust PDF...');
    try {
      const doc = await generateLivingTrust(formData);
      const filename = `${formData.trustName || 'Living_Trust'}_${new Date().toISOString().split('T')[0]}.pdf`;
      downloadDocument(doc, filename);
      setStatus('Living Trust PDF generated successfully!');
      setTimeout(() => setStatus(''), 3000);
    } catch (error) {
      console.error('Error generating trust:', error);
      setStatus('Error generating trust. Please check the console for details.');
      setTimeout(() => setStatus(''), 5000);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateTrustWord = async () => {
    setLoading(true);
    setStatus('Generating Living Trust Word document...');
    try {
      const blob = await generateLivingTrustWord(formData);
      const filename = `${formData.trustName || 'Living_Trust'}_${new Date().toISOString().split('T')[0]}.docx`;

      // Create download link for Blob
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setStatus('Living Trust Word document generated successfully!');
      setTimeout(() => setStatus(''), 3000);
    } catch (error) {
      console.error('Error generating Word document:', error);
      setStatus('Error generating Word document. Please check the console for details.');
      setTimeout(() => setStatus(''), 5000);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateAllDocuments = async () => {
    setLoading(true);
    setStatus('Generating complete estate planning package (PDF)...');
    try {
      const completePDF = await generateCompleteEstatePlanningPackage(formData);
      const clientName = formData.client.firstName + '_' + formData.client.lastName;
      const filename = `${clientName}_Complete_Estate_Planning_Package.pdf`;
      downloadDocument(completePDF, filename);
      setStatus('Successfully generated complete estate planning package (PDF)!');
      setTimeout(() => setStatus(''), 3000);
    } catch (error) {
      console.error('Error generating documents:', error);
      setStatus('Error generating documents. Please check the console for details.');
      setTimeout(() => setStatus(''), 5000);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateAllDocumentsWord = async () => {
    setLoading(true);
    setStatus('Generating complete estate planning package (Word)...');
    try {
      const blob = await generateCompleteEstatePlanningPackageWord(formData);
      const clientName = formData.client.firstName + '_' + formData.client.lastName;
      const filename = `${clientName}_Complete_Estate_Planning_Package.docx`;

      // Create download link for Blob
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setStatus('Successfully generated complete estate planning package (Word)!');
      setTimeout(() => setStatus(''), 3000);
    } catch (error) {
      console.error('Error generating Word document:', error);
      setStatus('Error generating Word document. Please check the console for details.');
      setTimeout(() => setStatus(''), 5000);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveForm = () => {
    const success = saveFormDraft(formData);
    if (success) {
      setStatus('Form data saved successfully!');
      setTimeout(() => setStatus(''), 3000);
    } else {
      setStatus('Error saving form data. Please try again.');
      setTimeout(() => setStatus(''), 5000);
    }
  };

  const handleSaveLivingTrust = async () => {
    setLoading(true);
    setSavedLivingTrust(null);
    setStatus('Saving Living Trust to database...');

    try {
      const result = await saveClientWithLivingTrust(
        formData,
        (progress) => {
          setSaveProgress(progress);
          setStatus(`${progress.message} (${Math.round(progress.percent)}%)`);
        }
      );

      if (result.success) {
        setSavedLivingTrust({
          clientId: result.clientId,
          pdf: result.documents.livingTrustPdf,
          word: result.documents.livingTrustWord
        });
        setStatus('Living Trust saved successfully! Documents are ready for download.');
      } else {
        setStatus(`Error: ${result.error}`);
        setTimeout(() => setStatus(''), 5000);
      }
    } catch (error) {
      console.error('Error saving Living Trust:', error);
      setStatus('Error saving Living Trust. Please check the console for details.');
      setTimeout(() => setStatus(''), 5000);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveCompletePlan = async () => {
    setLoading(true);
    setSavedCompletePlan(null);
    setStatus('Saving complete estate plan to database...');

    try {
      const result = await saveClientWithDocuments(
        formData,
        (progress) => {
          setSaveProgress(progress);
          setStatus(`${progress.message} (${Math.round(progress.percent)}%)`);
        }
      );

      if (result.success) {
        setSavedCompletePlan({
          clientId: result.clientId,
          pdf: result.documents.pdf,
          word: result.documents.word
        });
        setStatus('Complete Estate Plan saved successfully! Documents are ready for download.');
      } else {
        setStatus(`Error: ${result.error}`);
        setTimeout(() => setStatus(''), 5000);
      }
    } catch (error) {
      console.error('Error saving complete plan:', error);
      setStatus('Error saving complete estate plan. Please check the console for details.');
      setTimeout(() => setStatus(''), 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-6">
        {/* Load Existing Client */}
        <LoadClientSection />

        {/* Load Sample Data for Testing */}
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Testing</h3>
              <p className="text-sm text-gray-600 mt-1">
                Load sample form data for testing purposes
              </p>
            </div>
            <Button variant="outline" onClick={loadSampleData}>
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

        {/* Save and Generate Buttons */}
        <Card>
          <div className="space-y-4">
            {/* Primary Actions - Two Save Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="primary"
                size="lg"
                onClick={handleSaveLivingTrust}
                loading={loading}
                disabled={loading}
                className="px-8"
              >
                📜 Save Living Trust
              </Button>
              <Button
                variant="primary"
                size="lg"
                onClick={handleSaveCompletePlan}
                loading={loading}
                disabled={loading}
                className="px-8"
              >
                📦 Save Complete Estate Plan
              </Button>
            </div>

            {/* Secondary Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center border-t pt-4">
              <Button
                variant="outline"
                size="lg"
                onClick={handleSaveForm}
                disabled={loading}
              >
                Save Form Draft
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={handleGenerateTrust}
                loading={loading}
                disabled={loading}
              >
                Generate PDF (Preview)
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={handleGenerateTrustWord}
                loading={loading}
                disabled={loading}
              >
                Generate Word (Preview)
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={handleGenerateAllDocuments}
                loading={loading}
                disabled={loading}
              >
                Generate Complete Package (PDF)
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={handleGenerateAllDocumentsWord}
                loading={loading}
                disabled={loading}
              >
                Generate Complete Package (Word)
              </Button>
            </div>
          </div>

          {/* Status Message */}
          {status && (
            <div className={`mt-4 p-3 rounded-lg text-center ${
              status.includes('Error')
                ? 'bg-red-50 text-red-800 border border-red-200'
                : 'bg-blue-50 text-blue-800 border border-blue-200'
            }`}>
              {status}
            </div>
          )}

          {/* Download Links - Living Trust */}
          {savedLivingTrust && (
            <div className="mt-6 p-6 bg-blue-50 border-2 border-blue-400 rounded-lg">
              <div className="flex items-start gap-3 mb-4">
                <span className="text-3xl">✅</span>
                <div>
                  <h3 className="text-lg font-bold text-blue-900">
                    Living Trust Saved Successfully!
                  </h3>
                  <p className="text-sm text-blue-700 mt-1">
                    Client ID: <code className="px-2 py-1 bg-white rounded text-xs">{savedLivingTrust.clientId}</code>
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <p className="font-semibold text-blue-900">Download Living Trust:</p>

                <a
                  href={savedLivingTrust.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full p-4 bg-white hover:bg-gray-50 border-2 border-blue-300 rounded-lg transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">📄</span>
                      <div>
                        <div className="font-semibold text-gray-900">Living Trust PDF</div>
                        <div className="text-xs text-gray-600">Trust Document Only</div>
                      </div>
                    </div>
                    <span className="text-blue-600 font-semibold">Download →</span>
                  </div>
                </a>

                <a
                  href={savedLivingTrust.word}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full p-4 bg-white hover:bg-gray-50 border-2 border-blue-300 rounded-lg transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">📝</span>
                      <div>
                        <div className="font-semibold text-gray-900">Living Trust Word</div>
                        <div className="text-xs text-gray-600">Trust Document Only</div>
                      </div>
                    </div>
                    <span className="text-blue-600 font-semibold">Download →</span>
                  </div>
                </a>
              </div>

              <div className="mt-4 pt-4 border-t border-blue-300">
                <p className="text-xs text-blue-700">
                  📜 Living Trust document saved to Firebase Storage
                </p>
              </div>
            </div>
          )}

          {/* Download Links - Complete Estate Plan */}
          {savedCompletePlan && (
            <div className="mt-6 p-6 bg-green-50 border-2 border-green-400 rounded-lg">
              <div className="flex items-start gap-3 mb-4">
                <span className="text-3xl">✅</span>
                <div>
                  <h3 className="text-lg font-bold text-green-900">
                    Complete Estate Plan Saved Successfully!
                  </h3>
                  <p className="text-sm text-green-700 mt-1">
                    Client ID: <code className="px-2 py-1 bg-white rounded text-xs">{savedCompletePlan.clientId}</code>
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <p className="font-semibold text-green-900">Download Complete Package:</p>

                <a
                  href={savedCompletePlan.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full p-4 bg-white hover:bg-gray-50 border-2 border-green-300 rounded-lg transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">📄</span>
                      <div>
                        <div className="font-semibold text-gray-900">Complete Package PDF</div>
                        <div className="text-xs text-gray-600">All Estate Planning Documents</div>
                      </div>
                    </div>
                    <span className="text-green-600 font-semibold">Download →</span>
                  </div>
                </a>

                <a
                  href={savedCompletePlan.word}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full p-4 bg-white hover:bg-gray-50 border-2 border-green-300 rounded-lg transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">📝</span>
                      <div>
                        <div className="font-semibold text-gray-900">Complete Package Word</div>
                        <div className="text-xs text-gray-600">All Estate Planning Documents</div>
                      </div>
                    </div>
                    <span className="text-green-600 font-semibold">Download →</span>
                  </div>
                </a>
              </div>

              <div className="mt-4 pt-4 border-t border-green-300">
                <p className="text-xs text-green-700">
                  💡 All documents permanently saved in{' '}
                  <a
                    href="https://console.firebase.google.com/project/estate-planning-app-b5335/storage/files"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline font-semibold"
                  >
                    Firebase Storage
                  </a>
                </p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default EstatePlanningForm;
