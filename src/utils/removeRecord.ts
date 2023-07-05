import { removeRecordMutationResponse } from "@/db/removeRecord";
import {
  ApolloCache,
  DefaultContext,
  MutationFunctionOptions,
  OperationVariables,
} from "@apollo/client";

interface removeRecordProps {
  id: string;
  date: string;

  removeRegisterMutateFunction: (
    options?:
      | MutationFunctionOptions<
          removeRecordMutationResponse,
          OperationVariables,
          DefaultContext,
          ApolloCache<any>
        >
      | undefined
  ) => Promise<any>;
}

export const removeRecord = async ({
  id,
  date,
  removeRegisterMutateFunction,
}: removeRecordProps) => {
  const registerRemoved = await removeRegisterMutateFunction({
    variables: {
      id,
    },
  }).then(() => ({ id, date }));

  return registerRemoved;
};
