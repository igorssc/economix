import { gql } from "@apollo/client";

export const GET_ALL_AGGREGATIONS_BETWEEN_DATES = gql`
  query Records(
    $email: String!
    $skip: Int!
    $dateGTE: DateTime!
    $dateLTE: DateTime!
  ) {
    recordsConnection(
      where: { email: $email, date_gte: $dateGTE, date_lte: $dateLTE }
      skip: $skip
      orderBy: date_DESC
    ) {
      pageInfo {
        hasNextPage
      }
      edges {
        node {
          id
          title
          category
          amount
          description
          date
        }
      }
    }
  }
`;

export interface getAllAggregationsBetweenDatesQueryResponse {
  recordsConnection: {
    pageInfo: {
      hasNextPage: boolean;
    };
    edges: {
      node: {
        id: string;
        title: string;
        category: string;
        amount: number;
        description?: string;
        date: string;
      };
    }[];
  };
}
