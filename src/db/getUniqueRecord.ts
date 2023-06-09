import { gql } from "@apollo/client";

export const GET_UNIQUE_RECORD = gql`
  query Record($id: String!) {
    record(where: { id: $id }) {
      id
      title
      category
      amount
      installment
      description
      date
    }
  }
`;

export interface getUniqueRecordQueryResponse {
  record: {
    id: string;
    title: string;
    category: string;
    installment: number;
    amount: number;
    description?: string;
    date: string;
  };
}
