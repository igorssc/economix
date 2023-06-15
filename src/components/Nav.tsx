"use client";
import { signOut, useSession } from "next-auth/react";
import { Avatar } from "./Avatar";
import { ToggleTheme } from "./ToggleTheme";

export function Nav() {
  const { data: session } = useSession();

  return (
    <>
      <nav className="flex bg-white items-center justify-between dark:bg-gray-800 p-4">
        <div className="flex gap-3 items-center">
          <Avatar
            imageUrl={session?.user?.image || ""}
            name={session?.user?.name || ""}
          />
          <h1>
            Bem vindo, <span className="font-bold">{session?.user?.name}</span>
          </h1>
        </div>
        <div className="flex gap-1 md:gap-2 items-center">
          <ToggleTheme />
          <button onClick={() => signOut({ redirect: true, callbackUrl: "/" })}>
            Sair
          </button>
        </div>
      </nav>
    </>
  );
}
