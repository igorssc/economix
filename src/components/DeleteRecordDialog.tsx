import { DialogContext } from "@/contexts/dialogsContext";
import DialogMui from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useContext } from "react";
import { Button } from "./Button";

export function DeleteRecordDialog() {
  const handleClose = () => setOpen(false);
  const {
    isOpenDeleteRecordDialog: open,
    setIsOpenDeleteRecordDialog: setOpen,
    recordSelected,
  } = useContext(DialogContext);

  return (
    <>
      <DialogMui open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Tem certeza?</DialogTitle>
        <DialogContent className="flex flex-col gap-3">
          <h1>Título: {recordSelected.title}</h1>
          <h1>
            Categoria:{" "}
            {recordSelected.category === "deposit" ? "Depósito" : "Retirada"}
          </h1>
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

          <p className="text-md mt-3">
            Deseja mesmo deletar esse registro?{" "}
            <span className="mt-3 font-bold uppercase block">
              Essa ação é irreversível!
            </span>
          </p>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} scheme="secondary" isSmall>
            Cancelar
          </Button>
          <Button autoFocus onClick={handleClose} scheme="tertiary" isSmall>
            Deletar
          </Button>
        </DialogActions>
      </DialogMui>
    </>
  );
}
