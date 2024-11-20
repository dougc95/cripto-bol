const fetch = require("node-fetch"); // For Node.js environment; if using in browser, this isn't needed.

async function fetchBinanceP2P() {
  const url = "https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search";

  const headers = {
    "Content-Type": "application/json",
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36",
    "Client-Type": "web",
    // Add more headers if needed, such as 'Bnc-Uuid' or cookies from your browser
  };

  const body = {
    fiat: "BOB",
    page: 1,
    rows: 10,
    tradeType: "BUY", // Use "BUY" for buying USDT; "SELL" to sell USDT
    asset: "USDT",
    countries: [],
    payTypes: [],
    proMerchantAds: false,
    shieldMerchantAds: false,
    filterType: "all",
    periods: [],
    additionalKycVerifyFilter: 0,
    publisherType: null,
    classifies: ["mass", "profession", "fiat_trade"],
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error fetching Binance P2P data:", error);
  }
}

// Call the function
fetchBinanceP2P();
