# 🔥 Firebase Setup Guide

## 🚨 **URGENT: Fix Signup Error**

The signup error you're seeing is because Firebase is not properly configured. Follow these steps to fix it:

## 📋 **Step 1: Create Firebase Project**

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Create a project" or "Add project"
3. Enter project name: `ai-digital-content-agency`
4. Enable Google Analytics (optional)
5. Click "Create project"

## 🔐 **Step 2: Enable Authentication**

1. In Firebase Console, go to **Authentication**
2. Click **Get started**
3. Go to **Sign-in method** tab
4. Click **Email/Password**
5. **Enable** the first option (Email/Password)
6. Click **Save**

## 🗄️ **Step 3: Setup Firestore Database**

1. Go to **Firestore Database**
2. Click **Create database**
3. Choose **Start in test mode** (for now)
4. Select your preferred location
5. Click **Done**

## ⚙️ **Step 4: Get Firebase Configuration**

1. Go to **Project Settings** (gear icon)
2. Scroll down to **Your apps**
3. Click **Web app** icon (`</>`)
4. Enter app nickname: `ai-digital-agency`
5. **Don't check** "Also set up Firebase Hosting"
6. Click **Register app**
7. **Copy the config object** - you'll need these values

## 🌐 **Step 5: Add Environment Variables to Vercel**

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add these variables with values from Firebase config:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

## 🔄 **Step 6: Redeploy**

1. After adding environment variables, go to **Deployments**
2. Click **Redeploy** on the latest deployment
3. Wait for deployment to complete

## 🧪 **Step 7: Test the Fix**

1. Visit your website: `https://your-app.vercel.app/debug`
2. Check if all environment variables are present
3. Verify Firebase connection is successful
4. Try signing up again

## 📧 **Step 8: Add Admin Email**

Add this environment variable to make yourself admin:

```env
ADMIN_EMAIL=ganeshworkspvtltd@gmail.com
```

## 🔒 **Step 9: Security Rules (Optional)**

For production, update Firestore rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Orders can be read/written by the user who created them
    match /orders/{orderId} {
      allow read, write: if request.auth != null && 
        (request.auth.uid == resource.data.userId || 
         request.auth.token.email == 'ganeshworkspvtltd@gmail.com');
    }
  }
}
```

## ❗ **Common Issues & Solutions**

### Issue: "operation-not-allowed"
**Solution**: Enable Email/Password authentication in Firebase Console

### Issue: "invalid-api-key" 
**Solution**: Check if NEXT_PUBLIC_FIREBASE_API_KEY is correctly set

### Issue: "configuration-not-found"
**Solution**: Verify all environment variables are added to Vercel

### Issue: Still getting errors
**Solution**: Visit `/debug` page to see detailed error information

## 🎯 **Expected Result**

After completing these steps:
- ✅ Signup will work without errors
- ✅ Users can create accounts
- ✅ Admin panel will be accessible
- ✅ All Firebase features will work

## 📞 **Need Help?**

If you're still having issues:
1. Visit `https://your-app.vercel.app/debug` for diagnostics
2. Check browser console for detailed error messages
3. Verify all steps above are completed correctly

---

**⚡ Quick Fix Summary:**
1. Create Firebase project
2. Enable Email/Password auth
3. Setup Firestore
4. Add environment variables to Vercel
5. Redeploy
6. Test signup again