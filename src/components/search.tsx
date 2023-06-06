"use client";
import { useQuery } from "@apollo/client";
import {
  GET_ALL_REGISTERS,
  getAllRegistersQueryResponse,
} from "../db/getAllRegister";

export function Search() {
  const { data: dataGetRecords, refetch: refetchGetRecords } =
    useQuery<getAllRegistersQueryResponse>(GET_ALL_REGISTERS);

  console.log(dataGetRecords);

  return <></>;
}
