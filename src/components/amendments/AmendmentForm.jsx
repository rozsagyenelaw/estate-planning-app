import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Input, Button } from '../common';
import { getClientData } from '../../services/firestoreService';
import { storage } from '../../services/firebase';
import { ref, getDownloadURL } from 'firebase/storage';
import * as pdfjsLib from 'pdfjs-dist';
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

// Set PDF.js worker - use unpkg CDN
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

const AmendmentForm = () => {
  const { clientId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [client, setClient] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [error, setError] = useState('');
  const [parsedArticles, setParsedArticles] = useState([]);
  const [selectedArticles, setSelectedArticles] = useState([]);
  const [parsingTrust, setParsingTrust] = useState(false);
  const [trustDocumentUrl, setTrustDocumentUrl] = useState(null);
  const [canParseTrust, setCanParseTrust] = useState(false);
  const [uploadedTrustFile, setUploadedTrustFile] = useState(null);

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
    scheduleOfAssets: ''
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

      const clientData = clientResult.data;
      setClient(clientData);

      // Get next amendment number
      const nextNumber = await getNextAmendmentNumber(clientId);

      // Extract trustor name from various possible structures
      let trustorName = '';
      if (clientData.client) {
        trustorName = `${clientData.client.firstName || ''} ${clientData.client.lastName || ''}`.trim();
      } else if (clientData.clientInfo) {
        trustorName = `${clientData.clientInfo.firstName || ''} ${clientData.clientInfo.lastName || ''}`.trim();
      }

      // Extract trustee name - try multiple sources
      let trusteeName = '';
      if (clientData.currentTrustees && clientData.currentTrustees.length > 0) {
        const trustee = clientData.currentTrustees[0];
        trusteeName = `${trustee.firstName || ''} ${trustee.lastName || ''}`.trim();
      } else if (clientData.trusteeInfo) {
        trusteeName = `${clientData.trusteeInfo.firstName || ''} ${clientData.trusteeInfo.lastName || ''}`.trim();
      }
      // If no trustee found, use trustor as default
      if (!trusteeName && trustorName) {
        trusteeName = trustorName;
      }

      // Extract trust date
      const trustDate = clientData.trustDate || clientData.currentDate || '';

      // Extract trust name
      const trustName = clientData.trustName ||
        (trustorName ? `THE ${trustorName.toUpperCase()} LIVING TRUST` : '');

      // Pre-fill form with client data
      setFormData(prev => ({
        ...prev,
        amendmentNumber: nextNumber,
        trustorName,
        trusteeName,
        originalTrustDate: trustDate,
        trustName
      }));

      // Try to find and parse trust document if available
      let trustDocUrl = null;

      // Check for external trust PDF
      if (clientData.originalTrustDocument) {
        trustDocUrl = clientData.originalTrustDocument;
      }
      // Check for uploaded trust documents
      else if (clientData.livingTrustDocuments?.livingTrustPdf) {
        trustDocUrl = clientData.livingTrustDocuments.livingTrustPdf;
      }
      // Check documents field
      else if (clientData.documents?.trust) {
        trustDocUrl = clientData.documents.trust;
      }

      if (trustDocUrl) {
        setTrustDocumentUrl(trustDocUrl);
        setCanParseTrust(true);
        // Automatically start parsing
        await parseTrustDocument(trustDocUrl);
      } else {
        setCanParseTrust(false);
        console.log('No PDF trust document found for automatic parsing');
      }
    } catch (err) {
      console.error('Error loading client data:', err);
      setError('Failed to load client data');
    } finally {
      setLoading(false);
    }
  };

  const parseTrustDocument = async (trustDocUrl) => {
    setParsingTrust(true);
    try {
      // Fetch the PDF from storage
      const response = await fetch(trustDocUrl);
      const arrayBuffer = await response.arrayBuffer();

      // Extract text from PDF
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const totalPages = pdf.numPages;
      let allText = '';

      for (let i = 1; i <= totalPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map(item => item.str).join(' ');
        allText += pageText + '\n\n--- PAGE BREAK ---\n\n';
      }

      // Parse articles from text
      const articles = parseArticlesFromText(allText);
      setParsedArticles(articles);
    } catch (err) {
      console.error('Error parsing trust document:', err);
      // Don't show error - just continue without parsed articles
    } finally {
      setParsingTrust(false);
    }
  };

  const parseArticlesFromText = (text) => {
    // Filter out TOC pages
    const pages = text.split('--- PAGE BREAK ---');
    const trustContentPages = pages.filter(page => {
      const tocDensity = (page.match(/\.{3,}/g) || []).length;
      return page.length > 500 && tocDensity < 10;
    });

    const fullText = trustContentPages.join('\n\n');
    const articles = [];

    // Pattern to match "Article [Word/Number] [Title]"
    const articleRegex = /Article\s+(One|Two|Three|Four|Five|Six|Seven|Eight|Nine|Ten|Eleven|Twelve|I{1,3}|IV|V|VI{0,3}|IX|X|XI{0,3}|1?\d)\s+([^\n]+?)(?=\n|$)/gi;

    let match;
    const articleMatches = [];

    while ((match = articleRegex.exec(fullText)) !== null) {
      articleMatches.push({
        articleNumber: match[1],
        title: match[2].trim(),
        startIndex: match.index
      });
    }

    // Extract content between articles
    for (let i = 0; i < articleMatches.length; i++) {
      const article = articleMatches[i];
      const nextArticle = articleMatches[i + 1];

      const startIndex = article.startIndex;
      const endIndex = nextArticle ? nextArticle.startIndex : fullText.length;
      const content = fullText.substring(startIndex, endIndex).trim();

      // Get first 500 chars as preview
      const preview = content.substring(0, 500);

      articles.push({
        articleNumber: article.articleNumber,
        title: article.title,
        content: content,
        preview: preview
      });
    }

    return articles;
  };

  const updateFormData = (updates) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const toggleArticleSelection = (index) => {
    setSelectedArticles(prev => {
      if (prev.includes(index)) {
        return prev.filter(i => i !== index);
      } else {
        return [...prev, index];
      }
    });
  };

  const addSelectedArticlesToSections = () => {
    const newSections = selectedArticles.map(index => {
      const article = parsedArticles[index];
      return {
        articleNumber: `Article ${article.articleNumber}`,
        sectionTitle: article.title,
        sectionText: article.content
      };
    });

    setFormData(prev => ({
      ...prev,
      sections: [...prev.sections.filter(s => s.articleNumber || s.sectionTitle || s.sectionText), ...newSections]
    }));

    setSelectedArticles([]);
  };

  const handleTrustFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Only accept PDFs
    if (file.type !== 'application/pdf') {
      setError('Please upload a PDF file');
      return;
    }

    setUploadedTrustFile(file);
    setError('');

    // Parse the uploaded PDF
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const totalPages = pdf.numPages;
      let allText = '';

      setParsingTrust(true);

      for (let i = 1; i <= totalPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map(item => item.str).join(' ');
        allText += pageText + '\n\n--- PAGE BREAK ---\n\n';
      }

      const articles = parseArticlesFromText(allText);
      setParsedArticles(articles);
      setCanParseTrust(true);
    } catch (err) {
      console.error('Error parsing uploaded PDF:', err);
      setError('Failed to parse PDF. You can still manually enter sections.');
    } finally {
      setParsingTrust(false);
    }
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
            { num: 3, label: 'Assets' },
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
              helperText="Auto-incremented based on existing amendments"
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

          {/* Upload Trust PDF if not available */}
          {!canParseTrust && !parsingTrust && (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                📄 Upload Trust Document for Auto-Parsing (Optional)
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Upload a PDF of the trust document to automatically extract all articles and sections.
                This makes it easier to select which sections to amend.
              </p>
              <input
                type="file"
                accept="application/pdf"
                onChange={handleTrustFileUpload}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-500 file:text-white
                  hover:file:bg-blue-600
                  cursor-pointer"
              />
              <p className="text-xs text-gray-500 mt-2">
                If you don't have a PDF, you can manually enter the sections below.
              </p>
            </div>
          )}

          {/* Parsed Articles from Trust Document */}
          {parsedArticles.length > 0 && (
            <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                📄 Articles from Trust Document ({parsedArticles.length} found)
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Select articles below to automatically add them to your amendment sections.
                You can edit the text after adding.
              </p>

              <div className="space-y-3 mb-4 max-h-96 overflow-y-auto">
                {parsedArticles.map((article, index) => (
                  <div
                    key={index}
                    onClick={() => toggleArticleSelection(index)}
                    className={`p-3 bg-white rounded border-2 cursor-pointer transition-all ${
                      selectedArticles.includes(index)
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="flex items-start">
                      <input
                        type="checkbox"
                        checked={selectedArticles.includes(index)}
                        onChange={() => toggleArticleSelection(index)}
                        className="mt-1 mr-3"
                      />
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">
                          Article {article.articleNumber}: {article.title}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          {article.preview}...
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {selectedArticles.length > 0 && (
                <Button
                  variant="primary"
                  onClick={addSelectedArticlesToSections}
                  className="w-full"
                >
                  Add Selected Articles to Sections ({selectedArticles.length})
                </Button>
              )}
            </div>
          )}

          {parsingTrust && (
            <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-600 mx-auto mb-2"></div>
              <p className="text-yellow-800">Parsing trust document...</p>
            </div>
          )}

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
              Next: Assets →
            </Button>
          </div>
        </Card>
      )}

      {/* Step 3: Schedule of Assets */}
      {currentStep === 3 && (
        <Card>
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Schedule of Assets
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
