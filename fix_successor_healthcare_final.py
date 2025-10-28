#!/usr/bin/env python3
"""
Fix healthcare successor agents - final comprehensive fix
"""

import zipfile
import os
import shutil

template_path = 'public/templates/single_estate_planning_template.docx'
temp_dir = '/tmp/fix_healthcare_final'

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

print("FIXING HEALTHCARE SUCCESSOR AGENTS - COMPREHENSIVE FIX")
print("=" * 70)

# Fix 1: Change the "I designate" clause to use successorHealthcareAgents array
old_designate = '{#hasMultipleHealthcareAgents}If {firstHealthcareAgent} is unwilling or unable to serve, I designate {#healthcareAgents}{#$index &gt; 0}{fullName}{^$last}, {/$last}{/$index &gt; 0}{/healthcareAgents} as alternate Health Care Agent'
new_designate = '{#hasMultipleHealthcareAgents}If {firstHealthcareAgent} is unwilling or unable to serve, I designate {#successorHealthcareAgents}{fullName}{^$last}, {/$last}{/successorHealthcareAgents} as alternate Health Care Agent'

if old_designate in content:
    content = content.replace(old_designate, new_designate)
    print("✓ Fixed 'I designate' clause to use successorHealthcareAgents")
else:
    print("✗ 'I designate' clause pattern not found")

# Fix 2: Replace hardcoded "Skylar James Metriyakool" with loop for successor agents
old_name = '    Name:</w:t></w:r></w:p></w:tc><w:tc><w:tcPr><w:tcW w:w="8640" w:type="dxa"/></w:tcPr><w:p w14:paraId="0052D0C9" w14:textId="77777777" w:rsidR="0038351D" w:rsidRDefault="00000000"><w:r><w:t>Skylar James Metriyakool'
new_name = '    Name:</w:t></w:r></w:p></w:tc><w:tc><w:tcPr><w:tcW w:w="8640" w:type="dxa"/></w:tcPr><w:p w14:paraId="0052D0C9" w14:textId="77777777" w:rsidR="0038351D" w:rsidRDefault="00000000"><w:r><w:t>{#successorHealthcareAgents}{fullName}{^$last}, {/$last}{/successorHealthcareAgents}'

if old_name in content:
    content = content.replace(old_name, new_name)
    print("✓ Fixed Name field for alternate agents")
else:
    print("✗ Name field pattern not found")

# Fix 3: Replace Address field to use successor agent data
old_address = '    Address:</w:t></w:r></w:p></w:tc><w:tc><w:tcPr><w:tcW w:w="8640" w:type="dxa"/></w:tcPr><w:p w14:paraId="0F15DB80" w14:textId="77777777" w:rsidR="0038351D" w:rsidRDefault="00000000"><w:r><w:t>{firstHealthcareAgentAddress} {firstHealthcareAgentCity}, {firstHealthcareAgentState} {firstHealthcareAgentZip}'
new_address = '    Address:</w:t></w:r></w:p></w:tc><w:tc><w:tcPr><w:tcW w:w="8640" w:type="dxa"/></w:tcPr><w:p w14:paraId="0F15DB80" w14:textId="77777777" w:rsidR="0038351D" w:rsidRDefault="00000000"><w:r><w:t>{#successorHealthcareAgents}{address} {city}, {state} {zip}{^$last}; {/$last}{/successorHealthcareAgents}'

if old_address in content:
    content = content.replace(old_address, new_address)
    print("✓ Fixed Address field for alternate agents")
else:
    print("✗ Address field pattern not found")

# Fix 4: Replace hardcoded phone "(818) 931-4536" with loop for successor agents
old_phone = '    Phone:</w:t></w:r></w:p></w:tc><w:tc><w:tcPr><w:tcW w:w="8640" w:type="dxa"/></w:tcPr><w:p w14:paraId="5764DA22" w14:textId="77777777" w:rsidR="0038351D" w:rsidRDefault="00000000"><w:r><w:t>(818) 931-4536'
new_phone = '    Phone:</w:t></w:r></w:p></w:tc><w:tc><w:tcPr><w:tcW w:w="8640" w:type="dxa"/></w:tcPr><w:p w14:paraId="5764DA22" w14:textId="77777777" w:rsidR="0038351D" w:rsidRDefault="00000000"><w:r><w:t>{#successorHealthcareAgents}{phone}{^$last}, {/$last}{/successorHealthcareAgents}'

if old_phone in content:
    content = content.replace(old_phone, new_phone)
    print("✓ Fixed Phone field for alternate agents")
else:
    print("✗ Phone field pattern not found")

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
print("✅ Healthcare successor agents comprehensively fixed!")
print("\nChanges made:")
print("1. 'I designate' clause now uses successorHealthcareAgents array")
print("2. Name field shows all successor agents")
print("3. Address field shows all successor agent addresses")
print("4. Phone field shows all successor agent phones")
