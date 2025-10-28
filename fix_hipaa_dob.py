#!/usr/bin/env python3
"""
Fix the HIPAA DOB to use placeholder
"""

import zipfile
import os
import shutil

template_path = 'public/templates/single_estate_planning_template.docx'
temp_dir = '/tmp/fix_hipaa_dob'

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

print("FIXING HIPAA DOB")
print("=" * 70)

# Replace the hardcoded DOB
old_dob = 'October 21, 1971'
new_dob = '{grantorDateOfBirth}'

if old_dob in content:
    content = content.replace(old_dob, new_dob)
    print(f"✓ Replaced '{old_dob}' with '{new_dob}'")
else:
    print("✗ October 21, 1971 not found")

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
print("✅ HIPAA DOB fixed!")
