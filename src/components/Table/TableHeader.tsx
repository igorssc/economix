import { CaretDown, CaretUp, CaretUpDown } from "@phosphor-icons/react";
import { ReactNode, ThHTMLAttributes } from "react";

type sortingBaseType = {
  by: string;
  order: string;
};

interface TableHeaderBaseProps
  extends ThHTMLAttributes<HTMLTableHeaderCellElement> {
  children: ReactNode;
}

interface TableHeaderColProps extends TableHeaderBaseProps {
  scope: "col";
  name?: string;
  sortingBase?: sortingBaseType;
  handleSortingBase?: (by: string) => void;
}

interface TableHeaderRowProps extends TableHeaderBaseProps {
  scope: "row";
}

type TableHeaderProps = TableHeaderColProps | TableHeaderRowProps;

export function TableHeader({ children, scope, ...rest }: TableHeaderProps) {
  if (scope === "col") {
    const colProps = rest as TableHeaderColProps;

    if (colProps.name && colProps.sortingBase && colProps.handleSortingBase) {
      return (
        <th {...rest}>
          <div
            onClick={() =>
              colProps.handleSortingBase &&
              colProps.name &&
              colProps.handleSortingBase(colProps.name)
            }
          >
            {children}
            {colProps.sortingBase.by === colProps.name ? (
              colProps.sortingBase.order === "ASC" ? (
                <CaretUp weight="bold" className="icon" />
              ) : (
                <CaretDown weight="bold" className="icon" />
              )
            ) : (
              <CaretUpDown weight="bold" className="icon" />
            )}
          </div>
        </th>
      );
    }
  }

  return <th {...rest}>{children}</th>;
}
