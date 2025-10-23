#!/usr/bin/env python3
"""Fix specific known errors in DOCX templates"""

import zipfile
import shutil
from pathlib import Path

def fix_template(filepath):
    print(f"\n📄 {filepath.name}")

    backup = Path(str(filepath) + '.bak2')
    if not backup.exists():
        shutil.copy2(filepath, backup)

    temp_dir = filepath.parent / (filepath.stem + '_fix_temp')
    temp_dir.mkdir(exist_ok=True)

    try:
        with zipfile.ZipFile(filepath, 'r') as zip_ref:
            zip_ref.extractall(temp_dir)

        doc_xml = temp_dir / 'word' / 'document.xml'
        with open(doc_xml, 'r', encoding='utf-8') as f:
            content = f.read()

        original = content

        # Fix 1: {trust.currentDate. (extra period)
        content = content.replace('{trust.currentDate.', '{trust.currentDate}')
        content = content.replace('{trust.currentDate. ', '{trust.currentDate}')

        # Fix 2: {numChildrenAll (unclosed, should be removed)
        content = content.replace('{numChildrenAll', '')

        # Fix 3: {firstChild.lastName. (extra period)
        content = content.replace('{firstChild.lastName.', '{firstChild.lastName}')

        # Fix 4: Any {field. pattern (period before close)
        import re
        content = re.sub(r'\{([a-zA-Z][a-zA-Z0-9.#/]*)\.\s*\}', r'{\1}', content)

        if content != original:
            with open(doc_xml, 'w', encoding='utf-8') as f:
                f.write(content)

            with zipfile.ZipFile(filepath, 'w', zipfile.ZIP_DEFLATED) as zip_ref:
                for root, dirs, files in (temp_dir).walk():
                    for file in files:
                        file_path = Path(root) / file
                        arcname = file_path.relative_to(temp_dir)
                        zip_ref.write(file_path, arcname)

            print("   ✅ Fixed")
        else:
            print("   ℹ️  No changes")

    finally:
        if temp_dir.exists():
            shutil.rmtree(temp_dir)

templates = Path('public/templates')
for docx in templates.glob('*.docx'):
    if not any(x in docx.name for x in ['.bak', '.backup', '.original']):
        fix_template(docx)

print("\n✅ Done\n")
