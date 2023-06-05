"use client";
import { Icon } from "@phosphor-icons/react";
import clsx from "clsx";

interface SummarizedMonthlyExpensesIndexProps {
  invert?: boolean;
  title: string;
  description?: string;
  _icon: Icon;
}

export function SummarizedMonthlyExpensesIndex({
  invert = false,
  title,
  description,
  _icon,
}: SummarizedMonthlyExpensesIndexProps) {
  return (
    <>
      <div className="flex max-md:flex-col gap-3 items-center max-md:text-center">
        <_icon
          color="#d1d5db"
          weight="light"
          className={clsx(
            "dark:bg-gray-950 p-2 md:p-4 rounded-full w-8 h-8 md:w-14 md:h-14",
            invert && "md:order-2"
          )}
        />
        <p className={clsx("text-sm", invert && "md:text-right md:order-1")}>
          <span className="md:text-lg max-md:font-bold">{title}</span>
          {description && (
            <>
              <br />
              <span className="">{description}</span>
            </>
          )}
        </p>
      </div>
    </>
  );
}
