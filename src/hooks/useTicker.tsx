import { useEffect, useState } from "react";
import { BACKEND_BASE_API } from "../constants/constants";
import io from "socket.io-client";

export const useTicker = (coinID: string) => {
  const [tickerData, setTickerData] = useState({
    markPrice: 0,
    volume: 0,
    high: 0,
    low: 0,
    change: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const socket = io(BACKEND_BASE_API);

    socket.on("tickerUpdate", (data) => {
      setTickerData({
        markPrice: parseFloat(data.c),
        volume: parseFloat(data.v),
        high: parseFloat(data.h),
        low: parseFloat(data.l),
        change: parseFloat(data.p),
      });
      setLoading(false);
    });

    socket.on("connect", () => {
      console.log("Connected to WebSocket server");
      socket.emit("changeCoin", coinID);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from WebSocket server");
    });

    socket.on("reconnect_attempt", () => {
      console.log("Attempting to reconnect to WebSocket server");
    });

    socket.on("reconnect", () => {
      console.log("Reconnected to WebSocket server");
      socket.emit("changeCoin", coinID);
    });

    return () => {
      socket.disconnect();
    };
  }, [coinID]);

  return { tickerData, loading };
};
