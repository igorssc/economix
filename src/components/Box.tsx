import Paper from "@mui/material/Paper";
import { HTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface BoxProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function Box({ children, className, ...props }: BoxProps) {
  return (
    <>
      <Paper
        elevation={3}
        className={twMerge(
          "bg-white dark:bg-zinc-900 dark:text-gray-100 p-4 rounded-sm relative",
          className
        )}
        {...props}
      >
        {children}
      </Paper>
    </>
  );
}
