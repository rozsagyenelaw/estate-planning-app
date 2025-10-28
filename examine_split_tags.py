#!/usr/bin/env python3
"""
Examine the exact structure of split tags to understand the pattern.
"""

import zipfile
import re

with zipfile.ZipFile('public/templates/single_estate_planning_template.docx', 'r') as z:
    content = z.read('word/document.xml').decode('utf-8')

# Find the first few instances of split healthcareAgents tags
pattern = r'\{#[^}]*healthcareAgents[^}]*\}'
matches = list(re.finditer(pattern, content))

print("EXAMINING SPLIT HEALTHCARE AGENTS TAGS:")
print("=" * 70)

for i, match in enumerate(matches[:5]):  # Show first 5 instances
    tag = match.group(0)
    start = max(0, match.start() - 50)
    end = min(len(content), match.end() + 50)
    context = content[start:end]

    print(f"\nInstance {i+1}:")
    print(f"Tag: {tag}")
    print(f"Context: ...{context}...")
    print("-" * 70)

# Now let's see examples of other split tags
print("\n\nEXAMINING OTHER SPLIT TAGS:")
print("=" * 70)

other_patterns = [
    (r'\{#[^}]*guardians[^}]*\}', 'guardians'),
    (r'\{#[^}]*poaAgents[^}]*\}', 'poaAgents'),
    (r'\{#[^}]*successors[^}]*\}', 'successors'),
]

for pattern, name in other_patterns:
    matches = list(re.finditer(pattern, content))
    if matches:
        match = matches[0]  # First instance
        tag = match.group(0)
        start = max(0, match.start() - 30)
        end = min(len(content), match.end() + 30)
        context = content[start:end]

        print(f"\n{name}:")
        print(f"Tag: {tag}")
        print(f"Context: ...{context}...")
