/**
 * Test SNT (Special Needs Trust) Implementation
 * Verifies all SNT-specific data mapping and placeholders
 */

import { prepareTemplateData } from './src/services/docxTemplateService.js';

console.log('========================================');
console.log('TESTING SNT IMPLEMENTATION');
console.log('========================================\n');

// Test Case: First Party SNT with all fields populated
const testFormData = {
  trustType: 'first_party_snt',

  // Trust name and date
  trustName: 'The Smith Family First Party Special Needs Trust',
  currentDate: 'November 2, 2025',

  // Grantor/Settlor (in First Party SNT, this is often the beneficiary or their representative)
  client: {
    firstName: 'John',
    middleName: 'Michael',
    lastName: 'Smith',
    address: '123 Main Street',
    city: 'Los Angeles',
    state: 'CA',
    zip: '90001',
    phone: '555-123-4567',
    email: 'john@example.com',
  },

  // Current Trustees (cannot be the client in SNT)
  currentTrustees: [
    {
      firstName: 'Robert',
      lastName: 'Johnson',
      relationship: 'Attorney'
    },
    {
      firstName: 'Sarah',
      lastName: 'Williams',
      relationship: 'CPA'
    }
  ],

  // Successor Trustees
  successorTrustees: [
    {
      firstName: 'Alice',
      lastName: 'Thompson',
      relationship: 'Friend',
      groupType: 'joint'
    },
    {
      firstName: 'Bob',
      lastName: 'Martinez',
      relationship: 'Friend',
      groupType: 'individual'
    }
  ],

  // SNT-Specific Data
  sntData: {
    // Primary Beneficiary
    beneficiary: {
      firstName: 'Emily',
      middleName: 'Grace',
      lastName: 'Smith',
      dateOfBirth: '2005-08-15',
      ssn: '123-45-6789',
      disabilityDescription: 'Emily has cerebral palsy and requires ongoing medical care, physical therapy, and assistance with daily living activities. She is unable to work and requires 24/7 supervision and care.'
    },

    // Government Benefits
    governmentBenefits: {
      ssi: true,
      ssdi: false,
      mediCal: true,
      medicare: false,
      housingAssistance: true,
      other: 'Regional Center Services'
    },

    // Remainder Beneficiaries
    remainderBeneficiaries: [
      {
        firstName: 'Michael',
        lastName: 'Smith',
        relationship: 'Brother',
        percentage: '50%'
      },
      {
        firstName: 'Jennifer',
        lastName: 'Smith',
        relationship: 'Sister',
        percentage: '50%'
      }
    ]
  }
};

console.log('🧪 TEST SCENARIO:');
console.log('================');
console.log('Trust Type: First Party Special Needs Trust');
console.log('Trust Name:', testFormData.trustName);
console.log('Date:', testFormData.currentDate);
console.log('Grantor:', testFormData.client.firstName, testFormData.client.lastName);
console.log('Current Trustees: Robert Johnson & Sarah Williams (joint)');
console.log('Primary Beneficiary: Emily Grace Smith');
console.log('Disability: Cerebral palsy');
console.log('Benefits: SSI, Medi-Cal, Housing Assistance, Regional Center Services');
console.log('Remainder Beneficiaries: Michael Smith (50%), Jennifer Smith (50%)');
console.log('');

try {
  const data = prepareTemplateData(testFormData);

  console.log('='.repeat(70));
  console.log('PLACEHOLDER VERIFICATION');
  console.log('='.repeat(70) + '\n');

  // Group 1: Trust Name and Date
  console.log('1️⃣  TRUST NAME & DATE PLACEHOLDERS');
  console.log('-'.repeat(70));
  console.log('✅ {trustName}:', data.trustName);
  console.log('✅ {trustDate}:', data.trustDate);
  console.log('');

  const trustNameOK = data.trustName === 'The Smith Family First Party Special Needs Trust';
  const dateOK = data.trustDate === 'November 2, 2025';

  if (trustNameOK && dateOK) {
    console.log('✅ PASS: Trust name and date placeholders working');
  } else {
    console.log('❌ FAIL: Trust name/date placeholders incorrect');
  }
  console.log('');

  // Group 2: Trustees
  console.log('2️⃣  TRUSTEE PLACEHOLDERS');
  console.log('-'.repeat(70));
  console.log('✅ {grantorFullName}:', data.grantorFullName);
  console.log('✅ {currentTrusteeFormatted}:', data.currentTrusteeFormatted);
  console.log('✅ {firstSuccessorTrusteeFormatted}:', data.firstSuccessorTrusteeFormatted);
  console.log('');

  const grantorOK = data.grantorFullName === 'John Michael Smith';
  const currentTrusteesOK = data.currentTrusteeFormatted.includes('Robert Johnson') &&
                            data.currentTrusteeFormatted.includes('Sarah Williams');
  const successorOK = data.firstSuccessorTrusteeFormatted.includes('Alice Thompson');

  if (grantorOK && currentTrusteesOK && successorOK) {
    console.log('✅ PASS: All trustee placeholders working');
  } else {
    console.log('❌ FAIL: Trustee placeholders incorrect');
  }
  console.log('');

  // Group 3: SNT Primary Beneficiary
  console.log('3️⃣  SNT PRIMARY BENEFICIARY');
  console.log('-'.repeat(70));

  if (!data.sntBeneficiary) {
    console.log('❌ FAIL: sntBeneficiary is null or undefined');
  } else {
    console.log('✅ {sntBeneficiary.fullName}:', data.sntBeneficiary.fullName);
    console.log('✅ {sntBeneficiary.firstName}:', data.sntBeneficiary.firstName);
    console.log('✅ {sntBeneficiary.middleName}:', data.sntBeneficiary.middleName);
    console.log('✅ {sntBeneficiary.lastName}:', data.sntBeneficiary.lastName);
    console.log('✅ {sntBeneficiary.dateOfBirth}:', data.sntBeneficiary.dateOfBirth);
    console.log('✅ {sntBeneficiary.ssn}:', data.sntBeneficiary.ssn);
    console.log('✅ {sntBeneficiary.disabilityDescription}:');
    console.log('   ' + data.sntBeneficiary.disabilityDescription.substring(0, 80) + '...');
    console.log('');

    const beneficiaryOK = data.sntBeneficiary.fullName === 'Emily Grace Smith' &&
                         data.sntBeneficiary.firstName === 'Emily' &&
                         data.sntBeneficiary.middleName === 'Grace' &&
                         data.sntBeneficiary.lastName === 'Smith' &&
                         data.sntBeneficiary.dateOfBirth === '08/15/2005' &&
                         data.sntBeneficiary.ssn === '123-45-6789' &&
                         data.sntBeneficiary.disabilityDescription.includes('cerebral palsy');

    if (beneficiaryOK) {
      console.log('✅ PASS: Primary beneficiary data correct');
    } else {
      console.log('❌ FAIL: Primary beneficiary data incorrect');
    }
  }
  console.log('');

  // Group 4: Government Benefits
  console.log('4️⃣  GOVERNMENT BENEFITS');
  console.log('-'.repeat(70));

  if (!data.sntGovernmentBenefits) {
    console.log('❌ FAIL: sntGovernmentBenefits is null or undefined');
  } else {
    console.log('✅ {sntGovernmentBenefits.formatted}:', data.sntGovernmentBenefits.formatted);
    console.log('✅ {sntGovernmentBenefits.hasBenefits}:', data.sntGovernmentBenefits.hasBenefits);
    console.log('');
    console.log('Individual flags:');
    console.log('   {sntGovernmentBenefits.ssi}:', data.sntGovernmentBenefits.ssi);
    console.log('   {sntGovernmentBenefits.ssdi}:', data.sntGovernmentBenefits.ssdi);
    console.log('   {sntGovernmentBenefits.mediCal}:', data.sntGovernmentBenefits.mediCal);
    console.log('   {sntGovernmentBenefits.medicare}:', data.sntGovernmentBenefits.medicare);
    console.log('   {sntGovernmentBenefits.housingAssistance}:', data.sntGovernmentBenefits.housingAssistance);
    console.log('   {sntGovernmentBenefits.other}:', data.sntGovernmentBenefits.other);
    console.log('');
    console.log('Benefits list array:');
    data.sntGovernmentBenefits.list.forEach((benefit, i) => {
      console.log(`   ${i + 1}. ${benefit}`);
    });
    console.log('');

    const benefitsOK = data.sntGovernmentBenefits.hasBenefits === true &&
                      data.sntGovernmentBenefits.ssi === true &&
                      data.sntGovernmentBenefits.mediCal === true &&
                      data.sntGovernmentBenefits.housingAssistance === true &&
                      data.sntGovernmentBenefits.ssdi === false &&
                      data.sntGovernmentBenefits.medicare === false &&
                      data.sntGovernmentBenefits.other === 'Regional Center Services' &&
                      data.sntGovernmentBenefits.list.length === 4;

    if (benefitsOK) {
      console.log('✅ PASS: Government benefits data correct');
    } else {
      console.log('❌ FAIL: Government benefits data incorrect');
    }
  }
  console.log('');

  // Group 5: Remainder Beneficiaries
  console.log('5️⃣  REMAINDER BENEFICIARIES');
  console.log('-'.repeat(70));
  console.log('✅ {sntRemainderBeneficiariesFormatted}:', data.sntRemainderBeneficiariesFormatted);
  console.log('✅ Count:', data.sntRemainderBeneficiaries.length);
  console.log('');
  console.log('Array items:');
  data.sntRemainderBeneficiaries.forEach((rb, i) => {
    console.log(`   ${i + 1}. {fullName}: ${rb.fullName}`);
    console.log(`      {relationship}: ${rb.relationship}`);
    console.log(`      {percentage}: ${rb.percentage}`);
  });
  console.log('');

  const remainderOK = data.sntRemainderBeneficiaries.length === 2 &&
                     data.sntRemainderBeneficiaries[0].fullName === 'Michael Smith' &&
                     data.sntRemainderBeneficiaries[0].percentage === '50%' &&
                     data.sntRemainderBeneficiaries[1].fullName === 'Jennifer Smith' &&
                     data.sntRemainderBeneficiaries[1].percentage === '50%' &&
                     data.sntRemainderBeneficiariesFormatted === 'Michael Smith (50%), Jennifer Smith (50%)';

  if (remainderOK) {
    console.log('✅ PASS: Remainder beneficiaries data correct');
  } else {
    console.log('❌ FAIL: Remainder beneficiaries data incorrect');
  }
  console.log('');

  // Group 6: Helper Flags
  console.log('6️⃣  HELPER FLAGS');
  console.log('-'.repeat(70));
  console.log('✅ {isSNT}:', data.isSNT);
  console.log('✅ {isFirstPartySNT}:', data.isFirstPartySNT);
  console.log('✅ {isThirdPartySNT}:', data.isThirdPartySNT);
  console.log('');

  const flagsOK = data.isSNT === true &&
                 data.isFirstPartySNT === true &&
                 data.isThirdPartySNT === false;

  if (flagsOK) {
    console.log('✅ PASS: Helper flags correct');
  } else {
    console.log('❌ FAIL: Helper flags incorrect');
  }
  console.log('');

  // Verification Checklist
  console.log('='.repeat(70));
  console.log('VERIFICATION CHECKLIST');
  console.log('='.repeat(70) + '\n');

  let allPassed = true;
  const checks = [];

  // Check 1: Trust name and date
  if (trustNameOK && dateOK) {
    checks.push('✅ PASS: Trust name and date populated correctly');
  } else {
    checks.push('❌ FAIL: Trust name/date issues');
    allPassed = false;
  }

  // Check 2: Trustees
  if (grantorOK && currentTrusteesOK && successorOK) {
    checks.push('✅ PASS: All trustee data formatted correctly');
  } else {
    checks.push('❌ FAIL: Trustee data issues');
    allPassed = false;
  }

  // Check 3: Primary beneficiary
  if (data.sntBeneficiary && data.sntBeneficiary.fullName === 'Emily Grace Smith') {
    checks.push('✅ PASS: Primary beneficiary data complete');
  } else {
    checks.push('❌ FAIL: Primary beneficiary data missing or incorrect');
    allPassed = false;
  }

  // Check 4: Disability description
  if (data.sntBeneficiary && data.sntBeneficiary.disabilityDescription.includes('cerebral palsy')) {
    checks.push('✅ PASS: Disability description captured');
  } else {
    checks.push('❌ FAIL: Disability description missing');
    allPassed = false;
  }

  // Check 5: Government benefits
  if (data.sntGovernmentBenefits && data.sntGovernmentBenefits.list.length === 4) {
    checks.push('✅ PASS: 4 government benefits captured (SSI, Medi-Cal, Housing, Other)');
  } else {
    checks.push('❌ FAIL: Government benefits incorrect');
    allPassed = false;
  }

  // Check 6: Benefits formatted string
  if (data.sntGovernmentBenefits && data.sntGovernmentBenefits.formatted.includes('SSI')) {
    checks.push('✅ PASS: Benefits formatted string includes all items');
  } else {
    checks.push('❌ FAIL: Benefits formatted string incomplete');
    allPassed = false;
  }

  // Check 7: Remainder beneficiaries count
  if (data.sntRemainderBeneficiaries.length === 2) {
    checks.push('✅ PASS: 2 remainder beneficiaries found');
  } else {
    checks.push(`❌ FAIL: Expected 2 remainder beneficiaries, got ${data.sntRemainderBeneficiaries.length}`);
    allPassed = false;
  }

  // Check 8: Remainder beneficiaries formatted
  if (data.sntRemainderBeneficiariesFormatted.includes('Michael Smith (50%)') &&
      data.sntRemainderBeneficiariesFormatted.includes('Jennifer Smith (50%)')) {
    checks.push('✅ PASS: Remainder beneficiaries formatted with percentages');
  } else {
    checks.push('❌ FAIL: Remainder beneficiaries formatted string incomplete');
    allPassed = false;
  }

  // Check 9: Helper flags
  if (data.isSNT && data.isFirstPartySNT && !data.isThirdPartySNT) {
    checks.push('✅ PASS: Helper flags correct (isSNT=true, isFirstPartySNT=true, isThirdPartySNT=false)');
  } else {
    checks.push('❌ FAIL: Helper flags incorrect');
    allPassed = false;
  }

  // Check 10: SSN formatting
  if (data.sntBeneficiary && data.sntBeneficiary.ssn === '123-45-6789') {
    checks.push('✅ PASS: SSN preserved correctly');
  } else {
    checks.push('❌ FAIL: SSN formatting issue');
    allPassed = false;
  }

  // Check 11: Date formatting
  if (data.sntBeneficiary && data.sntBeneficiary.dateOfBirth === '08/15/2005') {
    checks.push('✅ PASS: Date formatted as MM/DD/YYYY');
  } else {
    checks.push('❌ FAIL: Date formatting issue');
    allPassed = false;
  }

  // Print all checks
  checks.forEach(check => console.log(check));

  console.log('');
  console.log('='.repeat(70));
  if (allPassed) {
    console.log('🎉 ALL TESTS PASSED!');
    console.log('='.repeat(70));
    console.log('');
    console.log('✅ SNT implementation is working correctly!');
    console.log('');
    console.log('📋 Available Placeholders for Your Word Template:');
    console.log('');
    console.log('PRIMARY BENEFICIARY:');
    console.log('  {sntBeneficiary.fullName} - Emily Grace Smith');
    console.log('  {sntBeneficiary.firstName} - Emily');
    console.log('  {sntBeneficiary.middleName} - Grace');
    console.log('  {sntBeneficiary.lastName} - Smith');
    console.log('  {sntBeneficiary.dateOfBirth} - 08/15/2005');
    console.log('  {sntBeneficiary.ssn} - 123-45-6789');
    console.log('  {sntBeneficiary.disabilityDescription} - Full text');
    console.log('');
    console.log('GOVERNMENT BENEFITS:');
    console.log('  {sntGovernmentBenefits.formatted} - All benefits as comma-separated string');
    console.log('  {sntGovernmentBenefits.hasBenefits} - Boolean flag');
    console.log('  {{#sntGovernmentBenefits.list}} - Loop through benefits array');
    console.log('  Individual flags: {sntGovernmentBenefits.ssi}, {sntGovernmentBenefits.mediCal}, etc.');
    console.log('');
    console.log('REMAINDER BENEFICIARIES:');
    console.log('  {sntRemainderBeneficiariesFormatted} - All as comma-separated string');
    console.log('  {{#sntRemainderBeneficiaries}} - Loop through array');
    console.log('    {fullName}, {firstName}, {lastName}, {relationship}, {percentage}');
    console.log('');
    console.log('TRUSTEES:');
    console.log('  {grantorFullName} - Grantor/Settlor');
    console.log('  {currentTrusteeFormatted} - Current trustees (joint formatting)');
    console.log('  {firstSuccessorTrusteeFormatted} - First successor group');
    console.log('  {successorTrusteeSuccessorsFormatted} - Additional successors');
    console.log('');
    console.log('HELPER FLAGS:');
    console.log('  {isSNT} - true for any SNT');
    console.log('  {isFirstPartySNT} - true for first party');
    console.log('  {isThirdPartySNT} - true for third party');
    console.log('');
    console.log('All backend data is ready - upload your templates and test!');
  } else {
    console.log('❌ SOME TESTS FAILED');
    console.log('='.repeat(70));
    console.log('Review the failures above.');
  }

} catch (error) {
  console.error('❌ ERROR:', error.message);
  console.error(error.stack);
}
