"use client";
import { Icon } from "@phosphor-icons/react";
import { twMerge } from "tailwind-merge";

interface BaseSummarizedMonthlyExpensesIndexProps {
  invert?: boolean;
  title: string;
  description?: string;
  _icon: Icon;
  isHideValues?: boolean;
}

export function BaseSummarizedMonthlyExpensesIndex({
  invert = false,
  title,
  description,
  _icon,
  isHideValues = false,
}: BaseSummarizedMonthlyExpensesIndexProps) {
  return (
    <>
      <div className="flex max-md:flex-col gap-3 items-center max-md:text-center">
        <_icon
          color="#d1d5db"
          weight="bold"
          className={twMerge(
            "bg-purple-700 dark:bg-purple-900 p-2 md:p-4 rounded-full w-8 h-8 md:w-14 md:h-14",
            invert && "md:order-2"
          )}
        />
        <p className={twMerge("text-sm", invert && "md:text-right md:order-1")}>
          <span
            className={twMerge(
              "md:text-lg max-md:font-bold",
              isHideValues && "blur-md text-purple-700"
            )}
          >
            {title}
          </span>
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
