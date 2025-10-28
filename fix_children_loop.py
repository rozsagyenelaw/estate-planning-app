#!/usr/bin/env python3
"""
Fix unclosed children loop in Family Information
"""

import zipfile
import os
import shutil

template_path = 'public/templates/single_estate_planning_template.docx'
temp_dir = '/tmp/fix_children_loop'

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

print("FIXING UNCLOSED CHILDREN LOOP")
print("=" * 70)

# Find where {#children}{fullName} is
search_pattern = '{#children}{fullName}'
if search_pattern in content:
    idx = content.index(search_pattern)
    print("Found opening children tag at position", idx)
    # Get context around it
    section = content[idx:idx+1500]
    print("\nContext after opening tag:")
    print(section[:500])
    
    # We need to find where the table row ends and close the loop there
    # The pattern should be: {#children} ... table row content ... {/children}
    # Let's look for the end of the first table row after {#children}
    
    # Find the closing </w:tr> tag after {#children}{fullName}
    row_end_idx = section.find('</w:tr>')
    if row_end_idx > 0:
        print("\nFound table row end at relative position", row_end_idx)
        # We need to add {/children} after the </w:tr> tag
        full_idx = idx + row_end_idx + len('</w:tr>')
        
        # Insert {/children} after the row ends
        content = content[:full_idx] + '{/children}' + content[full_idx:]
        print("✓ Added {/children} closing tag after table row")
    else:
        print("✗ Could not find table row end")
else:
    print("✗ Pattern not found")

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
print("✅ Children loop closed!")
