import { DialogContext } from "@/contexts/dialogsContext";
import { RecordContext } from "@/contexts/recordContext";
import { generateMaskCategory } from "@/utils/generateMaskCategory";
import { useContext } from "react";
import { TableBase } from "./TableBase";

export function TableRanking() {
  const { countAllQuantitiesAndAmountOf30DaysAgoByTitle } =
    useContext(RecordContext);

  const { setIsOpenViewRecordsByTitleDialog, setTitleSelected } =
    useContext(DialogContext);

  return (
    <TableBase
      data={countAllQuantitiesAndAmountOf30DaysAgoByTitle.map((data) => ({
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
