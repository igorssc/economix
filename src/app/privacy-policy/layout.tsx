export const metadata = {
  title: "EconomiX - Políticas de privacidade",
};

export default async function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="bg-white dark:bg-gray-700">{children}</div>;
}
