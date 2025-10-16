# START ArbitrageX with REAL Blockchain Integration
# This script starts both backend and frontend servers

Write-Host "
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   🚀 Starting ArbitrageX Platform                        ║
║   📡 With REAL Blockchain Integration                    ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
" -ForegroundColor Cyan

# Step 1: Start Backend API Server
Write-Host "`n[1/3] Starting Backend API Server..." -ForegroundColor Yellow
Write-Host "      Port: 5000" -ForegroundColor Gray
Write-Host "      Fetching REAL transactions from Ethereum, Polygon, BSC, Arbitrum, Base`n" -ForegroundColor Gray

Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd C:\Users\pc\arbitrage_project\arbitragex-platform\backend; npm start"

# Wait for backend to start
Write-Host "      Waiting for backend to initialize..." -ForegroundColor Gray
Start-Sleep -Seconds 5

# Step 2: Start Frontend Development Server
Write-Host "`n[2/3] Starting Frontend Development Server..." -ForegroundColor Yellow
Write-Host "      Port: 3001" -ForegroundColor Gray
Write-Host "      URL: http://localhost:3001`n" -ForegroundColor Gray

Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd C:\Users\pc\arbitrage_project\arbitragex-platform\frontend; npm run dev"

# Wait for frontend to start
Write-Host "      Waiting for frontend to build..." -ForegroundColor Gray
Start-Sleep -Seconds 10

# Step 3: Open Browser
Write-Host "`n[3/3] Opening browser..." -ForegroundColor Yellow
Start-Sleep -Seconds 2
Start-Process "http://localhost:3001"

Write-Host "
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   ✅ ArbitrageX Platform is RUNNING!                     ║
║                                                           ║
║   📡 Backend API: http://localhost:5000                  ║
║   🌐 Frontend:    http://localhost:3001                  ║
║                                                           ║
║   🔗 Showing REAL blockchain transactions from:          ║
║      - Ethereum (Uniswap, SushiSwap, Curve)             ║
║      - Polygon (QuickSwap, Uniswap V3)                   ║
║      - BSC (PancakeSwap, Biswap)                         ║
║      - Arbitrum (Uniswap V3, Camelot)                    ║
║      - Base (Uniswap V3, BaseSwap)                       ║
║                                                           ║
║   ✅ All TX hashes are REAL and verifiable!              ║
║   ✅ Updates every 20-25 seconds with new trades         ║
║                                                           ║
║   📊 Test Endpoints:                                      ║
║      http://localhost:5000/api/trades/realtime           ║
║      http://localhost:5000/api/stats                     ║
║                                                           ║
║   Press Ctrl+C in terminal windows to stop servers       ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
" -ForegroundColor Green

Write-Host "`nℹ️  Both servers are running in separate PowerShell windows" -ForegroundColor Cyan
Write-Host "ℹ️  Keep this window open to see status messages`n" -ForegroundColor Cyan

# Keep this window open
Write-Host "Press any key to stop all servers and close..." -ForegroundColor Yellow
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

# Cleanup (kill node processes)
Write-Host "`nStopping servers..." -ForegroundColor Yellow
Stop-Process -Name "node" -Force -ErrorAction SilentlyContinue
Write-Host "✅ Servers stopped`n" -ForegroundColor Green
