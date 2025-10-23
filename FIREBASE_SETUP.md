# Firebase Setup Guide

This guide will help you set up Firebase for the Estate Planning App to enable client data storage and document management.

## Prerequisites

- A Google account
- Access to [Firebase Console](https://console.firebase.google.com/)

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"** or **"Create a project"**
3. Enter a project name (e.g., "Estate Planning App")
4. (Optional) Enable Google Analytics
5. Click **"Create project"**

## Step 2: Register Your Web App

1. In your Firebase project, click the **Web icon** (</>) to add a web app
2. Enter an app nickname (e.g., "Estate Planning Web App")
3. Click **"Register app"**
4. Copy the Firebase configuration object (you'll need this for `.env` file)

## Step 3: Enable Firestore Database

1. In the Firebase Console, go to **Build > Firestore Database**
2. Click **"Create database"**
3. Choose **"Start in test mode"** for development (or "production mode" for security)
4. Select your preferred location
5. Click **"Enable"**

### Set up Firestore Security Rules (Important!)

Replace the default rules with these for production:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Clients collection - adjust based on your auth needs
    match /clients/{clientId} {
      // Allow read/write for authenticated users only
      allow read, write: if request.auth != null;

      // Or allow anyone to read/write (for development only!)
      // allow read, write: if true;
    }
  }
}
```

## Step 4: Enable Firebase Storage

1. In the Firebase Console, go to **Build > Storage**
2. Click **"Get started"**
3. Click **"Next"** (keep default security rules for now)
4. Select your storage location
5. Click **"Done"**

### Set up Storage Security Rules (Important!)

Replace the default rules with these for production:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /clients/{clientId}/documents/{document} {
      // Allow authenticated users to upload/download
      allow read, write: if request.auth != null;

      // Or allow anyone to upload/download (for development only!)
      // allow read, write: if true;

      // Restrict file size to 10MB
      allow write: if request.resource.size < 10 * 1024 * 1024;
    }
  }
}
```

## Step 5: Get Your Firebase Configuration

1. Go to **Project Settings** (gear icon) > **General**
2. Scroll down to **"Your apps"** section
3. Find your web app and copy the config values:
   - API Key
   - Auth Domain
   - Project ID
   - Storage Bucket
   - Messaging Sender ID
   - App ID

## Step 6: Configure Your .env File

1. Open the `.env` file in your project root
2. Fill in your Firebase credentials:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

3. **Important**: Never commit the `.env` file to version control!

## Step 7: Test Your Setup

Restart your development server:

```bash
npm run dev
```

Check the browser console - you should see:
```
Firebase initialized successfully
```

## Using the Firebase Services

### Firestore Service (`firestoreService.js`)

```javascript
import {
  saveClientData,
  getClientData,
  searchClients,
  updateClientData,
  deleteClientData,
  getAllClients,
  generateClientId
} from './services/firestoreService';

// Save client data
const clientId = generateClientId(formData.client.firstName, formData.client.lastName);
const result = await saveClientData(clientId, formData);

// Get client data
const client = await getClientData(clientId);

// Search clients (for autocomplete)
const results = await searchClients('John');

// Update client data
await updateClientData(clientId, { 'client.email': 'newemail@example.com' });

// Get all clients
const allClients = await getAllClients();
```

### Storage Service (`storageService.js`)

```javascript
import {
  uploadDocument,
  getDocumentURL,
  listClientDocuments,
  deleteDocument,
  uploadMultipleDocuments,
  generateDocumentName
} from './services/storageService';

// Upload a single document
const pdfBlob = new Blob([pdfData], { type: 'application/pdf' });
const docName = generateDocumentName('living_trust', 'pdf');
const result = await uploadDocument(clientId, pdfBlob, docName);

// Get document download URL
const urlResult = await getDocumentURL(clientId, 'living_trust_2025-01-15.pdf');

// List all client documents
const docs = await listClientDocuments(clientId);

// Upload multiple documents
const documents = [
  { blob: pdfBlob1, name: 'trust.pdf' },
  { blob: pdfBlob2, name: 'will.pdf' }
];
await uploadMultipleDocuments(clientId, documents, (progress) => {
  console.log(`Upload progress: ${progress}%`);
});
```

## Integration Example

Here's how to integrate with your document generation:

```javascript
import { saveClientData, generateClientId } from './services/firestoreService';
import { uploadDocument, generateDocumentName } from './services/storageService';
import { generateCompleteEstatePlanningPackage } from './services/documentGenerator';

async function saveClientAndDocuments(formData) {
  try {
    // 1. Generate client ID
    const clientId = generateClientId(
      formData.client.firstName,
      formData.client.lastName
    );

    // 2. Save client data to Firestore
    const saveResult = await saveClientData(clientId, formData);
    if (!saveResult.success) {
      throw new Error(saveResult.error);
    }

    // 3. Generate documents
    const { pdfBlob, wordBlob } = await generateCompleteEstatePlanningPackage(formData);

    // 4. Upload documents to Storage
    const pdfName = generateDocumentName('estate_plan_complete', 'pdf');
    const wordName = generateDocumentName('estate_plan_complete', 'docx');

    const [pdfUpload, wordUpload] = await Promise.all([
      uploadDocument(clientId, pdfBlob, pdfName),
      uploadDocument(clientId, wordBlob, wordName)
    ]);

    console.log('PDF URL:', pdfUpload.downloadURL);
    console.log('Word URL:', wordUpload.downloadURL);

    return {
      success: true,
      clientId,
      documents: {
        pdf: pdfUpload.downloadURL,
        word: wordUpload.downloadURL
      }
    };
  } catch (error) {
    console.error('Error saving client and documents:', error);
    return {
      success: false,
      error: error.message
    };
  }
}
```

## Firestore Data Structure

The client data is stored with this structure:

```javascript
{
  // Client Information
  client: {
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    phone: "555-1234",
    address: "123 Main St",
    city: "Los Angeles",
    state: "CA",
    zip: "90001",
    ssn: "xxx-xx-1234",
    dateOfBirth: "1980-01-01"
  },

  // Spouse Information (if applicable)
  spouse: { ... },

  // Children
  children: [ ... ],

  // Trust Information
  trust: {
    name: "The Doe Family Trust",
    date: "2025-01-15",
    type: "joint" // or "single"
  },

  // Fiduciaries
  successorTrustees: [ ... ],
  agents: { ... },

  // Metadata
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

## Storage Structure

Documents are stored in this folder structure:

```
clients/
  └── {clientId}/
      └── documents/
          ├── estate_plan_complete_2025-01-15.pdf
          ├── estate_plan_complete_2025-01-15.docx
          ├── living_trust_2025-01-15.pdf
          └── power_of_attorney_2025-01-15.pdf
```

## Security Considerations

### For Development
- Test mode allows unrestricted access
- Great for development and testing
- **Do not use in production!**

### For Production
- Enable Firebase Authentication
- Update security rules to require authentication
- Consider row-level security based on user roles
- Implement rate limiting
- Monitor usage and set billing alerts

## Troubleshooting

### "Firebase is not initialized"
- Check that your `.env` file has all required variables
- Restart your dev server after adding/changing .env variables
- Verify the Firebase config values are correct

### "Permission denied" errors
- Check your Firestore Security Rules
- Make sure the rules allow the operation you're trying to perform
- For testing, you can temporarily use `allow read, write: if true;`

### Upload fails
- Check file size limits in Storage Rules
- Verify the storage bucket name in your config
- Check browser console for detailed error messages

## Next Steps

1. ✅ Set up Firebase project
2. ✅ Configure Firestore and Storage
3. ✅ Add credentials to `.env` file
4. 🔄 Test the integration with your app
5. 🔄 Add authentication (optional but recommended)
6. 🔄 Update security rules for production
7. 🔄 Set up monitoring and alerts

## Additional Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)
- [Storage Security Rules](https://firebase.google.com/docs/storage/security)
- [Firebase Pricing](https://firebase.google.com/pricing)

## Support

If you encounter any issues:
1. Check the browser console for error messages
2. Review the Firebase Console for quota/usage information
3. Verify your security rules allow the operations
4. Check that all environment variables are set correctly
