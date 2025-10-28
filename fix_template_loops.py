#!/usr/bin/env python3
"""
Fix unclosed loops in the DOCX template by adding missing closing tags.
"""

import zipfile
import os
import shutil
import re
from collections import Counter

# Paths
template_path = 'public/templates/single_estate_planning_template.docx'
temp_dir = '/tmp/docx_fix'

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

print("=" * 60)
print("FIXING TEMPLATE LOOPS")
print("=" * 60)

# Strategy: Add closing tags immediately after the loop content
# For each unclosed loop, find where it starts and add a closing tag
# at a reasonable location (end of paragraph, before next loop, etc.)

fixes = []

# Fix hasMultipleSuccessors (appears 2 times)
for match in re.finditer(r'\{#hasMultipleSuccessors\}', content):
    start_pos = match.end()
    # Find the end of this conditional section
    # Look for the next loop start or a reasonable paragraph boundary
    # For now, let's look for the next </w:p> (paragraph end)
    next_para_end = content.find('</w:p>', start_pos)
    if next_para_end != -1:
        # Check if there's a closing tag already
        check_region = content[start_pos:next_para_end + 100]
        if '{/hasMultipleSuccessors}' not in check_region:
            fixes.append((next_para_end + 6, '{/hasMultipleSuccessors}'))
            print(f"✓ Will add {{/hasMultipleSuccessors}} at position {next_para_end + 6}")

# Similar for other loops
loops_to_fix = [
    'hasMultipleGuardians',
    'hasMultiplePoaAgents',
    'hasMultipleHealthcareAgents',
    'hasMinorChildren',
]

for loop_name in loops_to_fix:
    pattern = f'{{#{loop_name}}}'
    closing_pattern = f'{{/{loop_name}}}'

    # Count starts and ends
    starts = [m.end() for m in re.finditer(re.escape(pattern), content)]
    ends = len(re.findall(re.escape(closing_pattern), content))

    missing = len(starts) - ends
    if missing > 0:
        print(f"\n{loop_name}: {len(starts)} starts, {ends} ends → missing {missing}")

        # For each start that needs a closing
        for i, start_pos in enumerate(starts[-missing:]):  # Last N unclosed ones
            # Find a good place to add the closing tag
            # Look for the next paragraph end
            next_para_end = content.find('</w:p>', start_pos)
            if next_para_end != -1:
                # Check if already closed nearby
                check_region = content[start_pos:next_para_end + 200]
                if closing_pattern not in check_region:
                    fixes.append((next_para_end + 6, closing_pattern))
                    print(f"  ✓ Will add {closing_pattern} at position {next_para_end + 6}")

# Apply fixes (sort in reverse order to maintain positions)
fixes.sort(reverse=True)
for pos, tag in fixes:
    content = content[:pos] + tag + content[pos:]
    print(f"✓ Inserted {tag} at position {pos}")

print(f"\n✅ Applied {len(fixes)} fixes")

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
