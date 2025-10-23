# PDF Templates Folder

## Purpose

This folder contains PDF templates for estate planning documents that are filled in programmatically with client data.

## Current Templates

Place your PDF template files here:

- `estate_planning_portfolio_template.pdf` - Complete estate planning portfolio (TO BE ADDED)

## How to Add a Template

1. **Create your PDF** with form fields (see PDF_TEMPLATE_GUIDE.md)
2. **Name form fields** using the specified naming convention
3. **Save the PDF** to this folder
4. **Commit and push** to GitHub

## Accessing Templates

Templates in this folder are accessible at:
```
/templates/your_template_name.pdf
```

For example:
```javascript
const templatePath = '/templates/estate_planning_portfolio_template.pdf';
```

## Documentation

See the complete guide: `/PDF_TEMPLATE_GUIDE.md` in the project root.

## Field Names Reference

See all available field names in:
- `PDF_TEMPLATE_GUIDE.md`
- `TEMPLATE_REFERENCE.md`
- `FORMDATA_STRUCTURE.md`

---

**Note:** PDF files in this folder are served by the Vite dev server and will be included in production builds.
