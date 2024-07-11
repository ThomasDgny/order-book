import React, { useState } from "react";
import MarketOrder from "./_components/marketOrder/MarketOrder";
import LimitOrder from "./_components/limitOrder/LimitOrder";

const OrderComponent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"limit" | "market">("limit");

  return (
    <div className="p-4">
      <div className="flex gap-3">
        <button onClick={() => setActiveTab("limit")}>Limit</button>
        <button onClick={() => setActiveTab("market")}>Market</button>
      </div>
      <div className="flex justify-around mb-4">
        {activeTab === "limit" && <LimitOrder />}
        {activeTab === "market" && <MarketOrder />}
      </div>
    </div>
  );
};

export default OrderComponent;
