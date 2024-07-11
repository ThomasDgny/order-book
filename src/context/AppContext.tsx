import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
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

export const AppContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedPair, setSelectedPair] = useState(ProductIds.XBTUSD);
  const [balance, setBalance] = useState(1000000000);
  const [orderHistory, setOrderHistory] = useState<Order[]>([]);
  const { currentBids, currentAsks, currentIndex, loading } =
    useOrderBook(selectedPair);

  const setPair = (pair: string) => {
    setSelectedPair(pair);
  };

  const createOrder = (order: Order) => {
    const cost = order.price * order.quantity;
    console.log(`Creating order: ${JSON.stringify(order)}`);

    if (order.orderType === "BUY_LIMIT") {
      if (balance >= cost) {
        setBalance((prevBalance) => prevBalance - cost);
        setOrderHistory((prevOrders) => [
          ...prevOrders,
          { ...order, status: "Pending" },
        ]);
      } else {
        console.error("Insufficient balance for the order.");
      }
    }

    if (order.orderType === "SELL_LIMIT") {
      setOrderHistory((prevOrders) => [
        ...prevOrders,
        { ...order, status: "Pending" },
      ]);
    }

    setTimeout(() => {
      checkOrderMatches();
    }, 100);
  };

  const completeOrder = useCallback((orderId: string) => {
    console.log(`Completing order: ${orderId}`);
    setOrderHistory((prevOrders) =>
      prevOrders.map((order) =>
        order.orderId === orderId
          ? { ...order, status: "Filled", completionDate: new Date() }
          : order
      )
    );
  }, []);

  const cancelOrder = (orderId: string) => {
    console.log(`Canceling order: ${orderId}`);
    setOrderHistory((prevOrders) =>
      prevOrders.map((order) => {
        if (order.orderId === orderId && order.status !== "Filled") {
          if (order.status === "Pending") {
            const refund = order.price * order.quantity;
            if (order.orderType === "BUY_LIMIT") {
              setBalance((prevBalance) => prevBalance + refund);
            }
          }
          return { ...order, status: "Canceled", completionDate: new Date() };
        }
        return order;
      })
    );
  };

  const matchOrder = useCallback(
    (order: Order) => {
      if (order.orderType === "BUY_LIMIT") {
        const matchingAsk = currentAsks.find((ask) => ask.price === order.price);
        console.log(
          `Checking SELL_LIMIT order. Order Price: ${
            order.price
          }, Matching Bid: ${matchingAsk ? matchingAsk.price : "No match"}`
        );
        if (matchingAsk) {
          completeOrder(order.orderId);
          console.log(`Your BUY LIMIT order for ${order.pair} is completed`);
        }
      } else if (order.orderType === "SELL_LIMIT") {
        const matchingBid = currentBids.find((bid) => bid.price === order.price);
        console.log(
          `Checking SELL_LIMIT order. Order Price: ${
            order.price
          }, Matching Bid: ${matchingBid ? matchingBid.price : "No match"}`
        );
        if (matchingBid) {
          completeOrder(order.orderId);
          const profit = order.price * order.quantity;
          setBalance((prevBalance) => prevBalance + profit);
          console.log(`Your SELL LIMIT order for ${order.pair} is completed`);
        }
      }
    },
    [currentAsks, currentBids, completeOrder]
  );

  const checkOrderMatches = useCallback(() => {
    console.log("Checking order matches");
    setOrderHistory((prevOrders) => {
      const updatedOrders = prevOrders.map((order) => {
        if (order.status === "Pending") {
          matchOrder(order);
        }
        return order;
      });
      return updatedOrders;
    });
  }, [matchOrder]);

  useEffect(() => {
    checkOrderMatches();
  }, [currentBids, currentAsks, checkOrderMatches]);

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
