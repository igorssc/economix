import { DialogContext } from "@/contexts/dialogsContext";
import { RecordContext, RecordType } from "@/contexts/recordContext";
import { generateMaskCategory } from "@/utils/generateMaskCategory";
import { useContext, useEffect, useState } from "react";
import { TableBase } from "./TableBase";

interface TableRecordsProps {
  period?: "past" | "future";
  hide?: string[];
  recordsInit?: RecordType[] | null;
  limit?: number;
  scheme?: "primary" | "secondary";
}

export function TableRecords({
  period = "past",
  hide = [],
  recordsInit = null,
  limit,
  scheme = "primary",
}: TableRecordsProps) {
  const { allRecordsFrom30DaysAgo, allRecordsInFuture } =
    useContext(RecordContext);

  const {
    setIsOpenViewRecordDialog,
    setRecordSelected,
    setIsOpenViewRecordsByTitleDialog,
  } = useContext(DialogContext);

  const [recordsDisplayed, setRecordsDisplayed] = useState<RecordType[]>([]);

  useEffect(() => {
    if (recordsInit) {
      setRecordsDisplayed(recordsInit);
    } else {
      if (period === "future") {
        setRecordsDisplayed(allRecordsInFuture);
      } else {
        setRecordsDisplayed(allRecordsFrom30DaysAgo);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (period === "past" && !recordsInit) {
      setRecordsDisplayed(allRecordsFrom30DaysAgo);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allRecordsFrom30DaysAgo]);

  useEffect(() => {
    if (period === "future" && !recordsInit) {
      setRecordsDisplayed(allRecordsInFuture);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allRecordsInFuture]);

  useEffect(() => {
    recordsInit && setRecordsDisplayed(recordsInit);
  }, [recordsInit]);

  return (
    <TableBase
      scheme={scheme}
      {...(limit && { limit })}
      data={recordsDisplayed.map((record) => ({
        data: {
          title: {
            type: "string",
            value:
              record.installment > 0
                ? `${record.title} - Parc ${record.installment}`
                : record.title,
            onClick: () => {
              setRecordSelected(record);
              setIsOpenViewRecordsByTitleDialog(false);
              setIsOpenViewRecordDialog(true);
            },
          },
          category: generateMaskCategory(record.category),
          amount: { type: "currency", value: record.amount },
          date: { type: "date", value: record.date },
          description: record.description,
        },
      }))}
      head={[
        { label: "Título", name: "title", isActiveSort: true },
        {
          label: "Categoria",
          name: "category",
          isActiveSort: true,
        },
        { label: "Valor", name: "amount", isActiveSort: true },
        { label: "Data", name: "date", isActiveSort: true },
        { label: "Descrição", name: "description" },
      ].filter((value) => !hide.some((item) => item === value.name))}
      sortingBaseDefault={{ by: "date", order: "DESC" }}
    />
  );
}
