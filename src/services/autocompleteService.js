/**
 * Autocomplete Service
 * Manages autocomplete suggestions for names, addresses, phones, etc.
 */

import { STORAGE_KEYS } from '../utils/constants';

// Get autocomplete data from local storage
const getAutocompleteData = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading autocomplete data:', error);
    return [];
  }
};

// Save autocomplete data to local storage
const saveAutocompleteData = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving autocomplete data:', error);
  }
};

// Add a new item to autocomplete suggestions
const addToAutocomplete = (key, value) => {
  if (!value || typeof value !== 'string') return;

  const trimmedValue = value.trim();
  if (trimmedValue.length === 0) return;

  const existing = getAutocompleteData(key);

  // Check if value already exists (case-insensitive)
  const exists = existing.some(
    (item) => item.toLowerCase() === trimmedValue.toLowerCase()
  );

  if (!exists) {
    const updated = [...existing, trimmedValue];
    saveAutocompleteData(key, updated);
  }
};

// Get name suggestions
export const getNameSuggestions = () => {
  return getAutocompleteData(STORAGE_KEYS.AUTOCOMPLETE_NAMES);
};

// Add name to suggestions
export const addNameSuggestion = (name) => {
  addToAutocomplete(STORAGE_KEYS.AUTOCOMPLETE_NAMES, name);
};

// Get address suggestions
export const getAddressSuggestions = () => {
  return getAutocompleteData(STORAGE_KEYS.AUTOCOMPLETE_ADDRESSES);
};

// Add address to suggestions
export const addAddressSuggestion = (address) => {
  addToAutocomplete(STORAGE_KEYS.AUTOCOMPLETE_ADDRESSES, address);
};

// Get phone suggestions
export const getPhoneSuggestions = () => {
  return getAutocompleteData(STORAGE_KEYS.AUTOCOMPLETE_PHONES);
};

// Add phone to suggestions
export const addPhoneSuggestion = (phone) => {
  addToAutocomplete(STORAGE_KEYS.AUTOCOMPLETE_PHONES, phone);
};

// Get city suggestions
export const getCitySuggestions = () => {
  return getAutocompleteData(STORAGE_KEYS.AUTOCOMPLETE_CITIES);
};

// Add city to suggestions
export const addCitySuggestion = (city) => {
  addToAutocomplete(STORAGE_KEYS.AUTOCOMPLETE_CITIES, city);
};

// Get county suggestions
export const getCountySuggestions = () => {
  return getAutocompleteData(STORAGE_KEYS.AUTOCOMPLETE_COUNTIES);
};

// Add county to suggestions
export const addCountySuggestion = (county) => {
  addToAutocomplete(STORAGE_KEYS.AUTOCOMPLETE_COUNTIES, county);
};

// Get zip suggestions
export const getZipSuggestions = () => {
  return getAutocompleteData(STORAGE_KEYS.AUTOCOMPLETE_ZIPS);
};

// Add zip to suggestions
export const addZipSuggestion = (zip) => {
  addToAutocomplete(STORAGE_KEYS.AUTOCOMPLETE_ZIPS, zip);
};

// Save form data to local storage (for auto-save)
export const saveFormDraft = (formData) => {
  try {
    localStorage.setItem(STORAGE_KEYS.FORM_DRAFT, JSON.stringify(formData));
    return true;
  } catch (error) {
    console.error('Error saving form draft:', error);
    return false;
  }
};

// Load form draft from local storage
export const loadFormDraft = () => {
  try {
    const draft = localStorage.getItem(STORAGE_KEYS.FORM_DRAFT);
    return draft ? JSON.parse(draft) : null;
  } catch (error) {
    console.error('Error loading form draft:', error);
    return null;
  }
};

// Clear form draft
export const clearFormDraft = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.FORM_DRAFT);
    return true;
  } catch (error) {
    console.error('Error clearing form draft:', error);
    return false;
  }
};
