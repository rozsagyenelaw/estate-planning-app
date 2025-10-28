#!/usr/bin/env python3
"""
Examine the HIPAA signature section for hardcoded DOB
"""

import zipfile
import re

with zipfile.ZipFile('public/templates/single_estate_planning_template.docx', 'r') as z:
    content = z.read('word/document.xml').decode('utf-8')

# Find the HIPAA signature section with DOB
match = re.search(r'(Principal.{500}DOB.{200})', content, re.DOTALL)
if match:
    section = match.group(1)

    # Show raw XML
    print("HIPAA SIGNATURE SECTION RAW XML:")
    print("=" * 70)
    print(section)
    print("\n")

    # Remove XML tags for readability
    clean_text = re.sub(r'<[^>]+>', ' ', section)
    clean_text = re.sub(r'\s+', ' ', clean_text)

    print("HIPAA SIGNATURE SECTION CLEAN TEXT:")
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
    print("HIPAA signature section not found")
    # Try searching for just "October 21, 1971"
    if "October 21, 1971" in content:
        print("\nFound 'October 21, 1971' in document")
        # Find context around it
        idx = content.index("October 21, 1971")
        context = content[max(0, idx-300):idx+300]
        clean = re.sub(r'<[^>]+>', ' ', context)
        clean = re.sub(r'\s+', ' ', clean)
        print("Context:", clean)
