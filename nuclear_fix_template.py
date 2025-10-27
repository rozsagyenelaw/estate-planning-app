#!/usr/bin/env python3
"""
Nuclear fix: Extract all text, fix all tags, completely rebuild document structure
"""
import zipfile
import re
from lxml import etree

# Namespaces
NAMESPACES = {
    'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main',
    'w14': 'http://schemas.microsoft.com/office/word/2010/wordml',
    'wp': 'http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing',
}

template_path = './public/templates/single_living_trust_template.docx'

# Read template
with zipfile.ZipFile(template_path, 'r') as zip_in:
    xml_bytes = zip_in.read('word/document.xml')

# Parse XML
root = etree.fromstring(xml_bytes)

# Extract ALL text from the document
def extract_all_text(element):
    """Extract all text content from w:t elements"""
    texts = []
    for t_elem in element.findall('.//w:t', NAMESPACES):
        if t_elem.text:
            texts.append(t_elem.text)
    return ''.join(texts)

all_text = extract_all_text(root)
print(f"Extracted {len(all_text)} characters of text")

# Find all split template tag patterns
print("\nSearching for split tags...")
split_patterns = [
    (r'(\{\{#if\s+[^}]+)(ment\}\})', r'\1ment}}'),  # {{#if isRestate + ment}}
    (r'(\{\{/if)(})', r'\1}'),  # {{/if + }
    (r'(\{\{#if\s+[^}]+)(ions\}\})', r'\1ions}}'),  # {{#if hasSpecificDistribut + ions}}
    (r'(\{\{#spe[^}]*)(ions\}\})', r'\1ions}}'),  # {{#specificDistribut + ions}}
    (r'(\{\{/spe[^}]*)(ions\}\})', r'\1ions}}'),  # {{/specificDistribut + ions}}
    (r'(\{\{#ben[^}]*)(ries\}\})', r'\1ries}}'),  # {{#benefici + aries}}
    (r'(\{\{/ben[^}]*)(ries\}\})', r'\1ries}}'),  # {{/benefici + aries}}
]

# This approach isn't working. Let me try differently:
# Find ALL {{ and match with }}
print("\nRebuilding template tags...")

# Pattern: find anything that looks like it could be part of a template tag
fixed_text = all_text

# First, remove any XML-style tags that might have leaked into text
fixed_text = re.sub(r'<[^>]+>', '', fixed_text)

# Now fix common split patterns by manually searching
# The issue is tags like "{{#if isRestate" followed later by "ment}}"

# Strategy: Find all instances of incomplete opening tags
incomplete_opens = []
for match in re.finditer(r'\{\{[#/][a-zA-Z]+', fixed_text):
    # Check if this is followed by }} within reasonable distance
    start = match.start()
    end_search = fixed_text[start:start+100]
    if '}}' not in end_search:
        incomplete_opens.append((start, match.group()))
        print(f"Found incomplete open at {start}: {match.group()}")

# Find incomplete closes
incomplete_closes = []
for match in re.finditer(r'[a-z]{3,}\}\}', fixed_text):
    # Check if this is preceded by {{ within reasonable distance
    end = match.end()
    start_search = fixed_text[max(0,end-100):end]
    if '{{' not in start_search or start_search.count('{{') < start_search.count('}}'):
        incomplete_closes.append((end, match.group()))
        print(f"Found incomplete close at {end}: {match.group()}")

print(f"\nFound {len(incomplete_opens)} incomplete opens and {len(incomplete_closes)} incomplete closes")

# Manual fix: Replace known broken patterns
replacements = [
    ('{{#if isRestate', '{{#if isRestatement'),
    ('{{#if notIsRestate', '{{#if notIsRestatement'),
    ('ment}}', '}}'),  # Remove the extra "ment"
    ('{{/if}', '{{/if}}'),  # Fix incomplete /if
    ('{/if}}', '}}'),  # Remove the extra "{/if"
    ('{{#if hasSpecificDistribut', '{{#if hasSpecificDistributions'),
    ('{{#if notHasSpecificDistribut', '{{#if notHasSpecificDistributions'),
    ('ions}}', '}}'),  # Remove extra "ions"
    ('{{#specificDistribut', '{{#specificDistributions'),
    ('{{/specificDistribut', '{{/specificDistributions'),
    ('{{#benefici', '{{#beneficiaries'),
    ('{{/benefici', '{{/beneficiaries'),
    ('aries}}', '}}'),  # Remove extra "aries"
    ('ries}}', '}}'),  # Remove extra "ries"
]

for old, new in replacements:
    if old in fixed_text:
        count = fixed_text.count(old)
        fixed_text = fixed_text.replace(old, new)
        print(f"Replaced {count} instances of '{old}' with '{new}'")

# Now rebuild the XML with fixed text
# Strategy: Replace all <w:t> elements with properly chunked text

def rebuild_paragraphs(body_element, text):
    """Rebuild all paragraphs with fixed text"""
    # Remove all existing paragraphs
    for p in body_element.findall('w:p', NAMESPACES):
        body_element.remove(p)

    # Split text into lines/paragraphs (roughly)
    # For now, just create one big paragraph per 500 chars
    chunk_size = 500
    chunks = [text[i:i+chunk_size] for i in range(0, len(text), chunk_size)]

    print(f"\nCreating {len(chunks)} paragraphs from fixed text...")

    for chunk in chunks:
        # Create new paragraph
        p = etree.SubElement(body_element, '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}p')
        r = etree.SubElement(p, '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}r')
        t = etree.SubElement(r, '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}t')
        t.set('{http://www.w3.org/XML/1998/namespace}space', 'preserve')
        t.text = chunk

body = root.find('.//w:body', NAMESPACES)
if body is not None:
    rebuild_paragraphs(body, fixed_text)

# Write back
output_xml = etree.tostring(root, encoding='utf-8', xml_declaration=True, pretty_print=True)

output_path = './public/templates/single_living_trust_template_NUCLEAR.docx'
with zipfile.ZipFile(template_path, 'r') as zip_in:
    with zipfile.ZipFile(output_path, 'w', zipfile.ZIP_DEFLATED) as zip_out:
        for item in zip_in.infolist():
            if item.filename == 'word/document.xml':
                zip_out.writestr(item, output_xml)
            else:
                zip_out.writestr(item, zip_in.read(item.filename))

print(f"\nNuclear-fixed template saved to: {output_path}")
print("WARNING: This template has lost all formatting!")
print("Test it now!")
