import { RecordType } from "@/contexts/recordContext";
import { SelectFilterRecordsContext } from "@/contexts/selectFilterRecordsContext";
import { ArrowsLeftRight } from "@phosphor-icons/react";
import { useContext, useEffect, useState } from "react";
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

  const [filterRecords, setFilterRecords] = useState("all");

  const [dataDisplayed, setDataDisplayed] = useState<RecordType[]>([]);

  useEffect(() => {
    setDataDisplayed(
      records.filter((value) =>
        filterRecords === "all" ? true : value.category + "s" === filterRecords
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [records, filterRecords]);

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
            className="my-2 mr-2"
          />
          <Select
            label="Dias"
            value={periodDays}
            setValue={setPeriodDays}
            options={selectPeriodDaysOptions}
            className="my-2 ml-2"
          />
        </div>
      </div>

      <div className="flex text-purple-700 text-sm mb-6 min-[870px]:mt-8 min-[530px]:justify-end max-[530px]:justify-center">
        <div
          className="flex gap-2 cursor-pointer items-center"
          onClick={() =>
            setFilterRecords((prev) =>
              prev === "all"
                ? "revenues"
                : prev === "revenues"
                ? "expenditures"
                : "all"
            )
          }
        >
          <ArrowsLeftRight weight="light" className="text-lg" />
          {filterRecords === "all" && "Todos"}
          {filterRecords === "revenues" && "Receitas"}
          {filterRecords === "expenditures" && "Despesas"}
        </div>
      </div>

      <div className="relative overflow-x-auto">
        <DayByTimeChartChart records={dataDisplayed} period={periodMonths} />
      </div>
    </Box>
  );
}
