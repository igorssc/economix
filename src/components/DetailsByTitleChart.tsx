import { RecordType } from "@/contexts/recordContext";
import { ThemeContext } from "@/contexts/themeContext";
import { getWeekday } from "@/utils/getWeekday";
import { differenceInDays, subMonths } from "date-fns";
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

interface DetailsByTitleChartProps {
  records: RecordType[];
  scheme?: "primary" | "secondary";
  period?: number;
}

export function DetailsByTitleChart({
  records,
  scheme = "primary",
  period,
}: DetailsByTitleChartProps) {
  const { theme } = useContext(ThemeContext);

  const [data, setData] = useState(
    [] as {
      name: string;
      value: number;
    }[]
  );

  const id = `chart-${(Math.random() * 1000000).toFixed(0)}`;

  useEffect(() => {
    setData(
      Array.from(
        {
          length: period
            ? period === 1
              ? 30
              : differenceInDays(
                  new Date(),
                  new Date(
                    subMonths(new Date(), period).setDate(new Date().getDate())
                  )
                )
            : 30,
        },
        (_, i) => {
          return {
            name: new Date(
              new Date().setDate(new Date().getDate() - i)
            ).toLocaleDateString("pt-br", { month: "2-digit", day: "2-digit" }),
            value: records
              .filter(
                (v) =>
                  new Date(v.date).getDate() ===
                    new Date(
                      new Date().setDate(new Date().getDate() - i)
                    ).getDate() &&
                  new Date(v.date).getMonth() ===
                    new Date(
                      new Date().setDate(new Date().getDate() - i)
                    ).getMonth()
              )
              .reduce((acc, v) => (acc += v.amount), 0),
          };
        }
      ).reverse()
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [records]);

  const customXTick = (props: any) => {
    const { x, y, payload } = props;

    const weekday = getWeekday(payload.value);

    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={16}
          textAnchor="end"
          fill={
            weekday === 6 || weekday === 0
              ? scheme === "primary"
                ? "rgb(126, 34, 206)"
                : "rgb(159, 2, 2)"
              : "#000"
          }
          className="text-[0.6rem] font-bold"
        >
          {payload.value}
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
      const { name, value } = data.payload[0].payload;

      const weekday = getWeekday(name);

      return (
        <div className="text-xs">
          <span
            className={twMerge(
              "",
              weekday === 6 || weekday === 0
                ? scheme === "primary"
                  ? "font-bold text-purple-700"
                  : "font-bold text-red-700"
                : ""
            )}
          >
            {name}
          </span>
          {/* {name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()} */}
          <br />
          R$ {value.toLocaleString("pt-br", { minimumFractionDigits: 2 })}
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={250} className="mt-6">
      <AreaChart data={data} margin={{ left: -50, right: 10, top: 0 }}>
        <XAxis
          dataKey="name"
          axisLine={{ display: "none" }}
          tick={customXTick}
          tickLine={{ display: "none" }}
          interval="preserveStart"
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
          <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
            {scheme === "primary" ? (
              <>
                <stop offset="0%" stopColor="rgb(107,33,168)" />
                <stop offset="100%" stopColor="rgba(0, 123, 255, 0)" />
              </>
            ) : (
              <>
                <stop offset="0%" stopColor="rgb(159, 2, 2)" />
                <stop offset="100%" stopColor="rgba(255, 0, 0, 0)" />
              </>
            )}
          </linearGradient>
        </defs>
        <Tooltip content={renderTooltipContent} />
        <Area
          type="monotone"
          dataKey="value"
          {...(scheme === "primary"
            ? {
                stroke:
                  theme === "dark" ? "rgb(88,28,135)" : "rgb(126, 34, 206)",
              }
            : {
                stroke: theme === "dark" ? "rgb(115, 5, 5)" : "rgb(159, 2, 2)",
              })}
          fill={`url(#${id})`}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
