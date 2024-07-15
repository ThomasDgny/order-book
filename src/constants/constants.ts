export const ORDERBOOK_LEVELS: number = 15;

export const INITIAL_BALANCE = 1000000;

export const BINANCE_WS_URL = "wss://stream.binance.com:9443/ws";
export const BACKEND_BASE_API = "https://order-book-server-ten.vercel.app";

export const Coins = {
  BTCUSD: "btcusdt",
  ETHBTC: "ethbtc",
  XRPUSD: "xrpusdt",
  LTCUSD: "ltcusdt",
};

export const TimeFrames = {
  "1m": "1m",
  "5m": "5m",
  "15m": "15m",
  "1h": "1h",
  "12h": "12h",
};

export const tableHeaders = [
  { key: "orderId", label: "Order ID" },
  { key: "orderType", label: "Order Type" },
  { key: "pair", label: "Pair" },
  { key: "price", label: "Price" },
  { key: "quantity", label: "Quantity" },
  { key: "total", label: "Total" },
  { key: "creationDate", label: "Creation Date" },
  { key: "status", label: "Status" },
  { key: "action", label: "Action" },
];
