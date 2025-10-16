# Global Real-Time Trades System

## Overview
This document explains the synchronized real-time arbitrage trades system implemented across the ArbitrageX platform.

## Architecture

### 1. **TradesContext.jsx** - Global State Management
Location: `frontend/src/context/TradesContext.jsx`

**Purpose**: Single source of truth for all arbitrage trades across the entire website.

**Key Features**:
- Generates 250 unique realistic arbitrage trades
- Rotates 3 visible trades every 5-120 seconds
- Updates live statistics every 3-7 seconds
- Exports global state via React Context API

**State Exported**:
```javascript
{
  allTrades: [],        // All 250 trades
  visibleTrades: [],    // Currently visible 3 trades (rolling)
  liveOpportunities,    // 5-20 (changes every 3-7s)
  avgProfit,            // 0.5-3% (changes ±0.2% every 3-7s)
  successRate          // 78-96.5% (changes ±0.3% every 3-7s)
}
```

**Trade Data Structure**:
```javascript
{
  id: 1,
  description: "ETH/USDC: Uniswap → SushiSwap",
  profit: "+2.45%",
  profitValue: 2.45,
  isProfit: true,
  chain: "Ethereum",
  dex: "Uniswap V3",
  txHash: "0x7f3b8c...9a2e1f",
  timestamp: Date.now()
}
```

### 2. **LiveTradesWidget** - Reusable Component
Location: `frontend/src/components/LiveTradesWidget/`

**Purpose**: Display synchronized live trades on any page.

**Props**:
- `title`: Custom title (default: "LIVE TRADES")
- `showStats`: Show/hide avg profit and success rate (default: true)
- `className`: Additional CSS classes

**Usage**:
```jsx
import LiveTradesWidget from '../../components/LiveTradesWidget';

<LiveTradesWidget 
  title="POOL LIVE TRADES" 
  showStats={true} 
/>
```

### 3. **App.jsx** - Global Provider Wrapper
The entire app is wrapped with `<TradesProvider>` so all pages share the same trades.

```jsx
<TradesProvider>
  <Router>
    {/* All routes */}
  </Router>
</TradesProvider>
```

## Pages Using Global Trades

### ✅ Home Page (`/`)
- **Before**: Local trade generation with 70+ lines of duplicate code
- **After**: Uses `useTrades()` hook, removed all local logic
- **Display**: Shows 3 rotating trades in hero section

### ✅ Dashboard (`/dashboard`)
- **Public View**: LiveTradesWidget showing "POOL LIVE TRADES"
- **Connected View**: 
  - LiveTradesWidget showing "REAL-TIME POOL TRADES"
  - User's share calculation based on global trades
- **Removed**: ~45 lines of local trade arrays

### ✅ Leaderboard (`/leaderboard`)
- **Display**: LiveTradesWidget showing "LIVE POOL ACTIVITY"
- **Purpose**: Shows pool activity alongside investor rankings

## Benefits

### 1. **Synchronized Data**
- All pages show THE SAME trades updating at THE SAME time
- No inconsistencies between different pages
- Users see coherent real-time activity

### 2. **Code Efficiency**
- Eliminated ~150+ lines of duplicate trade generation code
- Single source of truth
- Easier maintenance and updates

### 3. **Realistic Simulation**
- 250 unique trades covering 12 chains
- 85% profitable (+0.3% to +4.8%)
- 15% losses (-0.1% to -0.9%)
- Real TX hash format
- Proper DEX names and token pairs

### 4. **Dynamic Updates**
- Trades roll every 5-120 seconds (random)
- Statistics update every 3-7 seconds
- Opportunities: 5-20 tracked
- Avg Profit: 0.5-3%
- Success Rate: 78-96.5%

## Trade Generation Logic

### Chains Covered (12 EVM Networks):
- Ethereum, Polygon, BSC, Arbitrum, Optimism, Avalanche
- Base, zkSync Era, Linea, Scroll, Mantle, Fantom

### DEX Platforms:
- Uniswap V2/V3, SushiSwap, PancakeSwap, QuickSwap
- TraderJoe, SpookySwap, Odos, 1inch, Balancer
- Curve, KyberSwap, Biswap, ApeSwap

### Token Pairs (50+ pairs):
- Major: ETH/USDC, WBTC/ETH, MATIC/USDT
- Stablecoins: USDC/USDT, DAI/USDC, FRAX/USDC
- Altcoins: LINK/ETH, UNI/ETH, AAVE/ETH
- And many more...

## Real-Time Updates

### Trade Rolling:
```javascript
useEffect(() => {
  const rollInterval = setInterval(() => {
    const randomDelay = Math.random() * (120000 - 5000) + 5000;
    // Rotate to next 3 trades
  }, randomDelay);
}, []);
```

### Stats Updates:
```javascript
useEffect(() => {
  const statsInterval = setInterval(() => {
    // Update opportunities (5-20)
    // Update avgProfit (±0.2%)
    // Update successRate (±0.3%)
  }, Math.random() * 4000 + 3000); // 3-7 seconds
}, []);
```

## Integration Guide

### To Add Global Trades to Any New Page:

1. **Import the hook**:
```jsx
import { useTrades } from '../../context/TradesContext';
```

2. **Use in component**:
```jsx
const MyPage = () => {
  const { visibleTrades, liveOpportunities, avgProfit, successRate } = useTrades();
  
  // Use the data
};
```

3. **Option A - Use Widget**:
```jsx
import LiveTradesWidget from '../../components/LiveTradesWidget';

<LiveTradesWidget title="CUSTOM TITLE" showStats={true} />
```

4. **Option B - Custom Display**:
```jsx
{visibleTrades.map(trade => (
  <div key={trade.id}>
    <p>{trade.description}</p>
    <span className={trade.isProfit ? 'profit' : 'loss'}>
      {trade.profit}
    </span>
  </div>
))}
```

## Performance Considerations

- **Memory**: 250 trades in memory (~50KB)
- **Updates**: 2 intervals running (trades + stats)
- **Re-renders**: Only components using `useTrades()` re-render
- **Optimization**: React Context prevents prop drilling

## Future Enhancements

1. **Real Blockchain Integration**
   - Connect to actual DEX APIs
   - Fetch real-time prices
   - Execute real arbitrage trades

2. **WebSocket Updates**
   - Real-time data from backend
   - Eliminate client-side simulation
   - True live trade feed

3. **Trade History**
   - Store completed trades
   - Show trade history graph
   - Performance analytics

4. **User Notifications**
   - Alert on high-profit trades (>3%)
   - Daily/weekly summaries
   - Profit milestones

## Testing

To verify synchronization:
1. Open Home page and Dashboard side-by-side
2. Observe trades rolling at the same time
3. Check that stats (opportunities, profit, success rate) match
4. Confirm TX hashes are identical across pages

## Maintenance

- Update chains in `TradesContext.jsx` line ~25
- Update DEX list line ~35
- Update token pairs line ~45
- Adjust rolling speed line ~180 (5000-120000ms range)
- Adjust stats update frequency line ~200 (3000-7000ms range)

---

**Last Updated**: January 2025
**Version**: 1.0
**Status**: Production Ready ✅
