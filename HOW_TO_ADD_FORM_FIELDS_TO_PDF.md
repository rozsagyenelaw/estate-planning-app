# How to Add Form Fields to Your PDF Templates

## 🔍 The Problem

Your PDFs have **text placeholders** like `${CLIENT_FIRST_NAME}` but **NO interactive form fields**.

**PDF libraries can ONLY fill form fields, not replace text.**

---

## ✅ The Solution

You need to add **interactive form fields** to your PDFs using Adobe Acrobat or PDFescape.

---

## 📝 What Are Form Fields?

Form fields are interactive elements in PDFs that can be filled programmatically.

**Text Placeholder (doesn't work):**
```
This is the trust of ${CLIENT_FIRST_NAME} ${CLIENT_LAST_NAME}
```

**Form Field (works):**
```
This is the trust of [           ] [           ]
                       ↑             ↑
                 CLIENT_FIRST_NAME  CLIENT_LAST_NAME
```

---

## 🛠️ Option 1: Adobe Acrobat Pro (Recommended)

### Step 1: Open Your PDF
1. Open your PDF in **Adobe Acrobat Pro**
2. Go to **Tools** → **Prepare Form**

### Step 2: Auto-Detect Fields (Optional)
- Acrobat can try to auto-detect where fields should go
- Click **Start** to let it analyze your document

### Step 3: Add Text Fields Manually
1. Click **Add a Text Field** button
2. Click and drag where you want the field
3. **Right-click the field** → **Properties**
4. In the **General** tab, set the **Name** to match our field names:
   - `CLIENT_FIRST_NAME`
   - `CLIENT_LAST_NAME`
   - `CLIENT_ADDRESS`
   - etc.

### Step 4: Remove Old Text Placeholders
1. Go to **Tools** → **Edit PDF**
2. Delete the old `${CLIENT_FIRST_NAME}` text
3. Place the form field where the text was

### Step 5: Repeat for All Fields
- Add form fields for every placeholder in your document
- Use the exact field names from the list below

### Step 6: Save
- **File** → **Save As** to save your PDF with form fields

---

## 🌐 Option 2: PDFescape (Free Online)

### Step 1: Upload Your PDF
1. Go to https://www.pdfescape.com/
2. Click **Free Online** button
3. Click **Upload PDF to PDFescape**
4. Select your PDF file

### Step 2: Add Form Fields
1. Click the **Form Field** tab on the left
2. Click **Text** button
3. Click where you want to place the field
4. Click on the field you just created
5. In the **Object Properties** panel:
   - Set **Name** to the field name (e.g., `CLIENT_FIRST_NAME`)
   - Adjust size and font if needed

### Step 3: Remove Old Text Placeholders
1. Click the **Whiteout** button (eraser icon)
2. Draw a white box over the old `${CLIENT_FIRST_NAME}` text
3. Then add your form field in that location

### Step 4: Repeat for All Fields
- Add form fields for every placeholder

### Step 5: Download
- Click the **Download** button to save your PDF

---

## 📋 Field Names Reference

Use these **exact names** for your form fields:

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

### Spouse Information
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

### Children (Dynamic - up to any number)
```
NUM_CHILDREN
CHILD_1_FIRST_NAME
CHILD_1_LAST_NAME
CHILD_1_DOB
CHILD_1_RELATION
CHILD_1_FULL_NAME
CHILD_2_FIRST_NAME
...
CHILDREN_LIST          (Combined list of all children)
```

### Trustees
```
NUM_TRUSTEES
TRUSTEE_1_FIRST_NAME
TRUSTEE_1_LAST_NAME
TRUSTEE_1_ADDRESS
TRUSTEE_1_PHONE
TRUSTEE_1_EMAIL
TRUSTEE_1_FULL_NAME
TRUSTEE_2_FIRST_NAME
...
TRUSTEES_LIST          (Combined list)
```

### Guardians
```
GUARDIAN_1_FIRST_NAME
GUARDIAN_1_LAST_NAME
GUARDIAN_1_ADDRESS
GUARDIAN_1_PHONE
GUARDIANS_LIST         (Combined list)
```

### Power of Attorney - Client
```
CLIENT_POA_1_FIRST_NAME
CLIENT_POA_1_LAST_NAME
CLIENT_POA_1_ADDRESS
CLIENT_POA_1_PHONE
```

### Power of Attorney - Spouse
```
SPOUSE_POA_1_FIRST_NAME
SPOUSE_POA_1_LAST_NAME
SPOUSE_POA_1_ADDRESS
SPOUSE_POA_1_PHONE
```

### Healthcare - Client
```
CLIENT_HEALTHCARE_1_FIRST_NAME
CLIENT_HEALTHCARE_1_LAST_NAME
CLIENT_HEALTHCARE_1_PHONE
```

### Healthcare - Spouse
```
SPOUSE_HEALTHCARE_1_FIRST_NAME
SPOUSE_HEALTHCARE_1_LAST_NAME
SPOUSE_HEALTHCARE_1_PHONE
```

### Anatomical Gifts
```
CLIENT_ANATOMICAL_GIFT
SPOUSE_ANATOMICAL_GIFT
```

---

## 🎯 Pro Tips

### 1. Use Consistent Naming
- Field names are **case-sensitive**
- Use **UPPERCASE** with **UNDERSCORES**
- Match the names **exactly** as shown above

### 2. Test Your PDF
After adding form fields, you can test if they work:
```bash
node inspect-pdf.js
```

This will show you:
- How many form fields were found
- The names of all form fields
- If any are missing

### 3. Multi-Line Fields
For fields like addresses or lists:
- Make the field taller
- Check "Multi-line" in properties (Adobe Acrobat)

### 4. Save a Template
- Save your original PDF with placeholders
- Save a second version with form fields
- This way you can always go back and edit

---

## 🚀 After Adding Form Fields

Once you've added form fields to your PDFs:

1. **Upload the updated PDFs** to `public/templates/`
2. **Test the app** - form fields should now be filled
3. **Check the browser console** for:
   ```
   Found form fields: 50
   Successfully filled 50 out of 50 fields
   ```

---

## 🆘 Troubleshooting

### Issue: "Found form fields: 0"
**Solution:** You haven't added form fields yet. Follow the steps above.

### Issue: "Successfully filled 5 out of 50 fields"
**Solution:** Field names don't match. Check that field names are **exactly** as shown above.

### Issue: "Form fields found but data not showing"
**Solution:**
- Check that field type is **Text Field** (not checkbox, radio button, etc.)
- Make sure field is large enough to display text
- Check field font size in properties

### Issue: "PDF still shows ${CLIENT_FIRST_NAME}"
**Solution:** You didn't remove the old text placeholder. Use the eraser/whiteout tool to remove it.

---

## 📖 More Resources

- **Adobe Acrobat Tutorial:** https://helpx.adobe.com/acrobat/using/creating-distributing-pdf-forms.html
- **PDFescape Tutorial:** https://www.pdfescape.com/help/
- **Field Names Reference:** See `TEMPLATE_FIELD_NAMES.md` in this project

---

## ✅ Checklist

Before uploading your PDFs:

- [ ] Opened PDF in Adobe Acrobat or PDFescape
- [ ] Added form fields for ALL placeholders
- [ ] Named form fields correctly (exact names from list above)
- [ ] Removed old text placeholders
- [ ] Saved the PDF
- [ ] Tested with `node inspect-pdf.js`
- [ ] Uploaded to `public/templates/`
- [ ] Tested in the app

---

**Once you add form fields, the PDF template system will work perfectly!** 🎉
