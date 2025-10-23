# PDF Template Guide

## Overview

Instead of using 17 separate JavaScript template files, you can create **ONE PDF template** with form fields or placeholders, and the app will fill them in automatically.

This approach is much simpler and prevents template errors!

---

## 🎯 Two Methods

### Method 1: PDF with Form Fields (Recommended)
Create a fillable PDF with named form fields using Adobe Acrobat, PDFescape, or similar.

### Method 2: PDF with Text Placeholders
Create a PDF with text like `{{CLIENT_FIRST_NAME}}` that gets replaced.

**We recommend Method 1** because it's more reliable.

---

## 📋 Step-by-Step Instructions

### Step 1: Create Your PDF Template

1. **Create your document in Word/Pages/Google Docs** with your complete estate planning portfolio layout

2. **Leave blank spaces** where data should be filled in

3. **Export/Save as PDF**

### Step 2: Add Form Fields (Using Adobe Acrobat)

1. **Open the PDF in Adobe Acrobat Pro DC**

2. **Go to Tools → Prepare Form**

3. **Click "Start"** - Acrobat will auto-detect fields

4. **Manually add/adjust text fields** where you want data

5. **Name each field** using the placeholder names below

6. **Save the PDF**

### Step 3: Alternative - Use PDFescape (Free Online)

1. **Go to:** https://www.pdfescape.com/

2. **Upload your PDF**

3. **Click "Form" → "Text"**

4. **Draw text boxes** where you want fields

5. **Name each field** (right-click → Properties → Name)

6. **Download the PDF**

---

## 🏷️ Form Field Names

Use these **exact names** for form fields in your PDF:

### Client Information
```
CLIENT_FIRST_NAME
CLIENT_MIDDLE_NAME
CLIENT_LAST_NAME
CLIENT_FULL_NAME
CLIENT_ADDRESS
CLIENT_CITY
CLIENT_STATE
CLIENT_ZIP
CLIENT_COUNTY
CLIENT_PHONE
CLIENT_EMAIL
CLIENT_SSN
CLIENT_DOB
CLIENT_SEX
CLIENT_MARITAL_STATUS
CLIENT_NOTARY_DATE
```

### Spouse Information (for Joint Trusts)
```
SPOUSE_FIRST_NAME
SPOUSE_MIDDLE_NAME
SPOUSE_LAST_NAME
SPOUSE_FULL_NAME
SPOUSE_ADDRESS
SPOUSE_CITY
SPOUSE_STATE
SPOUSE_ZIP
SPOUSE_COUNTY
SPOUSE_PHONE
SPOUSE_EMAIL
SPOUSE_SSN
SPOUSE_DOB
SPOUSE_SEX
SPOUSE_NOTARY_DATE
```

### Trust Information
```
TRUST_NAME
TRUST_TYPE
IS_JOINT
IS_IRREVOCABLE
IS_RESTATEMENT
ORIGINAL_TRUST_NAME
ORIGINAL_TRUST_DATE
CURRENT_DATE
```

### Children
```
NUM_CHILDREN
CHILDREN_LIST                    (formatted list of all children)

CHILD_1_FIRST_NAME
CHILD_1_LAST_NAME
CHILD_1_DOB
CHILD_1_RELATION
CHILD_1_FULL_NAME

CHILD_2_FIRST_NAME
CHILD_2_LAST_NAME
CHILD_2_DOB
... (and so on)
```

### Successor Trustees
```
NUM_TRUSTEES
TRUSTEES_LIST                    (formatted list of all trustees)

TRUSTEE_1_FIRST_NAME
TRUSTEE_1_LAST_NAME
TRUSTEE_1_ADDRESS
TRUSTEE_1_PHONE
TRUSTEE_1_EMAIL
TRUSTEE_1_FULL_NAME

TRUSTEE_2_FIRST_NAME
TRUSTEE_2_LAST_NAME
... (and so on)
```

### Guardians
```
GUARDIANS_LIST                   (formatted list)

GUARDIAN_1_FIRST_NAME
GUARDIAN_1_LAST_NAME
GUARDIAN_1_ADDRESS
GUARDIAN_1_PHONE

GUARDIAN_2_FIRST_NAME
... (and so on)
```

### Power of Attorney Agents - Client
```
CLIENT_POA_1_FIRST_NAME
CLIENT_POA_1_LAST_NAME
CLIENT_POA_1_ADDRESS
CLIENT_POA_1_PHONE

CLIENT_POA_2_FIRST_NAME
... (and so on)
```

### Power of Attorney Agents - Spouse
```
SPOUSE_POA_1_FIRST_NAME
SPOUSE_POA_1_LAST_NAME
SPOUSE_POA_1_ADDRESS
SPOUSE_POA_1_PHONE

SPOUSE_POA_2_FIRST_NAME
... (and so on)
```

### Healthcare Agents - Client
```
CLIENT_HEALTHCARE_1_FIRST_NAME
CLIENT_HEALTHCARE_1_LAST_NAME
CLIENT_HEALTHCARE_1_PHONE

CLIENT_HEALTHCARE_2_FIRST_NAME
... (and so on)
```

### Healthcare Agents - Spouse
```
SPOUSE_HEALTHCARE_1_FIRST_NAME
SPOUSE_HEALTHCARE_1_LAST_NAME
SPOUSE_HEALTHCARE_1_PHONE

SPOUSE_HEALTHCARE_2_FIRST_NAME
... (and so on)
```

### Anatomical Gifts
```
CLIENT_ANATOMICAL_GIFT
SPOUSE_ANATOMICAL_GIFT
```

---

## 📂 Where to Save Your PDF Template

**Local Path:**
```
/Users/rozsagyene/estate-planning-app/public/templates/estate_planning_portfolio_template.pdf
```

**GitHub:**
Upload to: `public/templates/` folder in your repository

---

## 🔧 How to Use the Template

### Option A: Replace Existing Function

Edit `src/services/documentGenerator.js`:

```javascript
import { generateFromPDFTemplate } from './pdfTemplateService';

export const generateCompleteEstatePlanningPackage = async (formData) => {
  // Use PDF template instead of JavaScript templates
  return await generateFromPDFTemplate(formData);
};
```

### Option B: Add as Alternative Option

Keep existing templates and add PDF template as an option in the UI.

---

## ✅ Testing Your Template

1. **Create template PDF** with form fields

2. **Save to** `public/templates/estate_planning_portfolio_template.pdf`

3. **Load sample data** in the app

4. **Click "Save Complete Estate Plan"**

5. **Download and check** - all fields should be filled

---

## 🎨 Template Design Tips

1. **Use clear field names** - exactly as specified above

2. **Make fields large enough** for data

3. **Use multiple pages** as needed

4. **Add section headers** and formatting

5. **Test with long names/addresses** to ensure fields fit

6. **Include page numbers**

7. **Add your law firm branding**

---

## 📝 Example Template Structure

```
Page 1: Cover Page
- CLIENT_FULL_NAME
- CURRENT_DATE
- TRUST_NAME

Page 2: Table of Contents
- (static text)

Page 3: Client Information
- CLIENT_FIRST_NAME
- CLIENT_LAST_NAME
- CLIENT_ADDRESS
- CLIENT_CITY, CLIENT_STATE CLIENT_ZIP
- CLIENT_PHONE
- CLIENT_EMAIL

Page 4: Spouse Information (if joint)
- SPOUSE_FULL_NAME
- SPOUSE_ADDRESS
- etc.

Page 5: Children
- CHILDREN_LIST

Page 6: Successor Trustees
- TRUSTEES_LIST

... and so on
```

---

## ⚠️ Important Notes

1. **Field names must match exactly** (case-sensitive)

2. **Use underscores** not spaces or hyphens

3. **Test with empty data** to ensure no crashes

4. **Use multiline fields** for lists (CHILDREN_LIST, TRUSTEES_LIST, etc.)

5. **Some fields auto-format** (like lists) - use those for convenience

---

## 🔄 Updating Your Template

1. **Edit the PDF** in Adobe Acrobat or PDFescape

2. **Save with same filename**

3. **Upload to** `public/templates/` folder

4. **Push to GitHub**

5. **App will use new template** automatically

---

## 🆘 Troubleshooting

**Problem:** Fields not filling
- Check field names match exactly
- Verify PDF is in correct location
- Check browser console for errors

**Problem:** Data cut off
- Make fields larger in template
- Use multi-line fields for long text

**Problem:** Template not loading
- Verify file path is correct
- Check file exists in `public/templates/`
- Clear browser cache

---

## 📚 Resources

**Free PDF Form Tools:**
- PDFescape: https://www.pdfescape.com/
- PDF-XChange Editor: Free version available
- LibreOffice Draw: Can add form fields

**Professional Tools:**
- Adobe Acrobat Pro DC (paid)
- Foxit PDF Editor (paid)

---

## 🎯 Next Steps

1. ✅ Create your PDF template with form fields
2. ✅ Name fields using the list above
3. ✅ Save to `public/templates/estate_planning_portfolio_template.pdf`
4. ✅ Test in the app
5. ✅ Adjust field sizes/positions as needed

This approach is **much easier to maintain** than 17 separate JavaScript files!
