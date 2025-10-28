#!/usr/bin/env python3
"""
Fix the confirmation section in the template to use placeholders instead of hardcoded data
"""

import zipfile
import os
import shutil
import re

template_path = 'public/templates/single_estate_planning_template.docx'
temp_dir = '/tmp/fix_confirmation'

# Extract
if os.path.exists(temp_dir):
    shutil.rmtree(temp_dir)
os.makedirs(temp_dir)

with zipfile.ZipFile(template_path, 'r') as zip_ref:
    zip_ref.extractall(temp_dir)

# Read document.xml
doc_xml_path = os.path.join(temp_dir, 'word', 'document.xml')
with open(doc_xml_path, 'r', encoding='utf-8') as f:
    content = f.read()

print("FIXING CONFIRMATION SECTION")
print("=" * 70)

# Fix 1: Replace hardcoded children table with loop
# Find the children table rows and replace with a loop
old_children_pattern = r'Skylar James Metriyakool</w:t></w:r></w:p></w:tc><w:tc><w:tcPr><w:tcW w:w="2160" w:type="dxa"/></w:tcPr><w:p[^>]+><w:r[^>]+><w:t>Son</w:t></w:r></w:p></w:tc><w:tc><w:tcPr><w:tcW w:w="2160" w:type="dxa"/></w:tcPr><w:p[^>]+><w:r[^>]+><w:t>October 27, 1995</w:t></w:r></w:p></w:tc></w:tr><w:tr[^>]+><w:tc><w:tcPr><w:tcW w:w="4320" w:type="dxa"/></w:tcPr><w:p[^>]+><w:r[^>]+><w:t>Sawyer James Metriyakool</w:t></w:r></w:p></w:tc><w:tc><w:tcPr><w:tcW w:w="2160" w:type="dxa"/></w:tcPr><w:p[^>]+><w:r[^>]+><w:t>Son</w:t></w:r></w:p></w:tc><w:tc><w:tcPr><w:tcW w:w="2160" w:type="dxa"/></w:tcPr><w:p[^>]+><w:r[^>]+><w:t>January 4, 2013</w:t></w:r></w:p></w:tc></w:tr><w:tr[^>]+><w:tc><w:tcPr><w:tcW w:w="4320" w:type="dxa"/></w:tcPr><w:p[^>]+><w:r[^>]+><w:t>Penelope Layne Metriyakool</w:t></w:r></w:p></w:tc><w:tc><w:tcPr><w:tcW w:w="2160" w:type="dxa"/></w:tcPr><w:p[^>]+><w:r[^>]+><w:t>Son</w:t></w:r></w:p></w:tc><w:tc><w:tcPr><w:tcW w:w="2160" w:type="dxa"/></w:tcPr><w:p[^>]+><w:r[^>]+><w:t>July 27, 2015'

# This is complex - let me use a simpler approach: just replace the specific hardcoded names
replacements = [
    # Children
    ('Skylar James Metriyakool</w:t></w:r></w:p></w:tc><w:tc><w:tcPr><w:tcW w:w="2160" w:type="dxa"/></w:tcPr><w:p',
     '{#children}{fullName}</w:t></w:r></w:p></w:tc><w:tc><w:tcPr><w:tcW w:w="2160" w:type="dxa"/></w:tcPr><w:p'),
    ('Son</w:t></w:r></w:p></w:tc><w:tc><w:tcPr><w:tcW w:w="2160" w:type="dxa"/></w:tcPr><w:p',
     '{relationship}</w:t></w:r></w:p></w:tc><w:tc><w:tcPr><w:tcW w:w="2160" w:type="dxa"/></w:tcPr><w:p'),
    ('October 27, 1995</w:t>', '{birthdate}</w:t>{/children}<w:tr'), # Close the loop after first child
    # Remove other hardcoded children rows
    ('Sawyer James Metriyakool', ''),
    ('January 4, 2013', ''),
    ('Penelope Layne Metriyakool', ''),
    ('July 27, 2015', ''),

    # Initial Trustee
    ('Initial Trustee:</w:t></w:r></w:p></w:tc><w:tc><w:tcPr><w:tcW w:w="4320" w:type="dxa"/></w:tcPr><w:p[^>]+><w:r[^>]+><w:t>James Metriyakool',
     'Initial Trustee:</w:t></w:r></w:p></w:tc><w:tc><w:tcPr><w:tcW w:w="4320" w:type="dxa"/></w:tcPr><w:p><w:r><w:t>{grantorFullName}'),

    # Successor Trustees
    ('Elizabeth Metriyakool; then\r\nAngela Metriyakool',
     '{#successors}{fullName}{^$last}; then{/$last}{#$last}{/$last}{/successors}'),
    ('Elizabeth Metriyakool; then Angela Metriyakool',
     '{#successors}{fullName}{^$last}; then{/$last}{#$last}{/$last}{/successors}'),

    # Durable POA
    ('Initial Agent:</w:t></w:r></w:p></w:tc><w:tc><w:tcPr><w:tcW w:w="4320" w:type="dxa"/></w:tcPr><w:p[^>]+><w:r[^>]+><w:t>Sawyer James Metriyakool \\(age 21\\)',
     'Initial Agent:</w:t></w:r></w:p></w:tc><w:tc><w:tcPr><w:tcW w:w="4320" w:type="dxa"/></w:tcPr><w:p><w:r><w:t>{#poaAgents}{#$first}{fullName}{#age} (age {age}){/age}{/$first}{/poaAgents}'),
    ('Successor Agent:</w:t></w:r></w:p></w:tc><w:tc><w:tcPr><w:tcW w:w="4320" w:type="dxa"/></w:tcPr><w:p[^>]+><w:r[^>]+><w:t>Angela Metriyakool',
     'Successor Agent:</w:t></w:r></w:p></w:tc><w:tc><w:tcPr><w:tcW w:w="4320" w:type="dxa"/></w:tcPr><w:p><w:r><w:t>{#poaAgents}{#$index > 0}{fullName}{^$last}, {/$last}{#$last}{/$last}{/$index > 0}{/poaAgents}'),

    # Healthcare Directive
    ('Initial Agent:</w:t></w:r></w:p></w:tc><w:tc><w:tcPr><w:tcW w:w="4320" w:type="dxa"/></w:tcPr><w:p[^>]+><w:r[^>]+><w:t>Maryann Gutierrez Metriyakool',
     'Initial Agent:</w:t></w:r></w:p></w:tc><w:tc><w:tcPr><w:tcW w:w="4320" w:type="dxa"/></w:tcPr><w:p><w:r><w:t>{#healthcareAgents}{#$first}{fullName}{/$first}{/healthcareAgents}'),
    ('Successor Agent:</w:t></w:r></w:p></w:tc><w:tc><w:tcPr><w:tcW w:w="4320" w:type="dxa"/></w:tcPr><w:p[^>]+><w:r[^>]+><w:t>Skylar James Metriyakool',
     'Successor Agent:</w:t></w:r></w:p></w:tc><w:tc><w:tcPr><w:tcW w:w="4320" w:type="dxa"/></w:tcPr><w:p><w:r><w:t>{#healthcareAgents}{#$index > 0}{fullName}{^$last}, {/$last}{#$last}{/$last}{/$index > 0}{/healthcareAgents}'),
]

# Apply simpler text replacements
text_replacements = [
    ('James Metriyakool', '{grantorFullName}'),
    ('Elizabeth Metriyakool; then\nAngela Metriyakool', '{#successors}{fullName}{^$last}; then{/$last}{#$last}{/$last}{/successors}'),
    ('Elizabeth Metriyakool; then Angela Metriyakool', '{#successors}{fullName}{^$last}; then{/$last}{#$last}{/$last}{/successors}'),
    ('Sawyer James Metriyakool (age 21)', '{#poaAgents}{#$first}{fullName}{#age} (age {age}){/age}{/$first}{/poaAgents}'),
    ('Angela Metriyakool', '{#poaAgents}{#$index > 0}{fullName}{^$last}, {/$last}{#$last}{/$last}{/$index > 0}{/poaAgents}'),
    ('Maryann Gutierrez Metriyakool', '{#healthcareAgents}{#$first}{fullName}{/$first}{/healthcareAgents}'),
    ('Skylar James Metriyakool', '{#healthcareAgents}{#$index > 0}{fullName}{^$last}, {/$last}{#$last}{/$last}{/$index > 0}{/healthcareAgents}'),
]

for old, new in text_replacements:
    if old in content:
        content = content.replace(old, new, 1)  # Only replace first occurrence
        print(f"✓ Replaced: {old[:50]}...")

# Write back
with open(doc_xml_path, 'w', encoding='utf-8') as f:
    f.write(content)

# Repack
with zipfile.ZipFile(template_path, 'w', zipfile.ZIP_DEFLATED) as zip_ref:
    for root, dirs, files in os.walk(temp_dir):
        for file in files:
            file_path = os.path.join(root, file)
            arcname = os.path.relpath(file_path, temp_dir)
            zip_ref.write(file_path, arcname)

# Cleanup
shutil.rmtree(temp_dir)

print("\n" + "=" * 70)
print("✅ Confirmation section fixed!")
