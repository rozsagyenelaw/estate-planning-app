#!/usr/bin/env python3
"""
Fix DOCX templates by removing leftover JavaScript syntax
"""

import zipfile
import os
import re
import shutil
from pathlib import Path

def fix_document_xml(xml_content):
    """Remove problematic JavaScript remnants from document.xml"""

    # Remove patterns like "} children.'" or "} : ''" or "}'s : 'my child's'"
    # These are leftover closing braces from deleted JavaScript
    patterns_to_remove = [
        r'\}\s*children\.\'\}',  # } children.'}
        r'\}\s*:\s*\'\'',         # } : ''
        r'\}\s*:\s*\'[^\']*\'',   # } : 'anything'
        r'\}\'s\s*:\s*\'[^\']*\'', # }'s : 'anything'
        r'\}\s*\?',               # } ?
        r'\}\s*&&',               # } &&
        r'\}\s*\|\|',             # } ||
    ]

    fixed_content = xml_content
    for pattern in patterns_to_remove:
        fixed_content = re.sub(pattern, '', fixed_content)

    # Remove standalone closing braces that don't belong
    # But keep {/successorTrustees} etc (closing tags for loops)
    fixed_content = re.sub(r'(?<!{)/(?!successorTrustees|guardians|children|clientPOA|spousePOA|clientHealthcare|spouseHealthcare)\}', '', fixed_content)

    return fixed_content

def fix_docx_file(filepath):
    """Fix a single DOCX file"""
    print(f"\n📄 Processing: {filepath}")

    # Create backup
    backup_path = str(filepath) + '.backup'
    shutil.copy2(filepath, backup_path)
    print(f"   Backup created: {backup_path}")

    # Create temp directory
    temp_dir = filepath.parent / (filepath.stem + '_temp')
    temp_dir.mkdir(exist_ok=True)

    try:
        # Extract DOCX (it's a ZIP file)
        with zipfile.ZipFile(filepath, 'r') as zip_ref:
            zip_ref.extractall(temp_dir)

        # Read document.xml
        doc_xml_path = temp_dir / 'word' / 'document.xml'
        with open(doc_xml_path, 'r', encoding='utf-8') as f:
            original_content = f.read()

        # Fix the content
        fixed_content = fix_document_xml(original_content)

        # Write back
        with open(doc_xml_path, 'w', encoding='utf-8') as f:
            f.write(fixed_content)

        # Re-create the DOCX file
        with zipfile.ZipFile(filepath, 'w', zipfile.ZIP_DEFLATED) as zip_ref:
            for root, dirs, files in os.walk(temp_dir):
                for file in files:
                    file_path = Path(root) / file
                    arcname = file_path.relative_to(temp_dir)
                    zip_ref.write(file_path, arcname)

        print(f"   ✅ Fixed successfully")

        # Check if anything changed
        if original_content != fixed_content:
            print(f"   📝 Changes made to document.xml")
        else:
            print(f"   ℹ️  No changes needed")

    except Exception as e:
        print(f"   ❌ Error: {e}")
        # Restore from backup
        shutil.copy2(backup_path, filepath)
        print(f"   Restored from backup")
    finally:
        # Clean up temp directory
        if temp_dir.exists():
            shutil.rmtree(temp_dir)

def main():
    print("=" * 60)
    print("DOCX Template Fixer")
    print("Removes leftover JavaScript syntax from templates")
    print("=" * 60)

    templates_dir = Path('public/templates')

    if not templates_dir.exists():
        print(f"❌ Templates directory not found: {templates_dir}")
        return

    # Find all DOCX files
    docx_files = list(templates_dir.glob('*.docx'))

    if not docx_files:
        print(f"❌ No DOCX files found in {templates_dir}")
        return

    print(f"\nFound {len(docx_files)} DOCX file(s)\n")

    for docx_file in docx_files:
        fix_docx_file(docx_file)

    print("\n" + "=" * 60)
    print("✅ All files processed!")
    print("=" * 60)
    print("\nBackup files created with .backup extension")
    print("Test the templates and delete backups if everything works.\n")

if __name__ == '__main__':
    main()
