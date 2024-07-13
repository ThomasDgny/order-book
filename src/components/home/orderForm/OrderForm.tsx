import React, { useState } from "react";
import MarketOrder from "./_components/marketOrder/MarketOrder";
import LimitOrder from "./_components/limitOrder/LimitOrder";
import { useAppContext } from "../../../context/AppContext";

export default function OrderForm() {
  const { tickerData, balance, selectedPair, createOrder } = useAppContext();
  const [activeTab, setActiveTab] = useState<"limit" | "market">("limit");

  return (
    <div className="p-4">
      <div className="flex gap-3 mb-4">
        <button
          onClick={() => setActiveTab("limit")}
          className={`px-4 py-2 text-sm font-medium rounded-md ${
            activeTab === "limit"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Limit
        </button>
        <button
          onClick={() => setActiveTab("market")}
          className={`px-4 py-2 text-sm font-medium rounded-md ${
            activeTab === "market"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Market
        </button>
      </div>
      <div className="flex justify-between gap-10">
        {activeTab === "limit" && (
          <LimitOrder
            balance={balance}
            createOrder={createOrder}
            selectedPair={selectedPair}
            tickerData={tickerData}
          />
        )}
        {activeTab === "market" && (
          <MarketOrder
            balance={balance}
            createOrder={createOrder}
            selectedPair={selectedPair}
            tickerData={tickerData}
          />
        )}
      </div>
    </div>
  );
}
