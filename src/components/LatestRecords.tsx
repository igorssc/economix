import { RecordType } from "@/contexts/recordContext";
import { SelectFilterRecordsContext } from "@/contexts/selectFilterRecordsContext";
import { ArrowsLeftRight } from "@phosphor-icons/react";
import { useContext, useEffect, useState } from "react";
import { Box } from "./Box";
import { Select } from "./Select";
import { TableRecords } from "./TableRecords";

export function LatestRecords() {
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
    <Box className="sm:col-span-6 md:col-span-3 md:row-span-6 max-md:order-2">
      <div className="flex items-center justify-center mb-4 max-[520px]:flex-col md:max-lg:flex-col">
        <h1 className="text-center">Útimos registros</h1>

        <div className="min-[520px]:max-md:ml-auto lg:ml-auto max-[520px]:mt-4 md:max-lg:mt-4">
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

      <div className="flex text-purple-700 text-sm mb-6 min-[520px]:max-md:justify-end lg:justify-end max-[520px]:justify-center md:max-lg:justify-center">
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
        <TableRecords
          hide={["description"]}
          limit={15}
          recordsInit={dataDisplayed}
        />
      </div>
    </Box>
  );
}
