// styles.js
import { styled } from "@mui/material/styles";

export const DashboardContainer = styled("div")({
  padding: "20px",
  fontFamily: "Arial, sans-serif",
});

export const PriceContainer = styled("div")({
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  marginTop: "20px",
});

export const PriceCard = styled("div")(({ theme }) => ({
  flex: 1,
  padding: "20px",
  margin: "10px",
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  textAlign: "center",
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[1],
}));

export const ErrorText = styled("p")(({ theme }) => ({
  color: theme.palette.error.main,
}));

export const LoadingText = styled("p")(({ theme }) => ({
  color: theme.palette.text.primary,
}));
