import { RecordContext, RecordType } from "@/contexts/recordContext";
import { filterRecordsBasedOnPeriod } from "@/utils/filterRecordsBasedOnPeriod";
import { useContext, useEffect, useState } from "react";
import { Box } from "./Box";
import { MonthlyChart } from "./MonthlyChart";
import { Select } from "./Select";

export function IndexOfLastRecords() {
  const { allRecordsFrom30DaysAgo, allRecordsFromMonthsAgoByCategory } =
    useContext(RecordContext);

  const [period, setPeriod] = useState("1 mês");
  const [recordsDisplayed, setRecordsDisplayed] = useState<RecordType[]>([]);

  useEffect(() => {
    setRecordsDisplayed(allRecordsFrom30DaysAgo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setRecordsDisplayed(
      filterRecordsBasedOnPeriod({
        records: [
          ...allRecordsFromMonthsAgoByCategory.expenditures,
          ...allRecordsFromMonthsAgoByCategory.revenues,
        ],
        period: +period.split(" ")[0],
        unit: "month",
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [period, allRecordsFromMonthsAgoByCategory]);

  const selectOptions = [
    "1 mês",
    "2 meses",
    "3 meses",
    "4 meses",
    "5 meses",
    "6 meses",
    "7 meses",
    "8 meses",
    "9 meses",
    "10 meses",
    "11 meses",
    "12 meses",
  ];

  return (
    <Box className="sm:col-span-6 md:col-span-3 max-md:order-1">
      <div className="flex items-center justify-center mb-4">
        <h1 className="text-center">Índice dos últimos registros</h1>

        <div className="ml-auto">
          <Select
            label="Período"
            value={period}
            setValue={setPeriod}
            options={selectOptions}
          />
        </div>
      </div>

      <div className="relative overflow-x-auto">
        <MonthlyChart
          recordsInit={recordsDisplayed}
          period={+period.split(" ")[0]}
        />
      </div>
    </Box>
  );
}
