@echo off
echo 🚀 Deploying ArbitrageX to Netlify...

REM Build the frontend
echo 📦 Building frontend...
cd arbitragex-platform\frontend
call npm install
call npm run build
cd ..\..

echo ✅ Build complete!
echo 📁 Production files ready in: arbitragex-platform\frontend\dist\

echo 🌐 Now go to: https://app.netlify.com/teams/indiamarketingdata/projects
echo 📤 1. Click 'New site from Git' OR drag & drop the 'dist' folder
echo ⚙️  2. Set environment variables:
echo    - VITE_API_URL = /api
echo    - NODE_ENV = production
echo 🎉 3. Your arbitrage platform will be live!

echo.
echo 📊 Your platform includes:
echo ✅ Real blockchain data from Ethereum, BSC, Polygon
echo ✅ Updates every 15 seconds with verified TX hashes
echo ✅ Professional testimonials with real images
echo ✅ Global CDN distribution
echo ✅ Automatic HTTPS and security

pause