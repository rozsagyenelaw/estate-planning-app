import fs from 'fs';
import PizZip from 'pizzip';

const content = fs.readFileSync('./public/templates/single_living_trust_template.docx', 'binary');
const zip = new PizZip(content);
let xml = zip.file('word/document.xml').asText();

console.log('=== BEFORE TAG MERGING ===\n');
console.log('First 500 chars:');
console.log(xml.substring(0, 500));

// Apply tag merging
const tagPattern = /\{([^{}]*?(?:<[^>]+>[^{}]*?)*?)\}/gs;
xml = xml.replace(tagPattern, (match, content) => {
  if (!content.includes('<')) return match;
  const textOnly = content.replace(/<[^>]+>/g, '');
  return '{' + textOnly + '}';
});

const doubleBracePattern = /\{\{([^{}]*?(?:<[^>]+>[^{}]*?)*?)\}\}/gs;
xml = xml.replace(doubleBracePattern, (match, content) => {
  if (!content.includes('<')) return match;
  const textOnly = content.replace(/<[^>]+>/g, '');
  return '{{' + textOnly + '}}';
});

// Fix consecutive patterns
xml = xml.replace(/\}\}\{\{/g, '}} {{');

console.log('\n=== AFTER TAG MERGING ===\n');
console.log('First 500 chars:');
console.log(xml.substring(0, 500));

// Find the first template tag
const firstTagMatch = xml.match(/\{\{[^}]+\}\}/);
if (firstTagMatch) {
  console.log('\nFirst template tag found:', firstTagMatch[0]);
  console.log('Position:', xml.indexOf(firstTagMatch[0]));
}

// Check for any incomplete tags
const incomplete = xml.match(/\{[^{}]{0,30}[^}]$/gm) || [];
console.log('\nIncomplete tags found:', incomplete.length);
if (incomplete.length > 0) {
  console.log('First few:', incomplete.slice(0, 5));
}

// Save the processed XML for inspection
fs.writeFileSync('/tmp/processed_xml.xml', xml);
console.log('\nProcessed XML saved to /tmp/processed_xml.xml');
