import { gql } from "@apollo/client";

export const GET_ALL_RECORDS = gql`
  query Records($email: String!) {
    records(where: { email: $email }) {
      id
      title
      category
      amount
      description
      date
    }
  }
`;

export interface getAllRecordsQueryResponse {
  records: {
    id: string;
    title: string;
    category: string;
    amount: number;
    description?: string;
    date: string;
  }[];
}
