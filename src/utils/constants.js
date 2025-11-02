/**
 * Constants and enums used throughout the application
 */

// Marital Status Options
export const MARITAL_STATUS = [
  { value: 'single', label: 'Single' },
  { value: 'married', label: 'Married' },
  { value: 'divorced', label: 'Divorced' },
  { value: 'widowed', label: 'Widowed' },
];

// Sex Options
export const SEX_OPTIONS = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
];

// Relation Options
export const RELATION_OPTIONS = [
  { value: 'son', label: 'Son' },
  { value: 'daughter', label: 'Daughter' },
  { value: 'grandson', label: 'Grandson' },
  { value: 'granddaughter', label: 'Granddaughter' },
  { value: 'brother', label: 'Brother' },
  { value: 'sister', label: 'Sister' },
  { value: 'nephew', label: 'Nephew' },
  { value: 'niece', label: 'Niece' },
  { value: 'friend', label: 'Friend' },
  { value: 'other', label: 'Other' },
];

// Distribution Type Options
export const DISTRIBUTION_TYPE = [
  { value: 'outright', label: 'Outright' },
  { value: 'guardian', label: 'Guardian' },
  { value: 'needsTrust', label: 'Needs Trust' },
];

// Lapse Options for Specific Distribution
export const LAPSE_OPTIONS = [
  { value: 'descendants', label: 'To Descendants' },
  { value: 'residuary', label: 'To Residuary' },
  { value: 'other', label: 'Other Beneficiaries' },
];

// Anatomical Gifts Options
export const ANATOMICAL_GIFTS = [
  { value: 'none', label: 'NO Anatomical Gifts' },
  { value: 'transplantation', label: 'For Transplantation ONLY' },
  { value: 'research', label: 'For Research Purposes ONLY' },
  { value: 'transplantOrResearch', label: 'For Transplantation or Research' },
  { value: 'any', label: 'For ANY Purpose' },
];

// US States (California default, expandable)
export const US_STATES = [
  { value: 'CA', label: 'California' },
  { value: 'NY', label: 'New York' },
  { value: 'TX', label: 'Texas' },
  { value: 'FL', label: 'Florida' },
  { value: 'IL', label: 'Illinois' },
  // Add more states as needed
];

// Document Types
export const DOCUMENT_TYPES = {
  LIVING_TRUST: 'living_trust',
  TRUST_CERTIFICATE: 'trust_certificate',
  POUR_OVER_WILL: 'pour_over_will',
  DURABLE_POA: 'durable_poa',
  HEALTHCARE_POA: 'healthcare_poa',
  HEALTHCARE_DIRECTIVE: 'healthcare_directive',
  HIPAA_AUTHORIZATION: 'hipaa_authorization',
};

// Trust Types
export const TRUST_TYPES = {
  SINGLE: 'single',
  JOINT: 'joint',
  SINGLE_IRREVOCABLE: 'single_irrevocable',
  JOINT_IRREVOCABLE: 'joint_irrevocable',
  FIRST_PARTY_SNT: 'first_party_snt',
  THIRD_PARTY_SNT: 'third_party_snt',
};

// Trust Type Options for Radio Buttons
export const TRUST_TYPE_OPTIONS = [
  { value: 'single', label: 'Single Trust (Revocable)', description: 'Living trust for one grantor' },
  { value: 'joint', label: 'Joint Trust (Revocable)', description: 'Living trust for married couple or partners' },
  { value: 'single_irrevocable', label: 'Irrevocable Trust (Single)', description: 'Irrevocable trust for one grantor' },
  { value: 'joint_irrevocable', label: 'Irrevocable Trust (Joint)', description: 'Irrevocable trust for married couple or partners' },
  { value: 'first_party_snt', label: 'First Party Special Needs Trust', description: 'Self-settled SNT funded with beneficiary\'s own assets' },
  { value: 'third_party_snt', label: 'Third Party Special Needs Trust', description: 'SNT funded by someone other than the beneficiary' },
];

// Form Section IDs
export const FORM_SECTIONS = {
  TRUST_TYPE: 'trustType',
  CLIENT_INFO: 'clientInfo',
  TRUST_NAME: 'trustName',
  CHILDREN: 'children',
  SUCCESSOR_TRUSTEES: 'successorTrustees',
  SPECIFIC_DISTRIBUTION: 'specificDistribution',
  RESIDUARY_DISTRIBUTION: 'residuaryDistribution',
  GENERAL_NEEDS_TRUST: 'generalNeedsTrust',
  CHARITABLE_DISTRIBUTION: 'charitableDistribution',
  POUR_OVER_WILL: 'pourOverWill',
  GUARDIANS: 'guardians',
  DURABLE_POA: 'durablePOA',
  HEALTHCARE_POA: 'healthcarePOA',
  ANATOMICAL_GIFTS: 'anatomicalGifts',
};

// Default form values
export const DEFAULT_CLIENT = {
  notaryDate: '',
  firstName: '',
  middleName: '',
  lastName: '',
  dateOfBirth: '',
  sex: '',
  ssn: '',
  maritalStatus: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  zip: '',
  county: '',
  state: 'CA',
};

export const DEFAULT_CHILD = {
  name: '',
  birthday: '',
  relation: 'son',
};

export const DEFAULT_TRUSTEE = {
  name: '',
  address: '',
  phone: '',
  jointly: false,
};

export const DEFAULT_SPECIFIC_DISTRIBUTION = {
  beneficiary: '',
  description: '',
  distributionType: 'age',
  ageDistributions: [{ age: '', percentage: '' }],
  eventDescription: '',
  descendants: false,
  lapse: 'descendants',
};

export const DEFAULT_RESIDUARY_BENEFICIARY = {
  name: '',
  sex: '',
  relation: '',
  share: '',
  distributionType: 'outright',
  ageMilestones: [{ age: '', percentage: '' }],
};

export const DEFAULT_NEEDS_TRUST = {
  beneficiary: '',
  distributionType: 'age', // 'age' or 'condition'
  ageMilestones: [{ age: '', percentage: '' }],
  condition: '', // Used when distributionType is 'condition'
  distributionPercentage: '',
  specialConditions: '',
};

export const DEFAULT_CHARITY = {
  name: '',
  taxId: '',
  address: '',
  amount: '',
  percentage: '',
};

export const DEFAULT_GUARDIAN = {
  name: '',
  address: '',
  phone: '',
  jointly: false,
};

// Auto-save interval (milliseconds)
export const AUTO_SAVE_INTERVAL = 30000; // 30 seconds

// Local storage keys
export const STORAGE_KEYS = {
  FORM_DRAFT: 'estate_planning_draft',
  AUTOCOMPLETE_NAMES: 'autocomplete_names',
  AUTOCOMPLETE_ADDRESSES: 'autocomplete_addresses',
  AUTOCOMPLETE_PHONES: 'autocomplete_phones',
  AUTOCOMPLETE_CITIES: 'autocomplete_cities',
  AUTOCOMPLETE_COUNTIES: 'autocomplete_counties',
};
