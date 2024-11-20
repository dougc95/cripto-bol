import { PriceCard } from "../styles/styles";

const PriceBox = ({ title, price }) => {
  return (
    <PriceCard>
      <h2>{title}</h2>
      <p style={{ fontSize: "24px", fontWeight: "bold" }}>
        {price ? `${price} BOB` : "N/A"}
      </p>
    </PriceCard>
  );
};

export default PriceBox;
