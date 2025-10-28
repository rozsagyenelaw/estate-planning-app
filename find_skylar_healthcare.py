#!/usr/bin/env python3
"""
Find Skylar in healthcare section
"""

import zipfile
import re

with zipfile.ZipFile('public/templates/single_estate_planning_template.docx', 'r') as z:
    content = z.read('word/document.xml').decode('utf-8')

# Find Skylar James Metriyakool in healthcare context
if "Skylar James Metriyakool" in content:
    idx = content.index("Skylar James Metriyakool")
    start = max(0, idx - 1000)
    end = min(len(content), idx + 1000)
    section = content[start:end]

    print("RAW XML AROUND 'Skylar James Metriyakool':")
    print("=" * 70)
    print(section)
    print("\n")

    clean = re.sub(r'<[^>]+>', ' ', section)
    clean = re.sub(r'\s+', ' ', clean)

    print("CLEAN TEXT:")
    print("=" * 70)
    print(clean)
