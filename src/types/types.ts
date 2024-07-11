export interface OrderBookEntry {
  price: number;
  size: number;
  total: number;
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
  currentIndex: number;
  loading: boolean;
  orderHistory: Order[];
  createOrder: (order: Order) => void;
  completeOrder: (orderId: string) => void;
  cancelOrder: (orderId: string) => void;
}
