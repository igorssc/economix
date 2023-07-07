import { SelectFilterRecordsContext } from "@/contexts/selectFilterRecordsContext";
import { useContext } from "react";
import { Box } from "./Box";
import { DayByTimeChartChart } from "./DayByTimeChartChart";
import { Select } from "./Select";

export function RecordDayTime() {
  const {
    periodDays,
    periodMonths,
    records,
    setPeriodDays,
    setPeriodMonths,
    selectPeriodDaysOptions,
    selectPeriodMonthsOptions,
  } = useContext(SelectFilterRecordsContext);

  return (
    <Box className="col-span-6">
      <div className="flex items-center justify-center mb-4 relative min-[870px]:mt-4 max-[530px]:flex-col">
        <h1 className="text-center">Registros - Dia x Hora</h1>

        <div className="min-[870px]:absolute min-[870px]:top-1/2 min-[870px]:-translate-y-1/2 min-[870px]:right-0 min-[530px]:ml-auto max-[530px]:mt-4">
          <Select
            label="Período"
            value={periodMonths}
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
        <DayByTimeChartChart records={records} period={periodMonths} />
      </div>
    </Box>
  );
}
