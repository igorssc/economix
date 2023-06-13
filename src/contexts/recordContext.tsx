"use client";
import { CREATE_RECORD, createRecordMutationResponse } from "@/db/createRecord";
import {
  GET_ALL_RECORDS,
  getAllRecordsQueryResponse,
} from "@/db/getAllRecords";
import {
  PUBLISH_RECORD,
  publishRecordMutationResponse,
} from "@/db/publishRecord";
import { useMutation, useQuery } from "@apollo/client";
import { useSession } from "next-auth/react";
import { ReactNode, createContext } from "react";

interface RecordProviderProps {
  children: ReactNode;
}

type RecordData = {
  records: getAllRecordsQueryResponse | undefined;
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

  const { data: dataGetRecords, refetch: refetchGetRecords } =
    useQuery<getAllRecordsQueryResponse>(GET_ALL_RECORDS);

  const [createRecordMutateFunction] =
    useMutation<createRecordMutationResponse>(CREATE_RECORD);

  const [publishRegisterMutateFunction] =
    useMutation<publishRecordMutationResponse>(PUBLISH_RECORD);

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
          refetchGetRecords();
        });
      });
    } catch {}
  };

  return (
    <RecordContext.Provider value={{ records: dataGetRecords, createRecord }}>
      {children}
    </RecordContext.Provider>
  );
}
