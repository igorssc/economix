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
import { arrangeRecordsFromMonths } from "@/utils/arrangeRecordsFromMonths";
import { countAllQuantitiesAndAmountRecordsOf30DaysAgoByTitle } from "@/utils/countAllQuantitiesAndAmountOf30DaysAgoByTitle";
import { createRecord } from "@/utils/createRecord";
import { deleteRecord } from "@/utils/deleteRecord";
import { filterRecordsBasedOnPeriod } from "@/utils/filterRecordsBasedOnPeriod";
import { getLastRecords } from "@/utils/getLastRecords";
import { getSessionCache, updateSessionCache } from "@/utils/sessionCache";
import { updateRecord } from "@/utils/updateRecord";
import { useMutation, useQuery } from "@apollo/client";
import { differenceInMinutes } from "date-fns";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { ReactNode, createContext, useEffect, useState } from "react";

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

export type countAllQuantitiesAndAmountOf30DaysAgoByTitleType = {
  title: string;
  quantity: number;
  category: string;
  totalAmount: number;
}[];

export type allRecordsFromMonthsAgoByCategoryType = {
  revenues: RecordType[];
  expenditures: RecordType[];
};

export type allRecordsFromMonthsAgoByMonthType = {
  monthAgo: number;
  values: {
    revenues: RecordType[];
    expenditures: RecordType[];
  };
};

type createType = {
  title: string;
  category: string;
  amount: number;
  description?: string;
  installments: number;
  date: string;
};

type updateType = {
  id: string;
  title?: string | undefined;
  category?: string | undefined;
  amount?: number | undefined;
  description?: string | undefined;
  date?: string | undefined;
};

type removeType = {
  id: string;
  date: string;
};

type RecordData = {
  allRecordsFrom30DaysAgo: RecordType[];

  allRecordsInFuture: RecordType[];

  countAllQuantitiesAndAmountOf30DaysAgoByTitle: countAllQuantitiesAndAmountOf30DaysAgoByTitleType;

  allRecordsFromMonthsAgoByMonth: allRecordsFromMonthsAgoByMonthType[];

  allRecordsFromMonthsAgoByCategory: allRecordsFromMonthsAgoByCategoryType;

  createRecord: ({
    title,
    category,
    amount,
    description,
    installments,
    date,
  }: createType) => Promise<void>;

  updateRecord: ({
    id,
    title,
    category,
    amount,
    description,
    date,
  }: updateType) => Promise<void>;

  deleteRecord: ({ id, date }: removeType) => Promise<void>;
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
    countAllQuantitiesAndAmountOf30DaysAgoByTitle,
    setCountAllQuantitiesAndAmountOf30DaysAgoByTitle,
  ] = useState<countAllQuantitiesAndAmountOf30DaysAgoByTitleType>([]);

  const [
    allRecordsFromMonthsAgoByCategory,
    setAllRecordsFromMonthsAgoByCategory,
  ] = useState<allRecordsFromMonthsAgoByCategoryType>({
    revenues: [],
    expenditures: [],
  });

  const [allRecordsFrom30DaysAgo, setAllRecordsFrom30DaysAgo] = useState<
    RecordType[]
  >([] as RecordType[]);

  const [allRecordsInFuture, setAllRecordsInFuture] = useState<RecordType[]>(
    []
  );

  const [allRecordsFromMonthsAgoByMonth, setAllRecordsFromMonthsAgoByMonth] =
    useState<allRecordsFromMonthsAgoByMonthType[]>(
      Array.from({ length: 12 }, (_, i) => ({
        monthAgo: i,
        values: {
          revenues: [],
          expenditures: [],
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
    const recordsCurrentMonth = allRecordsFromMonthsAgoByMonth.find(
      (v) => v.monthAgo === 0
    )?.values;

    const recordsLastMonth = allRecordsFromMonthsAgoByMonth.find(
      (v) => v.monthAgo === 1
    )?.values;

    const records = [] as RecordType[];

    if (recordsCurrentMonth) {
      records.push(
        ...recordsCurrentMonth?.expenditures,
        ...recordsCurrentMonth?.revenues
      );
    }

    if (recordsLastMonth) {
      records.push(
        ...recordsLastMonth?.expenditures,
        ...recordsLastMonth?.revenues
      );
    }

    if (records.length > 0) {
      const recordsFiltered = filterRecordsBasedOnPeriod({
        records,
        period: 30,
        unit: "day",
      });

      setAllRecordsFrom30DaysAgo(recordsFiltered);
    }
  }, [allRecordsFromMonthsAgoByMonth]);

  useEffect(() => {
    setCountAllQuantitiesAndAmountOf30DaysAgoByTitle(
      countAllQuantitiesAndAmountRecordsOf30DaysAgoByTitle(
        allRecordsFrom30DaysAgo
      )
    );
  }, [allRecordsFrom30DaysAgo]);

  useEffect(() => {
    if (session?.user?.email) {
      const fetchData = async (isRealTime = false) => {
        const result = await getLastRecords({
          session,
          refetchGetAllRecordsFromMonthsAgo,
          isRealTime,
          setRecords: setAllRecordsFromMonthsAgoByCategory,
        });

        updateSessionCache({ session, data: result });

        setAllRecordsFromMonthsAgoByCategory(result);
      };

      const dataCached = getSessionCache(session);

      if (dataCached) {
        setAllRecordsFromMonthsAgoByCategory(dataCached);
        fetchData();
      } else {
        fetchData(true);
      }
    }

    refetchGetAllRecordsInFuture({
      email: session?.user?.email,
      dateGTE: new Date().toISOString(),
      skip: 0,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      const records = arrangeRecordsFromMonths(
        allRecordsFromMonthsAgoByCategory.revenues
      );

      setAllRecordsFromMonthsAgoByMonth((prev) =>
        prev.map((_, i) => ({
          monthAgo: i,
          values: {
            revenues: records[i],
            expenditures: prev[i].values.expenditures,
          },
        }))
      );
    }

    if (allRecordsFromMonthsAgoByCategory.expenditures.length > 0) {
      const records = arrangeRecordsFromMonths(
        allRecordsFromMonthsAgoByCategory.expenditures
      );

      setAllRecordsFromMonthsAgoByMonth((prev) =>
        prev.map((v, i) => ({
          monthAgo: i,
          values: {
            revenues: prev[i].values.revenues,
            expenditures: records[i],
          },
        }))
      );
    }
  }, [allRecordsFromMonthsAgoByCategory]);

  async function create({
    title,
    category,
    amount,
    installments,
    description,
    date,
  }: createType) {
    Array.from({ length: installments }).map((_, i) => {
      setTimeout(async () => {
        const recordCreated = await createRecord({
          data: {
            email: session?.user?.email || "",
            title,
            category,
            amount: +(amount / installments).toFixed(2),
            installments: installments > 1 ? i + 1 : 0,
            description,
            date: new Date(
              new Date(date).setMonth(new Date(date).getMonth() + i)
            ).toISOString(),
          },
          createRecordMutateFunction,
          publishRegisterMutateFunction,
        });

        if (
          differenceInMinutes(
            new Date(),
            new Date(
              new Date(recordCreated.date).setMonth(
                new Date(recordCreated.date).getMonth() + i
              )
            )
          ) >= 0
        ) {
          if (recordCreated.category === "revenue") {
            setAllRecordsFromMonthsAgoByCategory((prev) => ({
              expenditures: [...prev.expenditures],
              revenues: [...prev.revenues, recordCreated],
            }));

            updateSessionCache({
              session: session as Session,
              data: {
                expenditures: [
                  ...allRecordsFromMonthsAgoByCategory.expenditures,
                ],
                revenues: [
                  ...allRecordsFromMonthsAgoByCategory.revenues,
                  recordCreated,
                ],
              },
            });
          }

          if (recordCreated.category === "expenditure") {
            setAllRecordsFromMonthsAgoByCategory((prev) => ({
              expenditures: [...prev.expenditures, recordCreated],
              revenues: [...prev.revenues],
            }));

            updateSessionCache({
              session: session as Session,
              data: {
                expenditures: [
                  ...allRecordsFromMonthsAgoByCategory.expenditures,
                  recordCreated,
                ],
                revenues: [...allRecordsFromMonthsAgoByCategory.revenues],
              },
            });
          }
        } else {
          setAllRecordsInFuture((prev) =>
            [...prev, recordCreated]
              .sort(
                (a, b) =>
                  new Date(a.date).getTime() - new Date(b.date).getTime()
              )
              .slice(0, 10)
          );
        }
      }, 1000 * (i + 1));
    });
  }

  async function update(data: updateType) {
    const registerUpdated = await updateRecord({
      data,
      updateRegisterMutateFunction,
      publishRegisterMutateFunction,
    });

    setAllRecordsFromMonthsAgoByCategory((prev) => ({
      expenditures: [...prev.expenditures].filter((v) => v.id !== data.id),
      revenues: [...prev.revenues].filter((v) => v.id !== data.id),
    }));

    setAllRecordsInFuture((prev) => [...prev].filter((v) => v.id !== data.id));

    if (
      differenceInMinutes(new Date(), new Date(registerUpdated.date || "")) >= 0
    ) {
      if (registerUpdated.category === "revenue") {
        setAllRecordsFromMonthsAgoByCategory((prev) => ({
          expenditures: [...prev.expenditures],
          revenues: [...prev.revenues, registerUpdated as RecordType],
        }));

        updateSessionCache({
          session: session as Session,
          data: {
            expenditures: [...allRecordsFromMonthsAgoByCategory.expenditures],
            revenues: [
              ...allRecordsFromMonthsAgoByCategory.revenues,
              registerUpdated,
            ],
          },
        });
      }

      if (registerUpdated.category === "expenditure") {
        setAllRecordsFromMonthsAgoByCategory((prev) => ({
          expenditures: [...prev.expenditures, registerUpdated as RecordType],
          revenues: [...prev.revenues],
        }));
        updateSessionCache({
          session: session as Session,
          data: {
            expenditures: [
              ...allRecordsFromMonthsAgoByCategory.expenditures,
              registerUpdated,
            ],
            revenues: [...allRecordsFromMonthsAgoByCategory.revenues],
          },
        });
      }
    } else {
      setAllRecordsInFuture((prev) =>
        [...prev, registerUpdated as RecordType]
          .sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
          )
          .slice(0, 10)
      );
    }
  }

  async function remove({ id, date }: removeType) {
    const registerRemoved = await deleteRecord({
      date,
      deleteRegisterMutateFunction,
      id,
    });

    if (differenceInMinutes(new Date(), new Date(registerRemoved.date)) >= 0) {
      setAllRecordsFromMonthsAgoByCategory((prev) => ({
        expenditures: [...prev.expenditures].filter(
          (v) => v.id !== registerRemoved.id
        ),
        revenues: [...prev.revenues].filter((v) => v.id !== registerRemoved.id),
      }));
      updateSessionCache({
        session: session as Session,
        data: {
          expenditures: [
            ...allRecordsFromMonthsAgoByCategory.expenditures,
          ].filter((v) => v.id !== registerRemoved.id),
          revenues: [...allRecordsFromMonthsAgoByCategory.revenues].filter(
            (v) => v.id !== registerRemoved.id
          ),
        },
      });
    } else {
      setAllRecordsInFuture((prev) =>
        [...prev].filter((v) => v.id !== registerRemoved.id)
      );
      refetchGetAllRecordsInFuture({
        email: session?.user?.email,
        dateGTE: new Date().toISOString(),
        skip: 0,
      });
    }
  }

  return (
    <RecordContext.Provider
      value={{
        countAllQuantitiesAndAmountOf30DaysAgoByTitle,
        allRecordsFromMonthsAgoByMonth,
        allRecordsFromMonthsAgoByCategory,
        allRecordsFrom30DaysAgo,
        allRecordsInFuture,
        createRecord: create,
        updateRecord: update,
        deleteRecord: remove,
      }}
    >
      {children}
    </RecordContext.Provider>
  );
}
