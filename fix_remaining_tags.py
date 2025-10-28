#!/usr/bin/env python3
"""
Fix remaining unclosed tags based on the balance check:
- -last: Missing 7 closing tags
- hasMultipleHealthcareAgents: 1 extra closing tag (remove it)
- hasMultipleSuccessors: Missing 1 closing tag
- hipaaAgents: Missing 1 closing tag
- isPlural: Missing 1 closing tag
"""

import zipfile
import os
import shutil
import re

# Paths
template_path = 'public/templates/single_estate_planning_template.docx'
temp_dir = '/tmp/docx_remaining_fix'

print("FIXING REMAINING UNCLOSED TAGS")
print("=" * 70)

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

# 1. Remove extra hasMultipleHealthcareAgents closing tag
print("\n1. Removing extra hasMultipleHealthcareAgents closing tag...")
pattern = r'\{/hasMultipleHealthcareAgents\}'
matches = list(re.finditer(pattern, content))
print(f"   Found {len(matches)} closing tags (should be 1)")
if len(matches) > 1:
    # Remove the last occurrence (most likely the extra one)
    last_match = matches[-1]
    content = content[:last_match.start()] + content[last_match.end():]
    print("   ✓ Removed extra closing tag")

# 2. Add missing closing tag for hasMultipleSuccessors
print("\n2. Adding missing hasMultipleSuccessors closing tag...")
# Find all opening tags
pattern = r'\{#hasMultipleSuccessors\}'
opening_matches = list(re.finditer(pattern, content))
print(f"   Found {len(opening_matches)} opening tags")

# Find the second opening (which is missing a closing)
if len(opening_matches) >= 2:
    # Find where it should close - look for paragraph end after the second opening
    second_opening_pos = opening_matches[1].end()
    # Find next paragraph end
    next_para_end = content.find('</w:p>', second_opening_pos)
    if next_para_end != -1:
        # Insert before the paragraph end
        content = content[:next_para_end] + '{/hasMultipleSuccessors}' + content[next_para_end:]
        print("   ✓ Added closing tag")

# 3. Add missing closing tag for hipaaAgents
print("\n3. Adding missing hipaaAgents closing tag...")
pattern = r'\{#hipaaAgents\}'
opening_matches = list(re.finditer(pattern, content))
print(f"   Found {len(opening_matches)} opening tags")

if len(opening_matches) >= 2:
    # The second one is missing a closing tag
    second_opening_pos = opening_matches[1].end()
    next_para_end = content.find('</w:p>', second_opening_pos)
    if next_para_end != -1:
        content = content[:next_para_end] + '{/hipaaAgents}' + content[next_para_end:]
        print("   ✓ Added closing tag")

# 4. Add missing closing tag for isPlural
print("\n4. Adding missing isPlural closing tag...")
pattern = r'\{#isPlural\}'
opening_match = re.search(pattern, content)
if opening_match:
    opening_pos = opening_match.end()
    # This is likely used for pluralizing words, so close it at the end of the word
    # Look for the next space or punctuation
    next_space = re.search(r'[\s.,;:]', content[opening_pos:])
    if next_space:
        insert_pos = opening_pos + next_space.start()
        content = content[:insert_pos] + '{/isPlural}' + content[insert_pos:]
        print("   ✓ Added closing tag")

# 5. Fix -last tags (these are invalid - should be $last)
print("\n5. Fixing -last tags (changing to $last)...")
# Change {#-last} to {#$last} and {/-last} to {/$last}
content = re.sub(r'\{#-last\}', '{#$last}', content)
content = re.sub(r'\{/-last\}', '{/$last}', content)
print("   ✓ Changed -last to $last")

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
print("✅ Done! Run check_template_balance.py to verify.")
