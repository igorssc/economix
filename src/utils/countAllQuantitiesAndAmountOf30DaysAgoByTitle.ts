import { RecordType } from "@/contexts/recordContext";

export const countAllQuantitiesAndAmountRecordsOf30DaysAgoByTitle = (
  records: RecordType[]
) => {
  const prevArray = [] as {
    title: string;
    category: string;
    quantity: number;
    totalAmount: number;
  }[];

  records.forEach((v) => {
    const valueIndex =
      prevArray.length > 0
        ? prevArray
            .map((m) => m.title.toLowerCase())
            .indexOf(v.title.toLowerCase())
        : -1;

    if (valueIndex > -1 && prevArray[valueIndex].category === v.category) {
      prevArray[valueIndex] = {
        title: v.title,
        quantity: prevArray[valueIndex].quantity + 1,
        totalAmount: prevArray[valueIndex].totalAmount + v.amount,
        category: prevArray[valueIndex].category,
      };
    } else {
      prevArray.push({
        title: v.title,
        quantity: 1,
        totalAmount: v.amount,
        category: v.category,
      });
    }
  });

  prevArray.sort((a, b) => b.totalAmount - a.totalAmount);

  return prevArray;
};
