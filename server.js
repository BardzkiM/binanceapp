const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;
const BINANCE_API_BASE_URL = "https://api.binance.com/api/v3/";

async function getBinanceKlines(symbol, interval, startTime, endTime) {
  const response = await axios.get(`${BINANCE_API_BASE_URL}klines`, {
    params: {
      symbol,
      interval: interval || "1h",
      startTime,
      endTime,
    },
  });
  const data = response.data.map((item) => ({
    openTime: item[0],
    open: parseFloat(item[1]),
    high: parseFloat(item[2]),
    low: parseFloat(item[3]),
    close: parseFloat(item[4]),
    volume: parseFloat(item[5]),
    closeTime: parseFloat(item[6]),
  }));
  return data;
}

app.get("/marketData/:symbol", async (req, res) => {
  try {
    const symbol = req.params.symbol;
    const { startTime, endTime, interval } = req.query;
    const data = await getBinanceKlines(symbol, interval, startTime, endTime);

    res.json({ symbol, data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/analyze/:symbol", async (req, res) => {
  try {
    const symbol = req.params.symbol;
    const { startTime, endTime, interval } = req.query;

    const response = await axios.get(`${BINANCE_API_BASE_URL}klines`, {
      params: {
        symbol,
        interval: interval || "1h",
        startTime,
        endTime,
      },
    });

    const closingPrices = response.data.map((item) => parseFloat(item[4]));
    const first = closingPrices[0];
    const last = closingPrices[closingPrices.length - 1];
    const change = ((last - first) / first) * 100;

    res.json({ symbol, interval, change: `${change.toFixed(2)}%` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

module.exports = app;
