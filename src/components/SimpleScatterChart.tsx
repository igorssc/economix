import { RecordContext } from "@/contexts/recordContext";
import { formatDistanceStrict } from "date-fns";
import { useContext, useEffect, useState } from "react";
import {
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export function SimpleScatterChart() {
  const { allRecordsFrom30DaysAgo } = useContext(RecordContext);

  const [dataWithdraws, setDataWithdraws] = useState(
    [] as { x: number; y: number }[]
  );

  const [dataDeposits, setDataDeposits] = useState(
    [] as { x: number; y: number }[]
  );

  useEffect(() => {
    allRecordsFrom30DaysAgo.forEach((v) => {
      const distance = +formatDistanceStrict(new Date(), new Date(v.date), {
        unit: "day",
        addSuffix: false,
      }).split(" ")[0];

      if (v.category === "deposit") {
        setDataDeposits((prev) => [
          ...prev,
          {
            x: distance,
            y:
              new Date(v.date).getHours() * 60 * 60 +
              new Date(v.date).getMinutes() * 60,
          },
        ]);
      } else {
        setDataWithdraws((prev) => [
          ...prev,
          {
            x: distance,
            y:
              new Date(v.date).getHours() * 60 * 60 +
              new Date(v.date).getMinutes() * 60,
          },
        ]);
      }
    });
  }, [allRecordsFrom30DaysAgo]);

  const formatYAxisTick = (value: any, index: number) => {
    if (index === 0) {
      return "";
    }
    return (value / 60 / 60 === 24 ? "00" : value / 60 / 60) + ":00";
  };

  const formatXAxisTick = (value: any, index: number) => {
    if (new Date().getDate() - value <= 30) {
      return new Date(
        new Date().setDate(new Date().getDate() - value)
      ).toLocaleDateString("pt-br", { day: "2-digit", month: "2-digit" });
    }

    return "";
  };

  const renderTooltipContent = (data: any) => {
    if (data.payload && data.payload.length > 0) {
      const { x, y } = data.payload[0].payload;
      return (
        <div className="text-xs">
          {new Date(
            new Date().setDate(new Date().getDate() - x)
          ).toLocaleDateString("pt-br", { day: "2-digit", month: "2-digit" })}
          <br />
          {("00" + Math.floor(y / 60 / 60)).slice(-2) +
            ":" +
            (
              "00" + Math.floor((y / 60 / 60 - Math.floor(y / 60 / 60)) * 60)
            ).slice(-2)}
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
          tick={{ fill: "#d1d5db", fontSize: "0.6rem" }}
          axisLine={{ display: "none" }}
          tickLine={{ display: "none" }}
          tickFormatter={formatXAxisTick}
          interval="preserveStartEnd"
        />
        <YAxis
          type="number"
          dataKey="y"
          name="Horas"
          tick={{ fill: "#d1d5db", fontSize: "0.6rem" }}
          axisLine={{ display: "none" }}
          tickLine={{ display: "none" }}
          tickFormatter={formatYAxisTick}
          ticks={[0, 14400, 28800, 43200, 57600, 72000, 86400]}
        />
        <Tooltip
          cursor={{ strokeDasharray: "3 3" }}
          content={renderTooltipContent}
        />
        <Scatter data={dataDeposits} fill="#2f8eec" />
        <Scatter data={dataWithdraws} fill="#ec4e2f" />
      </ScatterChart>
    </ResponsiveContainer>
  );
}
