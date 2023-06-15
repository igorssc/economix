"use client";
import { Box } from "@/components/Box";
import { DeleteRecordDialog } from "@/components/DeleteRecordDialog";
import { Dialog } from "@/components/Dialog";
import { EditRecordDialog } from "@/components/EditRecordDialog";
import { MultiLineChart } from "@/components/MultiLineChart";
import { Nav } from "@/components/Nav";
import { NewRegisterButton } from "@/components/NewRegisterButton";
import { SimpleBarChart } from "@/components/SimpleBarChart";
import { SimpleLineChart } from "@/components/SimpleLineChart";
import { SimpleScatterChart } from "@/components/SimpleScatterChart";
import { SummarizedMonthlyExpensesIndex } from "@/components/SummarizedMonthlyExpensesIndex";
import { ViewRecordDialog } from "@/components/ViewRecordDialog";
import { RecordContext, RecordType } from "@/contexts/recordContext";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { ArrowDown, ArrowUp } from "@phosphor-icons/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SnackbarProvider } from "notistack";
import { useContext, useEffect, useState } from "react";
import onlineShoppingImg from "../../assets/online-shopping.png";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [isOpenViewRecordDialog, setIsOpenViewRecordDialog] = useState(false);
  const [isOpenEditRecordDialog, setIsOpenEditRecordDialog] = useState(false);
  const [isOpenDeleteRecordDialog, setIsOpenDeleteRecordDialog] =
    useState(false);
  const [recordSelected, setRecordSelected] = useState({} as RecordType);

  const {
    allRecordsFromMonthsAgoByMonth,
    allRecordsFrom30DaysAgo,
    countAllQuantitiesAndAmountOf30DaysAgoByTitle,
    allRecordsInFuture,
  } = useContext(RecordContext);

  const monthlyDepositValuesComparison =
    (allRecordsFromMonthsAgoByMonth
      .find((v) => v.monthAgo === 0)
      ?.values.deposits.reduce((acc, v) => (acc += v.amount), 0) || 0) -
    (allRecordsFromMonthsAgoByMonth
      .find((v) => v.monthAgo === 1)
      ?.values.deposits.reduce((acc, v) => (acc += v.amount), 0) || 0);

  const monthlyWithdrawValuesComparison =
    (allRecordsFromMonthsAgoByMonth
      .find((v) => v.monthAgo === 0)
      ?.values.withdraws.reduce((acc, v) => (acc += v.amount), 0) || 0) -
    (allRecordsFromMonthsAgoByMonth
      .find((v) => v.monthAgo === 1)
      ?.values.withdraws.reduce((acc, v) => (acc += v.amount), 0) || 0);

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
        <Skeleton variant="rectangular" className="w-full !h-20 mb-6" />
        <Stack
          spacing={2}
          className="flex justify-center items-center max-w-[1280px] p-4 m-auto"
        >
          <Skeleton
            variant="rectangular"
            className="w-80 !h-16 mx-auto max-w-full"
          />
          <div className="flex gap-4 pb-6">
            <div className="flex max-md:flex-col gap-4 justify-center items-center">
              <Skeleton variant="circular" className="w-16 !h-16" />
              <Skeleton
                variant="rectangular"
                className="w-32 sm:w-48 md:w-60 !h-16 mx-auto max-w-full"
              />
            </div>
            <div className="flex max-md:flex-col gap-4 justify-center items-center">
              <Skeleton
                variant="rectangular"
                className="max-md:order-2 w-32 sm:w-48 md:w-60 !h-16 mx-auto max-w-full"
              />
              <Skeleton
                variant="circular"
                className="max-md:order-1 w-16 !h-16"
              />
            </div>
          </div>
          <Skeleton variant="rectangular" className="w-full !h-80" />
          <div className="w-full gap-4 grid grid-cols-3">
            <Skeleton variant="rectangular" className="w-full !h-80" />
            <Skeleton variant="rectangular" className="w-full !h-80" />
            <Skeleton variant="rectangular" className="w-full !h-80" />
          </div>
          <Skeleton variant="rectangular" className="w-full !h-80" />
          <div className="w-full gap-4 grid grid-cols-2">
            <Skeleton variant="rectangular" className="w-full !h-80" />
            <Skeleton variant="rectangular" className="w-full !h-80" />
          </div>
        </Stack>
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
        <NewRegisterButton onClick={() => setIsOpenDialog(true)} />
        <Dialog open={isOpenDialog} setOpen={setIsOpenDialog} />

        {isOpenViewRecordDialog && (
          <ViewRecordDialog
            open={isOpenViewRecordDialog}
            setOpen={setIsOpenViewRecordDialog}
            record={recordSelected}
            setOpenEdit={setIsOpenEditRecordDialog}
            setOpenDelete={setIsOpenDeleteRecordDialog}
          />
        )}

        {isOpenEditRecordDialog && (
          <EditRecordDialog
            open={isOpenEditRecordDialog}
            setOpen={setIsOpenEditRecordDialog}
            record={recordSelected}
          />
        )}

        {isOpenDeleteRecordDialog && (
          <DeleteRecordDialog
            open={isOpenDeleteRecordDialog}
            setOpen={setIsOpenDeleteRecordDialog}
            record={recordSelected}
          />
        )}

        <main className="max-w-[1280px] p-4 m-auto">
          <div className="flex flex-col gap-8 justify-center items-center">
            <p className="text-center">
              Seus gastos esse mês já somam:
              <br />
              <span className="font-bold text-2xl">
                R${" "}
                {allRecordsFromMonthsAgoByMonth
                  .find((v) => v.monthAgo === 0)
                  ?.values.withdraws.reduce((acc, v) => acc + v.amount, 0)
                  .toLocaleString("pt-br", { minimumFractionDigits: 2 })}
              </span>
            </p>

            <div className="flex justify-center gap-10">
              <SummarizedMonthlyExpensesIndex
                title={Math.abs(monthlyDepositValuesComparison).toLocaleString(
                  "pt-br",
                  {
                    style: "currency",
                    currency: "BRL",
                  }
                )}
                description={`${
                  monthlyDepositValuesComparison > 0 ? "A mais" : "A menos"
                } de depósitos este mês`}
                _icon={monthlyDepositValuesComparison > 0 ? ArrowUp : ArrowDown}
              />
              <SummarizedMonthlyExpensesIndex
                title={Math.abs(monthlyWithdrawValuesComparison).toLocaleString(
                  "pt-br",
                  {
                    style: "currency",
                    currency: "BRL",
                  }
                )}
                description={`${
                  monthlyWithdrawValuesComparison > 0 ? "A mais" : "A menos"
                } de retiradas este mês`}
                _icon={
                  monthlyWithdrawValuesComparison > 0 ? ArrowUp : ArrowDown
                }
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

            <Box className="sm:col-span-6 md:col-span-3 max-md:order-2">
              <h1 className="text-center mb-4">Útimos registros</h1>
              <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs uppercase bg-[#15599c] text-gray-50">
                    <tr className="[&_th]:px-6 [&_th]:py-3">
                      <th scope="col">Título</th>
                      <th scope="col">Categoria</th>
                      <th scope="col">Valor</th>
                      <th scope="col">Data</th>
                    </tr>
                  </thead>
                  <tbody className="[&>*:not(:last-child)]:border-b [&_tr]:dark:bg-gray-800 [&_tr]:dark:border-gray-700 [&_tr>th]:px-6 [&_tr>th]:py-4 [&_tr>th]:font-medium [&_tr>th]:text-gray-900 [&_tr>th]:whitespace-nowrap [&_tr>th]:dark:text-white [&_tr>td]:px-6 [&_tr>td]:py-4">
                    {allRecordsFrom30DaysAgo.map((value) => (
                      <tr key={value.id}>
                        <th
                          scope="row"
                          onClick={() => {
                            setRecordSelected(value);
                            setIsOpenViewRecordDialog(true);
                          }}
                          className="cursor-pointer"
                        >
                          {value.installment > 0
                            ? `${value.title} - Parc ${value.installment}`
                            : value.title}
                        </th>
                        <td>
                          {value.category === "deposit"
                            ? "Depósito"
                            : "Retirada"}
                        </td>
                        <td>
                          {value.amount?.toLocaleString("pt-br", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        </td>
                        <td>
                          {new Date(value.date).toLocaleDateString("pt-br", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Box>
            <div className="sm:col-span-6 md:col-span-3 max-md:order-1 flex flex-col gap-4">
              <Box className="">
                <h1 className="text-center mb-4">Registros futuros</h1>
                <div className="relative overflow-x-auto">
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs uppercase bg-[#15599c] text-gray-50">
                      <tr className="[&_th]:px-6 [&_th]:py-3">
                        <th scope="col">Título</th>
                        <th scope="col">Categoria</th>
                        <th scope="col">Valor</th>
                        <th scope="col">Data</th>
                      </tr>
                    </thead>
                    <tbody className="[&>*:not(:last-child)]:border-b [&_tr]:dark:bg-gray-800 [&_tr]:dark:border-gray-700 [&_tr>th]:px-6 [&_tr>th]:py-4 [&_tr>th]:font-medium [&_tr>th]:text-gray-900 [&_tr>th]:whitespace-nowrap [&_tr>th]:dark:text-white [&_tr>td]:px-6 [&_tr>td]:py-4">
                      {allRecordsInFuture.map((value, index) => (
                        <tr key={index}>
                          <th scope="row">
                            {value.installment > 0
                              ? `${value.title} - Parc ${value.installment}`
                              : value.title}
                          </th>
                          <td>
                            {value.category === "deposit"
                              ? "Depósito"
                              : "Retirada"}
                          </td>
                          <td>
                            {value.amount?.toLocaleString("pt-br", {
                              style: "currency",
                              currency: "BRL",
                            })}
                          </td>
                          <td>
                            {new Date(value.date).toLocaleDateString("pt-br", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Box>
              <Box className="">
                <h1 className="text-center mb-4">Ranking de registros</h1>

                <div className="relative overflow-x-auto">
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs uppercase bg-[#15599c] text-gray-50">
                      <tr className="[&_th]:px-6 [&_th]:py-3">
                        <th scope="col">Título</th>
                        <th scope="col">Quantidade</th>
                        <th scope="col">Total</th>
                      </tr>
                    </thead>
                    <tbody className="[&>*:not(:last-child)]:border-b [&_tr]:dark:bg-gray-800 [&_tr]:dark:border-gray-700 [&_tr>th]:px-6 [&_tr>th]:py-4 [&_tr>th]:font-medium [&_tr>th]:text-gray-900 [&_tr>th]:whitespace-nowrap [&_tr>th]:dark:text-white [&_tr>td]:px-6 [&_tr>td]:py-4">
                      {countAllQuantitiesAndAmountOf30DaysAgoByTitle.map(
                        (value, index) => (
                          <tr key={index}>
                            <th scope="row">
                              {value.title.charAt(0).toUpperCase() +
                                value.title.slice(1).toLowerCase()}
                            </th>
                            <td>{value.quantity}</td>
                            <td>
                              {value.totalAmount?.toLocaleString("pt-br", {
                                style: "currency",
                                currency: "BRL",
                              })}
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </Box>
            </div>
          </div>
        </main>
      </SnackbarProvider>
    </>
  );
}
