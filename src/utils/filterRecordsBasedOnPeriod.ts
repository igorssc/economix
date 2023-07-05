import { RecordType } from "@/contexts/recordContext";
import {
  differenceInCalendarDays,
  differenceInCalendarMonths,
  differenceInDays,
  differenceInMonths,
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
  return records
    .filter((record) => {
      if (
        unit === "day" &&
        differenceInDays(new Date(), new Date(record.date)) <= period
      ) {
        return true;
      }
      if (
        unit === "calendar-day" &&
        differenceInCalendarDays(new Date(), new Date(record.date)) <= period
      ) {
        return true;
      }
      if (
        unit === "month" &&
        differenceInMonths(new Date(), new Date(record.date)) <= period
      ) {
        return true;
      }
      if (
        unit === "calendar-month" &&
        differenceInCalendarMonths(new Date(), new Date(record.date)) <= period
      ) {
        return true;
      }

      return false;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};
