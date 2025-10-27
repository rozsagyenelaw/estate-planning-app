import fs from 'fs';
import PizZip from 'pizzip';

const content = fs.readFileSync('./public/templates/single_living_trust_template.docx', 'binary');
const zip = new PizZip(content);
let xml = zip.file('word/document.xml').asText();

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

// Now check for split tags
const stillSplit = xml.match(/\{[^{}]*<[^>]+>[^{}]*\}/g) || [];
console.log(`Split tags after merging: ${stillSplit.length}`);

// Check offset 172-191 where error occurs
console.log('\nContent at offset 172-195:');
console.log(xml.substring(172, 195));
