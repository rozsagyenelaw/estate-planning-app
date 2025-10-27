import fs from 'fs';
import PizZip from 'pizzip';

const content = fs.readFileSync('./public/templates/single_living_trust_template.docx', 'binary');
const zip = new PizZip(content);
const xml = zip.file('word/document.xml').asText();

// Find the first occurrence of "ment}}" to see its full context
const searchFor = 'ment}}';
const pos = xml.indexOf(searchFor);

if (pos !== -1) {
  console.log('Found "ment}}" at position:', pos);
  console.log('\nContext (200 chars before and after):');
  console.log(xml.substring(pos - 200, pos + 200));
  console.log('\n---\n');

  // Look for the opening part
  const before = xml.substring(Math.max(0, pos - 500), pos);
  const openMatch = before.match(/\{\{[^}]*$/);
  if (openMatch) {
    console.log('Opening part found:',  openMatch[0]);
    console.log('\nFull split tag context:');
    console.log(xml.substring(pos - 300, pos + 50));
  }
}
