import { Footer } from "@/components/Footer";
import AuthContext from "@/contexts/authContext";
import { DialogProvider } from "@/contexts/dialogsContext";
import { RecordProvider } from "@/contexts/recordContext";
import { ThemeProvider } from "@/contexts/themeContext";
import { Apollo } from "@/lib/apollo";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
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
  const cookieStore = cookies();

  const cachedSession = cookieStore.get("user-session");

  return (
    <html lang="pt-br">
      <head>
        <meta name="theme-color" content="rgb(29, 4, 49)" />
        <link rel="manifest" href="/manifest.json" />
      </head>
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
