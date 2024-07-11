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

export const AppContextProvider: React.FC<{ children: ReactNode }> = ({children}) => {
  const [selectedPair, setSelectedPair] = useState(ProductIds.XBTUSD);
  const [balance, setBalance] = useState(1000000000);
  const [orderHistory, setOrderHistory] = useState<Order[]>([]);
  const { currentBids, currentAsks, currentIndex, loading } = useOrderBook(selectedPair);

  const setPair = (pair: string) => {
    setSelectedPair(pair);
  };

  const createOrder = (order: Order) => {
    const newOrder: Order = order;
    setOrderHistory([...orderHistory, newOrder]);
  };

  const completeOrder = (orderId: string) => {
    setOrderHistory(prevOrders =>
      prevOrders.map(order =>
        order.orderId === orderId ? { ...order,  status: "Filled",  completionDate: new Date() } : order )
    );
    // Implement notification logic here
    // Example: notifyUser(orderId);
  };

  const cancelOrder = (orderId: string) => {
    setOrderHistory(prevOrders =>
      prevOrders.map(order =>
        order.orderId === orderId && order.status !== "Filled"
          ? { ...order, status: "Canceled", completionDate: new Date() } : order )
    );
    // Implement notification logic here
    // Example: notifyUser(orderId);
  };

const checkOrderMatches = () => {
    setOrderHistory(prevOrders =>
      prevOrders.map(order => {
        if (order.status === "Pending") {
          if (order.orderType === "BUY_LIMIT") {
            const matchingAsk = currentAsks.find(ask => ask.price <= order.price);
            if (matchingAsk) {
              completeOrder(order.orderId);
              // Notify user
              console.log(`Your BUY LIMIT order for ${order.pair} is completed`);
            }
          } else if (order.orderType === "SELL_LIMIT") {
            const matchingBid = currentBids.find(bid => bid.price >= order.price);
            if (matchingBid) {
              completeOrder(order.orderId);
              // Notify user
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
