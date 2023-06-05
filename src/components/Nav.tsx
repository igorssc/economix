"use client";
import { signOut, useSession } from "next-auth/react";
import { Avatar } from "./Avatar";

export function Nav() {
  const { data: session } = useSession();

  return (
    <>
      <nav className="flex items-center justify-between dark:bg-gray-800 p-4">
        <div className="flex gap-3 items-center">
          <Avatar
            imageUrl={session?.user?.image || ""}
            name={session?.user?.name || ""}
          />
          <h1>
            Bem vindo, <span className="font-bold">{session?.user?.name}</span>
          </h1>
        </div>
        <button onClick={() => signOut({ redirect: true, callbackUrl: "/" })}>
          Sair
        </button>
      </nav>
    </>
  );
}
