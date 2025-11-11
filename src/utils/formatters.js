/**
 * Formatting utility functions for form inputs
 */

// Format phone number as (XXX) XXX-XXXX
export const formatPhoneNumber = (value) => {
  if (!value) return '';

  // Remove all non-numeric characters
  const cleaned = value.replace(/\D/g, '');

  // Format based on length
  if (cleaned.length <= 3) {
    return cleaned;
  } else if (cleaned.length <= 6) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
  } else {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
  }
};

// Format SSN as XXX-XX-XXXX
export const formatSSN = (value) => {
  if (!value) return '';

  // Remove all non-numeric characters
  const cleaned = value.replace(/\D/g, '');

  // Format based on length
  if (cleaned.length <= 3) {
    return cleaned;
  } else if (cleaned.length <= 5) {
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
  } else {
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 5)}-${cleaned.slice(5, 9)}`;
  }
};

// Format zip code (5 digits)
export const formatZipCode = (value) => {
  if (!value) return '';
  return value.replace(/\D/g, '').slice(0, 5);
};

// Format date for display (Month DD, YYYY)
export const formatDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  if (isNaN(d.getTime())) return '';

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const month = monthNames[d.getMonth()];
  const day = d.getDate();
  const year = d.getFullYear();

  return `${month} ${day}, ${year}`;
};

// Format date for input value (YYYY-MM-DD)
export const formatDateForInput = (date) => {
  if (!date) return '';
  const d = new Date(date);
  if (isNaN(d.getTime())) return '';

  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const year = d.getFullYear();

  return `${year}-${month}-${day}`;
};

// Format currency
export const formatCurrency = (value) => {
  if (!value && value !== 0) return '';

  const num = parseFloat(value);
  if (isNaN(num)) return '';

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(num);
};

// Format percentage
export const formatPercentage = (value) => {
  if (!value && value !== 0) return '';

  const num = parseFloat(value);
  if (isNaN(num)) return '';

  return `${num}%`;
};

// Capitalize first letter of each word
export const capitalizeWords = (str) => {
  if (!str) return '';
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// Format name (capitalize properly)
export const formatName = (name) => {
  if (!name) return '';
  return capitalizeWords(name.trim());
};

// Generate trust name from client info
export const generateTrustName = (clientName, spouseName = null, isJoint = false) => {
  if (isJoint && spouseName) {
    // For joint trust: "John Doe & Jane Doe Family Trust"
    return `${clientName} & ${spouseName} Family Trust`;
  }
  // For single trust: "John Doe Living Trust"
  return `${clientName} Living Trust`;
};

// Format address (capitalize)
export const formatAddress = (address) => {
  if (!address) return '';
  return capitalizeWords(address.trim());
};

// Remove formatting from phone number
export const unformatPhoneNumber = (formatted) => {
  if (!formatted) return '';
  return formatted.replace(/\D/g, '');
};

// Remove formatting from SSN
export const unformatSSN = (formatted) => {
  if (!formatted) return '';
  return formatted.replace(/\D/g, '');
};

// Calculate age from birthdate
export const calculateAge = (birthdate) => {
  if (!birthdate) return null;

  const today = new Date();
  const birth = new Date(birthdate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age;
};

// Format full name with optional suffix
export const formatFullName = (firstName, middleName = '', lastName, suffix = '') => {
  const parts = [firstName, middleName, lastName, suffix].filter(Boolean);
  return parts.join(' ');
};
