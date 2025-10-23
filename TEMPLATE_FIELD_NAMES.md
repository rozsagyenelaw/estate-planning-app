# PDF Template Field Names - Complete Reference

## Overview

This document lists ALL available form field names for your PDF templates.

Use these **exact names** (case-sensitive) when creating form fields in your PDF.

---

## 🔵 Fields Available in ALL Templates

### Client Information
```
CLIENT_FIRST_NAME           - "John"
CLIENT_MIDDLE_NAME          - "Michael"
CLIENT_LAST_NAME            - "Smith"
CLIENT_FULL_NAME            - "John Michael Smith" (auto-combined)
CLIENT_ADDRESS              - "123 Main Street"
CLIENT_CITY                 - "Los Angeles"
CLIENT_STATE                - "CA"
CLIENT_ZIP                  - "90001"
CLIENT_COUNTY               - "Los Angeles"
CLIENT_PHONE                - "(555) 123-4567"
CLIENT_EMAIL                - "john@example.com"
CLIENT_SSN                  - "123-45-6789"
CLIENT_DOB                  - "1980-05-15"
CLIENT_SEX                  - "male" or "female"
CLIENT_MARITAL_STATUS       - "married", "single", "divorced", "widowed"
CLIENT_NOTARY_DATE          - "2024-10-23"
```

### Trust Information
```
TRUST_NAME                  - "The Smith Living Trust"
TRUST_TYPE                  - "single", "joint", "single_irrevocable", "joint_irrevocable"
IS_JOINT                    - "Yes" or "No"
IS_IRREVOCABLE              - "Yes" or "No"
IS_RESTATEMENT              - "Yes" or "No"
ORIGINAL_TRUST_NAME         - "The Smith Living Trust" (if restatement)
ORIGINAL_TRUST_DATE         - "January 1, 2020" (if restatement)
CURRENT_DATE                - "October 23, 2024"
```

### Children
```
NUM_CHILDREN                - "2" (number of children)
CHILDREN_LIST               - Auto-formatted list:
                              "1. Tommy Smith, born 2010-05-15
                               2. Sarah Smith, born 2012-08-20"

Individual children (up to 10):
CHILD_1_FIRST_NAME          - "Tommy"
CHILD_1_LAST_NAME           - "Smith"
CHILD_1_DOB                 - "2010-05-15"
CHILD_1_RELATION            - "son", "daughter", etc.
CHILD_1_FULL_NAME           - "Tommy Smith"

CHILD_2_FIRST_NAME
CHILD_2_LAST_NAME
CHILD_2_DOB
CHILD_2_RELATION
CHILD_2_FULL_NAME

... up to CHILD_10_...
```

### Successor Trustees
```
NUM_TRUSTEES                - "2" (number of trustees)
TRUSTEES_LIST               - Auto-formatted list:
                              "1. Robert Johnson
                               2. Mary Williams"

Individual trustees (up to 10):
TRUSTEE_1_FIRST_NAME        - "Robert"
TRUSTEE_1_LAST_NAME         - "Johnson"
TRUSTEE_1_ADDRESS           - "456 Oak Ave, Los Angeles, CA 90002"
TRUSTEE_1_PHONE             - "(555) 234-5678"
TRUSTEE_1_EMAIL             - "robert@example.com"
TRUSTEE_1_FULL_NAME         - "Robert Johnson"

TRUSTEE_2_FIRST_NAME
TRUSTEE_2_LAST_NAME
TRUSTEE_2_ADDRESS
TRUSTEE_2_PHONE
TRUSTEE_2_EMAIL
TRUSTEE_2_FULL_NAME

... up to TRUSTEE_10_...
```

### Guardians
```
GUARDIANS_LIST              - Auto-formatted list:
                              "1. Robert Johnson
                               2. Mary Williams"

Individual guardians (up to 5):
GUARDIAN_1_FIRST_NAME
GUARDIAN_1_LAST_NAME
GUARDIAN_1_ADDRESS
GUARDIAN_1_PHONE

GUARDIAN_2_FIRST_NAME
... up to GUARDIAN_5_...
```

---

## 🟢 Fields Available in JOINT Templates Only

### Spouse Information
```
SPOUSE_FIRST_NAME           - "Jane"
SPOUSE_MIDDLE_NAME          - "Marie"
SPOUSE_LAST_NAME            - "Smith"
SPOUSE_FULL_NAME            - "Jane Marie Smith" (auto-combined)
SPOUSE_ADDRESS              - "123 Main Street"
SPOUSE_CITY                 - "Los Angeles"
SPOUSE_STATE                - "CA"
SPOUSE_ZIP                  - "90001"
SPOUSE_COUNTY               - "Los Angeles"
SPOUSE_PHONE                - "(555) 123-4568"
SPOUSE_EMAIL                - "jane@example.com"
SPOUSE_SSN                  - "987-65-4321"
SPOUSE_DOB                  - "1982-03-20"
SPOUSE_SEX                  - "male" or "female"
SPOUSE_NOTARY_DATE          - "2024-10-23"
```

---

## 🟣 Fields Available in COMPLETE ESTATE PLANNING Templates Only

### Power of Attorney Agents - Client
```
CLIENT_POA_1_FIRST_NAME
CLIENT_POA_1_LAST_NAME
CLIENT_POA_1_ADDRESS
CLIENT_POA_1_PHONE

CLIENT_POA_2_FIRST_NAME
CLIENT_POA_2_LAST_NAME
CLIENT_POA_2_ADDRESS
CLIENT_POA_2_PHONE

... up to CLIENT_POA_5_...
```

### Power of Attorney Agents - Spouse (Joint only)
```
SPOUSE_POA_1_FIRST_NAME
SPOUSE_POA_1_LAST_NAME
SPOUSE_POA_1_ADDRESS
SPOUSE_POA_1_PHONE

SPOUSE_POA_2_FIRST_NAME
... up to SPOUSE_POA_5_...
```

### Healthcare Agents - Client
```
CLIENT_HEALTHCARE_1_FIRST_NAME
CLIENT_HEALTHCARE_1_LAST_NAME
CLIENT_HEALTHCARE_1_PHONE

CLIENT_HEALTHCARE_2_FIRST_NAME
CLIENT_HEALTHCARE_2_LAST_NAME
CLIENT_HEALTHCARE_2_PHONE

... up to CLIENT_HEALTHCARE_5_...
```

### Healthcare Agents - Spouse (Joint only)
```
SPOUSE_HEALTHCARE_1_FIRST_NAME
SPOUSE_HEALTHCARE_1_LAST_NAME
SPOUSE_HEALTHCARE_1_PHONE

SPOUSE_HEALTHCARE_2_FIRST_NAME
... up to SPOUSE_HEALTHCARE_5_...
```

### Anatomical Gifts
```
CLIENT_ANATOMICAL_GIFT      - "none", "transplantation", "research",
                              "transplantOrResearch", or "any"
SPOUSE_ANATOMICAL_GIFT      - Same values as client (Joint only)
```

---

## 📋 Template-Specific Recommendations

### For Living Trust Templates (Trust Document Only)
**Use these fields:**
- All Client fields
- Spouse fields (if joint)
- Trust information
- Children
- Successor Trustees
- Guardians

**Skip these fields:**
- POA agents
- Healthcare agents
- Anatomical gifts (unless included in trust)

### For Complete Estate Planning Templates
**Use ALL fields listed above**

The complete package includes:
- Cover page (CLIENT_FULL_NAME, TRUST_NAME, CURRENT_DATE)
- Table of contents
- Client/Spouse information pages
- Trust certificate and affidavit
- Pour Over Wills (separate for client and spouse)
- Nominations page
- Confirmation pages
- POA documents (CLIENT_POA_1_..., SPOUSE_POA_1_...)
- Healthcare directives (CLIENT_HEALTHCARE_1_..., SPOUSE_HEALTHCARE_1_...)
- HIPAA authorizations
- Property assignment and memorandum

---

## 💡 Tips for Creating Forms

### 1. Use Multi-line Fields for Lists
Fields like `CHILDREN_LIST`, `TRUSTEES_LIST`, `GUARDIANS_LIST` contain formatted lists.
Make these fields tall enough (multi-line text fields).

### 2. Size Fields Appropriately
- Names: ~200px wide
- Addresses: ~400px wide
- Phone/SSN: ~150px wide
- Full address lines: ~500px wide

### 3. Optional Fields
Some fields may be empty (middle names, emails, etc.). Design your template so empty fields don't look broken.

### 4. Conditional Fields
**Single templates:** Don't include SPOUSE_* fields
**Joint templates:** Include both CLIENT_* and SPOUSE_* fields

### 5. Duplicate Sections for Joint Templates
For complete estate planning packages, create separate sections:
- Pour Over Will - Client (use CLIENT_* fields)
- Pour Over Will - Spouse (use SPOUSE_* fields)
- Durable POA - Client (use CLIENT_POA_* fields)
- Durable POA - Spouse (use SPOUSE_POA_* fields)
- Healthcare Directive - Client (use CLIENT_HEALTHCARE_* fields)
- Healthcare Directive - Spouse (use SPOUSE_HEALTHCARE_* fields)

---

## 🎯 Quick Start Checklist

For each template PDF:

1. ✅ Add CLIENT_FIRST_NAME, CLIENT_LAST_NAME, CLIENT_ADDRESS fields
2. ✅ Add SPOUSE_* fields (if joint template)
3. ✅ Add TRUST_NAME, CURRENT_DATE fields
4. ✅ Add CHILDREN_LIST (multi-line)
5. ✅ Add TRUSTEES_LIST (multi-line)
6. ✅ Add GUARDIANS_LIST (multi-line)
7. ✅ Add POA and healthcare fields (if complete package)
8. ✅ Test with sample data

---

## 🔍 Field Name Patterns

All field names follow these patterns:

**Single values:**
```
[PERSON]_[FIELD_NAME]
Examples: CLIENT_FIRST_NAME, SPOUSE_PHONE
```

**Array items:**
```
[ARRAY]_[INDEX]_[FIELD_NAME]
Examples: CHILD_1_FIRST_NAME, TRUSTEE_2_ADDRESS
```

**Lists (auto-formatted):**
```
[ARRAY]_LIST
Examples: CHILDREN_LIST, TRUSTEES_LIST
```

---

## ⚠️ Important Rules

1. **Field names are CASE-SENSITIVE** - must match exactly
2. **Use underscores** (_) not spaces or hyphens
3. **Numbers start at 1** not 0 (CHILD_1, CHILD_2, etc.)
4. **No special characters** in field names
5. **Test with real data** before finalizing

---

This is the complete reference for all 6 template types!
