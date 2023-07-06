import { RecordType } from "@/contexts/recordContext";
import { Session } from "next-auth";

interface updateSessionCacheProps {
  session: Session;
  data: any;
}

export const updateSessionCache = ({
  session,
  data,
}: updateSessionCacheProps) => {
  localStorage.setItem(`[data-${session?.user?.email}]`, JSON.stringify(data));
};

export const getSessionCache = (session: Session) => {
  const dataCached = localStorage.getItem(`[data-${session?.user?.email}]`);

  if (dataCached) {
    return JSON.parse(dataCached) as {
      revenues: RecordType[];
      expenditures: RecordType[];
    };
  }

  return null;
};
