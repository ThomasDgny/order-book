import { useEffect, useState } from "react";
import { KlinePayload } from "../types/types";
import { BINANCE_WS_URL } from "../constants/constants";
import { Time } from "lightweight-charts";

export const useRealTimeChart = (coin: string, time: string) => {
  const [candle, setCandle] = useState<any>();

  const updateChartData = (message: KlinePayload) => {
    const candlestick = message.k;
    if (candlestick.i !== time) return undefined;

    const newData = {
      time: (candlestick.t / 1000) as Time,
      open: parseFloat(candlestick.o),
      high: parseFloat(candlestick.h),
      low: parseFloat(candlestick.l),
      close: parseFloat(candlestick.c),
    };
    return newData;
  };

  useEffect(() => {
    const webSocket = new WebSocket(`${BINANCE_WS_URL}/${coin}@kline_${time}`);
    webSocket.onmessage = (event) => {
      const message: KlinePayload = JSON.parse(event.data);
      const formattedCandleData = updateChartData(message)
      setCandle(formattedCandleData);
    };

    console.log(candle);
    return () => {
      if (webSocket) {
        webSocket.close();
      }
    };
  }, [coin, time]);

  return {  candle };
};
