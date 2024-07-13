import { useCallback, useEffect, useState } from "react";
import { BINANCE_WS_URL } from "../constants/constants";
import { OrderBookEntry } from "../types/types";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { calculateRunningTotal, manageArraySize } from "../helper/orderHelper";

export const useOrderBook = (coinID: string) => {
  const [subscriptionId, setSubscriptionId] = useState<number | null>(null);
  const [currentBids, setCurrentBids] = useState<OrderBookEntry[]>([]);
  const [currentAsks, setCurrentAsks] = useState<OrderBookEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const { sendJsonMessage, readyState } = useWebSocket(BINANCE_WS_URL, {
    shouldReconnect: () => true,
    onOpen: () => {
      console.log("WebSocket connection opened.");
      subscribe(coinID);
    },
    onClose: () => {
      console.log("WebSocket connection closed.");
      setSubscriptionId(null);
    },
    onError: (event) => {
      console.error("WebSocket error:", event);
    },
    onMessage: (event: WebSocketEventMap["message"]) => {
      const data = JSON.parse(event.data);
      if (data.e === "depthUpdate") {
        processOrderBookData(data);
      }
    },
  });

  const unsubscribe = useCallback(
    (id: number, product: string) => {
      const unsubscribeMessage = {
        method: "UNSUBSCRIBE",
        params: [`${product}@depth`],
        id: id,
      };

      sendJsonMessage(unsubscribeMessage);
      console.log(`Unsubscribed from ${product} with id ${id}`);
    },
    [sendJsonMessage]
  );

  const subscribe = useCallback(
    (coin: string) => {
      if (subscriptionId !== null) {
        unsubscribe(subscriptionId, coin);
      }

      const id = 1;
      setSubscriptionId(id);

      const subscribeMessage = {
        method: "SUBSCRIBE",
        params: [`${coin}@depth`],
        id: id,
      };

      sendJsonMessage(subscribeMessage);
      console.log(`Subscribed to ${coin} with id ${id}`);
    },
    [sendJsonMessage, subscriptionId, unsubscribe]
  );

  const processOrderBookData = useCallback((data: any) => {
    if (data.e === "depthUpdate") {
      const updatedBids = data.b.map(([price, size]: [string, string]) => ({
        price: parseFloat(price),
        size: parseFloat(size),
        total: 0,
      }));

      const updatedAsks = data.a.map(([price, size]: [string, string]) => ({
        price: parseFloat(price),
        size: parseFloat(size),
        total: 0,
      }));

      const bidsWithTotal = calculateRunningTotal(updatedBids);
      const asksWithTotal = calculateRunningTotal(updatedAsks);

      setCurrentBids((prevBids) => manageArraySize(prevBids, bidsWithTotal));
      setCurrentAsks((prevAsks) => manageArraySize(prevAsks, asksWithTotal));

      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (readyState === ReadyState.OPEN) {
      subscribe(coinID);
      console.log(`Subscribed to ${coinID}`);
    }

    return () => {
      if (subscriptionId !== null) {
        unsubscribe(subscriptionId, coinID);
        console.log(`Unsubscribed from ${coinID}`);
      }
    };
  }, [coinID, readyState, subscribe, unsubscribe, subscriptionId]);

  return { currentBids, currentAsks, loading };
};
