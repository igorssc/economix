export const metadata = {
  title: "EconomiX - Login",
};

export default async function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="bg-white dark:bg-gray-700">{children}</div>;
}
