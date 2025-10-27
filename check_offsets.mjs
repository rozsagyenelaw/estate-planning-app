import fs from 'fs';
import PizZip from 'pizzip';

const content = fs.readFileSync('./public/templates/single_living_trust_template.docx', 'binary');
const zip = new PizZip(content);
let xml = zip.file('word/document.xml').asText();

// Apply tag merging first
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

// Check around error offsets
console.log('Offset 172-200:');
console.log(xml.substring(172, 200));
console.log('\n---\n');

console.log('Offset 533-570:');
console.log(xml.substring(533, 570));
console.log('\n---\n');

// Find all }}{{ patterns and replace with }} {{
const fixed = xml.replace(/\}\}\{\{/g, '}} {{');
const remaining = fixed.match(/\}\}\s*\{\{/g) || [];
console.log(`After adding spaces, remaining patterns: ${remaining.length}`);
