import { DialogContext } from "@/contexts/dialogsContext";
import { RecordContext, RecordType } from "@/contexts/recordContext";
import { generateMaskCategory } from "@/utils/generateMaskCategory";
import DialogMui from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { X } from "@phosphor-icons/react";
import { useContext, useEffect, useState } from "react";
import { DetailsByTitleChart } from "./DetailsByTitleChart";
import { TableRecords } from "./TableRecords";

export function ViewRecordsByTitleDialog() {
  const handleClose = () => setOpen(false);

  const {
    isOpenViewRecordsByTitleDialog: open,
    setIsOpenViewRecordsByTitleDialog: setOpen,
    titleSelected,
  } = useContext(DialogContext);

  const { allRecordsFrom30DaysAgo } = useContext(RecordContext);

  const [data, setData] = useState<RecordType[]>([]);

  useEffect(() => {
    setData(() =>
      allRecordsFrom30DaysAgo.filter(
        (value) =>
          value.category === titleSelected.category &&
          value.title === titleSelected.title
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allRecordsFrom30DaysAgo]);

  return (
    <>
      <DialogMui open={open} onClose={handleClose} fullWidth>
        <DialogTitle className="flex items-center justify-between">
          <div>
            {titleSelected.title.charAt(0).toUpperCase() +
              titleSelected.title.slice(1).toLowerCase()}
            <small className="bg-purple-700 rounded-xl px-3 py-[0.125rem] text-white ml-2 text-xs">
              {generateMaskCategory(titleSelected.category)}
            </small>
          </div>
          <div className="flex items-center justify-center">
            <X
              size={26}
              className="cursor-pointer text-black hover:text-gray-600"
              weight="light"
              onClick={handleClose}
            />
          </div>
        </DialogTitle>
        <DialogContent className="flex flex-col gap-3 overflow-y-visible">
          <DetailsByTitleChart
            records={data}
            {...(titleSelected.category === "expenditure" && {
              scheme: "secondary",
            })}
          />
          <TableRecords recordsInit={data} hide={["title", "category"]} />
        </DialogContent>
      </DialogMui>
    </>
  );
}