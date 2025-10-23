#!/usr/bin/env python3
"""
Merge split placeholders in DOCX files
Word often splits {placeholder} across multiple <w:r> elements, breaking docxtemplater
This script merges them back together
"""

import zipfile
import os
import re
import shutil
from pathlib import Path
import xml.etree.ElementTree as ET

# Register XML namespaces
NS = {
    'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main',
    'w14': 'http://schemas.microsoft.com/office/word/2010/wordml',
    'w15': 'http://schemas.microsoft.com/office/word/2012/wordml',
    'wpc': 'http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas',
    'mc': 'http://schemas.openxmlformats.org/markup-compatibility/2006',
    'wp': 'http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing',
}

for prefix, uri in NS.items():
    ET.register_namespace(prefix, uri)

def simple_text_merge(xml_content):
    """
    Simple regex-based approach to merge common split patterns
    """
    # Pattern: {</w:t>...</w:r><w:r>...</w:t>word</w:t>...</w:r><w:r>...</w:t>.field</w:t>...</w:r><w:r>...</w:t>}
    # We want to merge text content between { and }

    # Step 1: Remove formatting breaks within placeholders
    # Match opening { through potential split to closing }
    def merge_callback(match):
        # Extract the content between { and }
        full_match = match.group(0)
        # Extract just the text content, removing all XML tags
        text_only = re.sub(r'<[^>]+>', '', full_match)
        # If it looks like a valid placeholder, create clean version
        if re.match(r'\{[a-zA-Z][a-zA-Z0-9._#/]*\}', text_only):
            # Create a clean, unsplit version
            return f'<w:r><w:t>{text_only}</w:t></w:r>'
        return full_match

    # This pattern tries to match { ... } even when split across tags
    # It's not perfect but handles most cases
    pattern = r'\{(?:[^{}]|<[^>]*>)*?\}'
    merged = re.sub(pattern, merge_callback, xml_content, flags=re.DOTALL)

    return merged

def fix_docx_file(filepath):
    """Fix a single DOCX file"""
    print(f"\n📄 Processing: {filepath.name}")

    # Create backup
    backup_path = Path(str(filepath) + '.original')
    if not backup_path.exists():
        shutil.copy2(filepath, backup_path)
        print(f"   Backup: {backup_path.name}")

    temp_dir = filepath.parent / (filepath.stem + '_merge_temp')
    temp_dir.mkdir(exist_ok=True)

    try:
        # Extract
        with zipfile.ZipFile(filepath, 'r') as zip_ref:
            zip_ref.extractall(temp_dir)

        # Read document.xml
        doc_xml_path = temp_dir / 'word' / 'document.xml'
        with open(doc_xml_path, 'r', encoding='utf-8') as f:
            content = f.read()

        original_size = len(content)

        # Apply merging
        merged = simple_text_merge(content)

        merged_size = len(merged)
        size_diff = original_size - merged_size

        # Write back
        with open(doc_xml_path, 'w', encoding='utf-8') as f:
            f.write(merged)

        # Re-create DOCX
        with zipfile.ZipFile(filepath, 'w', zipfile.ZIP_DEFLATED) as zip_ref:
            for root, dirs, files in os.walk(temp_dir):
                for file in files:
                    file_path = Path(root) / file
                    arcname = file_path.relative_to(temp_dir)
                    zip_ref.write(file_path, arcname)

        if size_diff > 0:
            print(f"   ✅ Merged placeholders ({size_diff} bytes reduced)")
        else:
            print(f"   ℹ️  No significant changes")

    except Exception as e:
        print(f"   ❌ Error: {e}")
        import traceback
        traceback.print_exc()
    finally:
        if temp_dir.exists():
            shutil.rmtree(temp_dir)

def main():
    print("=" * 70)
    print("DOCX Placeholder Merger")
    print("Merges split placeholders across XML elements")
    print("=" * 70)

    templates_dir = Path('public/templates')
    docx_files = [f for f in templates_dir.glob('*.docx')
                  if not any(x in f.name for x in ['.backup', '.original'])]

    print(f"\nFound {len(docx_files)} DOCX file(s)")

    for docx_file in docx_files:
        fix_docx_file(docx_file)

    print("\n" + "=" * 70)
    print("✅ Complete!")
    print("=" * 70 + "\n")

if __name__ == '__main__':
    main()
