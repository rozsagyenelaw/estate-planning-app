#!/usr/bin/env python3
"""
Get full healthcare agent details section
"""

import zipfile
import re

with zipfile.ZipFile('public/templates/single_estate_planning_template.docx', 'r') as z:
    content = z.read('word/document.xml').decode('utf-8')

# Find from "Name: Maryann" and get the next 2000 characters
if "Maryann Gutierrez Metriyakool" in content:
    idx = content.index("Maryann Gutierrez Metriyakool")
    start = max(0, idx - 200)
    end = min(len(content), idx + 2000)
    section = content[start:end]

    clean = re.sub(r'<[^>]+>', ' ', section)
    clean = re.sub(r'\s+', ' ', clean)

    print("HEALTHCARE AGENT DETAILS SECTION:")
    print("=" * 70)
    print(clean)
