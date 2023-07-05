import { HTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface TableHeadProps extends HTMLAttributes<HTMLTableSectionElement> {
  children: ReactNode;
}

export function TableHead({ children, className, ...rest }: TableHeadProps) {
  return (
    <thead
      {...rest}
      className={twMerge(
        "text-xs uppercase bg-purple-700 dark:bg-purple-950 text-gray-50 [&_tr>th]:px-6 [&_tr>th]:py-3 [&_tr>th>div]:flex [&_tr>th>div]:items-center [&_tr>th>div]:gap-1 [&_tr>th>div]:cursor-pointer [&_tr>th>div>.icon]:text-white [&_tr>th>div>.icon]:text-sm",
        className
      )}
    >
      {children}
    </thead>
  );
}
