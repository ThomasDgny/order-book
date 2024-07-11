import { ORDERBOOK_LEVELS } from "../constants/constants";
import { OrderbookState } from "../types/types";

const initialState: OrderbookState = {
  market: "PI_XBTUSD",
  rawBids: [],
  bids: [],
  maxTotalBids: 0,
  rawAsks: [],
  asks: [],
  maxTotalAsks: 0,
  groupingSize: 0.5,
};

const removePriceLevel = (price: number, levels: number[][]): number[][] =>
  levels.filter((level) => level[0] !== price);

const updatePriceLevel = (
  updatedLevel: number[],
  levels: number[][]
): number[][] => {
  return levels.map((level) =>
    level[0] === updatedLevel[0] ? updatedLevel : level
  );
};

const levelExists = (
  deltaLevelPrice: number,
  currentLevels: number[][]
): boolean => currentLevels.some((level) => level[0] === deltaLevelPrice);

const addPriceLevel = (
  deltaLevel: number[],
  levels: number[][]
): number[][] => {
  return [...levels, deltaLevel];
};

const applyDeltas = (
  currentLevels: number[][],
  orders: number[][]
): number[][] => {
  let updatedLevels: number[][] = currentLevels;

  orders.forEach((deltaLevel) => {
    const deltaLevelPrice = deltaLevel[0];
    const deltaLevelSize = deltaLevel[1];

    if (deltaLevelSize === 0) {
      updatedLevels = removePriceLevel(deltaLevelPrice, updatedLevels);
    } else {
      if (levelExists(deltaLevelPrice, updatedLevels)) {
        updatedLevels = updatePriceLevel(deltaLevel, updatedLevels);
      } else {
        if (updatedLevels.length < ORDERBOOK_LEVELS) {
          updatedLevels = addPriceLevel(deltaLevel, updatedLevels);
        }
      }
    }
  });

  return updatedLevels;
};

const calculateTotal = (entries: number[][]): number[][] => {
  let cumulativeTotal = 0;
  return entries.map(([price, size]) => {
    cumulativeTotal += size;
    return [price, size, cumulativeTotal];
  });
};

const addTotalSums = (orders: number[][]): number[][] => {
  return calculateTotal(orders);
};

const formatNumber = (num: number, digits: number): string => {
  return num?.toLocaleString("en", {
    useGrouping: true,
    minimumFractionDigits: digits,
  });
};

export { initialState, applyDeltas, addTotalSums, formatNumber };
