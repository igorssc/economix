import { Footer } from "@/components/Footer";
import Pwa from "@/components/Pwa";
import AuthContext from "@/contexts/authContext";
import { DialogProvider } from "@/contexts/dialogsContext";
import { RecordProvider } from "@/contexts/recordContext";
import { ThemeProvider } from "@/contexts/themeContext";
import { Apollo } from "@/lib/apollo";
import { Inter } from "next/font/google";
import Head from "next/head";
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
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="rgb(29, 4, 49)" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <Pwa />
      <AuthContext>
        <Apollo>
          <RecordProvider>
            <ThemeProvider>
              <DialogProvider>
                <body
                  className={`${inter.className} bg-gray-100 transition-all duration-100 dark:bg-zinc-950 dark:text-gray-300 relative`}
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
