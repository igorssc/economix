import { RecordContext } from "@/contexts/recordContext";
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
import { useSnackbar } from "notistack";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { Button } from "./Button";

interface DialogPropsRestart {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const getCurrentDateTimeString = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const day = now.getDate().toString().padStart(2, "0");
  const hour = now.getHours().toString().padStart(2, "0");
  const minute = now.getMinutes().toString().padStart(2, "0");

  return `${year}-${month}-${day}T${hour}:${minute}`;
};

function convertStringToDate(dateTimeString: string): Date {
  const [datePart, timePart] = dateTimeString.split("T");
  const [year, month, day] = datePart.split("-");
  const [hour, minute] = timePart.split(":");

  return new Date(
    parseInt(year),
    parseInt(month) - 1,
    parseInt(day),
    parseInt(hour),
    parseInt(minute)
  );
}

export function Dialog({ open, setOpen }: DialogPropsRestart) {
  const { createRecord, refetchData } = useContext(RecordContext);
  const { enqueueSnackbar } = useSnackbar();

  const [title, setTitle] = useState<string>();
  const [category, setCategory] = useState<string>("");
  const [amount, setAmount] = useState<number | string>();
  const [description, setDescription] = useState<string>();
  const [date, setDate] = useState(getCurrentDateTimeString());

  const handleClose = () => setOpen(false);

  const {} = useContext(RecordContext);

  const [isButtonDisabled, serIsButtonDisabled] = useState(false);

  const handleSubmit = async () => {
    if (!title) {
      enqueueSnackbar("Insira um título válido, por favor!", {
        variant: "warning",
      });

      return;
    }

    if (!category) {
      enqueueSnackbar("Insira uma categoria válida, por favor!", {
        variant: "warning",
      });

      return;
    }

    if (!amount) {
      enqueueSnackbar("Insira um valor válido, por favor!", {
        variant: "warning",
      });

      return;
    }

    if (!date) {
      enqueueSnackbar("Insira uma data válida, por favor!", {
        variant: "warning",
      });

      return;
    }

    serIsButtonDisabled(true);

    try {
      await createRecord({
        title,
        category,
        amount: +String(amount).replace(/\./g, "").replace(/\,/g, "."),
        description,
        date: new Date(date).toISOString(),
      });
    } catch {
      enqueueSnackbar("Houve um erro! Tente novamente, por favor!", {
        variant: "error",
      });

      return;
    } finally {
      serIsButtonDisabled(false);
    }

    setTitle("");
    setCategory("");
    setDescription("");
    setAmount(undefined);

    handleClose();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
              value={amount}
              onChange={(e) => {
                const cleanedValue = e.target.value.replace(/[^0-9]/g, "");

                const floatValue =
                  String(+cleanedValue).length > 3
                    ? String(+cleanedValue)
                    : ("000" + String(+cleanedValue)).slice(-3);

                const formatted =
                  floatValue.slice(0, -2) + "." + floatValue.slice(-2);

                setAmount(
                  parseFloat(formatted).toLocaleString("pt-br", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })
                );
              }}
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
            onChange={(e) => {
              setDate(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} scheme="secondary" isSmall>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} isSmall disabled={isButtonDisabled}>
            Confirmar
          </Button>
        </DialogActions>
      </DialogMui>
    </>
  );
}
