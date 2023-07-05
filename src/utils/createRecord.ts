import { RecordType } from "@/contexts/recordContext";
import { createRecordMutationResponse } from "@/db/createRecord";
import { publishRecordMutationResponse } from "@/db/publishRecord";
import {
  ApolloCache,
  DefaultContext,
  MutationFunctionOptions,
  OperationVariables,
} from "@apollo/client";

type DataProps = {
  email: string;
  title: string;
  category: string;
  amount: number;
  description?: string;
  installments: number;
  date: string;
};

interface createRecordProps {
  data: DataProps;

  createRecordMutateFunction: (
    options?:
      | MutationFunctionOptions<
          createRecordMutationResponse,
          OperationVariables,
          DefaultContext,
          ApolloCache<any>
        >
      | undefined
  ) => Promise<any>;

  publishRegisterMutateFunction: (
    options?:
      | MutationFunctionOptions<
          publishRecordMutationResponse,
          OperationVariables,
          DefaultContext,
          ApolloCache<any>
        >
      | undefined
  ) => Promise<any>;
}

export const createRecord = async ({
  data,
  createRecordMutateFunction,
  publishRegisterMutateFunction,
}: createRecordProps) => {
  const recordCreated = await createRecordMutateFunction({
    variables: {
      email: data.email,
      title: data.title,
      category: data.category,
      installment: data.installments,
      amount: data.amount,
      description: data.description,
      date: data.description,
    },
  }).then((response) => response.data?.createRecord as RecordType);

  const recordPublished = await publishRegisterMutateFunction({
    variables: {
      id: recordCreated.id,
    },
  }).then(() => recordCreated);

  return recordPublished;
};
