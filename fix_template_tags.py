#!/usr/bin/env python3
import zipfile
import re
from pathlib import Path

# Read the template
template_path = './public/templates/single_living_trust_template.docx'
with zipfile.ZipFile(template_path, 'r') as zip_in:
    xml_content = zip_in.read('word/document.xml').decode('utf-8')

print("Original XML length:", len(xml_content))

# Strategy: Find all <w:t> elements, extract their text, merge template tags,
# then replace the <w:t> elements with fixed versions

def fix_template_tags_in_xml(xml):
    """
    Fix split template tags by merging text across <w:t> elements
    """
    # Find all <w:t> elements and their positions
    wt_pattern = r'<w:t[^>]*>([^<]*)</w:t>'

    def fix_tags_in_run(match):
        """Process a run of text and fix any split tags"""
        text = match.group(1)
        # XML entity decode
        text = text.replace('&lt;', '<').replace('&gt;', '>').replace('&amp;', '&')
        return '<w:t xml:space="preserve">' + text.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;') + '</w:t>'

    # First pass: collect all text content
    all_text_elements = re.findall(wt_pattern, xml)
    plain_text = ''.join(all_text_elements)

    print(f"Found {len(all_text_elements)} <w:t> elements")
    print(f"Combined text length: {len(plain_text)}")

    # Check for split tags in plain text
    split_count = 0
    for i, c in enumerate(plain_text):
        if c == '{' and i+1 < len(plain_text):
            # Find the closing }
            depth = 1 if plain_text[i+1] == '{' else 0
            for j in range(i+2, min(i+100, len(plain_text))):
                if plain_text[j] == '}' and j+1 < len(plain_text) and plain_text[j+1] == '}':
                    # Found closing
                    tag = plain_text[i:j+2]
                    if '<' not in tag and len(tag) < 50:  # Reasonable tag
                        break
                    split_count += 1
                    break

    print(f"Estimated split tags in combined text: {split_count}")

    # More aggressive approach: Rebuild XML with merged tags
    # Split into runs (everything between <w:r> and </w:r>)
    run_pattern = r'(<w:r(?:\s[^>]*)?>)(.*?)(</w:r>)'

    def process_run(match):
        run_start = match.group(1)
        run_content = match.group(2)
        run_end = match.group(3)

        # Extract all text from <w:t> elements in this run
        texts = re.findall(wt_pattern, run_content)
        if not texts:
            return match.group(0)

        # Combine texts
        combined = ''.join(t for t in texts)

        # Remove all <w:t> elements from run_content
        cleaned_content = re.sub(wt_pattern, '', run_content)

        # Add back as a single <w:t> element at the end
        new_run = run_start + cleaned_content + f'<w:t xml:space="preserve">{combined}</w:t>' + run_end
        return new_run

    fixed_xml = re.sub(run_pattern, process_run, xml, flags=re.DOTALL)

    return fixed_xml

# Fix the XML
fixed_xml = fix_template_tags_in_xml(xml_content)

print("Fixed XML length:", len(fixed_xml))

# Write back
output_path = './public/templates/single_living_trust_template_FIXED.docx'
with zipfile.ZipFile(template_path, 'r') as zip_in:
    with zipfile.ZipFile(output_path, 'w', zipfile.ZIP_DEFLATED) as zip_out:
        for item in zip_in.infolist():
            if item.filename == 'word/document.xml':
                zip_out.writestr(item, fixed_xml.encode('utf-8'))
            else:
                zip_out.writestr(item, zip_in.read(item.filename))

print(f"\nFixed template saved to: {output_path}")
print("Now test with the FIXED template!")
