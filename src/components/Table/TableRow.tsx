import { HTMLAttributes, ReactNode } from "react";

interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  children: ReactNode;
}

export function TableRow({ children, ...rest }: TableRowProps) {
  return <tr {...rest}>{children}</tr>;
}
