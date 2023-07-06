"use client";
import { RecordContext } from "@/contexts/recordContext";
import { ArrowDown, ArrowUp, Eye, EyeSlash } from "@phosphor-icons/react";
import { twMerge } from "tailwind-merge";
import { useContext, useEffect, useState } from "react";
import { BaseSummarizedMonthlyExpensesIndex } from "./BaseSummarizedMonthlyExpensesIndex";

export function SummarizedMonthlyExpensesIndex() {
  const { allRecordsFromMonthsAgoByMonth } = useContext(RecordContext);

  const [isHideValues, setIsHideValues] = useState(true);

  const monthlyRevenueValuesComparison =
    (allRecordsFromMonthsAgoByMonth
      .find((v) => v.monthAgo === 0)
      ?.values.revenues.reduce((acc, v) => (acc += v.amount), 0) || 0) -
    (allRecordsFromMonthsAgoByMonth
      .find((v) => v.monthAgo === 1)
      ?.values.revenues.reduce((acc, v) => (acc += v.amount), 0) || 0);

  const monthlyExpenditureValuesComparison =
    (allRecordsFromMonthsAgoByMonth
      .find((v) => v.monthAgo === 0)
      ?.values.expenditures.reduce((acc, v) => (acc += v.amount), 0) || 0) -
    (allRecordsFromMonthsAgoByMonth
      .find((v) => v.monthAgo === 1)
      ?.values.expenditures.reduce((acc, v) => (acc += v.amount), 0) || 0);

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
              className={twMerge(
                "font-bold text-2xl",
                isHideValues && "blur-md text-purple-700"
              )}
            >
              R${" "}
              {allRecordsFromMonthsAgoByMonth
                .find((v) => v.monthAgo === 0)
                ?.values.expenditures.reduce((acc, v) => acc + v.amount, 0)
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
          <BaseSummarizedMonthlyExpensesIndex
            title={Math.abs(monthlyRevenueValuesComparison).toLocaleString(
              "pt-br",
              {
                style: "currency",
                currency: "BRL",
              }
            )}
            description={`${
              monthlyRevenueValuesComparison > 0 ? "A mais" : "A menos"
            } de receitas este mês`}
            _icon={monthlyRevenueValuesComparison > 0 ? ArrowUp : ArrowDown}
            isHideValues={isHideValues}
          />
          <BaseSummarizedMonthlyExpensesIndex
            title={Math.abs(monthlyExpenditureValuesComparison).toLocaleString(
              "pt-br",
              {
                style: "currency",
                currency: "BRL",
              }
            )}
            description={`${
              monthlyExpenditureValuesComparison > 0 ? "A mais" : "A menos"
            } de despesas este mês`}
            _icon={monthlyExpenditureValuesComparison > 0 ? ArrowUp : ArrowDown}
            invert
            isHideValues={isHideValues}
          />
        </div>
      </div>
    </>
  );
}
