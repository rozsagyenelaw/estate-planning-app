/**
 * Step 6: Review PCOR Information
 *
 * Review the information that will be filled into the PCOR form
 */

import { Card, Button } from '../../common';
import { COUNTIES } from './Step5SelectCounty';
import { formatDate } from '../../../utils/formatters';

const Step6ReviewPCOR = ({ formData, nextStep, prevStep }) => {
  const selectedCounty = COUNTIES.find(c => c.id === formData.selectedCounty);

  return (
    <div className="space-y-6">
      <Card>
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Step 6: Review PCOR Information
            </h2>
            <p className="text-gray-600">
              Review the information that will be filled into the {selectedCounty?.name} PCOR form.
            </p>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
            <div className="flex items-start">
              <span className="text-blue-600 mr-3 text-xl">ℹ️</span>
              <div>
                <p className="text-blue-800 text-sm">
                  We'll automatically fill out the official county PCOR form with this information.
                  You can review and edit the final form after it's generated.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* PCOR Information */}
      <Card>
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
            PCOR Form Information
          </h3>

          {/* Property Information */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Property Information</h4>
            <div className="bg-gray-50 p-4 rounded border border-gray-200 space-y-2">
              <div className="flex">
                <span className="text-sm font-medium text-gray-600 w-40">APN:</span>
                <span className="text-sm text-gray-900 font-mono">{formData.apn}</span>
              </div>
              <div className="flex">
                <span className="text-sm font-medium text-gray-600 w-40">Property Address:</span>
                <div className="text-sm text-gray-900">
                  <p>{formData.propertyAddress.street}</p>
                  <p>{formData.propertyAddress.city}, {formData.propertyAddress.state} {formData.propertyAddress.zip}</p>
                </div>
              </div>
              <div className="flex">
                <span className="text-sm font-medium text-gray-600 w-40">County:</span>
                <span className="text-sm text-gray-900">{selectedCounty?.name}</span>
              </div>
            </div>
          </div>

          {/* Transferor Information */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Transferor (Grantor) Information</h4>
            <div className="bg-gray-50 p-4 rounded border border-gray-200 space-y-2">
              <div className="flex">
                <span className="text-sm font-medium text-gray-600 w-40">Name(s):</span>
                <div className="text-sm text-gray-900">
                  {formData.grantorNames.map((name, index) => (
                    <p key={index}>{name}</p>
                  ))}
                </div>
              </div>
              <div className="flex">
                <span className="text-sm font-medium text-gray-600 w-40">Mailing Address:</span>
                <div className="text-sm text-gray-900">
                  <p>{formData.propertyAddress.street}</p>
                  <p>{formData.propertyAddress.city}, {formData.propertyAddress.state} {formData.propertyAddress.zip}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Transferee Information */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Transferee (Trust) Information</h4>
            <div className="bg-gray-50 p-4 rounded border border-gray-200 space-y-2">
              <div className="flex">
                <span className="text-sm font-medium text-gray-600 w-40">Trustee Name(s):</span>
                <span className="text-sm text-gray-900">{formData.trusteeName}</span>
              </div>
              <div className="flex">
                <span className="text-sm font-medium text-gray-600 w-40">Trust Name:</span>
                <span className="text-sm text-gray-900">{formData.trustName}</span>
              </div>
              <div className="flex">
                <span className="text-sm font-medium text-gray-600 w-40">Trust Date:</span>
                <span className="text-sm text-gray-900">{formatDate(formData.trustDate)}</span>
              </div>
              <div className="flex">
                <span className="text-sm font-medium text-gray-600 w-40">Mailing Address:</span>
                <div className="text-sm text-gray-900">
                  <p>{formData.propertyAddress.street}</p>
                  <p>{formData.propertyAddress.city}, {formData.propertyAddress.state} {formData.propertyAddress.zip}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Transfer Information */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Transfer Information</h4>
            <div className="bg-gray-50 p-4 rounded border border-gray-200 space-y-2">
              <div className="flex">
                <span className="text-sm font-medium text-gray-600 w-40">Transfer Date:</span>
                <span className="text-sm text-gray-900">{new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex">
                <span className="text-sm font-medium text-gray-600 w-40">Type of Transfer:</span>
                <span className="text-sm text-gray-900">Transfer to Revocable Trust</span>
              </div>
              <div className="flex">
                <span className="text-sm font-medium text-gray-600 w-40">Exemption:</span>
                <span className="text-sm text-gray-900">Revenue & Taxation Code Section 62(a)</span>
              </div>
            </div>
          </div>

          {/* Exemption Information */}
          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
            <h4 className="text-green-900 font-semibold mb-2">Tax Exemption Claim</h4>
            <p className="text-green-800 text-sm">
              This transfer qualifies for a property tax reassessment exclusion under Revenue & Taxation Code Section 62(a)
              as a transfer between the trustor/beneficiary and their revocable living trust.
            </p>
            <p className="text-green-800 text-sm mt-2">
              <strong>No property tax increase</strong> will result from this transfer.
            </p>
          </div>
        </div>
      </Card>

      {/* Important Notes */}
      <Card>
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
          <div className="flex items-start">
            <span className="text-yellow-600 mr-3 text-xl">⚠️</span>
            <div>
              <h4 className="text-yellow-900 font-semibold mb-2">Important</h4>
              <ul className="text-yellow-800 text-sm space-y-1 list-disc list-inside">
                <li>The PCOR must be submitted when recording the deed</li>
                <li>Both documents (deed and PCOR) will be generated in the next step</li>
                <li>Review both documents carefully before recording</li>
                <li>Check with the county recorder for any additional requirements</li>
              </ul>
            </div>
          </div>
        </div>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={prevStep}>
          ← Back
        </Button>
        <Button variant="primary" onClick={nextStep}>
          Generate Documents →
        </Button>
      </div>
    </div>
  );
};

export default Step6ReviewPCOR;
