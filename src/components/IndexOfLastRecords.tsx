import { SelectFilterRecordsContext } from "@/contexts/selectFilterRecordsContext";
import { ArrowsLeftRight } from "@phosphor-icons/react";
import { useContext, useEffect, useState } from "react";
import { Box } from "./Box";
import { MonthlyChart } from "./MonthlyChart";
import { Select } from "./Select";

export function IndexOfLastRecords() {
  const {
    periodDays,
    periodMonths,
    records,
    setPeriodDays,
    setPeriodMonths,
    selectPeriodDaysOptions,
    selectPeriodMonthsOptions,
  } = useContext(SelectFilterRecordsContext);

  const [filterRecordsCategory, setFilterRecordsCategory] = useState("all");
  const [filterRecordsTime, setFilterRecordsTime] = useState("daily");

  const [dataDisplayed, setDataDisplayed] = useState<
    {
      category: string;
      totalAmount: number;
      date: string;
    }[]
  >([]);

  useEffect(() => {
    setDataDisplayed(
      records
        .filter((value) =>
          filterRecordsCategory === "all"
            ? true
            : value.category + "s" === filterRecordsCategory
        )
        .map((value) => ({
          category: value.category,
          totalAmount: value.amount,
          date: value.date,
        }))
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [records, filterRecordsCategory, filterRecordsTime]);

  return (
    <Box className="sm:col-span-6 md:col-span-3 max-md:order-1">
      <div className="flex items-center justify-center mb-4 max-sm:flex-col md:max-xl:flex-col">
        <h1 className="text-center">Índice dos últimos registros</h1>

        <div className="sm:max-md:ml-auto xl:ml-auto max-sm:flex max-sm:justify-center max-sm:items-center max-sm:mt-4 md:max-xl:mt-4 max-[320px]:flex-col">
          <Select
            label="Período"
            value={periodMonths}
            setValue={setPeriodMonths}
            options={selectPeriodMonthsOptions}
            className="!my-2 !mr-2"
          />
          <Select
            label="Dias"
            value={periodDays}
            setValue={setPeriodDays}
            options={selectPeriodDaysOptions}
            className="!my-2 !ml-2"
          />
        </div>
      </div>

      <div className="flex gap-4 text-purple-700 text-sm mb-6 sm:max-md:justify-end xl:justify-end max-sm:justify-center md:max-xl:justify-center">
        <div
          className="flex gap-2 cursor-pointer items-center"
          onClick={() =>
            setFilterRecordsTime((prev) =>
              prev === "daily" ? "monthly" : "daily"
            )
          }
        >
          <ArrowsLeftRight weight="light" className="text-lg" />
          {filterRecordsTime === "daily" && "Diário"}
          {filterRecordsTime === "monthly" && "Mensal"}
        </div>
        <div
          className="flex gap-2 cursor-pointer items-center"
          onClick={() =>
            setFilterRecordsCategory((prev) =>
              prev === "all"
                ? "revenues"
                : prev === "revenues"
                ? "expenditures"
                : "all"
            )
          }
        >
          <ArrowsLeftRight weight="light" className="text-lg" />
          {filterRecordsCategory === "all" && "Todos"}
          {filterRecordsCategory === "revenues" && "Receitas"}
          {filterRecordsCategory === "expenditures" && "Despesas"}
        </div>
      </div>

      <div className="relative overflow-x-auto">
        <MonthlyChart
          recordsInit={dataDisplayed}
          period={periodMonths}
          filterCategory={filterRecordsCategory}
          filterTime={filterRecordsTime}
        />
      </div>
    </Box>
  );
}
