import React from "react";
import { ProductIds } from "../../constants/constants";
import { useOrderBook } from "../../hooks/useOrderBook";
import { OrderBookEntry } from "../../types/types";

const OrderBook: React.FC = () => {
  const { currentBids, currentAsks, loading } = useOrderBook(ProductIds.XBTUSD);

  const formatPrice = (price: number): string => {
    return price?.toLocaleString("en", {
      useGrouping: true,
      minimumFractionDigits: 4,
    });
  };

  const formatSize = (size: number): string => {
    return size.toFixed(0);
  };

  const formatTotal = (total: number): string => {
    return total.toLocaleString("en", {
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
          <OrderBookList
            title="Asks"
            entries={currentAsks}
            formatPrice={formatPrice}
            formatSize={formatSize}
            formatTotal={formatTotal}
          />
          <OrderBookList
            title="Bids"
            entries={currentBids}
            formatPrice={formatPrice}
            formatSize={formatSize}
            formatTotal={formatTotal}
          />
        </>
      )}
    </div>
  );
};

interface OrderBookListProps {
  title: string;
  entries: OrderBookEntry[];
  formatPrice: (price: number) => string;
  formatSize: (size: number) => string;
  formatTotal: (total: number) => string;
}

const OrderBookList: React.FC<OrderBookListProps> = ({
  title,
  entries,
  formatPrice,
  formatSize,
  formatTotal,
}) => (
  <div>
    <h3>{title}</h3>
    {entries.map((entry, index) => (
      <div key={index}>
        <span>Price:{formatPrice(entry.price)}</span>{" "}
        <span>Amount: {entry.size}</span>{" "}
        <span>Total: {formatTotal(entry.total)}</span>{" "}
      </div>
    ))}
  </div>
);

export default OrderBook;
