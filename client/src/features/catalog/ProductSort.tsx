import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { useAppDispatch } from "../../store/counterStore";
import { setProductParams } from "./catalogSlice";

export default function ProductSort({
  sortOptions,
}: {
  sortOptions: { value: string; label: string }[];
}) {
  const dispatch = useAppDispatch();

  return (
    <FormControl>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
      >
        {sortOptions.map(({ value, label }) => (
          <FormControlLabel
            value={value}
            control={<Radio />}
            label={label}
            key={value}
            onChange={() => dispatch(setProductParams({ orderBy: value }))}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
