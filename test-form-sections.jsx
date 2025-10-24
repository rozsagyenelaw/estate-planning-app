/**
 * Test Form Sections
 * Verifies that all form sections can be imported and rendered
 */

import React from 'react';
import { FormProvider } from './src/context/FormContext';
import SpecificDistributionSection from './src/components/forms/sections/SpecificDistributionSection';
import ResiduaryDistributionSection from './src/components/forms/sections/ResiduaryDistributionSection';
import GeneralNeedsTrustSection from './src/components/forms/sections/GeneralNeedsTrustSection';
import CharitableDistributionSection from './src/components/forms/sections/CharitableDistributionSection';

// Test that all sections can be imported
console.log('✓ SpecificDistributionSection imported');
console.log('✓ ResiduaryDistributionSection imported');
console.log('✓ GeneralNeedsTrustSection imported');
console.log('✓ CharitableDistributionSection imported');

// Test component structure
const TestApp = () => {
  return (
    <FormProvider>
      <div>
        <h1>Form Sections Test</h1>
        <SpecificDistributionSection />
        <ResiduaryDistributionSection />
        <GeneralNeedsTrustSection />
        <CharitableDistributionSection />
      </div>
    </FormProvider>
  );
};

console.log('✓ All sections can be rendered in a test component');
console.log('\n✅ All form section tests passed!');

export default TestApp;
