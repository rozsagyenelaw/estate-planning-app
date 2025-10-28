#!/usr/bin/env python3
"""
Remove the extra isPlural closing tag
"""

import zipfile
import os
import shutil
import re

template_path = 'public/templates/single_estate_planning_template.docx'
temp_dir = '/tmp/docx_isplural_fix'

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

# Find all isPlural closing tags
pattern = r'\{/isPlural\}'
matches = list(re.finditer(pattern, content))
print(f"Found {len(matches)} closing tags for isPlural")

if len(matches) > 1:
    # Remove the last one
    last_match = matches[-1]
    content = content[:last_match.start()] + content[last_match.end():]
    print(f"✓ Removed extra closing tag at position {last_match.start()}")

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
print("✅ Done!")
