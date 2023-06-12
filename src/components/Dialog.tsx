import DialogMui from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "./Button";

interface DialogPropsRestart {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const getCurrentDateTime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const day = now.getDate().toString().padStart(2, "0");
  const hour = now.getHours().toString().padStart(2, "0");
  const minute = now.getMinutes().toString().padStart(2, "0");

  return `${year}-${month}-${day}T${hour}:${minute}`;
};

const DialogCreateRegister = ({ open, setOpen }: DialogPropsRestart) => {
  const [title, setTitle] = useState<string>();
  const [category, setCategory] = useState<string>("");
  const [amount, setAmount] = useState<number | string>();
  const [description, setDescription] = useState<string>();
  const [date, setDate] = useState(getCurrentDateTime());

  const handleClose = () => setOpen(false);

  return (
    <>
      <DialogMui open={open} onClose={handleClose}>
        <DialogTitle>Criar registro</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Título"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            select
            label="Categoria"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            fullWidth
            variant="standard"
          >
            {[
              { label: "Depósito", value: "deposit" },
              { label: "Retirada", value: "withdraw" },
            ].map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
            valor
          </TextField>
          <FormControl fullWidth variant="standard" margin="dense">
            <InputLabel htmlFor="amount">Valor</InputLabel>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              startAdornment={
                <InputAdornment position="start">R$</InputAdornment>
              }
            />
          </FormControl>
          <TextField
            autoFocus
            margin="dense"
            label="Descrição"
            type="text"
            fullWidth
            variant="standard"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Data"
            type="datetime-local"
            fullWidth
            variant="standard"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} scheme="secondary" isSmall>
            Cancelar
          </Button>
          <Button
            onClick={() => {
              console.log({
                title,
                category,
                amount,
                description,
                date,
              });
              handleClose();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            isSmall
          >
            Confirmar
          </Button>
        </DialogActions>
      </DialogMui>
    </>
  );
};

export const Dialog = {
  Register: DialogCreateRegister,
};
