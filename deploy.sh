#!/bin/bash

echo "🚀 Deploying ArbitrageX to Vercel..."

# Install dependencies
echo "📦 Installing dependencies..."
cd arbitragex-platform/frontend && npm install
cd ../backend && npm install
cd ../..

# Build frontend
echo "🏗️ Building frontend..."
cd arbitragex-platform/frontend && npm run build
cd ../..

# Deploy to Vercel
echo "☁️ Deploying to Vercel..."
vercel --prod

echo "✅ Deployment complete!"
echo "🌐 Your app will be available at: https://your-app.vercel.app"
echo "📊 Backend API: https://your-app.vercel.app/api"
echo "💰 Real blockchain data: https://your-app.vercel.app/api/blockchain/realtime"