# PDF Template Filenames

Upload your PDF templates to this folder with these **exact filenames**:

## Living Trust Templates (Trust Document Only)

### 1. Single Living Trust
**Filename:** `single_living_trust_template.pdf`
- For: Single person, revocable living trust
- Contains: Trust document only (no POA, healthcare, etc.)

### 2. Joint Living Trust
**Filename:** `joint_living_trust_template.pdf`
- For: Married couple, revocable living trust
- Contains: Trust document only (no POA, healthcare, etc.)

### 3. Single Irrevocable Trust
**Filename:** `single_irrevocable_trust_template.pdf`
- For: Single person, irrevocable trust
- Contains: Trust document only

### 4. Joint Irrevocable Trust
**Filename:** `joint_irrevocable_trust_template.pdf`
- For: Married couple, irrevocable trust
- Contains: Trust document only

## Complete Estate Planning Package Templates

### 5. Single Estate Planning Package
**Filename:** `single_estate_planning_template.pdf`
- For: Single person, complete portfolio
- Contains:
  - Cover page
  - Table of contents
  - Introduction & overview pages
  - Certificate of Trust
  - Trustee Affidavit
  - Pour Over Will
  - Nominations page
  - Confirmation of names
  - Personal information
  - Funding instructions
  - Durable Power of Attorney
  - Advanced Healthcare Directive
  - HIPAA Authorization
  - Personal Property Assignment
  - Personal Property Memorandum

### 6. Joint Estate Planning Package
**Filename:** `joint_estate_planning_template.pdf`
- For: Married couple, complete portfolio
- Contains all of the above PLUS duplicate documents for spouse:
  - Pour Over Will (Client)
  - Pour Over Will (Spouse)
  - Durable POA (Client)
  - Durable POA (Spouse)
  - Healthcare Directive (Client)
  - Healthcare Directive (Spouse)
  - HIPAA Authorization (Client)
  - HIPAA Authorization (Spouse)
  - Personal Property Assignment (Client)
  - Personal Property Assignment (Spouse)
  - Personal Property Memorandum (Client)
  - Personal Property Memorandum (Spouse)

---

## File Location

These files should be placed in:
```
/Users/rozsagyene/estate-planning-app/public/templates/
```

Or upload to GitHub:
```
https://github.com/rozsagyenelaw/estate-planning-app/tree/main/public/templates
```

---

## How to Create Each Template

1. **Design your document** in Word/Pages with your law firm's branding
2. **Add placeholders** for data (see field names in documentation)
3. **Export/Save as PDF**
4. **Open in Adobe Acrobat or PDFescape**
5. **Add form fields** with correct names
6. **Save with the filename above**
7. **Upload to this folder**

---

## Automatic Selection

The app will automatically select the correct template based on:
- Trust type (single vs joint)
- Trust nature (revocable vs irrevocable)
- Document type (living trust only vs complete package)

You don't need to do anything - just provide the 6 PDFs!

---

## Testing

Once you upload a template:
1. Create a new client in the app
2. Select the appropriate trust type
3. Fill out the form
4. Click "Save Living Trust" or "Save Complete Estate Plan"
5. The correct template will be used automatically
