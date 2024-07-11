import React, { useState } from "react";
import LimitOrderForm from "./_components/LimitOrder";
import MarketOrderForm from "./_components/MarketOrder";

const OrderComponent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"limit" | "market">("limit");

  return (
    <div className="p-4">
      <div className="flex gap-3">
        <button onClick={() => setActiveTab("limit")}>Limit</button>
        <button onClick={() => setActiveTab("market")}>Market</button>
      </div>
      <div className="flex justify-around mb-4">
        {activeTab === "limit" && <LimitOrderForm />}
        {activeTab === "market" && <MarketOrderForm />}
      </div>
    </div>
  );
};

export default OrderComponent;
