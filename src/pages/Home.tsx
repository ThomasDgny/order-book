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
    <div className="flex flex-col gap-3 p-2">
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
          <div className="flex px-8 justify-between items-center w-full bg-slate-100 py-3 rounded-md">
            <div>
              <p className="text-sm font-medium text-slate-500">{selectedPair}</p>
              <h3 className="text-2xl font-bold">{tickerData.markPrice}</h3>
              <p className="text-sm font-medium text-slate-500">{tickerData.markPrice}</p>
            </div>
            <div className="flex gap-10">
              <div>
                <p className="text-sm font-medium text-slate-500">24h change</p>
                <p className="font-bold text-sm">{tickerData.change}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">24h high</p>
                <p className="font-bold text-sm">{tickerData.high}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">24h low</p>
                <p className="font-bold text-sm">{tickerData.low}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">24h volume</p>
                <p className="font-bold text-sm">{tickerData.volume}</p>
              </div>
            </div>
          </div>

          <div className="flex gap-5">
            <div className="min-w-60 w-fit bg-slate-100 p-3 rounded-md">
              <OrderBook
                currentBids={currentBids}
                currentAsks={currentAsks}
                loading={loading}
              />
            </div>
            <div className="flex-1 w-full">
              <div className="flex flex-col gap-4 h-full">
                <div className="h-full w-full bg-red-400">Chart</div>
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <h2 className="text-xl font-bold mb-4">Order Form</h2>
                  <OrderForm />
                </div>
              </div>
            </div>
            <div className="flex-1 max-w-80">
              <div className="flex flex-col gap-4 h-full">
                <div className="h-full w-full bg-red-400">Wallet</div>
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <h2 className="text-xl font-bold mb-4">Update Form</h2>
                  Update balance Form
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
