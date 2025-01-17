import { OrderBookEntry } from "../types/types";
import { Order } from "../types/types";

export const manageArraySize = (
  prevArray: OrderBookEntry[],
  newArray: OrderBookEntry[],
  maxSize: number = 15
): OrderBookEntry[] => {
  let combined = [...newArray, ...prevArray]
  return combined.slice(0, maxSize);
};

export const createOrderHelper = (
  order: Order,
  balance: number,
  setBalance: React.Dispatch<React.SetStateAction<number>>,
  setOrderHistory: React.Dispatch<React.SetStateAction<Order[]>>
) => {
  const cost = order.price * order.quantity;

  if (
    (order.orderType === "BUY_LIMIT" || order.orderType === "MARKET_BUY") &&
    balance >= cost
  ) {
    setBalance((prevBalance) => prevBalance - cost);
    setOrderHistory((prevOrders) => [...prevOrders, order]);
  } else if (order.orderType === "SELL_LIMIT" || order.orderType === "MARKET_SELL") {
    setOrderHistory((prevOrders) => [...prevOrders, order]);
  } else {
    console.error("Insufficient balance for the order or unknown order type.");
  }
};

export const completeOrderHelper = (
  orderId: string,
  setOrderHistory: React.Dispatch<React.SetStateAction<Order[]>>
) => {
  let orderCompleted = false;

  setOrderHistory((prevOrders) =>
    prevOrders.map((order) => {
      if (!orderCompleted && order.status === "Pending" && order.orderId === orderId) {
        orderCompleted = true;
        return { ...order, status: "Filled", completionDate: new Date() };
      }
      return order;
    })
  );

  if (!orderCompleted) {
    console.error("Order not found or already completed.");
  }
};

export const cancelOrderHelper = (
  orderId: string,
  orderHistory: Order[],
  setOrderHistory: React.Dispatch<React.SetStateAction<Order[]>>,
  setBalance: React.Dispatch<React.SetStateAction<number>>
) => {
  let orderCanceled = false;

  const updatedOrderHistory = orderHistory.map((order) => {
    if (!orderCanceled && order.orderId === orderId && order.status !== "Filled") {
      orderCanceled = true;
      const updatedOrder: Order = {
        ...order,
        status: "Canceled",
        completionDate: new Date(),
      };

      if (order.status === "Pending" && order.orderType === "BUY_LIMIT") {
        const refund = order.price * order.quantity;
        setBalance((prevBalance) => prevBalance + refund);
      }

      if (order.status === "Pending" && order.orderType === "SELL_LIMIT") {
        const refund = order.price * order.quantity;
        setBalance((prevBalance) => prevBalance - refund);
      }

      return updatedOrder;
    }
    return order;
  });

  if (!orderCanceled) {
    console.error("Order not found or already completed.");
    return;
  }

  setOrderHistory(updatedOrderHistory);
};

export const checkOrderMatchesHelper = (
  currentBids: OrderBookEntry[],
  currentAsks: OrderBookEntry[],
  currentPair: string,
  setOrderHistory: React.Dispatch<React.SetStateAction<Order[]>>,
  completeOrder: (orderId: string) => void,
  setBalance: React.Dispatch<React.SetStateAction<number>>
) => {
  setOrderHistory((prevOrders) =>
    prevOrders.map((order) => {
      if (order.status === "Pending" && order.pair === currentPair) {
        if (order.orderType === "BUY_LIMIT") {
          const matchingAsk = currentAsks.find((ask) => ask.price <= order.price);
          if (matchingAsk) completeOrder(order.orderId);
        } else if (order.orderType === "SELL_LIMIT") {
          const matchingBid = currentBids.find((bid) => bid.price >= order.price);
          if (matchingBid) {
            completeOrder(order.orderId);
            const profit = order.price * order.quantity;
            setBalance((prevBalance) => prevBalance + profit);
          }
        }
      }
      return order;
    })
  );
};
