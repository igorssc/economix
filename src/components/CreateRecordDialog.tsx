import { DialogContext } from "@/contexts/dialogsContext";
import { RecordContext } from "@/contexts/recordContext";
import DialogMui from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { X } from "@phosphor-icons/react";
import { useSnackbar } from "notistack";
import { useContext, useState } from "react";
import { Button } from "./Button";

const getCurrentDateTimeString = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const day = now.getDate().toString().padStart(2, "0");
  const hour = now.getHours().toString().padStart(2, "0");
  const minute = now.getMinutes().toString().padStart(2, "0");

  return `${year}-${month}-${day}T${hour}:${minute}`;
};

export function CreateRecordDialog() {
  const { createRecord } = useContext(RecordContext);
  const {
    isOpenCreateRecordDialog: open,
    setIsOpenCreateRecordDialog: setOpen,
  } = useContext(DialogContext);
  const { enqueueSnackbar } = useSnackbar();

  const [title, setTitle] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [amount, setAmount] = useState<number | string>("0,00");
  const [description, setDescription] = useState<string>();
  const [date, setDate] = useState(getCurrentDateTimeString());
  const [installments, setInstallments] = useState(1);

  const [isCreatingRecord, setIsCreatingRecord] = useState(false);

  const handleClose = () => setOpen(false);

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const optionsTitle = {
    depositsOptions: [
      "Salário",
      "Serviço",
      "Loteria",
      "Aposta",
      "Prêmiação",
      "Outros",
      "FGTS",
    ]
      .filter(function (elem, pos, self) {
        return self.indexOf(elem) == pos;
      })
      .sort(),
    withdrawsOptions: [
      "Reforma",
      "Subway",
      "Oficina",
      "Outros",
      "Supermercado",
      "Combustível",
      "Ifood",
      "Fast Food",
      "Alimentação",
      "Perfume",
      "Cinema",
      "Shopping",
      "Compra online",
      "Cartão de crédito",
      "Pagamentos",
      "Boletos",
      "Faculdade",
      "Streaming",
      "Netflix",
      "Amazon Prime",
      "Item doméstico",
      "Móvel",
      "Aparelho eletrônico",
      "Ferramenta",
    ]
      .filter(function (elem, pos, self) {
        return self.indexOf(elem) == pos;
      })
      .sort(),
  };

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

    if (!installments || installments < 1) {
      enqueueSnackbar("Insira uma quantidade de parcelas válida, por favor!", {
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

    setIsButtonDisabled(true);
    setIsCreatingRecord(true);

    try {
      await createRecord({
        title,
        category,
        amount: +String(amount).replace(/\./g, "").replace(/\,/g, "."),
        description,
        installments,
        date: new Date(date).toISOString(),
      }).then(() => {
        setTitle("");
        setCategory("");
        setDescription("");
        setAmount("0,00");
        setDate(getCurrentDateTimeString());
        setInstallments(1);

        enqueueSnackbar("Registro criado com sucesso!", {
          variant: "success",
        });
      });
    } catch {
      enqueueSnackbar("Houve um erro! Tente novamente, por favor!", {
        variant: "error",
      });

      return;
    } finally {
      setIsButtonDisabled(false);
      setIsCreatingRecord(false);

      handleClose();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <DialogMui open={open} onClose={handleClose}>
        <DialogTitle className="flex items-center justify-between">
          Criar registro
          <div>
            <X
              size={26}
              className="cursor-pointer text-black hover:text-gray-600"
              weight="light"
              onClick={handleClose}
            />
          </div>
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            select
            label="Categoria"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            fullWidth
            variant="outlined"
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
          <TextField
            margin="dense"
            select
            label="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            variant="outlined"
            SelectProps={{
              MenuProps: {
                style: { maxHeight: 400 },
              },
            }}
          >
            {category &&
              optionsTitle[
                category === "deposit" ? "depositsOptions" : "withdrawsOptions"
              ].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            Título
          </TextField>
          <TextField
            fullWidth
            variant="outlined"
            margin="dense"
            label="Valor total"
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
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">R$</InputAdornment>
              ),
            }}
          />
          <TextField
            margin="dense"
            label="Parcelas"
            type="number"
            fullWidth
            variant="outlined"
            value={installments}
            onChange={(e) =>
              +e.target.value >= 0 && setInstallments(+e.target.value)
            }
          />
          <TextField
            margin="dense"
            label="Descrição (opcional)"
            type="text"
            fullWidth
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Data"
            type="datetime-local"
            fullWidth
            variant="outlined"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} isSmall disabled={isButtonDisabled}>
            {isCreatingRecord ? (
              <div className="inline-block w-7 h-7 after:content-[''] after:block after:w-full after:h-full after:rounded-[50%] after:border-4 after:border-y-white after:border-x-transparent after:animate-spin" />
            ) : (
              "Criar"
            )}
          </Button>
        </DialogActions>
      </DialogMui>
    </>
  );
}
