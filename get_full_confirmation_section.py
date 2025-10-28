#!/usr/bin/env python3
"""
Get the full confirmation section from the template
"""

import zipfile
import re

with zipfile.ZipFile('public/templates/single_estate_planning_template.docx', 'r') as z:
    content = z.read('word/document.xml').decode('utf-8')

# Find the confirmation section - search from "Confirmation of Names" to the next major section
match = re.search(r'(Confirmation of Names and Fiduciaries for.{10000})', content, re.DOTALL)
if match:
    section = match.group(1)

    # Remove XML tags for readability
    clean_text = re.sub(r'<[^>]+>', ' ', section)
    # Remove multiple spaces
    clean_text = re.sub(r'\s+', ' ', clean_text)

    # Only show up to the next section (usually starts with "WILL" or another major heading)
    if ' WILL ' in clean_text:
        clean_text = clean_text[:clean_text.index(' WILL ')]

    print(clean_text)
else:
    print("Confirmation section not found")
