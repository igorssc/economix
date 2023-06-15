import { DialogContext } from "@/contexts/dialogsContext";
import DialogMui from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useContext } from "react";
import { Button } from "./Button";

export function ViewRecordDialog() {
  const handleClose = () => setOpen(false);

  const {
    isOpenViewRecordDialog: open,
    setIsOpenViewRecordDialog: setOpen,
    recordSelected,
    setIsOpenEditRecordDialog,
    setIsOpenDeleteRecordDialog,
  } = useContext(DialogContext);

  return (
    <>
      <DialogMui open={open} onClose={handleClose} fullWidth>
        <DialogTitle>
          {recordSelected.category === "deposit" ? "Depósito" : "Retirada"}
        </DialogTitle>
        <DialogContent className="flex flex-col gap-3">
          <h1>Título: {recordSelected.title}</h1>
          <h1>
            Valor:{" "}
            {recordSelected.amount?.toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL",
            })}
          </h1>
          <h1>Descrição: {recordSelected.description}</h1>
          <h1>
            Data:{" "}
            {new Date(recordSelected.date).toLocaleDateString("pt-br", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </h1>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} scheme="secondary" isSmall>
            Voltar
          </Button>
          <Button
            onClick={() => {
              setOpen(false);
              setIsOpenEditRecordDialog(true);
            }}
            isSmall
          >
            Editar
          </Button>
          <Button
            autoFocus
            onClick={() => {
              setOpen(false);
              setIsOpenDeleteRecordDialog(true);
            }}
            scheme="tertiary"
            isSmall
          >
            Deletar
          </Button>
        </DialogActions>
      </DialogMui>
    </>
  );
}
