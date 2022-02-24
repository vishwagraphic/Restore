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
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/counterStore";
import { currencyFormat } from "../../utils/utils";
import { addBasketItemAsync, removeBasketItemAsync } from "./basketSlice";
import BasketSummary from "./BasketSummary";

export default function BasketPage() {
  const { basket, status } = useAppSelector((state) => state.basket);
  const dispatch = useAppDispatch();

  if (!basket) {
    return <Typography variant="h4">Your basket is empty</Typography>;
  }

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
                    loading={status.includes(
                      "pendingRemove" + row.productId + "remove"
                    )}
                    onClick={() =>
                      dispatch(
                        removeBasketItemAsync({
                          productId: row.productId,
                          quantity: 1,
                          name: "remove",
                        })
                      )
                    }
                  >
                    <Remove />
                  </LoadingButton>
                  {row.quantity}
                  <LoadingButton
                    loading={status.includes("pending" + row.productId)}
                    onClick={() =>
                      dispatch(addBasketItemAsync({ productId: row.productId }))
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
                    loading={status.includes(
                      "pendingRemove" + row.productId + "delete"
                    )}
                    onClick={() =>
                      dispatch(
                        removeBasketItemAsync({
                          productId: row.productId,
                          quantity: 1,
                          name: "delete",
                        })
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
