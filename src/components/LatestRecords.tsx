import { SelectFilterRecordsContext } from "@/contexts/selectFilterRecordsContext";
import { useContext } from "react";
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
        <TableRecords hide={["description"]} limit={15} recordsInit={records} />
      </div>
    </Box>
  );
}
