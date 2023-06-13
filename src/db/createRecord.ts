import { gql } from "@apollo/client";

export const CREATE_RECORD = gql`
  mutation CreateRecord(
    $title: String!
    $category: String!
    $amount: Float!
    $description: String
    $date: DateTime!
    $email: String!
  ) {
    createRecord(
      data: {
        title: $title
        category: $category
        amount: $amount
        description: $description
        date: $date
        email: $email
      }
    ) {
      id
    }
  }
`;

export interface createRecordMutationResponse {
  createRecord: {
    id: string;
  };
}
