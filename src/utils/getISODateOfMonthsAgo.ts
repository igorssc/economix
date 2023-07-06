import { endOfMonth, formatISO, startOfMonth, subMonths } from "date-fns";

export const getISODateOfMonthsAgo = (
  monthsAgo: number,
  endMonth?: boolean
) => {
  const currentDate = new Date();
  const targetDate = subMonths(currentDate, monthsAgo);

  const formattedDate = endMonth
    ? endOfMonth(targetDate)
    : startOfMonth(targetDate);

  return formatISO(formattedDate, { representation: "complete" });
};
