#!/usr/bin/env python3
"""
Carefully examine the HIPAA DOB section to understand exact XML structure
"""

import zipfile
import re

with zipfile.ZipFile('public/templates/single_estate_planning_template.docx', 'r') as z:
    content = z.read('word/document.xml').decode('utf-8')

# Find "October 21, 1971" and get a large context
if "October 21, 1971" in content:
    idx = content.index("October 21, 1971")
    start = max(0, idx - 500)
    end = min(len(content), idx + 500)
    section = content[start:end]

    print("RAW XML AROUND 'October 21, 1971':")
    print("=" * 70)
    print(section)
    print("\n")

    # Check if the date is split across XML tags
    date_context = content[idx-100:idx+100]
    if '<' in date_context and '>' in date_context:
        print("⚠️  WARNING: The date appears to be split across XML tags!")
        print("Date context:", date_context)
        print("\n")

    # Show clean version
    clean = re.sub(r'<[^>]+>', '|', section)
    print("STRUCTURE (| = XML boundary):")
    print("=" * 70)
    print(clean)
else:
    print("'October 21, 1971' not found in document")
