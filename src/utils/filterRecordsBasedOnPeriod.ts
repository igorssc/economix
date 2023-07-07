import { RecordType } from "@/contexts/recordContext";
import {
  differenceInCalendarDays,
  differenceInCalendarMonths,
  differenceInDays,
  subMonths,
} from "date-fns";

interface filterRecordsBasedOnPeriodProps {
  records: RecordType[];
  unit: "day" | "month" | "calendar-day" | "calendar-month";
  period: number;
}

export const filterRecordsBasedOnPeriod = ({
  records,
  unit,
  period,
}: filterRecordsBasedOnPeriodProps) => {
  const currentDate = new Date();

  return records
    .filter((record) => {
      if (
        unit === "day" &&
        differenceInDays(currentDate, new Date(record.date)) <= period
      ) {
        return true;
      }
      if (
        unit === "calendar-day" &&
        differenceInCalendarDays(currentDate, new Date(record.date)) <= period
      ) {
        return true;
      }
      if (
        unit === "month" &&
        new Date(record.date).getTime() >=
          subMonths(currentDate, period).setDate(currentDate.getDate())
      ) {
        return true;
      }
      if (
        unit === "calendar-month" &&
        differenceInCalendarMonths(currentDate, new Date(record.date)) <= period
      ) {
        return true;
      }

      return false;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};
