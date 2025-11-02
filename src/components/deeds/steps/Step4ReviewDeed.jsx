/**
 * Step 4: Review Trust Transfer Deed
 *
 * Preview the trust transfer deed before generating PCOR
 */

import { useState } from 'react';
import { Card, Button } from '../../common';
import { previewTrustTransferDeed } from '../../../services/trustTransferDeedService';

const Step4ReviewDeed = ({ formData, nextStep, prevStep, setError }) => {
  const [previewing, setPreviewing] = useState(false);

  const handlePreview = async () => {
    setPreviewing(true);
    setError('');

    try {
      await previewTrustTransferDeed(formData);
    } catch (err) {
      console.error('Error previewing deed:', err);
      setError('Failed to preview deed. Please try again.');
    } finally {
      setPreviewing(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Step 4: Review Trust Transfer Deed
            </h2>
            <p className="text-gray-600">
              Review the trust transfer deed information before generating the PCOR form.
            </p>
          </div>
        </div>
      </Card>

      {/* Deed Summary */}
      <Card>
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
            Trust Transfer Deed Summary
          </h3>

          {/* Recording Information */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Recording Requested By</h4>
            <p className="text-gray-900">{formData.trustName}</p>
          </div>

          {/* Mail To */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-2">When Recorded Mail To</h4>
            <div className="text-gray-900">
              <p>{formData.trustorName}</p>
              <p>{formData.propertyAddress.street}</p>
              <p>{formData.propertyAddress.city}, {formData.propertyAddress.state} {formData.propertyAddress.zip}</p>
            </div>
          </div>

          {/* APN */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Assessor's Parcel Number</h4>
            <p className="text-gray-900 font-mono">{formData.apn}</p>
          </div>

          {/* Property Description */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Property Description</h4>
            <p className="text-gray-900">{formData.propertyAddress.street}</p>
            <p className="text-gray-900">{formData.propertyAddress.city}, {formData.propertyAddress.state} {formData.propertyAddress.zip}</p>
          </div>

          {/* Grantor(s) */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Grantor(s)</h4>
            <div className="text-gray-900">
              {formData.grantorNames.map((name, index) => (
                <p key={index}>{name}</p>
              ))}
              {formData.currentVesting && (
                <p className="text-sm text-gray-600 mt-1">Holding as: {formData.currentVesting}</p>
              )}
            </div>
          </div>

          {/* Grantee (Trust) */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Grantee (Trust)</h4>
            <p className="text-gray-900">
              {formData.trusteeName}, Trustees of the {formData.trustName}
            </p>
            <p className="text-sm text-gray-600">Dated: {formData.trustDate}</p>
          </div>

          {/* Legal Description */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Legal Description</h4>
            <div className="bg-gray-50 p-3 rounded border border-gray-200">
              <p className="text-gray-900 text-sm font-mono whitespace-pre-wrap">
                {formData.legalDescription}
              </p>
            </div>
          </div>

          {/* New Vesting */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-2">New Vesting</h4>
            <p className="text-gray-900">{formData.newVesting}</p>
          </div>

          {/* Recording Info (if available) */}
          {(formData.recordingInfo?.book || formData.recordingInfo?.page || formData.recordingInfo?.instrumentNumber) && (
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Original Deed Recording Information</h4>
              <div className="text-gray-900 text-sm">
                {formData.recordingInfo.book && <p>Book: {formData.recordingInfo.book}</p>}
                {formData.recordingInfo.page && <p>Page: {formData.recordingInfo.page}</p>}
                {formData.recordingInfo.instrumentNumber && <p>Instrument No.: {formData.recordingInfo.instrumentNumber}</p>}
                {formData.recordingInfo.recordingDate && <p>Date: {formData.recordingInfo.recordingDate}</p>}
              </div>
            </div>
          )}

          {/* Tax Information */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
            <h4 className="text-blue-900 font-semibold mb-1">Property Tax Exemption</h4>
            <p className="text-blue-800 text-sm">
              This transfer is exempt from documentary transfer tax under Revenue and Taxation Code Section 62(a)
              as a transfer between trustor/beneficiary and their revocable trust.
            </p>
          </div>
        </div>
      </Card>

      {/* Preview Button */}
      <Card>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Preview Document
          </h3>

          <p className="text-gray-600 text-sm">
            Click the button below to preview the complete trust transfer deed in a new window.
            Review it carefully before proceeding to the PCOR form.
          </p>

          <Button
            variant="primary"
            onClick={handlePreview}
            disabled={previewing}
            className="w-full"
          >
            {previewing ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                Generating Preview...
              </div>
            ) : (
              '📄 Preview Trust Transfer Deed'
            )}
          </Button>

          <p className="text-xs text-gray-500 text-center">
            The document will open in a new window
          </p>
        </div>
      </Card>

      {/* Important Notes */}
      <Card>
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
          <div className="flex items-start">
            <span className="text-yellow-600 mr-3 text-xl">⚠️</span>
            <div>
              <h4 className="text-yellow-900 font-semibold mb-2">Before You Continue</h4>
              <ul className="text-yellow-800 text-sm space-y-1 list-disc list-inside">
                <li>Review the legal description carefully - it must be exact</li>
                <li>Verify all names are spelled correctly</li>
                <li>Confirm the APN matches the property</li>
                <li>Make sure the trust name and date are correct</li>
                <li>If you need to make changes, use the Back button</li>
              </ul>
            </div>
          </div>
        </div>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={prevStep}>
          ← Back to Edit
        </Button>
        <Button variant="primary" onClick={nextStep}>
          Looks Good - Continue to PCOR →
        </Button>
      </div>
    </div>
  );
};

export default Step4ReviewDeed;
