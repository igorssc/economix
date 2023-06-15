"use client";
import { CreateRecordDialog } from "@/components/CreateRecordDialog";
import { DeleteRecordDialog } from "@/components/DeleteRecordDialog";
import { EditRecordDialog } from "@/components/EditRecordDialog";
import { ViewRecordDialog } from "@/components/ViewRecordDialog";
import { SnackbarProvider } from "notistack";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";
import { RecordType } from "./recordContext";

interface DialogProviderProps {
  children: ReactNode;
}

interface DialogData {
  isOpenCreateRecordDialog: boolean;
  setIsOpenCreateRecordDialog: Dispatch<SetStateAction<boolean>>;
  isOpenViewRecordDialog: boolean;
  setIsOpenViewRecordDialog: Dispatch<SetStateAction<boolean>>;
  isOpenEditRecordDialog: boolean;
  setIsOpenEditRecordDialog: Dispatch<SetStateAction<boolean>>;
  isOpenDeleteRecordDialog: boolean;
  setIsOpenDeleteRecordDialog: Dispatch<SetStateAction<boolean>>;
  recordSelected: RecordType;
  setRecordSelected: Dispatch<SetStateAction<RecordType>>;
}

export const DialogContext = createContext({} as DialogData);

export function DialogProvider({ children }: DialogProviderProps) {
  const [isOpenCreateRecordDialog, setIsOpenCreateRecordDialog] =
    useState(false);
  const [isOpenViewRecordDialog, setIsOpenViewRecordDialog] = useState(false);
  const [isOpenEditRecordDialog, setIsOpenEditRecordDialog] = useState(false);
  const [isOpenDeleteRecordDialog, setIsOpenDeleteRecordDialog] =
    useState(false);

  const [recordSelected, setRecordSelected] = useState({} as RecordType);

  return (
    <DialogContext.Provider
      value={{
        isOpenCreateRecordDialog,
        setIsOpenCreateRecordDialog,
        recordSelected,
        setRecordSelected,
        isOpenViewRecordDialog,
        setIsOpenViewRecordDialog,
        isOpenEditRecordDialog,
        setIsOpenEditRecordDialog,
        isOpenDeleteRecordDialog,
        setIsOpenDeleteRecordDialog,
      }}
    >
      <>
        <SnackbarProvider maxSnack={3}>
          <CreateRecordDialog />

          {isOpenViewRecordDialog && <ViewRecordDialog />}

          {isOpenEditRecordDialog && <EditRecordDialog />}

          {isOpenDeleteRecordDialog && <DeleteRecordDialog />}
        </SnackbarProvider>
        {children}
      </>
    </DialogContext.Provider>
  );
}
