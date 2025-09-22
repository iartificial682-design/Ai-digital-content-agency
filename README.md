# 🚀 AI Digital Content Agency

A production-ready, full-stack web application for AI-powered digital content services with secure admin panel, comprehensive payment integration, and auto-monetization system.

## 🌟 Live Demo

> **Note**: Website is ready for deployment. Follow the deployment guide below to make it live.

**Planned URLs** (after deployment):
- **Website**: `https://brand.page/Ganeshagamingworld`
- **Admin Panel**: `https://brand.page/Ganeshagamingworld/admin`
- **User Dashboard**: `https://brand.page/Ganeshagamingworld/dashboard`

**Current Status**: ⚠️ Ready for deployment - Not yet live

## 🎯 Features

### 🔐 Security & Authentication
- **Secure Admin Panel**: Only `ganeshworkspvtltd@gmail.com` has admin access
- **Role-based Access Control**: Admin-only features and routes
- **Firebase Authentication**: Secure user management
- **Protected API Routes**: Admin middleware protection

### 💰 Pricing & Monetization
- **Paid Services**: All services require payment
  - Content Writing: ₹3,999/month (50 posts)
  - Video Editing: ₹5,999/month (20 videos)
  - Graphics Design: ₹2,999/month (100 graphics)
  - Voiceover: ₹1,999/month (30 voiceovers)
  - Complete Package: ₹12,999/month (13% savings)
- **Auto Monetization**: User visit tracking, activity earnings
- **Dual Payment Gateways**: Cashfree & PayPal integration
- **Revenue Analytics**: Admin dashboard with earnings tracking

### 🎨 AI-Powered Services
- **Content Writing**: SEO-optimized blog posts and articles
- **Graphics Design**: AI-generated visuals and branding
- **Video Editing**: Professional video production
- **Voiceover Services**: Multi-language AI voices

### 📊 Admin Dashboard
- **Complete Website Control**: Full read/write permissions
- **Order Management**: Track all orders and payments
- **User Analytics**: Monitor user activity and earnings
- **Revenue Tracking**: Real-time monetization data
- **Service Management**: Control pricing and features

### 🔄 Automation & Integration
- **Zapier Webhooks**: Automated workflows
- **Real-time Updates**: Live order status tracking
- **Email Notifications**: Automated customer communication
- **Payment Webhooks**: Instant payment verification
- Real-time order status updates
- Comprehensive statistics and reporting

### 🛠 Technical Features
- Responsive design with Tailwind CSS
- Real-time database with Firestore
- API routes for AI content generation
- Zapier integration for workflow automation
- Modern React hooks and components

## Tech Stack

- **Frontend**: Next.js 14, React 18, Tailwind CSS
- **Backend**: Next.js API Routes, Firebase Functions
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth
- **Styling**: Tailwind CSS with custom design system
- **Icons**: Lucide React
- **Forms**: React Hook Form
- **Notifications**: React Hot Toast
- **Integrations**: Zapier webhooks

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Firebase project

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/aidigitalcontentagency/Ai-digital-content-agency.git
   cd Ai-digital-content-agency
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   
   Copy the example environment file:
   ```bash
   cp .env.local.example .env.local
   ```

   Update `.env.local` with your actual configuration:

   ```env
   # Firebase Configuration
   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

   # AI Service API Keys
   OPENAI_API_KEY=your_openai_api_key
   ANTHROPIC_API_KEY=your_anthropic_api_key
   ELEVENLABS_API_KEY=your_elevenlabs_api_key

   # Zapier Webhook URLs
   ZAPIER_NEW_ORDER_WEBHOOK=https://hooks.zapier.com/hooks/catch/your_webhook_id/
   ZAPIER_ORDER_COMPLETE_WEBHOOK=https://hooks.zapier.com/hooks/catch/your_webhook_id/
   ZAPIER_USER_REGISTRATION_WEBHOOK=https://hooks.zapier.com/hooks/catch/your_webhook_id/
   ```

4. **Firebase Setup**
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication with Email/Password
   - Create a Firestore database
   - Add your web app and copy the configuration
   - Update the Firebase config in `utils/firebase.js`

5. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── components/          # Reusable React components
│   ├── Header.js       # Navigation header
│   ├── Footer.js       # Site footer
│   ├── OrderForm.js    # Order placement form
│   └── OrderCard.js    # Order display card
├── pages/              # Next.js pages
│   ├── index.js        # Landing page
│   ├── login.js        # User login
│   ├── signup.js       # User registration
│   ├── dashboard.js    # Client dashboard
│   ├── admin.js        # Admin dashboard
│   └── api/            # API routes
│       ├── generate-blog.js
│       ├── generate-graphics.js
│       ├── generate-video.js
│       └── generate-voiceover.js
├── utils/              # Utility functions
│   ├── firebase.js     # Firebase configuration
│   ├── aiHelpers.js    # AI service helpers
│   └── zapier.js       # Zapier integration
├── styles/             # CSS styles
│   └── globals.css     # Global styles
└── tailwind.config.js  # Tailwind configuration
```

## Environment Variables

### Required Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase API key | `AIzaSyC...` |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase auth domain | `project.firebaseapp.com` |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Firebase project ID | `my-project` |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket | `project.appspot.com` |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Firebase sender ID | `123456789` |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Firebase app ID | `1:123:web:abc123` |

### Optional Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `OPENAI_API_KEY` | OpenAI API key for content generation | - |
| `ANTHROPIC_API_KEY` | Anthropic API key for content generation | - |
| `ELEVENLABS_API_KEY` | ElevenLabs API key for voiceovers | - |
| `ZAPIER_*_WEBHOOK` | Zapier webhook URLs for automation | - |

## API Endpoints

### Content Generation APIs

- `POST /api/generate-blog` - Generate blog content
- `POST /api/generate-graphics` - Generate graphics
- `POST /api/generate-video` - Generate video content
- `POST /api/generate-voiceover` - Generate voiceovers

### Request Format

```javascript
// Blog generation
{
  "topic": "AI in Healthcare",
  "wordCount": 1000,
  "tone": "professional",
  "keywords": ["AI", "healthcare", "technology"]
}

// Graphics generation
{
  "prompt": "Modern tech startup office",
  "style": "professional",
  "dimensions": "1920x1080"
}

// Video generation
{
  "script": "Welcome to our AI agency...",
  "duration": 60,
  "style": "professional"
}

// Voiceover generation
{
  "text": "Welcome to our services",
  "voice": "professional",
  "language": "en"
}
```

## 🚀 Deployment Guide

### Step 1: Quick Local Testing

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Add your Firebase keys to .env.local (see Environment Variables section)
# Start development server
npm run dev
```

Visit `http://localhost:3000` to see your website running locally.

### Step 2: Vercel Deployment (Recommended)

#### Option A: Deploy via Vercel Dashboard
1. **Go to [Vercel.com](https://vercel.com)** and sign up/login
2. **Import Project**: Click "New Project" → Import from GitHub
3. **Select Repository**: Choose `aidigitalcontentagency/Ai-digital-content-agency`
4. **Configure**: 
   - Framework Preset: Next.js
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`
5. **Add Environment Variables** (see Required Environment Variables below)
6. **Deploy**: Click "Deploy" button

#### Option B: Deploy via Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

### Step 3: Custom Domain Setup

1. **In Vercel Dashboard**:
   - Go to your project → Settings → Domains
   - Add custom domain: `ganeshagamingworld.brand.page`

2. **DNS Configuration**:
   - Contact your domain provider (brand.page)
   - Add CNAME record: `ganeshagamingworld` → `your-vercel-url.vercel.app`

### Step 4: Required Environment Variables

In Vercel Dashboard → Settings → Environment Variables, add these **REQUIRED** keys:

```env
# Firebase (Get from Firebase Console - firebase.google.com)
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Admin (Pre-configured)
ADMIN_EMAIL=ganeshworkspvtltd@gmail.com

# Payment Gateways (Get from respective providers)
CASHFREE_CLIENT_ID=your_cashfree_client_id
CASHFREE_CLIENT_SECRET=your_cashfree_secret
CASHFREE_ENVIRONMENT=production

PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_secret
PAYPAL_ENVIRONMENT=live

# Domain (Update after deployment)
NEXT_PUBLIC_DOMAIN=https://ganeshagamingworld.brand.page
NEXT_PUBLIC_API_URL=https://ganeshagamingworld.brand.page/api

# AI Services (Get from OpenAI)
OPENAI_API_KEY=your_openai_api_key

# Security (Generate random 32-character strings)
JWT_SECRET=your_32_character_secret_key_here
ENCRYPTION_KEY=your_32_character_encryption_key_here
```

### Step 5: Firebase Setup

1. **Create Firebase Project**:
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Click "Create a project"
   - Enter project name: `ai-digital-agency`
   - Enable Google Analytics (optional)

2. **Enable Authentication**:
   - Go to Authentication → Sign-in method
   - Enable "Email/Password"

3. **Create Firestore Database**:
   - Go to Firestore Database
   - Click "Create database"
   - Start in production mode
   - Choose location (asia-south1 for India)

4. **Get Configuration**:
   - Go to Project Settings → General
   - Scroll to "Your apps" → Web app
   - Copy the config values to your environment variables

### Step 6: Payment Gateway Setup

#### Cashfree Setup (for Indian customers)
1. **Sign up at [Cashfree](https://www.cashfree.com/)**
2. **Get API credentials**:
   - Go to Developers → API Keys
   - Copy Client ID and Client Secret
   - Add to environment variables

#### PayPal Setup (for international customers)
1. **Sign up at [PayPal Developer](https://developer.paypal.com/)**
2. **Create App**:
   - Go to My Apps & Credentials
   - Create New App
   - Copy Client ID and Client Secret
   - Add to environment variables

### Step 7: Post-Deployment Checklist

- ✅ Website loads at your custom domain
- ✅ User registration/login works
- ✅ Admin panel accessible only to `ganeshworkspvtltd@gmail.com`
- ✅ Payment gateways working
- ✅ All services show paid pricing
- ✅ Order placement and tracking functional

### Troubleshooting

**Common Issues:**

1. **404 Error**: Check if domain is properly configured
2. **Firebase Error**: Verify all Firebase environment variables
3. **Payment Error**: Check payment gateway credentials
4. **Admin Access Denied**: Ensure you're logged in with `ganeshworkspvtltd@gmail.com`

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@aidigitalagency.com or create an issue in this repository.

## Roadmap

- [ ] Payment integration (Stripe)
- [ ] Advanced AI model selection
- [ ] Bulk order processing
- [ ] API rate limiting
- [ ] Advanced analytics dashboard
- [ ] Mobile app development
- [ ] Multi-language support
- [ ] Advanced user roles and permissions
