import { RecordContext } from "@/contexts/recordContext";
import { ThemeContext } from "@/contexts/themeContext";
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

export function DayByTimeChartChart() {
  const { allRecordsFrom30DaysAgo } = useContext(RecordContext);
  const { theme } = useContext(ThemeContext);

  const [dataExpenditures, setDataExpenditures] = useState(
    [] as { x: number; y: number }[]
  );

  const [dataRevenues, setDataRevenues] = useState(
    [] as { x: number; y: number }[]
  );

  useEffect(() => {
    allRecordsFrom30DaysAgo.forEach((v) => {
      const distance = +formatDistanceStrict(new Date(), new Date(v.date), {
        unit: "day",
        addSuffix: false,
      }).split(" ")[0];

      if (v.category === "revenue") {
        setDataRevenues((prev) => [
          ...prev,
          {
            x: distance,
            y:
              new Date(v.date).getHours() * 60 * 60 +
              new Date(v.date).getMinutes() * 60,
          },
        ]);
      } else {
        setDataExpenditures((prev) => [
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
          tick={{
            fill: theme === "dark" ? "#d1d5db" : "#000",
            fontSize: "0.6rem",
          }}
          axisLine={{ display: "none" }}
          tickLine={{ display: "none" }}
          tickFormatter={formatXAxisTick}
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
        <Scatter
          data={dataExpenditures}
          fill={theme === "dark" ? "rgba(174, 4, 4,0.5)" : "rgb(174, 4, 4)"}
        />
      </ScatterChart>
    </ResponsiveContainer>
  );
}
