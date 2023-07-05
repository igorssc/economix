import { ReactNode, TableHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface TableRootProps extends TableHTMLAttributes<HTMLTableElement> {
  children: ReactNode;
}

export function TableRoot({ children, className, ...rest }: TableRootProps) {
  return (
    <div className="overflow-x-auto block">
      <table
        {...rest}
        className={twMerge(
          "w-full text-sm text-left text-gray-500 dark:text-gray-400",
          className
        )}
      >
        {children}
      </table>
    </div>
  );
}
