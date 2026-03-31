import { Card, Typography } from "@mui/material";

export function RouteNotFound() {
  return (
    <Card sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" }}>
      <Typography variant="h4" gutterBottom>404 - Not Found</Typography>
      <Typography variant="body1">The page you are looking for does not exist.</Typography>
    </Card>
  );
}