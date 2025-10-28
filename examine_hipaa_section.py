#!/usr/bin/env python3
"""
Examine the HIPAA section to find hardcoded data
"""

import zipfile
import re

with zipfile.ZipFile('public/templates/single_estate_planning_template.docx', 'r') as z:
    content = z.read('word/document.xml').decode('utf-8')

# Find the HIPAA section - search for "Appointment of Authorized Recipients"
match = re.search(r'(Appointment of Authorized Recipients.{1500})', content, re.DOTALL)
if match:
    section = match.group(1)

    # Show raw XML
    print("HIPAA SECTION RAW XML (first 1000 chars):")
    print("=" * 70)
    print(section[:1000])
    print("\n")

    # Remove XML tags for readability
    clean_text = re.sub(r'<[^>]+>', ' ', section)
    clean_text = re.sub(r'\s+', ' ', clean_text)

    print("HIPAA SECTION CLEAN TEXT:")
    print("=" * 70)
    print(clean_text)
    print("\n")

    # Find all placeholders
    placeholders = re.findall(r'\{([^{}]+)\}', section)
    print("PLACEHOLDERS FOUND:")
    print("=" * 70)
    for p in placeholders:
        print(f"  {{{p}}}")
else:
    print("HIPAA section not found")
