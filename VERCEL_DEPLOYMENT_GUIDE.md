# 🚀 Vercel Deployment Guide

## Prerequisites
- Vercel account (vercel.com)
- GitHub repository with your code
- Vercel CLI: `npm i -g vercel`

## Deployment Options

### Option 1: Monorepo (Single Domain) ⭐ RECOMMENDED

Deploy everything under one domain:
- Frontend: `https://arbitragex.vercel.app`
- Backend API: `https://arbitragex.vercel.app/api`

**Steps:**
1. Push code to GitHub
2. Connect repo to Vercel
3. Set root directory to: `/`
4. Use the `vercel.json` in the root directory
5. Set environment variables in Vercel dashboard

### Option 2: Separate Deployments

Deploy frontend and backend separately:
- Frontend: `https://arbitragex-frontend.vercel.app`
- Backend: `https://arbitragex-backend.vercel.app`

**Steps:**
1. Deploy backend first:
   ```bash
   cd arbitragex-platform/backend
   vercel --prod
   ```

2. Update frontend `.env.production` with backend URL
3. Deploy frontend:
   ```bash
   cd arbitragex-platform/frontend
   vercel --prod
   ```

## Environment Variables

### Frontend (.env.production)
```
VITE_API_URL=https://your-backend-domain.vercel.app/api
VITE_APP_ENV=production
```

### Backend (Vercel Dashboard)
```
NODE_ENV=production
ETHEREUM_RPC_URL=https://eth.llamarpc.com
BSC_RPC_URL=https://bsc-dataseed1.binance.org
POLYGON_RPC_URL=https://polygon-rpc.com
```

## Automatic Deployments

### GitHub Integration (Recommended)
1. Connect GitHub repo to Vercel
2. Every push to `main` branch auto-deploys
3. Pull requests get preview deployments

### Build Scripts

Frontend build will automatically:
- ✅ Fetch real blockchain data on load
- ✅ Update every 15 seconds
- ✅ Show verified transaction hashes
- ✅ Display live arbitrage opportunities

Backend will automatically:
- ✅ Scan Ethereum, BSC, Polygon every 15 seconds
- ✅ Detect real arbitrage opportunities
- ✅ Provide verifiable transaction data
- ✅ Maintain 200 most recent transactions

## Performance Features

### Vercel Edge Functions
- 🌍 Global CDN distribution
- ⚡ 0ms cold starts
- 🔒 Automatic HTTPS
- 📊 Real-time analytics

### Caching Strategy
- Static assets: Cached for 1 year
- API responses: Cached for 30 seconds
- Real-time data: No cache (always fresh)

## Monitoring & Logs

### Vercel Dashboard
- Real-time function logs
- Performance metrics
- Error tracking
- Deployment history

### Health Check Endpoint
Backend includes: `GET /api/health`
```json
{
  "status": "healthy",
  "uptime": "2d 4h 32m",
  "totalTrades": 1247,
  "realBlockchainData": true,
  "lastUpdate": "2025-10-13T22:15:30Z"
}
```

## Scaling

### Serverless Functions
- Automatic scaling based on traffic
- No server management required
- Pay per execution

### Database (Optional)
For persistent storage, connect:
- Vercel Postgres
- PlanetScale MySQL
- MongoDB Atlas

## Cost Estimation

### Free Tier Limits
- 100GB bandwidth/month
- 100 serverless function executions/day
- Unlimited static hosting

### Pro Tier ($20/month)
- 1TB bandwidth
- Unlimited function executions
- Custom domains
- Advanced analytics

## Deployment Commands

### One-Time Setup
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Link project (run from root directory)
vercel link
```

### Deploy to Production
```bash
# Deploy from root directory (monorepo)
vercel --prod

# Or deploy individually
cd arbitragex-platform/frontend && vercel --prod
cd arbitragex-platform/backend && vercel --prod
```

### Preview Deployments
```bash
# Deploy preview (testing)
vercel

# Deploy specific branch
vercel --target staging
```

## Post-Deployment Checklist

✅ Frontend loads correctly
✅ Backend API responds at `/api/health`
✅ Real blockchain data is fetching
✅ WebSocket connections work (if using)
✅ All environment variables set
✅ Custom domain configured (optional)
✅ SSL certificate active

## Troubleshooting

### Common Issues

1. **API not found (404)**
   - Check `vercel.json` routes configuration
   - Verify API_URL in frontend environment

2. **Function timeout**
   - Increase `maxDuration` in `vercel.json`
   - Optimize blockchain fetching code

3. **Environment variables not working**
   - Set in Vercel dashboard, not just `.env` files
   - Redeploy after adding variables

4. **CORS errors**
   - Configure CORS in backend for production domain
   - Add Vercel domain to allowed origins

### Debug Commands
```bash
# Check deployment logs
vercel logs

# Local development with production build
vercel dev

# Check function details
vercel inspect [deployment-url]
```

## Success! 🎉

Your arbitrage platform will be live with:
- ✅ Real blockchain data updating every 15 seconds
- ✅ Verifiable transaction hashes
- ✅ Global CDN distribution
- ✅ Automatic scaling
- ✅ 99.9% uptime guarantee

**Live URLs:**
- Frontend: `https://your-app.vercel.app`
- Backend API: `https://your-app.vercel.app/api`
- Health Check: `https://your-app.vercel.app/api/health`