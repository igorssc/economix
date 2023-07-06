import { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  scheme?: "primary" | "secondary" | "tertiary";
  isSmall?: boolean;
  isDisabled?: boolean;
  className?: string;
}

export const Button = ({
  scheme = "primary",
  isSmall = false,
  isDisabled = false,
  className,
  ...props
}: ButtonProps) => {
  return (
    <>
      <button
        {...props}
        className={twMerge(
          "w-full py-4 cursor-pointer text-lg flex items-center justify-center flex-nowrap m-auto border-none md:max-w-md",
          scheme === "primary" && "text-white bg-purple-700 dark:bg-purple-950",
          scheme === "secondary" && "bg-transparent text-purple-700 dark:text-white",
          scheme === "tertiary" && "",
          isDisabled && "brightness-50 hover:brightness-50",
          !isDisabled && "hover:brightness-90",
          !isSmall && "md:py-6",
          className
        )}
      />
    </>
  );
};
