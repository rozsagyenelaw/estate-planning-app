#!/usr/bin/env python3
"""
Fix the final remaining issues:
1. Change {^-last} to {^$last}
2. Fix isPlural structure
"""

import zipfile
import os
import shutil
import re

# Paths
template_path = 'public/templates/single_estate_planning_template.docx'
temp_dir = '/tmp/docx_final_fix'

print("FIXING FINAL ISSUES")
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

# 1. Change {^-last} to {^$last}
print("\n1. Changing {^-last} to {^$last}...")
count = content.count('{^-last}')
content = content.replace('{^-last}', '{^$last}')
print(f"   ✓ Changed {count} instances")

# 2. Fix isPlural structure
# From: {#isPlural}children{/}{^isPlural}child{/}{/isPlural}
# To: {#isPlural}children{/isPlural}{^isPlural}child{/isPlural}
print("\n2. Fixing isPlural structure...")
old_pattern = r'\{#isPlural\}children\{/\}\{\^isPlural\}child\{/\}\{/isPlural\}'
new_pattern = r'{#isPlural}children{/isPlural}{^isPlural}child{/isPlural}'
if re.search(old_pattern, content):
    content = re.sub(old_pattern, new_pattern, content)
    print("   ✓ Fixed isPlural structure")
else:
    print("   ! Pattern not found, trying alternative...")
    # Try a more flexible pattern
    old_pattern2 = r'(\{#isPlural\}[^{]+)\{/\}(\{\^isPlural\}[^{]+)\{/\}(\{/isPlural\})'
    def replace_isplural(match):
        return match.group(1) + '{/isPlural}' + match.group(2) + '{/isPlural}'

    content = re.sub(old_pattern2, replace_isplural, content)
    print("   ✓ Fixed isPlural structure (alternative)")

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
print("✅ Done!")
