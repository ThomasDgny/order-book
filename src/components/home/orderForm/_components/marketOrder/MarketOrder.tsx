import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Order, OrderFormProps } from "../../../../../types/types";
import MarketOrderForm from "./MarketOrderForm";


export default function MarketOrder({ tickerData, balance, selectedPair, createOrder }: OrderFormProps) {
  const [buyQuantity, setBuyQuantity] = useState<number>(0);
  const [sellQuantity, setSellQuantity] = useState<number>(0);
  const [buyTotal, setBuyTotal] = useState<number>(0);
  const [sellTotal, setSellTotal] = useState<number>(0);

  const currentIndex = tickerData.markPrice;

  const handleOrderSubmit = (
    orderType: Order["orderType"],
    quantity: number
  ) => {
    const totalCost = currentIndex * quantity;

    if (quantity <= 0 || isNaN(quantity) || (orderType === "MARKET_BUY" && totalCost > balance)) {
      return;
    }

    const newOrder: Order = {
      pair: selectedPair,
      orderId: uuidv4(),
      orderType,
      price: currentIndex,
      quantity,
      total: totalCost,
      creationDate: new Date(),
      completionDate: new Date(),
      status: "Filled",
    };

    createOrder(newOrder);

    if (orderType === "MARKET_BUY") {
      setBuyQuantity(0);
      setBuyTotal(0);
    } else {
      setSellQuantity(0);
      setSellTotal(0);
    }
  };

  const updateTotals = () => {
    setBuyTotal(currentIndex * buyQuantity);
    setSellTotal(currentIndex * sellQuantity);
  };

  useEffect(updateTotals, [currentIndex, buyQuantity, sellQuantity]);

  return (
    <div className="w-full">
      <div className="flex justify-around">
        <MarketOrderForm
          title="Buy"
          quantity={buyQuantity}
          setQuantity={setBuyQuantity}
          total={buyTotal}
          handleSubmit={() => handleOrderSubmit("MARKET_BUY", buyQuantity)}
          buttonColor="bg-blue-500"
          buttonText="MARKET BUY"
        />
        <MarketOrderForm
          title="Sell"
          quantity={sellQuantity}
          setQuantity={setSellQuantity}
          total={sellTotal}
          handleSubmit={() => handleOrderSubmit("MARKET_SELL", sellQuantity)}
          buttonColor="bg-red-500"
          buttonText="MARKET SELL"
        />
      </div>
    </div>
  );
}
