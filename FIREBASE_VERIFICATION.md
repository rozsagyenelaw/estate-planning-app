# Firebase Setup Verification

## ✅ Step 1: Credentials Added
Your Firebase credentials have been added to `.env`:
- Project ID: `estate-planning-app-b5335`
- Region: Firebase Storage

## 🔧 Step 2: Enable Required Services

### Enable Firestore Database

1. Go to [Firebase Console](https://console.firebase.google.com/project/estate-planning-app-b5335/firestore)
2. Click **"Create database"**
3. Choose **"Start in test mode"** (for development)
4. Select your region (choose closest to you)
5. Click **"Enable"**

### Enable Firebase Storage

1. Go to [Firebase Console](https://console.firebase.google.com/project/estate-planning-app-b5335/storage)
2. Click **"Get started"**
3. Click **"Next"** (keep default security rules)
4. Select your region (same as Firestore)
5. Click **"Done"**

## 🧪 Step 3: Verify Firebase Initialization

Open your app at http://localhost:5175 and check the browser console (F12):

### You should see:
```
Firebase initialized successfully
```

### If you see errors:
- **"Firebase is not initialized"** → Check `.env` file values
- **"Permission denied"** → Enable Firestore and Storage in Firebase Console
- **Other errors** → Check browser console for details

## 🎯 Step 4: Quick Test

Open browser console (F12) on your app and run:

```javascript
// Test if Firebase is loaded
console.log('Firebase config:', import.meta.env.VITE_FIREBASE_PROJECT_ID);
```

Expected output: `estate-planning-app-b5335`

## 🚀 Step 5: Test the Services

Once Firestore and Storage are enabled, you can test:

### Test 1: Save Client Data

```javascript
import { saveClientData } from './services/firestoreService';

const testData = {
  client: {
    firstName: 'Test',
    lastName: 'User',
    email: 'test@example.com'
  },
  trust: {
    name: 'Test Trust',
    date: '2025-01-15'
  }
};

const result = await saveClientData('test_user_123', testData);
console.log('Save result:', result);
// Expected: { success: true, clientId: 'test_user_123', ... }
```

### Test 2: Upload Document

```javascript
import { uploadDocument } from './services/storageService';

// Create a test PDF blob
const testContent = 'This is a test document';
const blob = new Blob([testContent], { type: 'application/pdf' });

const result = await uploadDocument('test_user_123', blob, 'test.pdf');
console.log('Upload result:', result);
// Expected: { success: true, downloadURL: 'https://...', ... }
```

## 📊 Current Setup Status

- [x] Firebase credentials configured
- [ ] Firestore Database enabled (DO THIS NOW)
- [ ] Firebase Storage enabled (DO THIS NOW)
- [ ] Security rules configured (optional for dev)

## 🔐 Security Rules (For Production Later)

### Firestore Rules (Development - Test Mode)
The default test mode rules allow all access for 30 days. This is fine for development.

### Firestore Rules (Production - Recommended)
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /clients/{clientId} {
      // Only authenticated users can read/write
      allow read, write: if request.auth != null;

      // Or allow all for testing (NOT for production!)
      // allow read, write: if true;
    }
  }
}
```

### Storage Rules (Development - Test Mode)
Default test mode rules allow all access for 30 days.

### Storage Rules (Production - Recommended)
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /clients/{clientId}/documents/{document} {
      // Only authenticated users
      allow read, write: if request.auth != null;

      // File size limit (10MB)
      allow write: if request.resource.size < 10 * 1024 * 1024;

      // Or allow all for testing (NOT for production!)
      // allow read, write: if true;
    }
  }
}
```

## ✅ Verification Checklist

Run through this checklist to ensure everything is set up:

- [ ] `.env` file has all Firebase credentials
- [ ] Dev server restarted and running
- [ ] Browser console shows "Firebase initialized successfully"
- [ ] Firestore Database is enabled in Firebase Console
- [ ] Firebase Storage is enabled in Firebase Console
- [ ] Test mode security rules are active (30-day expiration)
- [ ] No errors in browser console when loading the app

## 🎉 Next Steps After Verification

Once everything is working:

1. **Integrate with your form** - Add save functionality to EstatePlanningForm
2. **Add autocomplete** - Connect client search to your form
3. **Test document upload** - Generate and upload a real estate plan
4. **Monitor usage** - Check Firebase Console for data

## 🆘 Troubleshooting

### "Permission denied" when saving data
→ Make sure Firestore is enabled and in test mode

### "Storage object not found"
→ Make sure Storage is enabled in Firebase Console

### "Firebase not initialized"
→ Check `.env` file and restart dev server

### No data showing in Firestore
→ Check Firestore Database tab in Firebase Console after saving

## 📞 Quick Links

- [Your Firebase Console](https://console.firebase.google.com/project/estate-planning-app-b5335)
- [Firestore Dashboard](https://console.firebase.google.com/project/estate-planning-app-b5335/firestore)
- [Storage Dashboard](https://console.firebase.google.com/project/estate-planning-app-b5335/storage)
- [Usage & Billing](https://console.firebase.google.com/project/estate-planning-app-b5335/usage)
