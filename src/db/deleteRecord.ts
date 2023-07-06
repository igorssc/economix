import { gql } from "@apollo/client";

export const DELETE_RECORD = gql`
  mutation Record($id: ID) {
    deleteRecord(where: { id: $id }) {
      id
    }
  }
`;

export interface deleteRecordMutationResponse {
  deleteRecord: {
    id: string;
  };
}
