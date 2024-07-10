export interface OrderBookEntry {
  price: number;
  size: number;
  total: number;
}

export interface Delta {
  bids?: number[][];
  asks?: number[][];
}
