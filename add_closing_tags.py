#!/usr/bin/env python3
"""
Add explicit closing tags for hasMultiple* conditionals.
Replace the {/} that closes each hasMultiple* opening tag with the explicit {/hasMultiple*} tag.
"""

import zipfile
import os
import shutil
import re

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

print("=" * 70)
print("ADDING EXPLICIT CLOSING TAGS FOR hasMultiple* CONDITIONALS")
print("=" * 70)

# Strategy: Find each {#hasMultipleX} and find the {/} that closes it
# Then replace that {/} with {/hasMultipleX}

# We need to do this carefully - find the matching {/} for each opening tag
# by tracking nesting depth

def find_matching_close(content, start_pos, open_tag_name):
    """Find the position of the {/} that closes the tag opened at start_pos"""
    depth = 1
    pos = start_pos

    while pos < len(content) and depth > 0:
        # Look for any tag
        tag_match = re.search(r'\{[#/^][^}]*\}', content[pos:])
        if not tag_match:
            break

        tag = tag_match.group()
        pos = pos + tag_match.start()

        # Check if it's an opening or closing tag
        if tag.startswith('{#') or tag.startswith('{^'):
            depth += 1
        elif tag == '{/}':
            depth -= 1
            if depth == 0:
                # This is the matching close!
                return pos
        elif tag.startswith('{/'):
            # Explicit closing tag
            depth -= 1

        pos += len(tag)

    return None

# Find all hasMultiple opening tags and add explicit closing tags
changes = []
for tag_name in ['hasMultipleSuccessors', 'hasMultipleGuardians', 'hasMultiplePoaAgents', 'hasMultipleHealthcareAgents']:
    pattern = f'{{#{tag_name}}}'

    for match in re.finditer(re.escape(pattern), content):
        open_pos = match.start()
        close_pos = find_matching_close(content, match.end(), tag_name)

        if close_pos is not None:
            # Check if it's actually a {/}
            if content[close_pos:close_pos+3] == '{/}':
                changes.append((close_pos, tag_name))
                print(f"Found {pattern} at {open_pos}, will replace {{/}} at {close_pos} with {{/{tag_name}}}")
            else:
                print(f"Warning: Expected {{/}} at {close_pos} for {tag_name}, found: {content[close_pos:close_pos+20]}")
        else:
            print(f"Warning: Could not find closing tag for {tag_name} at {open_pos}")

# Apply changes in reverse order to preserve positions
print(f"\nApplying {len(changes)} changes...")
changes.sort(reverse=True)
for pos, tag_name in changes:
    # Replace {/} with {/tagName}
    content = content[:pos] + '{/' + tag_name + '}' + content[pos+3:]
    print(f"✓ Replaced {{/}} at {pos} with {{/{tag_name}}}")

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
print(f"   Added {len(changes)} explicit closing tags")
