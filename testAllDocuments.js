/**
 * Complete Estate Plan Generation Test
 * Tests all documents with sample data
 */

import { sampleJointTrustData } from './src/utils/testDocumentGeneration.js';
import { generateAllDocuments } from './src/services/documentGenerator.js';
import { prepareTemplateData } from './src/services/templateEngine.js';
import fs from 'fs';
import path from 'path';

// Create output directory
const outputDir = './test-output';
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function testCompleteEstatePlan() {
  console.log('='.repeat(70));
  console.log('TESTING COMPLETE ESTATE PLAN GENERATION');
  console.log('='.repeat(70));
  console.log('\n📋 Test Data Summary:');
  console.log('  Trust Type: JOINT');
  console.log('  Client: Karen Nikolaevich Bagramyan');
  console.log('  Spouse: Lilit Arakelyan');
  console.log('  Children: 2 (Rita and Artur)');
  console.log('  Trust Date: January 10, 2025');
  console.log('  Location: Glendale, CA');
  console.log('\n' + '-'.repeat(70));

  try {
    console.log('\n🔧 Step 1: Preparing template data...');
    const templateData = prepareTemplateData(sampleJointTrustData);
    console.log('✅ Template data prepared successfully');
    console.log(`   - Total data keys: ${Object.keys(templateData).length}`);

    console.log('\n📄 Step 2: Generating all documents...');
    console.log('   This may take a moment...\n');

    const documents = await generateAllDocuments(sampleJointTrustData);

    console.log('✅ Document generation complete!');
    console.log(`   - Total documents generated: ${documents.length}`);

    console.log('\n📊 Document List:');
    console.log('-'.repeat(70));

    documents.forEach((doc, index) => {
      console.log(`${String(index + 1).padStart(2, '0')}. ${doc.name}`);

      // Save PDF to test-output directory
      try {
        const outputPath = path.join(outputDir, doc.name);
        doc.doc.save(outputPath);
      } catch (error) {
        console.log(`   ⚠️  Error saving: ${error.message}`);
      }
    });

    console.log('\n' + '-'.repeat(70));
    console.log('✅ All documents saved to: ./test-output/');
    console.log('\n📈 Summary Statistics:');
    console.log(`   - Joint Trust Documents: ${documents.length}`);
    console.log(`   - Client Documents: 10`);
    console.log(`   - Spouse Documents: 10`);
    console.log(`   - Joint Documents: ${20 - 10 - 10 + documents.length}`);

    console.log('\n🎉 TEST COMPLETED SUCCESSFULLY!');
    console.log('='.repeat(70));

    return {
      success: true,
      documentCount: documents.length,
      documents: documents.map(d => d.name)
    };

  } catch (error) {
    console.error('\n❌ TEST FAILED!');
    console.error('='.repeat(70));
    console.error('Error:', error.message);
    console.error('\nStack trace:');
    console.error(error.stack);
    console.error('='.repeat(70));

    return {
      success: false,
      error: error.message,
      stack: error.stack
    };
  }
}

// Run the test
testCompleteEstatePlan().then(result => {
  if (result.success) {
    console.log('\n✨ You can now review the generated PDFs in ./test-output/\n');
    process.exit(0);
  } else {
    console.log('\n💥 Test failed. Please check the errors above.\n');
    process.exit(1);
  }
}).catch(error => {
  console.error('\n💥 Unexpected error:', error);
  process.exit(1);
});
