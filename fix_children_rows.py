#!/usr/bin/env python3
"""
Replace hardcoded children rows with placeholder loops
"""

import zipfile
import os
import shutil

template_path = 'public/templates/single_estate_planning_template.docx'
temp_dir = '/tmp/fix_children_rows'

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

print("REPLACING HARDCODED CHILDREN ROWS")
print("=" * 70)

# Replace Sawyer James Metriyakool row
old_sawyer = '<w:r><w:t>Sawyer James Metriyakool</w:t></w:r>'
new_sawyer = '<w:r><w:t>{relationship}</w:t></w:r>'

if old_sawyer in content:
    content = content.replace(old_sawyer, new_sawyer)
    print("✓ Replaced Sawyer with {relationship} placeholder")
else:
    print("✗ Sawyer pattern not found")

# Replace Penelope row - need to remove this entire row since we'll loop through children
# Find the pattern for Penelope's row and remove it
old_penelope_row = '<w:tr w:rsidR="0038351D" w14:paraId="69C6BCF8" w14:textId="77777777"><w:tc><w:tcPr><w:tcW w:w="1440" w:type="dxa"/></w:tcPr><w:p w14:paraId="1C8BDEE7" w14:textId="77777777" w:rsidR="0038351D" w:rsidRDefault="00000000"><w:r><w:t xml:space="preserve">    Penelope Layne Metriyakool</w:t></w:r></w:p></w:tc><w:tc><w:tcPr><w:tcW w:w="2160" w:type="dxa"/></w:tcPr><w:p w14:paraId="07ECC4C6" w14:textId="77777777" w:rsidR="0038351D" w:rsidRDefault="00000000"><w:r><w:t>Son</w:t></w:r></w:p></w:tc><w:tc><w:tcPr><w:tcW w:w="2160" w:type="dxa"/></w:tcPr><w:p w14:paraId="5867FF9F" w14:textId="77777777" w:rsidR="0038351D" w:rsidRDefault="00000000"><w:r><w:t>July 27, 2015</w:t></w:r></w:p></w:tc></w:tr>'

# Try simpler approach - just replace the name
if 'Penelope Layne Metriyakool' in content:
    # Find where it is
    idx = content.index('Penelope Layne Metriyakool')
    print(f"✓ Found Penelope at position {idx}")
    # Look for the full row context
    start = max(0, idx - 300)
    end = min(len(content), idx + 300)
    print(f"  Row context: {content[start:end]}")

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
