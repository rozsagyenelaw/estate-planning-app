/**
 * Name Parser Utility
 * Parses full names into firstName, middleName, lastName
 */

/**
 * Parse a full name into components
 * @param {string} fullName - The full name to parse
 * @returns {Object} - { firstName, middleName, lastName, fullName }
 */
export const parseFullName = (fullName) => {
  if (!fullName || typeof fullName !== 'string') {
    return {
      firstName: '',
      middleName: '',
      lastName: '',
      fullName: '',
    };
  }

  const trimmed = fullName.trim();
  if (trimmed === '') {
    return {
      firstName: '',
      middleName: '',
      lastName: '',
      fullName: '',
    };
  }

  // Split by spaces
  const parts = trimmed.split(/\s+/);

  if (parts.length === 1) {
    // Single name - use as first name
    return {
      firstName: parts[0],
      middleName: '',
      lastName: '',
      fullName: trimmed,
    };
  } else if (parts.length === 2) {
    // Two names - first and last
    return {
      firstName: parts[0],
      middleName: '',
      lastName: parts[1],
      fullName: trimmed,
    };
  } else {
    // Three or more names - first, middle(s), last
    const firstName = parts[0];
    const lastName = parts[parts.length - 1];
    const middleName = parts.slice(1, -1).join(' ');

    return {
      firstName,
      middleName,
      lastName,
      fullName: trimmed,
    };
  }
};

/**
 * Combine name parts into a full name
 * @param {string} firstName
 * @param {string} middleName
 * @param {string} lastName
 * @returns {string} - Full name
 */
export const combineNameParts = (firstName = '', middleName = '', lastName = '') => {
  const parts = [firstName, middleName, lastName].filter(part => part && part.trim());
  return parts.join(' ');
};

/**
 * Get display name from parsed name object
 * @param {Object} nameObj - Object with firstName, middleName, lastName, fullName
 * @returns {string} - Display name
 */
export const getDisplayName = (nameObj) => {
  if (nameObj?.fullName) {
    return nameObj.fullName;
  }
  return combineNameParts(nameObj?.firstName, nameObj?.middleName, nameObj?.lastName);
};
