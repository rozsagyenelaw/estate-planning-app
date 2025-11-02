/**
 * Step 7: Generate & Download Documents
 *
 * Final step - generate both documents and allow download
 */

import { useState, useEffect } from 'react';
import { Card, Button } from '../../common';
import { downloadTrustTransferDeed } from '../../../services/trustTransferDeedService';
import { fillPCORForm } from '../../../services/pcorService';
import { COUNTIES } from './Step5SelectCounty';

const Step7Generate = ({ formData, clientId, navigate, setError }) => {
  const [generating, setGenerating] = useState(true);
  const [deedGenerated, setDeedGenerated] = useState(false);
  const [pcorGenerated, setPcorGenerated] = useState(false);
  const [deedBlob, setDeedBlob] = useState(null);
  const [pcorBlob, setPcorBlob] = useState(null);
  const [generationError, setGenerationError] = useState('');

  const selectedCounty = COUNTIES.find(c => c.id === formData.selectedCounty);

  // Generate documents on mount
  useEffect(() => {
    generateDocuments();
  }, []);

  const generateDocuments = async () => {
    setGenerating(true);
    setGenerationError('');

    try {
      // Generate Trust Transfer Deed
      const { generateTrustTransferDeed } = await import('../../../services/trustTransferDeedService');
      const deedBlobResult = await generateTrustTransferDeed(formData);
      setDeedBlob(deedBlobResult);
      setDeedGenerated(true);

      // Try to generate PCOR Form (skip if PDF doesn't exist)
      try {
        const pcorBlobResult = await fillPCORForm(formData, formData.selectedCounty);
        setPcorBlob(pcorBlobResult);
        setPcorGenerated(true);
      } catch (pcorErr) {
        console.warn('PCOR generation skipped:', pcorErr.message);
        setGenerationError('Trust Transfer Deed generated. PCOR form not available - please upload county PCOR PDF templates.');
      }

      setGenerating(false);
    } catch (err) {
      console.error('Error generating documents:', err);
      setGenerationError(err.message || 'Failed to generate documents');
      setGenerating(false);
    }
  };

  const handleDownloadDeed = () => {
    if (!deedBlob) return;

    const url = URL.createObjectURL(deedBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Trust_Transfer_Deed_${formData.apn.replace(/[^0-9]/g, '')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadPCOR = () => {
    if (!pcorBlob) return;

    const url = URL.createObjectURL(pcorBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `PCOR_${selectedCounty?.name.replace(/\s+/g, '_')}_${formData.apn.replace(/[^0-9]/g, '')}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadBoth = () => {
    handleDownloadDeed();
    setTimeout(() => {
      handleDownloadPCOR();
    }, 500);
  };

  const handlePreviewDeed = () => {
    if (!deedBlob) return;
    const url = URL.createObjectURL(deedBlob);
    window.open(url, '_blank');
  };

  const handlePreviewPCOR = () => {
    if (!pcorBlob) return;
    const url = URL.createObjectURL(pcorBlob);
    window.open(url, '_blank');
  };

  const handleFinish = () => {
    navigate(`/client/${clientId}`);
  };

  return (
    <div className="space-y-6">
      <Card>
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Step 7: Generate Documents
            </h2>
            <p className="text-gray-600">
              Your trust transfer deed and PCOR form are being generated.
            </p>
          </div>
        </div>
      </Card>

      {/* Generating Status */}
      {generating && !generationError && (
        <Card>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
            <div className="flex items-start">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-4 mt-1"></div>
              <div className="flex-1">
                <h4 className="text-blue-900 font-semibold mb-2">Generating Documents...</h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    {deedGenerated ? (
                      <span className="text-green-600 mr-2">✓</span>
                    ) : (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                    )}
                    <span className={`text-sm ${deedGenerated ? 'text-green-800' : 'text-blue-800'}`}>
                      Trust Transfer Deed
                    </span>
                  </div>
                  <div className="flex items-center">
                    {pcorGenerated ? (
                      <span className="text-green-600 mr-2">✓</span>
                    ) : (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                    )}
                    <span className={`text-sm ${pcorGenerated ? 'text-green-800' : 'text-blue-800'}`}>
                      PCOR Form ({selectedCounty?.name})
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Generation Error */}
      {generationError && (
        <Card>
          <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded">
            <div className="flex items-start">
              <span className="text-red-600 mr-3 text-xl">⚠️</span>
              <div className="flex-1">
                <h4 className="text-red-800 font-semibold mb-2">Generation Error</h4>
                <p className="text-red-700 text-sm mb-4">{generationError}</p>
                <Button variant="outline" size="sm" onClick={generateDocuments}>
                  Try Again
                </Button>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Success - Documents Ready */}
      {!generating && !generationError && deedGenerated && pcorGenerated && (
        <>
          <Card>
            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded">
              <div className="flex items-start">
                <span className="text-green-600 mr-3 text-2xl">✓</span>
                <div className="flex-1">
                  <h4 className="text-green-900 font-semibold text-lg mb-2">Documents Ready!</h4>
                  <p className="text-green-800 text-sm">
                    Both documents have been successfully generated and are ready to download.
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Document Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Trust Transfer Deed */}
            <Card>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="text-4xl">📄</div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Trust Transfer Deed</h3>
                    <p className="text-sm text-gray-600">Word Document (.docx)</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button
                    variant="primary"
                    onClick={handleDownloadDeed}
                    className="w-full"
                  >
                    ⬇️ Download Deed
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handlePreviewDeed}
                    className="w-full"
                  >
                    👁️ Preview Deed
                  </Button>
                </div>
              </div>
            </Card>

            {/* PCOR Form */}
            <Card>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="text-4xl">📋</div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">PCOR Form</h3>
                    <p className="text-sm text-gray-600">{selectedCounty?.name}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button
                    variant="primary"
                    onClick={handleDownloadPCOR}
                    className="w-full"
                  >
                    ⬇️ Download PCOR
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handlePreviewPCOR}
                    className="w-full"
                  >
                    👁️ Preview PCOR
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Download Both Button */}
          <Card>
            <div className="text-center space-y-4">
              <Button
                variant="primary"
                onClick={handleDownloadBoth}
                className="text-lg px-8 py-4"
              >
                📦 Download Both Documents
              </Button>
              <p className="text-sm text-gray-600">
                Download the trust transfer deed and PCOR form together
              </p>
            </div>
          </Card>

          {/* Next Steps */}
          <Card>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Next Steps
              </h3>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <h4 className="text-blue-900 font-semibold mb-3">To Complete the Transfer:</h4>
                <ol className="text-blue-800 text-sm space-y-2 list-decimal list-inside">
                  <li>Have the grantor(s) sign the deed in front of a notary public</li>
                  <li>Complete and sign the PCOR form</li>
                  <li>Take both documents to the county recorder's office</li>
                  <li>Pay the recording fees (typically $15-$50, no transfer tax for trust transfers)</li>
                  <li>Keep the recorded deed and send a copy to your title company</li>
                </ol>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
                <div className="flex items-start">
                  <span className="text-yellow-600 mr-3 text-xl">💡</span>
                  <div>
                    <h4 className="text-yellow-900 font-semibold mb-1">Tip</h4>
                    <p className="text-yellow-800 text-sm">
                      Many counties now allow electronic recording. Check with your {selectedCounty?.name}
                      recorder's office to see if e-recording is available, which can be faster and more convenient.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Finish Button */}
          <div className="text-center">
            <Button variant="outline" onClick={handleFinish} className="px-8">
              ← Return to Client Dashboard
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Step7Generate;
