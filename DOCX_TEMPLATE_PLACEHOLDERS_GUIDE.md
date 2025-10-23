# DOCX Template Placeholders Guide

## ❌ WRONG vs ✅ CORRECT

Docxtemplater does **NOT** execute JavaScript code. It only replaces simple placeholders.

### Client Information

| ❌ WRONG (JavaScript) | ✅ CORRECT (Simple Placeholder) |
|---|---|
| `{formData.client.firstName}` | `{client.firstName}` |
| `{formData.client.middleName}` | `{client.middleName}` |
| `{formData.client.lastName}` | `{client.lastName}` |
| `{formData.client.middleName ? formData.client.middleName + " " : ""}` | `{client.middleName}` (leave blank if no middle name) |
| `{formData.client.firstName} {formData.client.middleName ? formData.client.middleName + " " : ""}{formData.client.lastName}` | `{client.fullName}` (we provide this pre-combined) |

### Trust Information

| ❌ WRONG | ✅ CORRECT |
|---|---|
| `{formData.trustName}` | `{trust.name}` |
| `{formData.currentDate}` | `{trust.currentDate}` |
| `{formData.isJoint}` | `{trust.isJoint}` (will be "Yes" or "No") |
| `{formData.isIrrevocable}` | `{trust.isIrrevocable}` (will be "Yes" or "No") |

### Children Information

| ❌ WRONG (JavaScript) | ✅ CORRECT |
|---|---|
| `{formData.children && formData.children.length === 1 ? \`I have one child...\` : \`I have ${formData.children.length} children...\`}` | Use `{childrenList}` which provides formatted list |
| `{formData.children ? formData.children.length : 0}` | `{numChildren}` |
| `{new Date(formData.children[0].dateOfBirth).toLocaleDateString(...)}` | Dates are already formatted in `{childrenList}` |
| `{formData.children[0].firstName}` | Use loop syntax (see below) OR use `{childrenList}` |

### Arrays and Lists

**For displaying formatted lists**, use these pre-formatted placeholders:

✅ **Recommended approach** - Use pre-formatted lists:
```
Children:
{childrenList}
```

This will output:
```
Children:
1. Sarah Smith, born 03/20/2005
2. David Smith, born 07/10/2008
```

**For conditional logic** - Use docxtemplater conditionals:
```
{#children}
I have children named: {firstName} {lastName}
{/children}
{^children}
I have no children.
{/children}
```

### Successor Trustees

| ❌ WRONG | ✅ CORRECT |
|---|---|
| `{formData.successorTrustees[0] ? \`${formData.successorTrustees[0].firstName}\` : ''}` | `{trusteesList}` for formatted list |
| Loop through successorTrustees array | Use `{#successorTrustees}...{/successorTrustees}` |

### Address Information

| ❌ WRONG | ✅ CORRECT |
|---|---|
| `{formData.client.address}` | `{client.address}` |
| `{formData.client.city}` | `{client.city}` |
| `{formData.client.state}` | `{client.state}` |
| `{formData.client.zip}` | `{client.zip}` |

## Complete List of Available Placeholders

### Client Section
```
{client.firstName}
{client.middleName}
{client.lastName}
{client.fullName}          ← Pre-combined: "John Michael Smith"
{client.address}
{client.city}
{client.state}
{client.zip}
{client.county}
{client.phone}
{client.email}
{client.ssn}
{client.dateOfBirth}
{client.sex}
{client.maritalStatus}
{client.notaryDate}
```

### Spouse Section (for joint trusts)
```
{spouse.firstName}
{spouse.middleName}
{spouse.lastName}
{spouse.fullName}
{spouse.address}
{spouse.city}
{spouse.state}
{spouse.zip}
{spouse.county}
{spouse.phone}
{spouse.email}
{spouse.ssn}
{spouse.dateOfBirth}
{spouse.sex}
{spouse.notaryDate}
```

### Trust Section
```
{trust.name}              ← "Smith Family Living Trust"
{trust.type}              ← "single" or "joint"
{trust.isJoint}           ← "Yes" or "No"
{trust.isIrrevocable}     ← "Yes" or "No"
{trust.isRestatement}     ← "Yes" or "No"
{trust.originalTrustName}
{trust.originalTrustDate}
{trust.currentDate}       ← "December 23, 2024"
```

### Children Section
```
{numChildren}             ← Number: 2
{childrenList}            ← Formatted: "1. Sarah Smith, born 03/20/2005\n2. David Smith, born 07/10/2008"
```

Or loop through individual children:
```
{#children}
Name: {firstName} {lastName}
Date of Birth: {dateOfBirth}
Relation: {relation}
{/children}
```

### Trustees Section
```
{numTrustees}             ← Number: 1
{trusteesList}            ← Formatted: "1. Jane Doe"
```

Or loop:
```
{#successorTrustees}
Name: {firstName} {lastName}
Address: {address}
Phone: {phone}
Email: {email}
{/successorTrustees}
```

### Guardians Section
```
{guardiansList}           ← Formatted list
```

Or loop:
```
{#guardians}
Name: {firstName} {lastName}
Address: {address}
Phone: {phone}
{/guardians}
```

### POA and Healthcare Directives
```
{#clientPOA}
  {firstName} {lastName}
{/clientPOA}

{#spousePOA}
  {firstName} {lastName}
{/spousePOA}

{#clientHealthcare}
  {firstName} {lastName}
{/clientHealthcare}

{#spouseHealthcare}
  {firstName} {lastName}
{/spouseHealthcare}

{anatomicalGifts.client}    ← "none", "any", etc.
{anatomicalGifts.spouse}
```

## How to Fix Your Templates

### Step 1: Find and Replace

1. Open your DOCX template in Word
2. Use Find & Replace (Ctrl+H or Cmd+H):
   - Find: `{formData.client.`
   - Replace: `{client.`
   - Click "Replace All"

3. Find & Replace again:
   - Find: `{formData.spouse.`
   - Replace: `{spouse.`
   - Click "Replace All"

4. Find & Replace again:
   - Find: `{formData.trustName}`
   - Replace: `{trust.name}`
   - Click "Replace All"

5. Find & Replace again:
   - Find: `{formData.currentDate}`
   - Replace: `{trust.currentDate}`
   - Click "Replace All"

### Step 2: Remove JavaScript Code

Find and DELETE all JavaScript code like:
- `{formData.client.middleName ? formData.client.middleName + " " : ""}`
- `{formData.children && formData.children.length === 1 ? ...}`
- `{new Date(...).toLocaleDateString(...)}`

Replace them with simple placeholders or pre-formatted lists:
- For middle name handling: Just use `{client.middleName}` (it will be blank if not provided)
- For children info: Use `{childrenList}` instead of complex logic
- For dates: They're already formatted in the pre-formatted lists

### Step 3: Replace Conditional Logic

❌ **OLD (JavaScript):**
```
{formData.children && formData.children.length === 1 ? `I have one child` : `I have ${formData.children.length} children`}
```

✅ **NEW (Docxtemplater conditionals):**
```
I have {numChildren} {#children}{numChildren == 1}child{/}{numChildren > 1}children{/}{/children}
```

Or simpler:
```
I have {numChildren} child(ren)
```

### Step 4: Save and Test

After making changes:
1. Save the DOCX file
2. Upload to `public/templates/` folder
3. Test in the application

## Example Template Content

Here's what a section of your template should look like:

```
THE {trust.name}

This Living Trust Agreement is made on {trust.currentDate} by and between
{client.fullName}, of {client.address}, {client.city}, {client.state} {client.zip},
hereinafter referred to as the "Trustor" and "Trustee".

The Trustor has the following children:
{childrenList}

The successor trustees shall be:
{trusteesList}

IN WITNESS WHEREOF, the Trustor has executed this Trust Agreement on {trust.currentDate}.

_______________________________
{client.fullName}
Trustor and Initial Trustee
```

## Need Help?

If you're unsure about a placeholder, check the `src/services/docxTemplateService.js` file in the `prepareTemplateData()` function to see all available data fields.
