# Apply Firebase Security Rules

Since you enabled Firestore and Storage in **production mode**, you need to update the security rules to allow access.

## 🔧 Step 1: Update Firestore Rules

1. Go to [Firestore Rules](https://console.firebase.google.com/project/estate-planning-app-b5335/firestore/rules)

2. **Replace the existing rules** with this:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /clients/{clientId} {
      // Allow all access for development
      allow read, write: if true;
    }
  }
}
```

3. Click **"Publish"**

## 🔧 Step 2: Update Storage Rules

1. Go to [Storage Rules](https://console.firebase.google.com/project/estate-planning-app-b5335/storage/rules)

2. **Replace the existing rules** with this:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /clients/{clientId}/documents/{document} {
      // Allow all access for development
      allow read, write: if true;

      // Limit file size to 10MB
      allow write: if request.resource.size < 10 * 1024 * 1024;
    }
  }
}
```

3. Click **"Publish"**

## ✅ Verify It's Working

After updating the rules, test in browser console (F12):

```javascript
// Import the test function
import { saveClientData } from './src/services/firestoreService.js';

// Test save
const testData = {
  client: { firstName: 'Test', lastName: 'User' },
  trust: { name: 'Test Trust', date: '2025-01-15' }
};

const result = await saveClientData('test_123', testData);
console.log('Result:', result);
// Should show: { success: true, clientId: 'test_123', ... }
```

Then check [Firestore Data](https://console.firebase.google.com/project/estate-planning-app-b5335/firestore/data) to see the saved record!

## 🔐 Security Note

⚠️ **Current rules allow ANYONE to read/write** ⚠️

This is fine for development, but for production you should:
1. Enable Firebase Authentication
2. Update rules to require authentication:

```javascript
// Production-ready rules
allow read, write: if request.auth != null;
```

## 🚀 Quick Links

- [Firestore Rules Editor](https://console.firebase.google.com/project/estate-planning-app-b5335/firestore/rules)
- [Storage Rules Editor](https://console.firebase.google.com/project/estate-planning-app-b5335/storage/rules)
- [Firestore Data Viewer](https://console.firebase.google.com/project/estate-planning-app-b5335/firestore/data)
- [Storage Files Viewer](https://console.firebase.google.com/project/estate-planning-app-b5335/storage/files)
