#!/usr/bin/env python3
"""
Fix all .length > N expressions in the template by replacing them with boolean flags.
This script handles BOTH opening {# } and closing {/ } tags.
"""

import zipfile
import os
import shutil
import re

# Paths
template_path = 'public/templates/single_estate_planning_template.docx'
backup_path = 'public/templates/single_estate_planning_template_backup.docx'
temp_dir = '/tmp/docx_fix'

# Restore from backup first
print("Restoring from backup...")
shutil.copy(backup_path, template_path)

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

print("=" * 70)
print("FIXING .length > N EXPRESSIONS")
print("=" * 70)

# Define all replacements - BOTH opening and closing tags
replacements = [
    # Opening tags
    (r'\{#successors\.length &gt; \d+\}', '{#hasMultipleSuccessors}'),
    (r'\{#guardians\.length &gt; \d+\}', '{#hasMultipleGuardians}'),
    (r'\{#poaAgents\.length &gt; \d+\}', '{#hasMultiplePoaAgents}'),
    (r'\{#healthcareAgents\.length &gt; \d+\}', '{#hasMultipleHealthcareAgents}'),
    # Closing tags (THIS WAS MISSING BEFORE!)
    (r'\{/successors\.length &gt; \d+\}', '{/hasMultipleSuccessors}'),
    (r'\{/guardians\.length &gt; \d+\}', '{/hasMultipleGuardians}'),
    (r'\{/poaAgents\.length &gt; \d+\}', '{/hasMultiplePoaAgents}'),
    (r'\{/healthcareAgents\.length &gt; \d+\}', '{/hasMultipleHealthcareAgents}'),
]

# Apply replacements
for pattern, replacement in replacements:
    matches = re.findall(pattern, content)
    if matches:
        content = re.sub(pattern, replacement, content)
        print(f"✓ Replaced {len(matches)} instances: {pattern} → {replacement}")
    else:
        print(f"  (no matches for {pattern})")

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

print("\n✅ Template fixed and saved!")
print(f"   Location: {template_path}")
print("\nNow testing with docxtemplater...")
