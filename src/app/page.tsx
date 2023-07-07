"use client";
import reminderImg from "@/assets/reminder.svg";
import { AnnualDataChart } from "@/components/AnnualDataChart";
import { BiggestExpenseOfTheMonth } from "@/components/BiggestExpenseOfTheMonth";
import { Box } from "@/components/Box";
import { Button } from "@/components/Button";
import { DayByTimeChartChart } from "@/components/DayByTimeChartChart";
import { ExpenseChart } from "@/components/ExpenseChart";
import { IndexOfLastRecords } from "@/components/IndexOfLastRecords";
import { LatestRecords } from "@/components/LatestRecords";
import { MonthlyProfitChart } from "@/components/MonthlyProfitChart";
import { Nav } from "@/components/Nav";
import { NewRegisterButton } from "@/components/NewRegisterButton";
import { RankingRecords } from "@/components/RankingRecords";
import { SkeletonDashboard } from "@/components/SkeletonDashboard";
import { SummarizedMonthlyExpensesIndex } from "@/components/SummarizedMonthlyExpensesIndex";
import { TableRecords } from "@/components/TableRecords";
import { DialogContext } from "@/contexts/dialogsContext";
import { RecordContext } from "@/contexts/recordContext";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SnackbarProvider } from "notistack";
import { useContext } from "react";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const { allRecordsFromMonthsAgoByCategory } = useContext(RecordContext);

  const { setIsOpenCreateRecordDialog } = useContext(DialogContext);

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
            <BiggestExpenseOfTheMonth />

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

            <LatestRecords />

            <IndexOfLastRecords />

            <RankingRecords />

            <Box className="sm:col-span-6 md:col-span-3 max-md:order-4">
              <h1 className="text-left mb-8 mt-5">Registros futuros</h1>
              <div className="relative overflow-x-auto">
                <TableRecords
                  period="future"
                  hide={["description"]}
                  limit={15}
                />
              </div>
            </Box>
          </div>
        </main>
      </SnackbarProvider>
    </>
  );
}
