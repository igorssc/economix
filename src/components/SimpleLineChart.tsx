import { RecordContext } from "@/contexts/recordContext";
import { useContext } from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export function SimpleLineChart() {
  const { allRecordsFromMonthsAgoByMonth } = useContext(RecordContext);

  const data = Array.from(
    { length: Math.floor(allRecordsFromMonthsAgoByMonth.length / 2) },
    (_, i) => {
      return {
        name: new Date(
          new Date().setMonth(new Date().getMonth() - i)
        ).toLocaleDateString("pt-br", { month: "long" }),
        value:
          allRecordsFromMonthsAgoByMonth[i].values.deposits.reduce(
            (acc, v) => (acc += v.amount),
            0
          ) -
          allRecordsFromMonthsAgoByMonth[i].values.withdraws.reduce(
            (acc, v) => (acc += v.amount),
            0
          ),
      };
    }
  ).reverse();

  const formatXAxisTick = (value: string, _index: number) => {
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
          tick={{ fill: "#d1d5db", fontSize: "0.6rem" }}
          tickLine={{ display: "none" }}
          interval="preserveStart"
          tickFormatter={formatXAxisTick}
        />
        <YAxis
          tick={{ fill: "#d1d5db", fontSize: "0.6rem" }}
          display="none"
          tickFormatter={formatYAxisTick}
          axisLine={{ display: "none" }}
          tickLine={{ display: "none" }}
        />
        <defs>
          <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2f8eec" />
            <stop offset="100%" stopColor="rgba(0, 123, 255, 0)" />
          </linearGradient>
        </defs>
        <Tooltip content={renderTooltipContent} />
        <Area
          type="monotone"
          dataKey="value"
          fill="url(#gradient)"
          stroke="#030712"
          dot
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
