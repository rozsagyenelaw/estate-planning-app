// Test script to check what data the estate planning portfolio template expects vs. what code provides

console.log('=== ESTATE PLANNING PORTFOLIO DATA MAPPING TEST ===\n');

// Template expects these based on placeholder analysis:
const templateExpects = {
  singleVars: [
    'address', 'age', 'birthdate', 'childrenCount', 'city', 'county',
    'fullName', 'grantorFullName', 'maritalStatus', 'state', 'trustDate',
    'trustName', 'zipCode'
  ],
  loops: [
    'children', 'guardians', 'healthcareAgents', 'hipaaAgents',
    'poaAgents', 'successors'
  ],
  conditionals: [
    'hasMinorChildren', 'isPlural'
  ]
};

// Mock formData to test mapping
const mockFormData = {
  client: {
    firstName: 'John',
    middleName: 'M.',
    lastName: 'Smith',
    dateOfBirth: '1970-05-15',
    address: '123 Main St',
    city: 'Los Angeles',
    state: 'CA',
    zipCode: '90001',
    county: 'Los Angeles',
  },
  maritalStatus: 'single',
  trustName: 'The John M. Smith Living Trust',
  trustDate: 'October 28, 2025',
  children: [
    { firstName: 'Alice', lastName: 'Smith', dateOfBirth: '2010-03-10' },
    { firstName: 'Bob', lastName: 'Smith', dateOfBirth: '2015-07-25' }
  ],
  guardians: [
    { firstName: 'Jane', lastName: 'Doe' },
    { firstName: 'Bob', lastName: 'Johnson' }
  ],
  successorTrustees: [
    { firstName: 'Udo', lastName: 'Gyene' },
    { firstName: 'Ilona', lastName: 'Farag' }
  ],
  durablePOA: {
    client: [
      { firstName: 'Alice', lastName: 'Brown' },
      { firstName: 'Bob', lastName: 'White' }
    ]
  },
  healthcarePOA: {
    client: [
      { firstName: 'Carol', lastName: 'Green' },
      { firstName: 'Dan', lastName: 'Blue' }
    ]
  },
  hipaaAgents: [
    { firstName: 'Eve', lastName: 'Yellow' }
  ]
};

console.log('TEMPLATE EXPECTATIONS:');
console.log('======================');
console.log('\nSingle Variables:');
templateExpects.singleVars.forEach(v => console.log(`  - {${v}}`));

console.log('\nLoop Structures:');
templateExpects.loops.forEach(v => console.log(`  - {#${v}} ... {/${v}}`));

console.log('\nConditionals:');
templateExpects.conditionals.forEach(v => console.log(`  - {#${v}} or {^${v}}`));

console.log('\n\nDATA MAPPING NEEDED:');
console.log('====================');

console.log('\nSingle Variables Mapping:');
console.log('  {fullName} ← client.firstName + client.middleName + client.lastName');
console.log('  {grantorFullName} ← client.firstName + client.middleName + client.lastName');
console.log('  {address} ← client.address');
console.log('  {city} ← client.city');
console.log('  {state} ← client.state');
console.log('  {zipCode} ← client.zipCode');
console.log('  {county} ← client.county');
console.log('  {birthdate} ← client.dateOfBirth (formatted)');
console.log('  {age} ← calculated from client.dateOfBirth');
console.log('  {maritalStatus} ← formData.maritalStatus');
console.log('  {trustName} ← formData.trustName');
console.log('  {trustDate} ← formData.trustDate');
console.log('  {childrenCount} ← children.length');

console.log('\nLoop Arrays Mapping:');
console.log('  {#children} ← formData.children');
console.log('  {#guardians} ← formData.guardians');
console.log('  {#successors} ← formData.successorTrustees');
console.log('  {#poaAgents} ← formData.durablePOA.client');
console.log('  {#healthcareAgents} ← formData.healthcarePOA.client');
console.log('  {#hipaaAgents} ← formData.hipaaAgents OR formData.healthcarePOA.client');

console.log('\nConditional Flags:');
console.log('  {#hasMinorChildren} ← children.some(child => age < 18)');
console.log('  {#isPlural} / {^isPlural} ← for pluralization logic');

console.log('\n\nISSUES TO FIX:');
console.log('==============');
console.log('1. Need to add loops: poaAgents, healthcareAgents, hipaaAgents');
console.log('2. Need to rename successorTrustees → successors for template');
console.log('3. Need to add childrenCount field');
console.log('4. Need to add hasMinorChildren boolean flag');
console.log('5. Need to add isPlural logic (for singular/plural text)');
console.log('6. Template uses {#hasMinorChildren} as loop but should be {#hasMinorChildren} ... {/hasMinorChildren} conditional');

console.log('\n');
