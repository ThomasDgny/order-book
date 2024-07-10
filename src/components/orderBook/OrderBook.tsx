import React, { useEffect, useState, useCallback } from "react";
import useWebSocket from "react-use-websocket";

const ORDERBOOK_LEVELS: number = 15;

const ProductsMap: Record<string, string> = {
  PI_XBTUSD: "PI_ETHUSD",
  PI_ETHUSD: "PI_XBTUSD",
};

const ProductIds = {
  XBTUSD: "PI_XBTUSD",
  ETHUSD: "PI_ETHUSD",
};

interface OrderBookEntry {
  price: number;
  size: number;
  total: number;
}

interface Delta {
  bids?: number[][];
  asks?: number[][];
}

const WSS_FEED_URL: string = "wss://www.cryptofacilities.com/ws/v1";

const useOrderBook = (initialProductId: string) => {
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

  const processOrderBookData = useCallback((data: Delta) => {
    if (data.bids && data.bids.length > 0) {
      const updatedBids = data.bids.map(([price, size]) => ({ price, size, total: 0 }));
      setCurrentBids((prevBids) => {
        const mergedBids = [...prevBids, ...updatedBids].slice(-ORDERBOOK_LEVELS);
        return calculateTotal(mergedBids);
      });
    }

    if (data.asks && data.asks.length > 0) {
      const updatedAsks = data.asks.map(([price, size]) => ({ price, size, total: 0 }));
      setCurrentAsks((prevAsks) => {
        const mergedAsks = [...prevAsks, ...updatedAsks].slice(-ORDERBOOK_LEVELS);
        return calculateTotal(mergedAsks);
      });
    }

    setLoading(false);
  }, []);

  const calculateTotal = (entries: OrderBookEntry[]): OrderBookEntry[] => {
    let cumulativeTotal = 0;
    return entries.map((entry) => {
      cumulativeTotal += entry.size;
      return { ...entry, total: cumulativeTotal };
    });
  };

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

const OrderBook: React.FC = () => {
  const { currentBids, currentAsks, loading } = useOrderBook(ProductIds.XBTUSD);

  const formatPrice = (price: number): string => {
    return price?.toLocaleString("en", {
      useGrouping: true,
      minimumFractionDigits: 2,
    });
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <OrderBookList title="Bids" entries={currentBids} formatPrice={formatPrice} />
          <OrderBookList title="Asks" entries={currentAsks} formatPrice={formatPrice} />
        </>
      )}
    </div>
  );
};

interface OrderBookListProps {
  title: string;
  entries: OrderBookEntry[];
  formatPrice: (price: number) => string;
}

const OrderBookList: React.FC<OrderBookListProps> = ({ title, entries, formatPrice }) => (
  <div>
    <h3>{title}</h3>
    {entries.map((entry, index) => (
      <div key={index}>
        Price: {formatPrice(entry.price) || "N/A"}, Size: {entry.size}, Total: {entry.total}
      </div>
    ))}
  </div>
);

export default OrderBook;
