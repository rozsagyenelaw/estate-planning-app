#!/usr/bin/env python3
"""
Examine the POA section to find the placeholder issue
"""

import zipfile
import re

with zipfile.ZipFile('public/templates/single_estate_planning_template.docx', 'r') as z:
    content = z.read('word/document.xml').decode('utf-8')

# Find the POA sections
match = re.search(r'(Section 1\.01.{500})', content, re.DOTALL)
if match:
    section = match.group(1)

    # Show raw XML
    print("SECTION 1.01 RAW XML:")
    print("=" * 70)
    print(section)
    print("\n")

    # Remove XML tags for readability
    clean_text = re.sub(r'<[^>]+>', ' ', section)
    clean_text = re.sub(r'\s+', ' ', clean_text)

    print("SECTION 1.01 CLEAN TEXT:")
    print("=" * 70)
    print(clean_text)
    print("\n")

# Find Section 1.02
match2 = re.search(r'(Section 1\.02.{500})', content, re.DOTALL)
if match2:
    section2 = match2.group(1)

    # Show raw XML
    print("SECTION 1.02 RAW XML:")
    print("=" * 70)
    print(section2)
    print("\n")

    # Remove XML tags for readability
    clean_text2 = re.sub(r'<[^>]+>', ' ', section2)
    clean_text2 = re.sub(r'\s+', ' ', clean_text2)

    print("SECTION 1.02 CLEAN TEXT:")
    print("=" * 70)
    print(clean_text2)
