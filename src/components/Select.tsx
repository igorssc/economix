import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import SelectMui from "@mui/material/Select";
import { Dispatch, SetStateAction } from "react";

interface SelectProps {
  label: string;
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
  options: { value: number; label: string }[];
}

export function Select({ label, value, setValue, options }: SelectProps) {
  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel>{label}</InputLabel>
      <SelectMui
        id="demo-select-small"
        value={value}
        label={label}
        onChange={(e) => setValue(+e.target.value)}
      >
        {options.map((option, index) => (
          <MenuItem value={option.value} key={index}>
            {option.label}
          </MenuItem>
        ))}
      </SelectMui>
    </FormControl>
  );
}
