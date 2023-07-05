import { publishRecordMutationResponse } from "@/db/publishRecord";
import { updateRecordMutationResponse } from "@/db/updateRecord";
import {
  ApolloCache,
  DefaultContext,
  MutationFunctionOptions,
  OperationVariables,
} from "@apollo/client";
import { removeEmptyProperties } from "./removeEmptyPropertiesremoveEmptyProperties";

type DataType = {
  id: string;
  title?: string | undefined;
  category?: string | undefined;
  amount?: number | undefined;
  description?: string | undefined;
  date?: string | undefined;
};

interface updateRecordProps {
  data: DataType;

  updateRegisterMutateFunction: (
    options?:
      | MutationFunctionOptions<
          updateRecordMutationResponse,
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

export const updateRecord = async ({
  data,
  updateRegisterMutateFunction,
  publishRegisterMutateFunction,
}: updateRecordProps) => {
  const registerUpdated = await updateRegisterMutateFunction({
    variables: {
      id: data.id,
      data: removeEmptyProperties({
        title: data.title,
        category: data.category,
        amount: data.amount,
        description: data.description,
        date: data.date,
      }),
    },
  }).then((response) => response.data?.updateRecord);

  const registerPublished = await publishRegisterMutateFunction({
    variables: {
      id: registerUpdated.id,
    },
  }).then(() => registerUpdated);

  return registerPublished;
};
