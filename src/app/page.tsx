"use client";
import reminderImg from "@/assets/reminder.svg";
import { AnnualDataChart } from "@/components/AnnualDataChart";
import { BiggestExpenseOfTheMonth } from "@/components/BiggestExpenseOfTheMonth";
import { Box } from "@/components/Box";
import { Button } from "@/components/Button";
import { ExpenseChart } from "@/components/ExpenseChart";
import { Footer } from "@/components/Footer";
import { IndexOfLastRecords } from "@/components/IndexOfLastRecords";
import { LatestRecords } from "@/components/LatestRecords";
import { MonthlyProfitChart } from "@/components/MonthlyProfitChart";
import { Nav } from "@/components/Nav";
import { NewRegisterButton } from "@/components/NewRegisterButton";
import { RankingRecords } from "@/components/RankingRecords";
import { RecordDayTime } from "@/components/RecordDayTime";
import { ScrollTopButton } from "@/components/ScrollTopButton";
import { SkeletonDashboard } from "@/components/SkeletonDashboard";
import { SummarizedMonthlyExpensesIndex } from "@/components/SummarizedMonthlyExpensesIndex";
import { TableRecords } from "@/components/TableRecords";
import { DialogContext } from "@/contexts/dialogsContext";
import { RecordContext } from "@/contexts/recordContext";
import { SelectFilterRecordsProvider } from "@/contexts/selectFilterRecordsContext";
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
        <ScrollTopButton />

        <main className="max-w-[1280px] p-4 m-auto">
          <SummarizedMonthlyExpensesIndex />

          <AnnualDataChart />
          <div className="flex flex-col sm:grid sm:grid-cols-6 md:col-span-2 gap-4 mt-4">
            <SelectFilterRecordsProvider>
              <BiggestExpenseOfTheMonth />
            </SelectFilterRecordsProvider>

            <Box className="sm:col-span-3 md:col-span-3 lg:col-span-2">
              <h1 className="text-center">Quantidade de gastos mensais</h1>
              <ExpenseChart />
            </Box>
            <Box className="sm:col-span-3 md:col-span-3 lg:col-span-2">
              <h1 className="text-center">Lucro mensal</h1>
              <MonthlyProfitChart />
            </Box>

            <SelectFilterRecordsProvider>
              <RecordDayTime />
            </SelectFilterRecordsProvider>

            <SelectFilterRecordsProvider>
              <LatestRecords />
            </SelectFilterRecordsProvider>

            <SelectFilterRecordsProvider>
              <IndexOfLastRecords />
            </SelectFilterRecordsProvider>

            <SelectFilterRecordsProvider>
              <RankingRecords />
            </SelectFilterRecordsProvider>

            <Box className="sm:col-span-6 md:col-span-3 max-md:order-4">
              <h1 className="mb-5 max-[520px]:text-center md:max-lg:text-center min-[520px]:max-md:mb-8 lg:mb-8 min-[520px]:max-md:mt-5 lg:mt-5">
                Registros futuros
              </h1>
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

      <Footer />
    </>
  );
}
