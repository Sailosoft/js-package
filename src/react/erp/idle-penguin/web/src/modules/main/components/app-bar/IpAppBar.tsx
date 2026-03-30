import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import { useIpAppMainContext } from "../../contexts/IpAppMainContext.ts";

export default function IpAppBar() {
  const context = useIpAppMainContext();

  const { toggleSidebar } = context;

  return (
    <AppBar position="static" sx={{ backgroundColor: "#546e7a" }}>
      <Toolbar>
        <IconButton
          onClick={() => toggleSidebar(true)}
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <span className="material-symbols-outlined">menu</span>
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Idle Penguin
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
