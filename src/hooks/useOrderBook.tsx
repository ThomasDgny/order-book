import { useCallback, useEffect, useState } from "react";
import { addTotalSums, applyDeltas, formatNumber } from "../helper/orderBook";
import { ProductsMap, WSS_FEED_URL } from "../constants/constants";
import { Delta, OrderBookEntry, setTickerData } from "../types/types";
import useWebSocket from "react-use-websocket";

export const useOrderBook = (initialProductId: string) => {
  const [currentBids, setCurrentBids] = useState<OrderBookEntry[]>([]);
  const [currentAsks, setCurrentAsks] = useState<OrderBookEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [tickerData, setTickerData] = useState<setTickerData>({
    markPrice: 0,
    volume: 0,
    high: 0,
    low: 0,
    change: 0,
  });

  const { sendJsonMessage } = useWebSocket(WSS_FEED_URL, {
    shouldReconnect: () => true,
    onOpen: () => {
      console.log("WebSocket connection opened.");
      connect(initialProductId);
    },
    onClose: () => console.log("WebSocket connection closed."),
    onMessage: (event: WebSocketEventMap["message"]) => {
      const data = JSON.parse(event.data);
      if (data.feed === "book_ui_1") {
        processOrderBookData(data);
      } else if (data.feed === "ticker") {
        processTickerData(data);
      }
    },
  });

  const connect = (product: string) => {
    const orderBookUnsubscribeMessage = {
      event: "unsubscribe",
      feed: "book_ui_1",
      product_ids: [ProductsMap[product]],
    };
    const orderBookSubscribeMessage = {
      event: "subscribe",
      feed: "book_ui_1",
      product_ids: [product],
    };
    const tickerUnsubscribeMessage = {
      event: "unsubscribe",
      feed: "ticker",
      product_ids: [ProductsMap[product]],
    };
    const tickerSubscribeMessage = {
      event: "subscribe",
      feed: "ticker",
      product_ids: [product],
    };

    sendJsonMessage(orderBookUnsubscribeMessage);
    sendJsonMessage(orderBookSubscribeMessage);
    sendJsonMessage(tickerUnsubscribeMessage);
    sendJsonMessage(tickerSubscribeMessage);
  };

  const processOrderBookData = useCallback((data: Delta) => {
    setCurrentBids((prevBids) => {
      let updatedBids = prevBids.map(({ price, size }) => [price, size]);
      if (data.bids && data.bids.length > 0) {
        updatedBids = applyDeltas(updatedBids, data.bids);
        const updatedBidEntries = addTotalSums(updatedBids).map(
          ([price, size, total]) => ({ price, size, total })
        );
        return updatedBidEntries;
      }
      return prevBids;
    });

    setCurrentAsks((prevAsks) => {
      let updatedAsks = prevAsks.map(({ price, size }) => [price, size]);
      if (data.asks && data.asks.length > 0) {
        updatedAsks = applyDeltas(updatedAsks, data.asks);
        const updatedAskEntries = addTotalSums(updatedAsks).map(
          ([price, size, total]) => ({ price, size, total })
        );
        return updatedAskEntries;
      }
      return prevAsks;
    });

    setLoading(false);
  }, []);

  const processTickerData = useCallback((data: setTickerData) => {
    const { markPrice, volume, high, low, change } = data;
    const formattedMarkPrice = markPrice
    setTickerData({
      markPrice: formattedMarkPrice,
      volume,
      high,
      low,
      change,
    });
  }, []);

  useEffect(() => {
    connect(initialProductId);
  }, [initialProductId, sendJsonMessage]);

  return { currentBids, currentAsks, loading, tickerData };
};
