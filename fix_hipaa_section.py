#!/usr/bin/env python3
"""
Fix the HIPAA section to use hipaaAgents loop
"""

import zipfile
import os
import shutil

template_path = 'public/templates/single_estate_planning_template.docx'
temp_dir = '/tmp/fix_hipaa'

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

print("FIXING HIPAA SECTION")
print("=" * 70)

# Replace the hardcoded HIPAA agents with a proper loop
# Old: {fullName};</w:t></w:r></w:p><w:p...><w:t>Skylar {grantorFullName}; and
# New: Loop through all HIPAA agents with proper formatting

old_pattern = '{fullName};</w:t></w:r></w:p><w:p w14:paraId="412ED024" w14:textId="77777777" w:rsidR="0038351D" w:rsidRDefault="00000000"><w:pPr><w:pStyle w:val="BodyText2"/></w:pPr><w:r><w:t>Skylar {grantorFullName}; and'

new_pattern = '{#hipaaAgents}{fullName};{^$last} and{/$last}{/hipaaAgents}'

if old_pattern in content:
    content = content.replace(old_pattern, new_pattern)
    print("✓ Fixed HIPAA agents list - using hipaaAgents loop")
else:
    print("✗ Pattern not found, searching for variations...")
    # Try to find what's actually there
    if 'Skylar {grantorFullName}' in content:
        print("  Found 'Skylar {grantorFullName}' in content")
        # Try a simpler replacement
        old_simple = 'Skylar {grantorFullName}'
        new_simple = '{#hipaaAgents}{fullName}{^$last};{/$last}{#$last}{/$last}{/hipaaAgents}'
        content = content.replace(old_simple, new_simple)
        print("  ✓ Replaced with simpler pattern")

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
print("✅ HIPAA section fixed!")
