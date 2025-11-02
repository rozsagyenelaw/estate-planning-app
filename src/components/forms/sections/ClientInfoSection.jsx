import React from 'react';
import { useFormContext } from '../../../context/FormContext';
import { Card, Input, Select, Autocomplete } from '../../common';
import { parseFullName, combineNameParts } from '../../../utils/nameParser';

const ClientInfoSection = () => {
  const { formData, updateFormData, updateClientData, updateSpouseData } = useFormContext();
  const isJoint = formData.isJoint ||
                  formData.trustType === 'joint' ||
                  formData.trustType === 'joint_irrevocable' ||
                  formData.trustType === 'joint_first_party_snt' ||
                  formData.trustType === 'joint_third_party_snt';

  const handleClientChange = (field, value) => {
    updateClientData(field, value);
  };

  const handleSpouseChange = (field, value) => {
    updateSpouseData(field, value);
  };

  // Handle client full name input (store raw input without parsing)
  const handleClientFullNameChange = (value) => {
    updateClientData('fullName', value);
  };

  // Parse client name when done typing (on blur or select)
  const handleClientFullNameParse = (fullName) => {
    const parsed = parseFullName(fullName);
    updateClientData('fullName', fullName);
    updateClientData('firstName', parsed.firstName);
    updateClientData('middleName', parsed.middleName);
    updateClientData('lastName', parsed.lastName);
  };

  // Handle spouse full name input (store raw input without parsing)
  const handleSpouseFullNameChange = (value) => {
    updateSpouseData('fullName', value);
  };

  // Parse spouse name when done typing (on blur or select)
  const handleSpouseFullNameParse = (fullName) => {
    const parsed = parseFullName(fullName);
    updateSpouseData('fullName', fullName);
    updateSpouseData('firstName', parsed.firstName);
    updateSpouseData('middleName', parsed.middleName);
    updateSpouseData('lastName', parsed.lastName);
  };

  // Get current full names
  const clientFullName = combineNameParts(
    formData.client?.firstName,
    formData.client?.middleName,
    formData.client?.lastName
  );

  const spouseFullName = combineNameParts(
    formData.spouse?.firstName,
    formData.spouse?.middleName,
    formData.spouse?.lastName
  );

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

          <Autocomplete
            label="Full Name"
            name="clientFullName"
            value={formData.client?.fullName !== undefined ? formData.client.fullName : clientFullName}
            onChange={(e) => handleClientFullNameChange(e.target.value)}
            onSelect={(value) => handleClientFullNameParse(value)}
            onBlur={(e) => handleClientFullNameParse(e.target.value)}
            placeholder="e.g., John Michael Smith"
            required
          />

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

          <Autocomplete
            label="Address"
            name="clientAddress"
            value={formData.client?.address || ''}
            onChange={(e) => handleClientChange('address', e.target.value)}
            onSelect={(value) => handleClientChange('address', value)}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Autocomplete
              label="City"
              name="clientCity"
              value={formData.client?.city || ''}
              onChange={(e) => handleClientChange('city', e.target.value)}
              onSelect={(value) => handleClientChange('city', value)}
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
            <Autocomplete
              label="County"
              name="clientCounty"
              value={formData.client?.county || ''}
              onChange={(e) => handleClientChange('county', e.target.value)}
              onSelect={(value) => handleClientChange('county', value)}
            />
            <Autocomplete
              label="Phone"
              name="clientPhone"
              type="tel"
              value={formData.client?.phone || ''}
              onChange={(e) => handleClientChange('phone', e.target.value)}
              onSelect={(value) => handleClientChange('phone', value)}
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

            <Autocomplete
              label="Full Name"
              name="spouseFullName"
              value={formData.spouse?.fullName !== undefined ? formData.spouse.fullName : spouseFullName}
              onChange={(e) => handleSpouseFullNameChange(e.target.value)}
              onSelect={(value) => handleSpouseFullNameParse(value)}
              onBlur={(e) => handleSpouseFullNameParse(e.target.value)}
              placeholder="e.g., Jane Marie Johnson"
              required
            />

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

            <Autocomplete
              label="Address (if different)"
              name="spouseAddress"
              value={formData.spouse?.address || ''}
              onChange={(e) => handleSpouseChange('address', e.target.value)}
              onSelect={(value) => handleSpouseChange('address', value)}
              placeholder="Leave blank if same as Client 1"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Autocomplete
                label="Phone"
                name="spousePhone"
                type="tel"
                value={formData.spouse?.phone || ''}
                onChange={(e) => handleSpouseChange('phone', e.target.value)}
                onSelect={(value) => handleSpouseChange('phone', value)}
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
