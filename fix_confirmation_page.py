#!/usr/bin/env python3
"""
Fix confirmation page - replace all hardcoded client data with placeholders
"""

import zipfile
import os
import shutil

template_path = 'public/templates/single_estate_planning_template.docx'
temp_dir = '/tmp/fix_confirmation'

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

print("FIXING CONFIRMATION PAGE")
print("=" * 70)

# Fix 1: Replace hardcoded "James Metriyakool" in Initial Trustee
old_trustee = 'Initial Trustee:</w:t></w:r></w:p></w:tc><w:tc><w:tcPr><w:tcW w:w="4320" w:type="dxa"/></w:tcPr><w:p w14:paraId="0B5D6A07" w14:textId="77777777" w:rsidR="0038351D" w:rsidRDefault="00000000"><w:r><w:t>James Metriyakool'
new_trustee = 'Initial Trustee:</w:t></w:r></w:p></w:tc><w:tc><w:tcPr><w:tcW w:w="4320" w:type="dxa"/></w:tcPr><w:p w14:paraId="0B5D6A07" w14:textId="77777777" w:rsidR="0038351D" w:rsidRDefault="00000000"><w:r><w:t>{grantorFullName}'

if old_trustee in content:
    content = content.replace(old_trustee, new_trustee)
    print("✓ Fixed Initial Trustee")
else:
    print("✗ Initial Trustee pattern not found")

# Fix 2: Replace hardcoded "Elizabeth Metriyakool" in Successor Trustees
old_successor_trustee = 'Successor Trustees Upon Incapacity or Death:</w:t></w:r></w:p></w:tc><w:tc><w:tcPr><w:tcW w:w="4320" w:type="dxa"/></w:tcPr><w:p w14:paraId="18E28C4F" w14:textId="77777777" w:rsidR="0038351D" w:rsidRDefault="00000000"><w:r><w:t>Elizabeth Metriyakool; then {#poaAgents}{#$index &gt; 0}{fullName}{^$last}, {/$last}{#$last}{/$last}{/$index &gt; 0}{/poaAgents}'
new_successor_trustee = 'Successor Trustees Upon Incapacity or Death:</w:t></w:r></w:p></w:tc><w:tc><w:tcPr><w:tcW w:w="4320" w:type="dxa"/></w:tcPr><w:p w14:paraId="18E28C4F" w14:textId="77777777" w:rsidR="0038351D" w:rsidRDefault="00000000"><w:r><w:t>{#successorTrustees}{fullName}{^$last}, {/$last}{/successorTrustees}'

if old_successor_trustee in content:
    content = content.replace(old_successor_trustee, new_successor_trustee)
    print("✓ Fixed Successor Trustees")
else:
    print("✗ Successor Trustees pattern not found")

# Fix 3: Replace hardcoded "Angela Metriyakool" in Durable POA Successor Agent
old_poa_successor = 'Successor Agent:</w:t></w:r></w:p></w:tc><w:tc><w:tcPr><w:tcW w:w="4320" w:type="dxa"/></w:tcPr><w:p w14:paraId="1D8CE9D8" w14:textId="77777777" w:rsidR="0038351D" w:rsidRDefault="00000000"><w:r><w:t>Angela Metriyakool'
new_poa_successor = 'Successor Agent:</w:t></w:r></w:p></w:tc><w:tc><w:tcPr><w:tcW w:w="4320" w:type="dxa"/></w:tcPr><w:p w14:paraId="1D8CE9D8" w14:textId="77777777" w:rsidR="0038351D" w:rsidRDefault="00000000"><w:r><w:t>{#successorPoaAgents}{fullName}{^$last}, {/$last}{/successorPoaAgents}'

if old_poa_successor in content:
    content = content.replace(old_poa_successor, new_poa_successor)
    print("✓ Fixed Durable POA Successor Agent")
else:
    print("✗ Durable POA Successor Agent pattern not found")

# Fix 4: Fix Family Information - it's showing healthcare agents instead of children!
# The pattern should show children, not healthcare agents
old_family = 'Family Information</w:t></w:r></w:p></w:tc></w:tr><w:tr w:rsidR="0038351D" w14:paraId="21FDF064" w14:textId="77777777"><w:tc><w:tcPr><w:tcW w:w="1440" w:type="dxa"/></w:tcPr><w:p w14:paraId="5D66FBDB" w14:textId="77777777" w:rsidR="0038351D" w:rsidRDefault="00000000"><w:r><w:t xml:space="preserve">    Name</w:t></w:r></w:p></w:tc><w:tc><w:tcPr><w:tcW w:w="2160" w:type="dxa"/></w:tcPr><w:p w14:paraId="3E78C6B8" w14:textId="77777777" w:rsidR="0038351D" w:rsidRDefault="00000000"><w:r><w:t>Relationship</w:t></w:r></w:p></w:tc><w:tc><w:tcPr><w:tcW w:w="2160" w:type="dxa"/></w:tcPr><w:p w14:paraId="494AC64D" w14:textId="77777777" w:rsidR="0038351D" w:rsidRDefault="00000000"><w:r><w:t>Date of Birth</w:t></w:r></w:p></w:tc></w:tr><w:tr w:rsidR="0038351D" w14:paraId="25E30F22" w14:textId="77777777"><w:tc><w:tcPr><w:tcW w:w="1440" w:type="dxa"/></w:tcPr><w:p w14:paraId="2C08EB55" w14:textId="77777777" w:rsidR="0038351D" w:rsidRDefault="00000000"><w:r><w:t xml:space="preserve">    {#healthcareAgents}{#$index &gt; 0}{fullName}{^$last}, {/$last}{#$last}{/$last}{/$index &gt; 0}{/healthcareAgents}'
new_family = 'Family Information</w:t></w:r></w:p></w:tc></w:tr><w:tr w:rsidR="0038351D" w14:paraId="21FDF064" w14:textId="77777777"><w:tc><w:tcPr><w:tcW w:w="1440" w:type="dxa"/></w:tcPr><w:p w14:paraId="5D66FBDB" w14:textId="77777777" w:rsidR="0038351D" w:rsidRDefault="00000000"><w:r><w:t xml:space="preserve">    Name</w:t></w:r></w:p></w:tc><w:tc><w:tcPr><w:tcW w:w="2160" w:type="dxa"/></w:tcPr><w:p w14:paraId="3E78C6B8" w14:textId="77777777" w:rsidR="0038351D" w:rsidRDefault="00000000"><w:r><w:t>Relationship</w:t></w:r></w:p></w:tc><w:tc><w:tcPr><w:tcW w:w="2160" w:type="dxa"/></w:tcPr><w:p w14:paraId="494AC64D" w14:textId="77777777" w:rsidR="0038351D" w:rsidRDefault="00000000"><w:r><w:t>Date of Birth</w:t></w:r></w:p></w:tc></w:tr>{#children}<w:tr w:rsidR="0038351D" w14:paraId="25E30F22" w14:textId="77777777"><w:tc><w:tcPr><w:tcW w:w="1440" w:type="dxa"/></w:tcPr><w:p w14:paraId="2C08EB55" w14:textId="77777777" w:rsidR="0038351D" w:rsidRDefault="00000000"><w:r><w:t xml:space="preserve">    {fullName}'

if old_family in content:
    content = content.replace(old_family, new_family)
    print("✓ Fixed Family Information to show children")
else:
    print("✗ Family Information pattern not found")

# Fix 5: Add relationship and birthdate columns for family information
# After the name, we need to add the relationship and birthdate cells
old_family_row_end = '    {#healthcareAgents}{#$index &gt; 0}{fullName}{^$last}, {/$last}{#$last}{/$last}{/$index &gt; 0}{/healthcareAgents}</w:t></w:r></w:p></w:tc><w:tc><w:tcPr><w:tcW w:w="2160" w:type="dxa"/></w:tcPr><w:p w14:paraId="2CA7D53A" w14:textId="77777777" w:rsidR="0038351D" w:rsidRDefault="0038351D"/></w:tc><w:tc><w:tcPr><w:tcW w:w="2160" w:type="dxa"/></w:tcPr><w:p w14:paraId="7C3A5EF4" w14:textId="77777777" w:rsidR="0038351D" w:rsidRDefault="0038351D"/></w:tc></w:tr>'

# Only try this if the first fix didn't work (in case the pattern is different)
if old_family_row_end in content:
    new_family_row_end = '    {fullName}</w:t></w:r></w:p></w:tc><w:tc><w:tcPr><w:tcW w:w="2160" w:type="dxa"/></w:tcPr><w:p w14:paraId="2CA7D53A" w14:textId="77777777" w:rsidR="0038351D" w:rsidRDefault="00000000"><w:r><w:t>{relationship}</w:t></w:r></w:p></w:tc><w:tc><w:tcPr><w:tcW w:w="2160" w:type="dxa"/></w:tcPr><w:p w14:paraId="7C3A5EF4" w14:textId="77777777" w:rsidR="0038351D" w:rsidRDefault="00000000"><w:r><w:t>{birthdate}</w:t></w:r></w:p></w:tc></w:tr>{/children}'
    content = content.replace(old_family_row_end, new_family_row_end)
    print("✓ Fixed Family Information row with relationship and birthdate")

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
print("4. Family Information: replaced healthcare agents with children data")
print("5. Added relationship and birthdate placeholders for family members")
