"use client";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Login() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Carregando...</p>;
  }

  if (!session) {
    return (
      <>
        <p>Você não está autenticado.</p>
        <button onClick={() => signIn()}>Login com Google</button>
      </>
    );
  }

  return (
    <>
      <p>Você está autenticado como {session?.user?.email}.</p>
      <button onClick={() => signOut()}>Sair</button>
    </>
  );
}
