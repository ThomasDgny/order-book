import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Order, OrderFormProps } from "../../../../../types/types";
import LimitOrderForm from "./LimitOrderForm";

export default function LimitOrder({ tickerData, balance, selectedPair, createOrder }:OrderFormProps) {
  const currentIndex = tickerData.markPrice;

  const [buyPrice, setBuyPrice] = useState<number>(currentIndex);
  const [sellPrice, setSellPrice] = useState<number>(currentIndex);
  const [buyQuantity, setBuyQuantity] = useState<number>(0);
  const [buyTotal, setBuyTotal] = useState<number>(0);
  const [sellQuantity, setSellQuantity] = useState<number>(0);
  const [sellTotal, setSellTotal] = useState<number>(0);

  useEffect(() => {
    setBuyPrice(currentIndex);
    setSellPrice(currentIndex);
  }, [currentIndex]);

  useEffect(() => {
    setBuyTotal(buyPrice * buyQuantity);
  }, [buyPrice, buyQuantity]);

  useEffect(() => {
    setSellTotal(sellPrice * sellQuantity);
  }, [sellPrice, sellQuantity]);

  const handleOrderSubmit = (
    orderType: Order["orderType"],
    price: number,
    quantity: number
  ) => {
    if (price <= 0 || quantity <= 0 || isNaN(price) || isNaN(quantity)) return;
    if (orderType === "BUY_LIMIT" && price * quantity > balance) return;
    if (orderType === "SELL_LIMIT" && quantity > balance) return;

    const newOrder: Order = {
      pair: selectedPair,
      orderId: uuidv4(),
      orderType,
      price,
      quantity,
      total: price * quantity,
      creationDate: new Date(),
      completionDate: null,
      status: "Pending",
    };

    createOrder(newOrder);

    if (orderType === "BUY_LIMIT") {
      setBuyQuantity(0);
      setBuyTotal(0);
    } else {
      setSellQuantity(0);
      setSellTotal(0);
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-around">
        <LimitOrderForm
          title="Buy Limit Order"
          price={buyPrice}
          setPrice={setBuyPrice}
          quantity={buyQuantity}
          setQuantity={setBuyQuantity}
          total={buyTotal}
          handleSubmit={() =>
            handleOrderSubmit("BUY_LIMIT", buyPrice, buyQuantity)
          }
          buttonColor="bg-blue-500"
          buttonText="BUY LIMIT"
        />
        <LimitOrderForm
          title="Sell Limit Order"
          price={sellPrice}
          setPrice={setSellPrice}
          quantity={sellQuantity}
          setQuantity={setSellQuantity}
          total={sellTotal}
          handleSubmit={() =>
            handleOrderSubmit("SELL_LIMIT", sellPrice, sellQuantity)
          }
          buttonColor="bg-red-500"
          buttonText="SELL LIMIT"
        />
      </div>
    </div>
  );
}
