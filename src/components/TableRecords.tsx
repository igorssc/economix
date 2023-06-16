import { DialogContext } from "@/contexts/dialogsContext";
import { RecordType } from "@/contexts/recordContext";
import { useContext } from "react";

interface TableRecordsProps {
  records: RecordType[];
}

export function TableRecords({ records }: TableRecordsProps) {
  const { setIsOpenViewRecordDialog, setRecordSelected } =
    useContext(DialogContext);

  return (
    <>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs uppercase bg-purple-700 dark:bg-purple-900 text-gray-50">
          <tr className="[&_th]:px-6 [&_th]:py-3">
            <th scope="col">Título</th>
            <th scope="col">Categoria</th>
            <th scope="col">Valor</th>
            <th scope="col">Data</th>
          </tr>
        </thead>
        <tbody className="[&>*:not(:last-child)]:border-b [&_tr]:dark:border-zinc-700 [&_tr>th]:px-6 [&_tr>th]:py-4 [&_tr>th]:font-medium [&_tr>th]:text-gray-900 [&_tr>th]:whitespace-nowrap [&_tr>th]:dark:text-white [&_tr>td]:px-6 [&_tr>td]:py-4">
          {records.map((value) => (
            <tr key={value.id}>
              <th
                scope="row"
                onClick={() => {
                  setRecordSelected(value);
                  setIsOpenViewRecordDialog(true);
                }}
                className="cursor-pointer"
              >
                {value.installment > 0
                  ? `${value.title} - Parc ${value.installment}`
                  : value.title}
              </th>
              <td>{value.category === "deposit" ? "Depósito" : "Retirada"}</td>
              <td>
                {value.amount?.toLocaleString("pt-br", {
                  style: "currency",
                  currency: "BRL",
                })}
              </td>
              <td>{new Date(value.date).toLocaleDateString("pt-br")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
