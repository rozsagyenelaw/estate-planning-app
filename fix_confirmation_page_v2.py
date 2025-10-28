#!/usr/bin/env python3
"""
Fix confirmation page - v2 with correct patterns
"""

import zipfile
import os
import shutil

template_path = 'public/templates/single_estate_planning_template.docx'
temp_dir = '/tmp/fix_confirmation_v2'

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

print("FIXING CONFIRMATION PAGE - V2")
print("=" * 70)

# Fix 1: Replace hardcoded "James Metriyakool" in Initial Trustee
old_trustee = 'Initial Trustee:</w:t></w:r></w:p></w:tc><w:tc><w:tcPr><w:tcW w:w="4320" w:type="dxa"/></w:tcPr><w:p w14:paraId="034B9637" w14:textId="77777777" w:rsidR="0038351D" w:rsidRDefault="00000000"><w:r><w:t>James Metriyakool'
new_trustee = 'Initial Trustee:</w:t></w:r></w:p></w:tc><w:tc><w:tcPr><w:tcW w:w="4320" w:type="dxa"/></w:tcPr><w:p w14:paraId="034B9637" w14:textId="77777777" w:rsidR="0038351D" w:rsidRDefault="00000000"><w:r><w:t>{grantorFullName}'

if old_trustee in content:
    content = content.replace(old_trustee, new_trustee)
    print("✓ Fixed Initial Trustee")
else:
    print("✗ Initial Trustee pattern not found")

# Fix 2: Replace hardcoded "Elizabeth Metriyakool; then" with successor trustees
old_successor_trustee = 'Successor Trustees Upon Incapacity or Death:</w:t></w:r></w:p></w:tc><w:tc><w:tcPr><w:tcW w:w="4320" w:type="dxa"/></w:tcPr><w:p w14:paraId="63B97AE9" w14:textId="77777777" w:rsidR="0038351D" w:rsidRDefault="00000000"><w:r><w:t>Elizabeth Metriyakool; then</w:t></w:r><w:r><w:br/><w:t>{#poaAgents}{#$index &gt; 0}{fullName}{^$last}, {/$last}{#$last}{/$last}{/$index &gt; 0}{/poaAgents}'
new_successor_trustee = 'Successor Trustees Upon Incapacity or Death:</w:t></w:r></w:p></w:tc><w:tc><w:tcPr><w:tcW w:w="4320" w:type="dxa"/></w:tcPr><w:p w14:paraId="63B97AE9" w14:textId="77777777" w:rsidR="0038351D" w:rsidRDefault="00000000"><w:r><w:t>{#successorTrustees}{fullName}{^$last}, {/$last}{/successorTrustees}'

if old_successor_trustee in content:
    content = content.replace(old_successor_trustee, new_successor_trustee)
    print("✓ Fixed Successor Trustees")
else:
    print("✗ Successor Trustees pattern not found")

# Fix 3: Replace hardcoded "Angela Metriyakool" in Durable POA Successor Agent
old_poa_successor = 'Successor Agent:</w:t></w:r></w:p></w:tc><w:tc><w:tcPr><w:tcW w:w="4320" w:type="dxa"/></w:tcPr><w:p w14:paraId="32E6CC81" w14:textId="77777777" w:rsidR="0038351D" w:rsidRDefault="00000000"><w:r><w:t>Angela Metriyakool'
new_poa_successor = 'Successor Agent:</w:t></w:r></w:p></w:tc><w:tc><w:tcPr><w:tcW w:w="4320" w:type="dxa"/></w:tcPr><w:p w14:paraId="32E6CC81" w14:textId="77777777" w:rsidR="0038351D" w:rsidRDefault="00000000"><w:r><w:t>{#successorPoaAgents}{fullName}{^$last}, {/$last}{/successorPoaAgents}'

if old_poa_successor in content:
    content = content.replace(old_poa_successor, new_poa_successor)
    print("✓ Fixed Durable POA Successor Agent")
else:
    print("✗ Durable POA Successor Agent pattern not found")

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
print("✅ Confirmation page fixed!")
print("\nChanges made:")
print("1. Initial Trustee: replaced 'James Metriyakool' with {grantorFullName}")
print("2. Successor Trustees: replaced 'Elizabeth Metriyakool; then...' with {successorTrustees} loop")
print("3. Durable POA Successor: replaced 'Angela Metriyakool' with {successorPoaAgents} loop")
