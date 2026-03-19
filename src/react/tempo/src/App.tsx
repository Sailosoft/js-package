import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Box,
  Container,
  CssBaseline,
} from "@mui/material";
import { createRoot } from "react-dom/client";
import { HashRouter, Switch, Route, Link } from "react-router-dom";

const App = () => {
  return (
    <HashRouter>
      {/* Top Navigation */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            My App
          </Typography>

          <Button color="inherit" component={Link} to="/">
            Home
          </Button>

          <Button color="inherit" component={Link} to="/about">
            About
          </Button>
        </Toolbar>
      </AppBar>

      {/* Page Content */}
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
    </HashRouter>
  );
};

// Use the ReactDOM library to get the root element
const rootElement = document.getElementById("app");
createRoot(rootElement!).render(
  <>
    <CssBaseline />
    <App />
  </>,
);
