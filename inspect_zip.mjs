import fs from 'fs';
import PizZip from 'pizzip';

const content = fs.readFileSync('./public/templates/single_living_trust_template.docx', 'binary');
const zip = new PizZip(content);

const documentXml = zip.file('word/document.xml').asText();

// Check for split tags
const splitPattern = /\{[^{}]*<w:t>[^{}]*\}|\{[^{}]*<\/w:t>[^{}]*\}/g;
const splitMatches = documentXml.match(splitPattern) || [];

console.log(`Split tags found: ${splitMatches.length}`);
if (splitMatches.length > 0) {
  console.log('\nFirst 3 split tags:');
  splitMatches.slice(0, 3).forEach((m, i) => {
    const text = m.replace(/<[^>]+>/g, '');
    console.log(`${i + 1}. ${text}`);
  });
}

// Check offset 172 where error occurs
console.log('\nContent at offset 172:');
console.log(documentXml.substring(150, 250));

// Check if tags are actually balanced
const allTags = documentXml.match(/\{\{[^}]*\}\}?|\{[^}]*\}/g) || [];
const broken = allTags.filter(tag => {
  const openDouble = (tag.match(/\{\{/g) || []).length;
  const closeDouble = (tag.match(/\}\}/g) || []).length;
  return openDouble !== closeDouble;
});

console.log(`\nTotal tags: ${allTags.length}`);
console.log(`Potentially broken tags: ${broken.length}`);
if (broken.length > 0) {
  console.log('\nFirst 5 broken tags:');
  broken.slice(0, 5).forEach((tag, i) => {
    console.log(`${i + 1}. ${tag.substring(0, 50)}`);
  });
}
