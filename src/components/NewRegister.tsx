"use client";
import { Plus } from "@phosphor-icons/react";

export function NewRegister() {
  return (
    <>
      <button className="fixed w-10 h-10 md:w-14 md:h-14 flex items-center justify-center z-50 cursor-pointer hover:scale-110 transition-all duration-300 right-3 bottom-2 md:right-7 md:bottom-5 lg:right-14 lg:bottom-10 bg-gray-950 rounded-full border-gray-700 border-2">
        <Plus size={32} color="#ffffff" weight="light" />
      </button>
    </>
  );
}
