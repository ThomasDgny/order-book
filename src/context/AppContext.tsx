import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { cancelOrderHelper, checkOrderMatchesHelper, completeOrderHelper, createOrderHelper } from "../helper/orderHelper";
import { AppContextType, Order } from "../types/types";
import { useOrderBook } from "../hooks/useOrderBook";
import { useTicker } from "../hooks/useTicker";
import { Coins } from "../constants/constants";

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
};

const INITIAL_BALANCE = 1000000;

export const AppContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedPair, setSelectedPair] = useState<string>(Coins.BTCUSD);
  const [balance, setBalance] = useState<number>(INITIAL_BALANCE);
  const [orderHistory, setOrderHistory] = useState<Order[]>([]);

  const { currentBids, currentAsks, loading} = useOrderBook(selectedPair);
  const { tickerData } = useTicker(selectedPair);

  const setPair = (pair: string) => setSelectedPair(pair);

  const createOrder = (order: Order) => {
    createOrderHelper(order, balance, setBalance, setOrderHistory);
  };

  const completeOrder = (orderId: string) => {
    completeOrderHelper(orderId, setOrderHistory);
  };

  const cancelOrder = (orderId: string) => {
    cancelOrderHelper(orderId, orderHistory, setOrderHistory, setBalance);
  };

  const checkOrderMatches = () => {
    checkOrderMatchesHelper(currentBids, currentAsks, setOrderHistory, completeOrder, setBalance);
  };

  useEffect(() => {
    checkOrderMatches();
  }, [currentBids, currentAsks]);

  const contextValue: AppContextType = {
    loading,
    tickerData,
    selectedPair,
    balance,
    setBalance,
    setPair,
    currentBids,
    currentAsks,
    orderHistory,
    createOrder,
    cancelOrder,
  };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};
