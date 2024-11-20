import React, { useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [modePrice, setModePrice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBinanceP2P = async () => {
    const url = "https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search";
    const headers = {
      "Content-Type": "application/json",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36",
      "Client-Type": "web",
    };
    const body = {
      fiat: "BOB",
      page: 1,
      rows: 10,
      tradeType: "BUY",
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

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(url, body, { headers });
      const rawData = response.data.data || [];

      // Calculate the average surplusAmount
      const totalSurplus = rawData.reduce(
        (sum, item) => sum + parseFloat(item.adv.surplusAmount),
        0
      );
      const averageSurplus = totalSurplus / rawData.length;

      // Filter items above or equal to the average surplusAmount and with a completion rate > 95%
      const filtered = rawData.filter(
        (item) =>
          parseFloat(item.adv.surplusAmount) >= averageSurplus &&
          parseFloat(item.advertiser.monthFinishRate) >= 0.95
      );

      // Extract prices and calculate the mode
      const prices = filtered.map((item) => parseFloat(item.adv.price));
      const priceFrequency = {};
      prices.forEach((price) => {
        priceFrequency[price] = (priceFrequency[price] || 0) + 1;
      });
      const mode = Object.keys(priceFrequency).reduce((a, b) =>
        priceFrequency[a] > priceFrequency[b] ? a : b
      );

      // Update the state
      setData(rawData);
      setFilteredData(filtered);
      setModePrice(mode);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const redirectToBinance = () => {
    window.open(
      "https://p2p.binance.com/en/trade/all-payments/USDT?fiat=BOB",
      "_blank"
    );
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Binance P2P Data</h1>
      <button
        onClick={fetchBinanceP2P}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          background: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Fetch P2P Offers
      </button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {filteredData.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h2>
            Filtered Results (Above Average Surplus Amount & Completion Rate >
            95%):
          </h2>
          <ul>
            {filteredData.map((item, index) => (
              <li key={index}>
                <strong>Price:</strong> {item.adv.price} BOB |{" "}
                <strong>Surplus Amount:</strong> {item.adv.surplusAmount} USDT |{" "}
                <strong>Completion Rate:</strong>{" "}
                {item.advertiser.monthFinishRate * 100}%
              </li>
            ))}
          </ul>

          <h2>Mode Price: {modePrice} BOB</h2>

          <button
            onClick={redirectToBinance}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              fontSize: "16px",
              background: "#28a745",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Go to Binance
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
