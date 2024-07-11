import React, { createContext, ReactNode, useContext, useState } from "react";
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
    const [balance, setBalance] = useState(1000);
    const [orderHistory, setOrderHistory] = useState<Order[]>([]);
    const { currentBids, currentAsks, currentIndex, loading } = useOrderBook(selectedPair);
  
    const setPair = (pair: string) => {
      setSelectedPair(pair);
    };
  
    const createOrder = (order: Omit<Order, "orderId" | "completionDate" | "status">) => {
      const newOrder: Order = {
        orderId: orderHistory.length + 1, 
        completionDate: null,
        status: "Pending",
        ...order,
        creationDate: new Date(),
      };
      setOrderHistory([...orderHistory, newOrder]);
    };
  
    const completeOrder = (orderId: number) => {
    //   const updatedOrders = orderHistory.map(order =>
    //     order.orderId === orderId ? { ...order, status: "Filled", completionDate: new Date() } : order
    //   );
    //   setOrderHistory(updatedOrders);
    };
  
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
      completeOrder,
    };
  
    return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
  };
