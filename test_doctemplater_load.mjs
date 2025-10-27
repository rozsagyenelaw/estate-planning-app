import fs from 'fs';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';

const templatePath = './public/templates/single_living_trust_template.docx';
const content = fs.readFileSync(templatePath, 'binary');
const zip = new PizZip(content);

// Get the XML BEFORE any modifications
const originalXml = zip.file('word/document.xml').asText();

// Apply tag merging
let documentXml = originalXml;

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

// Fix consecutive patterns
documentXml = documentXml.replace(/\}\}\{\{/g, '}} {{');

// Update ZIP
zip.file('word/document.xml', documentXml);

console.log('Checking what docxtemplater sees...\n');
console.log('Original XML length:', originalXml.length);
console.log('Modified XML length:', documentXml.length);
console.log('XML at offset 172 (original):', originalXml.substring(172, 200));
console.log('XML at offset 172 (modified):', documentXml.substring(172, 200));

// Now try to load with docxtemplater
try {
  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
  });
  console.log('\n✓ Docxtemplater loaded successfully!');
} catch (error) {
  console.log('\n✗ Docxtemplater failed to load:');
  console.log(error.message);
  if (error.properties?.errors) {
    console.log('\nFirst error offset:', error.properties.errors[0].properties.offset);
    console.log('First error context:', error.properties.errors[0].properties.context);
  }
}
