import { ThemeProvider } from "@emotion/react";
import { Container, createTheme, CssBaseline } from "@mui/material";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AboutPage from "../features/about/AboutPage";
import Catalog from "../features/catalog/Catalog";
import ProductDetails from "../features/catalog/ProductDetails";
import ContactPage from "../features/contact/ContactPage";
import HomePage from "../home/HomePage";
import Header from "./Header";
import "react-toastify/dist/ReactToastify.css";
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";
import BasketPage from "../features/basket/BasketPage";
import { getCookie } from "../utils/utils";
import { useStoreContext } from "../context/StoreContext";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";
import CheckoutPage from "../features/checkout/CheckoutPage";

function App() {
  const setBasket = useStoreContext()?.setBasket;
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const palletteType = darkMode ? "dark" : "light";

  useEffect(() => {
    const buyerId = getCookie("buyerId");
    if (buyerId && setBasket) {
      agent.Basket.get()
        .then((basket) => setBasket(basket))
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [setBasket]);

  const theme = createTheme({
    palette: {
      mode: palletteType,
      background: {
        default: !darkMode ? "#eaeaea" : "#121212",
      },
    },
  });

  if (loading) return <LoadingComponent message="Initializing..." />;

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="top-right" hideProgressBar />
      <CssBaseline />
      <Header setDarkMode={setDarkMode} darkMode={darkMode} />
      <Container sx={{ mt: 16 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/catalog/:id" element={<ProductDetails />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/server-error" element={<ServerError />} />
          <Route path="/basket" element={<BasketPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;
