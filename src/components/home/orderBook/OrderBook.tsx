import React from "react";
import { OrderBookEntry } from "../../../types/types";

interface OrderBookProps {
  currentBids: OrderBookEntry[];
  currentAsks: OrderBookEntry[];
  loading: boolean;
}

const formatNumber = (num: number, digits: number): string => {
  return num?.toLocaleString("en", {
    useGrouping: true,
    minimumFractionDigits: digits,
  });
};

const OrderBook = ({ currentBids, currentAsks, loading }: OrderBookProps) => {
  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <OrderBookList
            title="Asks"
            entries={currentAsks}
            formatNumber={formatNumber}
          />
          <OrderBookList
            title="Bids"
            entries={currentBids}
            formatNumber={formatNumber}
          />
        </>
      )}
    </div>
  );
};

interface OrderBookListProps {
  title: string;
  entries: OrderBookEntry[];
  formatNumber: (numb: number, digits: number) => string;
}

const OrderBookList: React.FC<OrderBookListProps> = ({
  title,
  entries,
  formatNumber,
}) => (
  <div>
    <h3>{title}</h3>
    {entries.map((entry, index) => (
      <div key={index} className="text-sm font-semibold">
        <span>Price:{formatNumber(entry.price, 4)}</span>{" "}
        <span>Amount: {formatNumber(entry.size, 4)}</span>{" "}
        <span>total: {formatNumber(entry.total, 4)}</span>{" "}
      </div>
    ))}
  </div>
);

export default OrderBook;
