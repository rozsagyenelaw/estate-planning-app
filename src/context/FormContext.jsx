import { createContext, useContext, useState, useEffect } from 'react';
import {
  DEFAULT_CLIENT,
  TRUST_TYPES,
  AUTO_SAVE_INTERVAL,
} from '../utils/constants';
import {
  saveFormDraft,
  loadFormDraft,
  addNameSuggestion,
  addAddressSuggestion,
  addPhoneSuggestion,
  addCitySuggestion,
  addCountySuggestion,
} from '../services/autocompleteService';

const FormContext = createContext();

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    // Trust type configuration
    trustType: TRUST_TYPES.SINGLE,
    isJoint: false,
    isIrrevocable: false,
    isRestatement: false,
    originalTrustName: '',
    originalTrustDate: '',

    // Client information
    client: { ...DEFAULT_CLIENT },
    spouse: null,

    // Trust name
    customTrustName: false,
    trustName: '',

    // Children
    children: [],

    // Successor Trustees
    successorTrustees: [],

    // Specific Distribution
    specificDistributions: [],

    // Residuary Distribution
    residuaryBeneficiaries: [],
    residuaryEvenSplit: false,
    residuaryDistributionType: 'descendants', // descendants, other, individuals

    // General Needs Trust
    generalNeedsTrusts: [],

    // Charitable Distribution
    charitableDistributions: [],

    // Pour Over Will Representatives
    pourOverRepresentatives: {
      client: [],
      spouse: [],
    },

    // Guardians
    guardians: [],

    // Durable Power of Attorney
    durablePOA: {
      client: [],
      spouse: [],
    },

    // Healthcare Power of Attorney
    healthcarePOA: {
      client: [],
      spouse: [],
    },

    // Anatomical Gifts
    anatomicalGifts: {
      client: 'none',
      spouse: 'none',
    },
  });

  const [isDraft, setIsDraft] = useState(false);

  // Load draft on mount
  useEffect(() => {
    const draft = loadFormDraft();
    if (draft) {
      setFormData(draft);
      setIsDraft(true);
    }
  }, []);

  // Auto-save every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      saveFormDraft(formData);
    }, AUTO_SAVE_INTERVAL);

    return () => clearInterval(interval);
  }, [formData]);

  // Update form data
  const updateFormData = (updates) => {
    setFormData((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  // Update client data
  const updateClientData = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      client: {
        ...prev.client,
        [field]: value,
      },
    }));

    // Add to autocomplete suggestions
    if (field === 'name' && value) addNameSuggestion(value);
    if (field === 'address' && value) addAddressSuggestion(value);
    if (field === 'phone' && value) addPhoneSuggestion(value);
    if (field === 'city' && value) addCitySuggestion(value);
    if (field === 'county' && value) addCountySuggestion(value);
  };

  // Update spouse data
  const updateSpouseData = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      spouse: {
        ...(prev.spouse || DEFAULT_CLIENT),
        [field]: value,
      },
    }));

    // Add to autocomplete suggestions
    if (field === 'name' && value) addNameSuggestion(value);
    if (field === 'address' && value) addAddressSuggestion(value);
    if (field === 'phone' && value) addPhoneSuggestion(value);
    if (field === 'city' && value) addCitySuggestion(value);
    if (field === 'county' && value) addCountySuggestion(value);
  };

  // Toggle trust type between single and joint (legacy function)
  const toggleTrustType = (isJoint) => {
    setFormData((prev) => ({
      ...prev,
      isJoint,
      trustType: isJoint ? TRUST_TYPES.JOINT : TRUST_TYPES.SINGLE,
      spouse: isJoint ? (prev.spouse || { ...DEFAULT_CLIENT }) : null,
    }));
  };

  // Set trust type (handles all trust types including irrevocable)
  const setTrustType = (trustType) => {
    const isJoint = trustType === TRUST_TYPES.JOINT || trustType === TRUST_TYPES.JOINT_IRREVOCABLE;
    const isIrrevocable = trustType === TRUST_TYPES.SINGLE_IRREVOCABLE || trustType === TRUST_TYPES.JOINT_IRREVOCABLE;

    setFormData((prev) => ({
      ...prev,
      trustType,
      isJoint,
      isIrrevocable,
      spouse: isJoint ? (prev.spouse || { ...DEFAULT_CLIENT }) : null,
    }));
  };

  // Add item to array field
  const addArrayItem = (field, item) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], item],
    }));
  };

  // Update item in array field
  const updateArrayItem = (field, index, updates) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) =>
        i === index ? { ...item, ...updates } : item
      ),
    }));
  };

  // Remove item from array field
  const removeArrayItem = (field, index) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      trustType: TRUST_TYPES.SINGLE,
      isJoint: false,
      isIrrevocable: false,
      isRestatement: false,
      originalTrustName: '',
      originalTrustDate: '',
      client: { ...DEFAULT_CLIENT },
      spouse: null,
      customTrustName: false,
      trustName: '',
      children: [],
      successorTrustees: [],
      specificDistributions: [],
      residuaryBeneficiaries: [],
      residuaryEvenSplit: false,
      residuaryDistributionType: 'descendants',
      generalNeedsTrusts: [],
      charitableDistributions: [],
      pourOverRepresentatives: { client: [], spouse: [] },
      guardians: [],
      durablePOA: { client: [], spouse: [] },
      healthcarePOA: { client: [], spouse: [] },
      anatomicalGifts: { client: 'none', spouse: 'none' },
    });
    setIsDraft(false);
  };

  const value = {
    formData,
    setFormData,
    updateFormData,
    updateClientData,
    updateSpouseData,
    toggleTrustType,
    setTrustType,
    addArrayItem,
    updateArrayItem,
    removeArrayItem,
    resetForm,
    isDraft,
  };

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};
