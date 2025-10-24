import { useFormContext } from '../../../context/FormContext';
import { Card, Input, Select } from '../../common';

const ClientInfoSection = () => {
  const { formData, updateFormData } = useFormContext();
  const isJoint = formData.isJoint || formData.trustType === 'joint';

  const handleClientChange = (field, value) => {
    updateFormData({
      client: {
        ...formData.client,
        [field]: value
      }
    });
  };

  const handleSpouseChange = (field, value) => {
    updateFormData({
      spouse: {
        ...formData.spouse,
        [field]: value
      }
    });
  };

  return (
    <>
      {/* Client Information */}
      <Card>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              {isJoint ? 'Client 1 Information' : 'Client Information'}
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Enter the grantor/settlor information
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="First Name"
              name="clientFirstName"
              value={formData.client?.firstName || ''}
              onChange={(e) => handleClientChange('firstName', e.target.value)}
              required
            />
            <Input
              label="Middle Name"
              name="clientMiddleName"
              value={formData.client?.middleName || ''}
              onChange={(e) => handleClientChange('middleName', e.target.value)}
            />
            <Input
              label="Last Name"
              name="clientLastName"
              value={formData.client?.lastName || ''}
              onChange={(e) => handleClientChange('lastName', e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Date of Birth"
              name="clientDOB"
              type="date"
              value={formData.client?.dateOfBirth || ''}
              onChange={(e) => handleClientChange('dateOfBirth', e.target.value)}
            />
            <Select
              label="Sex"
              name="clientSex"
              value={formData.client?.sex || ''}
              onChange={(e) => handleClientChange('sex', e.target.value)}
              options={[
                { value: '', label: 'Select...' },
                { value: 'Male', label: 'Male' },
                { value: 'Female', label: 'Female' }
              ]}
            />
          </div>

          <Input
            label="Address"
            name="clientAddress"
            value={formData.client?.address || ''}
            onChange={(e) => handleClientChange('address', e.target.value)}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="City"
              name="clientCity"
              value={formData.client?.city || ''}
              onChange={(e) => handleClientChange('city', e.target.value)}
            />
            <Input
              label="State"
              name="clientState"
              value={formData.client?.state || 'California'}
              onChange={(e) => handleClientChange('state', e.target.value)}
            />
            <Input
              label="ZIP Code"
              name="clientZip"
              value={formData.client?.zip || ''}
              onChange={(e) => handleClientChange('zip', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="County"
              name="clientCounty"
              value={formData.client?.county || ''}
              onChange={(e) => handleClientChange('county', e.target.value)}
            />
            <Input
              label="Phone"
              name="clientPhone"
              type="tel"
              value={formData.client?.phone || ''}
              onChange={(e) => handleClientChange('phone', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Email"
              name="clientEmail"
              type="email"
              value={formData.client?.email || ''}
              onChange={(e) => handleClientChange('email', e.target.value)}
            />
            <Input
              label="SSN (Optional)"
              name="clientSSN"
              value={formData.client?.ssn || ''}
              onChange={(e) => handleClientChange('ssn', e.target.value)}
              placeholder="XXX-XX-XXXX"
            />
          </div>

          <Select
            label="Marital Status"
            name="clientMaritalStatus"
            value={formData.client?.maritalStatus || ''}
            onChange={(e) => handleClientChange('maritalStatus', e.target.value)}
            options={[
              { value: '', label: 'Select...' },
              { value: 'Single', label: 'Single' },
              { value: 'Married', label: 'Married' },
              { value: 'Divorced', label: 'Divorced' },
              { value: 'Widowed', label: 'Widowed' }
            ]}
          />
        </div>
      </Card>

      {/* Spouse Information (for Joint Trusts) */}
      {isJoint && (
        <Card>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Client 2 (Spouse) Information</h3>
              <p className="text-sm text-gray-600 mt-1">
                Enter the second grantor/settlor information
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                label="First Name"
                name="spouseFirstName"
                value={formData.spouse?.firstName || ''}
                onChange={(e) => handleSpouseChange('firstName', e.target.value)}
                required
              />
              <Input
                label="Middle Name"
                name="spouseMiddleName"
                value={formData.spouse?.middleName || ''}
                onChange={(e) => handleSpouseChange('middleName', e.target.value)}
              />
              <Input
                label="Last Name"
                name="spouseLastName"
                value={formData.spouse?.lastName || ''}
                onChange={(e) => handleSpouseChange('lastName', e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Date of Birth"
                name="spouseDOB"
                type="date"
                value={formData.spouse?.dateOfBirth || ''}
                onChange={(e) => handleSpouseChange('dateOfBirth', e.target.value)}
              />
              <Select
                label="Sex"
                name="spouseSex"
                value={formData.spouse?.sex || ''}
                onChange={(e) => handleSpouseChange('sex', e.target.value)}
                options={[
                  { value: '', label: 'Select...' },
                  { value: 'Male', label: 'Male' },
                  { value: 'Female', label: 'Female' }
                ]}
              />
            </div>

            <Input
              label="Address (if different)"
              name="spouseAddress"
              value={formData.spouse?.address || ''}
              onChange={(e) => handleSpouseChange('address', e.target.value)}
              placeholder="Leave blank if same as Client 1"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Phone"
                name="spousePhone"
                type="tel"
                value={formData.spouse?.phone || ''}
                onChange={(e) => handleSpouseChange('phone', e.target.value)}
              />
              <Input
                label="Email"
                name="spouseEmail"
                type="email"
                value={formData.spouse?.email || ''}
                onChange={(e) => handleSpouseChange('email', e.target.value)}
              />
            </div>

            <Input
              label="SSN (Optional)"
              name="spouseSSN"
              value={formData.spouse?.ssn || ''}
              onChange={(e) => handleSpouseChange('ssn', e.target.value)}
              placeholder="XXX-XX-XXXX"
            />
          </div>
        </Card>
      )}
    </>
  );
};

export default ClientInfoSection;
