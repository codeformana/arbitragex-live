# Deployment Guide

## Production Deployment

### Docker Deployment

1. Build and start all services:
```bash
docker-compose up -d
```

2. View logs:
```bash
docker-compose logs -f
```

3. Stop services:
```bash
docker-compose down
```

### Manual Deployment

#### Frontend

1. Build production bundle:
```bash
cd frontend
npm run build
```

2. Deploy to hosting service (Vercel, Netlify, etc.):
```bash
# Example with Vercel
vercel --prod
```

#### Backend

1. Set production environment variables
2. Start with PM2:
```bash
cd backend
npm install -g pm2
pm2 start src/app.js --name arbitragex-backend
```

3. Setup monitoring:
```bash
pm2 monitor
```

#### Smart Contracts

1. Deploy to mainnet:
```bash
cd contracts
npx hardhat run scripts/deploy.js --network ethereum
```

2. Verify contracts:
```bash
npm run verify -- --network ethereum
```

## Environment Configuration

### Production Environment Variables

#### Frontend
```env
VITE_API_URL=https://api.arbitragex.io/api
VITE_WS_URL=wss://api.arbitragex.io
VITE_INFURA_ID=production_infura_id
```

#### Backend
```env
NODE_ENV=production
PORT=3001
MONGODB_URI=mongodb://production-host:27017/arbitragex
JWT_SECRET=strong_production_secret
```

## Security Checklist

- [ ] Change all default passwords
- [ ] Use strong JWT secrets
- [ ] Enable HTTPS
- [ ] Configure CORS properly
- [ ] Set up rate limiting
- [ ] Enable security headers
- [ ] Audit smart contracts
- [ ] Set up monitoring

## Monitoring

### Application Monitoring
- Use PM2 for process management
- Set up error tracking (Sentry)
- Configure uptime monitoring

### Infrastructure Monitoring
- Set up server monitoring
- Configure database backups
- Monitor blockchain nodes

## Scaling

### Horizontal Scaling
- Use load balancer
- Deploy multiple backend instances
- Use Redis for session storage

### Database Scaling
- Enable MongoDB replication
- Set up database indexes
- Configure caching

## Backup Strategy

### Database Backups
```bash
# MongoDB backup
mongodump --uri="mongodb://localhost:27017/arbitragex" --out=/backup/
```

### Contract Backups
- Keep contract source code in version control
- Document deployed addresses
- Maintain verified contracts on Etherscan

## CI/CD Pipeline

### GitHub Actions Example

```yaml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Install dependencies
        run: npm run install:all
      - name: Build
        run: npm run build:frontend
      - name: Deploy
        run: npm run deploy
```

## Rollback Procedure

1. Identify issue
2. Stop affected services
3. Restore from backup
4. Deploy previous version
5. Verify functionality

## Support

For deployment issues:
- Check logs first
- Review configuration
- Contact support team
