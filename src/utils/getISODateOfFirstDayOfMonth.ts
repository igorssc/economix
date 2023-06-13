export const getISODateOfFirstDayOfMonth = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const isoDate = `${year}-${(month + 1).toString().padStart(2, "0")}-01T00:00`;

  return new Date(isoDate).toISOString();
};
