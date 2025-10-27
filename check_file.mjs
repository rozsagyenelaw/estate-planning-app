import fs from 'fs';
import PizZip from 'pizzip';

const content = fs.readFileSync('./public/templates/single_living_trust_template.docx', 'binary');
const zip = new PizZip(content);
const xml = zip.file('word/document.xml').asText();

// Check for split tags WITHOUT any merging
const splitPattern = /\{[^\{\}]*<[^>]+>[^\{\}]*\}/g;
const splits = xml.match(splitPattern) || [];

console.log(`Split tags in file on disk: ${splits.length}`);
if (splits.length > 0) {
  console.log('\nFirst 5 split tags:');
  splits.slice(0, 5).forEach((s, i) => {
    const text = s.replace(/<[^>]+>/g, '');
    console.log(`${i+1}. ${text}`);
  });
}
