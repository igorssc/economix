import { RecordType } from "@/contexts/recordContext";
import DialogMui from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Dispatch, SetStateAction } from "react";
import { Button } from "./Button";

interface DialogPropsRestart {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  record: RecordType;
}

export function DeleteRecordDialog({
  open,
  setOpen,
  record,
}: DialogPropsRestart) {
  const handleClose = () => setOpen(false);

  return (
    <>
      <DialogMui open={open} onClose={handleClose}>
        <DialogTitle>Tem certeza?</DialogTitle>
        <DialogContent className="flex flex-col gap-3 sm:w-96">
          <h1>Título: {record.title}</h1>
          <h1>
            Categoria: {record.category === "deposit" ? "Depósito" : "Retirada"}
          </h1>
          <h1>
            Valor:{" "}
            {record.amount?.toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL",
            })}
          </h1>
          <h1>Descrição: {record.description}</h1>
          <h1>
            Data:{" "}
            {new Date(record.date).toLocaleDateString("pt-br", {
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
