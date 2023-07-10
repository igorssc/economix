import { DialogContext } from "@/contexts/dialogsContext";
import { RecordContext, RecordType } from "@/contexts/recordContext";
import { filterRecordsBasedOnPeriod } from "@/utils/filterRecordsBasedOnPeriod";
import { generateMaskCategory } from "@/utils/generateMaskCategory";
import DialogMui from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { ArrowsLeftRight, X } from "@phosphor-icons/react";
import { parseISO } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { DetailsByTitleChart } from "./DetailsByTitleChart";
import { TableRecords } from "./TableRecords";

export function ViewRecordsByTitleDialog() {
  const {
    isOpenViewRecordsByTitleDialog: open,
    setIsOpenViewRecordsByTitleDialog: setOpen,
    titleSelected,
  } = useContext(DialogContext);

  const { allRecordsFromMonthsAgoByCategory } = useContext(RecordContext);

  const [dataTable, setDataTable] = useState<RecordType[]>([]);
  const [dataChart, setDataChart] = useState<
    { category: string; totalAmount: number; date: string }[]
  >([]);

  const [filterRecords, setFilterRecords] = useState("daily");

  const groupDataByMonth = (data: RecordType[]) => {
    const groupedData = [] as {
      category: string;
      totalAmount: number;
      date: string;
    }[];

    if (filterRecords === "daily") {
      data.forEach((value) => {
        groupedData.push({
          category: value.category,
          totalAmount: value.amount,
          date: value.date,
        });
      });
    } else {
      data.forEach((value) => {
        const indexMonth = groupedData.findIndex(
          (f) => f.date === value.date.substr(0, 7)
        );

        if (indexMonth >= 0) {
          groupedData[indexMonth].totalAmount += value.amount;
        } else {
          groupedData.push({
            category: value.category,
            totalAmount: value.amount,
            date: parseISO(`${value.date.substr(0, 7)}-01`).toISOString(),
          });
        }
      });
    }

    return groupedData;
  };

  useEffect(() => {
    const prevValue = filterRecordsBasedOnPeriod({
      records: [
        ...allRecordsFromMonthsAgoByCategory.expenditures.filter((f) =>
          titleSelected.periodDays === -1
            ? f
            : new Date(f.date).getDay() === titleSelected.periodDays
        ),
        ...allRecordsFromMonthsAgoByCategory.revenues.filter((f) =>
          titleSelected.periodDays === -1
            ? f
            : new Date(f.date).getDay() === titleSelected.periodDays
        ),
      ],
      period: titleSelected.periodMonths,
      unit: "month",
    }).filter(
      (value) =>
        value.category === titleSelected.category &&
        value.title === titleSelected.title
    );

    setDataTable(prevValue);

    setDataChart(groupDataByMonth(prevValue));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allRecordsFromMonthsAgoByCategory, titleSelected, filterRecords]);

  const handleClose = () => {
    setDataTable([]);

    setOpen(false);
  };

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
          <div className="flex text-purple-700 text-sm mb-6 justify-start">
            <div
              className="flex gap-2 cursor-pointer items-center"
              onClick={() =>
                setFilterRecords((prev) =>
                  prev === "daily" ? "monthly" : "daily"
                )
              }
            >
              <ArrowsLeftRight weight="light" className="text-lg" />
              {filterRecords === "daily" && "Diário"}
              {filterRecords === "monthly" && "Mensal"}
            </div>
          </div>
          <DetailsByTitleChart
            records={dataChart}
            {...(titleSelected.category === "expenditure" && {
              scheme: "secondary",
            })}
            period={titleSelected.periodMonths}
            filter={filterRecords}
          />
          <TableRecords
            recordsInit={dataTable}
            hide={["title", "category"]}
            scheme="secondary"
          />
        </DialogContent>
      </DialogMui>
    </>
  );
}
