#!/usr/bin/env python3
"""
Find and show the problematic tags that docxtemplater reported.
"""

import zipfile
import re

with zipfile.ZipFile('public/templates/single_estate_planning_template.docx', 'r') as z:
    content = z.read('word/document.xml').decode('utf-8')

print("FINDING PROBLEMATIC TAGS")
print("=" * 70)

# 1. Find {/hipaaAgents; (with semicolon)
print("\n1. Looking for {/hipaaAgents; pattern...")
pattern = r'\{/hipaaAgents[^}]*\}'
matches = list(re.finditer(pattern, content))
for i, match in enumerate(matches):
    tag = match.group(0)
    start = max(0, match.start() - 100)
    end = min(len(content), match.end() + 100)
    context = content[start:end]
    print(f"\nMatch {i+1}: {tag}")
    print(f"Context: ...{context}...")

# 2. Find isPlural tags
print("\n\n2. Looking for isPlural tags...")
pattern = r'\{[#/]isPlural\}'
matches = list(re.finditer(pattern, content))
for i, match in enumerate(matches):
    tag = match.group(0)
    start = max(0, match.start() - 50)
    end = min(len(content), match.end() + 50)
    context = content[start:end]
    print(f"\nMatch {i+1}: {tag}")
    print(f"Context: ...{context}...")

# 3. Find all hipaaAgents tags to understand the structure
print("\n\n3. Looking for all hipaaAgents tags...")
pattern = r'\{[#/]hipaaAgents\}'
matches = list(re.finditer(pattern, content))
print(f"Total: {len(matches)} tags")
for i, match in enumerate(matches):
    tag = match.group(0)
    print(f"{i+1}. Position {match.start()}: {tag}")
