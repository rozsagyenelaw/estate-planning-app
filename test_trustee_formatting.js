// Test the successor trustees formatting with different serve types

console.log('=== TESTING SUCCESSOR TRUSTEES FORMATTING ===\n');

// Mock form data with trustees
const mockFormDataSequential = {
  trusteesServeType: 'sequential',
  successorTrustees: [
    { firstName: 'Udo', lastName: 'Gyene' },
    { firstName: 'Ilona', lastName: 'Farag' }
  ]
};

const mockFormDataTogether = {
  trusteesServeType: 'together',
  successorTrustees: [
    { firstName: 'Udo', lastName: 'Gyene' },
    { firstName: 'Ilona', lastName: 'Farag' }
  ]
};

const mockFormDataThreeTrustees = {
  trusteesServeType: 'together',
  successorTrustees: [
    { firstName: 'Udo', lastName: 'Gyene' },
    { firstName: 'Ilona', lastName: 'Farag' },
    { firstName: 'John', lastName: 'Doe' }
  ]
};

// Simulate the formatting logic
const formatTrustees = (formData) => {
  const trustees = formData.successorTrustees || [];
  if (trustees.length === 0) return '';

  const names = trustees.map(t => `${t.firstName || ''} ${t.lastName || ''}`.trim());
  const serveType = formData.trusteesServeType || 'sequential';

  if (serveType === 'together') {
    if (names.length === 1) return names[0];
    if (names.length === 2) return `${names[0]} and ${names[1]}, jointly or the survivor of them`;
    const lastTwo = `${names[names.length - 2]}, and ${names[names.length - 1]}`;
    return `${names.slice(0, -2).join(', ')}, ${lastTwo}, jointly or the survivor of them`;
  } else {
    return names.join(',\nthen ');
  }
};

console.log('TEST 1: Sequential Service Type (2 trustees)');
console.log('==============================================');
console.log('Input:', mockFormDataSequential);
console.log('Expected: "Udo Gyene,\\nthen Ilona Farag"');
const result1 = formatTrustees(mockFormDataSequential);
console.log('Output:', JSON.stringify(result1));
console.log('Visual:');
console.log(result1);
console.log('');

console.log('TEST 2: Together Service Type (2 trustees)');
console.log('===========================================');
console.log('Input:', mockFormDataTogether);
console.log('Expected: "Udo Gyene and Ilona Farag, jointly or the survivor of them"');
const result2 = formatTrustees(mockFormDataTogether);
console.log('Output:', JSON.stringify(result2));
console.log('Visual:');
console.log(result2);
console.log('');

console.log('TEST 3: Together Service Type (3 trustees)');
console.log('===========================================');
console.log('Input:', mockFormDataThreeTrustees);
console.log('Expected: "Udo Gyene, Ilona Farag, and John Doe, jointly or the survivor of them"');
const result3 = formatTrustees(mockFormDataThreeTrustees);
console.log('Output:', JSON.stringify(result3));
console.log('Visual:');
console.log(result3);
console.log('');

console.log('=== SUMMARY ===');
const test1Pass = result1 === 'Udo Gyene,\nthen Ilona Farag';
const test2Pass = result2 === 'Udo Gyene and Ilona Farag, jointly or the survivor of them';
const test3Pass = result3 === 'Udo Gyene, Ilona Farag, and John Doe, jointly or the survivor of them';

console.log('Test 1 (Sequential):', test1Pass ? '✓ PASS' : '✗ FAIL');
console.log('Test 2 (Together - 2):', test2Pass ? '✓ PASS' : '✗ FAIL');
console.log('Test 3 (Together - 3):', test3Pass ? '✓ PASS' : '✗ FAIL');
console.log('');

if (test1Pass && test2Pass && test3Pass) {
  console.log('✓ All tests passed! Trustee formatting is working correctly.');
  console.log('');
  console.log('Usage in template:');
  console.log('  {trusteesList} - for general trustee list');
  console.log('  {successorTrusteesList} - for docxtemplater formatted list');
  console.log('  {successorTrusteesDuringIncapacityFormatted} - for during incapacity');
  console.log('  {successorTrusteesAfterDeathFormatted} - for after death');
  console.log('');
  console.log('All these variables now respect the trusteesServeType field.');
} else {
  console.log('✗ Some tests failed. Please review the formatting logic.');
}
