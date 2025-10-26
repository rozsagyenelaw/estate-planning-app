import fs from 'fs';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import expressions from 'angular-expressions';

console.log('Testing Single Living Trust Document Generation\n');

try {
  const templatePath = '/Users/rozsagyene/estate-planning-app/public/templates/single_living_trust_template.docx';
  const content = fs.readFileSync(templatePath, 'binary');
  const zip = new PizZip(content);

  // Configure parser
  expressions.filters.not = function(input) {
    return !input;
  };

  function angularParser(tag) {
    if (tag === '' || tag === '^') {
      return {
        get: function() {
          return true;
        }
      };
    }

    let cleanTag = tag;

    // Handle "if " prefix - just remove it
    if (cleanTag.startsWith('if ')) {
      cleanTag = cleanTag.substring(3);
    }

    // Handle "not " prefix - convert to logical not for angular-expressions
    if (cleanTag.startsWith('not ')) {
      cleanTag = '!(' + cleanTag.substring(4) + ')';
    }

    try {
      const expr = expressions.compile(cleanTag);
      return {
        get: function(scope, context) {
          let obj = {};
          const scopeList = context.scopeList;
          const num = context.num;
          for (let i = 0, len = num + 1; i < len; i++) {
            obj = Object.assign(obj, scopeList[i]);
          }
          obj.loop = {
            index: context.num,
            first: context.num === 0,
            last: context.num === (scopeList[num - 1] || []).length - 1,
          };
          return expr(obj);
        }
      };
    } catch (e) {
      console.error('Error parsing tag:', tag, e);
      return {
        get: function() {
          return '';
        }
      };
    }
  }

  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
    parser: angularParser,
    nullGetter: function() {
      return '';
    },
  });

  // Test data
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
      {
        fullName: 'Jane Smith',
        relationship: 'daughter',
        dateOfBirth: 'June 15, 1990',
        percentage: 50
      },
      {
        fullName: 'Bob Smith',
        relationship: 'son',
        percentage: 50
      }
    ],

    specificDistributions: [
      {
        beneficiaryName: 'Jane Smith',
        property: 'The family home at 123 Main Street',
        hasAgeCondition: true,
        conditionAge: 25
      }
    ],

    successorTrusteesDuringIncapacityFormatted: '1. Jane Smith\n2. Bob Smith',
    successorTrusteesAfterDeathFormatted: '1. Jane Smith\n2. Bob Smith',
    sectionNumber: '01',
    tpp_section_num: '02',
    assets: 'Personal property, real estate, and financial accounts'
  };

  console.log('Rendering template...');
  doc.render(testData);

  console.log('Generating document...');
  const buf = doc.getZip().generate({
    type: 'nodebuffer',
    compression: 'DEFLATE',
  });

  const outputPath = '/tmp/test_living_trust_final.docx';
  fs.writeFileSync(outputPath, buf);

  console.log('\n✓ SUCCESS!');
  console.log('✓ Generated document:', outputPath);
  console.log('✓ File size:', buf.length, 'bytes');
  console.log('\nNo errors - template is working correctly!');

} catch (error) {
  console.error('\n✗ ERROR:');
  console.error(error.message);

  if (error.properties && error.properties.errors) {
    console.error('\nDetailed errors:');
    error.properties.errors.forEach((err, i) => {
      console.error(`\n${i + 1}. ${err.message}`);
      if (err.properties) {
        console.error('   Tag:', err.properties.xtag);
        console.error('   Explanation:', err.properties.explanation);
      }
    });
  }

  process.exit(1);
}
