import { RecordContext } from "@/contexts/recordContext";
import { ThemeContext } from "@/contexts/themeContext";
import { useContext } from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export function SimpleBarChart() {
  const { allRecordsFromMonthsAgoByMonth } = useContext(RecordContext);
  const { theme } = useContext(ThemeContext);

  const data = Array.from(
    { length: Math.floor(allRecordsFromMonthsAgoByMonth.length / 2) },
    (_, i) => {
      return {
        name: new Date(
          new Date().setMonth(new Date().getMonth() - i)
        ).toLocaleDateString("pt-br", { month: "long" }),
        value: allRecordsFromMonthsAgoByMonth[i].values.withdraws.reduce(
          (acc) => (acc += 1),
          0
        ),
      };
    }
  ).reverse();

  const formatXAxisTick = (value: string) => {
    return value.charAt(0).toUpperCase() + value.slice(1, 3).toLowerCase();
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

      return (
        <div className="text-xs">
          {name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()}
          <br />
          {value} retirada{value > 1 && "s"}
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={250} className="mt-6">
      <BarChart data={data} margin={{ left: -50, right: 10, top: 0 }}>
        <XAxis
          dataKey="name"
          axisLine={false}
          tick={{
            fill: theme === "dark" ? "#d1d5db" : "#000",
            fontSize: "0.6rem",
          }}
          tickLine={false}
          interval="preserveStart"
          tickFormatter={formatXAxisTick}
        />
        <YAxis
          tick={{
            fill: theme === "dark" ? "#d1d5db" : "#000",
            fontSize: "0.6rem",
          }}
          display="none"
          tickFormatter={formatYAxisTick}
          axisLine={false}
          tickLine={false}
        />
        <defs>
          <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#030712" />
            <stop offset="100%" stopColor="rgba(0, 123, 255, 0)" />
          </linearGradient>
        </defs>
        <Tooltip
          content={renderTooltipContent}
          cursor={{ fill: "transparent" }}
        />
        <Bar dataKey="value" fill="url(#gradient)" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
