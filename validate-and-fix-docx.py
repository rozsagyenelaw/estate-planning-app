#!/usr/bin/env python3
"""
Validate and fix DOCX templates
Finds and fixes malformed placeholders
"""

import zipfile
import os
import re
import shutil
from pathlib import Path

def extract_and_analyze(xml_content):
    """Extract all potential placeholders and find malformed ones"""

    # Find all text between potential braces
    # This regex finds { followed by content, potentially with spaces, until }
    potential_placeholders = re.findall(r'\{[^}]*\}', xml_content)

    # Also find unclosed opening braces (no closing brace within reasonable distance)
    unclosed_opens = re.findall(r'\{[^}]{200,}', xml_content)

    # Find unopened closing braces (closing brace without matching open)
    # This is trickier - look for } that don't seem to have a matching {

    print(f"\n   Found {len(potential_placeholders)} potential placeholders")
    if unclosed_opens:
        print(f"   ⚠️  Found {len(unclosed_opens)} possibly unclosed placeholders")
        for unc in unclosed_opens[:5]:  # Show first 5
            preview = unc[:100] + "..." if len(unc) > 100 else unc
            print(f"      - {preview}")

    return potential_placeholders, unclosed_opens

def fix_document_xml(xml_content):
    """Fix common placeholder issues"""

    fixed = xml_content
    changes_made = []

    # Pattern 1: Fix "numChildrenAll" (should be "numChildren ==1" conditional)
    # Replace unclosed {numChildrenAll with just the text (remove the brace)
    if '{numChildrenAll' in fixed:
        fixed = fixed.replace('{numChildrenAll', '')
        changes_made.append("Removed unclosed {numChildrenAll")

    # Pattern 2: Fix signature lines with malformed placeholders
    # "____________________________client.firstName" should be "____________________________{client.firstName}"
    fixed = re.sub(
        r'_{10,}(client|spouse)\.',
        lambda m: '_' * 30 + '{' + m.group(1) + '.',
        fixed
    )
    if '____________________________client.' in xml_content or '____________________________spouse.' in xml_content:
        changes_made.append("Fixed signature line placeholders")

    # Pattern 3: Remove standalone/malformed closing braces before text
    # But preserve proper closing tags like {/successorTrustees}
    # Look for }. followed by uppercase (start of sentence) - likely a stray }
    fixed = re.sub(r'\}\.\s+([A-Z])', r'.  \1', fixed)
    if re.search(r'\}\.\s+([A-Z])', xml_content):
        changes_made.append("Removed stray closing braces before sentences")

    # Pattern 4: Find and report any remaining {word followed by lots of text without }
    remaining_unclosed = re.findall(r'\{([a-zA-Z][a-zA-Z0-9.]*)[^}]{100,}', fixed)
    if remaining_unclosed:
        print(f"   ⚠️  Warning: Found potentially unclosed placeholders:")
        for placeholder in set(remaining_unclosed):
            print(f"      - {{{placeholder}")

    if changes_made:
        print(f"   📝 Changes made:")
        for change in changes_made:
            print(f"      - {change}")

    return fixed

def fix_docx_file(filepath):
    """Fix a single DOCX file"""
    print(f"\n📄 Processing: {filepath.name}")

    # Create backup if it doesn't exist
    backup_path = Path(str(filepath) + '.backup')
    if not backup_path.exists():
        shutil.copy2(filepath, backup_path)
        print(f"   Backup created: {backup_path.name}")
    else:
        print(f"   Using existing backup: {backup_path.name}")

    # Create temp directory
    temp_dir = filepath.parent / (filepath.stem + '_temp')
    temp_dir.mkdir(exist_ok=True)

    try:
        # Extract DOCX
        with zipfile.ZipFile(filepath, 'r') as zip_ref:
            zip_ref.extractall(temp_dir)

        # Read document.xml
        doc_xml_path = temp_dir / 'word' / 'document.xml'
        with open(doc_xml_path, 'r', encoding='utf-8') as f:
            original_content = f.read()

        # Analyze
        print(f"   📊 Analyzing...")
        extract_and_analyze(original_content)

        # Fix
        print(f"   🔧 Fixing...")
        fixed_content = fix_document_xml(original_content)

        # Write back
        with open(doc_xml_path, 'w', encoding='utf-8') as f:
            f.write(fixed_content)

        # Re-create DOCX
        with zipfile.ZipFile(filepath, 'w', zipfile.ZIP_DEFLATED) as zip_ref:
            for root, dirs, files in os.walk(temp_dir):
                for file in files:
                    file_path = Path(root) / file
                    arcname = file_path.relative_to(temp_dir)
                    zip_ref.write(file_path, arcname)

        if original_content == fixed_content:
            print(f"   ✅ No changes needed")
        else:
            print(f"   ✅ Fixed and saved")

    except Exception as e:
        print(f"   ❌ Error: {e}")
        import traceback
        traceback.print_exc()
    finally:
        # Clean up
        if temp_dir.exists():
            shutil.rmtree(temp_dir)

def main():
    print("=" * 70)
    print("DOCX Template Validator and Fixer")
    print("=" * 70)

    templates_dir = Path('public/templates')
    docx_files = list(templates_dir.glob('*.docx'))
    docx_files = [f for f in docx_files if not f.name.endswith('.backup')]

    print(f"\nFound {len(docx_files)} DOCX file(s)")

    for docx_file in docx_files:
        fix_docx_file(docx_file)

    print("\n" + "=" * 70)
    print("✅ Processing complete!")
    print("=" * 70 + "\n")

if __name__ == '__main__':
    main()
