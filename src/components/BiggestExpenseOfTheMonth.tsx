import { RecordType } from "@/contexts/recordContext";
import { SelectFilterRecordsContext } from "@/contexts/selectFilterRecordsContext";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import onlineShoppingImg from "../assets/online-shopping.webp";
import { Box } from "./Box";
import { Select } from "./Select";

export function BiggestExpenseOfTheMonth() {
  const {
    periodDays,
    periodMonths,
    records,
    setPeriodDays,
    setPeriodMonths,
    selectPeriodDaysOptions,
    selectPeriodMonthsOptions,
  } = useContext(SelectFilterRecordsContext);

  const [highestExpense, setHighestExpense] = useState(
    {} as {
      title: string;
      quantity: number;
      totalAmount: number;
    }
  );

  const processRecords = async (records: RecordType[]) => {
    const biggestExpense: {
      title: string;
      quantity: number;
      totalAmount: number;
    }[] = [...records]
      .filter((v) => v.category === "expenditure")
      .reduce(
        (acc, v) => {
          const indexExists = acc.findIndex((v1) => v1.title === v.title);

          if (indexExists > -1) {
            const prevArray = [...acc];
            prevArray[indexExists] = {
              title: prevArray[indexExists].title,
              quantity: prevArray[indexExists].quantity + 1,
              totalAmount: prevArray[indexExists].totalAmount + v.amount,
            };
            return prevArray;
          } else {
            return [
              ...acc,
              {
                title: v.title,
                quantity: 1,
                totalAmount: v.amount,
              },
            ];
          }
        },
        [] as {
          title: string;
          quantity: number;
          totalAmount: number;
        }[]
      );

    const sortedExpenses = biggestExpense.sort(
      (a, b) => b.totalAmount - a.totalAmount
    );

    if (sortedExpenses.length > 0) {
      setHighestExpense(sortedExpenses[0]);
    }
  };

  useEffect(() => {
    processRecords(records);
  }, [records]);

  return (
    <Box className="flex flex-col gap-4 items-center justify-center col-span-6 lg:col-span-2">
      <div className="flex items-center justify-center max-[320px]:flex-col mb-4">
        <Select
          label="Período"
          value={periodMonths}
          setValue={setPeriodMonths}
          options={selectPeriodMonthsOptions}
          className="!my-2 !mr-2"
        />
        <Select
          label="Dias"
          value={periodDays}
          setValue={setPeriodDays}
          options={selectPeriodDaysOptions}
          className="!my-2 !ml-2"
        />
      </div>
      <Image
        src={onlineShoppingImg}
        alt="Online Shopping"
        className="max-w-[120px]"
      />
      <h1 className="text-lg font-bold">
        <span className="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-purple-700 dark:before:bg-purple-800 relative inline-block">
          <span className="relative text-white uppercase">
            {highestExpense?.title || ""}
          </span>
        </span>
      </h1>
      <p className="text-center">
        Foi o gasto que você mais teve nos últimos{" "}
        {periodMonths === 1 ? "30 dias" : `${periodMonths} meses`},{" "}
        {highestExpense?.quantity || 0} vez
        {highestExpense?.quantity > 1 ? "es" : ""}, totalizando{" "}
        {highestExpense?.totalAmount?.toLocaleString("pt-br", {
          style: "currency",
          currency: "BRL",
        }) || "R$ 00.00"}
      </p>
    </Box>
  );
}
