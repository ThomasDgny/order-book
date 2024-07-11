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
      // Remove the price level if the size is zero
      updatedLevels = removePriceLevel(deltaLevelPrice, updatedLevels);
    } else {
      if (levelExists(deltaLevelPrice, updatedLevels)) {
        // Update the existing price level
        updatedLevels = updatePriceLevel(deltaLevel, updatedLevels);
      } else {
        // Add new price level if it does not exist
        if (updatedLevels.length < ORDERBOOK_LEVELS) {
          updatedLevels = addPriceLevel(deltaLevel, updatedLevels);
        }
      }
    }
  });

  // Limit the number of levels to ORDERBOOK_LEVELS
  if (updatedLevels.length > ORDERBOOK_LEVELS) {
    updatedLevels = updatedLevels.slice(0, ORDERBOOK_LEVELS);
  }

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
