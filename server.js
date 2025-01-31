const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;
const BINANCE_API_URL = "https://api.binance.com/api/v3";

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
