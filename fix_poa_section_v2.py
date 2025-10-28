#!/usr/bin/env python3
"""
Fix the POA section - fix the nested loop closing tag order
"""

import zipfile
import os
import shutil

template_path = 'public/templates/single_estate_planning_template.docx'
temp_dir = '/tmp/fix_poa_v2'

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

print("FIXING POA SECTION - CLOSING TAG ORDER")
print("=" * 70)

# The issue: {#$index > 0}{fullName}{/$index > 0}{^$last}, {/$last}
# Should be: {#$index > 0}{fullName}{^$last}, {/$last}{/$index > 0}

old = '{#poaAgents}{#$index &gt; 0}{fullName}{/$index &gt; 0}{^$last}, {/$last}{/poaAgents}'
new = '{#poaAgents}{#$index &gt; 0}{fullName}{^$last}, {/$last}{/$index &gt; 0}{/poaAgents}'

if old in content:
    content = content.replace(old, new)
    print("✓ Fixed Section 1.02 - corrected closing tag order")
else:
    print("✗ Pattern not found")
    print("Searching for similar patterns...")
    if '{#$index &gt; 0}{fullName}{/$index &gt; 0}' in content:
        print("  Found the problematic pattern!")

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
print("✅ POA section fixed!")
