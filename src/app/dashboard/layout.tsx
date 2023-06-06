import { NewRegister } from "@/components/NewRegister";
import { Apollo } from "@/lib/apollo";

export const metadata = {
  title: "EconomiX - Dashboard",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Apollo>
        {children}
        <NewRegister />
      </Apollo>
    </>
  );
}
