import AuthContext from "@/hooks/AuthContext";

export const metadata = {
  title: "EconomiX - Login",
};

export default async function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthContext>{children}</AuthContext>;
}
