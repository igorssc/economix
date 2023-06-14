"use client";
import { CREATE_RECORD, createRecordMutationResponse } from "@/db/createRecord";
import {
  GET_ALL_AGGREGATIONS_BETWEEN_DATES_BY_CATEGORY,
  getAllAggregationsBetweenDatesByCategoryQueryResponse,
} from "@/db/getAllAggregationsBetweenDatesByCategory";
import {
  PUBLISH_RECORD,
  publishRecordMutationResponse,
} from "@/db/publishRecord";
import { getISODateOfMonthsAgo } from "@/utils/getISODateOfMonthsAgo";
import { useMutation, useQuery } from "@apollo/client";
import { formatDistanceStrict } from "date-fns";
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
  description?: string;
  date: string;
};

type RecordData = {
  countAllRecordsFromMonthsAgoByCategory: {
    monthsAgo: number;
    deposit: number;
    withdraw: number;
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
    date,
  }: {
    title: string;
    category: string;
    amount: number;
    description?: string;
    date: string;
  }) => Promise<void>;
};

export const RecordContext = createContext({} as RecordData);

export function RecordProvider({ children }: RecordProviderProps) {
  const { data: session } = useSession();

  const [createRecordMutateFunction] =
    useMutation<createRecordMutationResponse>(CREATE_RECORD);

  const [publishRegisterMutateFunction] =
    useMutation<publishRecordMutationResponse>(PUBLISH_RECORD);

  const { refetch: refetchGetAllRecordsFromMonthsAgoByCategory } =
    useQuery<getAllAggregationsBetweenDatesByCategoryQueryResponse>(
      GET_ALL_AGGREGATIONS_BETWEEN_DATES_BY_CATEGORY
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
    allRecordsFromMonthsAgoByCategory,
    setAllRecordsFromMonthsAgoByCategory,
  ] = useState({ deposits: [] as RecordType[], withdraws: [] as RecordType[] });

  const [allRecordsFromMonthsAgoByMonth, setAllRecordsFromMonthsAgoByMonth] =
    useState(
      Array.from({ length: 12 }, (_, i) => ({
        monthAgo: i,
        values: { deposits: [] as RecordType[], withdraws: [] as RecordType[] },
      }))
    );

  useEffect(() => {
    if (session?.user?.email) {
      setCountAllRecordsFromMonthsAgoByCategory(
        Array.from({ length: 12 }, (_, i) => ({
          monthsAgo: i,
          deposit: 0,
          withdraw: 0,
        }))
      );

      setAllRecordsFromMonthsAgoByCategory({
        deposits: [] as RecordType[],
        withdraws: [] as RecordType[],
      });

      Array.from({ length: 12 }, (_, i) => {
        let skipD = 0;

        const intervalD = setIntervalAsync(async () => {
          const result = await refetchGetAllRecordsFromMonthsAgoByCategory({
            email: session?.user?.email,
            category: "deposit",
            dateGTE: getISODateOfMonthsAgo(i),
            dateLTE: getISODateOfMonthsAgo(i, true),
            skip: skipD,
          });

          setAllRecordsFromMonthsAgoByCategory((prev) => ({
            withdraws: [...prev.withdraws],
            deposits: [
              ...prev.deposits,
              ...result.data.recordsConnection.edges.map(
                (v) => v.node as RecordType
              ),
            ],
          }));

          skipD += 10;

          if (!result.data.recordsConnection.pageInfo.hasNextPage) {
            clearIntervalAsync(intervalD);
          }
        }, 400);

        let skipW = 0;

        const intervalW = setIntervalAsync(async () => {
          const result = await refetchGetAllRecordsFromMonthsAgoByCategory({
            email: session?.user?.email,
            category: "withdraw",
            dateGTE: getISODateOfMonthsAgo(i),
            dateLTE: getISODateOfMonthsAgo(i, true),
            skip: skipW,
          });

          setAllRecordsFromMonthsAgoByCategory((prev) => ({
            deposits: [...prev.deposits],
            withdraws: [
              ...prev.withdraws,
              ...result.data.recordsConnection.edges.map(
                (v) => v.node as RecordType
              ),
            ],
          }));

          skipW += 10;

          if (!result.data.recordsConnection.pageInfo.hasNextPage) {
            clearIntervalAsync(intervalW);
          }
        }, 400);
      });
    }
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
        const distance = +formatDistanceStrict(new Date(), new Date(v.date), {
          unit: "month",
          addSuffix: false,
        }).split(" ")[0];

        setAllRecordsFromMonthsAgoByMonth((prev) => {
          const newArray = [...prev];

          newArray[distance] = {
            ...newArray[distance],
            values: {
              deposits: [...newArray[distance].values.deposits, v],
              withdraws: [...newArray[distance].values.withdraws],
            },
          };

          return newArray;
        });
      });
    }
    if (allRecordsFromMonthsAgoByCategory.withdraws.length > 0) {
      allRecordsFromMonthsAgoByCategory.withdraws.forEach((v, i) => {
        const distance = +formatDistanceStrict(new Date(), new Date(v.date), {
          unit: "month",
          addSuffix: false,
        }).split(" ")[0];

        setAllRecordsFromMonthsAgoByMonth((prev) => {
          const newArray = [...prev];

          newArray[distance] = {
            ...newArray[distance],
            values: {
              deposits: [...newArray[distance].values.deposits],
              withdraws: [...newArray[distance].values.withdraws, v],
            },
          };

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
    date,
  }: {
    title: string;
    category: string;
    amount: number;
    description?: string;
    date: string;
  }) => {
    try {
      await createRecordMutateFunction({
        variables: {
          email: session?.user?.email,
          title,
          category,
          amount,
          description,
          date,
        },
      }).then(async ({ data }) => {
        await publishRegisterMutateFunction({
          variables: {
            id: (data as createRecordMutationResponse).createRecord.id,
          },
        }).then(() => {
          // refetchGetRecords();
        });
      });
    } catch {}
  };

  return (
    <RecordContext.Provider
      value={{
        countAllRecordsFromMonthsAgoByCategory,
        allRecordsFromMonthsAgoByMonth,
        createRecord,
      }}
    >
      {children}
    </RecordContext.Provider>
  );
}
