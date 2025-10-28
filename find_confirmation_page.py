#!/usr/bin/env python3
"""
Find and examine the confirmation page with hardcoded data
"""

import zipfile
import re

with zipfile.ZipFile('public/templates/single_estate_planning_template.docx', 'r') as z:
    content = z.read('word/document.xml').decode('utf-8')

# Search for confirmation page markers
searches = [
    "Confirmation of Names and Fiduciaries",
    "Family Information",
    "Trustee Information",
    "Durable Power of Attorney",
    "Advanced Health Care Directive",
]

for search_term in searches:
    if search_term in content:
        idx = content.index(search_term)
        start = max(0, idx - 500)
        end = min(len(content), idx + 3000)
        section = content[start:end]

        clean = re.sub(r'<[^>]+>', ' ', section)
        clean = re.sub(r'\s+', ' ', clean)

        print(f"\n{'='*70}")
        print(f"SECTION: {search_term}")
        print('='*70)
        print(clean)
        print("\n")
