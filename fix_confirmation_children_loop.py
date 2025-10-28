#!/usr/bin/env python3
"""
Fix unclosed children loop in confirmation table
"""

import zipfile
import os
import shutil

template_path = 'public/templates/single_estate_planning_template.docx'
temp_dir = '/tmp/fix_conf_children'

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

print("FIXING UNCLOSED CHILDREN LOOP IN CONFIRMATION TABLE")
print("=" * 70)

# Find the second occurrence of {#children} (the unclosed one)
first_idx = content.index('{#children}')
second_idx = content.index('{#children}', first_idx + 1)

print("Found unclosed children tag at position", second_idx)

# Get a larger section to find where the table row ends
section = content[second_idx:second_idx+2000]
print("\nContext:")
print(section[:800])

# Find where this table row ends (look for </w:tr>)
# But we need to find the end of the row that contains the children data
# Look for the pattern with {birthdate} which is the last field in the row
if '{birthdate}' in section:
    birthdate_idx = section.index('{birthdate}')
    print("\nFound {birthdate} at relative position", birthdate_idx)
    # Now find the </w:tr> after {birthdate}
    remaining = section[birthdate_idx:]
    row_end_idx = remaining.find('</w:tr>')
    if row_end_idx > 0:
        print("Found table row end at relative position", birthdate_idx + row_end_idx)
        # Calculate absolute position
        full_idx = second_idx + birthdate_idx + row_end_idx + len('</w:tr>')
        # Insert {/children} after the row
        content = content[:full_idx] + '{/children}' + content[full_idx:]
        print("✓ Added {/children} closing tag")
    else:
        print("✗ Could not find </w:tr> after {birthdate}")
else:
    print("✗ Could not find {birthdate}")

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
print("✅ Children loop in confirmation table closed!")
