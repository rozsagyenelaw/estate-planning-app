/**
 * Trust Transfer Deed Component
 *
 * Multi-step wizard for creating trust transfer deeds and PCOR forms
 * 7 Steps:
 * 1. Upload Original Deed
 * 2. Review/Edit Extracted Information
 * 3. Collect Trust Information
 * 4. Review Trust Transfer Deed
 * 5. Select County & Fill PCOR
 * 6. Review PCOR Form
 * 7. Generate & Download Documents
 */

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { Card, Button } from '../common';

// Step components (to be created)
import Step1UploadDeed from './steps/Step1UploadDeed';
import Step2ReviewExtraction from './steps/Step2ReviewExtraction';
import Step3TrustInfo from './steps/Step3TrustInfo';
import Step4ReviewDeed from './steps/Step4ReviewDeed';
import Step5SelectCounty from './steps/Step5SelectCounty';
import Step6ReviewPCOR from './steps/Step6ReviewPCOR';
import Step7Generate from './steps/Step7Generate';

const TrustTransferDeed = () => {
  const { clientId } = useParams();
  const navigate = useNavigate();

  // State
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [clientData, setClientData] = useState(null);

  // Form data state - consolidated for all steps
  const [formData, setFormData] = useState({
    // Step 1: Upload info
    originalDeedFile: null,
    originalDeedUrl: '',
    originalDeedPath: '',

    // Step 2: Extracted deed information
    apn: '',
    propertyAddress: {
      street: '',
      city: '',
      state: 'CA',
      zip: ''
    },
    grantorNames: [],
    legalDescription: '',
    recordingInfo: {
      book: '',
      page: '',
      instrumentNumber: '',
      recordingDate: ''
    },
    currentVesting: '',
    ocrConfidence: 0,
    rawOCRText: '',

    // Step 3: Trust information
    trustName: '',
    trustorName: '',
    trusteeName: '',
    trustDate: '',
    newVesting: '',

    // Step 5: County selection
    selectedCounty: '',

    // Final generated documents
    trustTransferDeedPDF: null,
    pcorPDF: null
  });

  // Load client data
  useEffect(() => {
    const loadClientData = async () => {
      if (!clientId) {
        setError('No client ID provided');
        setLoading(false);
        return;
      }

      try {
        const clientRef = doc(db, 'clients', clientId);
        const clientSnap = await getDoc(clientRef);

        if (!clientSnap.exists()) {
          setError('Client not found');
          setLoading(false);
          return;
        }

        const data = clientSnap.data();
        setClientData(data);

        // Pre-fill trust information if available
        const trustorName = data.client
          ? `${data.client.firstName || ''} ${data.client.lastName || ''}`.trim()
          : '';

        const trusteeName = data.currentTrustees && data.currentTrustees.length > 0
          ? `${data.currentTrustees[0].firstName || ''} ${data.currentTrustees[0].lastName || ''}`.trim()
          : trustorName;

        setFormData(prev => ({
          ...prev,
          trustorName,
          trusteeName,
          trustDate: data.trustDate || '',
          trustName: data.trustName || ''
        }));

        setLoading(false);
      } catch (err) {
        console.error('Error loading client data:', err);
        setError('Failed to load client information');
        setLoading(false);
      }
    };

    loadClientData();
  }, [clientId]);

  // Update form data
  const updateFormData = (updates) => {
    setFormData(prev => ({
      ...prev,
      ...updates
    }));
  };

  // Navigation
  const nextStep = () => {
    if (currentStep < 7) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const goToStep = (step) => {
    if (step >= 1 && step <= 7) {
      setCurrentStep(step);
      window.scrollTo(0, 0);
    }
  };

  // Render step component
  const renderStep = () => {
    const commonProps = {
      formData,
      updateFormData,
      nextStep,
      prevStep,
      clientId,
      setError
    };

    switch (currentStep) {
      case 1:
        return <Step1UploadDeed {...commonProps} />;
      case 2:
        return <Step2ReviewExtraction {...commonProps} />;
      case 3:
        return <Step3TrustInfo {...commonProps} clientData={clientData} />;
      case 4:
        return <Step4ReviewDeed {...commonProps} />;
      case 5:
        return <Step5SelectCounty {...commonProps} />;
      case 6:
        return <Step6ReviewPCOR {...commonProps} />;
      case 7:
        return <Step7Generate {...commonProps} navigate={navigate} />;
      default:
        return <Step1UploadDeed {...commonProps} />;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error && !clientData) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <Card>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
            <p className="text-gray-700 mb-6">{error}</p>
            <Button onClick={() => navigate(-1)}>
              ← Go Back
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Trust Transfer Deed & PCOR
        </h1>
        {clientData && (
          <p className="text-gray-600">
            Client: {clientData.client?.firstName} {clientData.client?.lastName}
          </p>
        )}
      </div>

      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {[
            { num: 1, label: 'Upload Deed' },
            { num: 2, label: 'Review Data' },
            { num: 3, label: 'Trust Info' },
            { num: 4, label: 'Review Deed' },
            { num: 5, label: 'Select County' },
            { num: 6, label: 'Review PCOR' },
            { num: 7, label: 'Generate' }
          ].map(({ num, label }, index) => (
            <div key={num} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <button
                  onClick={() => goToStep(num)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors
                    ${currentStep === num
                      ? 'bg-blue-600 text-white'
                      : currentStep > num
                        ? 'bg-green-600 text-white hover:bg-green-700'
                        : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                    }`}
                  disabled={currentStep < num}
                >
                  {currentStep > num ? '✓' : num}
                </button>
                <span className={`mt-2 text-xs font-medium text-center
                  ${currentStep === num ? 'text-blue-600' : 'text-gray-600'}
                `}>
                  {label}
                </span>
              </div>
              {index < 6 && (
                <div className={`flex-1 h-1 mx-2 transition-colors
                  ${currentStep > num ? 'bg-green-600' : 'bg-gray-300'}
                `} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded">
          <div className="flex items-start">
            <span className="text-red-600 mr-3 text-xl">⚠️</span>
            <div>
              <h4 className="text-red-800 font-semibold mb-1">Error</h4>
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Current Step Component */}
      {renderStep()}
    </div>
  );
};

export default TrustTransferDeed;
