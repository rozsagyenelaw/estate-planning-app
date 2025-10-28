#!/usr/bin/env python3
"""
Fix healthcare successor agents
"""

import zipfile
import os
import shutil

template_path = 'public/templates/single_estate_planning_template.docx'
temp_dir = '/tmp/fix_healthcare_succ'

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

print("FIXING HEALTHCARE SUCCESSOR AGENTS")
print("=" * 70)

# Fix 1: Replace hardcoded "Skylar James Metriyakool" in Successor Agent row
old_successor = 'Successor Agent:</w:t></w:r></w:p></w:tc><w:tc><w:tcPr><w:tcW w:w="4320" w:type="dxa"/></w:tcPr><w:p w14:paraId="42CB1DC2" w14:textId="77777777" w:rsidR="0038351D" w:rsidRDefault="00000000"><w:r><w:t>Skylar James Metriyakool'
new_successor = 'Successor Agent:</w:t></w:r></w:p></w:tc><w:tc><w:tcPr><w:tcW w:w="4320" w:type="dxa"/></w:tcPr><w:p w14:paraId="42CB1DC2" w14:textId="77777777" w:rsidR="0038351D" w:rsidRDefault="00000000"><w:r><w:t>{#healthcareAgents}{#$index &gt; 0}{fullName}{^$last}, {/$last}{/$index &gt; 0}{/healthcareAgents}'

if old_successor in content:
    content = content.replace(old_successor, new_successor)
    print("✓ Fixed Successor Agent in confirmation table")
else:
    print("✗ Successor Agent pattern not found in confirmation table")

# Now let's also fix the "If... unwilling..." sentence structure
# The pattern should be: If {firstHealthcareAgent} is unwilling... I designate {successors}
# Currently it might be: If {healthcareAgents loop} is unwilling... I designate {healthcareAgents loop}
old_if_pattern = '{#hasMultipleHealthcareAgents}If {#healthcareAgents}{#$first}{fullName}{/$first}{/healthcareAgents} is unwilling or unable to serve, I designate {#healthcareAgents}{#$index &gt; 0}{fullName}{/$index &gt; 0}{^$last}, {/$last}{/healthcareAgents}'
new_if_pattern = '{#hasMultipleHealthcareAgents}If {firstHealthcareAgent} is unwilling or unable to serve, I designate {#healthcareAgents}{#$index &gt; 0}{fullName}{^$last}, {/$last}{/$index &gt; 0}{/healthcareAgents}'

if old_if_pattern in content:
    content = content.replace(old_if_pattern, new_if_pattern)
    print("✓ Fixed 'If... unwilling...' sentence structure")
else:
    print("✗ 'If... unwilling...' pattern not found")

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
print("✅ Healthcare successor agents fixed!")
