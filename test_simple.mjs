import fs from 'fs';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import expressions from 'angular-expressions';

console.log('Testing Document Generation\n');

try {
  const templatePath = './public/templates/single_living_trust_template.docx';
  const content = fs.readFileSync(templatePath, 'binary');
  const zip = new PizZip(content);

  // Configure expressions
  expressions.filters.not = function(input) {
    return !input;
  };

  // Parser function
  function angularParser(tag) {
    tag = tag.replace(/^('|')/g, "'").replace(/('|')$/g, "'");

    const expr = expressions.compile(tag);

    return {
      get: function(scope, context) {
        let obj = {};
        const scopeList = context.scopeList;
        const num = context.num;

        for (let i = 0, len = num + 1; i < len; i++) {
          obj = Object.assign(obj, scopeList[i]);
        }

        // Add loop helpers using property names that won't conflict
        obj.loop = {
          index: num,
          first: num === 0,
          last: false
        };

        // Calculate last property
        if (num >= 0 && scopeList[num - 1]) {
          const parent = scopeList[num - 1];
          if (Array.isArray(parent) && parent.length > 0) {
            obj.loop.last = (num === parent.length - 1);
          }
        }

        return expr(obj);
      }
    };
  }

  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
    parser: angularParser,
  });

  const testData = {
    trustName: 'The Smith Family Living Trust',
    trustDate: 'January 15, 2025',
    grantorFullName: 'John Smith',
    fullName: 'John Smith',
    maritalStatus: 'I am single.',
    childrenStatement: 'I have two children.',
    childrenReferences: 'Jane Smith and Bob Smith',
    isRestatement: false,
    hasSpecificDistributions: true,
    beneficiaries: [
      { fullName: 'Jane Smith', relationship: 'daughter', dateOfBirth: 'June 15, 1990', percentage: 50 },
      { fullName: 'Bob Smith', relationship: 'son', percentage: 50 }
    ],
    specificDistributions: [
      { beneficiaryName: 'Jane Smith', property: 'The family home', hasAgeCondition: true, conditionAge: 25 }
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

  console.log('\n✓ SUCCESS!');
  console.log('✓ Generated: /tmp/test_output.docx');
  console.log('✓ File size:', buf.length, 'bytes');

} catch (error) {
  console.error('\n✗ ERROR:', error.message);
  if (error.properties?.errors) {
    console.error('\nFirst 5 errors:');
    error.properties.errors.slice(0, 5).forEach((err, i) => {
      console.error(`\n${i + 1}. ${err.message}`);
      console.error('   Tag:', err.properties?.xtag);
      console.error('   Explanation:', err.properties?.explanation);
    });
  }
  process.exit(1);
}
