export const metadata = {
  title: "EconomiX - Login",
};

export default async function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gray-100 dark:bg-zinc-950 dark:text-gray-300">
      {children}
    </div>
  );
}
