#!/usr/bin/env python3
"""
Find healthcare agent designation in the template
"""

import zipfile
import re

with zipfile.ZipFile('public/templates/single_estate_planning_template.docx', 'r') as z:
    content = z.read('word/document.xml').decode('utf-8')

# Search for patterns related to healthcare agent designation
patterns = [
    'Designation of Agent',
    'Primary Agent',
    'First Alternate Agent',
    'I designate',
    'health care agent',
    'address:',
    'telephone:',
]

for pattern in patterns:
    if pattern.lower() in content.lower():
        idx = content.lower().index(pattern.lower())
        start = max(0, idx - 300)
        end = min(len(content), idx + 1000)
        section = content[start:end]

        clean = re.sub(r'<[^>]+>', ' ', section)
        clean = re.sub(r'\s+', ' ', clean)

        print(f"FOUND '{pattern}':")
        print("=" * 70)
        print(clean)
        print("\n")
        break
