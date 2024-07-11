import React, { useState, useEffect } from "react";
import { useAppContext } from "../../../../context/AppContext";
import { v4 as uuidv4 } from 'uuid';
import { Order } from "../../../../types/types";


const LimitOrderForm: React.FC = () => {
  const { currentIndex, balance, selectedPair, createOrder } = useAppContext();

  const [buyPrice, setBuyPrice] = useState<number>(currentIndex);
  const [buyQuantity, setBuyQuantity] = useState<number>(0);
  const [buyTotal, setBuyTotal] = useState<number>(0);
  const [sellPrice, setSellPrice] = useState<number>(0);
  const [sellQuantity, setSellQuantity] = useState<number>(0);
  const [sellTotal, setSellTotal] = useState<number>(0);

  useEffect(() => {
    setBuyPrice(currentIndex);
    setSellPrice(currentIndex);
  }, [currentIndex]);

  const handleOrderSubmit = (orderType: Order["orderType"]) => {
    if (typeof buyPrice === "number" && typeof buyQuantity === "number" && buyPrice * buyQuantity > balance) return;
    if (typeof sellPrice === "number" && typeof sellQuantity === "number" && sellPrice * sellQuantity > balance) return;

    const orderID = uuidv4()

    const newOrder: Order = {
      pair: selectedPair,
      orderId: orderID ,
      orderType: orderType,
      price: buyPrice,
      quantity: buyQuantity,
      total: buyPrice * buyQuantity,
      creationDate: new Date(),
      completionDate: null,
      status: "Pending",
    };
    
    createOrder(newOrder);
    setBuyQuantity(0);
    setBuyTotal(0);
    setSellQuantity(0);
    setSellTotal(0);
  };

  useEffect(() => {
    setBuyTotal(buyPrice * buyQuantity);
  }, [buyPrice, buyQuantity]);

  useEffect(() => {
    setSellTotal(sellPrice * sellQuantity);
  }, [sellPrice, sellQuantity]);

  return (
    <div className="w-full">
      <div className="flex justify-around">
        <div className="p-4 border rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Buy Limit Order</h3>
          <div className="mb-2">
            <label className="block text-sm">Price:</label>
            <input
              type="number"
              value={buyPrice}
              onChange={(e) => setBuyPrice(parseFloat(e.target.value))}
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
            onClick={() => handleOrderSubmit("BUY_LIMIT")}
            disabled={
              typeof buyPrice === "number" &&
              typeof buyQuantity === "number" &&
              buyPrice * buyQuantity > balance
            }
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            BUY LIMIT
          </button>
        </div>
        <div className="p-4 border rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Sell Limit Order</h3>
          <div className="mb-2">
            <label className="block text-sm">Price:</label>
            <input
              type="number"
              value={sellPrice}
              onChange={(e) => setSellPrice(parseFloat(e.target.value))}
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
            onClick={() => handleOrderSubmit("SELL_LIMIT")}
            disabled={
              typeof sellQuantity === "number" && sellQuantity > balance
            }
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            SELL LIMIT
          </button>
        </div>
      </div>
    </div>
  );
};

export default LimitOrderForm;
