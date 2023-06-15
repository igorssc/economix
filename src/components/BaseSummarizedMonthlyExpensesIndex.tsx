"use client";
import { RecordContext } from "@/contexts/recordContext";
import { ArrowDown, ArrowUp } from "@phosphor-icons/react";
import { useContext } from "react";
import { SummarizedMonthlyExpensesIndex } from "./SummarizedMonthlyExpensesIndex";

export function BaseSummarizedMonthlyExpensesIndex() {
  const { allRecordsFromMonthsAgoByMonth } = useContext(RecordContext);

  const monthlyDepositValuesComparison =
    (allRecordsFromMonthsAgoByMonth
      .find((v) => v.monthAgo === 0)
      ?.values.deposits.reduce((acc, v) => (acc += v.amount), 0) || 0) -
    (allRecordsFromMonthsAgoByMonth
      .find((v) => v.monthAgo === 1)
      ?.values.deposits.reduce((acc, v) => (acc += v.amount), 0) || 0);

  const monthlyWithdrawValuesComparison =
    (allRecordsFromMonthsAgoByMonth
      .find((v) => v.monthAgo === 0)
      ?.values.withdraws.reduce((acc, v) => (acc += v.amount), 0) || 0) -
    (allRecordsFromMonthsAgoByMonth
      .find((v) => v.monthAgo === 1)
      ?.values.withdraws.reduce((acc, v) => (acc += v.amount), 0) || 0);

  return (
    <>
      <div className="flex flex-col gap-8 justify-center items-center">
        <p className="text-center">
          Seus gastos esse mês já somam:
          <br />
          <span className="font-bold text-2xl">
            R${" "}
            {allRecordsFromMonthsAgoByMonth
              .find((v) => v.monthAgo === 0)
              ?.values.withdraws.reduce((acc, v) => acc + v.amount, 0)
              .toLocaleString("pt-br", { minimumFractionDigits: 2 })}
          </span>
        </p>

        <div className="flex justify-center gap-10">
          <SummarizedMonthlyExpensesIndex
            title={Math.abs(monthlyDepositValuesComparison).toLocaleString(
              "pt-br",
              {
                style: "currency",
                currency: "BRL",
              }
            )}
            description={`${
              monthlyDepositValuesComparison > 0 ? "A mais" : "A menos"
            } de depósitos este mês`}
            _icon={monthlyDepositValuesComparison > 0 ? ArrowUp : ArrowDown}
          />
          <SummarizedMonthlyExpensesIndex
            title={Math.abs(monthlyWithdrawValuesComparison).toLocaleString(
              "pt-br",
              {
                style: "currency",
                currency: "BRL",
              }
            )}
            description={`${
              monthlyWithdrawValuesComparison > 0 ? "A mais" : "A menos"
            } de retiradas este mês`}
            _icon={monthlyWithdrawValuesComparison > 0 ? ArrowUp : ArrowDown}
            invert
          />
        </div>
      </div>
    </>
  );
}
