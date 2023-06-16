"use client";
import Paper from "@mui/material/Paper";
import { signOut, useSession } from "next-auth/react";
import { Avatar } from "./Avatar";
import { ToggleTheme } from "./ToggleTheme";

export function Nav() {
  const { data: session } = useSession();

  return (
    <>
      <Paper
        elevation={3}
        className="mb-6 dark:text-gray-100 bg-white dark:bg-zinc-900 p-4"
      >
        <div className="max-w-[1280px] m-auto flex items-center justify-between">
          <div className="flex gap-3 items-center">
            <Avatar
              imageUrl={session?.user?.image || ""}
              name={session?.user?.name || ""}
            />
            <h1>
              Bem vindo,{" "}
              <span className="font-bold">{session?.user?.name}</span>
            </h1>
          </div>
          <div className="flex gap-1 md:gap-2 items-center">
            <ToggleTheme />
            <button
              onClick={() => signOut({ redirect: true, callbackUrl: "/" })}
            >
              Sair
            </button>
          </div>
        </div>
      </Paper>
    </>
  );
}
