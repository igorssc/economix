"use client";
import { CreateRecordDialog } from "@/components/CreateRecordDialog";
import { DeleteRecordDialog } from "@/components/DeleteRecordDialog";
import { EditRecordDialog } from "@/components/EditRecordDialog";
import { ViewRecordDialog } from "@/components/ViewRecordDialog";
import { ViewRecordsByTitleDialog } from "@/components/ViewRecordsByTitleDialog";
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
  isOpenViewRecordsByTitleDialog: boolean;
  setIsOpenViewRecordsByTitleDialog: Dispatch<SetStateAction<boolean>>;
  titleSelected: {
    title: string;
    category: string;
    periodMonths: number;
    periodDays: number;
  };
  setTitleSelected: Dispatch<
    SetStateAction<{
      title: string;
      category: string;
      periodMonths: number;
      periodDays: number;
    }>
  >;
}

export const DialogContext = createContext({} as DialogData);

export function DialogProvider({ children }: DialogProviderProps) {
  const [isOpenCreateRecordDialog, setIsOpenCreateRecordDialog] =
    useState(false);
  const [isOpenViewRecordDialog, setIsOpenViewRecordDialog] = useState(false);
  const [isOpenEditRecordDialog, setIsOpenEditRecordDialog] = useState(false);
  const [isOpenDeleteRecordDialog, setIsOpenDeleteRecordDialog] =
    useState(false);
  const [isOpenViewRecordsByTitleDialog, setIsOpenViewRecordsByTitleDialog] =
    useState(false);

  const [titleSelected, setTitleSelected] = useState({
    title: "",
    category: "",
    periodMonths: 0,
    periodDays: -1,
  });

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
        isOpenViewRecordsByTitleDialog,
        setIsOpenViewRecordsByTitleDialog,
        titleSelected,
        setTitleSelected,
      }}
    >
      <>
        <SnackbarProvider maxSnack={3}>
          <CreateRecordDialog />

          {isOpenViewRecordDialog && <ViewRecordDialog />}

          {isOpenEditRecordDialog && <EditRecordDialog />}

          {isOpenDeleteRecordDialog && <DeleteRecordDialog />}

          {isOpenViewRecordsByTitleDialog && <ViewRecordsByTitleDialog />}
        </SnackbarProvider>
        {children}
      </>
    </DialogContext.Provider>
  );
}
