import Paper from "@mui/material/Paper";
import { twMerge } from "tailwind-merge";
import { HTMLAttributes, ReactNode } from "react";

interface BoxProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function Box({ children, className, ...props }: BoxProps) {
  return (
    <>
      <Paper
        elevation={3}
        className={twMerge(
          "bg-white dark:bg-zinc-900 dark:text-gray-100 p-4 rounded-sm",
          className
        )}
        {...props}
      >
        {children}
      </Paper>
    </>
  );
}
