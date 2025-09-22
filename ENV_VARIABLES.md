# 🔐 Environment Variables Setup Guide

## 📋 **Required Environment Variables**

Add these environment variables to your Vercel project or `.env.local` file:

### 🔥 **Firebase Configuration**
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### 👤 **Admin Configuration**
```env
ADMIN_EMAIL=ganeshworkspvtltd@gmail.com
```

### 💳 **Payment Gateway Configuration**

#### PayPal
```env
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_client_secret
PAYPAL_MODE=sandbox
# Change to 'live' for production
```

#### Cashfree
```env
CASHFREE_APP_ID=your_cashfree_app_id
CASHFREE_SECRET_KEY=your_cashfree_secret_key
CASHFREE_MODE=TEST
# Change to 'PROD' for production
```

### 🤖 **AI Service Configuration**

#### OpenAI (for content generation)
```env
OPENAI_API_KEY=your_openai_api_key
```

#### Stability AI (for image generation)
```env
STABILITY_API_KEY=your_stability_ai_api_key
```

### 🔗 **Zapier Integration**
```env
ZAPIER_WEBHOOK_URL=your_zapier_webhook_url
```

### 🌐 **Application URLs**
```env
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
# For local development: http://localhost:3000
```

## 🚀 **How to Add Environment Variables**

### **For Vercel Deployment:**
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add each variable with its value
5. Click **Save**
6. **Redeploy** your application

### **For Local Development:**
1. Create `.env.local` file in project root
2. Add all environment variables
3. Restart your development server

## 🔍 **How to Get These Values**

### **Firebase:**
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project
3. Go to **Project Settings** (gear icon)
4. Scroll to **Your apps** section
5. Copy the config values

### **PayPal:**
1. Go to [PayPal Developer](https://developer.paypal.com)
2. Create an application
3. Get Client ID and Secret from app details

### **Cashfree:**
1. Go to [Cashfree Dashboard](https://merchant.cashfree.com)
2. Get App ID and Secret Key from API section

### **OpenAI:**
1. Go to [OpenAI Platform](https://platform.openai.com)
2. Create API key in API Keys section

### **Stability AI:**
1. Go to [Stability AI Platform](https://platform.stability.ai)
2. Create API key in account settings

## ✅ **Verification**

After adding environment variables:

1. Visit `/debug` page on your website
2. Check if all variables are loaded correctly
3. Test Firebase connection
4. Try signup/login functionality

## 🚨 **Security Notes**

- Never commit `.env.local` to version control
- Use different keys for development and production
- Regularly rotate API keys
- Keep Firebase rules secure

## 📞 **Troubleshooting**

### **Common Issues:**

1. **Variables not loading:** Redeploy after adding variables
2. **Firebase errors:** Check if all Firebase variables are set
3. **Payment errors:** Verify payment gateway credentials
4. **Build errors:** Ensure all NEXT_PUBLIC_ variables are set

### **Debug Steps:**
1. Check `/debug` page for missing variables
2. Verify variable names (case-sensitive)
3. Ensure no extra spaces in values
4. Check Vercel deployment logs

---

**🎯 Quick Setup Checklist:**
- [ ] Firebase variables added
- [ ] Admin email set
- [ ] Payment gateway configured
- [ ] AI service keys added
- [ ] Application redeployed
- [ ] Functionality tested