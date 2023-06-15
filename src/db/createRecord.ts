import { gql } from "@apollo/client";

export const CREATE_RECORD = gql`
  mutation CreateRecord(
    $title: String!
    $category: String!
    $amount: Float!
    $installment: Int!
    $description: String
    $date: DateTime!
    $email: String!
  ) {
    createRecord(
      data: {
        title: $title
        category: $category
        amount: $amount
        installment: $installment
        description: $description
        date: $date
        email: $email
      }
    ) {
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

export interface createRecordMutationResponse {
  createRecord: {
    id: string;
    title: string;
    category: string;
    amount: number;
    installment: number;
    description?: string;
    date: string;
  };
}
