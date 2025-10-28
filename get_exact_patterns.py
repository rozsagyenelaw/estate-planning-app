#!/usr/bin/env python3
"""
Get exact XML patterns for the confirmation page
"""

import zipfile

with zipfile.ZipFile('public/templates/single_estate_planning_template.docx', 'r') as z:
    content = z.read('word/document.xml').decode('utf-8')

# Find exact patterns
searches = {
    "Initial Trustee": "Initial Trustee:",
    "James": "James Metriyakool",
    "Elizabeth": "Elizabeth Metriyakool",
    "Angela": "Angela Metriyakool",
}

for name, search_term in searches.items():
    if search_term in content:
        idx = content.index(search_term)
        start = max(0, idx - 200)
        end = min(len(content), idx + 600)
        section = content[start:end]

        print(f"\n{'='*70}")
        print(f"EXACT XML for '{name}' ({search_term}):")
        print('='*70)
        print(section)
        print()
