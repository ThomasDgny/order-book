import { ProductIds, TimeFrames } from "../constants/constants";

export type ProductIdKey = keyof typeof ProductIds;
export type TimeFrameKey = keyof typeof TimeFrames;

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
  tickerData: TickerData;
  loading: boolean;
  orderHistory: Order[];
  createOrder: (order: Order) => void;
  cancelOrder: (orderId: string) => void;
}

export interface TickerData {
  markPrice: number;
  volume: number;
  high: number;
  low: number;
  change: number;
}

export interface OrderFormProps {
  selectedPair: string;
  balance: number;
  tickerData: TickerData;
  createOrder: (order: Order) => void;
}

export interface CandleData {
  t: number;
  o: string;
  h: string;
  l: string;
  c: string;
}

export type KlinePayload = {
  e: "kline";
  E: number;
  s: string;
  k: {
    t: number;
    T: number;
    s: string;
    i: string;
    f: number;
    L: number;
    o: string;
    c: string;
    h: string;
    l: string;
    v: string;
    n: number;
    q: string;
    x: boolean;
    V: string;
    Q: string;
    B: string;
  };
};
