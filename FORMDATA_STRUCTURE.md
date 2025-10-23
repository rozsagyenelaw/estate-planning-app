# FormData Complete Structure

This is the EXACT structure of the `formData` object passed to all templates.

```javascript
formData = {
  // ===== TRUST TYPE CONFIGURATION =====
  trustType: "single" | "joint" | "single_irrevocable" | "joint_irrevocable",
  isJoint: true | false,
  isIrrevocable: true | false,
  isRestatement: true | false,
  originalTrustName: "The Smith Living Trust",
  originalTrustDate: "January 1, 2020",
  customTrustName: true | false,
  trustName: "The Smith Living Trust",
  currentDate: "October 23, 2024",  // Auto-generated

  // ===== CLIENT INFORMATION =====
  client: {
    notaryDate: "2024-10-23",
    firstName: "John",
    middleName: "Michael",
    lastName: "Smith",
    dateOfBirth: "1980-05-15",
    sex: "male" | "female",
    ssn: "123-45-6789",
    maritalStatus: "married" | "single" | "divorced" | "widowed",
    email: "john@example.com",
    phone: "(555) 123-4567",
    address: "123 Main Street",
    city: "Los Angeles",
    zip: "90001",
    county: "Los Angeles",
    state: "CA"
  },

  // ===== SPOUSE INFORMATION (null if single trust) =====
  spouse: {
    notaryDate: "2024-10-23",
    firstName: "Jane",
    middleName: "Marie",
    lastName: "Smith",
    dateOfBirth: "1982-03-20",
    sex: "male" | "female",
    ssn: "987-65-4321",
    maritalStatus: "married",
    email: "jane@example.com",
    phone: "(555) 123-4568",
    address: "123 Main Street",
    city: "Los Angeles",
    zip: "90001",
    county: "Los Angeles",
    state: "CA"
  } | null,

  // ===== CHILDREN =====
  children: [
    {
      firstName: "Tommy",
      lastName: "Smith",
      dateOfBirth: "2010-05-15",
      relation: "son" | "daughter" | "grandson" | "granddaughter" | etc.
    },
    {
      firstName: "Sarah",
      lastName: "Smith",
      dateOfBirth: "2012-08-20",
      relation: "daughter"
    }
  ],

  // ===== SUCCESSOR TRUSTEES =====
  successorTrustees: [
    {
      firstName: "Robert",
      lastName: "Johnson",
      address: "456 Oak Ave, Los Angeles, CA 90002",
      phone: "(555) 234-5678",
      email: "robert@example.com",
      jointly: true | false  // If serving jointly with next trustee
    },
    {
      firstName: "Mary",
      lastName: "Williams",
      address: "789 Pine St, Los Angeles, CA 90003",
      phone: "(555) 345-6789",
      email: "mary@example.com",
      jointly: false
    }
  ],

  // ===== SPECIFIC DISTRIBUTIONS =====
  specificDistributions: [
    {
      beneficiary: "Tommy Smith",
      description: "My vintage car collection",
      distributionType: "age" | "event",
      ageDistributions: [
        { age: "25", percentage: "50" },
        { age: "30", percentage: "50" }
      ],
      eventDescription: "Upon graduation from college",
      descendants: true | false,
      lapse: "descendants" | "residuary" | "other"
    }
  ],

  // ===== RESIDUARY DISTRIBUTION =====
  residuaryBeneficiaries: [
    {
      firstName: "Tommy",
      lastName: "Smith",
      sex: "male" | "female",
      relation: "son" | "daughter" | etc.,
      share: "50",  // Percentage as string
      distributionType: "outright" | "guardian" | "needsTrust",
      ageMilestones: [
        { age: "25", percentage: "50" },
        { age: "30", percentage: "50" }
      ]
    },
    {
      firstName: "Sarah",
      lastName: "Smith",
      sex: "female",
      relation: "daughter",
      share: "50",
      distributionType: "outright",
      ageMilestones: []
    }
  ],
  residuaryEvenSplit: true | false,
  residuaryDistributionType: "descendants" | "other" | "individuals",

  // ===== GENERAL NEEDS TRUSTS =====
  generalNeedsTrusts: [
    {
      beneficiary: "Tommy Smith",
      distributionType: "age" | "condition",
      ageMilestones: [
        { age: "25", percentage: "50" },
        { age: "30", percentage: "50" }
      ],
      condition: "Upon completion of rehabilitation program",
      distributionPercentage: "100",
      specialConditions: "Additional conditions here..."
    }
  ],

  // ===== CHARITABLE DISTRIBUTIONS =====
  charitableDistributions: [
    {
      name: "Red Cross",
      taxId: "12-3456789",
      address: "123 Charity Lane, Los Angeles, CA 90004",
      amount: "10000",      // Dollar amount as string
      percentage: "10"      // Or percentage as string
    }
  ],

  // ===== POUR OVER WILL REPRESENTATIVES =====
  pourOverRepresentatives: {
    client: [
      {
        firstName: "Robert",
        lastName: "Johnson",
        address: "456 Oak Ave, Los Angeles, CA 90002",
        phone: "(555) 234-5678",
        email: "robert@example.com"
      }
    ],
    spouse: [
      {
        firstName: "Mary",
        lastName: "Williams",
        address: "789 Pine St, Los Angeles, CA 90003",
        phone: "(555) 345-6789",
        email: "mary@example.com"
      }
    ]
  },

  // ===== GUARDIANS =====
  guardians: [
    {
      firstName: "Robert",
      lastName: "Johnson",
      address: "456 Oak Ave, Los Angeles, CA 90002",
      phone: "(555) 234-5678",
      jointly: true | false
    }
  ],

  // ===== DURABLE POWER OF ATTORNEY =====
  durablePOA: {
    client: [
      {
        firstName: "Robert",
        lastName: "Johnson",
        address: "456 Oak Ave, Los Angeles, CA 90002",
        phone: "(555) 234-5678",
        email: "robert@example.com",
        jointly: true | false
      }
    ],
    spouse: [
      {
        firstName: "Mary",
        lastName: "Williams",
        address: "789 Pine St, Los Angeles, CA 90003",
        phone: "(555) 345-6789",
        email: "mary@example.com",
        jointly: false
      }
    ]
  },

  // ===== HEALTHCARE POWER OF ATTORNEY =====
  healthcarePOA: {
    client: [
      {
        firstName: "Robert",
        lastName: "Johnson",
        address: "456 Oak Ave, Los Angeles, CA 90002",
        phone: "(555) 234-5678",
        email: "robert@example.com"
      }
    ],
    spouse: [
      {
        firstName: "Mary",
        lastName: "Williams",
        address: "789 Pine St, Los Angeles, CA 90003",
        phone: "(555) 345-6789",
        email: "mary@example.com"
      }
    ]
  },

  // ===== ANATOMICAL GIFTS =====
  anatomicalGifts: {
    client: "none" | "transplantation" | "research" | "transplantOrResearch" | "any",
    spouse: "none" | "transplantation" | "research" | "transplantOrResearch" | "any"
  }
}
```

## Quick Access Cheat Sheet

### Person Fields
```javascript
${formData.client.firstName}
${formData.client.lastName}
${formData.spouse.firstName}     // Check if exists first!
```

### Arrays
```javascript
${formData.children?.length}
${formData.successorTrustees?.map(...)}
${formData.residuaryBeneficiaries?.[0]?.firstName}
```

### Conditionals
```javascript
${formData.isJoint ? 'joint' : 'single'}
${formData.spouse ? formData.spouse.firstName : ''}
${formData.children?.length > 0 ? 'has children' : 'no children'}
```

### Nested Objects
```javascript
${formData.durablePOA.client?.[0]?.firstName}
${formData.pourOverRepresentatives.spouse?.[0]?.lastName}
```

---

## Array Field Details

### All arrays follow this pattern:
1. **Always check if exists:** `formData.array?.`
2. **Check length:** `formData.array?.length || 0`
3. **Map through:** `formData.array?.map((item, index) => ...)`
4. **Access item:** `item.fieldName`
5. **Join output:** `.join('\n')` or `.join('; ')`

---

## Common Mistakes to Avoid

❌ **Don't do this:**
```javascript
${formData.client.middleName}  // Might be empty string
${formData.children[0].name}   // Might not exist
${formData.spouse.firstName}   // spouse might be null
```

✅ **Do this instead:**
```javascript
${formData.client.middleName || ''}
${formData.children?.[0]?.firstName || 'N/A'}
${formData.spouse?.firstName || ''}
```

---

## This is the COMPLETE structure. Nothing is missing.
