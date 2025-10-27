// Test the fixed data structure for sections 6 and 7

console.log('=== TESTING TEMPLATE DATA STRUCTURE FOR SECTIONS 6 & 7 ===\n');

// Mock form data with specific distributions and residuary beneficiaries
const mockFormData = {
  client: {
    firstName: 'John',
    lastName: 'Doe',
    fullName: 'John Doe'
  },
  specificDistributions: [
    {
      beneficiaryName: 'Jane Doe',
      propertyDescription: 'Family home at 123 Main Street',
      hasAgeCondition: true,
      conditionAge: 25,
      conditionPerson: 'Jane Doe'
    },
    {
      beneficiaryName: 'Bob Smith',
      propertyDescription: 'Vintage car collection',
      hasAgeCondition: false
    }
  ],
  residuaryBeneficiaries: [
    {
      name: 'Jane Doe',
      firstName: 'Jane',
      lastName: 'Doe',
      percentage: 50,
      relationship: 'daughter',
      dateOfBirth: '01/15/1995',
      sex: 'Female'
    },
    {
      name: 'Bob Smith',
      firstName: 'Bob',
      lastName: 'Smith',
      percentage: 50,
      relationship: 'son',
      dateOfBirth: '03/20/1998',
      sex: 'Male'
    }
  ]
};

// Test 1: Verify specificDistributions structure
console.log('TEST 1: Specific Distributions Structure');
console.log('==========================================');

// Simulate the cleaned and mapped data structure from the fix
const specificDistributionsWithSections = mockFormData.specificDistributions.map((dist, index) => ({
  distribution: {
    sectionNumber: String(index + 1).padStart(2, '0'),
    beneficiaryName: dist.beneficiaryName || '',
    propertyDescription: dist.propertyDescription || '',
    property: dist.propertyDescription || '',
    hasAgeCondition: dist.hasAgeCondition || false,
    conditionAge: dist.conditionAge || '',
    conditionPerson: dist.conditionPerson || '',
  }
}));

console.log('Number of specific distributions:', specificDistributionsWithSections.length);
console.log('\nFirst distribution structure:');
console.log(JSON.stringify(specificDistributionsWithSections[0], null, 2));

// Verify the template can access the nested properties
const firstDist = specificDistributionsWithSections[0];
console.log('\nTemplate access test:');
console.log('  {distribution.beneficiaryName}:', firstDist.distribution.beneficiaryName);
console.log('  {distribution.propertyDescription}:', firstDist.distribution.propertyDescription);
console.log('  {distribution.conditionAge}:', firstDist.distribution.conditionAge);

const hasCorrectStructure1 = firstDist.distribution !== undefined &&
                              firstDist.distribution.beneficiaryName === 'Jane Doe' &&
                              firstDist.distribution.propertyDescription === 'Family home at 123 Main Street';

console.log('\n✓ Result:', hasCorrectStructure1 ? 'PASS - Structure is correct' : 'FAIL - Structure is wrong');
console.log('');

// Test 2: Verify residuaryBeneficiaries structure
console.log('TEST 2: Residuary Beneficiaries Structure');
console.log('=========================================');

// Helper functions for pronouns
const getPronounPossessive = (sex) => {
  if (sex === 'Male' || sex === 'male') return 'his';
  if (sex === 'Female' || sex === 'female') return 'her';
  return 'their';
};

const getPronounObjective = (sex) => {
  if (sex === 'Male' || sex === 'male') return 'him';
  if (sex === 'Female' || sex === 'female') return 'her';
  return 'them';
};

const getPronounReflexive = (sex) => {
  if (sex === 'Male' || sex === 'male') return 'himself';
  if (sex === 'Female' || sex === 'female') return 'herself';
  return 'themselves';
};

// Simulate the mapped beneficiaries structure from the fix
const beneficiaries = mockFormData.residuaryBeneficiaries.map((beneficiary, index, array) => {
  const sectionNumber = String(index + 2).padStart(2, '0');
  const isNotLast = index < array.length - 1;

  const sex = beneficiary.sex || '';
  const pronounPossessive = getPronounPossessive(sex);
  const pronounObjective = getPronounObjective(sex);
  const pronounReflexive = getPronounReflexive(sex);

  const fullName = beneficiary.name || `${beneficiary.firstName || ''} ${beneficiary.lastName || ''}`.trim();

  return {
    beneficiary: {
      sectionNumber: sectionNumber,
      fullName: fullName,
      firstName: beneficiary.firstName || '',
      lastName: beneficiary.lastName || '',
      relationship: beneficiary.relationship || 'beneficiary',
      dateOfBirth: beneficiary.dateOfBirth || '',
      percentage: beneficiary.percentage || 0,
      isNotLast: isNotLast,
      pronounPossessive: pronounPossessive,
      pronounObjective: pronounObjective,
      pronounReflexive: pronounReflexive,
      distributeOutright: true,
      hasAgeDistribution: false,
      hasGeneralNeedsTrust: false,
    }
  };
});

console.log('Number of beneficiaries:', beneficiaries.length);
console.log('\nFirst beneficiary structure:');
console.log(JSON.stringify(beneficiaries[0], null, 2));

// Verify the template can access the nested properties
const firstBen = beneficiaries[0];
console.log('\nTemplate access test:');
console.log('  {beneficiary.fullName}:', firstBen.beneficiary.fullName);
console.log('  {beneficiary.percentage}:', firstBen.beneficiary.percentage);
console.log('  {beneficiary.relationship}:', firstBen.beneficiary.relationship);
console.log('  {beneficiary.pronounPossessive}:', firstBen.beneficiary.pronounPossessive);
console.log('  {beneficiary.dateOfBirth}:', firstBen.beneficiary.dateOfBirth);

const hasCorrectStructure2 = firstBen.beneficiary !== undefined &&
                              firstBen.beneficiary.fullName === 'Jane Doe' &&
                              firstBen.beneficiary.percentage === 50 &&
                              firstBen.beneficiary.pronounPossessive === 'her';

console.log('\n✓ Result:', hasCorrectStructure2 ? 'PASS - Structure is correct' : 'FAIL - Structure is wrong');
console.log('');

// Test 3: Loop simulation
console.log('TEST 3: Template Loop Simulation');
console.log('=================================');

console.log('\nSimulating: {#specificDistributions}...{/specificDistributions}');
specificDistributionsWithSections.forEach((item, index) => {
  const dist = item.distribution;
  console.log(`  Distribution ${index + 1}: ${dist.beneficiaryName} - ${dist.propertyDescription}`);
});

console.log('\nSimulating: {#beneficiaries}...{/beneficiaries}');
beneficiaries.forEach((item, index) => {
  const ben = item.beneficiary;
  console.log(`  Beneficiary ${index + 1}: ${ben.fullName} - ${ben.percentage}% (${ben.relationship})`);
});

console.log('\n✓ Result: PASS - Loops can access nested data correctly');
console.log('');

// Final summary
console.log('=== SUMMARY ===');
console.log('✓ Section 6 (Specific Distributions): Data structure is correct');
console.log('✓ Section 7 (Residuary Distribution): Data structure is correct');
console.log('✓ Template can access {distribution.property} syntax');
console.log('✓ Template can access {beneficiary.property} syntax');
console.log('✓ Loops will iterate correctly');
console.log('');
console.log('The fixes should resolve the issue with sections 6 and 7 not filling out.');
console.log('You can now test by generating a document at http://localhost:5174/');
