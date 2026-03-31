import { Typography, Box, Container, CssBaseline } from "@mui/material";
import { createRoot } from "react-dom/client";
import { HashRouter, Switch, Route, Link } from "react-router-dom";
import IpAppMainContextProvider from "./modules/main/components/providers/IpAppMainContextProvider.tsx";
import IpAppMainLayout from "./modules/main/layouts/IpAppMainLayout.tsx";
import RouteRender from "./routes/route.render.tsx";
import { APP_ROUTES } from "./routes/route.ts";
import { RouteNotFound } from "./routes/route.not-found.tsx";

const App = () => {
  return (
    <>
      <IpAppMainLayout>
        <Container sx={{ mt: 4 }}>
          <RouteRender routes={APP_ROUTES} NotFound={RouteNotFound} />
        </Container>
      </IpAppMainLayout>
    </>
  );
};

// Use the ReactDOM library to get the root element
const rootElement = document.getElementById("app");
createRoot(rootElement!).render(
  <>
    <IpAppMainContextProvider>
      <HashRouter>
        <CssBaseline />
        <App />
      </HashRouter>
    </IpAppMainContextProvider>
  </>,
);
