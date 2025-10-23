# How to Create Word (DOCX) Templates

## ✅ Good News!

Word templates with text placeholders **WILL WORK** with the `docxtemplater` library!

You can use placeholders like:
- `${formData.client.firstName}`
- `${formData.spouse.lastName}`
- `${formData.trust.name}`

And the system will automatically replace them with actual data!

---

## 📝 Step-by-Step Guide

### Step 1: Create Your Word Document

1. Open **Microsoft Word** or **Google Docs**
2. Create your document with your professional formatting
3. Type your content as normal

### Step 2: Add Placeholders

Instead of typing actual names/dates, use these placeholders:

#### Client Information
```
${formData.client.firstName}
${formData.client.middleName}
${formData.client.lastName}
${formData.client.fullName}
${formData.client.address}
${formData.client.city}
${formData.client.state}
${formData.client.zip}
${formData.client.county}
${formData.client.phone}
${formData.client.email}
${formData.client.ssn}
${formData.client.dateOfBirth}
${formData.client.sex}
${formData.client.maritalStatus}
${formData.client.notaryDate}
```

#### Spouse Information (for joint trusts)
```
${formData.spouse.firstName}
${formData.spouse.middleName}
${formData.spouse.lastName}
${formData.spouse.fullName}
${formData.spouse.address}
${formData.spouse.city}
${formData.spouse.state}
${formData.spouse.zip}
${formData.spouse.county}
${formData.spouse.phone}
${formData.spouse.email}
${formData.spouse.ssn}
${formData.spouse.dateOfBirth}
${formData.spouse.sex}
${formData.spouse.notaryDate}
```

#### Trust Information
```
${formData.trust.name}
${formData.trust.type}
${formData.trust.isJoint}
${formData.trust.isIrrevocable}
${formData.trust.isRestatement}
${formData.trust.originalTrustName}
${formData.trust.originalTrustDate}
${formData.trust.currentDate}
```

#### Children
```
${formData.numChildren}
${formData.childrenList}
```

For individual children:
```
${formData.children[0].firstName}
${formData.children[0].lastName}
${formData.children[0].dateOfBirth}
${formData.children[1].firstName}
...
```

#### Trustees
```
${formData.numTrustees}
${formData.trusteesList}
```

For individual trustees:
```
${formData.successorTrustees[0].firstName}
${formData.successorTrustees[0].lastName}
${formData.successorTrustees[0].address}
...
```

#### Guardians
```
${formData.guardiansList}
```

For individual guardians:
```
${formData.guardians[0].firstName}
${formData.guardians[0].lastName}
${formData.guardians[0].address}
...
```

#### POA Agents - Client
```
${formData.clientPOA[0].firstName}
${formData.clientPOA[0].lastName}
${formData.clientPOA[0].address}
${formData.clientPOA[0].phone}
...
```

#### POA Agents - Spouse
```
${formData.spousePOA[0].firstName}
${formData.spousePOA[0].lastName}
${formData.spousePOA[0].address}
${formData.spousePOA[0].phone}
...
```

#### Healthcare Agents - Client
```
${formData.clientHealthcare[0].firstName}
${formData.clientHealthcare[0].lastName}
${formData.clientHealthcare[0].phone}
...
```

#### Healthcare Agents - Spouse
```
${formData.spouseHealthcare[0].firstName}
${formData.spouseHealthcare[0].lastName}
${formData.spouseHealthcare[0].phone}
...
```

#### Anatomical Gifts
```
${formData.anatomicalGifts.client}
${formData.anatomicalGifts.spouse}
```

---

## 📋 Example Document

```
THE ${formData.trust.name} LIVING TRUST

This trust agreement is made on ${formData.trust.currentDate} by and between
${formData.client.fullName}, of ${formData.client.address}, ${formData.client.city},
${formData.client.state} ${formData.client.zip}, hereinafter referred to as "Grantor".

The Grantor has ${formData.numChildren} children:
${formData.childrenList}

Successor Trustees:
${formData.trusteesList}
```

---

## 💾 Save Your Template

### Option 1: Save as .docx (Recommended)
1. Click **File** → **Save As**
2. Choose format: **Word Document (.docx)**
3. Name it exactly:
   - `single_living_trust_template.docx`
   - `joint_living_trust_template.docx`
   - `single_irrevocable_trust_template.docx`
   - `joint_irrevocable_trust_template.docx`
   - `single_estate_planning_template.docx`
   - `joint_estate_planning_template.docx`

### Option 2: Google Docs
1. Click **File** → **Download** → **Microsoft Word (.docx)**
2. Rename the downloaded file to match the names above

---

## 📁 Upload Your Templates

Upload your .docx files to:
```
public/templates/
```

**Exact filenames needed:**
- `single_living_trust_template.docx`
- `joint_living_trust_template.docx`
- `single_irrevocable_trust_template.docx`
- `joint_irrevocable_trust_template.docx`
- `single_estate_planning_template.docx`
- `joint_estate_planning_template.docx`

---

## 🚀 How It Works

When you generate a document:

1. System checks for `.docx` template first
2. If found, loads your Word template
3. Replaces all `${...}` placeholders with actual data
4. Returns filled Word document
5. Can also convert to PDF if needed

---

## ✅ Benefits of DOCX Templates

✓ **Easy to create** - Just use Microsoft Word or Google Docs
✓ **Your formatting** - Complete control over design
✓ **Text replacement works** - Unlike PDFs, DOCX supports text replacement
✓ **Easy to edit** - Update template anytime
✓ **Professional output** - Maintains all formatting
✓ **Can convert to PDF** - System can convert DOCX to PDF automatically

---

## 🎯 Pro Tips

### Tip 1: Use Conditional Content
```
{#formData.spouse.firstName}
Spouse: ${formData.spouse.fullName}
{/formData.spouse.firstName}
```
This only shows if spouse exists (for joint trusts).

### Tip 2: Loop Through Children
```
{#formData.children}
${firstName} ${lastName}, born ${dateOfBirth}
{/formData.children}
```

### Tip 3: Test with Placeholder Data
Before uploading, test your template by replacing one placeholder manually to make sure formatting looks good.

---

## 🧪 Testing Your Template

After uploading your .docx file:

1. Go to your app
2. Fill out a form
3. Click "Save Living Trust to Database"
4. Check browser console - you should see:
   ```
   Checking for DOCX template at: /templates/single_living_trust_template.docx
   DOCX template exists: true
   Using DOCX template system for Living Trust
   Filling DOCX template with data
   DOCX template filled successfully
   ```
5. Download the document
6. Open it - all placeholders should be filled with real data!

---

## 🆘 Troubleshooting

### Issue: Placeholders not replaced
**Solution:** Make sure you used the exact placeholder format: `${formData.client.firstName}`

### Issue: "Template not found"
**Solution:** Check filename matches exactly (including .docx extension)

### Issue: "Error filling DOCX template"
**Solution:** Check browser console for details. Usually means placeholder syntax error.

### Issue: Formatting looks weird
**Solution:** Adjust formatting in your Word document and re-upload

---

## 📖 Complete Example Template

See the example in `example_single_trust_template.docx` (if provided) for a complete working example.

---

**Now you can create professional templates in Word with your exact formatting!** 🎉
