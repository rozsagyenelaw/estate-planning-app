#!/usr/bin/env python3
"""
Fix POA section with simpler approach - use separate variables for first agent
"""

import zipfile
import os
import shutil

template_path = 'public/templates/single_estate_planning_template.docx'
temp_dir = '/tmp/fix_poa_simple'

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

print("FIXING POA SECTION WITH SIMPLER APPROACH")
print("=" * 70)

# Fix Section 1.01 - Use simple poaAgents[0] approach
old_1_01 = 'I appoint {#poaAgents}{#$first}{fullName}{#age} (age {age}){/age}{/$first}{/poaAgents} to serve as my Attorney in Fact.'
new_1_01 = 'I appoint {firstPoaAgent}{#firstPoaAgentAge} (age {firstPoaAgentAge}){/firstPoaAgentAge} to serve as my Attorney in Fact.'

if old_1_01 in content:
    content = content.replace(old_1_01, new_1_01)
    print("✓ Fixed Section 1.01 - using firstPoaAgent variable")
else:
    print("✗ Section 1.01 pattern not found")

# Fix Section 1.02 - Show first agent's name, then list successors
old_1_02 = '{#hasMultiplePoaAgents}If {#poaAgents}{#$first}{fullName}{#age} (age {age}){/age}{/$first}{/poaAgents} fails to serve, I appoint {#poaAgents}{#$index &gt; 0}{fullName}{^$last}, {/$last}{/$index &gt; 0}{/poaAgents} to serve as successor Attorney in Fact.{/hasMultiplePoaAgents}'
new_1_02 = '{#hasMultiplePoaAgents}If {firstPoaAgent}{#firstPoaAgentAge} (age {firstPoaAgentAge}){/firstPoaAgentAge} fails to serve, I appoint {#successorPoaAgents}{fullName}{^$last}, {/$last}{/successorPoaAgents} to serve as successor Attorney in Fact.{/hasMultiplePoaAgents}'

if old_1_02 in content:
    content = content.replace(old_1_02, new_1_02)
    print("✓ Fixed Section 1.02 - using firstPoaAgent and successorPoaAgents variables")
else:
    print("✗ Section 1.02 pattern not found")

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
print("✅ POA section fixed with simpler approach!")
print("\nNow need to update docxTemplateService.js to add these variables:")
print("  - firstPoaAgent")
print("  - firstPoaAgentAge")
print("  - successorPoaAgents")
