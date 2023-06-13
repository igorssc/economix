import { gql } from "@apollo/client";

export const PUBLISH_RECORD = gql`
  mutation PublishRecord($id: ID!) {
    publishRecord(where: { id: $id }, to: PUBLISHED) {
      id
    }
  }
`;

export interface publishRecordMutationResponse {
  publishRecord: {
    id: string;
  };
}
