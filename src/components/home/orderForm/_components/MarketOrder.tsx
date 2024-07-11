import React, { useState } from "react";

interface Order {
  orderType: string;
  price: number;
  quantity: number;
  total: number;
  creationDate: Date;
  completionDate: Date | null;
  status: string;
}

const MarketOrderForm: React.FC = () => {
  const [buyQuantity, setBuyQuantity] = useState<number>(0);
  const [sellQuantity, setSellQuantity] = useState<number>(0);
  const [balance, setBalance] = useState<number>(1000);
  const [currentPrice, setCurrentPrice] = useState<number>(20000);
  const [orders, setOrders] = useState<Order[]>([]);
  const [buyTotal, setBuyTotal] = useState<number>(0);
  const [sellTotal, setSellTotal] = useState<number>(0);

  const handleBuySubmit = () => {
    if (typeof buyQuantity === "number" && buyQuantity * currentPrice > balance)
      return;

    const newOrder: Order = {
      orderType: "MARKET_BUY",
      price: currentPrice,
      quantity: buyQuantity,
      total: currentPrice * buyQuantity,
      creationDate: new Date(),
      completionDate: new Date(),
      status: "Filled",
    };
    setOrders([...orders, newOrder]);
    setBuyQuantity(0);
    setBuyTotal(0);
  };

  const handleSellSubmit = () => {
    if (typeof sellQuantity === "number" && sellQuantity > balance) return;

    const newOrder: Order = {
      orderType: "MARKET_SELL",
      price: currentPrice,
      quantity: sellQuantity,
      total: currentPrice * sellQuantity,
      creationDate: new Date(),
      completionDate: new Date(),
      status: "Filled",
    };
    setOrders([...orders, newOrder]);
    setSellQuantity(0);
    setSellTotal(0);
  };

  const handleBuyQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const quantity = parseFloat(e.target.value);
    setBuyQuantity(quantity);
    setBuyTotal(quantity * currentPrice);
  };

  const handleSellQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const quantity = parseFloat(e.target.value);
    setSellQuantity(quantity);
    setSellTotal(quantity * currentPrice);
  };

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
              onChange={handleBuyQuantityChange}
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
            onClick={handleBuySubmit}
            disabled={
              typeof buyQuantity === "number" &&
              buyQuantity * currentPrice > balance
            }
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
              onChange={handleSellQuantityChange}
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
            onClick={handleSellSubmit}
            disabled={
              typeof sellQuantity === "number" && sellQuantity > balance
            }
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
