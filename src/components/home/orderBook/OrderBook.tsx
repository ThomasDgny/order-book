import React from "react";
import { OrderBookEntry } from "../../../types/types";
import OrderBookList from "./OrderBookList";

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

export default function OrderBook ({ currentBids, currentAsks, loading }: OrderBookProps)  {
  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="space-y-5">
          <OrderBookList
            title="Asks"
            entries={currentAsks}
            formatNumber={formatNumber}
          />
          <OrderBookList
            title="Bids"
            entries={currentBids}
            formatNumber={formatNumber}
            hideHeader={true}
          />
        </div>
      )}
    </div>
  );
};
