import { Typography, Box, Container, CssBaseline } from "@mui/material";
import { createRoot } from "react-dom/client";
import { HashRouter, Switch, Route, Link } from "react-router-dom";
import IpAppMainContextProvider from "./modules/main/components/providers/IpAppMainContextProvider.tsx";
import IpAppMainLayout from "./modules/main/layouts/IpAppMainLayout.tsx";

const App = () => {
  return (
    <>
      <IpAppMainLayout>
        <Container sx={{ mt: 4 }}>
          <Switch>
            <Route
              exact
              path="/"
              component={() => (
                <Box>
                  <Typography variant="h4" gutterBottom>
                    Hello World
                  </Typography>
                  <Typography>Welcome to your Material UI app.</Typography>
                </Box>
              )}
            />

            <Route
              path="/about"
              component={() => (
                <Box>
                  <Typography variant="h4" gutterBottom>
                    About
                  </Typography>
                  <Typography>This is the about page.</Typography>
                </Box>
              )}
            />
          </Switch>
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
