import { CaretUp } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

export const ScrollTopButton = () => {
  const top = 20;
  const [visible, setVisible] = useState(false);

  const onScroll = () => {
    setVisible(document.documentElement.scrollTop > top);
  };

  useEffect(() => {
    document.addEventListener("scroll", onScroll);
    return () => document.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      onClick={() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      className={twMerge(
        "fixed w-12 h-12 md:w-14 md:h-14 flex items-center justify-center z-50 cursor-pointer hover:scale-110 transition-all duration-300 right-6 bottom-[5.5rem] md:right-7 md:bottom-[5.5rem] lg:right-14 lg:bottom-[7.5rem] bg-purple-700 dark:bg-purple-900 rounded-full",
        !visible && "opacity-0"
      )}
    >
      <CaretUp
        color="#fff"
        weight="light"
        className="w-8 h-8 md:w-10 md:h-10"
      />
    </div>
  );
};
