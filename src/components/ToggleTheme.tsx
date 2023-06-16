import { ThemeContext } from "@/contexts/themeContext";
import clsx from "clsx";
import { useContext } from "react";

export const ToggleTheme = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <>
      <div className="relative w-24 h-12 scale-[.6] bg-purple-700 dark:bg-purple-900 rounded-full">
        <label className="cursor-pointer">
          <input
            type="checkbox"
            className="hidden"
            checked={theme === "dark"}
            onChange={(e) =>
              e.target.checked ? setTheme("dark") : setTheme("light")
            }
          />
          <div className="relative w-full h-full inset-0">
            <div
              className={clsx(
                "absolute left-1 m-1 w-10 h-10 rounded-full transition-all duration-300",
                theme === "dark"
                  ? "bg-transparent translate-x-6 shadow-[15px_0_0_0_#FFE5B5]"
                  : "bg-yellow-600"
              )}
            ></div>
            <span
              className={clsx(
                "absolute bg-white rounded-[50%] top-2 left-9 z-0 transition-all duration-300",
                theme === "dark" ? "w-[2px] h-[2px]" : " w-8 h-1"
              )}
            ></span>
            <span
              className={clsx(
                "absolute bg-white rounded-[50%] top-4 left-7 z-10  transition-all duration-300",
                theme === "dark" ? "w-1 h-1" : "w-9 h-1"
              )}
            ></span>
            <span
              className={clsx(
                "absolute bg-white rounded-[50%] top-7 left-10 z-0  transition-all duration-300",
                theme === "dark" ? "w-[2px] h-[2px]" : " w-8 h-1"
              )}
            ></span>
            <span
              className={clsx(
                "absolute bg-white rounded-[50%] top-4 left-3 z-0 w-[2px] h-[2px] transition-all",
                theme === "dark" ? "opacity-100" : "opacity-0"
              )}
            ></span>
            <span
              className={clsx(
                "absolute bg-white rounded-[50%] top-8 left-4 z-0 w-[3px] h-[3px] transition-all",
                theme === "dark" ? "opacity-100" : "opacity-0"
              )}
            ></span>
            <span
              className={clsx(
                "absolute bg-white rounded-[50%] top-9 left-7 z-0 w-[2px] h-[2px] transition-all",
                theme === "dark" ? "opacity-100" : "opacity-0"
              )}
            ></span>
          </div>
        </label>
      </div>
    </>
  );
};
