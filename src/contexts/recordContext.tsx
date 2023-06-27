"use client";
import { CREATE_RECORD, createRecordMutationResponse } from "@/db/createRecord";
import { DELETE_RECORD, deleteRecordMutationResponse } from "@/db/deleteRecord";
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
    revenue: number;
    expenditure: number;
  }[];

  allRecordsFrom30DaysAgo: RecordType[];

  allRecordsInFuture: RecordType[];

  countAllQuantitiesAndAmountOf30DaysAgoByTitle: {
    title: string;
    quantity: number;
    category: string;
    totalAmount: number;
  }[];

  allRecordsFromMonthsAgoByMonth: {
    monthAgo: number;
    values: {
      revenues: RecordType[];
      expenditures: RecordType[];
    };
  }[];

  allRecordsFromMonthsAgoByCategory: {
    revenues: RecordType[];
    expenditures: RecordType[];
  };

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

  deleteRecord: ({ id, date }: { id: string; date: string }) => Promise<void>;
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

  const [deleteRegisterMutateFunction] =
    useMutation<deleteRecordMutationResponse>(DELETE_RECORD);

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
      revenue: 0,
      expenditure: 0,
    }))
  );

  const [
    countAllQuantitiesAndAmountOf30DaysAgoByTitle,
    setCountAllQuantitiesAndAmountOf30DaysAgoByTitle,
  ] = useState(
    [] as {
      title: string;
      quantity: number;
      category: string;
      totalAmount: number;
    }[]
  );

  const [
    allRecordsFromMonthsAgoByCategory,
    setAllRecordsFromMonthsAgoByCategory,
  ] = useState({
    revenues: [] as RecordType[],
    expenditures: [] as RecordType[],
  });

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
        values: {
          revenues: [] as RecordType[],
          expenditures: [] as RecordType[],
        },
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
      ?.values.expenditures.forEach((v) => {
        setAllRecordsFrom30DaysAgo((prev) => [...prev, v]);
      });

    allRecordsFromMonthsAgoByMonth
      .find((v) => v.monthAgo === 1)
      ?.values.expenditures.forEach((v) => {
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
      ?.values.revenues.forEach((v) => {
        setAllRecordsFrom30DaysAgo((prev) => [...prev, v]);
      });

    allRecordsFromMonthsAgoByMonth
      .find((v) => v.monthAgo === 1)
      ?.values.revenues.forEach((v) => {
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
      category: string;
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

      if (valueIndex > -1 && prevArray[valueIndex].category === v.category) {
        prevArray[valueIndex] = {
          title: v.title,
          quantity: prevArray[valueIndex].quantity + 1,
          totalAmount: prevArray[valueIndex].totalAmount + v.amount,
          category: prevArray[valueIndex].category,
        };
      } else {
        prevArray.push({
          title: v.title,
          quantity: 1,
          totalAmount: v.amount,
          category: v.category,
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
          revenue: 0,
          expenditure: 0,
        }))
      );

      const isFirstRender =
        allRecordsFromMonthsAgoByCategory.revenues.length === 0 &&
        allRecordsFromMonthsAgoByCategory.expenditures.length === 0;

      const prevArray = {
        revenues: [] as RecordType[],
        expenditures: [] as RecordType[],
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
              if (v.node.category === "expenditure") {
                if (isFirstRender) {
                  setAllRecordsFromMonthsAgoByCategory((prev) => ({
                    revenues: [...prev.revenues],
                    expenditures: [...prev.expenditures, v.node as RecordType],
                  }));
                } else {
                  prevArray.expenditures.push(v.node as RecordType);
                }
              }
              if (v.node.category === "revenue") {
                if (isFirstRender) {
                  setAllRecordsFromMonthsAgoByCategory((prev) => ({
                    expenditures: [...prev.expenditures],
                    revenues: [...prev.revenues, v.node as RecordType],
                  }));
                } else {
                  prevArray.revenues.push(v.node as RecordType);
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
        values: {
          revenues: [] as RecordType[],
          expenditures: [] as RecordType[],
        },
      }))
    );

    if (allRecordsFromMonthsAgoByCategory.revenues.length > 0) {
      allRecordsFromMonthsAgoByCategory.revenues.forEach((v, i) => {
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
                revenues: [...newArray[distanceInMonths].values.revenues, v],
                expenditures: [
                  ...newArray[distanceInMonths].values.expenditures,
                ],
              },
            };

            return newArray;
          }
          if (differenceInMinutes(new Date(), new Date(v.date)) >= 0) {
            newArray[distanceInMonths] = {
              ...newArray[distanceInMonths],
              values: {
                revenues: [...newArray[distanceInMonths].values.revenues, v],
                expenditures: [
                  ...newArray[distanceInMonths].values.expenditures,
                ],
              },
            };
          }
          return newArray;
        });
      });
    }
    if (allRecordsFromMonthsAgoByCategory.expenditures.length > 0) {
      allRecordsFromMonthsAgoByCategory.expenditures.forEach((v, i) => {
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
                revenues: [...newArray[distanceInMonths].values.revenues],
                expenditures: [
                  ...newArray[distanceInMonths].values.expenditures,
                  v,
                ],
              },
            };
            return newArray;
          }

          if (differenceInMinutes(new Date(), new Date(v.date)) >= 0) {
            newArray[distanceInMonths] = {
              ...newArray[distanceInMonths],
              values: {
                revenues: [...newArray[distanceInMonths].values.revenues],
                expenditures: [
                  ...newArray[distanceInMonths].values.expenditures,
                  v,
                ],
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
              if (category === "revenue") {
                setAllRecordsFromMonthsAgoByCategory((prev) => ({
                  expenditures: [...prev.expenditures],
                  revenues: [
                    ...prev.revenues,
                    response.data?.createRecord as RecordType,
                  ],
                }));
              }

              if (category === "expenditure") {
                setAllRecordsFromMonthsAgoByCategory((prev) => ({
                  expenditures: [
                    ...prev.expenditures,
                    response.data?.createRecord as RecordType,
                  ],
                  revenues: [...prev.revenues],
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
          expenditures: [...prev.expenditures].filter((v) => v.id !== id),
          revenues: [...prev.revenues].filter((v) => v.id !== id),
        }));

        setAllRecordsInFuture((prev) => [...prev].filter((v) => v.id !== id));

        if (
          differenceInMinutes(
            new Date(),
            new Date(response.data?.updateRecord.date || "")
          ) >= 0
        ) {
          if (response.data?.updateRecord.category === "revenue") {
            setAllRecordsFromMonthsAgoByCategory((prev) => ({
              expenditures: [...prev.expenditures],
              revenues: [
                ...prev.revenues,
                response.data?.updateRecord as RecordType,
              ],
            }));
          }

          if (response.data?.updateRecord.category === "expenditure") {
            setAllRecordsFromMonthsAgoByCategory((prev) => ({
              expenditures: [
                ...prev.expenditures,
                response.data?.updateRecord as RecordType,
              ],
              revenues: [...prev.revenues],
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

  const deleteRecord = async ({ id, date }: { id: string; date: string }) => {
    await deleteRegisterMutateFunction({
      variables: {
        id,
      },
    }).then(() => {
      if (differenceInMinutes(new Date(), new Date(date)) >= 0) {
        setAllRecordsFromMonthsAgoByCategory((prev) => ({
          expenditures: [...prev.expenditures].filter((v) => v.id !== id),
          revenues: [...prev.revenues].filter((v) => v.id !== id),
        }));
      } else {
        setAllRecordsInFuture((prev) => [...prev].filter((v) => v.id !== id));
        refetchGetAllRecordsInFuture({
          email: session?.user?.email,
          dateGTE: new Date().toISOString(),
          skip: 0,
        });
      }
    });
  };

  return (
    <RecordContext.Provider
      value={{
        countAllRecordsFromMonthsAgoByCategory,
        countAllQuantitiesAndAmountOf30DaysAgoByTitle,
        allRecordsFromMonthsAgoByMonth,
        allRecordsFromMonthsAgoByCategory,
        allRecordsFrom30DaysAgo,
        allRecordsInFuture,
        createRecord,
        updateRecord,
        deleteRecord,
      }}
    >
      {children}
    </RecordContext.Provider>
  );
}
