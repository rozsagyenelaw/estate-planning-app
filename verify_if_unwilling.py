#!/usr/bin/env python3
"""
Verify the "If unwilling" section specifically
"""

import zipfile
import re

with zipfile.ZipFile('public/templates/single_estate_planning_template.docx', 'r') as z:
    content = z.read('word/document.xml').decode('utf-8')

# Find and display the "If unwilling" section
if "If {firstHealthcareAgent} is unwilling" in content:
    idx = content.index("If {firstHealthcareAgent} is unwilling")
    start = max(0, idx - 200)
    end = min(len(content), idx + 2000)
    section = content[start:end]

    clean = re.sub(r'<[^>]+>', ' ', section)
    clean = re.sub(r'\s+', ' ', clean)

    print("FIXED 'IF UNWILLING' SECTION:")
    print("=" * 70)
    print(clean)
    print("\n")
else:
    print("Section not found")
