import { gql } from "@apollo/client";

export const REMOVE_RECORD = gql`
  mutation Record($id: ID) {
    removeRecord(where: { id: $id }) {
      id
    }
  }
`;

export interface removeRecordMutationResponse {
  removeRecord: {
    id: string;
  };
}
