import { RecordContext, RecordType } from "@/contexts/recordContext";
import { filterRecordsBasedOnPeriod } from "@/utils/filterRecordsBasedOnPeriod";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import onlineShoppingImg from "../assets/online-shopping.webp";
import { Box } from "./Box";
import { Select } from "./Select";

export function BiggestExpenseOfTheMonth() {
  const { allRecordsFrom30DaysAgo, allRecordsFromMonthsAgoByCategory } =
    useContext(RecordContext);

  const [highestExpense, setHighestExpense] = useState(
    {} as {
      title: string;
      quantity: number;
      totalAmount: number;
    }
  );

  const [period, setPeriod] = useState("1 mês");
  const [recordsBase, setRecordsBase] = useState<RecordType[]>([]);

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
    setRecordsBase(allRecordsFrom30DaysAgo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setRecordsBase(
      filterRecordsBasedOnPeriod({
        records: [
          ...allRecordsFromMonthsAgoByCategory.expenditures,
          ...allRecordsFromMonthsAgoByCategory.revenues,
        ],
        period: +period.split(" ")[0],
        unit: "month",
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [period, allRecordsFromMonthsAgoByCategory]);

  const selectOptions = [
    "1 mês",
    "2 meses",
    "3 meses",
    "4 meses",
    "5 meses",
    "6 meses",
    "7 meses",
    "8 meses",
    "9 meses",
    "10 meses",
    "11 meses",
    "12 meses",
  ];

  useEffect(() => {
    processRecords(recordsBase);
  }, [recordsBase]);

  return (
    <Box className="flex flex-col gap-4 items-center justify-center sm:col-span-6 md:col-span-2">
      <div className="">
        <Select
          label="Período"
          value={period}
          setValue={setPeriod}
          options={selectOptions}
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
        {period === "1 mês" ? "30 dias" : period},{" "}
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
