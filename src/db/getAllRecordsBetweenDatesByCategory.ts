import { gql } from "@apollo/client";

export const GET_ALL_RECORDS_BETWEEN_DATES_BY_CATEGORY = gql`
  query Records(
    $email: String!
    $category: String!
    $dateGTE: DateTime!
    $dateLTE: DateTime!
  ) {
    records(
      where: {
        email: $email
        category: $category
        date_gte: $dateGTE
        date_lte: $dateLTE
      }
    ) {
      id
      title
      category
      amount
      description
      date
    }
  }
`;

export interface getAllRecordsBetweenDatesByCategoryQueryResponse {
  records: {
    id: string;
    title: string;
    category: string;
    amount: number;
    description?: string;
    date: string;
  }[];
}
