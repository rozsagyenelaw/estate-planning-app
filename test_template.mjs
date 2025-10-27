import fs from 'fs';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import expressions from 'angular-expressions';

console.log('Testing Single Living Trust Template\n');

try {
  const templatePath = './public/templates/single_living_trust_template.docx';
  const content = fs.readFileSync(templatePath, 'binary');
  const zip = new PizZip(content);

  // Apply tag merging (same as in service)
  let documentXml = zip.file('word/document.xml').asText();

  const tagPattern = /\{([^{}]*?(?:<[^>]+>[^{}]*?)*?)\}/gs;
  documentXml = documentXml.replace(tagPattern, (match, content) => {
    if (!content.includes('<')) return match;
    const textOnly = content.replace(/<[^>]+>/g, '');
    return '{' + textOnly + '}';
  });

  const doubleBracePattern = /\{\{([^{}]*?(?:<[^>]+>[^{}]*?)*?)\}\}/gs;
  documentXml = documentXml.replace(doubleBracePattern, (match, content) => {
    if (!content.includes('<')) return match;
    const textOnly = content.replace(/<[^>]+>/g, '');
    return '{{' + textOnly + '}}';
  });

  // Fix consecutive }}{{ patterns that confuse docxtemplater's lexer
  documentXml = documentXml.replace(/\}\}\{\{/g, '}} {{');

  zip.file('word/document.xml', documentXml);

  // IMPORTANT: Regenerate the ZIP to apply changes
  const modifiedZipBuffer = zip.generate({ type: 'nodebuffer' });
  const modifiedZip = new PizZip(modifiedZipBuffer);

  // Use default docxtemplater parser (no custom parser needed)
  const doc = new Docxtemplater(modifiedZip, {
    paragraphLoop: true,
    linebreaks: true,
  });

  // Test data matching the service
  const testData = {
    trustName: 'The Smith Family Living Trust',
    trustDate: 'January 15, 2025',
    grantorFullName: 'John Smith',
    fullName: 'John Smith',
    maritalStatus: 'I am single.',
    childrenStatement: 'I have two children.',
    childrenReferences: 'Jane Smith and Bob Smith',

    isRestatement: false,
    notIsRestatement: true,
    originalTrustName: '',
    originalTrustDate: '',

    hasSpecificDistributions: true,
    notHasSpecificDistributions: false,

    beneficiaries: [
      {
        fullName: 'Jane Smith',
        relationship: 'daughter',
        dateOfBirth: 'June 15, 1990',
        percentage: 50,
        isNotLast: true
      },
      {
        fullName: 'Bob Smith',
        relationship: 'son',
        percentage: 50,
        isNotLast: false
      }
    ],

    specificDistributions: [
      {
        beneficiaryName: 'Jane Smith',
        property: 'The family home',
        hasAgeCondition: true,
        conditionAge: 25
      }
    ],

    successorTrusteesDuringIncapacityFormatted: '1. Jane Smith\n2. Bob Smith',
    successorTrusteesAfterDeathFormatted: '1. Jane Smith\n2. Bob Smith',
    sectionNumber: '01',
    tpp_section_num: '02',
    assets: 'Personal property'
  };

  console.log('Rendering template...');
  doc.render(testData);

  const buf = doc.getZip().generate({ type: 'nodebuffer', compression: 'DEFLATE' });
  fs.writeFileSync('/tmp/test_output.docx', buf);

  console.log('\n✓ SUCCESS! No errors!');
  console.log('✓ Generated: /tmp/test_output.docx');
  console.log('✓ Size:', buf.length, 'bytes');

} catch (error) {
  console.error('\n✗ FAILED with errors:\n');
  console.error(error.message);

  if (error.properties?.errors) {
    console.error(`\nTotal errors: ${error.properties.errors.length}`);
    console.error('\nAll errors:');
    error.properties.errors.forEach((err, i) => {
      console.error(`\n${i + 1}. ${err.message}`);
      console.error(`   Tag: ${err.properties?.xtag}`);
      console.error(`   Explanation: ${err.properties?.explanation}`);
    });
  }

  process.exit(1);
}
