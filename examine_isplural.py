#!/usr/bin/env python3
"""
Examine the exact isPlural structure
"""

import zipfile
import re

with zipfile.ZipFile('public/templates/single_estate_planning_template.docx', 'r') as z:
    content = z.read('word/document.xml').decode('utf-8')

# Find all isPlural related tags
pattern = r'\{[#/^]isPlural\}'
matches = list(re.finditer(pattern, content))

print("ALL isPlural TAGS:")
print("=" * 70)
for i, match in enumerate(matches):
    tag = match.group(0)
    start = max(0, match.start() - 100)
    end = min(len(content), match.end() + 100)
    context = content[start:end]
    print(f"\n{i+1}. Position {match.start()}: {tag}")
    print(f"   Context: ...{context}...")

# Also find the full sentence containing isPlural
pattern2 = r'.{200}\{[#^]isPlural\}.{200}'
matches2 = list(re.finditer(pattern2, content))
print("\n\nFULL SENTENCE:")
print("=" * 70)
for match in matches2:
    print(match.group(0))
