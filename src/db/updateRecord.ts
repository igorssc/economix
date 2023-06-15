import { gql } from "@apollo/client";

export const UPDATE_RECORD = gql`
  mutation Record($id: ID, $data: RecordUpdateInput!) {
    updateRecord(data: $data, where: { id: $id }) {
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

export interface updateRecordMutationResponse {
  updateRecord: {
    id: string;
    title: string;
    category: string;
    installment: number;
    amount: number;
    description?: string;
    date: string;
  };
}
