import { deleteRecordMutationResponse } from "@/db/deleteRecord";
import {
  ApolloCache,
  DefaultContext,
  MutationFunctionOptions,
  OperationVariables,
} from "@apollo/client";

interface deleteRecordProps {
  id: string;
  date: string;

  deleteRegisterMutateFunction: (
    options?:
      | MutationFunctionOptions<
          deleteRecordMutationResponse,
          OperationVariables,
          DefaultContext,
          ApolloCache<any>
        >
      | undefined
  ) => Promise<any>;
}

export const deleteRecord = async ({
  id,
  date,
  deleteRegisterMutateFunction,
}: deleteRecordProps) => {
  const registerRemoved = await deleteRegisterMutateFunction({
    variables: {
      id,
    },
  }).then(() => ({ id, date }));

  return registerRemoved;
};
