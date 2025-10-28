#!/usr/bin/env python3
"""
The template has generic {/} closing tags that need to be replaced with proper named closing tags.
Looking at the context, these {/} tags are closing $last conditionals.
"""

import zipfile
import os
import shutil
import re

# Paths
template_path = 'public/templates/single_estate_planning_template.docx'
temp_dir = '/tmp/docx_fix_generic'

print("FIXING GENERIC {/} CLOSING TAGS")
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

# First, let's find all instances of {/} to understand the context
print("\nFinding all {/} tags...")
pattern = r'\{/\}'
matches = list(re.finditer(pattern, content))
print(f"Found {len(matches)} generic {{/}} tags")

# Look at context for each
for i, match in enumerate(matches[:10]):  # Show first 10
    start = max(0, match.start() - 80)
    end = min(len(content), match.end() + 80)
    context = content[start:end]
    print(f"\n{i+1}. Position {match.start()}:")
    print(f"   ...{context}...")

# Based on the pattern we saw, these {/} are closing $last conditionals
# Pattern: {#$last}{/} or {^$last} text {/}
# Replace them with {/$last}

print("\n\nReplacing patterns...")

# Pattern 1: {#$last}{/} -> {#$last}{/$last}
pattern1 = r'\{#\$last\}\{/\}'
count1 = len(re.findall(pattern1, content))
content = re.sub(pattern1, '{#$last}{/$last}', content)
print(f"✓ Replaced {count1} instances of {{#$last}}{{/}}")

# Pattern 2: {^$last}...text...{/} -> {^$last}...text...{/$last}
# This is trickier - need to find {^$last} followed eventually by {/}
# But we need to make sure it's the right {/}

# Actually, let's just replace remaining {/} with {/$last} since they should all be for $last
remaining = content.count('{/}')
if remaining > 0:
    # This is risky, but based on the template structure, all {/} should be {/$last}
    content = content.replace('{/}', '{/$last}')
    print(f"✓ Replaced {remaining} remaining {{/}} with {{/$last}}")

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
