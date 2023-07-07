import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import SelectMui from "@mui/material/Select";
import { Dispatch, SetStateAction } from "react";

interface SelectProps {
  label: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  options: string[];
}

export function Select({ label, value, setValue, options }: SelectProps) {
  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel>{label}</InputLabel>
      <SelectMui
        id="demo-select-small"
        value={value}
        label={label}
        onChange={(e) => setValue(e.target.value)}
      >
        {options.map((option, index) => (
          <MenuItem value={option} key={index}>
            {option}
          </MenuItem>
        ))}
      </SelectMui>
    </FormControl>
  );
}
