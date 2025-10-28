#!/usr/bin/env python3
"""
Fix Family Information table in confirmation page
"""

import zipfile
import os
import shutil

template_path = 'public/templates/single_estate_planning_template.docx'
temp_dir = '/tmp/fix_family_info'

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

print("FIXING FAMILY INFORMATION TABLE")
print("=" * 70)

# Find and replace all hardcoded children names
children_names = [
    'Sawyer James Metriyakool',
    'Penelope Layne Metriyakool'
]

for name in children_names:
    if name in content:
        print(f"✓ Found hardcoded child name: {name}")
        # Get context
        idx = content.index(name)
        print(f"  Context: ...{content[idx-50:idx+100]}...")
    else:
        print(f"✗ Child name not found: {name}")

# Fix the wrong healthcare agents placeholder in Family Information
# Change from healthcare agents to children
old_family_cell = '{#healthcareAgents}{#$index > 0}{fullName}{^$last}, {/$last}{#$last}{/$last}{/$index > 0}{/healthcareAgents}'
new_family_cell = '{#children}{fullName}'

if old_family_cell in content:
    content = content.replace(old_family_cell, new_family_cell)
    print(f"\n✓ Fixed Family Information to use children instead of healthcareAgents")
else:
    print(f"\n✗ Healthcare agents pattern not found in Family Information")

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
print("✅ Family Information table updated!")
