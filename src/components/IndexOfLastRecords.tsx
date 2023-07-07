import { SelectFilterRecordsContext } from "@/contexts/selectFilterRecordsContext";
import { useContext } from "react";
import { Box } from "./Box";
import { MonthlyChart } from "./MonthlyChart";
import { Select } from "./Select";

export function IndexOfLastRecords() {
  const {
    periodDays,
    periodMonth,
    records,
    setPeriodDays,
    setPeriodMonths,
    selectPeriodDaysOptions,
    selectPeriodMonthsOptions,
  } = useContext(SelectFilterRecordsContext);

  return (
    <Box className="sm:col-span-6 md:col-span-3 max-md:order-1">
      <div className="flex items-center justify-center mb-4 max-sm:flex-col md:max-xl:flex-col">
        <h1 className="text-center">Índice dos últimos registros</h1>

        <div className="sm:max-md:ml-auto xl:ml-auto max-sm:flex max-sm:justify-center max-sm:items-center max-sm:mt-4 md:max-xl:mt-4 max-[320px]:flex-col">
          <Select
            label="Período"
            value={periodMonth}
            setValue={setPeriodMonths}
            options={selectPeriodMonthsOptions}
          />
          <Select
            label="Dias"
            value={periodDays}
            setValue={setPeriodDays}
            options={selectPeriodDaysOptions}
          />
        </div>
      </div>

      <div className="relative overflow-x-auto">
        <MonthlyChart recordsInit={records} period={periodMonth} />
      </div>
    </Box>
  );
}
