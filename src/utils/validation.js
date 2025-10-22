/**
 * Validation utility functions for form inputs
 */

// Email validation
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Phone number validation (XXX) XXX-XXXX
export const validatePhone = (phone) => {
  const phoneRegex = /^\(\d{3}\)\s\d{3}-\d{4}$/;
  return phoneRegex.test(phone);
};

// SSN validation XXX-XX-XXXX
export const validateSSN = (ssn) => {
  const ssnRegex = /^\d{3}-\d{2}-\d{4}$/;
  return ssnRegex.test(ssn);
};

// Zip code validation (5 digits)
export const validateZipCode = (zip) => {
  const zipRegex = /^\d{5}$/;
  return zipRegex.test(zip);
};

// Required field validation
export const validateRequired = (value) => {
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }
  return value !== null && value !== undefined && value !== '';
};

// Date validation
export const validateDate = (date) => {
  if (!date) return false;
  const dateObj = new Date(date);
  return dateObj instanceof Date && !isNaN(dateObj);
};

// Age validation (must be 18 or older)
export const validateAge = (birthdate) => {
  if (!validateDate(birthdate)) return false;
  const today = new Date();
  const birth = new Date(birthdate);
  const age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    return age - 1 >= 18;
  }
  return age >= 18;
};

// Percentage validation (0-100)
export const validatePercentage = (value) => {
  const num = parseFloat(value);
  return !isNaN(num) && num >= 0 && num <= 100;
};

// Validate total percentages equal 100
export const validateTotalPercentage = (percentages) => {
  const total = percentages.reduce((sum, p) => sum + parseFloat(p || 0), 0);
  return Math.abs(total - 100) < 0.01; // Allow for floating point precision
};

// Name validation (at least 2 characters)
export const validateName = (name) => {
  return typeof name === 'string' && name.trim().length >= 2;
};

// Validate array has at least one item
export const validateArrayNotEmpty = (arr) => {
  return Array.isArray(arr) && arr.length > 0;
};

// Generic form validation
export const validateForm = (data, rules) => {
  const errors = {};

  Object.keys(rules).forEach(field => {
    const rule = rules[field];
    const value = data[field];

    if (rule.required && !validateRequired(value)) {
      errors[field] = rule.message || `${field} is required`;
    } else if (rule.validate && !rule.validate(value)) {
      errors[field] = rule.message || `${field} is invalid`;
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
