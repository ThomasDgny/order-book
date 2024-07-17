import { useEffect, useState } from "react";
import { KlinePayload } from "../types/types";
import { BINANCE_WS_URL } from "../constants/constants";

export const useRealTimeChart = (coin: string, time: string) => {
  const [chartData, setChartData] = useState<KlinePayload[]>([]);

  useEffect(() => {
    const binanceSocket = new WebSocket(`${BINANCE_WS_URL}/${coin}@kline_${time}`);

    binanceSocket.onmessage = (event) => {
      const message: KlinePayload = JSON.parse(event.data);
      setChartData((prevData) => [...prevData, message]);
    };

    return () => {
      binanceSocket.close();
    };
  }, [coin, time]);

  return chartData;
};
