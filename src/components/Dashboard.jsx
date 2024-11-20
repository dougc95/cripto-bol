import { useState, useEffect } from "react";
import axios from "axios";
import PriceBox from "./PriceBox";
import {
  DashboardContainer,
  PriceContainer,
  ErrorText,
  LoadingText,
} from "../styles/styles";

const Dashboard = () => {
  const [buyPrice, setBuyPrice] = useState(null);
  const [sellPrice, setSellPrice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrices = async () => {
      const url = "https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search";
      const headers = {
        "Content-Type": "application/json",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36",
        "Client-Type": "web",
      };

      const buyBody = {
        fiat: "BOB",
        page: 1,
        rows: 1,
        tradeType: "BUY",
        asset: "USDT",
      };

      const sellBody = {
        fiat: "BOB",
        page: 1,
        rows: 1,
        tradeType: "SELL",
        asset: "USDT",
      };

      setLoading(true);
      setError(null);

      try {
        const [buyResponse, sellResponse] = await Promise.all([
          axios.post(url, buyBody, { headers }),
          axios.post(url, sellBody, { headers }),
        ]);

        const buyData = buyResponse.data.data[0]?.adv?.price || null;
        const sellData = sellResponse.data.data[0]?.adv?.price || null;

        setBuyPrice(buyData);
        setSellPrice(sellData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPrices();
  }, []);

  return (
    <DashboardContainer>
      <h1>Binance P2P Prices</h1>
      {loading && <LoadingText>Loading...</LoadingText>}
      {error && <ErrorText>Error: {error}</ErrorText>}
      <PriceContainer>
        <PriceBox title="Buy Price" price={buyPrice} />
        <PriceBox title="Sell Price" price={sellPrice} />
      </PriceContainer>
    </DashboardContainer>
  );
};

export default Dashboard;
