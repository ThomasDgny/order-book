export interface OrderBookEntry {
  price: number;
  size: number;
}

export interface Delta {
  bids?: number[][];
  asks?: number[][];
}

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

export interface Order {
  orderId: string;
  orderType: "BUY_LIMIT" | "SELL_LIMIT" | "MARKET_BUY" | "MARKET_SELL";
  pair: string;
  price: number;
  quantity: number;
  total: number;
  creationDate: Date;
  completionDate: Date | null;
  status: "Pending" | "Filled" | "Canceled";
}

export interface AppContextType {
  selectedPair: string;
  balance: number;
  setBalance: React.Dispatch<React.SetStateAction<number>>;
  setPair: (pair: string) => void;
  currentBids: OrderBookEntry[];
  currentAsks: OrderBookEntry[];
  tickerData: setTickerData;
  loading: boolean;
  orderHistory: Order[];
  createOrder: (order: Order) => void;
  cancelOrder: (orderId: string) => void;
}

export interface setTickerData {
  markPrice: number;
  volume: number;
  high: number;
  low: number;
  change: number;
}
