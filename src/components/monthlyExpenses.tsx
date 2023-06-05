import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export function MonthlyExpenses() {
  const data = [
    { name: "Janeiro", value: 65 },
    { name: "Fevereiro", value: 59 },
    { name: "Março", value: 80 },
    { name: "Abril", value: 81 },
    { name: "Maio", value: 56 },
    { name: "Junho", value: 55 },
  ];

  const formatYAxisTick = (value: any, index: number) => {
    if (index === 0) {
      return "";
    }
    return value;
  };

  const renderTooltipContent = (data: any) => {
    if (data.payload && data.payload.length > 0) {
      const { value } = data.payload[0];
      return <div>{value}</div>;
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={300} className="mt-6">
      <AreaChart data={data} margin={{ left: -25, right: -25, top: 25 }}>
        <XAxis
          dataKey="name"
          axisLine={{ display: "none" }}
          tick={{ fill: "#d1d5db" }}
          tickLine={{ display: "none" }}
        />
        <YAxis
          tick={{ fill: "#d1d5db" }}
          tickFormatter={formatYAxisTick}
          axisLine={{ display: "none" }}
          tickLine={{ display: "none" }}
        />
        <defs>
          <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#030712" />
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
