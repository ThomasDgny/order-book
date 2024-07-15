import { useEffect, useState, useCallback } from "react";
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

  const handleTickerUpdate = useCallback((data: any) => {
    setTickerData({
      markPrice: parseFloat(data.c),
      volume: parseFloat(data.v),
      high: parseFloat(data.h),
      low: parseFloat(data.l),
      change: parseFloat(data.p),
    });
    setLoading(false);
  }, []);

  useEffect(() => {
    const socket = io(BACKEND_BASE_API);

    const handleConnect = () => {
      console.log("Connected to WebSocket server");
      socket.emit("changeCoin", coinID);
    };

    const handleDisconnect = () => {
      console.log("Disconnected from WebSocket server");
    };

    const handleReconnectAttempt = () => {
      console.log("Attempting to reconnect to WebSocket server");
    };

    const handleReconnect = () => {
      console.log("Reconnected to WebSocket server");
      socket.emit("changeCoin", coinID);
    };

    socket.on("tickerUpdate", handleTickerUpdate);
    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("reconnect_attempt", handleReconnectAttempt);
    socket.on("reconnect", handleReconnect);

    return () => {
      socket.off("tickerUpdate", handleTickerUpdate);
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("reconnect_attempt", handleReconnectAttempt);
      socket.off("reconnect", handleReconnect);
      socket.disconnect();
    };
  }, [coinID, handleTickerUpdate]);

  return { tickerData, loading };
};
