import { gql } from "@apollo/client";

export const GET_ALL_RECORDS_BETWEEN_DATES = gql`
  query Records($email: String!, $dateGTE: DateTime!, $dateLTE: DateTime!) {
    records(where: { email: $email, date_gte: $dateGTE, date_lte: $dateLTE }) {
      id
      title
      category
      amount
      description
      date
    }
  }
`;

export interface getAllRecordsBetweenDatesQueryResponse {
  records: {
    id: string;
    title: string;
    category: string;
    amount: number;
    description?: string;
    date: string;
  }[];
}
