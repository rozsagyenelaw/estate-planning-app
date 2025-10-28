#!/usr/bin/env python3
"""
Find the alternate agent details section with hardcoded data
"""

import zipfile
import re

with zipfile.ZipFile('public/templates/single_estate_planning_template.docx', 'r') as z:
    content = z.read('word/document.xml').decode('utf-8')

# Search for the details section - look for patterns around the hardcoded data
searches = [
    "Skylar James Metriyakool",
    "456 Oak Avenue",
    "(818) 931-4536",
]

for search_term in searches:
    if search_term in content:
        idx = content.index(search_term)
        start = max(0, idx - 1500)
        end = min(len(content), idx + 1500)
        section = content[start:end]

        print(f"\nRAW XML AROUND '{search_term}':")
        print("=" * 70)
        print(section)
        print("\n")

        clean = re.sub(r'<[^>]+>', ' ', section)
        clean = re.sub(r'\s+', ' ', clean)

        print(f"CLEAN TEXT AROUND '{search_term}':")
        print("=" * 70)
        print(clean)
        print("\n" + "=" * 70)
        break
else:
    print("None of the hardcoded values found!")
