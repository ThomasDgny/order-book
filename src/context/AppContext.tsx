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

const INITIAL_BALANCE = 1000000;
const INITIAL_PAIR = ProductIds.XBTUSD;

export const AppContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedPair, setSelectedPair] = useState<string>(INITIAL_PAIR);
  const [balance, setBalance] = useState<number>(INITIAL_BALANCE);
  const [orderHistory, setOrderHistory] = useState<Order[]>([]);
  const { currentBids, currentAsks , tickerData, loading } = useOrderBook(selectedPair);

  const setPair = (pair: string) => setSelectedPair(pair);

  const createOrder = (order: Order) => {
    const cost = order.price * order.quantity;
    if (order.orderType === "BUY_LIMIT" && balance >= cost) {
      setBalance(prevBalance => prevBalance - cost);
      setOrderHistory(prevOrders => [...prevOrders, order]);
    } else if (order.orderType === "SELL_LIMIT") {
      setOrderHistory(prevOrders => [...prevOrders, order]);
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
          if (order.status === "Pending" && order.orderType === "BUY_LIMIT") {
            const refund = order.price * order.quantity;
            setBalance(prevBalance => prevBalance + refund);
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
            if (matchingAsk) completeOrder(order.orderId);
          } else if (order.orderType === "SELL_LIMIT") {
            const matchingBid = currentBids.find(bid => bid.price >= order.price);
            if (matchingBid) {
              completeOrder(order.orderId);
              const profit = order.price * order.quantity;
              setBalance(prevBalance => prevBalance + profit);
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
