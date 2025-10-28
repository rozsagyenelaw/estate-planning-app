#!/usr/bin/env python3
"""
Examine the healthcare alternate agents section
"""

import zipfile
import re

with zipfile.ZipFile('public/templates/single_estate_planning_template.docx', 'r') as z:
    content = z.read('word/document.xml').decode('utf-8')

# Find the "If" statement section
if "is unwilling or unable to serve" in content:
    idx = content.index("is unwilling or unable to serve")
    start = max(0, idx - 500)
    end = min(len(content), idx + 1500)
    section = content[start:end]

    print("RAW XML AROUND 'is unwilling or unable to serve':")
    print("=" * 70)
    print(section)
    print("\n")

    clean = re.sub(r'<[^>]+>', ' ', section)
    clean = re.sub(r'\s+', ' ', clean)

    print("CLEAN TEXT:")
    print("=" * 70)
    print(clean)
