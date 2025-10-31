# Law Firm Management Sync Setup Guide

## Overview

This feature automatically syncs estate planning clients to your Law Firm Management app. When you create or edit a client in the Estate Planning App, they automatically appear in the Law Firm Management App.

**Sync Direction:** Estate Planning App → Law Firm Management App (one-way)

---

## Setup Steps

### Step 1: Get Law Firm Firebase Credentials

You need the Firebase credentials from your Law Firm Management app:

1. Go to Firebase Console: https://console.firebase.google.com/
2. Select project: **lawfirm-management-851e5**
3. Click ⚙️ Settings → Project settings
4. Scroll to "Your apps" section
5. Click "Web app" (or create one if it doesn't exist)
6. Copy the firebaseConfig values

### Step 2: Add Credentials to .env File

Open your `.env` file and add these lines:

```env
# Law Firm Management App Sync
VITE_LAWFIRM_FIREBASE_API_KEY=your_actual_api_key_from_firebase
VITE_LAWFIRM_FIREBASE_AUTH_DOMAIN=lawfirm-management-851e5.firebaseapp.com
VITE_LAWFIRM_FIREBASE_PROJECT_ID=lawfirm-management-851e5
VITE_LAWFIRM_FIREBASE_STORAGE_BUCKET=lawfirm-management-851e5.firebasestorage.app
VITE_LAWFIRM_FIREBASE_MESSAGING_SENDER_ID=your_actual_sender_id
VITE_LAWFIRM_FIREBASE_APP_ID=your_actual_app_id
```

**Important:** Replace `your_actual_*` with the real values from Firebase Console.

### Step 3: Restart Development Server

After adding the credentials, restart your dev server:

```bash
# Stop the server (Ctrl+C)
# Then start it again:
npm run dev
```

### Step 4: Test the Sync

1. Go to Estate Planning App
2. Create a new test client or edit an existing one
3. Save the client (either "Save Living Trust" or "Save Complete Estate Plan")
4. Check console for: "✅ Client synced to Law Firm Management successfully"
5. Open Law Firm Management App
6. Go to Clients page
7. You should see the client with category "estate-planning"

---

## How It Works

### Client Creation

When you save a client in Estate Planning App:

1. **Step 1:** Saves to Estate Planning database (estate-planning-app-b5335)
2. **Step 2:** Generates documents (Living Trust or Complete Plan)
3. **Step 3:** Uploads documents to Firebase Storage
4. **Step 4:** **Syncs client to Law Firm database** (lawfirm-management-851e5)
5. **Step 5:** Complete!

### Client Updates

When you edit a client in Estate Planning App:

1. Updates Estate Planning database
2. Optionally regenerates documents
3. **Syncs updates to Law Firm database**

### What Gets Synced

The following client information syncs to Law Firm Management:

```javascript
{
  id: clientId,                          // Same ID in both apps
  name: "John Doe" or "John & Jane Doe", // Full name(s)
  email: client.email,
  phone: client.phone,
  address: "123 Main St, LA, CA, 90001", // Combined address
  category: 'estate-planning',           // Always set to this
  notes: "Created from Estate Planning App
          Trust: The John Doe Living Trust
          Type: Single Trust
          Children: 2",
  createdAt: timestamp,
  tasks: [],                             // Empty arrays
  documents: [],
  events: []
}
```

---

## What Data Mapping Occurs

| Estate Planning App | → | Law Firm Management App |
|---------------------|---|------------------------|
| `client.firstName + lastName` | → | `name` |
| `client.firstName + spouse.firstName` | → | `name` (for joint trusts) |
| `client.email` | → | `email` |
| `client.phone` | → | `phone` |
| `client.address + city + state + zip` | → | `address` (combined) |
| Trust details | → | `notes` |
| Always 'estate-planning' | → | `category` |

---

## Troubleshooting

### "Law Firm sync not configured" Warning

**Problem:** Console shows "Law Firm sync not configured, skipping sync"

**Solution:**
- Check that .env file has `VITE_LAWFIRM_*` variables
- Restart dev server after adding variables
- Verify values are correct (no typos)

### Client Not Appearing in Law Firm App

**Problem:** Client saved but doesn't show in Law Firm Management

**Possible Causes:**
1. **Wrong Firebase project ID** - Double-check it's `lawfirm-management-851e5`
2. **Firebase rules** - Check Firestore security rules allow writes
3. **Network error** - Check browser console for errors
4. **Cache issue** - Hard refresh Law Firm app (Ctrl+Shift+R)

**Solution:**
- Check browser console for errors
- Verify Firebase credentials are correct
- Check Firebase Console → Firestore → clients collection

### Sync Errors

**Problem:** Console shows "Error syncing client to Law Firm Management"

**Solution:**
- Check internet connection
- Verify Firebase project is active
- Check Firestore security rules:
  ```javascript
  allow write: if request.auth != null; // Must allow writes
  ```

---

## Firestore Security Rules

Make sure your Law Firm Management Firestore has these rules (or similar):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /clients/{clientId} {
      // Allow authenticated users to create/update clients
      allow create, update: if request.auth != null;
      allow read: if request.auth != null;
    }
  }
}
```

---

## Optional: Disable Sync

If you want to disable the sync temporarily:

1. Remove or comment out `VITE_LAWFIRM_*` variables in .env
2. Restart dev server
3. Clients will only save to Estate Planning database

---

## FAQ

**Q: Does editing a client in Law Firm App sync back to Estate Planning App?**
A: No, this is one-way sync only (Estate Planning → Law Firm).

**Q: What happens if I delete a client in Estate Planning App?**
A: Currently, it does NOT auto-delete from Law Firm app. You'll need to delete manually there.

**Q: Can I sync existing clients?**
A: Currently no automatic bulk sync. You'd need to edit and re-save each client to trigger sync.

**Q: Will this affect my existing Law Firm clients?**
A: No, it only creates new clients or updates existing ones with matching IDs. It won't modify unrelated clients.

**Q: What if a client already exists in Law Firm app with the same email?**
A: It creates a new client with a unique ID. It doesn't check for duplicates by email.

---

## Need Help?

Check the browser console for detailed sync messages:
- ✅ Green checkmarks = Success
- ⚠️ Yellow warnings = Sync disabled
- ❌ Red errors = Something went wrong

All sync operations are logged to the console with details.
