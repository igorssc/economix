"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <p>Carregando...</p>;
  }

  if (!session) {
    router.push("/");
    return null;
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
      <button onClick={() => signOut({ redirect: true, callbackUrl: "/" })}>
        Sair
      </button>
    </>
  );
}
