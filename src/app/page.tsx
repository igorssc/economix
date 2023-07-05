"use client";
import reminderImg from "@/assets/reminder.svg";
import { AnnualDataChart } from "@/components/AnnualDataChart";
import { Box } from "@/components/Box";
import { Button } from "@/components/Button";
import { CurrentMonthChart } from "@/components/CurrentMonthChart";
import { DayByTimeChartChart } from "@/components/DayByTimeChartChart";
import { ExpenseChart } from "@/components/ExpenseChart";
import { MonthlyProfitChart } from "@/components/MonthlyProfitChart";
import { Nav } from "@/components/Nav";
import { NewRegisterButton } from "@/components/NewRegisterButton";
import { SkeletonDashboard } from "@/components/SkeletonDashboard";
import { SummarizedMonthlyExpensesIndex } from "@/components/SummarizedMonthlyExpensesIndex";
import { TableRanking } from "@/components/TableRanking";
import { TableRecords } from "@/components/TableRecords";
import { DialogContext } from "@/contexts/dialogsContext";
import { RecordContext } from "@/contexts/recordContext";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SnackbarProvider } from "notistack";
import { useContext, useEffect, useState } from "react";
import onlineShoppingImg from "../assets/online-shopping.webp";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const {
    allRecordsFrom30DaysAgo,
    countAllQuantitiesAndAmountOf30DaysAgoByTitle,
    allRecordsFromMonthsAgoByCategory,
  } = useContext(RecordContext);

  const { setIsOpenCreateRecordDialog } = useContext(DialogContext);

  const [highestExpenseInTheLast30Days, setHighestExpenseInTheLast30Days] =
    useState(
      {} as {
        title: string;
        quantity: number;
        totalAmount: number;
      }
    );

  useEffect(() => {
    const processRecords = async () => {
      const biggestExpense: {
        title: string;
        quantity: number;
        totalAmount: number;
      }[] = [...allRecordsFrom30DaysAgo]
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
        setHighestExpenseInTheLast30Days(sortedExpenses[0]);
      }
    };

    processRecords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countAllQuantitiesAndAmountOf30DaysAgoByTitle]);

  if (status === "loading") {
    return (
      <>
        <SkeletonDashboard />
      </>
    );
  }

  if (!session?.user) {
    router.push("/login");
    return null;
  }

  if (
    !(
      allRecordsFromMonthsAgoByCategory.revenues.length > 0 ||
      allRecordsFromMonthsAgoByCategory.expenditures.length > 0
    )
  ) {
    return (
      <>
        <Nav />

        <main className="max-w-[1280px] md:h-[calc(100vh-230px)] text-center px-4 py-10 m-auto flex justify-center items-center">
          <div className="flex flex-col gap-10 items-center justify-center">
            <Image
              src={reminderImg}
              className="w-[300px] max-w-[90%]"
              alt="Reminder icon"
            />
            <h1 className="sm:text-lg md:text-xl uppercase font-medium">
              Você ainda não possui atividade!
            </h1>
            <h1 className="sm:text-lg md:text-xl font-medium">
              Clique no botão abaixo e comece a organizar sua vida!
            </h1>
            <Button onClick={() => setIsOpenCreateRecordDialog(true)}>
              Clique aqui
            </Button>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <SnackbarProvider maxSnack={3}>
        <Nav />
        <NewRegisterButton onClick={() => setIsOpenCreateRecordDialog(true)} />

        <main className="max-w-[1280px] p-4 m-auto">
          <SummarizedMonthlyExpensesIndex />

          <AnnualDataChart />
          <div className="flex flex-col sm:grid sm:grid-cols-6 md:col-span-2 gap-4 mt-4">
            <Box className="flex flex-col gap-4 items-center justify-center sm:col-span-6 md:col-span-2">
              <Image
                src={onlineShoppingImg}
                alt="Online Shopping"
                className="max-w-[120px]"
              />
              <h1 className="text-lg font-bold">
                <span className="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-purple-700 dark:before:bg-purple-800 relative inline-block">
                  <span className="relative text-white uppercase">
                    {highestExpenseInTheLast30Days?.title || ""}
                  </span>
                </span>
              </h1>
              <p className="text-center">
                Foi o gasto que você mais teve nos últimos 30 dias,{" "}
                {highestExpenseInTheLast30Days?.quantity || 0} vez
                {highestExpenseInTheLast30Days?.quantity > 1 ? "es" : ""},
                totalizando{" "}
                {highestExpenseInTheLast30Days?.totalAmount?.toLocaleString(
                  "pt-br",
                  {
                    style: "currency",
                    currency: "BRL",
                  }
                ) || "R$ 00.00"}
              </p>
            </Box>
            <Box className="sm:col-span-3 md:col-span-2">
              <h1 className="text-center">Quantidade de gastos mensais</h1>
              <ExpenseChart />
            </Box>
            <Box className="sm:col-span-3 md:col-span-2">
              <h1 className="text-center">Lucro mensal</h1>
              <MonthlyProfitChart />
            </Box>
            <Box className="col-span-6">
              <h1 className="text-center">Registros - Dia x Hora</h1>
              <DayByTimeChartChart />
            </Box>

            <Box className="sm:col-span-6 md:col-span-3 md:row-span-6 max-md:order-2">
              <h1 className="text-center mb-4">Útimos registros</h1>
              <div className="relative overflow-x-auto">
                <TableRecords hide={["description"]} />
              </div>
            </Box>

            <Box className="sm:col-span-6 md:col-span-3 max-md:order-1">
              <h1 className="text-center mb-4">
                Registros dos últimos 30 dias
              </h1>

              <div className="relative overflow-x-auto">
                <CurrentMonthChart />
              </div>
            </Box>
            <Box className="sm:col-span-6 md:col-span-3 max-md:order-3">
              <h1 className="text-center mb-4">Ranking de registros</h1>

              <div className="relative overflow-x-auto">
                <TableRanking />
              </div>
            </Box>
            <Box className="sm:col-span-6 md:col-span-3 max-md:order-4">
              <h1 className="text-center mb-4">Registros futuros</h1>
              <div className="relative overflow-x-auto">
                <TableRecords period="future" hide={["description"]} />
              </div>
            </Box>
          </div>
        </main>
      </SnackbarProvider>
    </>
  );
}
