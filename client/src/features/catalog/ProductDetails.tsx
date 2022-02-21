import { LoadingButton } from "@mui/lab";
import {
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import agent from "../../api/agent";
import { useStoreContext } from "../../context/StoreContext";
import NotFound from "../../errors/NotFound";
import LoadingComponent from "../../layout/LoadingComponent";
import { Product } from "../../models/products";
import { currencyFormat } from "../../utils/utils";

export default function ProductDetails() {
  const basket = useStoreContext()?.basket;
  const setBasket = useStoreContext()?.setBasket;
  const removeItem = useStoreContext()?.removeItem;
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const item = basket?.items.find((i) => i.productId === product?.id);

  useEffect(() => {
    if (item && item?.quantity > 0) setQuantity(item?.quantity);
    agent.Catalog.details(id !== undefined ? parseInt(id) : 0)
      .then((response) => setProduct(response))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [id, item]);

  const handleInputChange = (event: any) => {
    if (event.target.value >= 0) {
      setQuantity(parseInt(event.target.value));
    }
  };

  const handleUpdateCart = () => {
    setSubmitting(true);
    if (!item || quantity > item.quantity) {
      const updatedQuantity = item ? quantity - item?.quantity : quantity;
      if (basket && setBasket) {
        agent.Basket.addItem(product?.id!, updatedQuantity)
          .then((basket) => setBasket(basket))
          .catch((err) => console.log(err))
          .finally(() => setSubmitting(false));
      }
    } else {
      const updatedQuantity = item?.quantity - quantity;
      if (removeItem) {
        agent.Basket.deleteItem(item?.productId, updatedQuantity)
          .then(() => removeItem(item?.productId, updatedQuantity))
          .catch((err) => console.log(err))
          .finally(() => setSubmitting(false));
      }
    }
  };

  if (loading) return <LoadingComponent message="Loading details..." />;

  if (!product) return <NotFound />;

  return (
    <Grid container spacing={6}>
      <Grid item xs={6}>
        <img
          src={product.pictureUrl}
          alt={product.name}
          style={{ width: "100%" }}
        />
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h3">{product.name}</Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="h4" color="secondary">
          {currencyFormat(product?.price)}
        </Typography>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>{product.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>{product.description}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>{product.type}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Brand</TableCell>
                <TableCell>{product.brand}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Quantity in stock</TableCell>
                <TableCell>{product.quantityStock}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              variant="outlined"
              type="number"
              label="Quantity in Cart"
              value={quantity}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <LoadingButton
              disabled={
                item?.quantity === quantity || (!item && quantity === 0)
              }
              sx={{
                height: "55px",
              }}
              color="primary"
              size="large"
              variant="contained"
              fullWidth
              loading={submitting}
              onClick={handleUpdateCart}
            >
              {item ? "Update Quantity" : "Add to cart"}
            </LoadingButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
