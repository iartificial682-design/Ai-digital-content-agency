#!/bin/bash

echo "🚀 AI Digital Agency - Local Deployment Script"
echo "=============================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are installed"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "⚠️  .env.local not found. Creating from template..."
    cp .env.example .env.local
    echo "📝 Please edit .env.local with your actual configuration values"
    echo "   Required: Firebase keys, Payment gateway keys, OpenAI key"
    echo ""
    echo "🔗 Useful links:"
    echo "   Firebase Console: https://console.firebase.google.com/"
    echo "   Cashfree Dashboard: https://www.cashfree.com/"
    echo "   PayPal Developer: https://developer.paypal.com/"
    echo "   OpenAI API Keys: https://platform.openai.com/api-keys"
    echo ""
    read -p "Press Enter after updating .env.local to continue..."
fi

# Build the project
echo "🔨 Building the project..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    echo "🌐 Starting development server..."
    echo "   Website will be available at: http://localhost:3000"
    echo "   Admin panel: http://localhost:3000/admin"
    echo "   User dashboard: http://localhost:3000/dashboard"
    echo ""
    echo "🔐 Admin access: ganeshworkspvtltd@gmail.com"
    echo ""
    echo "Press Ctrl+C to stop the server"
    echo ""
    
    # Start the development server
    npm run dev
else
    echo "❌ Build failed. Please check the errors above."
    exit 1
fi