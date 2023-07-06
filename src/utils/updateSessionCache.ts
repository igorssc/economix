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
