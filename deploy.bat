@echo off
echo 🚀 Deploying ArbitrageX to Vercel...

REM Install dependencies
echo 📦 Installing dependencies...
cd arbitragex-platform\frontend
call npm install
cd ..\backend
call npm install
cd ..\..

REM Build frontend
echo 🏗️ Building frontend...
cd arbitragex-platform\frontend
call npm run build
cd ..\..

REM Deploy to Vercel
echo ☁️ Deploying to Vercel...
call vercel --prod

echo ✅ Deployment complete!
echo 🌐 Your app will be available at: https://your-app.vercel.app
echo 📊 Backend API: https://your-app.vercel.app/api
echo 💰 Real blockchain data: https://your-app.vercel.app/api/blockchain/realtime

pause