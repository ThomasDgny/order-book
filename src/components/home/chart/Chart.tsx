import React, { useEffect, useState } from "react";
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

export default function ChartComponent({ coin, time }: { coin: string; time: string }) {
  const [coinData, setCoinData] = useState<CandlestickData<Time>[]>([]);

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

    const chart = createChart(
      document.getElementById("chart-container") as string | HTMLElement,
      chartOptions
    );

    const candlestickSeries = chart.addCandlestickSeries({
      upColor: "#26a69a",
      downColor: "#ef5350",
      borderVisible: false,
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
    });

    chart.timeScale().fitContent();

    const updateChartData = (message: KlinePayload) => {
      const candlestick = message.k;
      if (candlestick.i !== time) return;

      const newData: CandlestickData<Time> = {
        time: candlestick.t / 1000 as Time,
        open: parseFloat(candlestick.o),
        high: parseFloat(candlestick.h),
        low: parseFloat(candlestick.l),
        close: parseFloat(candlestick.c),
      };

      setCoinData((prev) => [...prev, newData]);
      candlestickSeries.update(newData);
    };
    const binanceSocket = new WebSocket(`${BINANCE_WS_URL}/${coin}@kline_${time}`);

    binanceSocket.onmessage = function (event) {
      const message: KlinePayload = JSON.parse(event.data);
      console.log(message)
      updateChartData(message);
    };

    return () => {
      chart.remove();
      binanceSocket.close();
    };
  }, [coin, time]);

  return (
    <div id="chart-container" style={{ width: "100%", height: "600px" }}></div>
  );
}
