import React from "react";
import { OrderBookEntry } from "../../../types/types";
import { useAppContext } from "../../../context/AppContext";
import { formatNumber } from "../../../helper/orderBook";

const OrderBook: React.FC = () => {
  const { currentBids, currentAsks, loading } = useAppContext();

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
  formatNumber: (numb: number,digits: number) => string;
}

const OrderBookList: React.FC<OrderBookListProps> = ({
  title,
  entries,
  formatNumber,
}) => (
  <div>
    <h3>{title}</h3>
    {entries.map((entry, index) => (
      <div key={index}>
        <span>Price:{formatNumber(entry.price, 4)}</span>{" "}
        <span>Amount: {formatNumber(entry.size, 0)}</span>{" "}
        <span>Total: {formatNumber(entry.total, 2)}</span>{" "}
      </div>
    ))}
  </div>
);

export default OrderBook;
