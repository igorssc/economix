import clsx from "clsx";
import { HTMLAttributes, ReactNode } from "react";

interface BoxProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function Box({ children, className, ...props }: BoxProps) {
  return (
    <>
      <div
        className={clsx(
          "bg-white dark:bg-gray-800 p-4 rounded-sm shadow-sm shadow-gray-300 dark:shadow-gray-900",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </>
  );
}
