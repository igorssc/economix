import { RecordType } from "@/contexts/recordContext";
import { getAllAggregationsBetweenDatesQueryResponse } from "@/db/getAllAggregationsBetweenDates";
import { ApolloQueryResult, OperationVariables } from "@apollo/client";
import { Session } from "next-auth";
import { getISODateOfMonthsAgo } from "./getISODateOfMonthsAgo";

interface getLastRecordsProps {
  session: Session | null;

  refetchGetAllRecordsFromMonthsAgo: (
    variables?: Partial<OperationVariables> | undefined
  ) => Promise<ApolloQueryResult<getAllAggregationsBetweenDatesQueryResponse>>;
}

export const getLastRecords = async ({
  session,
  refetchGetAllRecordsFromMonthsAgo,
}: getLastRecordsProps): Promise<{
  revenues: RecordType[];
  expenditures: RecordType[];
}> => {
  const recordsFromMonthsAgoByCategory = {
    revenues: [] as RecordType[],
    expenditures: [] as RecordType[],
  };

  for (let i = 0; i < 12; i++) {
    await new Promise((resolve) => {
      setTimeout(async () => {
        let skip = 0;

        while (true) {
          const result = await refetchGetAllRecordsFromMonthsAgo({
            email: session?.user?.email,
            dateGTE: getISODateOfMonthsAgo(i),
            dateLTE: getISODateOfMonthsAgo(i, true),
            skip: skip,
          });

          result.data.recordsConnection.edges.forEach((v) => {
            if (v.node.category === "expenditure") {
              recordsFromMonthsAgoByCategory.expenditures.push(
                v.node as RecordType
              );
            }

            if (v.node.category === "revenue") {
              recordsFromMonthsAgoByCategory.revenues.push(
                v.node as RecordType
              );
            }
          });

          skip += 10;

          if (!result?.data?.recordsConnection?.pageInfo?.hasNextPage) {
            break;
          }
        }

        resolve(null);
      }, 1000 + i * 1000);
    });
  }

  return recordsFromMonthsAgoByCategory;
};
