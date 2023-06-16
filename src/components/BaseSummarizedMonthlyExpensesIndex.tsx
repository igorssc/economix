"use client";
import { RecordContext } from "@/contexts/recordContext";
import { ArrowDown, ArrowUp, Eye, EyeSlash } from "@phosphor-icons/react";
import clsx from "clsx";
import { useContext, useEffect, useState } from "react";
import { SummarizedMonthlyExpensesIndex } from "./SummarizedMonthlyExpensesIndex";

export function BaseSummarizedMonthlyExpensesIndex() {
  const { allRecordsFromMonthsAgoByMonth } = useContext(RecordContext);

  const [isHideValues, setIsHideValues] = useState(true);

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

  useEffect(() => {
    const isInitValueHideValues = localStorage.getItem("isHideValues");

    isInitValueHideValues === "false" && setIsHideValues(false);
  }, []);

  return (
    <>
      <div className="flex flex-col gap-8 justify-center items-center">
        <p className="text-center flex flex-col items-center justify-center">
          Seus gastos esse mês já somam:
          <br />
          <div className="flex gap-3">
            <span
              className={clsx(
                "font-bold text-2xl",
                isHideValues && "blur-md text-purple-700"
              )}
            >
              R${" "}
              {allRecordsFromMonthsAgoByMonth
                .find((v) => v.monthAgo === 0)
                ?.values.withdraws.reduce((acc, v) => acc + v.amount, 0)
                .toLocaleString("pt-br", { minimumFractionDigits: 2 })}
            </span>
            {isHideValues ? (
              <Eye
                size={32}
                className="text-purple-700 dark:text-purple-900 cursor-pointer"
                weight="light"
                onClick={() => {
                  setIsHideValues(false);
                  localStorage.setItem("isHideValues", "false");
                }}
              />
            ) : (
              <EyeSlash
                size={32}
                className="text-purple-700 dark:text-purple-900 cursor-pointer"
                weight="light"
                onClick={() => {
                  setIsHideValues(true);
                  localStorage.setItem("isHideValues", "true");
                }}
              />
            )}
          </div>
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
            isHideValues={isHideValues}
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
            isHideValues={isHideValues}
          />
        </div>
      </div>
    </>
  );
}
