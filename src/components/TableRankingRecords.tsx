import { DialogContext } from "@/contexts/dialogsContext";
import { RecordContext } from "@/contexts/recordContext";
import { CaretDown, CaretUp, CaretUpDown } from "@phosphor-icons/react";
import { useContext, useState } from "react";

export function TableRankingRecords() {
  const { countAllQuantitiesAndAmountOf30DaysAgoByTitle } =
    useContext(RecordContext);

  const { setIsOpenViewRecordsByTitleDialog, setTitleSelected } =
    useContext(DialogContext);

  const [sortingBase, setSortingBase] = useState<{
    order: "ASC" | "DESC";
    orderBy: "title" | "category" | "quantity" | "totalAmount";
  }>({ order: "DESC", orderBy: "totalAmount" });

  return (
    <>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs uppercase bg-purple-700 dark:bg-purple-950 text-gray-50">
          <tr className="[&_th]:px-6 [&_th]:py-3 [&_th>div]:flex [&_th>div]:items-center [&_th>div]:gap-1 [&_th>div]:cursor-pointer [&_th>div>.icon]:text-white [&_th>div>.icon]:text-sm">
            <th scope="col">
              <div
                onClick={() =>
                  setSortingBase({
                    orderBy: "title",
                    order:
                      sortingBase.orderBy === "title"
                        ? sortingBase.order === "ASC"
                          ? "DESC"
                          : "ASC"
                        : "ASC",
                  })
                }
              >
                Título
                {sortingBase.orderBy === "title" ? (
                  sortingBase.order === "ASC" ? (
                    <CaretUp weight="bold" className="icon" />
                  ) : (
                    <CaretDown weight="bold" className="icon" />
                  )
                ) : (
                  <CaretUpDown weight="bold" className="icon" />
                )}
              </div>
            </th>
            <th scope="col">
              <div
                onClick={() =>
                  setSortingBase({
                    orderBy: "category",
                    order:
                      sortingBase.orderBy === "category"
                        ? sortingBase.order === "ASC"
                          ? "DESC"
                          : "ASC"
                        : "ASC",
                  })
                }
              >
                Categoria
                {sortingBase.orderBy === "category" ? (
                  sortingBase.order === "ASC" ? (
                    <CaretUp weight="bold" className="icon" />
                  ) : (
                    <CaretDown weight="bold" className="icon" />
                  )
                ) : (
                  <CaretUpDown weight="bold" className="icon" />
                )}
              </div>
            </th>
            <th scope="col">
              <div
                onClick={() =>
                  setSortingBase({
                    orderBy: "quantity",
                    order:
                      sortingBase.orderBy === "quantity"
                        ? sortingBase.order === "ASC"
                          ? "DESC"
                          : "ASC"
                        : "ASC",
                  })
                }
              >
                Quantidade
                {sortingBase.orderBy === "quantity" ? (
                  sortingBase.order === "ASC" ? (
                    <CaretUp weight="bold" className="icon" />
                  ) : (
                    <CaretDown weight="bold" className="icon" />
                  )
                ) : (
                  <CaretUpDown weight="bold" className="icon" />
                )}
              </div>
            </th>
            <th scope="col">
              <div
                onClick={() =>
                  setSortingBase({
                    orderBy: "totalAmount",
                    order:
                      sortingBase.orderBy === "totalAmount"
                        ? sortingBase.order === "ASC"
                          ? "DESC"
                          : "ASC"
                        : "ASC",
                  })
                }
              >
                Total
                {sortingBase.orderBy === "totalAmount" ? (
                  sortingBase.order === "ASC" ? (
                    <CaretUp weight="bold" className="icon" />
                  ) : (
                    <CaretDown weight="bold" className="icon" />
                  )
                ) : (
                  <CaretUpDown weight="bold" className="icon" />
                )}
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="[&>*:not(:last-child)]:border-b [&_tr]:dark:border-zinc-700 [&_tr>th]:px-6 [&_tr>th]:py-4 [&_tr>th]:font-medium [&_tr>th]:text-gray-900 [&_tr>th]:whitespace-nowrap [&_tr>th]:dark:text-white [&_tr>td]:px-6 [&_tr>td]:py-4">
          {countAllQuantitiesAndAmountOf30DaysAgoByTitle
            .sort((a, b) => {
              if (a[sortingBase.orderBy] > b[sortingBase.orderBy]) {
                return sortingBase.order === "ASC" ? 1 : -1;
              }
              if (a[sortingBase.orderBy] < b[sortingBase.orderBy]) {
                return sortingBase.order === "ASC" ? -1 : 1;
              }

              return 0;
            })
            .map((value, index) => (
              <tr key={index}>
                <th
                  scope="row"
                  className="cursor-pointer"
                  onClick={() => {
                    setTitleSelected({
                      title: value.title,
                      category: value.category,
                    });
                    setIsOpenViewRecordsByTitleDialog(true);
                  }}
                >
                  {value.title.charAt(0).toUpperCase() +
                    value.title.slice(1).toLowerCase()}
                </th>
                <td>{value.category === "revenue" ? "Receita" : "Despesa"}</td>
                <td>{value.quantity}</td>
                <td>
                  {value.totalAmount?.toLocaleString("pt-br", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}
