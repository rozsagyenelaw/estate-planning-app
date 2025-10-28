#!/usr/bin/env python3
"""
Simple approach: For each {#hasMultipleXXX} opening tag, find the {/} that closes it
and replace with {/hasMultipleXXX}.

Strategy: Look for the pattern where we have nested content ending with a {/} that should close the outer tag.
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
print("STEP 1: REPLACE .length > N WITH hasMultiple* FLAGS")
print("=" * 70)

# First, replace the .length > N opening tags with hasMultiple* flags
length_replacements = [
    (r'\{#successors\.length &gt; \d+\}', '{#hasMultipleSuccessors}'),
    (r'\{#guardians\.length &gt; \d+\}', '{#hasMultipleGuardians}'),
    (r'\{#poaAgents\.length &gt; \d+\}', '{#hasMultiplePoaAgents}'),
    (r'\{#healthcareAgents\.length &gt; \d+\}', '{#hasMultipleHealthcareAgents}'),
]

for pattern, replacement in length_replacements:
    matches = re.findall(pattern, content)
    if matches:
        content = re.sub(pattern, replacement, content)
        print(f"✓ Replaced {len(matches)} instances: {pattern} → {replacement}")

print()
print("=" * 70)
print("STEP 2: ADD EXPLICIT CLOSING TAGS")
print("=" * 70)

# Now add explicit closing tags
replacements = [
    # hasMultipleSuccessors: ends with "Representative{#hasMultipleSuccessors}s{/hasMultipleSuccessors}.{/}"
    # The first occurrence needs the {/} at position ~40241 to be replaced
    (r'(Personal Representative\{#hasMultipleSuccessors\}s\{/hasMultipleSuccessors\}\.\{)/\}', r'\1/hasMultipleSuccessors}'),

    # hasMultipleGuardians: ends with "successor guardian.{/}"
    (r'(to serve as successor guardian\.\{)/\}', r'\1/hasMultipleGuardians}'),

    # hasMultiplePoaAgents: ends with "successor Attorney in Fact.{/}"
    (r'(to serve as successor Attorney in Fact\.\{)/\}', r'\1/hasMultiplePoaAgents}'),

    # hasMultipleHealthcareAgents: ends with "set forth in this instrument.{/}"
    (r'(set forth in this instrument\.\{)/\}', r'\1/hasMultipleHealthcareAgents}'),
]

for pattern, replacement in replacements:
    matches = list(re.finditer(pattern, content))
    if matches:
        # Replace in reverse order to preserve positions
        for match in reversed(matches):
            before = content[match.start():match.end()]
            content = content[:match.start()] + re.sub(pattern, replacement, before) + content[match.end():]
            print(f"✓ Replaced {len(matches)} instances of pattern")
            print(f"  Before: ...{before[-50:]}")
            print(f"  After: ...{content[match.start()+len(before)-50:match.start()+len(before)]}")
    else:
        print(f"  (no matches for pattern ending)")

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

print("\n✅ Template fixed!")
