import { Button, Container, Paper, Typography } from "@mui/material";
//import { useNavigate } from "react-router";
import { useLocation } from "react-router";
import { history } from "../history/history";

export default function ServerError() {
  //const navigate = useNavigate();
  const { state }: any = useLocation();

  return (
    <Container component={Paper}>
      {state?.state?.error ? (
        <>
          <Typography variant="h3" color="error" gutterBottom>
            {state.state.error.title}
          </Typography>
          <Typography>
            {state.state.error.detail} | "Internal Server Error"
          </Typography>
        </>
      ) : (
        <Typography variant="h5" gutterBottom>
          Server Error
        </Typography>
      )}
      <Button onClick={() => history.push("/catalog")}>
        Go back to the store
      </Button>
    </Container>
  );
}
