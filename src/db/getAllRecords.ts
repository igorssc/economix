import { gql } from "@apollo/client";

export const GET_ALL_RECORDS = gql`
  query Records {
    records {
      createdAt
      id
      email
      type
      title
      description
      value
    }
  }
`;

export interface getAllRecordsQueryResponse {
  records: {
    createdAt: string;
    id: string;
    email: string;
    type: string;
    title: string;
    description?: string;
    value: number;
  }[];
}
