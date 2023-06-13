export const arrayOfLastMonthsWithAmount = (qty: number) => {
  return Array.from({ length: qty }, (_, i) => {
    const currentDate = new Date();

    const currentMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - i,
      1
    );
    const monthName = currentMonth.toLocaleString("pt-BR", { month: "long" });

    const formattedMonthName =
      monthName.charAt(0).toUpperCase() + monthName.slice(1);

    return {
      month: formattedMonthName,
      amount: 0,
    };
  });
};
