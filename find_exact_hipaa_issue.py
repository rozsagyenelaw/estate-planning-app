#!/usr/bin/env python3
"""
Find the exact location of the hipaaAgents issue at offset 107362
"""

import zipfile

with zipfile.ZipFile('public/templates/single_estate_planning_template.docx', 'r') as z:
    content = z.read('word/document.xml').decode('utf-8')

# Check at the error offset
offset = 107362
start = max(0, offset - 200)
end = min(len(content), offset + 200)

print("CONTENT AROUND OFFSET 107362:")
print("=" * 70)
print(content[start:end])
print()
print("=" * 70)

# Find all instances where we have {/ followed by hipaa
import re
pattern = r'\{/hip[^}]*\}'
matches = list(re.finditer(pattern, content))

print(f"\nFOUND {len(matches)} TAGS STARTING WITH {{/hip:")
print("=" * 70)
for i, match in enumerate(matches):
    tag = match.group(0)
    pos = match.start()
    context_start = max(0, pos - 50)
    context_end = min(len(content), pos + len(tag) + 50)
    context = content[context_start:context_end]

    print(f"\n{i+1}. Position {pos}: {tag}")
    print(f"   Context: ...{context}...")
