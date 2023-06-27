import { RecordContext } from "@/contexts/recordContext";
import { ThemeContext } from "@/contexts/themeContext";
import { useContext, useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export function AnnualDataChart() {
  const { allRecordsFromMonthsAgoByMonth } = useContext(RecordContext);
  const { theme } = useContext(ThemeContext);

  const [data, setData] = useState(
    [] as {
      name: string;
      value1: number;
      value2: number;
    }[]
  );

  useEffect(() => {
    setData(
      Array.from({ length: allRecordsFromMonthsAgoByMonth.length }, (_, i) => {
        return {
          name: new Date(
            new Date().setMonth(new Date().getMonth() - i)
          ).toLocaleDateString("pt-br", { month: "long" }),
          value1: allRecordsFromMonthsAgoByMonth[i].values.revenues.reduce(
            (acc, v) => (acc += v.amount),
            0
          ),
          value2: allRecordsFromMonthsAgoByMonth[i].values.expenditures.reduce(
            (acc, v) => (acc += v.amount),
            0
          ),
        };
      }).reverse()
    );
  }, [allRecordsFromMonthsAgoByMonth]);

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

  const CustomizedDotRevenue = (props: any) => {
    const { cx, cy, stroke, payload, value } = props;

    if (value[1] >= payload.value2) {
      return (
        <svg
          x={cx - 10}
          y={cy - 10}
          width={20}
          height={20}
          fill={theme === "dark" ? "rgb(88,28,135)" : "rgb(126, 34, 206)"}
          viewBox="0 0 1024 1024"
        >
          <path d="M512 1009.984c-274.912 0-497.76-222.848-497.76-497.76s222.848-497.76 497.76-497.76c274.912 0 497.76 222.848 497.76 497.76s-222.848 497.76-497.76 497.76zM340.768 295.936c-39.488 0-71.52 32.8-71.52 73.248s32.032 73.248 71.52 73.248c39.488 0 71.52-32.8 71.52-73.248s-32.032-73.248-71.52-73.248zM686.176 296.704c-39.488 0-71.52 32.8-71.52 73.248s32.032 73.248 71.52 73.248c39.488 0 71.52-32.8 71.52-73.248s-32.032-73.248-71.52-73.248zM772.928 555.392c-18.752-8.864-40.928-0.576-49.632 18.528-40.224 88.576-120.256 143.552-208.832 143.552-85.952 0-164.864-52.64-205.952-137.376-9.184-18.912-31.648-26.592-50.08-17.28-18.464 9.408-21.216 21.472-15.936 32.64 52.8 111.424 155.232 186.784 269.76 186.784 117.984 0 217.12-70.944 269.76-186.784 8.672-19.136 9.568-31.2-9.12-40.096z" />
        </svg>
      );
    }
    return null;
  };

  const CustomizedDotExpenditure = (props: any) => {
    const { cx, cy, stroke, payload, value } = props;

    if (value[1] > payload.value1) {
      return (
        <svg
          x={cx - 10}
          y={cy - 10}
          width={20}
          height={20}
          fill={theme === "dark" ? "rgba(174, 4, 4,0.5)" : "rgb(174, 4, 4)"}
          viewBox="0 0 1024 1024"
        >
          <path d="M517.12 53.248q95.232 0 179.2 36.352t145.92 98.304 98.304 145.92 36.352 179.2-36.352 179.2-98.304 145.92-145.92 98.304-179.2 36.352-179.2-36.352-145.92-98.304-98.304-145.92-36.352-179.2 36.352-179.2 98.304-145.92 145.92-98.304 179.2-36.352zM663.552 261.12q-15.36 0-28.16 6.656t-23.04 18.432-15.872 27.648-5.632 33.28q0 35.84 21.504 61.44t51.2 25.6 51.2-25.6 21.504-61.44q0-17.408-5.632-33.28t-15.872-27.648-23.04-18.432-28.16-6.656zM373.76 261.12q-29.696 0-50.688 25.088t-20.992 60.928 20.992 61.44 50.688 25.6 50.176-25.6 20.48-61.44-20.48-60.928-50.176-25.088zM520.192 602.112q-51.2 0-97.28 9.728t-82.944 27.648-62.464 41.472-35.84 51.2q-1.024 1.024-1.024 2.048-1.024 3.072-1.024 8.704t2.56 11.776 7.168 11.264 12.8 6.144q25.6-27.648 62.464-50.176 31.744-19.456 79.36-35.328t114.176-15.872q67.584 0 116.736 15.872t81.92 35.328q37.888 22.528 63.488 50.176 17.408-5.12 19.968-18.944t0.512-18.944-3.072-7.168-1.024-3.072q-26.624-55.296-100.352-88.576t-176.128-33.28z" />
        </svg>
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
          dot={<CustomizedDotExpenditure />}
        />
        <Area
          type="monotone"
          dataKey="value1"
          fill="url(#gradient1)"
          stroke={theme === "dark" ? "rgb(67, 14, 110)" : "rgb(126, 34, 206)"}
          dot={<CustomizedDotRevenue />}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
