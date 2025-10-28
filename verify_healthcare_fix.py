#!/usr/bin/env python3
"""
Verify the healthcare successor fix
"""

import zipfile
import re

with zipfile.ZipFile('public/templates/single_estate_planning_template.docx', 'r') as z:
    content = z.read('word/document.xml').decode('utf-8')

# Find and display the fixed section
if "I designate" in content:
    idx = content.index("I designate")
    start = max(0, idx - 500)
    end = min(len(content), idx + 1500)
    section = content[start:end]

    clean = re.sub(r'<[^>]+>', ' ', section)
    clean = re.sub(r'\s+', ' ', clean)

    print("FIXED HEALTHCARE SUCCESSOR SECTION:")
    print("=" * 70)
    print(clean)
    print("\n")
else:
    print("Section not found")
