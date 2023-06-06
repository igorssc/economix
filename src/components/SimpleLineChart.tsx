import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export function SimpleLineChart() {
  const data = [
    { name: "Janeiro", value: 65 },
    { name: "Fevereiro", value: 59 },
    { name: "Março", value: -80 },
    { name: "Abril", value: 81 },
    { name: "Maio", value: 56 },
    { name: "Junho", value: 55 },
    { name: "Julho", value: 12 },
  ];

  const formatXAxisTick = (value: string, _index: number) => {
    return value.slice(0, 3);
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
          {name}
          <br />
          R$ {value}
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
