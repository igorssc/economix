import { gql } from "@apollo/client";

export const GET_ALL_REGISTERS = gql`
  query Registers {
    registers {
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

export interface getAllRegistersQueryResponse {
  registers: {
    createdAt: string;
    id: string;
    email: string;
    type: string;
    title: string;
    description?: string;
    value: number;
  }[];
}
