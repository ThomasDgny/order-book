import { useCallback, useEffect, useState } from "react";
import { addTotalSums, applyDeltas } from "../components/home/orderBook/_helper/helper";
import { ProductsMap, WSS_FEED_URL } from "../constants/constants";
import { Delta, OrderBookEntry } from "../types/types";
import useWebSocket from "react-use-websocket";

const calculateMidpointPrice = (
  bids: OrderBookEntry[],
  asks: OrderBookEntry[]
): number => {
  const bestBid = bids[0]?.price || 0;
  const bestAsk = asks[0]?.price || 0;
  return (bestBid + bestAsk) / 2;
};

export const useOrderBook = (initialProductId: string) => {
  const [productId, setProductId] = useState(initialProductId);
  const [currentBids, setCurrentBids] = useState<OrderBookEntry[]>([]);
  const [currentAsks, setCurrentAsks] = useState<OrderBookEntry[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const { sendJsonMessage } = useWebSocket(WSS_FEED_URL, {
    onOpen: () => console.log("WebSocket connection opened."),
    onClose: () => console.log("WebSocket connection closed."),
    shouldReconnect: () => true,
    onMessage: (event: WebSocketEventMap["message"]) => {
      const data = JSON.parse(event.data);
      processOrderBookData(data);
    },
  });

  const processOrderBookData = useCallback(
    (data: Delta) => {
      let updatedBids = currentBids.map(({ price, size }) => [price, size]);
      let updatedAsks = currentAsks.map(({ price, size }) => [price, size]);

      if (data.bids && data.bids.length > 0) {
        updatedBids = applyDeltas(updatedBids, data.bids);
        const updatedBidEntries = addTotalSums(updatedBids).map(
          ([price, size, total]) => ({price,size,total})
        );
        setCurrentBids(updatedBidEntries);
      }

      if (data.asks && data.asks.length > 0) {
        updatedAsks = applyDeltas(updatedAsks, data.asks);
        const updatedAskEntries = addTotalSums(updatedAsks).map(
          ([price, size, total]) => ({price, size, total})
        );
        setCurrentAsks(updatedAskEntries);
      }

      if (updatedBids.length > 0 && updatedAsks.length > 0) {
        const index = calculateMidpointPrice(
          updatedBids.map(([price, size]) => ({ price, size, total: 0 })),
          updatedAsks.map(([price, size]) => ({ price, size, total: 0 }))
        );
        setCurrentIndex(index);
      }

      setLoading(false);
    },
    [currentIndex, currentBids, currentAsks]
  );

  useEffect(() => {
    const connect = (product: string) => {
      const unSubscribeMessage = {
        event: "unsubscribe",
        feed: "book_ui_1",
        product_ids: [ProductsMap[product]],
      };
      sendJsonMessage(unSubscribeMessage);

      const subscribeMessage = {
        event: "subscribe",
        feed: "book_ui_1",
        product_ids: [product],
      };
      sendJsonMessage(subscribeMessage);
    };

    connect(productId);
  }, [productId, sendJsonMessage]);

  return { currentIndex, currentBids, currentAsks, loading, setProductId };
};
