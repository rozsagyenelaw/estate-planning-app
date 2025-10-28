#!/usr/bin/env python3
"""
Fast tag merger - removes XML markup from inside template tags.
"""

import zipfile
import os
import shutil
import re

# Paths
template_path = 'public/templates/single_estate_planning_template.docx'
temp_dir = '/tmp/docx_fast_fix'

print("FAST TAG MERGE")
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

print("Original content length:", len(content))

# Merge split tags - simple approach: find anything between { and } and remove XML tags
def merge_split_tag(match):
    """Remove XML from inside template tags"""
    full_match = match.group(0)
    inner = match.group(1)

    # If no XML tags, return as-is
    if '<' not in inner:
        return full_match

    # Remove all XML tags
    cleaned = re.sub(r'<[^>]+>', '', inner)
    return '{' + cleaned + '}'

# Pattern to match {anything including XML}
# Use non-greedy matching to avoid matching across multiple tags
count = 0
def count_replacements(match):
    global count
    result = merge_split_tag(match)
    if result != match.group(0):
        count += 1
    return result

content = re.sub(r'\{([^{}]+)\}', count_replacements, content)

print(f"✓ Merged {count} split tags")
print("New content length:", len(content))

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

print("✅ Done!")
