#!/usr/bin/env python3
"""
Examine the Advance Healthcare Directive section for healthcare agents
"""

import zipfile
import re

with zipfile.ZipFile('public/templates/single_estate_planning_template.docx', 'r') as z:
    content = z.read('word/document.xml').decode('utf-8')

# Find the healthcare directive section - look for "ADVANCE HEALTH CARE DIRECTIVE" or similar
match = re.search(r'(ADVANCE HEALTH CARE DIRECTIVE.{3000})', content, re.DOTALL | re.IGNORECASE)
if match:
    section = match.group(1)

    # Show a clean version
    clean_text = re.sub(r'<[^>]+>', ' ', section)
    clean_text = re.sub(r'\s+', ' ', clean_text)

    print("HEALTHCARE DIRECTIVE SECTION (first 2000 chars):")
    print("=" * 70)
    print(clean_text[:2000])
    print("\n")

    # Find all placeholders
    placeholders = re.findall(r'\{([^{}]+)\}', section)
    print("PLACEHOLDERS FOUND:")
    print("=" * 70)
    unique_placeholders = sorted(set(placeholders))
    for p in unique_placeholders:
        if not p.startswith('#') and not p.startswith('/') and not p.startswith('^') and not p.startswith('$'):
            print(f"  {{{p}}}")
else:
    print("Healthcare directive section not found")
    # Try searching for "agent" in context of healthcare
    if 'health care agent' in content.lower():
        print("\nFound 'health care agent' in document")
        idx = content.lower().index('health care agent')
        context = content[max(0, idx-500):idx+500]
        clean = re.sub(r'<[^>]+>', ' ', context)
        clean = re.sub(r'\s+', ' ', clean)
        print("Context:", clean)
