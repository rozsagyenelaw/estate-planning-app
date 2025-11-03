# Authentication Setup Guide

## Overview
Firebase Authentication has been added to protect your estate planning app. Only authorized email addresses can access the application.

## Setup Steps

### 1. Enable Firebase Authentication

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Click on "Authentication" in the left sidebar
4. Click "Get Started" if not already enabled
5. Click on "Sign-in method" tab
6. Enable "Email/Password" provider:
   - Click on "Email/Password"
   - Toggle "Enable" to ON
   - Click "Save"

### 2. Create User Accounts

You need to create user accounts for yourself and your paralegal:

1. In Firebase Console, go to Authentication > Users
2. Click "Add user"
3. Enter email address (e.g., `rozsa@rozsagyenelaw.com`)
4. Enter a strong password
5. Click "Add user"
6. Repeat for your paralegal's email

**Important:** The email addresses you create here must match the emails in `ALLOWED_EMAILS` (see step 3).

### 3. Update Allowed Emails List

Edit the file `src/context/AuthContext.jsx` and update the `ALLOWED_EMAILS` array:

```javascript
const ALLOWED_EMAILS = [
  'rozsa@rozsagyenelaw.com',  // Your email
  'paralegal@rozsagyenelaw.com',  // Your paralegal's email (if applicable)
];
```

**Note:** Only emails in this list will be allowed to log in, even if they have valid Firebase accounts.

### 4. Test Locally

1. Start your development server: `npm run dev`
2. Navigate to `http://localhost:5173`
3. You should be redirected to `/login`
4. Enter your email and password
5. You should be logged in and redirected to the home page

### 5. Deploy to Netlify

When you deploy to Netlify, make sure your Firebase environment variables are set:

1. Go to your Netlify site dashboard
2. Navigate to Site settings > Build & deploy > Environment
3. Add the following environment variables (if not already set):
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`

## Features

### Login
- Users must log in with email and password
- Only authorized emails can access the app
- Login persists across browser sessions (uses localStorage)
- User-friendly error messages for failed login attempts

### Logout
- Click the "Logout" button in the top right corner
- Confirms before logging out
- Redirects to login page

### Security
- All routes are protected (except `/login`)
- Unauthenticated users are automatically redirected to login
- Email whitelist prevents unauthorized access
- Firebase handles password security and encryption

## Firestore Security Rules

To secure your Firestore database, update your Firestore Security Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Only authenticated users can read/write
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

This ensures that only logged-in users can access your Firestore data.

## Troubleshooting

### "Your email is not authorized"
- Check that your email is in the `ALLOWED_EMAILS` array
- Ensure the email matches exactly (case-sensitive)

### "Invalid email or password"
- Verify the user account exists in Firebase Console
- Check that you're using the correct password
- Try resetting the password in Firebase Console

### "Too many failed attempts"
- Wait 15-30 minutes before trying again
- Firebase rate-limits failed login attempts for security

### User not redirected after login
- Check browser console for errors
- Verify Firebase configuration is correct
- Clear browser cache and try again

## Password Reset

To reset a user's password:

1. Go to Firebase Console > Authentication > Users
2. Find the user
3. Click the three dots (⋮) menu
4. Select "Reset password"
5. Firebase will send a password reset email

## Adding New Users

To give someone new access:

1. Add their email to `ALLOWED_EMAILS` in `src/context/AuthContext.jsx`
2. Create their account in Firebase Console
3. Provide them with the login URL and their credentials

## Removing Access

To revoke someone's access:

1. Remove their email from `ALLOWED_EMAILS`
2. (Optional) Disable their account in Firebase Console

## Questions?

If you need help:
- Check [Firebase Authentication docs](https://firebase.google.com/docs/auth)
- Review the code in `src/context/AuthContext.jsx`
- Check the browser console for error messages
