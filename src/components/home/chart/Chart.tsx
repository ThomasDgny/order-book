import React, { useEffect, useRef } from "react";
import {
  createChart,
  ChartOptions,
  ColorType,
  DeepPartial,
  Time,
  ISeriesApi,
} from "lightweight-charts";
import { useRealTimeChart } from "../../../hooks/useRealTimeChart";

export default function ChartComponent({
  coin,
  time,
}: {
  coin: string;
  time: string;
}) {
  const chartData = useRealTimeChart(coin, time);
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<ReturnType<typeof createChart>>();
  const candlestickSeriesRef = useRef<ISeriesApi<"Candlestick">>();

  useEffect(() => {
    const chartOptions: DeepPartial<ChartOptions> = {
      layout: {
        textColor: "#020617",
        background: { type: ColorType.Solid, color: "#f8fafc" },
      },
      grid: {
        horzLines: {
          color: "#94a3b8",
        },
      },
    };

    if (chartContainerRef.current) {
      chartRef.current = createChart(chartContainerRef.current, chartOptions);
      candlestickSeriesRef.current = chartRef.current.addCandlestickSeries({
        upColor: "#26a69a",
        downColor: "#ef5350",
        borderVisible: false,
        wickUpColor: "#26a69a",
        wickDownColor: "#ef5350",
      });
      chartRef.current.timeScale().fitContent();

      const timeScale = chartRef.current.timeScale();
      timeScale.applyOptions({
        timeVisible: true,
        secondsVisible: false,
      });
    }

    const resizeChart = () => {
      if (chartRef.current && chartContainerRef.current) {
        chartRef.current.resize(chartContainerRef.current.clientWidth, 600);
      }
    };

    window.addEventListener("resize", resizeChart);

    return () => {
      if (chartRef.current) {
        chartRef.current.remove();
      }
      window.removeEventListener("resize", resizeChart);
    };
  }, []);

  useEffect(() => {
    if (chartData.length > 0 && candlestickSeriesRef.current) {
      const latestData = chartData[chartData.length - 1];
      const candlestick = latestData.k;

      if (candlestick.i === time) {
        const newData = {
          time: (candlestick.t / 1000) as Time,
          open: parseFloat(candlestick.o),
          high: parseFloat(candlestick.h),
          low: parseFloat(candlestick.l),
          close: parseFloat(candlestick.c),
        };

        candlestickSeriesRef.current.update(newData);
      }
    }
  }, [chartData, time]);

  return (
    <div
      id="chart-container"
      ref={chartContainerRef}
      style={{ width: "100%", height: "100%", minHeight: "400px" }}
    ></div>
  );
}
