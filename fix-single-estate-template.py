#!/usr/bin/env python3
"""Fix the single estate planning template"""

import zipfile
import shutil
from pathlib import Path
import re

def fix_template(filepath):
    print(f"\n📄 Fixing {filepath.name}")

    # Create backup
    backup = Path(str(filepath) + '.fix-backup')
    if not backup.exists():
        shutil.copy2(filepath, backup)
        print(f"   Backup: {backup.name}")

    temp_dir = filepath.parent / (filepath.stem + '_fix_temp')
    if temp_dir.exists():
        shutil.rmtree(temp_dir)
    temp_dir.mkdir()

    try:
        # Extract
        with zipfile.ZipFile(filepath, 'r') as zip_ref:
            zip_ref.extractall(temp_dir)

        # Read document.xml
        doc_xml = temp_dir / 'word' / 'document.xml'
        with open(doc_xml, 'r', encoding='utf-8') as f:
            content = f.read()

        original = content

        # Fix malformed placeholders
        # Pattern 1: {field. } or {field.} (extra period before closing brace)
        content = re.sub(r'\{([a-zA-Z][a-zA-Z0-9._#/]*)\.\s*\}', r'{\1}', content)

        # Pattern 2: Specific known errors
        content = content.replace('{client.fullName.', '{client.fullName')
        content = content.replace('{trust.currentDate.', '{trust.currentDate')
        content = content.replace('{firstChild.lastName.', '{firstChild.lastName')

        changes = len(content) - len(original)

        if content != original:
            # Write back
            with open(doc_xml, 'w', encoding='utf-8') as f:
                f.write(content)

            # Re-zip
            with zipfile.ZipFile(filepath, 'w', zipfile.ZIP_DEFLATED) as zip_out:
                for file_path in temp_dir.rglob('*'):
                    if file_path.is_file():
                        arcname = file_path.relative_to(temp_dir)
                        zip_out.write(file_path, arcname)

            print(f"   ✅ Fixed ({changes} bytes changed)")
        else:
            print(f"   ℹ️  No changes needed")

    finally:
        if temp_dir.exists():
            shutil.rmtree(temp_dir)

if __name__ == '__main__':
    template = Path('public/templates/single_estate_planning_template.docx')
    fix_template(template)
    print("\n✅ Done\n")
