const ORDERBOOK_LEVELS = 15;

export interface OrderbookState {
  market: string;
  rawBids: number[][];
  bids: number[][];
  maxTotalBids: number;
  rawAsks: number[][];
  asks: number[][];
  maxTotalAsks: number;
  groupingSize: number;
}

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

const updatePriceLevel = (updatedLevel: number[], levels: number[][]): number[][] => {
  return levels.map((level) => (level[0] === updatedLevel[0] ? updatedLevel : level));
};

const applyDeltas = (currentLevels: number[][], orders: number[][]): number[][] => {
  let updatedLevels: number[][] = currentLevels;

  orders.forEach((deltaLevel) => {
    const [deltaLevelPrice, deltaLevelSize] = deltaLevel;

    if (deltaLevelSize === 0) {
      updatedLevels = removePriceLevel(deltaLevelPrice, updatedLevels);
    } else {
      if (updatedLevels.some((level) => level[0] === deltaLevelPrice)) {
        updatedLevels = updatePriceLevel(deltaLevel, updatedLevels);
      } else if (updatedLevels.length < ORDERBOOK_LEVELS) {
        updatedLevels = [...updatedLevels, deltaLevel];
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

export { initialState, applyDeltas, addTotalSums };
