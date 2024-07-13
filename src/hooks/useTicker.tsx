import { useCallback, useEffect, useState } from "react";
import { BINANCE_WS_URL } from "../constants/constants";
import { TickerData } from "../types/types";
import useWebSocket from "react-use-websocket";

export const useTicker = (coinID: string) => {
  const [subscriptionId, setSubscriptionId] = useState<number | null>(null);
  const [tickerData, setTickerData] = useState<TickerData>({
    markPrice: 0,
    volume: 0,
    high: 0,
    low: 0,
    change: 0,
  });

  const { sendJsonMessage } = useWebSocket(BINANCE_WS_URL, {
    shouldReconnect: () => true,
    onOpen: () => {
      console.log("WebSocket connection opened for ticker.");
      connectTicker(coinID);
    },
    onClose: () => console.log("WebSocket connection closed for ticker."),
    onMessage: (event: WebSocketEventMap["message"]) => {
      const data = JSON.parse(event.data);
      if (data.e === "24hrTicker") {
        processTickerData(data);
      }
    },
  });

  const unsubscribe = useCallback(
    (id: number, coin: string) => {
      const unsubscribeMessage = {
        method: "UNSUBSCRIBE",
        params: [`${coin}@ticker`],
        id: id,
      };

      sendJsonMessage(unsubscribeMessage);
      console.log(`Unsubscribed from ${coin} with id ${id}`);
    },
    [sendJsonMessage]
  );

  const subscribe = useCallback(
    (product: string) => {
      if (subscriptionId !== null) {
        unsubscribe(subscriptionId, product);
      }

      const id = 2;
      setSubscriptionId(id);

      const subscribeMessage = {
        method: "SUBSCRIBE",
        params: [`${product}@ticker`],
        id: id,
      };

      sendJsonMessage(subscribeMessage);
      console.log(`Subscribed to ${product} with id ${id}`);
    },
    [sendJsonMessage, subscriptionId, unsubscribe]
  );

  const connectTicker = useCallback(
    (product: string) => {
      const subscribeMessage = {
        method: "SUBSCRIBE",
        params: [`${product}@ticker`],
        id: 1,
      };

      sendJsonMessage(subscribeMessage);
    },
    [sendJsonMessage]
  );

  const processTickerData = useCallback((data: any) => {
    const { c, v, h, l, p } = data;
    setTickerData({
      markPrice: parseFloat(c),
      volume: parseFloat(v),
      high: parseFloat(h),
      low: parseFloat(l),
      change: parseFloat(p),
    });
  }, []);

  useEffect(() => {
    subscribe(coinID);

    return () => {
      if (subscriptionId !== null) {
        unsubscribe(subscriptionId, coinID);
        console.log(`Unsubscribed from ${coinID}`);
      }
    };
  }, [coinID, subscribe, unsubscribe, subscriptionId]);

  return { tickerData };
};
