import {
  RecordType,
  allRecordsFromMonthsAgoByCategoryType,
} from "@/contexts/recordContext";
import { getAllAggregationsBetweenDatesQueryResponse } from "@/db/getAllAggregationsBetweenDates";
import { ApolloQueryResult, OperationVariables } from "@apollo/client";
import { isEqual } from "lodash";
import { Session } from "next-auth";
import { Dispatch, SetStateAction } from "react";
import { getISODateOfMonthsAgo } from "./getISODateOfMonthsAgo";
import { getSessionCache, updateSessionCache } from "./sessionCache";

interface getLastRecordsProps {
  session: Session | null;

  isRealTime: boolean;

  refetchGetAllRecordsFromMonthsAgo: (
    variables?: Partial<OperationVariables> | undefined
  ) => Promise<ApolloQueryResult<getAllAggregationsBetweenDatesQueryResponse>>;

  setRecords: Dispatch<SetStateAction<allRecordsFromMonthsAgoByCategoryType>>;
}

export const getLastRecords = async ({
  session,
  refetchGetAllRecordsFromMonthsAgo,
  isRealTime,
  setRecords,
}: getLastRecordsProps): Promise<{
  revenues: RecordType[];
  expenditures: RecordType[];
}> => {
  let recordsFromMonthsAgoByCategory = {
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
            console.log(recordsFromMonthsAgoByCategory);

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

            if (isRealTime) {
              setRecords((prev) => ({
                revenues:
                  v.node.category === "revenue"
                    ? [...prev.revenues, v.node]
                    : [...prev.revenues],
                expenditures:
                  v.node.category === "expenditure"
                    ? [...prev.expenditures, v.node]
                    : [...prev.expenditures],
              }));

              updateSessionCache({
                session: session as Session,
                data: {
                  revenues:
                    v.node.category === "revenue"
                      ? [...recordsFromMonthsAgoByCategory.revenues, v.node]
                      : [...recordsFromMonthsAgoByCategory.revenues],
                  expenditures:
                    v.node.category === "expenditure"
                      ? [...recordsFromMonthsAgoByCategory.expenditures, v.node]
                      : [...recordsFromMonthsAgoByCategory.expenditures],
                },
              });
            } else {
              const dataCached = getSessionCache(session as Session);

              if (dataCached) {
                if (
                  !(
                    dataCached.expenditures.some(
                      (data) => data.id === v.node.id
                    ) ||
                    dataCached.revenues.some((data) => data.id === v.node.id)
                  )
                ) {
                  setRecords((prev) => ({
                    revenues:
                      v.node.category === "revenue"
                        ? [...prev.revenues, v.node]
                        : [...prev.revenues],
                    expenditures:
                      v.node.category === "expenditure"
                        ? [...prev.expenditures, v.node]
                        : [...prev.expenditures],
                  }));

                  updateSessionCache({
                    session: session as Session,
                    data: {
                      revenues:
                        v.node.category === "revenue"
                          ? [...dataCached.revenues, v.node]
                          : [...dataCached.revenues],
                      expenditures:
                        v.node.category === "expenditure"
                          ? [...dataCached.expenditures, v.node]
                          : [...dataCached.expenditures],
                    },
                  });
                } else {
                  const findCacheData = dataCached[
                    (v.node.category + "s") as "revenues" | "expenditures"
                  ].find((f) => f.id === v.node.id);

                  if (!isEqual(v.node, findCacheData)) {
                    setRecords((prev) => ({
                      revenues:
                        v.node.category === "revenue"
                          ? [
                              ...prev.revenues.filter(
                                (p) => p.id !== v.node.id
                              ),
                              v.node,
                            ]
                          : [...prev.revenues],
                      expenditures:
                        v.node.category === "expenditure"
                          ? [
                              ...prev.expenditures.filter(
                                (p) => p.id !== v.node.id
                              ),
                              v.node,
                            ]
                          : [...prev.expenditures],
                    }));

                    updateSessionCache({
                      session: session as Session,
                      data: {
                        revenues:
                          v.node.category === "revenue"
                            ? [
                                ...dataCached.revenues.filter(
                                  (p) => p.id !== v.node.id
                                ),
                                v.node,
                              ]
                            : [...dataCached.revenues],
                        expenditures:
                          v.node.category === "expenditure"
                            ? [
                                ...dataCached.expenditures.filter(
                                  (p) => p.id !== v.node.id
                                ),
                                v.node,
                              ]
                            : [...dataCached.expenditures],
                      },
                    });
                  }
                }
              }
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
