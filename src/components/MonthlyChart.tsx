import { RecordContext } from "@/contexts/recordContext";
import { ThemeContext } from "@/contexts/themeContext";
import { getWeekday } from "@/utils/getWeekday";
import {
  differenceInCalendarMonths,
  differenceInDays,
  format,
  parse,
  subMonths,
} from "date-fns";
import { ptBR } from "date-fns/locale";
import { useContext, useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { twMerge } from "tailwind-merge";

interface MonthlyChartProps {
  recordsInit?:
    | {
        category: string;
        totalAmount: number;
        date: string;
      }[]
    | null;
  period?: number;
  filterTime?: string;
  filterCategory?: string;
}

export function MonthlyChart({
  recordsInit,
  period,
  filterTime,
  filterCategory,
}: MonthlyChartProps) {
  const { allRecordsFrom30DaysAgo } = useContext(RecordContext);
  const { theme } = useContext(ThemeContext);

  const [data, setData] = useState(
    [] as {
      date: string;
      value1: number;
      value2: number;
    }[]
  );

  const [recordsDisplayed, setRecordsDisplayed] = useState<
    {
      category: string;
      totalAmount: number;
      date: string;
    }[]
  >([]);

  useEffect(() => {
    if (recordsInit) {
      setRecordsDisplayed(recordsInit);
    } else {
      setRecordsDisplayed(
        allRecordsFrom30DaysAgo.map((value) => ({
          category: value.category,
          totalAmount: value.amount,
          date: value.date,
        }))
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!recordsInit) {
      setRecordsDisplayed(
        allRecordsFrom30DaysAgo.map((value) => ({
          category: value.category,
          totalAmount: value.amount,
          date: value.date,
        }))
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allRecordsFrom30DaysAgo]);

  useEffect(() => {
    recordsInit && setRecordsDisplayed(recordsInit);
  }, [recordsInit]);

  useEffect(() => {
    if (filterTime === "daily") {
      setData(
        Array.from(
          {
            length:
              recordsInit && period
                ? differenceInDays(
                    new Date(),
                    new Date(
                      subMonths(new Date(), period).setDate(
                        new Date().getDate()
                      )
                    )
                  )
                : 30,
          },
          (_, i) => {
            return {
              date: new Date(
                new Date().setDate(new Date().getDate() - i)
              ).toLocaleDateString("pt-br", {
                month: "2-digit",
                day: "2-digit",
              }),
              value1: recordsDisplayed
                .filter((v) => v.category === "revenue")
                .filter(
                  (v) =>
                    new Date(v.date).getDate() ===
                      new Date(
                        new Date().setDate(new Date().getDate() - i)
                      ).getDate() &&
                    new Date(v.date).getMonth() ===
                      new Date(
                        new Date().setDate(new Date().getDate() - i)
                      ).getMonth() &&
                    new Date(v.date).getFullYear() ===
                      new Date(
                        new Date().setDate(new Date().getDate() - i)
                      ).getFullYear()
                )
                .reduce((acc, v) => (acc += v.totalAmount), 0),
              value2: recordsDisplayed
                .filter((v) => v.category === "expenditure")
                .filter(
                  (v) =>
                    new Date(v.date).getDate() ===
                      new Date(
                        new Date().setDate(new Date().getDate() - i)
                      ).getDate() &&
                    new Date(v.date).getMonth() ===
                      new Date(
                        new Date().setDate(new Date().getDate() - i)
                      ).getMonth() &&
                    new Date(v.date).getFullYear() ===
                      new Date(
                        new Date().setDate(new Date().getDate() - i)
                      ).getFullYear()
                )
                .reduce((acc, v) => (acc += v.totalAmount), 0),
            };
          }
        ).reverse()
      );
    } else {
      setData(() => {
        return Array.from(
          {
            length: period
              ? differenceInCalendarMonths(
                  new Date(),
                  new Date(
                    subMonths(new Date(), period + 1).setDate(
                      new Date().getDate()
                    )
                  )
                )
              : 1,
          },
          (_, i) => {
            return {
              date: new Date(
                new Date().setMonth(new Date().getMonth() - i)
              ).toLocaleDateString("pt-br", {
                month: "2-digit",
                year: "numeric",
              }),
              value1: recordsDisplayed
                .filter((v) => v.category === "revenue")
                .filter(
                  (v) =>
                    new Date(v.date).getMonth() ===
                      new Date(
                        new Date().setMonth(new Date().getMonth() - i)
                      ).getMonth() &&
                    new Date(v.date).getFullYear() ===
                      new Date(
                        new Date().setMonth(new Date().getMonth() - i)
                      ).getFullYear()
                )
                .reduce((acc, v) => (acc += v.totalAmount), 0),
              value2: recordsDisplayed
                .filter((v) => v.category === "expenditure")
                .filter(
                  (v) =>
                    new Date(v.date).getMonth() ===
                      new Date(
                        new Date().setMonth(new Date().getMonth() - i)
                      ).getMonth() &&
                    new Date(v.date).getFullYear() ===
                      new Date(
                        new Date().setMonth(new Date().getMonth() - i)
                      ).getFullYear()
                )
                .reduce((acc, v) => (acc += v.totalAmount), 0),
            };
          }
        ).reverse();
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recordsDisplayed]);

  const customXTick = (props: any) => {
    const { x, y, payload } = props;

    const prevValue = payload.value;

    const weekday = getWeekday(prevValue);

    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={16}
          textAnchor="end"
          fill={
            (weekday === 6 || weekday === 0) && filterTime === "daily"
              ? "rgb(126, 34, 206)"
              : theme === "dark"
              ? "#fff"
              : "#000"
          }
          className={twMerge(
            "text-[0.6rem]",
            (weekday === 6 || weekday === 0) &&
              filterTime === "daily" &&
              "font-bold"
          )}
        >
          {prevValue}
        </text>
      </g>
    );
  };

  const formatYAxisTick = (value: number, index: number) => {
    if (index === 0) {
      return "";
    }
    return `R$ ${value.toFixed(2)}`;
  };

  const renderTooltipContent = (data: any) => {
    if (data.payload && data.payload.length > 0) {
      const { date, value1, value2 } = data.payload[0].payload;

      let formattedDate = "";

      if (filterTime === "daily") {
        const dayOfWeek = format(
          parse(date, "dd/MM", new Date()),
          "EEEE, dd 'de' MMMM",
          { locale: ptBR }
        );

        formattedDate = `${dayOfWeek.charAt(0).toUpperCase()}${dayOfWeek
          .slice(1)
          .replace("-", " ")}`;
      } else {
        formattedDate = format(
          parse(date, "MM/yyyy", new Date()),
          "MMMM 'de' yyyy",
          {
            locale: ptBR,
          }
        );

        formattedDate =
          formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
      }

      return (
        <div className="text-xs">
          <span
            className={twMerge(
              "font-bold"
              // (weekday === 6 || weekday === 0) &&
              //   (value1 >= value2 ? "text-purple-700" : "text-red-700")
            )}
          >
            {formattedDate}
          </span>
          {(filterCategory === "all" || filterCategory === "revenues") && (
            <>
              <br />
              R${" "}
              {value1.toLocaleString("pt-br", {
                minimumFractionDigits: 2,
              })}{" "}
              (Receitas)
            </>
          )}
          {(filterCategory === "all" || filterCategory === "expenditures") && (
            <>
              <br />
              R${" "}
              {value2.toLocaleString("pt-br", {
                minimumFractionDigits: 2,
              })}{" "}
              (Despesas)
            </>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={250} className="mt-6">
      <AreaChart data={data} margin={{ left: -50, right: 10, top: 10 }}>
        <XAxis
          dataKey="date"
          axisLine={{ display: "none" }}
          tick={customXTick}
          tickLine={{ display: "none" }}
          interval="equidistantPreserveStart"
        />
        <YAxis
          tick={{
            fill: theme === "dark" ? "#d1d5db" : "#000",
            fontSize: "0.6rem",
          }}
          display="none"
          tickFormatter={formatYAxisTick}
          axisLine={{ display: "none" }}
          tickLine={{ display: "none" }}
        />
        <defs>
          <linearGradient id="gradient1" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="0%"
              stopColor={
                theme === "dark" ? "rgb(107,33,168)" : "rgb(126, 34, 206)"
              }
            />
            <stop offset="100%" stopColor="rgba(0, 123, 255, 0)" />
          </linearGradient>
          <linearGradient id="gradient2" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="0%"
              stopColor={
                theme === "dark" ? "rgba(174, 4, 4,0.5)" : "rgb(174, 4, 4)"
              }
            />
            <stop offset="100%" stopColor="rgba(255, 0, 0, 0)" />
          </linearGradient>
        </defs>
        <Tooltip content={renderTooltipContent} />
        <Area
          type="monotone"
          dataKey="value2"
          fill="url(#gradient2)"
          stroke={theme === "dark" ? "rgb(115, 5, 5)" : "rgb(159, 2, 2)"}
        />
        <Area
          type="monotone"
          dataKey="value1"
          fill="url(#gradient1)"
          stroke={theme === "dark" ? "rgb(67, 14, 110)" : "rgb(126, 34, 206)"}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
