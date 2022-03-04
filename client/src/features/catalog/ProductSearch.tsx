import { debounce, TextField } from "@mui/material";
import { useState } from "react";
import { useAppDispatch } from "../../store/counterStore";
import { setProductParams } from "./catalogSlice";

export default function ProductSearch() {
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState<string>("");

  const debounceSearch = debounce((event: any) => {
    dispatch(
      setProductParams({ searchTerm: event.target.value, pageNumber: 1 })
    );
  }, 1000);

  return (
    <TextField
      label="Search Products"
      variant="outlined"
      fullWidth
      value={searchTerm || ""}
      onChange={(event: any) => {
        setSearchTerm(event.target.value);
        debounceSearch(event);
      }}
    />
  );
}
