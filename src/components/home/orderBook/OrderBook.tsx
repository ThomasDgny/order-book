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

interface OrderBookListProps {
  title: string;
  entries: OrderBookEntry[];
  formatNumber: (numb: number, digits: number) => string;
  hideHeader?: boolean;
}

const OrderBookList = ({
  title,
  entries,
  formatNumber,
  hideHeader = false,
}:OrderBookListProps) => (
  <div className="max-w-72">
    <table className="w-full mt-2">
      {!hideHeader && (
        <thead>
          <tr>
            <th className="text-xs py-1 text-left">Price</th>
            <th className="text-xs py-1 text-left">Amount</th>
            <th className="text-xs py-1 text-left">Total</th>
          </tr>
          <p className="text-xs font-bold mt-3">{title}</p>
        </thead>
      )}
      <tbody>
        {entries.map((entry, index) => (
          <tr key={index}>
            <td className={`py-1 text-xs font-bold text-left ${title === "Asks" ?  "text-red-600" : "text-green-600"}`}>
              {formatNumber(entry.price, 4)}
            </td>
            <td className="py-1 text-xs font-bold text-left">{formatNumber(entry.size, 4)}</td>
            <td className="py-1 text-xs font-bold text-left">{formatNumber(entry.total, 4)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

