import PropTypes from "prop-types";
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

PriceBox.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

PriceBox.defaultProps = {
  price: "N/A",
};

export default PriceBox;
