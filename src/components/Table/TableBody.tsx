import { HTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface TableBodyProps extends HTMLAttributes<HTMLTableSectionElement> {
  children: ReactNode;
}

export function TableBody({ children, className, ...rest }: TableBodyProps) {
  return (
    <tbody
      {...rest}
      className={twMerge(
        "[&>*:not(:last-child)]:border-b [&_tr]:dark:border-zinc-700 [&_tr>th]:px-6 [&_tr>th]:py-4 [&_tr>th]:font-medium [&_tr>th]:text-gray-900 [&_tr>th]:whitespace-nowrap [&_tr>th]:dark:text-white [&_tr>td]:px-6 [&_tr>td]:py-4",
        className
      )}
    >
      {children}
    </tbody>
  );
}
