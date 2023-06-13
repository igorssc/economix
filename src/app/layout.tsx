import { Footer } from "@/components/Footer";
import AuthContext from "@/contexts/authContext";
import { RecordProvider } from "@/contexts/recordContext";
import { Apollo } from "@/lib/apollo";
import { Inter } from "next/font/google";
import "../style/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "EconomiX",
  description:
    "Controle suas finanças de forma inteligente com o aplicativo Economix.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <AuthContext>
        <Apollo>
          <RecordProvider>
            <body
              className={`${inter.className} bg-white dark:bg-gray-700 dark:text-gray-300 relative`}
            >
              {children}
              <Footer />
            </body>
          </RecordProvider>
        </Apollo>
      </AuthContext>
    </html>
  );
}
