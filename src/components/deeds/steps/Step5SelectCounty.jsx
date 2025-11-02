/**
 * Step 5: Select County & Generate PCOR
 *
 * Select the county and prepare PCOR form
 */

import { Card, Button } from '../../common';

const COUNTIES = [
  {
    id: 'los-angeles',
    name: 'Los Angeles County',
    fileName: 'los-angeles-pcor.pdf',
    description: 'Includes cities like Los Angeles, Beverly Hills, Pasadena, Long Beach, etc.'
  },
  {
    id: 'ventura',
    name: 'Ventura County',
    fileName: 'ventura-pcor.pdf',
    description: 'Includes cities like Ventura, Oxnard, Thousand Oaks, Simi Valley, etc.'
  },
  {
    id: 'san-bernardino',
    name: 'San Bernardino County',
    fileName: 'san-bernardino-pcor.pdf',
    description: 'Includes cities like San Bernardino, Fontana, Rancho Cucamonga, Ontario, etc.'
  },
  {
    id: 'riverside',
    name: 'Riverside County',
    fileName: 'riverside-pcor.pdf',
    description: 'Includes cities like Riverside, Corona, Moreno Valley, Temecula, etc.'
  },
  {
    id: 'orange',
    name: 'Orange County',
    fileName: 'orange-pcor.pdf',
    description: 'Includes cities like Santa Ana, Anaheim, Irvine, Huntington Beach, etc.'
  }
];

const Step5SelectCounty = ({ formData, updateFormData, nextStep, prevStep, setError }) => {
  const handleCountySelect = (countyId) => {
    updateFormData({ selectedCounty: countyId });
  };

  const handleContinue = () => {
    if (!formData.selectedCounty) {
      setError('Please select a county');
      window.scrollTo(0, 0);
      return;
    }

    setError('');
    nextStep();
  };

  // Try to auto-detect county from property address
  const detectedCounty = detectCounty(formData.propertyAddress?.city);

  return (
    <div className="space-y-6">
      <Card>
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Step 5: Select County
            </h2>
            <p className="text-gray-600">
              Select the county where the property is located. This determines which PCOR form will be used.
            </p>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
            <div className="flex items-start">
              <span className="text-blue-600 mr-3 text-xl">ℹ️</span>
              <div>
                <h4 className="text-blue-900 font-semibold mb-1">What is a PCOR?</h4>
                <p className="text-blue-800 text-sm">
                  A Preliminary Change of Ownership Report (PCOR) is required by California counties
                  when recording property transfers. It provides information about the transfer for
                  property tax assessment purposes.
                </p>
              </div>
            </div>
          </div>

          {detectedCounty && (
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
              <div className="flex items-start">
                <span className="text-green-600 mr-3 text-xl">✓</span>
                <div>
                  <h4 className="text-green-900 font-semibold mb-1">Auto-Detected County</h4>
                  <p className="text-green-800 text-sm">
                    Based on the property city ({formData.propertyAddress.city}), we detected this is likely in <strong>{detectedCounty.name}</strong>.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* County Selection */}
      <Card>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Select County
          </h3>

          <div className="space-y-3">
            {COUNTIES.map((county) => (
              <label
                key={county.id}
                className={`flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all
                  ${formData.selectedCounty === county.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                  }
                  ${detectedCounty?.id === county.id ? 'ring-2 ring-green-200' : ''}
                `}
              >
                <input
                  type="radio"
                  name="county"
                  value={county.id}
                  checked={formData.selectedCounty === county.id}
                  onChange={(e) => handleCountySelect(e.target.value)}
                  className="mt-1 mr-4 text-blue-600 focus:ring-blue-500"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-base font-semibold
                      ${formData.selectedCounty === county.id
                        ? 'text-blue-900'
                        : 'text-gray-900'
                      }`}>
                      {county.name}
                    </span>
                    {detectedCounty?.id === county.id && (
                      <span className="px-2 py-0.5 bg-green-100 text-green-800 text-xs font-semibold rounded">
                        Detected
                      </span>
                    )}
                  </div>
                  <p className={`text-sm mt-1
                    ${formData.selectedCounty === county.id
                      ? 'text-blue-700'
                      : 'text-gray-600'
                    }`}>
                    {county.description}
                  </p>
                </div>
              </label>
            ))}
          </div>
        </div>
      </Card>

      {/* Property Information Reminder */}
      <Card>
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900">
            Property Location
          </h3>

          <div className="bg-gray-50 p-4 rounded border border-gray-200">
            <p className="text-gray-900 font-medium">{formData.propertyAddress.street}</p>
            <p className="text-gray-700">
              {formData.propertyAddress.city}, {formData.propertyAddress.state} {formData.propertyAddress.zip}
            </p>
            <p className="text-gray-600 text-sm mt-2">
              APN: <span className="font-mono">{formData.apn}</span>
            </p>
          </div>

          <p className="text-sm text-gray-600">
            Make sure the county you select matches this property address.
          </p>
        </div>
      </Card>

      {/* PCOR Information */}
      {formData.selectedCounty && (
        <Card>
          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
            <div className="flex items-start">
              <span className="text-green-600 mr-3 text-xl">✓</span>
              <div>
                <h4 className="text-green-900 font-semibold mb-2">County Selected</h4>
                <p className="text-green-800 text-sm mb-3">
                  We'll use the official {COUNTIES.find(c => c.id === formData.selectedCounty)?.name} PCOR form.
                </p>
                <div className="text-green-800 text-sm">
                  <p className="font-medium mb-1">The PCOR will include:</p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>Property information (APN, address)</li>
                    <li>Transferor (grantor) information</li>
                    <li>Transferee (trust) information</li>
                    <li>Type of transfer and date</li>
                    <li>Exemption claim (R&T Code 62(a))</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={prevStep}>
          ← Back
        </Button>
        <Button
          variant="primary"
          onClick={handleContinue}
          disabled={!formData.selectedCounty}
        >
          Continue to PCOR Review →
        </Button>
      </div>
    </div>
  );
};

/**
 * Try to detect county from city name
 */
function detectCounty(city) {
  if (!city) return null;

  const cityLower = city.toLowerCase();

  // Los Angeles County cities
  const laCities = ['los angeles', 'beverly hills', 'santa monica', 'pasadena', 'burbank', 'glendale', 'long beach', 'torrance', 'carson', 'compton', 'inglewood', 'reseda', 'van nuys', 'north hollywood'];
  if (laCities.some(c => cityLower.includes(c))) {
    return COUNTIES.find(c => c.id === 'los-angeles');
  }

  // Ventura County cities
  const venturaCities = ['ventura', 'oxnard', 'thousand oaks', 'simi valley', 'camarillo', 'moorpark'];
  if (venturaCities.some(c => cityLower.includes(c))) {
    return COUNTIES.find(c => c.id === 'ventura');
  }

  // San Bernardino County cities
  const sbCities = ['san bernardino', 'fontana', 'rancho cucamonga', 'ontario', 'victorville', 'hesperia', 'chino'];
  if (sbCities.some(c => cityLower.includes(c))) {
    return COUNTIES.find(c => c.id === 'san-bernardino');
  }

  // Riverside County cities
  const riversideCities = ['riverside', 'corona', 'moreno valley', 'temecula', 'murrieta', 'hemet', 'palm desert'];
  if (riversideCities.some(c => cityLower.includes(c))) {
    return COUNTIES.find(c => c.id === 'riverside');
  }

  // Orange County cities
  const orangeCities = ['santa ana', 'anaheim', 'irvine', 'huntington beach', 'orange', 'fullerton', 'costa mesa', 'mission viejo', 'newport beach'];
  if (orangeCities.some(c => cityLower.includes(c))) {
    return COUNTIES.find(c => c.id === 'orange');
  }

  return null;
}

export { COUNTIES };
export default Step5SelectCounty;
