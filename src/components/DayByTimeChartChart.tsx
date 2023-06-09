import { RecordType } from "@/contexts/recordContext";
import { ThemeContext } from "@/contexts/themeContext";
import { getWeekday } from "@/utils/getWeekday";
import { differenceInCalendarDays, format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useContext, useEffect, useState } from "react";
import {
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { twMerge } from "tailwind-merge";

type DataType = {
  x: number;
  y: number;
  category: string;
  title: string;
};
interface DayByTimeChartChartProps {
  records: RecordType[];
  period?: number;
}

export function DayByTimeChartChart({
  records,
  period,
}: DayByTimeChartChartProps) {
  const { theme } = useContext(ThemeContext);

  const [dataExpenditures, setDataExpenditures] = useState([] as DataType[]);

  const [dataRevenues, setDataRevenues] = useState([] as DataType[]);

  const [dataEmpty, setDataEmpty] = useState([] as { x: number; y: number }[]);

  useEffect(() => {
    const revenuesPrev = [] as DataType[];
    const expendituresPrev = [] as DataType[];

    records.forEach((v) => {
      const distance = differenceInCalendarDays(new Date(), new Date(v.date));

      if (v.category === "revenue") {
        revenuesPrev.push({
          x: distance,
          y:
            new Date(v.date).getHours() * 60 * 60 +
            new Date(v.date).getMinutes() * 60,
          category: "revenue",
          title: v.title,
        });
      } else {
        expendituresPrev.push({
          x: distance,
          y:
            new Date(v.date).getHours() * 60 * 60 +
            new Date(v.date).getMinutes() * 60,
          category: "expenditure",
          title: v.title,
        });
      }
    });

    const distance = differenceInCalendarDays(
      new Date(),
      new Date(new Date().setMonth(new Date().getMonth() - (period || 1)))
    );

    const emptyPrev = Array.from({ length: distance }, (_, i) => ({
      x: 0 + i,
      y: 0,
      type: "empty",
    }));

    console.log(emptyPrev);

    setDataEmpty(emptyPrev);

    setDataExpenditures(expendituresPrev);
    setDataRevenues(revenuesPrev);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [records]);

  const formatYAxisTick = (value: any, index: number) => {
    if (index === 0) {
      return "";
    }
    return (value / 60 / 60 === 24 ? "00" : value / 60 / 60) + ":00";
  };

  const customXTick = (props: any) => {
    const { x, y, payload } = props;

    const prevValue = new Date(
      new Date().setDate(new Date().getDate() - payload.value)
    ).toLocaleDateString("pt-br", { day: "2-digit", month: "2-digit" });

    const weekday = getWeekday(prevValue);

    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={16}
          textAnchor="end"
          fill={
            weekday === 6 || weekday === 0
              ? "rgb(126, 34, 206)"
              : theme === "dark"
              ? "#fff"
              : "#000"
          }
          className={twMerge(
            "text-[0.6rem]",
            (weekday === 6 || weekday === 0) && "font-bold"
          )}
        >
          {prevValue}
        </text>
      </g>
    );
  };

  const renderTooltipContent = (data: any) => {
    if (data.payload && data.payload.length > 0) {
      const { x, y, type } = data.payload[0].payload;

      const prevValue = new Date(new Date().setDate(new Date().getDate() - x));

      const dayOfWeek = format(prevValue, "EEEE, dd 'de' MMMM", {
        locale: ptBR,
      });
      const formattedDate = `${dayOfWeek.charAt(0).toUpperCase()}${dayOfWeek
        .slice(1)
        .replace("-", " ")}`;

      if (type === "empty") {
        return null;
      }

      return (
        <div className="text-xs">
          {formattedDate}
          <br />
          <span
            className={twMerge(
              "font-bold",
              data.payload[0].payload.category === "revenue"
                ? "text-purple-700"
                : "text-red-700"
            )}
          >
            {data.payload[0].payload.title}
          </span>
          <br />
          {("00" + Math.floor(y / 60 / 60)).slice(-2) +
            "h:" +
            (
              "00" + Math.floor((y / 60 / 60 - Math.floor(y / 60 / 60)) * 60)
            ).slice(-2)}
          min
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <ScatterChart margin={{ left: -25, right: 10, top: 10 }}>
        <XAxis
          type="number"
          dataKey="x"
          name="Dia"
          reversed
          tick={customXTick}
          axisLine={{ display: "none" }}
          tickLine={{ display: "none" }}
          interval="preserveStartEnd"
        />
        <YAxis
          type="number"
          dataKey="y"
          name="Horas"
          tick={{
            fill: theme === "dark" ? "#d1d5db" : "#000",
            fontSize: "0.6rem",
          }}
          axisLine={{ display: "none" }}
          tickLine={{ display: "none" }}
          tickFormatter={formatYAxisTick}
          ticks={[0, 14400, 28800, 43200, 57600, 72000, 86400]}
        />
        <Tooltip
          cursor={{ strokeDasharray: "3 3" }}
          content={renderTooltipContent}
        />
        <Scatter
          data={dataRevenues}
          fill={theme === "dark" ? "rgb(107,33,168)" : "rgb(126, 34, 206)"}
        />
        <Scatter data={dataEmpty} fill={"transparent"} />
        <Scatter
          data={dataExpenditures}
          fill={theme === "dark" ? "rgba(174, 4, 4,0.5)" : "rgb(174, 4, 4)"}
        />
      </ScatterChart>
    </ResponsiveContainer>
  );
}
