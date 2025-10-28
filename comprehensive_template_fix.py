#!/usr/bin/env python3
"""
Comprehensive fix for the broken template:
1. Merge all tags split by Word's spell/grammar checking
2. Add missing closing tags
3. Verify the template is balanced
"""

import zipfile
import os
import shutil
import re

# Paths
template_path = 'public/templates/single_estate_planning_template.docx'
backup_path = 'public/templates/single_estate_planning_template_backup.docx'
temp_dir = '/tmp/docx_fix'

print("=" * 70)
print("COMPREHENSIVE TEMPLATE FIX")
print("=" * 70)

# Create backup
if not os.path.exists(backup_path):
    print("\nCreating backup...")
    shutil.copy(template_path, backup_path)
    print("✓ Backup created")

# Extract
if os.path.exists(temp_dir):
    shutil.rmtree(temp_dir)
os.makedirs(temp_dir)

with zipfile.ZipFile(template_path, 'r') as zip_ref:
    zip_ref.extractall(temp_dir)

# Read document.xml
doc_xml_path = os.path.join(temp_dir, 'word', 'document.xml')
with open(doc_xml_path, 'r', encoding='utf-8') as f:
    content = f.read()

print("\nSTEP 1: MERGE SPLIT TAGS")
print("-" * 70)

# Merge tags split across XML elements
# Pattern matches: {any content including XML tags}
tag_pattern = r'\{([^{}]*?(?:<[^>]+>[^{}]*?)*?)\}'

def merge_tag(match):
    """Remove XML formatting from inside template tags"""
    full_match = match.group(0)
    tag_content = match.group(1)

    # If no XML tags inside, return as-is
    if '<' not in tag_content:
        return full_match

    # Remove all XML tags and their content
    text_only = re.sub(r'<[^>]+>', '', tag_content)

    # Also handle xml:space="preserve" attributes which add spaces
    text_only = text_only.strip()

    return '{' + text_only + '}'

original_content = content
content = re.sub(tag_pattern, merge_tag, content, flags=re.DOTALL)

# Count how many tags were merged
merged_count = len(re.findall(r'<[^>]+>', original_content)) - len(re.findall(r'<[^>]+>', content))
print(f"✓ Merged split tags (removed {merged_count} XML elements from tags)")

print("\nSTEP 2: CHECK TAG BALANCE AFTER MERGING")
print("-" * 70)

# Find all opening and closing tags
all_tags = re.findall(r'\{[#/^][^}]+\}', content)

tag_counts = {}
for tag in all_tags:
    if tag.startswith('{#'):
        tag_name = tag[2:-1].strip()
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

# Check for remaining imbalances
errors = []
for tag_name, counts in sorted(tag_counts.items()):
    if counts['open'] != counts['close']:
        diff = counts['open'] - counts['close']
        errors.append((tag_name, diff))
        print(f"✗ {tag_name}: {counts['open']} open, {counts['close']} close (diff: {diff})")
    else:
        print(f"✓ {tag_name}: balanced")

if errors:
    print("\nSTEP 3: ADD MISSING CLOSING TAGS")
    print("-" * 70)

    for tag_name, diff in errors:
        if diff > 0:
            print(f"\nFixing {tag_name}: needs {diff} closing tag(s)")

            # Find all opening tags for this tag
            pattern = r'\{#' + re.escape(tag_name) + r'\}'
            matches = list(re.finditer(pattern, content))

            if matches:
                # For each opening tag, try to find where it should close
                # Strategy: Look for the next paragraph break or section boundary
                for match in reversed(matches[:diff]):  # Process in reverse to maintain positions
                    start_pos = match.end()

                    # Find next paragraph or section marker
                    next_para = content.find('</w:p>', start_pos)
                    next_section = content.find('</w:sectPr>', start_pos)

                    # Choose the closest one
                    insert_pos = next_para if next_para != -1 else next_section

                    if insert_pos != -1:
                        # Insert closing tag before the paragraph/section end
                        closing_tag = '{/' + tag_name + '}'
                        content = content[:insert_pos] + closing_tag + content[insert_pos:]
                        print(f"  ✓ Added {closing_tag} at position {insert_pos}")
                    else:
                        # Fallback: add at end of document
                        content = content + '{/' + tag_name + '}'
                        print(f"  ✓ Added {closing_tag} at end of document")
        elif diff < 0:
            print(f"\nFixing {tag_name}: has {abs(diff)} extra closing tag(s)")
            # Remove extra closing tags
            pattern = r'\{/' + re.escape(tag_name) + r'\}'
            matches = list(re.finditer(pattern, content))

            # Remove the extra ones (from the end)
            for match in reversed(matches[:abs(diff)]):
                content = content[:match.start()] + content[match.end():]
                print(f"  ✓ Removed extra closing tag at position {match.start()}")

print("\nSTEP 4: WRITE FIXED CONTENT")
print("-" * 70)

# Write back
with open(doc_xml_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("✓ Updated document.xml")

# Repack
with zipfile.ZipFile(template_path, 'w', zipfile.ZIP_DEFLATED) as zip_ref:
    for root, dirs, files in os.walk(temp_dir):
        for file in files:
            file_path = os.path.join(root, file)
            arcname = os.path.relpath(file_path, temp_dir)
            zip_ref.write(file_path, arcname)
print("✓ Repacked DOCX")

# Cleanup
shutil.rmtree(temp_dir)
print("✓ Cleaned up temp files")

print("\n" + "=" * 70)
print("✅ TEMPLATE FIX COMPLETE!")
print("=" * 70)
print("\nRun check_template_balance.py to verify all tags are balanced.")
