#!/bin/bash

# Install dependencies for both frontend and backend
echo "📦 Installing dependencies..."

# Install backend dependencies
cd arbitragex-platform/backend
npm install

# Install frontend dependencies and build
cd ../frontend  
npm install
npm run build

# Go back to backend and start server
cd ../backend
echo "🚀 Starting ArbitrageX server..."
NODE_ENV=production npm start