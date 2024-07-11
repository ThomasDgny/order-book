import { useCallback, useEffect, useState } from "react";
import { addTotalSums, applyDeltas } from "../components/home/orderBook/helper/helper";
import useWebSocket from "react-use-websocket";
import { Delta, OrderBookEntry } from "../types/types";
import { ProductsMap, WSS_FEED_URL } from "../constants/constants";



export const useOrderBook = (initialProductId: string) => {
    const [productId, setProductId] = useState(initialProductId);
    const [currentBids, setCurrentBids] = useState<OrderBookEntry[]>([]);
    const [currentAsks, setCurrentAsks] = useState<OrderBookEntry[]>([]);
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
        if (data.bids && data.bids.length > 0) {
          const updatedBids = applyDeltas(
            currentBids.map(({ price, size }) => [price, size]),
            data.bids
          );
          setCurrentBids(
            addTotalSums(updatedBids).map(([price, size, total]) => ({
              price,
              size,
              total,
            }))
          );
        }
  
        if (data.asks && data.asks.length > 0) {
          const updatedAsks = applyDeltas(
            currentAsks.map(({ price, size }) => [price, size]),
            data.asks
          );
          setCurrentAsks(
            addTotalSums(updatedAsks).map(([price, size, total]) => ({
              price,
              size,
              total,
            }))
          );
        }
  
        setLoading(false);
      },
      [currentBids, currentAsks]
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
  
    return { currentBids, currentAsks, loading, setProductId };
  };
  