# Complete Template Reference Guide

## Template File Locations

All template files are located in:
```
/Users/rozsagyene/estate-planning-app/src/templates/
```

## Template Types

There are TWO types of templates in this app:

### 1. Function-Based Templates (Plain Text)
These return plain text strings and are used for Living Trusts:
- `singleLivingTrust.js` - Single living trust
- `jointLivingTrust.js` - Joint living trust
- `singleIrrevocableTrust.js` - Single irrevocable trust
- `jointIrrevocableTrust.js` - Joint irrevocable trust

**Syntax:** Use JavaScript template literals with `${formData.field}`

**Example:**
```javascript
export const singleLivingTrustTemplate = (formData) => `
Article One
The Grantor is ${formData.client.firstName} ${formData.client.lastName}.
The Trustee is ${formData.client.firstName} ${formData.client.lastName}.
I have ${formData.children?.length || 0} children.
`;
```

### 2. HTML-Based Templates (For Other Documents)
These return HTML strings (converted to PDF):
- All other templates (POA, Healthcare, etc.)

**Syntax:** Use `{{PLACEHOLDER}}` format (processed by templateEngine.js)

---

# COMPLETE PLACEHOLDER REFERENCE

## 1. CLIENT INFORMATION

### Basic Info
```javascript
${formData.client.firstName}         // "John"
${formData.client.middleName}        // "Michael" (can be empty)
${formData.client.lastName}          // "Smith"
${formData.client.notaryDate}        // "2024-10-23"
${formData.client.dateOfBirth}       // "1980-05-15"
${formData.client.sex}               // "male" or "female"
${formData.client.maritalStatus}     // "married", "single", "divorced", "widowed"
```

### Contact Info
```javascript
${formData.client.email}             // "john@example.com"
${formData.client.phone}             // "(555) 123-4567"
${formData.client.ssn}               // "123-45-6789"
```

### Address
```javascript
${formData.client.address}           // "123 Main Street"
${formData.client.city}              // "Los Angeles"
${formData.client.state}             // "CA"
${formData.client.county}            // "Los Angeles"
${formData.client.zip}               // "90001"
```

### Full Address String
```javascript
${formData.client.address}, ${formData.client.city}, ${formData.client.state} ${formData.client.zip}
// "123 Main Street, Los Angeles, CA 90001"
```

---

## 2. SPOUSE INFORMATION (For Joint Trusts)

**Check if spouse exists:**
```javascript
${formData.isJoint ? 'joint trust content' : 'single trust content'}
${formData.spouse ? formData.spouse.firstName : ''}
```

### All Spouse Fields (Same structure as client)
```javascript
${formData.spouse.firstName}
${formData.spouse.middleName}
${formData.spouse.lastName}
${formData.spouse.notaryDate}
${formData.spouse.dateOfBirth}
${formData.spouse.sex}
${formData.spouse.maritalStatus}
${formData.spouse.email}
${formData.spouse.phone}
${formData.spouse.ssn}
${formData.spouse.address}
${formData.spouse.city}
${formData.spouse.state}
${formData.spouse.county}
${formData.spouse.zip}
```

---

## 3. TRUST INFORMATION

### Trust Type & Flags
```javascript
${formData.trustType}                // "single", "joint", "single_irrevocable", "joint_irrevocable"
${formData.isJoint}                  // true or false
${formData.isIrrevocable}            // true or false
${formData.isRestatement}            // true or false
${formData.customTrustName}          // true or false
${formData.trustName}                // "The Smith Living Trust"
```

### Restatement Info
```javascript
${formData.originalTrustName}        // "The Smith Living Trust"
${formData.originalTrustDate}        // "January 1, 2020"
```

### Dates
```javascript
${formData.currentDate}              // "October 23, 2024" (set automatically)
```

---

## 4. CHILDREN

### Check if children exist
```javascript
${formData.children?.length || 0}    // Returns number of children
${formData.children && formData.children.length > 0 ? 'has children' : 'no children'}
```

### Loop through children
```javascript
${formData.children?.map((child, index) => `
  ${child.firstName} ${child.lastName}, born on ${child.dateOfBirth}
`).join('; ')}
```

### Individual child fields
```javascript
formData.children[0].firstName       // First child's first name
formData.children[0].lastName        // First child's last name
formData.children[0].dateOfBirth     // "2010-05-15"
formData.children[0].relation        // "son", "daughter"
```

### Complete children example
```javascript
I have ${formData.children?.length || 0} children: ${formData.children?.map((child, i) =>
  `${child.firstName} ${child.lastName}, born on ${child.dateOfBirth}${i < formData.children.length - 1 ? ';' : '.'}`
).join(' ')}
```

---

## 5. SUCCESSOR TRUSTEES

### Check if trustees exist
```javascript
${formData.successorTrustees?.length || 0}
```

### Loop through trustees
```javascript
${formData.successorTrustees?.map((trustee, index) => `
${index + 1}. ${trustee.firstName} ${trustee.lastName}
   Address: ${trustee.address}
   Phone: ${trustee.phone}
   Email: ${trustee.email}
`).join('\n')}
```

### Individual trustee fields
```javascript
formData.successorTrustees[0].firstName
formData.successorTrustees[0].lastName
formData.successorTrustees[0].address
formData.successorTrustees[0].phone
formData.successorTrustees[0].email
formData.successorTrustees[0].jointly      // true/false (if serving jointly)
```

### Trustee succession list
```javascript
${formData.successorTrustees?.map((t, i) =>
  `${t.firstName} ${t.lastName}${i < formData.successorTrustees.length - 1 ? '; then' : '.'}`
).join('\n')}
```

---

## 6. SPECIFIC DISTRIBUTIONS

### Check if distributions exist
```javascript
${formData.specificDistributions?.length || 0}
```

### Loop through distributions
```javascript
${formData.specificDistributions?.map((dist, index) => `
  Beneficiary: ${dist.beneficiary}
  Description: ${dist.description}
  Distribution Type: ${dist.distributionType}
  ${dist.ageDistributions?.map(age => `${age.percentage}% at age ${age.age}`).join(', ')}
`).join('\n')}
```

### Individual distribution fields
```javascript
formData.specificDistributions[0].beneficiary
formData.specificDistributions[0].description
formData.specificDistributions[0].distributionType    // "age" or "event"
formData.specificDistributions[0].ageDistributions    // Array of {age, percentage}
formData.specificDistributions[0].eventDescription
formData.specificDistributions[0].descendants         // true/false
formData.specificDistributions[0].lapse               // "descendants", "residuary", "other"
```

---

## 7. RESIDUARY BENEFICIARIES

### Check if beneficiaries exist
```javascript
${formData.residuaryBeneficiaries?.length || 0}
```

### Loop through beneficiaries
```javascript
${formData.residuaryBeneficiaries?.map((ben, index) => `
  ${ben.firstName} ${ben.lastName} (${ben.relation}): ${ben.share}%
`).join('\n')}
```

### Individual beneficiary fields
```javascript
formData.residuaryBeneficiaries[0].firstName
formData.residuaryBeneficiaries[0].lastName
formData.residuaryBeneficiaries[0].sex              // "male" or "female"
formData.residuaryBeneficiaries[0].relation         // "son", "daughter", etc.
formData.residuaryBeneficiaries[0].share            // "50" (percentage)
formData.residuaryBeneficiaries[0].distributionType // "outright", "guardian", "needsTrust"
formData.residuaryBeneficiaries[0].ageMilestones    // Array of {age, percentage}
```

### Residuary settings
```javascript
${formData.residuaryEvenSplit}                      // true/false
${formData.residuaryDistributionType}               // "descendants", "other", "individuals"
```

---

## 8. GENERAL NEEDS TRUSTS

### Check if needs trusts exist
```javascript
${formData.generalNeedsTrusts?.length || 0}
```

### Loop through needs trusts
```javascript
${formData.generalNeedsTrusts?.map((trust, index) => `
  Beneficiary: ${trust.beneficiary}
  Type: ${trust.distributionType}
  Percentage: ${trust.distributionPercentage}%
`).join('\n')}
```

### Individual needs trust fields
```javascript
formData.generalNeedsTrusts[0].beneficiary
formData.generalNeedsTrusts[0].distributionType     // "age" or "condition"
formData.generalNeedsTrusts[0].ageMilestones        // Array of {age, percentage}
formData.generalNeedsTrusts[0].condition
formData.generalNeedsTrusts[0].distributionPercentage
formData.generalNeedsTrusts[0].specialConditions
```

---

## 9. CHARITABLE DISTRIBUTIONS

### Check if charities exist
```javascript
${formData.charitableDistributions?.length || 0}
```

### Loop through charities
```javascript
${formData.charitableDistributions?.map((charity, index) => `
  ${charity.name}
  Tax ID: ${charity.taxId}
  Address: ${charity.address}
  Amount: ${charity.amount || charity.percentage + '%'}
`).join('\n')}
```

### Individual charity fields
```javascript
formData.charitableDistributions[0].name
formData.charitableDistributions[0].taxId
formData.charitableDistributions[0].address
formData.charitableDistributions[0].amount         // Dollar amount
formData.charitableDistributions[0].percentage     // Percentage
```

---

## 10. GUARDIANS

### Check if guardians exist
```javascript
${formData.guardians?.length || 0}
```

### Loop through guardians
```javascript
${formData.guardians?.map((guardian, index) => `
${index + 1}. ${guardian.firstName} ${guardian.lastName}
   Address: ${guardian.address}
   Phone: ${guardian.phone}
   Jointly: ${guardian.jointly ? 'Yes' : 'No'}
`).join('\n')}
```

### Individual guardian fields
```javascript
formData.guardians[0].firstName
formData.guardians[0].lastName
formData.guardians[0].address
formData.guardians[0].phone
formData.guardians[0].jointly                      // true/false
```

---

## 11. POUR OVER WILL REPRESENTATIVES

### Client's representatives
```javascript
${formData.pourOverRepresentatives.client?.length || 0}

${formData.pourOverRepresentatives.client?.map((rep, index) => `
${index + 1}. ${rep.firstName} ${rep.lastName}
`).join('\n')}
```

### Spouse's representatives (for joint trusts)
```javascript
${formData.pourOverRepresentatives.spouse?.length || 0}

${formData.pourOverRepresentatives.spouse?.map((rep, index) => `
${index + 1}. ${rep.firstName} ${rep.lastName}
`).join('\n')}
```

### Individual representative fields
```javascript
formData.pourOverRepresentatives.client[0].firstName
formData.pourOverRepresentatives.client[0].lastName
formData.pourOverRepresentatives.client[0].address
formData.pourOverRepresentatives.client[0].phone
formData.pourOverRepresentatives.client[0].email
```

---

## 12. DURABLE POWER OF ATTORNEY AGENTS

### Client's POA agents
```javascript
${formData.durablePOA.client?.length || 0}

${formData.durablePOA.client?.map((agent, index) => `
${index + 1}. ${agent.firstName} ${agent.lastName}
   Address: ${agent.address}
   Phone: ${agent.phone}
`).join('\n')}
```

### Spouse's POA agents
```javascript
${formData.durablePOA.spouse?.length || 0}

${formData.durablePOA.spouse?.map((agent, index) => `
${index + 1}. ${agent.firstName} ${agent.lastName}
`).join('\n')}
```

### Individual POA agent fields
```javascript
formData.durablePOA.client[0].firstName
formData.durablePOA.client[0].lastName
formData.durablePOA.client[0].address
formData.durablePOA.client[0].phone
formData.durablePOA.client[0].email
formData.durablePOA.client[0].jointly              // true/false
```

---

## 13. HEALTHCARE POWER OF ATTORNEY AGENTS

### Client's healthcare agents
```javascript
${formData.healthcarePOA.client?.length || 0}

${formData.healthcarePOA.client?.map((agent, index) => `
${index + 1}. ${agent.firstName} ${agent.lastName}
   Phone: ${agent.phone}
`).join('\n')}
```

### Spouse's healthcare agents
```javascript
${formData.healthcarePOA.spouse?.length || 0}

${formData.healthcarePOA.spouse?.map((agent, index) => `
${index + 1}. ${agent.firstName} ${agent.lastName}
`).join('\n')}
```

### Individual healthcare agent fields
```javascript
formData.healthcarePOA.client[0].firstName
formData.healthcarePOA.client[0].lastName
formData.healthcarePOA.client[0].address
formData.healthcarePOA.client[0].phone
formData.healthcarePOA.client[0].email
```

---

## 14. ANATOMICAL GIFTS

### Client's anatomical gift preference
```javascript
${formData.anatomicalGifts.client}
// Values: "none", "transplantation", "research", "transplantOrResearch", "any"
```

### Spouse's anatomical gift preference
```javascript
${formData.anatomicalGifts.spouse}
// Values: "none", "transplantation", "research", "transplantOrResearch", "any"
```

---

## COMMON PATTERNS

### 1. Conditional Content (Joint vs Single)
```javascript
${formData.isJoint ? `
  Joint trust content here
  Grantors: ${formData.client.firstName} ${formData.client.lastName} and ${formData.spouse.firstName} ${formData.spouse.lastName}
` : `
  Single trust content here
  Grantor: ${formData.client.firstName} ${formData.client.lastName}
`}
```

### 2. Person Type (for POA, Healthcare, etc.)
When generating documents for client vs spouse:
```javascript
// In template function parameter
export const durablePowerOfAttorneyTemplate = (personType = 'client') => {
  const person = formData[personType];  // Gets client or spouse

  return `
  I, ${person.firstName} ${person.lastName}...
  `;
}
```

### 3. Safe Array Access
```javascript
${formData.children?.length || 0}               // Returns 0 if undefined
${formData.children?.[0]?.firstName || 'N/A'}   // Returns 'N/A' if not found
```

### 4. Formatting Names
```javascript
// Full name
${formData.client.firstName} ${formData.client.middleName} ${formData.client.lastName}

// Full name with optional middle
${formData.client.firstName}${formData.client.middleName ? ' ' + formData.client.middleName : ''} ${formData.client.lastName}

// Last name, First name format
${formData.client.lastName}, ${formData.client.firstName}
```

### 5. Pluralization
```javascript
I have ${formData.children?.length || 0} ${formData.children?.length === 1 ? 'child' : 'children'}.
```

---

## EXAMPLE TEMPLATE

Here's a complete example showing proper usage:

```javascript
export const sampleTemplate = (formData) => `
LAST WILL AND TESTAMENT OF ${formData.client.firstName.toUpperCase()} ${formData.client.lastName.toUpperCase()}

I, ${formData.client.firstName} ${formData.client.lastName}, a resident of ${formData.client.city}, ${formData.client.state}, being of sound mind, do hereby make this my Last Will and Testament.

ARTICLE ONE - FAMILY INFORMATION
I am ${formData.client.maritalStatus}.${formData.isJoint ? ` My spouse is ${formData.spouse.firstName} ${formData.spouse.lastName}.` : ''}

I have ${formData.children?.length || 0} ${formData.children?.length === 1 ? 'child' : 'children'}:
${formData.children?.map((child, i) =>
  `${i + 1}. ${child.firstName} ${child.lastName}, born on ${child.dateOfBirth}`
).join('\n') || 'None'}

ARTICLE TWO - EXECUTORS
I appoint the following as my personal representative(s), to serve in the order listed:
${formData.pourOverRepresentatives.client?.map((rep, i) =>
  `${i + 1}. ${rep.firstName} ${rep.lastName}`
).join('\n') || 'None designated'}

ARTICLE THREE - GUARDIANS
${formData.guardians && formData.guardians.length > 0 ? `
I nominate the following as guardian(s) of my minor children:
${formData.guardians.map((g, i) =>
  `${i + 1}. ${g.firstName} ${g.lastName}, ${g.address}`
).join('\n')}
` : 'No guardians designated.'}

Executed on ${formData.currentDate}.

_________________________________
${formData.client.firstName} ${formData.client.lastName}, Testator
`;
```

---

## IMPORTANT NOTES

1. **Always use optional chaining (`?.`)** for arrays and nested objects to prevent errors
2. **Provide fallbacks** using `||` operator: `${formData.field || 'default'}`
3. **Check array length** before mapping: `${formData.array?.length > 0 ? ... : ''}`
4. **Use ternary operators** for conditionals: `${condition ? 'yes' : 'no'}`
5. **Join array output** properly: `.join('\n')` or `.join('; ')`
6. **Handle undefined dates** gracefully
7. **Test with empty data** to ensure no crashes

---

## WHERE TO SAVE TEMPLATES

All templates go in:
```
/Users/rozsagyene/estate-planning-app/src/templates/
```

**Naming convention:**
- `singleLivingTrust.js` - Single trust
- `jointLivingTrust.js` - Joint trust
- `durablePowerOfAttorney.js` - POA document
- etc.

**Export format:**
```javascript
export const templateName = (formData) => `
  template content here
`;
```

---

## TESTING YOUR TEMPLATES

After creating/modifying templates:

1. **Load sample data** in the app
2. **Generate document** to see output
3. **Check for:**
   - Missing data (should show fallbacks, not errors)
   - Proper formatting
   - Correct conditionals (joint vs single)
   - Array loops working correctly

---

This is your complete reference. Every field that exists in formData is documented above with exact syntax.
