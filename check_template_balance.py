#!/usr/bin/env python3
import zipfile
import re

with zipfile.ZipFile('public/templates/single_estate_planning_template.docx', 'r') as z:
    content = z.read('word/document.xml').decode('utf-8')

    # Find all opening and closing tags
    all_tags = re.findall(r'\{[#/^][^}]+\}', content)

    # Count opening vs closing for each tag type
    print('TAG BALANCE CHECK:')
    print('=' * 70)

    tag_counts = {}
    for tag in all_tags:
        if tag.startswith('{#'):
            tag_name = tag[2:-1].strip()
            # Ignore special tags
            if not tag_name.startswith('$'):
                if tag_name not in tag_counts:
                    tag_counts[tag_name] = {'open': 0, 'close': 0}
                tag_counts[tag_name]['open'] += 1
        elif tag.startswith('{/'):
            tag_name = tag[2:-1].strip()
            if not tag_name.startswith('$') and tag_name != '':
                if tag_name not in tag_counts:
                    tag_counts[tag_name] = {'open': 0, 'close': 0}
                tag_counts[tag_name]['close'] += 1

    # Check for imbalances
    errors = []
    for tag_name, counts in sorted(tag_counts.items()):
        status = '✓' if counts['open'] == counts['close'] else '✗'
        print(f'{status} {tag_name}: {counts["open"]} open, {counts["close"]} close')
        if counts['open'] != counts['close']:
            errors.append((tag_name, counts['open'] - counts['close']))

    if errors:
        print()
        print('ERRORS FOUND:')
        print('=' * 70)
        for tag_name, diff in errors:
            if diff > 0:
                print(f'  ✗ {tag_name}: Missing {diff} closing tag(s)')
            else:
                print(f'  ✗ {tag_name}: {abs(diff)} extra closing tag(s)')
    else:
        print()
        print('✅ All tags are balanced!')
