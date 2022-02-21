import { Add, Delete, Remove } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Grid,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useState } from "react";
import agent from "../../api/agent";
import { useStoreContext } from "../../context/StoreContext";
import { currencyFormat } from "../../utils/utils";
import BasketSummary from "./BasketSummary";

export default function BasketPage() {
  const basket = useStoreContext()?.basket;
  const setBasket = useStoreContext()?.setBasket;
  const removeItem = useStoreContext()?.removeItem;
  const [status, setStatus] = useState({ loading: false, name: "" });

  const handleAddItem = (productId: number, quantity = 1, name: string) => {
    if (setBasket) {
      setStatus({ loading: true, name });
      agent.Basket.addItem(productId, quantity)
        .then((basket) => setBasket(basket))
        .catch((err) => console.log(err))
        .finally(() => setStatus({ loading: false, name: "" }));
    }
  };

  const handleRemoveItem = (productId: number, quantity = 1, name: string) => {
    if (setBasket && removeItem) {
      setStatus({ loading: true, name });
      agent.Basket.deleteItem(productId, quantity)
        .then(() => removeItem(productId, quantity))
        .catch((err) => console.log(err))
        .finally(() => setStatus({ loading: false, name: "" }));
    }
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="right">Subtotal</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {basket?.items.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Box display="flex" alignItems="center">
                    <img
                      src={row.pictureUrl}
                      alt={row.name}
                      style={{ height: "50px", marginRight: "20px" }}
                    />
                    <span>{row.name}</span>
                  </Box>
                </TableCell>

                <TableCell align="right">{currencyFormat(row.price)}</TableCell>
                <TableCell align="center">
                  <LoadingButton
                    loading={
                      status.loading &&
                      status.name === "removeItem" + row.productId
                    }
                    onClick={() =>
                      handleRemoveItem(
                        row.productId,
                        1,
                        "removeItem" + row.productId
                      )
                    }
                  >
                    <Remove />
                  </LoadingButton>
                  {row.quantity}
                  <LoadingButton
                    loading={
                      status.loading &&
                      status.name === "addItem" + row.productId
                    }
                    onClick={() =>
                      handleAddItem(row.productId, 1, "addItem" + row.productId)
                    }
                  >
                    <Add />
                  </LoadingButton>
                </TableCell>
                <TableCell align="right">
                  {currencyFormat(row.price, row.quantity)}
                </TableCell>
                <TableCell align="right">
                  <LoadingButton
                    loading={
                      status.loading &&
                      status.name === "deleteItem" + row.productId
                    }
                    onClick={() =>
                      handleRemoveItem(
                        row.productId,
                        row.quantity,
                        "deleteItem" + row.productId
                      )
                    }
                  >
                    <Delete />
                  </LoadingButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container>
        <Grid item xs={6} />
        <Grid item xs={6}>
          <BasketSummary />
        </Grid>
      </Grid>
      <Button
        component={Link}
        href={`/checkout`}
        size="large"
        variant="contained"
        fullWidth
      >
        Checkout
      </Button>
    </>
  );
}
