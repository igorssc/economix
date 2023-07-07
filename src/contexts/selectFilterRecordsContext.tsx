"use client";
import { filterRecordsBasedOnPeriod } from "@/utils/filterRecordsBasedOnPeriod";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { RecordContext, RecordType } from "./recordContext";

interface SelectFilterRecordsProviderProps {
  children: ReactNode;
}

type SelectFilterRecordsData = {
  periodMonth: number;
  setPeriodMonths: Dispatch<SetStateAction<number>>;

  periodDays: number;
  setPeriodDays: Dispatch<SetStateAction<number>>;

  records: RecordType[];

  selectPeriodMonthsOptions: {
    value: number;
    label: string;
  }[];

  selectPeriodDaysOptions: {
    value: number;
    label: string;
  }[];
};

export const SelectFilterRecordsContext = createContext(
  {} as SelectFilterRecordsData
);

export function SelectFilterRecordsProvider({
  children,
}: SelectFilterRecordsProviderProps) {
  const [periodMonth, setPeriodMonths] = useState(1);
  const [periodDays, setPeriodDays] = useState(-1);
  const [records, setRecords] = useState<RecordType[]>([]);

  const { allRecordsFrom30DaysAgo, allRecordsFromMonthsAgoByCategory } =
    useContext(RecordContext);

  useEffect(() => {
    setRecords(allRecordsFrom30DaysAgo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setRecords(
      filterRecordsBasedOnPeriod({
        records: [
          ...allRecordsFromMonthsAgoByCategory.expenditures.filter((f) =>
            periodDays === -1 ? f : new Date(f.date).getDay() === periodDays
          ),
          ...allRecordsFromMonthsAgoByCategory.revenues.filter((f) =>
            periodDays === -1 ? f : new Date(f.date).getDay() === periodDays
          ),
        ],
        period: periodMonth,
        unit: "month",
      })
    );
  }, [periodMonth, periodDays, allRecordsFromMonthsAgoByCategory]);

  const selectPeriodMonthsOptions = [
    {
      value: 1,
      label: "1 mês",
    },
    {
      value: 2,
      label: "2 mêses",
    },
    {
      value: 3,
      label: "3 mêses",
    },
    {
      value: 4,
      label: "4 mêses",
    },
    {
      value: 5,
      label: "5 mêses",
    },
    {
      value: 6,
      label: "6 mêses",
    },
    {
      value: 7,
      label: "7 mêses",
    },
    {
      value: 8,
      label: "8 mêses",
    },
    {
      value: 9,
      label: "9 mêses",
    },
    {
      value: 10,
      label: "10 mêses",
    },
    {
      value: 11,
      label: "11 mêses",
    },
    {
      value: 12,
      label: "12 mêses",
    },
  ];

  const selectPeriodDaysOptions = [
    { value: -1, label: "Todos os dias" },
    { value: 0, label: "Domingo" },
    { value: 1, label: "Segunda-feira" },
    { value: 2, label: "Terça-feira" },
    { value: 3, label: "Quarta-feira" },
    { value: 4, label: "Quinta-feira" },
    { value: 5, label: "Sexta-feira" },
    { value: 6, label: "Sábado" },
  ];

  return (
    <SelectFilterRecordsContext.Provider
      value={{
        periodDays,
        setPeriodDays,
        periodMonth,
        setPeriodMonths,
        records,
        selectPeriodDaysOptions,
        selectPeriodMonthsOptions,
      }}
    >
      {children}
    </SelectFilterRecordsContext.Provider>
  );
}
