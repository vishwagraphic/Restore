import {
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../store/counterStore";
import { currencyFormat } from "../../utils/utils";

export default function BasketSummary() {
  const { basket } = useAppSelector((state) => state.basket);
  const [subTotal, setSubTotal] = useState<number>(0);
  const [deliveryFee, setDeliveryFee] = useState<number>(0);

  useEffect(() => {
    if (basket) {
      const price: number = Number(
        basket?.items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        ) ?? 0
      );
      setSubTotal(price);
    }
  }, [basket]);

  useEffect(() => {
    setDeliveryFee(subTotal > 10000 ? 0 : (subTotal / 100) * 5);
  }, [subTotal]);

  return (
    <>
      <TableContainer component={Paper} variant={"outlined"}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell colSpan={2}>Subtotal</TableCell>
              <TableCell align="right">{currencyFormat(subTotal)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>Delivery fee*</TableCell>
              <TableCell align="right">{currencyFormat(deliveryFee)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell align="right">
                {currencyFormat(subTotal + deliveryFee)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <span style={{ fontStyle: "italic" }}>
                  *Orders over $100 qualify for free delivery
                </span>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
