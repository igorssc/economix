import { RecordType } from "@/contexts/recordContext";
import { Dispatch, SetStateAction } from "react";

interface FilteredRecordsProps {
  period: number;
  setPeriod: Dispatch<SetStateAction<number>>;
  records: RecordType[];
  setRecords: Dispatch<SetStateAction<RecordType[]>>;
}

export function FilteredRecords({
  period,
  setPeriod,
  records,
  setRecords,
}: FilteredRecordsProps) {
  return <></>;
}
