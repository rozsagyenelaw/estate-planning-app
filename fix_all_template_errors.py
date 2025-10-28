#!/usr/bin/env python3
"""
Comprehensive fix for all template syntax errors:
1. Replace .length > N expressions with hasMultiple* flags
2. Fix the broken {#-last}/{^-last} tag structure
3. Add explicit closing tags for hasMultiple* conditionals
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
print("COMPREHENSIVE TEMPLATE FIX")
print("=" * 70)

# STEP 1: Fix the broken {#-last}{/$index > 0}{^-last}, {/} structure
# This should be: {#$last}{/$index > 0}{^$last}, {/$last}{/}
print("\nSTEP 1: Fix broken -last tag structure")
print("-" * 70)

# The pattern is: {fullName}{#-last}{/$index > 0}{^-last}, {/}
# Fix to: {fullName}{/$index > 0}{^$last}, {/$last}
# Actually, the simplest fix: remove {#-last} entirely and change {^-last} to be self-contained

# Replace the broken structure
broken_pattern = r'\{#-last\}\{/\$index &gt; 0\}\{\^-last\}, \{/\}'
fixed_replacement = r'{/$index &gt; 0}{^$last}, {/$last}'
matches = re.findall(broken_pattern, content)
if matches:
    content = re.sub(broken_pattern, fixed_replacement, content)
    print(f"✓ Fixed {len(matches)} instances of broken -last structure")
else:
    print("  (no matches found)")

# STEP 2: Replace .length > N with hasMultiple* flags
print("\nSTEP 2: Replace .length > N with hasMultiple* flags")
print("-" * 70)

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
        print(f"✓ Replaced {len(matches)} instances: {replacement}")

# STEP 3: Add explicit closing tags for hasMultiple* conditionals
print("\nSTEP 3: Add explicit closing tags")
print("-" * 70)

closing_replacements = [
    # hasMultipleSuccessors
    (r'(Personal Representative\{#hasMultipleSuccessors\}s)\{/\}\.', r'\1{/hasMultipleSuccessors}.'),
    # hasMultipleGuardians
    (r'(to serve as successor guardian)\.\{/\}', r'\1.{/hasMultipleGuardians}'),
    # hasMultiplePoaAgents
    (r'(to serve as successor Attorney in Fact)\.\{/\}', r'\1.{/hasMultiplePoaAgents}'),
    # hasMultipleHealthcareAgents
    (r'(set forth in this instrument)\.\{/\}', r'\1.{/hasMultipleHealthcareAgents}'),
]

for pattern, replacement in closing_replacements:
    matches = list(re.finditer(pattern, content))
    if matches:
        for match in reversed(matches):
            before = content[match.start():match.end()]
            content = content[:match.start()] + re.sub(pattern, replacement, before) + content[match.end():]
        print(f"✓ Added {len(matches)} closing tags")
    else:
        print(f"  (no matches for pattern)")

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
print("✅ ALL FIXES APPLIED!")
print("=" * 70)
