import { Footer } from "@/components/Footer";
import AuthContext from "@/contexts/authContext";
import { DialogProvider } from "@/contexts/dialogsContext";
import { RecordProvider } from "@/contexts/recordContext";
import { ThemeProvider } from "@/contexts/themeContext";
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
            <ThemeProvider>
              <DialogProvider>
                <body
                  className={`${inter.className} bg-gray-200 transition-all duration-100 dark:bg-gray-700 dark:text-gray-300 relative`}
                >
                  {children}
                  <Footer />
                </body>
              </DialogProvider>
            </ThemeProvider>
          </RecordProvider>
        </Apollo>
      </AuthContext>
    </html>
  );
}
