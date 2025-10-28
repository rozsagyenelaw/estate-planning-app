#!/usr/bin/env python3
"""
Final fix for Elizabeth - with exact pattern
"""

import zipfile
import os
import shutil

template_path = 'public/templates/single_estate_planning_template.docx'
temp_dir = '/tmp/fix_elizabeth_final'

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

print("FIXING SUCCESSOR TRUSTEES - FINAL")
print("=" * 70)

# Exact pattern from the debug output
old_pattern = '<w:r><w:t>Elizabeth Metriyakool; then</w:t></w:r><w:r><w:br/><w:t>{#poaAgents}{#$index &gt; 0}{fullName}{^$last}, {/$last}{#$last}{/$last}{/$index &gt; 0}{/poaAgents}</w:t></w:r>'
new_pattern = '<w:r><w:t>{#successorTrustees}{fullName}{^$last}, {/$last}{/successorTrustees}</w:t></w:r>'

if old_pattern in content:
    content = content.replace(old_pattern, new_pattern)
    print("✓ Fixed Successor Trustees")
else:
    print("✗ Pattern not found")

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
print("✅ Successor Trustees fixed!")
