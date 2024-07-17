import React, { useEffect, useState } from "react";
import { createChart, ChartOptions, ColorType, DeepPartial, ISeriesApi } from "lightweight-charts";
import { useRealTimeChart } from "../../../hooks/useRealTimeChart";

interface ChartComponentProps {
  coin: string;
  time: string;
}

export default function CandleChart({ coin, time }: ChartComponentProps) {
  const { candle } = useRealTimeChart(coin, time);
  const [candlestickSeries, setCandlestickSeries] = useState<ISeriesApi<"Candlestick">>();

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

    const chartContainer = document.getElementById("chart-container");
    if (!chartContainer) return;

    const newChart = createChart(chartContainer, chartOptions);
    const newCandlestickSeries = newChart.addCandlestickSeries({
      upColor: "#26a69a",
      downColor: "#ef5350",
      borderVisible: false,
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
    });

    newChart.timeScale().fitContent();
    newChart.timeScale().applyOptions({
      timeVisible: true,
      secondsVisible: false,
    });

    setCandlestickSeries(newCandlestickSeries);

    const resizeChart = () => {
      if (newChart) {
        newChart.resize(chartContainer.clientWidth, 600);
      }
    };

    window.addEventListener("resize", resizeChart);

    return () => {
      if (newChart) {
        newChart.remove();
      }
      window.removeEventListener("resize", resizeChart);
    };
  }, [coin, time]);

  useEffect(() => {
    if (candle && candlestickSeries) {
      candlestickSeries.update(candle);
    }
  }, [candle]);

  return (
    <div
      id="chart-container"
      style={{ width: "100%", height: "100%", minHeight: "400px" }}
    ></div>
  );
}
