import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Input, Button } from '../common';
import { getClientData } from '../../services/firestoreService';
import {
  getNextAmendmentNumber,
  generateAmendmentId,
  saveAmendment,
  uploadAmendmentPDF,
  getOrdinalName
} from '../../services/amendmentService';
import {
  generateAmendmentPDF,
  previewAmendmentPDF
} from '../../services/amendmentPDFService';

const AmendmentForm = () => {
  const { clientId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [client, setClient] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    amendmentNumber: 1,
    amendmentDate: new Date().toISOString().split('T')[0],
    executionDate: new Date().toISOString().split('T')[0],
    trustorName: '',
    trusteeName: '',
    originalTrustDate: '',
    trustName: '',
    sections: [
      {
        articleNumber: '',
        sectionTitle: '',
        sectionText: ''
      }
    ],
    scheduleOfAssets: '',
    witnesses: [
      { name: '', address: '' }
    ]
  });

  useEffect(() => {
    loadClientData();
  }, [clientId]);

  const loadClientData = async () => {
    setLoading(true);
    setError('');

    try {
      // Load client data
      const clientResult = await getClientData(clientId);
      if (!clientResult.success) {
        setError('Client not found');
        return;
      }

      setClient(clientResult.data);

      // Get next amendment number
      const nextNumber = await getNextAmendmentNumber(clientId);

      // Pre-fill form with client data
      const clientData = clientResult.data;
      setFormData(prev => ({
        ...prev,
        amendmentNumber: nextNumber,
        trustorName: clientData.client
          ? `${clientData.client.firstName} ${clientData.client.lastName}`
          : '',
        trusteeName: clientData.currentTrustees?.[0]
          ? `${clientData.currentTrustees[0].firstName} ${clientData.currentTrustees[0].lastName}`
          : '',
        originalTrustDate: clientData.trustDate || clientData.currentDate || '',
        trustName: clientData.trustName || ''
      }));
    } catch (err) {
      console.error('Error loading client data:', err);
      setError('Failed to load client data');
    } finally {
      setLoading(false);
    }
  };

  const updateFormData = (updates) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const addSection = () => {
    setFormData(prev => ({
      ...prev,
      sections: [
        ...prev.sections,
        { articleNumber: '', sectionTitle: '', sectionText: '' }
      ]
    }));
  };

  const removeSection = (index) => {
    if (formData.sections.length > 1) {
      setFormData(prev => ({
        ...prev,
        sections: prev.sections.filter((_, i) => i !== index)
      }));
    }
  };

  const updateSection = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.map((section, i) =>
        i === index ? { ...section, [field]: value } : section
      )
    }));
  };

  const addWitness = () => {
    setFormData(prev => ({
      ...prev,
      witnesses: [...prev.witnesses, { name: '', address: '' }]
    }));
  };

  const removeWitness = (index) => {
    setFormData(prev => ({
      ...prev,
      witnesses: prev.witnesses.filter((_, i) => i !== index)
    }));
  };

  const updateWitness = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      witnesses: prev.witnesses.map((witness, i) =>
        i === index ? { ...witness, [field]: value } : witness
      )
    }));
  };

  const handlePreview = () => {
    previewAmendmentPDF(formData);
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');

    try {
      // Generate PDF
      const pdfBlob = generateAmendmentPDF(formData);

      // Generate amendment ID
      const amendmentId = generateAmendmentId(clientId, formData.amendmentNumber);

      // Upload PDF to Firebase Storage
      const uploadResult = await uploadAmendmentPDF(clientId, amendmentId, pdfBlob);
      if (!uploadResult.success) {
        throw new Error(uploadResult.error);
      }

      // Save amendment data to Firestore
      const amendmentData = {
        ...formData,
        pdfUrl: uploadResult.url
      };

      const saveResult = await saveAmendment(clientId, amendmentId, amendmentData);
      if (!saveResult.success) {
        throw new Error(saveResult.error);
      }

      alert('Amendment saved successfully!');
      navigate(`/client/${clientId}`);
    } catch (err) {
      console.error('Error saving amendment:', err);
      setError(`Failed to save amendment: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 4));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error && !client) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <div className="text-center py-12">
            <div className="text-red-400 text-6xl mb-4">⚠️</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Error</h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <Button variant="primary" onClick={() => navigate(`/client/${clientId}`)}>
              Back to Client
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <Button
          variant="outline"
          onClick={() => navigate(`/client/${clientId}`)}
          className="mb-4"
        >
          ← Back to Client
        </Button>

        <h1 className="text-3xl font-bold text-gray-900">
          Create Trust Amendment
        </h1>
        <p className="text-gray-600 mt-2">
          {client?.client?.firstName} {client?.client?.lastName}
        </p>
      </div>

      {/* Progress Steps */}
      <Card className="mb-6">
        <div className="flex items-center justify-between">
          {[
            { num: 1, label: 'Basic Info' },
            { num: 2, label: 'Sections' },
            { num: 3, label: 'Assets & Witnesses' },
            { num: 4, label: 'Review' }
          ].map((step, index) => (
            <div key={step.num} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    currentStep >= step.num
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {step.num}
                </div>
                <div className="text-sm mt-2 text-center font-medium">
                  {step.label}
                </div>
              </div>
              {index < 3 && (
                <div
                  className={`h-1 flex-1 mx-2 ${
                    currentStep > step.num ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </Card>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {/* Step 1: Basic Information */}
      {currentStep === 1 && (
        <Card>
          <h2 className="text-xl font-bold text-gray-900 mb-6">Basic Information</h2>

          <div className="space-y-4">
            <Input
              label="Amendment Number"
              value={`${getOrdinalName(formData.amendmentNumber)} (${formData.amendmentNumber})`}
              disabled
              helpText="Auto-incremented based on existing amendments"
            />

            <Input
              label="Amendment Date"
              type="date"
              value={formData.amendmentDate}
              onChange={(e) => updateFormData({ amendmentDate: e.target.value })}
              required
            />

            <Input
              label="Trustor Name"
              value={formData.trustorName}
              onChange={(e) => updateFormData({ trustorName: e.target.value })}
              required
            />

            <Input
              label="Trustee Name"
              value={formData.trusteeName}
              onChange={(e) => updateFormData({ trusteeName: e.target.value })}
              required
            />

            <Input
              label="Original Trust Date"
              type="date"
              value={formData.originalTrustDate}
              onChange={(e) => updateFormData({ originalTrustDate: e.target.value })}
              required
            />

            <Input
              label="Trust Name (Optional)"
              value={formData.trustName}
              onChange={(e) => updateFormData({ trustName: e.target.value })}
              placeholder="e.g., THE JOHN SMITH LIVING TRUST"
            />
          </div>

          <div className="mt-6 flex justify-end">
            <Button variant="primary" onClick={nextStep}>
              Next: Add Sections →
            </Button>
          </div>
        </Card>
      )}

      {/* Step 2: Amendment Sections */}
      {currentStep === 2 && (
        <Card>
          <h2 className="text-xl font-bold text-gray-900 mb-6">Amendment Sections</h2>
          <p className="text-gray-600 mb-6">
            Add the sections of the trust that are being amended. You can add multiple sections.
          </p>

          {formData.sections.map((section, index) => (
            <div key={index} className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Section {index + 1}
                </h3>
                {formData.sections.length > 1 && (
                  <Button
                    variant="outline"
                    onClick={() => removeSection(index)}
                    className="text-red-600 hover:bg-red-50"
                  >
                    Remove
                  </Button>
                )}
              </div>

              <div className="space-y-4">
                <Input
                  label="Article Number"
                  value={section.articleNumber}
                  onChange={(e) => updateSection(index, 'articleNumber', e.target.value)}
                  placeholder="e.g., ARTICLE III or Section 3.1"
                />

                <Input
                  label="Section Title"
                  value={section.sectionTitle}
                  onChange={(e) => updateSection(index, 'sectionTitle', e.target.value)}
                  placeholder="e.g., Distributions"
                />

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Section Text <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[150px]"
                    value={section.sectionText}
                    onChange={(e) => updateSection(index, 'sectionText', e.target.value)}
                    placeholder="Enter the complete text of the amended provision..."
                    required
                  />
                </div>
              </div>
            </div>
          ))}

          <Button variant="outline" onClick={addSection} className="mb-6">
            + Add Another Section
          </Button>

          <div className="flex justify-between">
            <Button variant="outline" onClick={prevStep}>
              ← Back
            </Button>
            <Button variant="primary" onClick={nextStep}>
              Next: Assets & Witnesses →
            </Button>
          </div>
        </Card>
      )}

      {/* Step 3: Schedule of Assets & Witnesses */}
      {currentStep === 3 && (
        <Card>
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Schedule of Assets & Witnesses
          </h2>

          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Schedule of Assets (Optional)
            </label>
            <p className="text-sm text-gray-600 mb-3">
              If this amendment includes an updated Schedule of Assets, enter it here.
            </p>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[120px]"
              value={formData.scheduleOfAssets}
              onChange={(e) => updateFormData({ scheduleOfAssets: e.target.value })}
              placeholder="1. Real Property: ...&#10;2. Bank Accounts: ...&#10;3. Investment Accounts: ..."
            />
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Witnesses</h3>
            {formData.witnesses.map((witness, index) => (
              <div key={index} className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-gray-700">Witness {index + 1}</h4>
                  {formData.witnesses.length > 1 && (
                    <Button
                      variant="outline"
                      onClick={() => removeWitness(index)}
                      className="text-red-600 hover:bg-red-50"
                    >
                      Remove
                    </Button>
                  )}
                </div>

                <div className="space-y-3">
                  <Input
                    label="Name"
                    value={witness.name}
                    onChange={(e) => updateWitness(index, 'name', e.target.value)}
                    placeholder="Witness name"
                  />
                  <Input
                    label="Address"
                    value={witness.address}
                    onChange={(e) => updateWitness(index, 'address', e.target.value)}
                    placeholder="Witness address"
                  />
                </div>
              </div>
            ))}

            <Button variant="outline" onClick={addWitness}>
              + Add Another Witness
            </Button>
          </div>

          <Input
            label="Date of Execution"
            type="date"
            value={formData.executionDate}
            onChange={(e) => updateFormData({ executionDate: e.target.value })}
            required
          />

          <div className="mt-6 flex justify-between">
            <Button variant="outline" onClick={prevStep}>
              ← Back
            </Button>
            <Button variant="primary" onClick={nextStep}>
              Next: Review →
            </Button>
          </div>
        </Card>
      )}

      {/* Step 4: Review & Generate */}
      {currentStep === 4 && (
        <Card>
          <h2 className="text-xl font-bold text-gray-900 mb-6">Review Amendment</h2>

          <div className="space-y-4 mb-6">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">Amendment Details</h3>
              <p className="text-sm text-gray-700">
                <strong>Amendment Number:</strong> {getOrdinalName(formData.amendmentNumber)}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Trustor:</strong> {formData.trustorName}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Trustee:</strong> {formData.trusteeName}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Original Trust Date:</strong> {formData.originalTrustDate}
              </p>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">
                Sections Being Amended ({formData.sections.length})
              </h3>
              {formData.sections.map((section, index) => (
                <div key={index} className="mb-3">
                  <p className="text-sm font-semibold text-gray-700">
                    {section.articleNumber} - {section.sectionTitle}
                  </p>
                  <p className="text-sm text-gray-600 line-clamp-2">{section.sectionText}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3 mb-6">
            <Button variant="outline" onClick={handlePreview} className="flex-1">
              👁️ Preview PDF
            </Button>
          </div>

          <div className="flex justify-between">
            <Button variant="outline" onClick={prevStep}>
              ← Back
            </Button>
            <Button
              variant="primary"
              onClick={handleSave}
              loading={saving}
              disabled={saving}
            >
              {saving ? 'Saving...' : 'Save Amendment'}
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default AmendmentForm;
