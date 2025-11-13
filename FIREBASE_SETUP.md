# Firebase Setup Guide

## Steps to Get Firebase Credentials:

1. **Go to Firebase Console**: https://console.firebase.google.com/

2. **Create a New Project** (or select existing):
   - Click "Add project"
   - Enter project name: "taieba-academy"
   - Follow the setup wizard

3. **Enable Authentication**:
   - Go to "Authentication" > "Get started"
   - Enable "Email/Password" sign-in method
   - Enable "Google" sign-in method (optional)

4. **Get Web App Credentials**:
   - Go to Project Settings (gear icon)
   - Scroll down to "Your apps"
   - Click on Web icon (`</>`)
   - Register app with a nickname
   - Copy the `firebaseConfig` values

5. **Create .env file**:
   - Copy `.env.example` to `.env`
   - Replace all placeholder values with your actual Firebase credentials

## Example .env file:

```
VITE_API_BASE_URL=http://localhost:5000/api
VITE_FIREBASE_API_KEY=AIzaSyxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
VITE_FIREBASE_AUTH_DOMAIN=taieba-academy.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=taieba-academy
VITE_FIREBASE_STORAGE_BUCKET=taieba-academy.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdefghijklmnop
```

6. **Restart the dev server** after creating .env file

