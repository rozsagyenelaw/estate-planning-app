// Test joint trust name generation

console.log('=== TESTING JOINT TRUST NAME GENERATION ===\n');

// Test 1: Joint trust without provided trust name
const testData1 = {
  isJoint: true,
  client: {
    firstName: 'John',
    middleName: 'M.',
    lastName: 'Smith',
  },
  spouse: {
    firstName: 'Jane',
    middleName: 'L.',
    lastName: 'Smith',
  },
  trustName: undefined, // No trust name provided
};

// Simulate the trust name generation logic
const generateTrustName = (formData) => {
  if (formData.isJoint && formData.client && formData.spouse) {
    const grantor1 = `${formData.client.firstName || ''} ${formData.client.middleName || ''} ${formData.client.lastName || ''}`.trim();
    const grantor2 = `${formData.spouse.firstName || ''} ${formData.spouse.middleName || ''} ${formData.spouse.lastName || ''}`.trim();

    if (formData.trustName &&
        formData.trustName.includes(formData.client.lastName) &&
        (formData.trustName.includes(formData.spouse.firstName) || formData.trustName.includes(formData.spouse.lastName))) {
      return formData.trustName;
    }

    return `The ${grantor1} and ${grantor2} Living Trust`;
  }

  return formData.trustName || (formData.client
    ? `The ${formData.client.firstName || ''} ${formData.client.middleName || ''} ${formData.client.lastName || ''} Living Trust`.trim()
    : '');
};

console.log('TEST 1: Joint Trust - No Trust Name Provided');
console.log('=============================================');
const result1 = generateTrustName(testData1);
console.log('Generated:', result1);
console.log('Expected: "The John M. Smith and Jane L. Smith Living Trust"');
console.log('Match:', result1 === 'The John M. Smith and Jane L. Smith Living Trust' ? '✓ PASS' : '✗ FAIL');
console.log('');

// Test 2: Joint trust with incomplete trust name (only one spouse)
const testData2 = {
  isJoint: true,
  client: {
    firstName: 'John',
    middleName: 'M.',
    lastName: 'Smith',
  },
  spouse: {
    firstName: 'Jane',
    middleName: 'L.',
    lastName: 'Smith',
  },
  trustName: 'John M. Smith Living Trust', // Only has one name
};

console.log('TEST 2: Joint Trust - Incomplete Trust Name (Only One Spouse)');
console.log('==============================================================');
const result2 = generateTrustName(testData2);
console.log('Original trustName:', testData2.trustName);
console.log('Generated:', result2);
console.log('Expected: "The John M. Smith and Jane L. Smith Living Trust" (auto-corrected)');
console.log('Match:', result2 === 'The John M. Smith and Jane L. Smith Living Trust' ? '✓ PASS' : '✗ FAIL');
console.log('');

// Test 3: Joint trust with correct trust name already
const testData3 = {
  isJoint: true,
  client: {
    firstName: 'John',
    middleName: 'M.',
    lastName: 'Smith',
  },
  spouse: {
    firstName: 'Jane',
    middleName: 'L.',
    lastName: 'Smith',
  },
  trustName: 'The Smith Family Living Trust', // Contains both last name and spouse first name
};

console.log('TEST 3: Joint Trust - Correct Trust Name Provided');
console.log('==================================================');
const result3 = generateTrustName(testData3);
console.log('Original trustName:', testData3.trustName);
console.log('Generated:', result3);
console.log('Expected: "The Smith Family Living Trust" (keeps provided name)');
console.log('Match:', result3 === 'The Smith Family Living Trust' ? '✓ PASS' : '✗ FAIL');
console.log('');

// Test 4: Single trust
const testData4 = {
  isJoint: false,
  client: {
    firstName: 'John',
    middleName: 'M.',
    lastName: 'Smith',
  },
  trustName: undefined,
};

console.log('TEST 4: Single Trust - No Trust Name Provided');
console.log('=============================================');
const result4 = generateTrustName(testData4);
console.log('Generated:', result4);
console.log('Expected: "The John M. Smith Living Trust"');
console.log('Match:', result4 === 'The John M. Smith Living Trust' ? '✓ PASS' : '✗ FAIL');
console.log('');

console.log('=== SUMMARY ===');
const allPass =
  result1 === 'The John M. Smith and Jane L. Smith Living Trust' &&
  result2 === 'The John M. Smith and Jane L. Smith Living Trust' &&
  result3 === 'The Smith Family Living Trust' &&
  result4 === 'The John M. Smith Living Trust';

if (allPass) {
  console.log('✓ All tests passed!');
  console.log('');
  console.log('Joint trust names will now automatically include both spouses.');
  console.log('The trust name will be auto-generated as:');
  console.log('  "The [Grantor1 Full Name] and [Grantor2 Full Name] Living Trust"');
} else {
  console.log('✗ Some tests failed. Please review the logic.');
}
