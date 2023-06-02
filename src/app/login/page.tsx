"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

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
      <h1>Bem vindo, {session.user?.name}</h1>
      {session.user?.image && (
        <Image
          alt="Image Profile"
          src={session.user.image}
          width={50}
          height={50}
        />
      )}
      <p>
        Você está autenticado como: {session.user?.email}, até:{" "}
        {new Date(session.expires).toLocaleDateString("pt-BR", {
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
        })}
      </p>
      <button onClick={() => signOut()}>Sair</button>
    </>
  );
}
