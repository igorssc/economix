export const getCurrentISODate = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const day = currentDate.getDate();
  const isoDate = `${year}-${(month + 1).toString().padStart(2, "0")}-${(
    day + 1
  )
    .toString()
    .padStart(2, "0")}T23:59`;

  return new Date(isoDate).toISOString();
};
