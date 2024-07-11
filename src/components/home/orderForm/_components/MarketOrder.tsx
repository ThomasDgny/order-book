import React, { useEffect, useState } from "react";
import { useAppContext } from "../../../../context/AppContext";
import { v4 as uuidv4 } from "uuid";
import { Order } from "../../../../types/types";

const MarketOrderForm: React.FC = () => {
  const { currentIndex, balance, selectedPair, createOrder } = useAppContext();
  const [buyQuantity, setBuyQuantity] = useState<number>(0);
  const [sellQuantity, setSellQuantity] = useState<number>(0);
  const [buyTotal, setBuyTotal] = useState<number>(0);
  const [sellTotal, setSellTotal] = useState<number>(0);

  const handleOrderSubmit = (orderType: Order["orderType"]) => {
    if (typeof buyQuantity === "number" && buyQuantity > balance) return;
    if (typeof sellQuantity === "number" && sellQuantity > balance) return;

    const orderID = uuidv4() as string;

    const newOrder: Order = {
      pair: selectedPair,
      orderId: orderID,
      orderType: orderType,
      price: currentIndex,
      quantity: buyQuantity,
      total: currentIndex * buyQuantity,
      creationDate: new Date(),
      completionDate: null,
      status: "Pending",
    };

    createOrder(newOrder);
    setSellQuantity(0);
    setSellTotal(0);
  };

  useEffect(() => {
    setBuyTotal(currentIndex * buyQuantity);
  }, [currentIndex, buyQuantity]);

  useEffect(() => {
    setSellTotal(currentIndex * sellQuantity);
  }, [currentIndex, sellQuantity]);

  return (
    <div className="w-full">
      <div className="flex justify-around">
        <div className="p-4 border rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Market Buy Order</h3>
          <div className="mb-2">
            <label className="block text-sm">Price:</label>
            <input
              type="number"
              placeholder="Market Price"
              disabled={true}
              className="border rounded p-1 w-full"
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm">Quantity:</label>
            <input
              type="number"
              value={buyQuantity}
              onChange={(e) => setBuyQuantity(parseFloat(e.target.value))}
              className="border rounded p-1 w-full"
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm">Total:</label>
            <input
              type="number"
              value={buyTotal}
              readOnly
              className="border rounded p-1 w-full"
            />
          </div>
          <button
            onClick={() => handleOrderSubmit("MARKET_BUY")}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            MARKET BUY
          </button>
        </div>
        <div className="p-4 border rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Market Sell Order</h3>
          <div className="mb-2">
            <label className="block text-sm">Price:</label>
            <input
              type="number"
              placeholder="Market Price"
              disabled={true}
              className="border rounded p-1 w-full"
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm">Quantity:</label>
            <input
              type="number"
              value={sellQuantity}
              onChange={(e) => setSellQuantity(parseFloat(e.target.value))}
              className="border rounded p-1 w-full"
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm">Total:</label>
            <input
              type="number"
              value={sellTotal}
              readOnly
              className="border rounded p-1 w-full"
            />
          </div>
          <button
            onClick={() => handleOrderSubmit("MARKET_SELL")}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            MARKET SELL
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarketOrderForm;
