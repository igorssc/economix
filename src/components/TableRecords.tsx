import { DialogContext } from "@/contexts/dialogsContext";
import { RecordType } from "@/contexts/recordContext";
import { CaretDown, CaretUp, CaretUpDown } from "@phosphor-icons/react";
import { useContext, useState } from "react";

interface TableRecordsProps {
  records: RecordType[];
  isHideTitle?: boolean;
  isHideCategory?: boolean;
  isHideAmount?: boolean;
  isHideDate?: boolean;
  isHideDescription?: boolean;
}

export function TableRecords({
  records,
  isHideTitle = false,
  isHideCategory = false,
  isHideAmount = false,
  isHideDate = false,
  isHideDescription = false,
}: TableRecordsProps) {
  const { setIsOpenViewRecordDialog, setRecordSelected } =
    useContext(DialogContext);

  const [sortingBase, setSortingBase] = useState<{
    order: "ASC" | "DESC";
    orderBy: "title" | "category" | "amount" | "date";
  }>({ order: "DESC", orderBy: "date" });

  return (
    <>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs uppercase bg-purple-700 dark:bg-purple-950 text-gray-50">
          <tr className="[&_th]:px-6 [&_th]:py-3 [&_th>div]:flex [&_th>div]:items-center [&_th>div]:gap-1 [&_th>div]:cursor-pointer [&_th>div>.icon]:text-white [&_th>div>.icon]:text-sm">
            {!isHideTitle && (
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
            )}
            {!isHideCategory && (
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
            )}
            {!isHideAmount && (
              <th scope="col">
                <div
                  onClick={() =>
                    setSortingBase({
                      orderBy: "amount",
                      order:
                        sortingBase.orderBy === "amount"
                          ? sortingBase.order === "ASC"
                            ? "DESC"
                            : "ASC"
                          : "ASC",
                    })
                  }
                >
                  Valor
                  {sortingBase.orderBy === "amount" ? (
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
            )}
            {!isHideDate && (
              <th scope="col">
                <div
                  onClick={() =>
                    setSortingBase({
                      orderBy: "date",
                      order:
                        sortingBase.orderBy === "date"
                          ? sortingBase.order === "ASC"
                            ? "DESC"
                            : "ASC"
                          : "ASC",
                    })
                  }
                >
                  Data
                  {sortingBase.orderBy === "date" ? (
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
            )}
            {!isHideDescription && (
              <th scope="col">
                <div>Descrição</div>
              </th>
            )}
          </tr>
        </thead>
        <tbody className="[&>*:not(:last-child)]:border-b [&_tr]:dark:border-zinc-700 [&_tr>th]:px-6 [&_tr>th]:py-4 [&_tr>th]:font-medium [&_tr>th]:text-gray-900 [&_tr>th]:whitespace-nowrap [&_tr>th]:dark:text-white [&_tr>td]:px-6 [&_tr>td]:py-4">
          {records
            .sort((a, b) => {
              if (a[sortingBase.orderBy] > b[sortingBase.orderBy]) {
                return sortingBase.order === "ASC" ? 1 : -1;
              }
              if (a[sortingBase.orderBy] < b[sortingBase.orderBy]) {
                return sortingBase.order === "ASC" ? -1 : 1;
              }

              return 0;
            })
            .map((value) => (
              <tr key={value.id}>
                {!isHideTitle && (
                  <th
                    scope="row"
                    onClick={() => {
                      setRecordSelected(value);
                      setIsOpenViewRecordDialog(true);
                    }}
                    className={"cursor-pointer"}
                  >
                    {value.installment > 0
                      ? `${value.title} - Parc ${value.installment}`
                      : value.title}
                  </th>
                )}
                {!isHideCategory && (
                  <td>
                    {value.category === "revenue" ? "Receita" : "Despesa"}
                  </td>
                )}
                {!isHideAmount && (
                  <td>
                    {value.amount?.toLocaleString("pt-br", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </td>
                )}
                {!isHideDate && (
                  <td>{new Date(value.date).toLocaleDateString("pt-br")}</td>
                )}
                {!isHideDescription && (
                  <td className="whitespace-nowrap">{value.description}</td>
                )}
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}
