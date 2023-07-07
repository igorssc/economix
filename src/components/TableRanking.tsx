import { DialogContext } from "@/contexts/dialogsContext";
import {
  RecordContext,
  countAllQuantitiesAndAmountOf30DaysAgoByTitleType,
} from "@/contexts/recordContext";
import { generateMaskCategory } from "@/utils/generateMaskCategory";
import { useContext, useEffect, useState } from "react";
import { TableBase } from "./TableBase";

interface TableRankingProps {
  dataInit?: countAllQuantitiesAndAmountOf30DaysAgoByTitleType | null;
  periodMonths?: number;
  periodDays?: number;
}

export function TableRanking({
  dataInit = null,
  periodMonths,
  periodDays,
}: TableRankingProps) {
  const { countAllQuantitiesAndAmountOf30DaysAgoByTitle } =
    useContext(RecordContext);

  const { setIsOpenViewRecordsByTitleDialog, setTitleSelected } =
    useContext(DialogContext);

  const [dataDisplayed, setDataDisplayed] =
    useState<countAllQuantitiesAndAmountOf30DaysAgoByTitleType>([]);

  useEffect(() => {
    if (dataInit) {
      setDataDisplayed(dataInit);
    } else {
      setDataDisplayed(countAllQuantitiesAndAmountOf30DaysAgoByTitle);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!dataInit) {
      setDataDisplayed(countAllQuantitiesAndAmountOf30DaysAgoByTitle);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countAllQuantitiesAndAmountOf30DaysAgoByTitle]);

  useEffect(() => {
    dataInit && setDataDisplayed(dataInit);
  }, [dataInit]);

  return (
    <TableBase
      limit={5}
      data={dataDisplayed.map((data) => ({
        data: {
          title: {
            type: "string",
            value:
              data.title.charAt(0).toUpperCase() +
              data.title.slice(1).toLowerCase(),
            onClick: () => {
              setTitleSelected({
                title: data.title,
                category: data.category,
                periodMonths: periodMonths ?? 1,
                periodDays: periodDays ?? -1,
              });
              setIsOpenViewRecordsByTitleDialog(true);
            },
          },
          category: generateMaskCategory(data.category),
          quantity: data.quantity,
          totalAmount: {
            type: "currency",
            value: data.totalAmount?.toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL",
            }),
          },
        },
      }))}
      head={[
        { label: "Título", name: "title", isActiveSort: true },
        {
          label: "Categoria",
          name: "category",
          isActiveSort: true,
        },
        {
          label: "Quantidade",
          name: "quantity",
          isActiveSort: true,
        },
        { label: "Total", name: "totalAmount", isActiveSort: true },
      ]}
      sortingBaseDefault={{ by: "total", order: "DESC" }}
    />
  );
}
