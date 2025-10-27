import fs from 'fs';
import PizZip from 'pizzip';

const content = fs.readFileSync('./public/templates/single_living_trust_template.docx', 'binary');
const zip = new PizZip(content);

// Apply tag merging
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

documentXml = documentXml.replace(/\}\}\{\{/g, '}} {{');

zip.file('word/document.xml', documentXml);

// Regenerate
const modifiedZipBuffer = zip.generate({ type: 'nodebuffer' });
const modifiedZip = new PizZip(modifiedZipBuffer);

// Read back the XML from the regenerated zip
const regeneratedXml = modifiedZip.file('word/document.xml').asText();

console.log('Checking regenerated XML...\n');

// Find first template tag
const firstTag = regeneratedXml.match(/\{\{[#/][^}]*\}\}/);
if (firstTag) {
  const pos = regeneratedXml.indexOf(firstTag[0]);
  console.log('First tag:', firstTag[0]);
  console.log('Context (100 chars before and after):');
  console.log(regeneratedXml.substring(pos - 100, pos + 100));
}

// Check for incomplete tags
const incompleteOpen = regeneratedXml.match(/\{\{[^}]{1,10}$/gm) || [];
const incompleteClose = regeneratedXml.match(/^[^{]{1,10}\}\}/gm) || [];
const splitTags = regeneratedXml.match(/[a-z]{1,4}\}\}/g) || [];

console.log('\n---');
console.log('Incomplete open tags:', incompleteOpen.length);
console.log('Incomplete close tags:', incompleteClose.length);
console.log('Suspicious endings (e.g., "ment}}"):', splitTags.length);
if (splitTags.length > 0) {
  console.log('First 10:',splitTags.slice(0, 10));
}
