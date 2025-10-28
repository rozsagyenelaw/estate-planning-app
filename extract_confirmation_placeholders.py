#!/usr/bin/env python3
"""
Extract all placeholders from the confirmation page section of the template
"""

import zipfile
import re

with zipfile.ZipFile('public/templates/single_estate_planning_template.docx', 'r') as z:
    content = z.read('word/document.xml').decode('utf-8')

# Find the confirmation section
match = re.search(r'Confirmation of Names and Fiduciaries for(.{5000})', content, re.DOTALL)
if match:
    section = match.group(0)

    # Extract all placeholders (things between {})
    placeholders = re.findall(r'\{([^{}]+)\}', section)

    # Filter out XML tags and control structures
    data_placeholders = []
    for p in placeholders:
        if not p.startswith('#') and not p.startswith('/') and not p.startswith('^') and not p.startswith('$'):
            data_placeholders.append(p)

    print("CONFIRMATION PAGE PLACEHOLDERS:")
    print("=" * 70)
    for p in sorted(set(data_placeholders)):
        print(f"  {{{p}}}")

    print("\n\nSECTION TEXT (first 2000 chars):")
    print("=" * 70)
    # Remove XML tags for readability
    clean_text = re.sub(r'<[^>]+>', ' ', section)
    # Remove multiple spaces
    clean_text = re.sub(r'\s+', ' ', clean_text)
    print(clean_text[:2000])
else:
    print("Confirmation section not found")
