# API Documentation

## Base URL
```
http://localhost:3001/api
```

## Authentication
Some endpoints require JWT authentication. Include the token in the Authorization header:
```
Authorization: Bearer <token>
```

## Endpoints

### Arbitrage

#### Get Opportunities
```
GET /arbitrage/opportunities
```

Query Parameters:
- `network` (optional) - Filter by network (ethereum, polygon, bsc, avalanche)
- `minProfit` (optional) - Minimum profit threshold

Response:
```json
{
  "success": true,
  "data": [
    {
      "id": "opp-123",
      "tokenPair": "ETH/USDC",
      "dexA": { "name": "Uniswap", "price": 2000 },
      "dexB": { "name": "SushiSwap", "price": 2020 },
      "priceDiff": 20,
      "profitPercent": 1.0,
      "estimatedProfit": 200,
      "network": "ethereum"
    }
  ]
}
```

#### Get Statistics
```
GET /arbitrage/stats
```

Response:
```json
{
  "success": true,
  "data": {
    "totalTrades": 5234,
    "successRate": 0.95,
    "totalProfit": 525000,
    "avgProfit": 105.6
  }
}
```

#### Execute Arbitrage
```
POST /arbitrage/execute
```

Body:
```json
{
  "dexA": "Uniswap",
  "dexB": "SushiSwap",
  "tokenPair": "ETH/USDC",
  "amount": 1000
}
```

### Users

#### Get User Profile
```
GET /users/:address
```

#### Get User Portfolio
```
GET /users/:address/portfolio
```

#### Get User Trades
```
GET /users/:address/trades
```

### Trades

#### Get All Trades
```
GET /trades
```

Query Parameters:
- `limit` (optional) - Number of trades to return (default: 50)
- `offset` (optional) - Pagination offset
- `status` (optional) - Filter by status

#### Get Trade by ID
```
GET /trades/:id
```

#### Get Leaderboard
```
GET /trades/leaderboard/top
```

Query Parameters:
- `limit` (optional) - Number of entries (default: 100)

### Pools

#### Get All Pools
```
GET /pools
```

#### Get Pool Details
```
GET /pools/:id
```

#### Get Pool Statistics
```
GET /pools/:id/stats
```

## WebSocket Events

Connect to: `ws://localhost:3001`

### Events

**subscribe:trades**
Subscribe to trade updates
```javascript
socket.emit('subscribe:trades');
```

**new-trade**
Receive new trade notifications
```javascript
socket.on('new-trade', (trade) => {
  console.log('New trade:', trade);
});
```

## Error Responses

All errors follow this format:
```json
{
  "success": false,
  "message": "Error message"
}
```

Common status codes:
- 200 - Success
- 400 - Bad Request
- 401 - Unauthorized
- 404 - Not Found
- 500 - Internal Server Error
