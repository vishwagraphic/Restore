import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { useState } from "react";

export default function ProductFilter({
  items,
  checked,
  onChange,
}: {
  items: string[];
  checked?: string[];
  onChange: (items: string[]) => void;
}) {
  const [checkedItems, setChecheckedItems] = useState(checked || []);

  const handleItemsChange = (value: string) => {
    const currentIndex = checkedItems.findIndex((item) => item === value);
    let newCheckedItems: string[] = [];
    if (currentIndex === -1) newCheckedItems = [...checkedItems, value];
    else newCheckedItems = checkedItems.filter((item) => item !== value);
    setChecheckedItems(newCheckedItems);
    onChange(newCheckedItems);
  };
  return (
    <>
      <FormGroup>
        {items.map((item) => (
          <FormControlLabel
            control={
              <Checkbox
                checked={checkedItems.indexOf(item) !== -1}
                onChange={() => handleItemsChange(item)}
              />
            }
            label={item}
            key={item}
          />
        ))}
      </FormGroup>
    </>
  );
}
