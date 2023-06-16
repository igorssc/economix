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
import { useContext, useEffect, useState } from "react";
import { Button } from "./Button";

export function EditRecordDialog() {
  const getCurrentDateTimeString = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const day = now.getDate().toString().padStart(2, "0");
    const hour = now.getHours().toString().padStart(2, "0");
    const minute = now.getMinutes().toString().padStart(2, "0");

    return `${year}-${month}-${day}T${hour}:${minute}`;
  };

  const getDateTimeString = (date: Date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hour = date.getHours().toString().padStart(2, "0");
    const minute = date.getMinutes().toString().padStart(2, "0");

    return `${year}-${month}-${day}T${hour}:${minute}`;
  };

  const { updateRecord } = useContext(RecordContext);
  const {
    isOpenEditRecordDialog: open,
    setIsOpenEditRecordDialog: setOpen,
    recordSelected,
    setIsOpenViewRecordDialog,
  } = useContext(DialogContext);

  const { enqueueSnackbar } = useSnackbar();

  const [title, setTitle] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [amount, setAmount] = useState<number | string>("0,00");
  const [description, setDescription] = useState<string>();
  const [date, setDate] = useState(getCurrentDateTimeString());

  const [isEditingRecord, setIsEditingRecord] = useState(false);

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

  useEffect(() => {
    setCategory(recordSelected.category);
    setTitle(recordSelected.title);
    setAmount(
      recordSelected.amount.toLocaleString("pr-br", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    );
    setDescription(recordSelected.description || "");
    setDate(getDateTimeString(new Date(recordSelected.date)));
  }, []);

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

    setIsButtonDisabled(true);
    setIsEditingRecord(true);

    try {
      await updateRecord({
        id: recordSelected.id,
        title,
        category,
        amount: +String(amount).replace(/\./g, "").replace(/\,/g, "."),
        description,
        date: new Date(date).toISOString(),
      }).then((result) => {
        setTitle("");
        setCategory("");
        setDescription("");
        setAmount("0,00");
        setDate(getCurrentDateTimeString());

        enqueueSnackbar("Registro atualizado com sucesso!", {
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
      setIsEditingRecord(false);

      handleClose();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <DialogMui open={open} onClose={handleClose}>
        <DialogTitle className="flex items-center justify-between">
          Editar registro
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
            onChange={(e) => {
              setTitle("");
              setCategory(e.target.value);
            }}
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
            autoFocus
            margin="dense"
            label="Descrição (opcional)"
            type="text"
            fullWidth
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            autoFocus
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
          <Button
            autoFocus
            onClick={() => {
              handleClose();
              setIsOpenViewRecordDialog(true);
            }}
            scheme="secondary"
            isSmall
          >
            Voltar
          </Button>
          <Button onClick={handleSubmit} isSmall disabled={isButtonDisabled}>
            {isEditingRecord ? (
              <div className="inline-block w-7 h-7 after:content-[''] after:block after:w-full after:h-full after:rounded-[50%] after:border-4 after:border-y-white after:border-x-transparent after:animate-spin" />
            ) : (
              "Confirmar"
            )}
          </Button>
        </DialogActions>
      </DialogMui>
    </>
  );
}
