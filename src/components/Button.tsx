import { twMerge } from "tailwind-merge";
import { ButtonHTMLAttributes } from "react";

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
          scheme === "primary" && "text-gray-50 bg-purple-700",
          scheme === "secondary" && "text-white bg-gray-800",
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
