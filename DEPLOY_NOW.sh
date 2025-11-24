#!/bin/bash

# Netlify CLI Deployment Script
# This script automates the Netlify deployment process

echo "🚀 Starting Netlify Deployment..."
echo ""

# Step 1: Check if Netlify CLI is installed
echo "📦 Checking Netlify CLI installation..."
if ! command -v netlify &> /dev/null
then
    echo "❌ Netlify CLI not found. Installing..."
    npm install -g netlify-cli
else
    echo "✅ Netlify CLI is installed"
fi

# Step 2: Login check
echo ""
echo "🔐 Checking Netlify login status..."
if ! netlify status &> /dev/null
then
    echo "❌ Not logged in. Please login..."
    netlify login
else
    echo "✅ Already logged in"
fi

# Step 3: Install dependencies
echo ""
echo "📥 Installing dependencies..."
npm install

# Step 4: Build
echo ""
echo "🔨 Building project..."
npm run build

# Check if build was successful
if [ ! -d "dist" ]; then
    echo "❌ Build failed! dist folder not found."
    exit 1
fi

echo "✅ Build successful"

# Step 5: Check if site is initialized
echo ""
echo "🔍 Checking if site is initialized..."
if [ ! -f ".netlify/state.json" ]; then
    echo "⚠️  Site not initialized. Running netlify init..."
    echo "Please answer the questions:"
    netlify init
else
    echo "✅ Site already initialized"
fi

# Step 6: Deploy
echo ""
echo "🚀 Deploying to Netlify..."
netlify deploy --prod

echo ""
echo "✅ Deployment complete!"
echo ""
echo "📝 Next steps:"
echo "1. Set environment variables: netlify env:set VARIABLE_NAME value"
echo "2. Check site: netlify open:site"
echo "3. View status: netlify status"

