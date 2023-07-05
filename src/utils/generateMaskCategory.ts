export const generateMaskCategory = (category: string) => {
  if (category === "revenue") {
    return "Receita";
  }

  if (category === "expenditure") {
    return "Despesa";
  }

  return "";
};
