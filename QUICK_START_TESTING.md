# Quick Start Testing Guide

## 🎯 Test Firebase Integration in 3 Steps

### Step 1: Update Security Rules (REQUIRED)

Since you're in production mode, you need to update the security rules:

#### Firestore Rules
1. Go to: https://console.firebase.google.com/project/estate-planning-app-b5335/firestore/rules
2. Replace with:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /clients/{clientId} {
      allow read, write: if true;
    }
  }
}
```
3. Click "Publish"

#### Storage Rules
1. Go to: https://console.firebase.google.com/project/estate-planning-app-b5335/storage/rules
2. Replace with:
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /clients/{clientId}/documents/{document} {
      allow read, write: if true;
      allow write: if request.resource.size < 10 * 1024 * 1024;
    }
  }
}
```
3. Click "Publish"

### Step 2: Add Test Component to Your App

Open `src/App.jsx` and add the FirebaseTest component:

```jsx
import FirebaseTest from './components/FirebaseTest';

function App() {
  return (
    <div className="App">
      {/* Add this temporarily at the top of your app */}
      <FirebaseTest />

      {/* Your existing content */}
      {/* ... */}
    </div>
  );
}

export default App;
```

### Step 3: Run the Tests

1. Open your app: http://localhost:5175
2. You should see the Firebase Integration Test panel
3. Click **"Save Test Client + Documents"**
4. Wait for it to complete (you'll see progress)
5. Click the document links to view the generated PDFs and Word docs
6. Try the search box - type "John" or "Doe"

### ✅ Verification

Check these to confirm everything works:

1. **Browser Console** (F12)
   - Should see: `Firebase initialized successfully`
   - Should see: `Client data saved successfully`
   - No permission errors

2. **Firestore Data**
   - Go to: https://console.firebase.google.com/project/estate-planning-app-b5335/firestore/data
   - You should see a `clients` collection with your test data

3. **Storage Files**
   - Go to: https://console.firebase.google.com/project/estate-planning-app-b5335/storage/files
   - Navigate to `clients/{clientId}/documents/`
   - You should see the PDF and Word files

## 🚀 Next Steps

Once the test works, you can integrate Firebase with your actual form:

### Option 1: Add Save Button to Form

In `src/components/forms/EstatePlanningForm.jsx`:

```jsx
import { saveClientWithDocuments } from '../../services/clientDocumentService';

// Inside your component
const [saving, setSaving] = useState(false);
const [saveProgress, setSaveProgress] = useState({ percent: 0, message: '' });

const handleSaveToFirebase = async () => {
  setSaving(true);

  try {
    const result = await saveClientWithDocuments(
      formData,
      ({ percent, message }) => {
        setSaveProgress({ percent, message });
      }
    );

    if (result.success) {
      alert(`✅ Client saved!\n\nClient ID: ${result.clientId}\n\nDocuments:\n- PDF: ${result.documents.pdf}\n- Word: ${result.documents.word}`);
    } else {
      alert(`❌ Error: ${result.error}`);
    }
  } catch (error) {
    alert(`❌ Error: ${error.message}`);
  } finally {
    setSaving(false);
  }
};

// In your JSX, add a button
<button
  onClick={handleSaveToFirebase}
  disabled={saving}
  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
>
  {saving ? `Saving... ${Math.round(saveProgress.percent)}%` : 'Save to Database'}
</button>
```

### Option 2: Auto-save on Form Submit

Replace your existing document generation with:

```jsx
const handleSubmit = async () => {
  try {
    setIsGenerating(true);

    // This replaces your existing document generation
    const result = await saveClientWithDocuments(
      formData,
      ({ percent, message }) => {
        console.log(`${message} (${percent}%)`);
      }
    );

    if (result.success) {
      // Open the PDF
      window.open(result.documents.pdf, '_blank');

      // Show success message
      alert('Documents generated and saved!');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Failed to generate documents');
  } finally {
    setIsGenerating(false);
  }
};
```

## 🔍 Troubleshooting

### Error: "Permission denied"
→ Make sure you updated BOTH Firestore AND Storage rules

### Error: "Firebase is not initialized"
→ Check that `.env` file has all values and dev server is running

### No data in Firestore
→ Check browser console for errors
→ Verify rules are published

### Documents not uploading
→ Check Storage rules are published
→ Verify file size is under 10MB

## 📊 What the Test Does

The `saveClientWithDocuments` function:

1. ✅ Generates unique client ID
2. ✅ Saves all form data to Firestore
3. ✅ Generates complete PDF document
4. ✅ Generates complete Word document
5. ✅ Uploads both to Firebase Storage
6. ✅ Updates client record with document URLs
7. ✅ Returns downloadable links

## 🎉 Success Indicators

You'll know it's working when:

- ✅ Test component shows "Success!"
- ✅ You can click and download the PDF/Word docs
- ✅ Search finds the test client
- ✅ Firestore shows the client data
- ✅ Storage shows the uploaded files
- ✅ No errors in browser console

## 📞 Quick Links

- [Your App](http://localhost:5175)
- [Firestore Data](https://console.firebase.google.com/project/estate-planning-app-b5335/firestore/data)
- [Storage Files](https://console.firebase.google.com/project/estate-planning-app-b5335/storage/files)
- [Firestore Rules](https://console.firebase.google.com/project/estate-planning-app-b5335/firestore/rules)
- [Storage Rules](https://console.firebase.google.com/project/estate-planning-app-b5335/storage/rules)
