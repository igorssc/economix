import {
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { x: 1, y: 200 },
  { x: 3, y: 100 },
  { x: 6, y: 300 },
  { x: 9, y: 250 },
  { x: 12, y: 450 },
  { x: 15, y: 280 },
];

const formatYAxisTick = (value: any, index: number) => {
  if (index === 0) {
    return "";
  }
  return value;
};

export function SimpleScatterChart() {
  const renderTooltipContent = (data: any) => {
    if (data.payload && data.payload.length > 0) {
      const { x, y } = data.payload[0].payload;
      return (
        <div className="text-xs">
          {`Dia ${x}`}
          <br />
          {`Horas do dia: ${y}`}
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <ScatterChart margin={{ left: -30, right: 0, top: 10 }}>
        <XAxis
          type="number"
          dataKey="x"
          name="Dia"
          tick={{ fill: "#d1d5db", fontSize: "0.6rem" }}
          axisLine={{ display: "none" }}
          tickLine={{ display: "none" }}
        />
        <YAxis
          type="number"
          dataKey="y"
          name="Horas"
          tick={{ fill: "#d1d5db", fontSize: "0.6rem" }}
          axisLine={{ display: "none" }}
          tickLine={{ display: "none" }}
          tickFormatter={formatYAxisTick}
        />
        <Tooltip
          cursor={{ strokeDasharray: "3 3" }}
          content={renderTooltipContent}
        />
        <Scatter name="A school" data={data} fill="#2f8eec" />
      </ScatterChart>
    </ResponsiveContainer>
  );
}
