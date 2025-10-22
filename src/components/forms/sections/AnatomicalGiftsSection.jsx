import { useFormContext } from '../../../context/FormContext';
import { Card, Radio } from '../../common';
import { ANATOMICAL_GIFTS } from '../../../utils/constants';

const AnatomicalGiftsSection = () => {
  const { formData, updateFormData } = useFormContext();

  const handleClientChange = (value) => {
    updateFormData({
      anatomicalGifts: {
        ...formData.anatomicalGifts,
        client: value,
      },
    });
  };

  const handleSpouseChange = (value) => {
    updateFormData({
      anatomicalGifts: {
        ...formData.anatomicalGifts,
        spouse: value,
      },
    });
  };

  return (
    <Card title="Anatomical Gifts" collapsible defaultOpen={false}>
      <div className="space-y-6">
        <p className="text-sm text-gray-600">
          Specify your wishes regarding organ and tissue donation. This decision helps
          medical professionals honor your preferences for anatomical gifts.
        </p>

        {/* Client Anatomical Gifts */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <Radio
            label="Client Anatomical Gifts Preference"
            name="client-anatomical-gifts"
            options={ANATOMICAL_GIFTS}
            value={formData.anatomicalGifts.client}
            onChange={(e) => handleClientChange(e.target.value)}
            required
          />
        </div>

        {/* Spouse Anatomical Gifts (only for joint trusts) */}
        {formData.isJoint && (
          <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <Radio
              label="Spouse Anatomical Gifts Preference"
              name="spouse-anatomical-gifts"
              options={ANATOMICAL_GIFTS}
              value={formData.anatomicalGifts.spouse}
              onChange={(e) => handleSpouseChange(e.target.value)}
              required
            />
          </div>
        )}

        {/* Information Note */}
        <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h4 className="text-sm font-semibold text-gray-800 mb-2">
            Understanding Anatomical Gifts
          </h4>
          <ul className="text-xs text-gray-600 space-y-1 list-disc list-inside">
            <li>
              <strong>Transplantation:</strong> Organs and tissues used to save lives
              through transplantation
            </li>
            <li>
              <strong>Research:</strong> Donation for medical research and education
            </li>
            <li>
              <strong>Any Purpose:</strong> Allows for any medically appropriate use
            </li>
            <li>
              <strong>NO Anatomical Gifts:</strong> No organ or tissue donation
            </li>
          </ul>
        </div>

        {/* Current Selection Summary */}
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-800">
            <strong>Current Selection:</strong>
          </p>
          <p className="text-sm text-green-700 mt-1">
            <strong>Client:</strong>{' '}
            {ANATOMICAL_GIFTS.find((g) => g.value === formData.anatomicalGifts.client)
              ?.label || 'Not selected'}
          </p>
          {formData.isJoint && (
            <p className="text-sm text-green-700">
              <strong>Spouse:</strong>{' '}
              {ANATOMICAL_GIFTS.find(
                (g) => g.value === formData.anatomicalGifts.spouse
              )?.label || 'Not selected'}
            </p>
          )}
        </div>
      </div>
    </Card>
  );
};

export default AnatomicalGiftsSection;
