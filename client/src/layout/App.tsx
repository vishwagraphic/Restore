import { ThemeProvider } from "@emotion/react";
import { Container, createTheme, CssBaseline } from "@mui/material";
import { useState } from "react";
import Catalog from "../features/catalog/Catalog";
import Header from "./Header";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const palletteType = darkMode ? "dark" : "light";
  const theme = createTheme({
    palette: {
      mode: palletteType,
      background: {
        default: !darkMode ? "#eaeaea" : "#121212",
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header setDarkMode={setDarkMode} darkMode={darkMode} />
      <Container sx={{ mt: 16 }}>
        <Catalog />
      </Container>
    </ThemeProvider>
  );
}

export default App;
