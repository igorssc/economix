import { TdHTMLAttributes, useEffect, useState } from "react";
import { Table } from "./Table";

type sortingBaseType = {
  by: string;
  order: "ASC" | "DESC";
};

type headType = {
  name: string;
  label: string;
  isActiveSort?: boolean;
};

type dataType = {
  data: any;
} & TdHTMLAttributes<HTMLTableDataCellElement>;

interface TableBaseProps {
  sortingBaseDefault: sortingBaseType;
  head: headType[];
  data: dataType[];
}

export function TableBase({ sortingBaseDefault, head, data }: TableBaseProps) {
  const [sortingBase, setSortingBase] =
    useState<sortingBaseType>(sortingBaseDefault);

  const [dataDisplayed, setDataDisplayed] = useState(data);

  const sortingData = () => {
    const sortedData = [...data].sort((a, b) => {
      if (typeof a.data[sortingBase.by] === "object") {
        if (a.data[sortingBase.by].value > b.data[sortingBase.by].value) {
          return sortingBase.order === "ASC" ? 1 : -1;
        }
        if (a.data[sortingBase.by].value < b.data[sortingBase.by].value) {
          return sortingBase.order === "ASC" ? -1 : 1;
        }
      } else {
        if (a.data[sortingBase.by] > b.data[sortingBase.by]) {
          return sortingBase.order === "ASC" ? 1 : -1;
        }
        if (a.data[sortingBase.by] < b.data[sortingBase.by]) {
          return sortingBase.order === "ASC" ? -1 : 1;
        }
      }

      return 0;
    });

    return sortedData;
  };

  useEffect(() => {
    const sortedData = sortingData();
    setDataDisplayed(sortedData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortingBase, data]);

  const handleSortingBase = (by: string) => {
    setSortingBase({
      by,
      order:
        sortingBase.by === by
          ? sortingBase.order === "ASC"
            ? "DESC"
            : "ASC"
          : "ASC",
    });
  };

  return (
    <Table.Root>
      <Table.Head>
        <Table.Row>
          {head.map((item, index) => (
            <Table.Header
              key={index}
              scope="col"
              {...(item.isActiveSort && {
                name: item.name,
                sortingBase: sortingBase,
                handleSortingBase: handleSortingBase,
              })}
            >
              {item.label}
            </Table.Header>
          ))}
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {dataDisplayed.map((v, i) => (
          <Table.Row key={i}>
            {head.map((value, index) => (
              <Table.Data
                key={index}
                scope="row"
                {...(typeof v.data[value.name] === "object" &&
                  v.data[value.name].onClick && {
                    onClick: v.data[value.name].onClick,
                    className: "cursor-pointer",
                  })}
              >
                {typeof v.data[value.name] === "object"
                  ? v.data[value.name].type === "date"
                    ? new Date(v.data[value.name].value).toLocaleDateString(
                        "pt-br"
                      )
                    : v.data[value.name].type === "currency"
                    ? v.data[value.name].value.toLocaleString("pt-br", {
                        style: "currency",
                        currency: "BRL",
                      })
                    : v.data[value.name].type === "string"
                    ? v.data[value.name].value
                    : ""
                  : v.data[value.name]}
              </Table.Data>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
}
