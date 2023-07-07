import { RecordContext, RecordType } from "@/contexts/recordContext";
import { ThemeContext } from "@/contexts/themeContext";
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

interface MonthlyChartProps {
  recordsInit?: RecordType[] | null;
  period?: number;
}

export function MonthlyChart({ recordsInit, period }: MonthlyChartProps) {
  const { allRecordsFrom30DaysAgo } = useContext(RecordContext);
  const { theme } = useContext(ThemeContext);

  const [data, setData] = useState(
    [] as {
      name: string;
      value1: number;
      value2: number;
    }[]
  );

  const [recordsDisplayed, setRecordsDisplayed] = useState<RecordType[]>([]);

  useEffect(() => {
    if (recordsInit) {
      setRecordsDisplayed(recordsInit);
    } else {
      setRecordsDisplayed(allRecordsFrom30DaysAgo);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!recordsInit) {
      setRecordsDisplayed(allRecordsFrom30DaysAgo);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allRecordsFrom30DaysAgo]);

  useEffect(() => {
    recordsInit && setRecordsDisplayed(recordsInit);
  }, [recordsInit]);

  useEffect(() => {
    setData(
      Array.from(
        {
          length:
            recordsInit && period
              ? differenceInDays(
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
                    ).getMonth()
              )
              .reduce((acc, v) => (acc += v.amount), 0),
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
                    ).getMonth()
              )
              .reduce((acc, v) => (acc += v.amount), 0),
          };
        }
      ).reverse()
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recordsDisplayed]);

  const formatXAxisTick = (value: string, _index: number) => {
    return value;
  };

  const formatYAxisTick = (value: number, index: number) => {
    if (index === 0) {
      return "";
    }
    return `R$ ${value.toFixed(2)}`;
  };

  const renderTooltipContent = (data: any) => {
    if (data.payload && data.payload.length > 0) {
      const { name, value1, value2 } = data.payload[0].payload;
      return (
        <div className="text-xs">
          {name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()}
          <br />
          R$ {value1.toLocaleString("pt-br", { minimumFractionDigits: 2 })}{" "}
          (Receitas)
          <br />
          R$ {value2.toLocaleString("pt-br", { minimumFractionDigits: 2 })}{" "}
          (Despesas)
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={250} className="mt-6">
      <AreaChart data={data} margin={{ left: -50, right: 10, top: 10 }}>
        <XAxis
          dataKey="name"
          axisLine={{ display: "none" }}
          tick={{
            fill: theme === "dark" ? "#d1d5db" : "#000",
            fontSize: "0.6rem",
          }}
          tickLine={{ display: "none" }}
          interval="equidistantPreserveStart"
          tickFormatter={formatXAxisTick}
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
