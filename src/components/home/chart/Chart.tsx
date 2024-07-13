import React, { useEffect } from "react";
import {
  ChartOptions,
  ColorType,
  createChart,
  DeepPartial,
  CandlestickData,
  Time,
} from "lightweight-charts";
import { BINANCE_WS_URL } from "../../../constants/constants";
import { KlinePayload } from "../../../types/types";

export default function ChartComponent({
  coin,
  time,
}: {
  coin: string;
  time: string;
}) {
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

    let chart: ReturnType<typeof createChart>;
    let candlestickSeries: any;

    const createOrUpdateChart = () => {
      const container = document.getElementById("chart-container");
      if (!container) return;

      if (!chart) {
        chart = createChart(container, chartOptions);

        candlestickSeries = chart.addCandlestickSeries({
          upColor: "#26a69a",
          downColor: "#ef5350",
          borderVisible: false,
          wickUpColor: "#26a69a",
          wickDownColor: "#ef5350",
        });

        chart.timeScale().fitContent();
      } else {
        chart.resize(container.clientWidth, 600);
      }
    };

    const updateChartData = (message: KlinePayload) => {
      const candlestick = message.k;
      if (candlestick.i !== time) return;

      const newData: CandlestickData<Time> = {
        time: (candlestick.t / 1000) as Time,
        open: parseFloat(candlestick.o),
        high: parseFloat(candlestick.h),
        low: parseFloat(candlestick.l),
        close: parseFloat(candlestick.c),
      };

      const timeScale = chart.timeScale();
      timeScale.applyOptions({
        timeVisible: true,
        secondsVisible: false,
      });

      candlestickSeries.update(newData);
    };

    const binanceSocket = new WebSocket(
      `${BINANCE_WS_URL}/${coin}@kline_${time}`
    );

    binanceSocket.onmessage = function (event) {
      const message: KlinePayload = JSON.parse(event.data);
      updateChartData(message);
    };

    window.addEventListener("resize", createOrUpdateChart);

    createOrUpdateChart();

    return () => {
      window.removeEventListener("resize", createOrUpdateChart);
      if (chart) {
        chart.remove();
      }
      binanceSocket.close();
    };
  }, [coin, time]);

  return (
    <div
      id="chart-container"
      style={{ width: "100%", height: "100%", minHeight: "400px" }}
    ></div>
  );
}
