import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { AppContextType, Order } from "../types/types";
import { useOrderBook } from "../hooks/useOrderBook";
import { ProductIds } from "../constants/constants";

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
};

export const AppContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedPair, setSelectedPair] = useState(ProductIds.XBTUSD);
  const [balance, setBalance] = useState(1000000);
  const [orderHistory, setOrderHistory] = useState<Order[]>([]);
  const { currentBids, currentAsks, currentIndex, loading } = useOrderBook(selectedPair);

  const setPair = (pair: string) => {
    setSelectedPair(pair);
  };

  const createOrder = (order: Order) => {
    const cost = order.price * order.quantity;
    if (order.orderType === "BUY_LIMIT" && balance >= cost) {
      setBalance(balance - cost);
      const newOrder: Order = order;
      setOrderHistory([...orderHistory, newOrder]);
    } else if (order.orderType === "SELL_LIMIT") {
      const newOrder: Order = order;
      setOrderHistory([...orderHistory, newOrder]);
    } else {
      console.error("Insufficient balance for the order.");
    }
  };

  const completeOrder = (orderId: string) => {
    setOrderHistory(prevOrders =>
      prevOrders.map(order =>
        order.orderId === orderId ? { ...order, status: "Filled", completionDate: new Date() } : order
      )
    );
  };

  const cancelOrder = (orderId: string) => {
    setOrderHistory(prevOrders =>
      prevOrders.map(order => {
        if (order.orderId === orderId && order.status !== "Filled") {
          if (order.status === "Pending") {
            const refund = order.price * order.quantity;
            if (order.orderType === "BUY_LIMIT") {
              setBalance(balance + refund);
            }
          }
          return { ...order, status: "Canceled", completionDate: new Date() };
        }
        return order;
      })
    );
  };

  const checkOrderMatches = () => {
    setOrderHistory(prevOrders =>
      prevOrders.map(order => {
        if (order.status === "Pending") {
          if (order.orderType === "BUY_LIMIT") {
            const matchingAsk = currentAsks.find(ask => ask.price <= order.price);
            if (matchingAsk) {
              completeOrder(order.orderId);
              console.log(`Your BUY LIMIT order for ${order.pair} is completed`);
            }
          } else if (order.orderType === "SELL_LIMIT") {
            const matchingBid = currentBids.find(bid => bid.price >= order.price);
            if (matchingBid) {
              completeOrder(order.orderId);
              const profit = order.price * order.quantity;
              setBalance(balance + profit);
              console.log(`Your SELL LIMIT order for ${order.pair} is completed`);
            }
          }
        }
        return order;
      })
    );
  };

  useEffect(() => {
    checkOrderMatches();
  }, [currentBids, currentAsks]);

  const contextValue: AppContextType = {
    selectedPair,
    balance,
    setBalance,
    setPair,
    currentBids,
    currentAsks,
    currentIndex,
    loading,
    orderHistory,
    createOrder,
    cancelOrder,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
