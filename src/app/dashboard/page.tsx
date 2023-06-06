"use client";
import { Box } from "@/components/Box";
import { MultiLineChart } from "@/components/MultiLineChart";
import { Nav } from "@/components/Nav";
import { SimpleBarChart } from "@/components/SimpleBarChart";
import { SimpleLineChart } from "@/components/SimpleLineChart";
import { SummarizedMonthlyExpensesIndex } from "@/components/SummarizedMonthlyExpensesIndex";
import { Search } from "@/components/search";
import { ArrowDown, ArrowUp } from "@phosphor-icons/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import onlineShoppingImg from "../../assets/online-shopping.png";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <>Carregando...</>;
  }

  if (!session?.user) {
    router.push("/");
    return null;
  }

  return (
    <>
      <Nav />
      <Search />
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
        <MultiLineChart />
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          <Box className="flex flex-col gap-4 items-center justify-center">
            <Image
              src={onlineShoppingImg}
              alt="Online Shopping"
              className="max-w-[120px]"
            />
            <h1 className="text-lg font-bold">
              <span className="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-pink-500 relative inline-block">
                <span className="relative text-white uppercase">
                  Supermercado
                </span>
              </span>
            </h1>
            <p className="text-center">
              foi o gasto que você mais teve nos últimos 30 dias, totalizando R$
              1.300,00
            </p>
          </Box>
          <Box>
            <SimpleBarChart />
          </Box>
          <Box>
            <SimpleLineChart />
          </Box>
          <Box>a</Box>
          <Box>a</Box>
          <Box>a</Box>
        </div>
      </main>
    </>
  );
}
