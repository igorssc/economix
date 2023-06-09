"use client";
import Paper from "@mui/material/Paper";
import Link from "next/link";

export function Footer() {
  return (
    <>
      <Paper
        elevation={3}
        className="py-7 mt-6 flex flex-col items-center gap-3 sm:gap-5 text-xs bg-white dark:bg-zinc-900 dark:text-gray-50"
      >
        <p>
          Desenvolvido por{" "}
          <Link
            href="https://igsdesign.com.br"
            className="font-bold uppercase"
            target="_blank"
          >
            IGS DESIGN
          </Link>
        </p>
        <div className="flex gap-2">
          <Link href="/privacy-policy">Política de privacidade</Link>
          {"|"}
          <Link href="/service-terms">Termos de serviço</Link>
        </div>
        <strong className="font-normal">
          © 2023 - {new Date().getFullYear()} - EconomiX
        </strong>
      </Paper>
    </>
  );
}
