export interface OrderBookEntry {
  price: number;
  size: number;
  total: number;
}

export interface Delta {
  bids?: number[][];
  asks?: number[][];
}


export interface Order {
  orderId: number;
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
    createOrder: (order: Omit<Order, "orderId" | "completionDate" | "status">) => void;
    completeOrder: (orderId: number) => void;
  }