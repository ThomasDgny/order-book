import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Coins } from "../constants/constants";
import { ProductIdKey, TimeFrameKey } from "../types/types";
import OrderHistorySection from "../components/home/_components/OrderHistorySection";
import WalletSection from "../components/home/_components/WalletSection";
import ChartSection from "../components/home/_components/ChartSection";
import TickerInfo from "../components/home/_components/TickerInfo";
import OrderBook from "../components/home/orderBook/OrderBook";

export default function Home() {
  const [switchTimeFrame, setSwitchTimeFrame] = useState<TimeFrameKey>("1m");
  const {
    orderHistory,
    cancelOrder,
    currentAsks,
    currentBids,
    loading,
    setPair,
    selectedPair,
    tickerData,
    balance,
    setBalance,
  } = useAppContext();

  const handlePairChange = (newPair: ProductIdKey) => {
    setPair(Coins[newPair]);
  };

  const handleTimeFrameChange = (frame: TimeFrameKey) => {
    setSwitchTimeFrame(frame);
  };

  return (
    <div className="flex flex-col gap-3 p-2 bg-slate-50">
      {selectedPair && (
        <TickerInfo
          handlePairChange={handlePairChange}
          selectedPair={selectedPair}
          tickerData={tickerData}
        />
      )}
      {selectedPair && (
        <div className="flex gap-5">
          <div className="min-w-60 w-fit p-3 rounded-md">
            <OrderBook
              currentBids={currentBids}
              currentAsks={currentAsks}
              loading={loading}
            />
          </div>
          <ChartSection
            selectedPair={selectedPair}
            switchTimeFrame={switchTimeFrame}
            handleTimeFrameChange={handleTimeFrameChange}
          />
          <WalletSection setBalance={setBalance} balance={balance} />
        </div>
      )}
      {selectedPair && (
        <OrderHistorySection
          orderHistory={orderHistory}
          cancelOrder={cancelOrder}
        />
      )}
      {!selectedPair && <p>Loading....</p>}
    </div>
  );
}
