#!/usr/bin/env python3
"""
Fix remaining confirmation page issues
"""

import zipfile
import os
import shutil

template_path = 'public/templates/single_estate_planning_template.docx'
temp_dir = '/tmp/fix_remaining'

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

print("FIXING REMAINING CONFIRMATION PAGE ISSUES")
print("=" * 70)

# Fix 1: Replace Penelope
if 'Penelope Layne Metriyakool' in content:
    content = content.replace('Penelope Layne Metriyakool', '{fullName}')
    print("✓ Replaced Penelope Layne Metriyakool with {fullName}")
else:
    print("✗ Penelope not found")

# Fix 2: Replace hardcoded dates
dates = ['October 27, 1995', 'January 4, 2013', 'July 27, 2015']
for date in dates:
    if date in content:
        content = content.replace(date, '{birthdate}')
        print(f"✓ Replaced {date} with {{birthdate}}")

# Fix 3: Replace hardcoded "Son" entries
# We need to be careful here - replace with {relationship} but only in the right context
# Count occurrences first
son_count = content.count('>Son<')
print(f"\nFound {son_count} occurrences of '>Son<'")

# Replace all Son entries with {relationship}
content = content.replace('>Son<', '>{relationship}<')
print(f"✓ Replaced Son with {{relationship}}")

# Fix 4: Make sure Advanced Health Care Directive Initial Agent uses simpler placeholder
old_healthcare_initial = 'Initial Agent:</w:t></w:r></w:p></w:tc><w:tc><w:tcPr><w:tcW w:w="4320" w:type="dxa"/></w:tcPr><w:p w14:paraId="19D9A2C8" w14:textId="77777777" w:rsidR="0038351D" w:rsidRDefault="00000000"><w:r><w:t>{#healthcareAgents}{#$first}{fullName}{/$first}{/healthcareAgents}'
new_healthcare_initial = 'Initial Agent:</w:t></w:r></w:p></w:tc><w:tc><w:tcPr><w:tcW w:w="4320" w:type="dxa"/></w:tcPr><w:p w14:paraId="19D9A2C8" w14:textId="77777777" w:rsidR="0038351D" w:rsidRDefault="00000000"><w:r><w:t>{firstHealthcareAgent}'

if old_healthcare_initial in content:
    content = content.replace(old_healthcare_initial, new_healthcare_initial)
    print("\n✓ Simplified Advanced Health Care Directive Initial Agent to use {firstHealthcareAgent}")
else:
    print("\n✗ Healthcare Initial Agent pattern not found")

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
print("✅ Remaining confirmation page issues fixed!")
