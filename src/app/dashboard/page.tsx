"use client";
import { BaseSummarizedMonthlyExpensesIndex } from "@/components/BaseSummarizedMonthlyExpensesIndex";
import { Box } from "@/components/Box";
import { MultiLineChart } from "@/components/MultiLineChart";
import { Nav } from "@/components/Nav";
import { NewRegisterButton } from "@/components/NewRegisterButton";
import { SimpleBarChart } from "@/components/SimpleBarChart";
import { SimpleLineChart } from "@/components/SimpleLineChart";
import { SimpleScatterChart } from "@/components/SimpleScatterChart";
import { SkeletonDashboard } from "@/components/SkeletonDashboard";
import { TableRankingRecords } from "@/components/TableRankingRecords";
import { TableRecords } from "@/components/TableRecords";
import { DialogContext } from "@/contexts/dialogsContext";
import { RecordContext } from "@/contexts/recordContext";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SnackbarProvider } from "notistack";
import { useContext, useEffect, useState } from "react";
import onlineShoppingImg from "../../assets/online-shopping.png";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const {
    allRecordsFrom30DaysAgo,
    countAllQuantitiesAndAmountOf30DaysAgoByTitle,
    allRecordsInFuture,
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
    setHighestExpenseInTheLast30Days(
      countAllQuantitiesAndAmountOf30DaysAgoByTitle.sort(
        (a, b) => b.totalAmount - a.totalAmount
      )[0]
    );
  }, [countAllQuantitiesAndAmountOf30DaysAgoByTitle]);

  if (status === "loading") {
    return (
      <>
        <SkeletonDashboard />
      </>
    );
  }

  if (!session?.user) {
    router.push("/");
    return null;
  }

  return (
    <>
      <SnackbarProvider maxSnack={3}>
        <Nav />
        <NewRegisterButton onClick={() => setIsOpenCreateRecordDialog(true)} />

        <main className="max-w-[1280px] p-4 m-auto">
          <BaseSummarizedMonthlyExpensesIndex />

          <MultiLineChart />
          <div className="flex flex-col sm:grid sm:grid-cols-6 md:col-span-2 gap-4 mt-4">
            <Box className="flex flex-col gap-4 items-center justify-center sm:col-span-6 md:col-span-2">
              <Image
                src={onlineShoppingImg}
                alt="Online Shopping"
                className="max-w-[120px]"
              />
              <h1 className="text-lg font-bold">
                <span className="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-[#2f8eec] relative inline-block">
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
              <SimpleBarChart />
            </Box>
            <Box className="sm:col-span-3 md:col-span-2">
              <h1 className="text-center">Lucro mensal</h1>
              <SimpleLineChart />
            </Box>
            <Box className="col-span-6">
              <h1 className="text-center">Registros - Dia x Hora</h1>
              <SimpleScatterChart />
            </Box>

            <Box className="sm:col-span-6 md:col-span-3">
              <h1 className="text-center mb-4">"Útimos registros"</h1>
              <div className="relative overflow-x-auto">
                <TableRecords records={allRecordsFrom30DaysAgo} />
              </div>
            </Box>

            <div className="sm:col-span-6 md:col-span-3 flex flex-col gap-4">
              <Box className="max-md:order-1">
                <h1 className="text-center mb-4">Ranking de registros</h1>

                <div className="relative overflow-x-auto">
                  <TableRankingRecords />
                </div>
              </Box>
              <Box className="max-md:order-2">
                <h1 className="text-center mb-4">Registros futuros</h1>
                <div className="relative overflow-x-auto">
                  <TableRecords records={allRecordsInFuture} />
                </div>
              </Box>
            </div>
          </div>
        </main>
      </SnackbarProvider>
    </>
  );
}
