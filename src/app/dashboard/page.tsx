"use client";
import { Box } from "@/components/Box";
import { Dialog } from "@/components/Dialog";
import { MultiLineChart } from "@/components/MultiLineChart";
import { Nav } from "@/components/Nav";
import { NewRegister } from "@/components/NewRegister";
import { SimpleBarChart } from "@/components/SimpleBarChart";
import { SimpleLineChart } from "@/components/SimpleLineChart";
import { SimpleScatterChart } from "@/components/SimpleScatterChart";
import { SummarizedMonthlyExpensesIndex } from "@/components/SummarizedMonthlyExpensesIndex";
import { Search } from "@/components/search";
import { ArrowDown, ArrowUp } from "@phosphor-icons/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import onlineShoppingImg from "../../assets/online-shopping.png";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isOpenDialog, setIsOpenDialog] = useState(false);

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
      <NewRegister onClick={() => setIsOpenDialog(true)} />
      <Dialog.Register open={isOpenDialog} setOpen={setIsOpenDialog} />

      <main className="max-w-[1280px] p-4 m-auto">
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
                  Supermercado
                </span>
              </span>
            </h1>
            <p className="text-center">
              foi o gasto que você mais teve nos últimos 30 dias, totalizando R$
              1.300,00
            </p>
          </Box>
          <Box className="sm:col-span-3 md:col-span-2">
            <h1 className="text-center">Lucro mensal</h1>
            <SimpleBarChart />
          </Box>
          <Box className="sm:col-span-3 md:col-span-2">
            <h1 className="text-center">Lucro mensal</h1>
            <SimpleLineChart />
          </Box>
          <div className="col-span-6">
            <SimpleScatterChart />
          </div>

          <Box className="sm:col-span-6 md:col-span-3 max-md:order-2">
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-[#15599c] dark:text-gray-50">
                  <tr className="[&_th]:px-6 [&_th]:py-3">
                    <th scope="col">Título</th>
                    <th scope="col">Categoria</th>
                    <th scope="col">Valor</th>
                    <th scope="col">Data</th>
                  </tr>
                </thead>
                <tbody className="[&>*:not(:last-child)]:border-b [&_tr]:dark:bg-gray-800 [&_tr]:dark:border-gray-700 [&_tr>th]:px-6 [&_tr>th]:py-4 [&_tr>th]:font-medium [&_tr>th]:text-gray-900 [&_tr>th]:whitespace-nowrap [&_tr>th]:dark:text-white [&_tr>td]:px-6 [&_tr>td]:py-4">
                  <tr>
                    <th scope="row">Apple MacBook Pro 17</th>
                    <td>Silver</td>
                    <td>Laptop</td>
                    <td>$2999</td>
                  </tr>
                  <tr>
                    <th scope="row">Microsoft Surface Pro</th>
                    <td>White</td>
                    <td>Laptop PC</td>
                    <td>$1999</td>
                  </tr>
                  <tr>
                    <th scope="row">Microsoft Surface Pro</th>
                    <td>White</td>
                    <td>Laptop PC</td>
                    <td>$1999</td>
                  </tr>
                  <tr>
                    <th scope="row">Microsoft Surface Pro</th>
                    <td>White</td>
                    <td>Laptop PC</td>
                    <td>$1999</td>
                  </tr>
                  <tr>
                    <th scope="row">Microsoft Surface Pro</th>
                    <td>White</td>
                    <td>Laptop PC</td>
                    <td>$1999</td>
                  </tr>
                  <tr>
                    <th scope="row">Microsoft Surface Pro</th>
                    <td>White</td>
                    <td>Laptop PC</td>
                    <td>$1999</td>
                  </tr>
                  <tr>
                    <th scope="row">Microsoft Surface Pro</th>
                    <td>White</td>
                    <td>Laptop PC</td>
                    <td>$1999</td>
                  </tr>
                  <tr>
                    <th scope="row">Microsoft Surface Pro</th>
                    <td>White</td>
                    <td>Laptop PC</td>
                    <td>$1999</td>
                  </tr>
                  <tr>
                    <th scope="row">Microsoft Surface Pro</th>
                    <td>White</td>
                    <td>Laptop PC</td>
                    <td>$1999</td>
                  </tr>
                  <tr>
                    <th scope="row">Magic Mouse 2</th>
                    <td>Black</td>
                    <td>Accessories</td>
                    <td>$99</td>
                  </tr>
                  <tr>
                    <th scope="row">Magic Mouse 2</th>
                    <td>Black</td>
                    <td>Accessories</td>
                    <td>$99</td>
                  </tr>
                  <tr>
                    <th scope="row">Magic Mouse 2</th>
                    <td>Black</td>
                    <td>Accessories</td>
                    <td>$99</td>
                  </tr>
                  <tr>
                    <th scope="row">Magic Mouse 2</th>
                    <td>Black</td>
                    <td>Accessories</td>
                    <td>$99</td>
                  </tr>
                  <tr>
                    <th scope="row">Magic Mouse 2</th>
                    <td>Black</td>
                    <td>Accessories</td>
                    <td>$99</td>
                  </tr>
                  <tr>
                    <th scope="row">Magic Mouse 2</th>
                    <td>Black</td>
                    <td>Accessories</td>
                    <td>$99</td>
                  </tr>
                  <tr>
                    <th scope="row">Magic Mouse 2</th>
                    <td>Black</td>
                    <td>Accessories</td>
                    <td>$99</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Box>
          <Box className="sm:col-span-6 md:col-span-3 max-md:order-1">
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-[#15599c] dark:text-gray-50">
                  <tr className="[&_th]:px-6 [&_th]:py-3">
                    <th scope="col">Categoria</th>
                    <th scope="col">Quantidade</th>
                    <th scope="col">Total</th>
                  </tr>
                </thead>
                <tbody className="[&>*:not(:last-child)]:border-b [&_tr]:dark:bg-gray-800 [&_tr]:dark:border-gray-700 [&_tr>th]:px-6 [&_tr>th]:py-4 [&_tr>th]:font-medium [&_tr>th]:text-gray-900 [&_tr>th]:whitespace-nowrap [&_tr>th]:dark:text-white [&_tr>td]:px-6 [&_tr>td]:py-4">
                  <tr>
                    <th scope="row">Apple MacBook Pro 17</th>
                    <td>12</td>
                    <td>$2999</td>
                  </tr>
                  <tr>
                    <th scope="row">Microsoft Surface Pro</th>
                    <td>12</td>
                    <td>$1999</td>
                  </tr>
                  <tr>
                    <th scope="row">Microsoft Surface Pro</th>
                    <td>12</td>
                    <td>$1999</td>
                  </tr>
                  <tr>
                    <th scope="row">Microsoft Surface Pro</th>
                    <td>12</td>
                    <td>$1999</td>
                  </tr>
                  <tr>
                    <th scope="row">Microsoft Surface Pro</th>
                    <td>12</td>
                    <td>$1999</td>
                  </tr>
                  <tr>
                    <th scope="row">Microsoft Surface Pro</th>
                    <td>12</td>
                    <td>$1999</td>
                  </tr>
                  <tr>
                    <th scope="row">Microsoft Surface Pro</th>
                    <td>12</td>
                    <td>$1999</td>
                  </tr>
                  <tr>
                    <th scope="row">Microsoft Surface Pro</th>
                    <td>12</td>
                    <td>$1999</td>
                  </tr>
                  <tr>
                    <th scope="row">Microsoft Surface Pro</th>
                    <td>12</td>
                    <td>$1999</td>
                  </tr>
                  <tr>
                    <th scope="row">Magic Mouse 2</th>
                    <td>12</td>
                    <td>$99</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Box>
        </div>
      </main>
    </>
  );
}
