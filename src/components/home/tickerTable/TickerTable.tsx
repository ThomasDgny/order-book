import React from "react";
import TickerRow from "./TickerRow";
import { ProductIds } from "../../../constants/constants";

export default function TickerTable() {
  const coinPairs = [
    { pair: "BTC/USD", productId: ProductIds.XBTUSD },
    { pair: "ETH/USD", productId: ProductIds.ETHUSD },
    { pair: "LTC/USD", productId: ProductIds.LTCUSD },
    { pair: "XRP/USD", productId: ProductIds.XRPUSD },
  ];

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Ticker Data</h1>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Pair
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Price
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Volume
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              High
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Low
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Change
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {<TickerRow pairs={coinPairs} />}
        </tbody>
      </table>
    </div>
  );
}
