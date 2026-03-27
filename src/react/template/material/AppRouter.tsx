import { Box, Typography } from "@mui/material";
import {
  HashRouter,
  Link as RouterLink,
  Route,
  Routes,
} from "react-router-dom";
const Home = () => (
  <Box className="p-4 text-green-400">
    <Typography>Home Page</Typography>
  </Box>
);
const About = () => (
  <Box className="p-4 text-blue-400">
    <Typography>About Page</Typography>
  </Box>
);

export const RouteApp = () => {
  return (
    <HashRouter>
      <nav className="p-4 bg-slate-800 flex gap-4">
        {/* These will produce URLs like index.html#/ and index.html#/about */}
        <RouterLink to="/" className="hover:text-blue-500">
          Home
        </RouterLink>
        <RouterLink to="/about" className="hover:text-blue-500">
          About
        </RouterLink>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </HashRouter>
  );
};
