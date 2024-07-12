import { OrderBookEntry } from "../types/types";

export const calculateRunningTotal = (entries: OrderBookEntry[]): OrderBookEntry[] => {
  let runningTotal = 0;
  return entries.map((entry) => {
    runningTotal += entry.size;
    return { ...entry, total: runningTotal };
  });
};

export const manageArraySize = (prevArray: OrderBookEntry[], newArray: OrderBookEntry[], maxSize: number = 15): OrderBookEntry[] => {
  const combined = [...newArray, ...prevArray].sort((a: OrderBookEntry, b: OrderBookEntry) => a.price + b.price);
  return combined.slice(0, maxSize);
};
