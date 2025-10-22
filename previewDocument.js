/**
 * Preview a processed template with real data
 */

import { sampleJointTrustData } from './src/utils/testDocumentGeneration.js';
import { prepareTemplateData, processTemplate } from './src/services/templateEngine.js';
import { confirmationOfNamesTemplate } from './src/templates/confirmationOfNames.js';

console.log('='.repeat(70));
console.log('DOCUMENT PREVIEW - CONFIRMATION OF NAMES');
console.log('='.repeat(70));

try {
  // Prepare template data
  const templateData = prepareTemplateData(sampleJointTrustData);

  // Get template HTML
  const templateHtml = confirmationOfNamesTemplate();

  // Process template with data
  const processedHtml = processTemplate(templateHtml, templateData);

  console.log('\n📄 Processed HTML (first 2000 characters):\n');
  console.log('-'.repeat(70));
  console.log(processedHtml.substring(0, 2000));
  console.log('\n...[truncated]...\n');
  console.log('-'.repeat(70));

  console.log('\n✅ Template processed successfully!');
  console.log(`   Total length: ${processedHtml.length} characters`);

  // Check for any unprocessed placeholders
  const placeholderRegex = /\{\{([A-Z_][A-Z0-9_]*)\}\}/g;
  const unprocessed = [];
  let match;
  while ((match = placeholderRegex.exec(processedHtml)) !== null) {
    if (!unprocessed.includes(match[1])) {
      unprocessed.push(match[1]);
    }
  }

  if (unprocessed.length > 0) {
    console.log('\n⚠️  Unprocessed placeholders found:');
    unprocessed.forEach(p => console.log(`   - {{${p}}}`));
  } else {
    console.log('\n✅ All placeholders processed correctly');
  }

  console.log('\n' + '='.repeat(70));

} catch (error) {
  console.error('❌ Error:', error.message);
  console.error(error.stack);
  process.exit(1);
}
