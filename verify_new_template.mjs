import fs from 'fs';
import PizZip from 'pizzip';

console.log('Verifying the NEWLY CREATED template...\n');

const templatePath = './public/templates/single_living_trust_template.docx';
const content = fs.readFileSync(templatePath, 'binary');
const zip = new PizZip(content);
const xml = zip.file('word/document.xml').asText();

console.log('Checking for split tags...');

// Check for any tags split with XML
const splitPattern = /\{[^{}]*<[^>]+>[^{}]*\}/g;
const splits = xml.match(splitPattern) || [];

console.log(`\nSplit tags found: ${splits.length}`);

if (splits.length > 0) {
  console.log('\n❌ STILL HAS SPLIT TAGS!');
  console.log('First 5 split tags:');
  splits.slice(0, 5).forEach((s, i) => {
    const text = s.replace(/<[^>]+>/g, '');
    console.log(`${i+1}. ${text}`);
  });
} else {
  console.log('\n✓ No split tags found in template!');
}

// Check for consecutive }}{{ patterns
const consecutive = xml.match(/\}\}\{\{/g) || [];
console.log(`\nConsecutive }} {{ patterns: ${consecutive.length}`);

// Look for specific problem patterns
const problems = [
  { name: 'Incomplete ment}}', pattern: /[a-z]ment\}\}/g },
  { name: 'Incomplete {/if}}', pattern: /\{\/if\}\}/g },
  { name: 'Incomplete ions}}', pattern: /[a-z]ions\}\}/g },
];

console.log('\nChecking for known problem patterns:');
problems.forEach(prob => {
  const matches = xml.match(prob.pattern) || [];
  console.log(`  ${prob.name}: ${matches.length} found`);
});

console.log('\n' + '='.repeat(60));
if (splits.length === 0) {
  console.log('✓✓✓ TEMPLATE IS CLEAN! ✓✓✓');
} else {
  console.log('❌❌❌ TEMPLATE STILL HAS ISSUES ❌❌❌');
}
console.log('='.repeat(60));
