"use client";
import { Box } from "@/components/Box";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import economixLogoImg from "../../assets/economix-logo.png";
import facebookLogoImg from "../../assets/facebook-logo.svg";
import googleLogoImg from "../../assets/google-logo.svg";

export default function Login() {
  const { data: session } = useSession();
  const router = useRouter();

  if (session?.user) {
    router.push("/dashboard");
    return null;
  }

  return (
    <>
      <div className="w-full flex place-items-center place-content-center min-h-screen h-full">
        <Box className="w-[1200px] max-w-[90%] md:grid md:grid-cols-2 max-md:flex max-md:flex-col max-md:gap-4 py-20 md:py-28 px-0">
          <div className="flex flex-col justify-center text-center gap-5">
            <Image
              src={economixLogoImg}
              alt="Icon EconomiX"
              width={100}
              height={100}
              className="m-auto"
            />
            <h1 className="font-black text-xl">EconomiX</h1>
            <p className="text-sm px-4 sm:px-10 md:px-20 lg:px-24 xl:px-24">
              Comece a trilhar o caminho para o sucesso financeiro
            </p>
          </div>
          <div className="flex flex-col max-md:gap-8 md:justify-between items-center relative md:before:content-[''] md:before:h-full md:before:border-[1px] md:before:border-gray-300 md:before:absolute md:before:left-0">
            <p className="text-center text-sm px-4 sm:px-10 md:px-20 lg:px-24 xl:px-24">
              Faça login no Economix e domine suas finanças com facilidade
            </p>
            <div className="flex flex-col gap-4">
              <button
                onClick={() => signIn("facebook")}
                className="border-2 border-gray-300 rounded-full py-2 px-5 flex items-center gap-3"
              >
                <Image
                  src={facebookLogoImg}
                  alt="Icon Facebook"
                  width={20}
                  height={20}
                />
                Login com Facebook
              </button>
              <button
                onClick={() => signIn("google")}
                className="border-2 border-gray-300 rounded-full py-2 px-5 flex items-center gap-3"
              >
                <Image
                  src={googleLogoImg}
                  alt="Icon Google"
                  width={20}
                  height={20}
                />
                Login com Google
              </button>
            </div>
          </div>
        </Box>
      </div>
    </>
  );
}
