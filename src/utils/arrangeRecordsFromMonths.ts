import { RecordType } from "@/contexts/recordContext";
import { differenceInCalendarMonths, differenceInMinutes } from "date-fns";

export const arrangeRecordsFromMonths = (records: RecordType[]) => {
  const recordsFromMonthsAgoByMonth = Array.from(
    { length: 12 },
    () => [] as RecordType[]
  );

  records.forEach((record, i) => {
    const distanceInMonths = differenceInCalendarMonths(
      new Date(),
      new Date(record.date)
    );

    if (differenceInMinutes(new Date(), new Date(record.date)) >= 0) {
      recordsFromMonthsAgoByMonth[distanceInMonths] = [
        ...recordsFromMonthsAgoByMonth[distanceInMonths],
        record,
      ];
    }
  });

  return recordsFromMonthsAgoByMonth;
};
