import { useFormContext } from '../../../context/FormContext';
import { Card, Select } from '../../common';

const AnatomicalGiftsSection = () => {
  const { formData, updateFormData } = useFormContext();
  const isJoint = formData.isJoint || formData.trustType === 'joint';

  const handleClientChange = (value) => {
    updateFormData({
      anatomicalGifts: {
        ...formData.anatomicalGifts,
        client: value
      }
    });
  };

  const handleSpouseChange = (value) => {
    updateFormData({
      anatomicalGifts: {
        ...formData.anatomicalGifts,
        spouse: value
      }
    });
  };

  const options = [
    { value: 'none', label: 'No anatomical gifts' },
    { value: 'any', label: 'Any needed organs and tissues' },
    { value: 'specific', label: 'Specific organs only (specify in notes)' },
    { value: 'research', label: 'For medical research and education' },
    { value: 'therapy', label: 'For transplantation or therapy' }
  ];

  return (
    <>
      {/* Client Anatomical Gifts */}
      <Card>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              {isJoint ? 'Client 1 ' : ''}Anatomical Gifts
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Specify organ and tissue donation preferences
            </p>
          </div>

          <Select
            label="Donation Preference"
            value={formData.anatomicalGifts?.client || 'none'}
            onChange={(e) => handleClientChange(e.target.value)}
            options={options}
          />

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> Your selection will be included in your Advance Healthcare Directive.
              You may also register as an organ donor with your state's donor registry.
            </p>
          </div>
        </div>
      </Card>

      {/* Spouse Anatomical Gifts (for Joint Trusts) */}
      {isJoint && (
        <Card>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Client 2 (Spouse) Anatomical Gifts
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Specify organ and tissue donation preferences for spouse
              </p>
            </div>

            <Select
              label="Donation Preference"
              value={formData.anatomicalGifts?.spouse || 'none'}
              onChange={(e) => handleSpouseChange(e.target.value)}
              options={options}
            />

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> Your selection will be included in your Advance Healthcare Directive.
                You may also register as an organ donor with your state's donor registry.
              </p>
            </div>
          </div>
        </Card>
      )}
    </>
  );
};

export default AnatomicalGiftsSection;
