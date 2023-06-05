"use client";
import { Box } from "@/components/Box";
import { Nav } from "@/components/Nav";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return null;
  }

  if (!session?.user) {
    router.push("/");
    return null;
  }

  return (
    <>
      <Nav />
      <main className="max-w-[1280px] p-4">
        <div className="grid grid-cols-3 gap-4">
          <Box>a</Box>
          <Box>a</Box>
          <Box>a</Box>
        </div>
      </main>
    </>
  );
}
