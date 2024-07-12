import React, { useState } from "react";
import MarketOrder from "./_components/marketOrder/MarketOrder";
import LimitOrder from "./_components/limitOrder/LimitOrder";
import { useAppContext } from "../../../context/AppContext";

export default function OrderForm() {
  const { tickerData, balance, selectedPair, createOrder } = useAppContext();
  const [activeTab, setActiveTab] = useState<"limit" | "market">("limit");

  return (
    <div className="p-4">
      <div className="flex gap-3">
        <button onClick={() => setActiveTab("limit")}>Limit</button>
        <button onClick={() => setActiveTab("market")}>Market</button>
      </div>
      <div className="flex justify-around mb-4">
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
