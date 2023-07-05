import { ReactNode, TdHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface TableDataProps extends TdHTMLAttributes<HTMLTableDataCellElement> {
  children: ReactNode;
}

export function TableData({ children, className, ...rest }: TableDataProps) {
  return (
    <td {...rest} className={twMerge("whitespace-nowrap", className)}>
      {children}
    </td>
  );
}
