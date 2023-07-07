import {
  RecordContext,
  countAllQuantitiesAndAmountOf30DaysAgoByTitleType,
} from "@/contexts/recordContext";
import { SelectFilterRecordsContext } from "@/contexts/selectFilterRecordsContext";
import { countAllQuantitiesAndAmountRecordsByTitle } from "@/utils/countAllQuantitiesAndAmountByTitle";
import { filterRecordsBasedOnPeriod } from "@/utils/filterRecordsBasedOnPeriod";
import { useContext, useEffect, useState } from "react";
import { Box } from "./Box";
import { Select } from "./Select";
import { TableRanking } from "./TableRanking";

export function RankingRecords() {
  const { countAllQuantitiesAndAmountOf30DaysAgoByTitle } =
    useContext(RecordContext);

  const {
    periodDays,
    periodMonth,
    records,
    setPeriodDays,
    setPeriodMonths,
    selectPeriodDaysOptions,
    selectPeriodMonthsOptions,
  } = useContext(SelectFilterRecordsContext);

  const [dataDisplayed, setDataDisplayed] =
    useState<countAllQuantitiesAndAmountOf30DaysAgoByTitleType>([]);

  useEffect(() => {
    setDataDisplayed(countAllQuantitiesAndAmountOf30DaysAgoByTitle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setDataDisplayed(
      countAllQuantitiesAndAmountRecordsByTitle(
        filterRecordsBasedOnPeriod({
          records: [...records],
          period: periodMonth,
          unit: "month",
        })
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [records]);

  return (
    <Box className="sm:col-span-6 md:col-span-3 max-md:order-3">
      <div className="flex items-center justify-center mb-4 max-[520px]:flex-col md:max-lg:flex-col">
        <h1 className="text-center">Ranking de registros</h1>

        <div className="min-[520px]:max-md:ml-auto lg:ml-auto max-[520px]:mt-4 md:max-lg:mt-4">
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
        <TableRanking dataInit={dataDisplayed} period={periodMonth} />
      </div>
    </Box>
  );
}
