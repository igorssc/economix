export const getISODateOfMonthsAgo = (
  monthsAgo: number,
  endMonth?: boolean
) => {
  const currentDate = new Date(
    new Date().setMonth(new Date().getMonth() - monthsAgo)
  );

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const isoDate = `${year}-${(month + 1).toString().padStart(2, "0")}-${
    endMonth
      ? new Date(
          new Date().getFullYear(),
          new Date().getMonth() + 1,
          0
        ).getDate()
      : "01"
  }T${endMonth ? "23:59" : "00:00"}`;

  return new Date(isoDate).toISOString();
};
