import { gql } from "@apollo/client";

export const GET_ALL_AGGREGATIONS_IN_THE_FUTURE = gql`
  query Records($email: String!, $skip: Int!, $dateGTE: DateTime!) {
    recordsConnection(
      where: { email: $email, date_gte: $dateGTE }
      skip: $skip
      orderBy: date_ASC
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

export interface getAllAggregationsInFutureResponse {
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
