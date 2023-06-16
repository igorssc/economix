import { DialogContext } from "@/contexts/dialogsContext";
import { RecordContext } from "@/contexts/recordContext";
import DialogMui from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { X } from "@phosphor-icons/react";
import { enqueueSnackbar } from "notistack";
import { useContext } from "react";
import { Button } from "./Button";

export function DeleteRecordDialog() {
  const handleClose = () => setOpen(false);

  const { deleteRecord } = useContext(RecordContext);

  const {
    isOpenDeleteRecordDialog: open,
    setIsOpenDeleteRecordDialog: setOpen,
    recordSelected,
    setIsOpenViewRecordDialog,
  } = useContext(DialogContext);

  const handleDelete = async () => {
    try {
      await deleteRecord({
        id: recordSelected.id,
        date: recordSelected.date,
      }).then(() => {
        enqueueSnackbar("Registro removido com sucesso!", {
          variant: "success",
        });
      });
    } catch {
      enqueueSnackbar("Houve um erro! Tente novamente, por favor!", {
        variant: "error",
      });

      return;
    } finally {
      handleClose();
    }
  };

  return (
    <>
      <DialogMui open={open} onClose={handleClose} fullWidth>
        <DialogTitle className="flex items-center justify-between">
          Tem certeza?
          <div>
            <X
              size={26}
              className="cursor-pointer text-black hover:text-gray-600"
              weight="light"
              onClick={handleClose}
            />
          </div>
        </DialogTitle>
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
            <span className="mt-3 text-purple-900 font-bold uppercase block">
              Essa ação é irreversível!
            </span>
          </p>
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
          <Button autoFocus onClick={handleDelete} scheme="primary" isSmall>
            Deletar
          </Button>
        </DialogActions>
      </DialogMui>
    </>
  );
}
