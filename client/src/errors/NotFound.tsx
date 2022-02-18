import { Button, Container, Divider, Paper, Typography } from "@mui/material";
import { useLocation } from "react-router";
import { history } from "../history/history";

export default function NotFound() {
  const { state }: any = useLocation();

  console.log(state?.state);

  return (
    <Container component={Paper}>
      <Typography variant="h3" color="error" gutterBottom>
        Oops - We could not find what you are looking for
      </Typography>

      <Divider />
      <Button onClick={() => history.push("/catalog")}>
        Go back to the store
      </Button>
    </Container>
  );
}
