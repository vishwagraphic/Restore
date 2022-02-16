import { AppBar, Switch, Toolbar, Typography } from "@mui/material";
import React from "react";

export default function Header(props: {
  setDarkMode: (val: boolean) => void;
  darkMode: boolean;
}) {
  const { setDarkMode, darkMode } = props;
  const handleToggle = () => {
    darkMode ? setDarkMode(false) : setDarkMode(true);
  };
  return (
    <AppBar sx={{ mb: 4 }}>
      <Toolbar>
        <Typography variant="h6">Re-Store</Typography>
        <Switch onChange={handleToggle} />
      </Toolbar>
    </AppBar>
  );
}
