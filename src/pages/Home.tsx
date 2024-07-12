import { useAppContext } from "../context/AppContext";
import OrderBook from "../components/home/orderBook/OrderBook";
import OrderForm from "../components/home/orderForm/OrderForm";
import OrderHistory from "../components/home/orderHistory/OrderHistory";
import { ProductIds, TimeFrames } from "../constants/constants";
import { useState } from "react";

type ProductIdKey = keyof typeof ProductIds;
type TimeFrameKey = keyof typeof TimeFrames;

export default function Home() {
  const [switchTimeFrame, setSwitchTimeFrame] = useState<TimeFrameKey>("1min");
  const {
    orderHistory,
    cancelOrder,
    currentAsks,
    currentBids,
    loading,
    setPair,
    selectedPair,
    tickerData,
  } = useAppContext();

  const handlePairChange = (newPair: ProductIdKey) => {
   
    setPair(ProductIds[newPair]);
  };

  const handleTimeFrameChange = (frame: TimeFrameKey) => {
    setSwitchTimeFrame(frame);
  };

  return (
    <div className="container flex flex-col gap-10">
      <div className="flex gap-4 mt-4">
        {Object.keys(ProductIds).map((key) => (
          <button
            key={key}
            className={`px-4 py-2 rounded-md ${
              selectedPair === ProductIds[key as ProductIdKey]
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => handlePairChange(key as ProductIdKey)}
          >
            {key}
          </button>
        ))}
      </div>
      <div className="flex gap-4 mt-4">
        {Object.keys(TimeFrames).map((key) => (
          <button
            key={key}
            className={`px-4 py-2 rounded-md ${
              switchTimeFrame === key ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => handleTimeFrameChange(key as TimeFrameKey)}
          >
            {key}
          </button>
        ))}
      </div>
      {selectedPair ? (
        <>
          <h1 className="text-2xl font-bold mb-4">
            Details for {selectedPair}
          </h1>
          <p>{tickerData.markPrice}</p>
          <div className="flex gap-10">
            <div className="flex-1">
              <OrderBook
                currentBids={currentBids}
                currentAsks={currentAsks}
                loading={loading}
              />
            </div>
            <div className="flex-1">
              <div className="flex flex-col gap-4">
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <h2 className="text-xl font-bold mb-4">Order Form</h2>
                  <OrderForm />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Order History</h2>
            <OrderHistory
              orderHistory={orderHistory}
              cancelOrder={cancelOrder}
            />
          </div>
        </>
      ) : (
        <p>Loading....</p>
      )}
    </div>
  );
}
