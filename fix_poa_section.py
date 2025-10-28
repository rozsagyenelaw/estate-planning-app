#!/usr/bin/env python3
"""
Fix the POA section placeholders
"""

import zipfile
import os
import shutil
import re

template_path = 'public/templates/single_estate_planning_template.docx'
temp_dir = '/tmp/fix_poa'

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

print("FIXING POA SECTION")
print("=" * 70)

# Fix 1: Section 1.01 - Make age conditional
old_1_01 = '{#poaAgents}{#$first}{fullName} (age {age}){/$first}{/poaAgents}'
new_1_01 = '{#poaAgents}{#$first}{fullName}{#age} (age {age}){/age}{/$first}{/poaAgents}'

if old_1_01 in content:
    content = content.replace(old_1_01, new_1_01)
    print("✓ Fixed Section 1.01 - made age conditional")
else:
    print("✗ Section 1.01 pattern not found")

# Fix 2: Section 1.02 - Fix the nested loop issue
# The problem: Two separate {#poaAgents} loops
# Old structure: {#hasMultiplePoaAgents}If {#poaAgents}{#$first}...{/$first}{/poaAgents} fails to serve, I appoint {#poaAgents}{#$index > 0}...{/$index > 0}{^$last}, {/$last}{/poaAgents} to serve as successor...
# New structure: Single loop with proper conditionals

old_1_02 = '{#hasMultiplePoaAgents}If {#poaAgents}{#$first}{fullName} (age {age}){/$first}{/poaAgents} fails to serve, I appoint {#poaAgents}{#$index &gt; 0}{fullName}{/$index &gt; 0}{^$last}, {/$last}{/poaAgents} to serve as successor Attorney in Fact.{/hasMultiplePoaAgents}'

new_1_02 = '{#hasMultiplePoaAgents}If {#poaAgents}{#$first}{fullName}{#age} (age {age}){/age}{/$first}{/poaAgents} fails to serve, I appoint {#poaAgents}{#$index &gt; 0}{fullName}{^$last}, {/$last}{/$index &gt; 0}{/poaAgents} to serve as successor Attorney in Fact.{/hasMultiplePoaAgents}'

if old_1_02 in content:
    content = content.replace(old_1_02, new_1_02)
    print("✓ Fixed Section 1.02 - fixed nested loop and made age conditional")
else:
    print("✗ Section 1.02 pattern not found")
    # Try to find what's actually there
    match = re.search(r'\{#hasMultiplePoaAgents\}.{200}', content)
    if match:
        print(f"Found: {match.group(0)}")

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
print("✅ POA section fixed!")
