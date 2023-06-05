"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export function Login() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <p>Carregando...</p>;
  }

  if (session) {
    router.push("/dashboard");
    return null;
  }

  return (
    <>
      <p>Você não está autenticado.</p>
      <button onClick={() => signIn("google")}>Login com Google</button>
    </>
  );
}
