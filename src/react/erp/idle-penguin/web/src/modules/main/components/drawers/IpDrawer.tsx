import {
  List,
  ListItemButton,
  ListItemText,
  Drawer,
  Box,
  ListItemIcon,
  Typography,
  Divider,
} from "@mui/material";
import { useIpAppMainContext } from "../../contexts/IpAppMainContext.ts";
import { useCallback } from "react";
import { Link, useLocation } from "react-router-dom";

const DRAWER_WIDTH = 280;

export default function IpDrawer() {
  const { sidebarOpen, toggleSidebar } = useIpAppMainContext();
  const location = useLocation(); // To detect which link is active

  const closeSidebar = useCallback(() => {
    toggleSidebar(false);
  }, [toggleSidebar]);

  return (
    <Drawer
      open={sidebarOpen}
      onClose={closeSidebar}
      PaperProps={{
        sx: { width: DRAWER_WIDTH, border: "none" },
      }}
    >
      <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        {/* Header / Brand Section */}
        <Box sx={{ p: 3, pb: 2 }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: 800, letterSpacing: 0.5, color: "#546e7a" }}
          >
            Idle Penguin
          </Typography>
          <Typography variant="caption" color="text.secondary">
            v1.0.4
          </Typography>
        </Box>

        <Divider sx={{ mx: 2, mb: 1, opacity: 0.6 }} />

        {/* Navigation List */}
        <List sx={{ px: 2 }}>
          <NavigationItem
            to="/"
            icon="home"
            label="Home"
            onClick={closeSidebar}
            active={location.pathname === "/"}
          />
          <NavigationItem
            to="/about"
            icon="info"
            label="About Us"
            active={location.pathname === "/about"}
            onClick={closeSidebar}
          />
        </List>

        {/* Optional Footer Section */}
        <Box sx={{ mt: "auto", p: 2, textAlign: "center" }}>
          <Typography variant="overline" sx={{ opacity: 0.5 }}>
            © 2026 IP Corp
          </Typography>
        </Box>
      </Box>
    </Drawer>
  );
}

// Sub-component for cleaner code
function NavigationItem({
  to,
  icon,
  label,
  active,
  onClick
}: {
  to: string;
  icon: string;
  label: string;
  active: boolean;
  onClick?: () => void;
}) {
  return (
    <ListItemButton
      component={Link}
      to={to}
      selected={active}
      onClick={onClick}
      sx={{
        borderRadius: 2, // Rounded corners for a modern look
        mb: 0.5,
        "&.Mui-selected": {
          backgroundColor: "#546e7a",
          color: "white",
          "& .MuiListItemIcon-root": { color: "white" },
          "&:hover": { backgroundColor: "#546e7a" },
        },
      }}
    >
      <ListItemIcon sx={{ minWidth: 40 }}>
        <span className="material-symbols-outlined">{icon}</span>
      </ListItemIcon>
      <ListItemText
        primary={label}
        sx={{
          fontSize: "0.9rem",
          fontWeight: active ? 600 : 400,
        }}
      />
    </ListItemButton>
  );
}
