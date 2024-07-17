import { useEffect, useState, useCallback } from "react";
import { BACKEND_BASE_API } from "../constants/constants";
import { manageArraySize } from "../helper/orderHelper";
import { OrderBookEntry, OrderBookUpdate } from "../types/types";
import io from "socket.io-client";
import axios from "axios";

export const useOrderBook = (selectedPair: string) => {
  const [coinID, setCoinID] = useState(selectedPair);
  const [currentBids, setCurrentBids] = useState<OrderBookEntry[]>([]);
  const [currentAsks, setCurrentAsks] = useState<OrderBookEntry[]>([]);
  const [currentPair, setCurrentPair] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const changeCoin = useCallback(async (newCoinID: string) => {
    try {
      const response = await axios.post(`${BACKEND_BASE_API}/api/setcoin`, {
        coinID: newCoinID,
      });
      console.log(response.data);
      setCoinID(newCoinID);
    } catch (error) {
      console.error("Error switching coin:", error);
    }
  }, []);

  useEffect(() => {
    const socket = io(BACKEND_BASE_API);
    const handleOrderBookUpdate = (data: OrderBookUpdate) => {
      setCurrentBids((prevBids) => manageArraySize(prevBids, data.bids, data.pair));
      setCurrentAsks((prevAsks) => manageArraySize(prevAsks, data.asks, data.pair));
      setCurrentPair(data.pair); 
      setLoading(false);
    };

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

    socket.on("orderBookUpdate", handleOrderBookUpdate);
    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("reconnect_attempt", handleReconnectAttempt);
    socket.on("reconnect", handleReconnect);

    changeCoin(selectedPair);

    return () => {
      socket.off("orderBookUpdate", handleOrderBookUpdate);
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("reconnect_attempt", handleReconnectAttempt);
      socket.off("reconnect", handleReconnect);
      socket.disconnect();
    };
  }, [selectedPair, changeCoin, coinID]);

  return { currentBids, currentAsks, currentPair, loading };
};
