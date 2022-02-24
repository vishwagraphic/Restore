import { ButtonGroup, Button, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/counterStore";
import { INCREMENT_COUNTER, DECREMENT_COUNTER } from "./counterReducer";
import { counterAction } from "./counterSlice";

export default function ContactPage() {
  const dispatch = useAppDispatch();
  const { data, title } = useAppSelector((state) => state.counter);

  return (
    <>
      <Typography variant="h2"> {title} </Typography>
      <Typography variant="h5">{data}</Typography>
      <ButtonGroup>
        <Button
          variant="contained"
          color="error"
          onClick={() =>
            dispatch(counterAction({ type: DECREMENT_COUNTER, payload: 2 }))
          }
        >
          Decrement
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() =>
            dispatch(counterAction({ type: INCREMENT_COUNTER, payload: 1 }))
          }
        >
          Increment
        </Button>
      </ButtonGroup>
    </>
  );
}
