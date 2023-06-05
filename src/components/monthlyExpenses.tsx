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
    { name: "Jan", value: 65 },
    { name: "Fev", value: 59 },
    { name: "Mar", value: 80 },
    { name: "Abr", value: 81 },
    { name: "Mai", value: 56 },
    { name: "Jun", value: 55 },
    { name: "Jul", value: 12 },
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
          tick={{ fill: "#d1d5db", fontSize: "0.6rem" }}
          tickLine={{ display: "none" }}
          interval="preserveStart"
        />
        <YAxis
          tick={{ fill: "#d1d5db", fontSize: "0.6rem" }}
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
