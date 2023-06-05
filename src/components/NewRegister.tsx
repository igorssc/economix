"use client";
import { Plus } from "@phosphor-icons/react";

export function NewRegister() {
  return (
    <>
      <button className="fixed w-12 h-12 md:w-14 md:h-14 flex items-center justify-center z-50 cursor-pointer hover:scale-110 transition-all duration-300 right-6 bottom-6 md:right-7 md:bottom-5 lg:right-14 lg:bottom-10 bg-gray-950 rounded-full border-gray-700 border-2">
        <Plus color="#fff" weight="light" className="w-8 h-8 md:w-10 md:h-10" />
      </button>
    </>
  );
}
