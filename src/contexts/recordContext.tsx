"use client";
import { CREATE_RECORD, createRecordMutationResponse } from "@/db/createRecord";
import {
  GET_ALL_AGGREGATIONS_BETWEEN_DATES,
  getAllAggregationsBetweenDatesQueryResponse,
} from "@/db/getAllAggregationsBetweenDates";
import {
  GET_ALL_AGGREGATIONS_IN_THE_FUTURE,
  getAllAggregationsInFutureResponse,
} from "@/db/getAllAggregationsInFuture";
import {
  PUBLISH_RECORD,
  publishRecordMutationResponse,
} from "@/db/publishRecord";
import { UPDATE_RECORD, updateRecordMutationResponse } from "@/db/updateRecord";
import { getISODateOfMonthsAgo } from "@/utils/getISODateOfMonthsAgo";
import { useMutation, useQuery } from "@apollo/client";
import { differenceInMinutes, formatDistanceStrict } from "date-fns";
import { useSession } from "next-auth/react";
import { ReactNode, createContext, useEffect, useState } from "react";
import { clearIntervalAsync, setIntervalAsync } from "set-interval-async";

interface RecordProviderProps {
  children: ReactNode;
}

export type RecordType = {
  id: string;
  title: string;
  category: string;
  amount: number;
  installment: number;
  description?: string;
  date: string;
};

type RecordData = {
  countAllRecordsFromMonthsAgoByCategory: {
    monthsAgo: number;
    deposit: number;
    withdraw: number;
  }[];

  allRecordsFrom30DaysAgo: RecordType[];

  allRecordsInFuture: RecordType[];

  countAllQuantitiesAndAmountOf30DaysAgoByTitle: {
    title: string;
    quantity: number;
    totalAmount: number;
  }[];

  allRecordsFromMonthsAgoByMonth: {
    monthAgo: number;
    values: {
      deposits: RecordType[];
      withdraws: RecordType[];
    };
  }[];

  createRecord: ({
    title,
    category,
    amount,
    description,
    installments,
    date,
  }: {
    title: string;
    category: string;
    amount: number;
    description?: string;
    installments: number;
    date: string;
  }) => Promise<void>;

  updateRecord: ({
    id,
    title,
    category,
    amount,
    description,
    date,
  }: {
    id: string;
    title?: string | undefined;
    category?: string | undefined;
    amount?: number | undefined;
    description?: string | undefined;
    date?: string | undefined;
  }) => Promise<void>;
};

export const RecordContext = createContext({} as RecordData);

export function RecordProvider({ children }: RecordProviderProps) {
  const { data: session } = useSession();

  const [createRecordMutateFunction] =
    useMutation<createRecordMutationResponse>(CREATE_RECORD);

  const [publishRegisterMutateFunction] =
    useMutation<publishRecordMutationResponse>(PUBLISH_RECORD);

  const [updateRegisterMutateFunction] =
    useMutation<updateRecordMutationResponse>(UPDATE_RECORD);

  const { refetch: refetchGetAllRecordsFromMonthsAgo } =
    useQuery<getAllAggregationsBetweenDatesQueryResponse>(
      GET_ALL_AGGREGATIONS_BETWEEN_DATES
    );

  const {
    data: dataGetAllRecordsInFuture,
    refetch: refetchGetAllRecordsInFuture,
  } = useQuery<getAllAggregationsInFutureResponse>(
    GET_ALL_AGGREGATIONS_IN_THE_FUTURE
  );

  const [
    countAllRecordsFromMonthsAgoByCategory,
    setCountAllRecordsFromMonthsAgoByCategory,
  ] = useState(
    Array.from({ length: 12 }, (_, i) => ({
      monthsAgo: i,
      deposit: 0,
      withdraw: 0,
    }))
  );

  const [
    countAllQuantitiesAndAmountOf30DaysAgoByTitle,
    setCountAllQuantitiesAndAmountOf30DaysAgoByTitle,
  ] = useState(
    [] as { title: string; quantity: number; totalAmount: number }[]
  );

  const [
    allRecordsFromMonthsAgoByCategory,
    setAllRecordsFromMonthsAgoByCategory,
  ] = useState({ deposits: [] as RecordType[], withdraws: [] as RecordType[] });

  const [allRecordsFrom30DaysAgo, setAllRecordsFrom30DaysAgo] = useState(
    [] as RecordType[]
  );

  const [allRecordsInFuture, setAllRecordsInFuture] = useState(
    [] as RecordType[]
  );

  const [allRecordsFromMonthsAgoByMonth, setAllRecordsFromMonthsAgoByMonth] =
    useState(
      Array.from({ length: 12 }, (_, i) => ({
        monthAgo: i,
        values: { deposits: [] as RecordType[], withdraws: [] as RecordType[] },
      }))
    );

  useEffect(() => {
    const newData = dataGetAllRecordsInFuture?.recordsConnection.edges.map(
      (v) => v.node
    );

    setAllRecordsInFuture(newData || []);
  }, [dataGetAllRecordsInFuture]);

  useEffect(() => {
    setAllRecordsFrom30DaysAgo([]);

    allRecordsFromMonthsAgoByMonth
      .find((v) => v.monthAgo === 0)
      ?.values.withdraws.forEach((v) => {
        setAllRecordsFrom30DaysAgo((prev) => [...prev, v]);
      });

    allRecordsFromMonthsAgoByMonth
      .find((v) => v.monthAgo === 1)
      ?.values.withdraws.forEach((v) => {
        const distance = +formatDistanceStrict(new Date(), new Date(v.date), {
          unit: "day",
          addSuffix: false,
        }).split(" ")[0];

        if (distance > 30) {
          return;
        }

        setAllRecordsFrom30DaysAgo((prev) => [...prev, v]);
      });

    allRecordsFromMonthsAgoByMonth
      .find((v) => v.monthAgo === 0)
      ?.values.deposits.forEach((v) => {
        setAllRecordsFrom30DaysAgo((prev) => [...prev, v]);
      });

    allRecordsFromMonthsAgoByMonth
      .find((v) => v.monthAgo === 1)
      ?.values.deposits.forEach((v) => {
        const distance = +formatDistanceStrict(new Date(), new Date(v.date), {
          unit: "day",
          addSuffix: false,
        }).split(" ")[0];

        if (distance > 30) {
          return;
        }

        setAllRecordsFrom30DaysAgo((prev) => [...prev, v]);
      });

    setAllRecordsFrom30DaysAgo((prev) =>
      [...prev].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      )
    );
  }, [allRecordsFromMonthsAgoByMonth]);

  useEffect(() => {
    setCountAllQuantitiesAndAmountOf30DaysAgoByTitle([]);

    const prevArray = [] as {
      title: string;
      quantity: number;
      totalAmount: number;
    }[];

    allRecordsFrom30DaysAgo.forEach((v) => {
      const valueIndex =
        prevArray.length > 0
          ? prevArray
              .map((m) => m.title.toLowerCase())
              .indexOf(v.title.toLowerCase())
          : -1;

      if (valueIndex > -1) {
        prevArray[valueIndex] = {
          title: v.title.toLowerCase(),
          quantity: prevArray[valueIndex].quantity + 1,
          totalAmount: prevArray[valueIndex].totalAmount + v.amount,
        };
      } else {
        prevArray.push({
          title: v.title.toLowerCase(),
          quantity: 1,
          totalAmount: v.amount,
        });
      }
    });

    prevArray.sort((a, b) => b.totalAmount - a.totalAmount);

    setCountAllQuantitiesAndAmountOf30DaysAgoByTitle(prevArray);
  }, [allRecordsFrom30DaysAgo]);

  const searchLastData = () => {
    if (session?.user?.email) {
      setCountAllRecordsFromMonthsAgoByCategory(
        Array.from({ length: 12 }, (_, i) => ({
          monthsAgo: i,
          deposit: 0,
          withdraw: 0,
        }))
      );

      const isFirstRender =
        allRecordsFromMonthsAgoByCategory.deposits.length === 0 &&
        allRecordsFromMonthsAgoByCategory.withdraws.length === 0;

      const prevArray = {
        deposits: [] as RecordType[],
        withdraws: [] as RecordType[],
      };

      Array.from({ length: 12 }, (_, i) => {
        setTimeout(() => {
          let skip = 0;

          const interval = setIntervalAsync(async () => {
            const result = await refetchGetAllRecordsFromMonthsAgo({
              email: session?.user?.email,
              dateGTE: getISODateOfMonthsAgo(i),
              dateLTE: getISODateOfMonthsAgo(i, true),
              skip: skip,
            });

            result.data.recordsConnection.edges.forEach((v) => {
              if (v.node.category === "withdraw") {
                if (isFirstRender) {
                  setAllRecordsFromMonthsAgoByCategory((prev) => ({
                    deposits: [...prev.deposits],
                    withdraws: [...prev.withdraws, v.node as RecordType],
                  }));
                } else {
                  prevArray.withdraws.push(v.node as RecordType);
                }
              }
              if (v.node.category === "deposit") {
                if (isFirstRender) {
                  setAllRecordsFromMonthsAgoByCategory((prev) => ({
                    withdraws: [...prev.withdraws],
                    deposits: [...prev.deposits, v.node as RecordType],
                  }));
                } else {
                  prevArray.deposits.push(v.node as RecordType);
                }
              }
            });

            if (i === 11 && !isFirstRender) {
              setAllRecordsFromMonthsAgoByCategory(prevArray);
            }

            skip += 10;

            if (!result?.data?.recordsConnection?.pageInfo?.hasNextPage) {
              clearIntervalAsync(interval);
            }
          }, 500);
        }, 1000 + i * 1000);
      });
    }
  };

  useEffect(() => {
    searchLastData();
  }, [session?.user?.email]);

  useEffect(() => {
    refetchGetAllRecordsInFuture({
      email: session?.user?.email,
      dateGTE: new Date().toISOString(),
      skip: 0,
    });
  }, [session?.user?.email]);

  useEffect(() => {
    setAllRecordsFromMonthsAgoByMonth(
      Array.from({ length: 12 }, (_, i) => ({
        monthAgo: i,
        values: { deposits: [] as RecordType[], withdraws: [] as RecordType[] },
      }))
    );

    if (allRecordsFromMonthsAgoByCategory.deposits.length > 0) {
      allRecordsFromMonthsAgoByCategory.deposits.forEach((v, i) => {
        const distanceInMonths = +formatDistanceStrict(
          new Date(),
          new Date(v.date),
          {
            unit: "month",
            addSuffix: false,
          }
        ).split(" ")[0];

        setAllRecordsFromMonthsAgoByMonth((prev) => {
          const newArray = [...prev];

          if (distanceInMonths > 0) {
            newArray[distanceInMonths] = {
              ...newArray[distanceInMonths],
              values: {
                deposits: [...newArray[distanceInMonths].values.deposits, v],
                withdraws: [...newArray[distanceInMonths].values.withdraws],
              },
            };

            return newArray;
          }
          if (differenceInMinutes(new Date(), new Date(v.date)) >= 0) {
            newArray[distanceInMonths] = {
              ...newArray[distanceInMonths],
              values: {
                deposits: [...newArray[distanceInMonths].values.deposits, v],
                withdraws: [...newArray[distanceInMonths].values.withdraws],
              },
            };
          }
          return newArray;
        });
      });
    }
    if (allRecordsFromMonthsAgoByCategory.withdraws.length > 0) {
      allRecordsFromMonthsAgoByCategory.withdraws.forEach((v, i) => {
        const distanceInMonths = +formatDistanceStrict(
          new Date(),
          new Date(v.date),
          {
            unit: "month",
            addSuffix: false,
          }
        ).split(" ")[0];

        setAllRecordsFromMonthsAgoByMonth((prev) => {
          const newArray = [...prev];

          if (distanceInMonths > 0) {
            newArray[distanceInMonths] = {
              ...newArray[distanceInMonths],
              values: {
                deposits: [...newArray[distanceInMonths].values.deposits],
                withdraws: [...newArray[distanceInMonths].values.withdraws, v],
              },
            };
            return newArray;
          }

          if (differenceInMinutes(new Date(), new Date(v.date)) >= 0) {
            newArray[distanceInMonths] = {
              ...newArray[distanceInMonths],
              values: {
                deposits: [...newArray[distanceInMonths].values.deposits],
                withdraws: [...newArray[distanceInMonths].values.withdraws, v],
              },
            };
          }
          return newArray;
        });
      });
    }
  }, [allRecordsFromMonthsAgoByCategory]);

  const createRecord = async ({
    title,
    category,
    amount,
    description,
    installments,
    date,
  }: {
    title: string;
    category: string;
    amount: number;
    description?: string;
    installments: number;
    date: string;
  }) => {
    Array.from({ length: installments }).map((_, i) => {
      setTimeout(async () => {
        await createRecordMutateFunction({
          variables: {
            email: session?.user?.email,
            title,
            category,
            installment: installments > 1 ? i + 1 : 0,
            amount: +(amount / installments).toFixed(2),
            description,
            date: new Date(
              new Date(date).setMonth(new Date(date).getMonth() + i)
            ).toISOString(),
          },
        }).then(async (response) => {
          await publishRegisterMutateFunction({
            variables: {
              id: response.data?.createRecord.id,
            },
          }).then(() => {
            if (
              differenceInMinutes(
                new Date(),
                new Date(new Date(date).setMonth(new Date(date).getMonth() + i))
              ) >= 0
            ) {
              if (category === "deposit") {
                setAllRecordsFromMonthsAgoByCategory((prev) => ({
                  withdraws: [...prev.withdraws],
                  deposits: [
                    ...prev.deposits,
                    response.data?.createRecord as RecordType,
                  ],
                }));
              }

              if (category === "withdraw") {
                setAllRecordsFromMonthsAgoByCategory((prev) => ({
                  withdraws: [
                    ...prev.withdraws,
                    response.data?.createRecord as RecordType,
                  ],
                  deposits: [...prev.deposits],
                }));
              }
            } else {
              setAllRecordsInFuture((prev) =>
                [...prev, response.data?.createRecord as RecordType]
                  .sort(
                    (a, b) =>
                      new Date(a.date).getTime() - new Date(b.date).getTime()
                  )
                  .slice(0, 10)
              );
            }
          });
        });
      }, 1000 * (i + 1));
    });
  };

  const updateRecord = async ({
    id,
    title,
    category,
    amount,
    description,
    date,
  }: {
    id: string;
    title?: string;
    category?: string;
    amount?: number;
    description?: string;
    date?: string;
  }) => {
    await updateRegisterMutateFunction({
      variables: {
        id,
        data: { title, category, amount, description, date },
      },
    }).then(async (response) => {
      await publishRegisterMutateFunction({
        variables: {
          id: response.data?.updateRecord.id,
        },
      }).then(() => {
        setAllRecordsFromMonthsAgoByCategory((prev) => ({
          withdraws: [...prev.withdraws].filter((v) => v.id !== id),
          deposits: [...prev.deposits].filter((v) => v.id !== id),
        }));

        setAllRecordsInFuture((prev) => [...prev].filter((v) => v.id !== id));

        if (
          differenceInMinutes(
            new Date(),
            new Date(response.data?.updateRecord.date || "")
          ) >= 0
        ) {
          if (response.data?.updateRecord.category === "deposit") {
            setAllRecordsFromMonthsAgoByCategory((prev) => ({
              withdraws: [...prev.withdraws],
              deposits: [
                ...prev.deposits,
                response.data?.updateRecord as RecordType,
              ],
            }));
          }

          if (response.data?.updateRecord.category === "withdraw") {
            setAllRecordsFromMonthsAgoByCategory((prev) => ({
              withdraws: [
                ...prev.withdraws,
                response.data?.updateRecord as RecordType,
              ],
              deposits: [...prev.deposits],
            }));
          }
        } else {
          setAllRecordsInFuture((prev) =>
            [...prev, response.data?.updateRecord as RecordType]
              .sort(
                (a, b) =>
                  new Date(a.date).getTime() - new Date(b.date).getTime()
              )
              .slice(0, 10)
          );
        }
      });
    });
  };

  return (
    <RecordContext.Provider
      value={{
        countAllRecordsFromMonthsAgoByCategory,
        countAllQuantitiesAndAmountOf30DaysAgoByTitle,
        allRecordsFromMonthsAgoByMonth,
        allRecordsFrom30DaysAgo,
        allRecordsInFuture,
        createRecord,
        updateRecord,
      }}
    >
      {children}
    </RecordContext.Provider>
  );
}
