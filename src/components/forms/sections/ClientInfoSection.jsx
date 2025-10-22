import { useFormContext } from '../../../context/FormContext';
import { Card, Input, DatePicker, Radio, Select, Autocomplete } from '../../common';
import { MARITAL_STATUS, SEX_OPTIONS } from '../../../utils/constants';
import { formatPhoneNumber, formatSSN, formatZipCode } from '../../../utils/formatters';
import {
  getNameSuggestions,
  getAddressSuggestions,
  getPhoneSuggestions,
  getCitySuggestions,
  getCountySuggestions,
} from '../../../services/autocompleteService';

const ClientInfoSection = () => {
  const { formData, updateClientData, updateSpouseData } = useFormContext();

  const handleClientChange = (field, value) => {
    // Apply formatting for specific fields
    if (field === 'phone') {
      value = formatPhoneNumber(value);
    } else if (field === 'ssn') {
      value = formatSSN(value);
    } else if (field === 'zipCode') {
      value = formatZipCode(value);
    }

    updateClientData(field, value);
  };

  const handleSpouseChange = (field, value) => {
    // Apply formatting for specific fields
    if (field === 'phone') {
      value = formatPhoneNumber(value);
    } else if (field === 'ssn') {
      value = formatSSN(value);
    } else if (field === 'zipCode') {
      value = formatZipCode(value);
    }

    updateSpouseData(field, value);
  };

  const renderClientFields = (person, handleChange, label = 'Client') => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{label} Information</h3>

      <DatePicker
        label="Notary Date"
        value={person.notaryDate}
        onChange={(e) => handleChange('notaryDate', e.target.value)}
        required
      />

      <Input
        label="First Name"
        value={person.firstName}
        onChange={(e) => handleChange('firstName', e.target.value)}
        placeholder="Enter first name"
        required
      />

      <Input
        label="Middle Name"
        value={person.middleName}
        onChange={(e) => handleChange('middleName', e.target.value)}
        placeholder="Enter middle name (optional)"
      />

      <Input
        label="Last Name"
        value={person.lastName}
        onChange={(e) => handleChange('lastName', e.target.value)}
        placeholder="Enter last name"
        required
      />

      <DatePicker
        label="Date of Birth"
        value={person.dateOfBirth}
        onChange={(e) => handleChange('dateOfBirth', e.target.value)}
        required
      />

      <Radio
        label="Sex"
        name={`sex-${label}`}
        options={SEX_OPTIONS}
        value={person.sex}
        onChange={(e) => handleChange('sex', e.target.value)}
        required
      />

      <Input
        label="Social Security Number"
        value={person.ssn}
        onChange={(e) => handleChange('ssn', e.target.value)}
        placeholder="XXX-XX-XXXX"
        maxLength={11}
        required
        helperText="Format: XXX-XX-XXXX"
      />

      <Select
        label="Marital Status"
        options={MARITAL_STATUS}
        value={person.maritalStatus}
        onChange={(e) => handleChange('maritalStatus', e.target.value)}
        required
      />

      <Input
        label="Email"
        type="email"
        value={person.email}
        onChange={(e) => handleChange('email', e.target.value)}
        placeholder="email@example.com"
        required
      />

      <Input
        label="Phone Number"
        value={person.phone}
        onChange={(e) => handleChange('phone', e.target.value)}
        placeholder="(XXX) XXX-XXXX"
        maxLength={14}
        required
        helperText="Format: (XXX) XXX-XXXX"
      />

      <Autocomplete
        label="Address"
        value={person.address}
        onChange={(e) => handleChange('address', e.target.value)}
        onSelect={(value) => handleChange('address', value)}
        suggestions={getAddressSuggestions()}
        placeholder="Enter street address"
        required
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Autocomplete
          label="City"
          value={person.city}
          onChange={(e) => handleChange('city', e.target.value)}
          onSelect={(value) => handleChange('city', value)}
          suggestions={getCitySuggestions()}
          placeholder="City"
          required
        />

        <Input
          label="Zip Code"
          value={person.zip}
          onChange={(e) => handleChange('zip', e.target.value)}
          placeholder="12345"
          maxLength={5}
          required
        />

        <Autocomplete
          label="County"
          value={person.county}
          onChange={(e) => handleChange('county', e.target.value)}
          onSelect={(value) => handleChange('county', value)}
          suggestions={getCountySuggestions()}
          placeholder="County"
          required
        />
      </div>
    </div>
  );

  return (
    <Card title="Client Information" collapsible defaultOpen={true}>
      {renderClientFields(formData.client, handleClientChange, 'Client')}

      {formData.isJoint && formData.spouse && (
        <div className="mt-8 pt-8 border-t border-gray-200">
          {renderClientFields(formData.spouse, handleSpouseChange, 'Spouse')}
        </div>
      )}
    </Card>
  );
};

export default ClientInfoSection;
