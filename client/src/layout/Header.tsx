import { ShoppingCart } from "@mui/icons-material";
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  List,
  ListItem,
  Switch,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useStoreContext } from "../context/StoreContext";

const midLinks = [
  { title: "Catalog", path: "/catalog" },
  { title: "About", path: "/about" },
  { title: "Contact", path: "/contact" },
];

const rightLinks = [
  { title: "Login", path: "/login" },
  { title: "Register", path: "/register" },
];

const navStyles = {
  color: "inherit",
  typography: "h6",
  "&:hover": {
    color: "grey.500",
  },
  "&.active": {
    color: "text.secondary",
  },
  textDecoration: "none",
};

export default function Header(props: {
  setDarkMode: (val: boolean) => void;
  darkMode: boolean;
}) {
  const basket = useStoreContext()?.basket;
  const itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0);

  const { setDarkMode, darkMode } = props;
  const handleToggle = () => {
    darkMode ? setDarkMode(false) : setDarkMode(true);
  };
  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box display="flex" alignItems="center">
          <Typography sx={navStyles} variant="h6" component={NavLink} to="/">
            Re-Store
          </Typography>
          <Switch onChange={handleToggle} />
        </Box>

        <Box>
          <List sx={{ display: "flex" }}>
            {midLinks.map(({ title, path }) => {
              return (
                <ListItem
                  component={NavLink}
                  to={path}
                  key={path}
                  sx={navStyles}
                >
                  {title.toUpperCase()}
                </ListItem>
              );
            })}
          </List>
        </Box>

        <Box display="flex" alignItems="center">
          <IconButton
            component={Link}
            to="/basket"
            size="large"
            sx={{ color: "inherit" }}
          >
            <Badge badgeContent={itemCount} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>
          <List sx={{ display: "flex" }}>
            {rightLinks.map(({ title, path }) => {
              return (
                <ListItem
                  component={NavLink}
                  to={path}
                  key={path}
                  sx={navStyles}
                >
                  {title.toUpperCase()}
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
