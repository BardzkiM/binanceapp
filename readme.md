#run project:
node server.js

#example o usage
while running server locally on port 3000 call API using external tool (eg. Postman):
eg. call to get the market data:
`http://localhost:3000/marketData/BTCUSDT?startTime=1738148400000&endTime=1738152000000&interval=1h`
response:

```{
    "symbol": "BTCUSDT",
    "data": [
        {
            "openTime": 1738148400000,
            "open": 102547.01,
            "high": 102809.52,
            "low": 102425.87,
            "close": 102646,
            "volume": 665.36345,
            "closeTime": 1738151999999
        },
        {
            "openTime": 1738152000000,
            "open": 102646,
            "high": 102842.04,
            "low": 102220.13,
            "close": 102229.85,
            "volume": 788.66391,
            "closeTime": 1738155599999
        }
    ]
}
```

eg. call to get the analyzed data:
`http://localhost:3000/analyze/BTCUSDT?startTime=1738148400000&endTime=1738152000000&interval=1h`
response:

````{
    "symbol": "BTCUSDT",
    "interval": "1h",
    "change": "-0.41%"
}```
````
