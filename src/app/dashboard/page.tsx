"use client";
import { Box } from "@/components/Box";
import { Nav } from "@/components/Nav";
import { SummarizedMonthlyExpensesIndex } from "@/components/SummarizedMonthlyExpensesIndex";
import { MonthlyExpenses } from "@/components/monthlyExpenses";
import { ArrowDown, ArrowUp } from "@phosphor-icons/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return null;
  }

  if (!session?.user) {
    router.push("/");
    return null;
  }

  return (
    <>
      <Nav />
      <main className="max-w-[1280px] p-4">
        <div className="flex flex-col gap-8 justify-center items-center">
          <p className="text-center">
            Seus gastos esse mês já somam:
            <br />
            <span className="font-bold text-2xl">R$ 1.200,00</span>
          </p>

          <div className="flex justify-center gap-10">
            <SummarizedMonthlyExpensesIndex
              title="R$ 120,00"
              description="Acima do mês anterior"
              _icon={ArrowUp}
            />
            <SummarizedMonthlyExpensesIndex
              title="R$ 120,00"
              description="Acima do mês anterior"
              _icon={ArrowDown}
              invert
            />
          </div>
        </div>
        <MonthlyExpenses />
        <div className="grid grid-cols-3 gap-4 mt-4">
          <Box>a</Box>
          <Box>a</Box>
          <Box>a</Box>
        </div>
      </main>
    </>
  );
}
