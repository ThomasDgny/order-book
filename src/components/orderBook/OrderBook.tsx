import React, { useEffect, useState, useCallback } from "react";
import useWebSocket from "react-use-websocket";

export const ORDERBOOK_LEVELS: number = 25;

export const ProductsMap: Record<string, string> = {
  PI_XBTUSD: "PI_ETHUSD",
  PI_ETHUSD: "PI_XBTUSD",
};

export const ProductIds = {
  XBTUSD: "PI_XBTUSD",
  ETHUSD: "PI_ETHUSD",
};

export enum OrderType {
  BIDS,
  ASKS,
}

interface OrderBookProps {
  windowWidth: number;
  productId: string;
  isFeedKilled: boolean;
}

interface Delta {
  bids?: number[][];
  asks?: number[][];
}

let currentBids: number[][] = [];
let currentAsks: number[][] = [];

export default function OrderBook() {
  const [productId, setProductId] = useState(ProductIds.XBTUSD);

  const WSS_FEED_URL: string = "wss://www.cryptofacilities.com/ws/v1";

  const { sendJsonMessage, getWebSocket } = useWebSocket(WSS_FEED_URL, {
    onOpen: () => console.log("WebSocket connection opened."),
    onClose: () => console.log("WebSocket connection closed."),
    shouldReconnect: (closeEvent) => true,
    onMessage: (event: WebSocketEventMap["message"]) =>
      process(JSON.parse(event.data)),
  });

  useEffect(() => {
    function connect(product: string) {
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
    }

    connect(productId);
  }, [productId, sendJsonMessage, getWebSocket]);

  const process = useCallback((data: Delta) => {
    if (Array.isArray(data.bids) && data.bids.length > 0) {
      currentBids = [...currentBids, ...data.bids];

      if (currentBids.length > ORDERBOOK_LEVELS) {
        currentBids = currentBids.slice(-ORDERBOOK_LEVELS);
      }
      return currentBids;
    }

    if (Array.isArray(data.asks) && data.asks.length > 0) {
      currentAsks = [...currentAsks, ...data.asks];

      if (currentAsks.length > ORDERBOOK_LEVELS) {
        currentAsks = currentAsks.slice(-ORDERBOOK_LEVELS);
      }
      return currentAsks;
    }
  }, []);

  const formatPrice = (arg: number): string => {
    return arg.toLocaleString("en", {
      useGrouping: true,
      minimumFractionDigits: 2,
    });
  };

  return (
    <div>
      <div>
        <h3>Bids</h3>
        {currentBids.map((bid, index) => (
          <div key={index}>
            Price: {formatPrice(bid[0])}, Size: {bid[1]}
          </div>
        ))}
      </div>
      <div>
        <h3>Asks</h3>
        {currentAsks.map((ask, index) => (
          <div key={index}>
            Price: {formatPrice(ask[0])}, Size: {ask[1]}
          </div>
        ))}
      </div>
    </div>
  );
}
