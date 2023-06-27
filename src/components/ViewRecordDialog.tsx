import { DialogContext } from "@/contexts/dialogsContext";
import DialogMui from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { DotsThreeVertical, X } from "@phosphor-icons/react";
import { useContext, useState } from "react";

export function ViewRecordDialog() {
  const handleClose = () => setOpen(false);

  const {
    isOpenViewRecordDialog: open,
    setIsOpenViewRecordDialog: setOpen,
    recordSelected,
    setIsOpenEditRecordDialog,
    setIsOpenDeleteRecordDialog,
  } = useContext(DialogContext);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const options = [
    {
      label: "Editar",
      action: () => {
        setOpen(false);
        setIsOpenEditRecordDialog(true);
      },
    },
    {
      label: "Deletar",
      action: () => {
        setOpen(false);
        setIsOpenDeleteRecordDialog(true);
      },
    },
  ];

  return (
    <>
      <DialogMui open={open} onClose={handleClose} fullWidth>
        <DialogTitle className="flex items-center justify-between">
          <div>
            Exibir registro{" "}
            <small className="bg-purple-700 rounded-xl px-3 py-[0.125rem] text-white ml-2 text-xs">
              {recordSelected.category === "revenue" ? "Receita" : "Despesa"}
            </small>
          </div>
          <div className="flex items-center justify-center">
            <div>
              <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={openMenu ? "long-menu" : undefined}
                aria-expanded={openMenu ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleClick}
              >
                <DotsThreeVertical size={32} weight="bold" />
              </IconButton>
              <Menu
                id="long-menu"
                MenuListProps={{
                  "aria-labelledby": "long-button",
                }}
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleCloseMenu}
                PaperProps={{
                  style: {
                    width: "20ch",
                  },
                }}
              >
                {options.map((option, index) => (
                  <MenuItem key={index} onClick={option.action}>
                    {option.label}
                  </MenuItem>
                ))}
              </Menu>
            </div>
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
      </DialogMui>
    </>
  );
}
