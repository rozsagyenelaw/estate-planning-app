#!/usr/bin/env python3
"""
Fix healthcare agent details in the template
"""

import zipfile
import os
import shutil

template_path = 'public/templates/single_estate_planning_template.docx'
temp_dir = '/tmp/fix_healthcare'

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

print("FIXING HEALTHCARE AGENT DETAILS")
print("=" * 70)

# Fix 1: Replace hardcoded name
old_name = 'Maryann Gutierrez Metriyakool'
new_name = '{firstHealthcareAgent}'

if old_name in content:
    content = content.replace(old_name, new_name)
    print(f"✓ Replaced name: {old_name}")
else:
    print("✗ Name not found")

# Fix 2: Replace address (it currently uses client's address)
old_address = '{address} {city}, CA {zipCode}'
new_address = '{firstHealthcareAgentAddress} {firstHealthcareAgentCity}, {firstHealthcareAgentState} {firstHealthcareAgentZip}'

if old_address in content:
    content = content.replace(old_address, new_address)
    print(f"✓ Replaced address with healthcare agent's address")
else:
    print("✗ Address pattern not found")

# Fix 3: Replace hardcoded phone
old_phone = '(818) 282-5549'
new_phone = '{firstHealthcareAgentPhone}'

if old_phone in content:
    content = content.replace(old_phone, new_phone)
    print(f"✓ Replaced phone: {old_phone}")
else:
    print("✗ Phone not found")

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
print("✅ Healthcare agent details fixed!")
