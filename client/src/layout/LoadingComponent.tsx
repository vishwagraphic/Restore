import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";

export default function LoadingComponent({ message }: { message: string }) {
  return (
    <Backdrop
      sx={{
        zIndex: (theme: { zIndex: { drawer: number } }) =>
          theme.zIndex.drawer + 1,
      }}
      open={true}
      invisible={true}
    >
      <CircularProgress color="secondary" />
      <Typography
        variant="h4"
        sx={{
          justifyContent: "center",
          position: "fixed",
          top: "55%",
          color: "secondary",
        }}
      >
        {message}
      </Typography>
    </Backdrop>
  );
}
