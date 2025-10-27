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

// Find consecutive {{/if}}{{#if blocks - more flexible pattern
const consecutive = xml.match(/\{\{\/[^}]+\}\}\s*\{\{#[^}]+\}\}/g) || [];
console.log('Consecutive close/open tag pairs found:', consecutive.length);
console.log('\nFirst 20 pairs:');
consecutive.slice(0, 20).forEach((pair, i) => {
  console.log(`${i+1}. ${pair}`);
});

// Also check for ANY consecutive close/open patterns
const allConsecutive = xml.match(/\}\}\s*\{\{/g) || [];
console.log(`\nTotal }} {{ patterns: ${allConsecutive.length}`);
