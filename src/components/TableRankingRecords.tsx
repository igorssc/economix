import { RecordContext } from "@/contexts/recordContext";
import { useContext } from "react";

export function TableRankingRecords() {
  const { countAllQuantitiesAndAmountOf30DaysAgoByTitle } =
    useContext(RecordContext);

  return (
    <>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs uppercase bg-purple-700 dark:bg-purple-950 text-gray-50">
          <tr className="[&_th]:px-6 [&_th]:py-3">
            <th scope="col">Título</th>
            <th scope="col">Quantidade</th>
            <th scope="col">Total</th>
          </tr>
        </thead>
        <tbody className="[&>*:not(:last-child)]:border-b [&_tr]:dark:border-zinc-700 [&_tr>th]:px-6 [&_tr>th]:py-4 [&_tr>th]:font-medium [&_tr>th]:text-gray-900 [&_tr>th]:whitespace-nowrap [&_tr>th]:dark:text-white [&_tr>td]:px-6 [&_tr>td]:py-4">
          {countAllQuantitiesAndAmountOf30DaysAgoByTitle.map((value, index) => (
            <tr key={index}>
              <th scope="row">
                {value.title.charAt(0).toUpperCase() +
                  value.title.slice(1).toLowerCase()}
              </th>
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
