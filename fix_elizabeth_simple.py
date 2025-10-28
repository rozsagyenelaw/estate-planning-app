#!/usr/bin/env python3
"""
Simple fix for Elizabeth
"""

import zipfile
import os
import shutil

template_path = 'public/templates/single_estate_planning_template.docx'
temp_dir = '/tmp/fix_elizabeth_simple'

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

print("FIXING SUCCESSOR TRUSTEES - SIMPLE APPROACH")
print("=" * 70)

# Count occurrences
count = content.count("Elizabeth Metriyakool; then")
print(f"Found {count} occurrence(s) of 'Elizabeth Metriyakool; then'")

# Just replace "Elizabeth Metriyakool; then" with the placeholder
old_text = 'Elizabeth Metriyakool; then'
new_text = ''

# Also need to handle the POA agents loop that comes after
# Let's replace the whole section more carefully
old_section = 'Elizabeth Metriyakool; then</w:t></w:r><w:r><w:br/><w:t>{#poaAgents}{#$index &gt; 0}'
new_section = '{#successorTrustees}{fullName}{^$last}, {/$last}{/successorTrustees}</w:t></w:r><w:r><w:t>{^successorTrustees}{#poaAgents}{#$index &gt; 0}'

if old_section in content:
    content = content.replace(old_section, new_section)
    print("✓ Fixed Successor Trustees")
else:
    print("✗ Pattern not found - trying simpler replacement")
    # Try just replacing the name part
    if 'Elizabeth Metriyakool' in content:
        print("  Found 'Elizabeth Metriyakool' - doing manual replacement")
        # Let's look at what we need to replace more carefully
        idx = content.index('Elizabeth Metriyakool')
        print(f"  Context around it: ...{content[idx-50:idx+200]}...")

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
print("✅ Done!")
