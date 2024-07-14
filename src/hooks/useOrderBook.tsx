import { useEffect, useState } from "react";
import { BACKEND_BASE_API } from "../constants/constants";
import { OrderBookEntry } from "../types/types";
import io from "socket.io-client";
import axios from "axios";

export const useOrderBook = (selectedPair: string) => {
  const [coinID, setCoinID] = useState(selectedPair);
  const [currentBids, setCurrentBids] = useState<OrderBookEntry[]>([]);
  const [currentAsks, setCurrentAsks] = useState<OrderBookEntry[]>([]);
  const [currentPair, setCurrentPair] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const changeCoin = async (newCoinID: string) => {
    try {
      const response = await axios.post(`${BACKEND_BASE_API}/api/setcoin`, {
        coinID: newCoinID,
      });
      console.log(response.data);
      setCoinID(newCoinID);
    } catch (error) {
      console.error("Error switching coin:", error);
    }
  };

  useEffect(() => {
    const socket = io(BACKEND_BASE_API);

    changeCoin(selectedPair);

    socket.on("orderBookUpdate", (data) => {
      setCurrentPair(data.pair);
      setCurrentBids(data.bids);
      setCurrentAsks(data.asks);
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
  }, [selectedPair]);

  return { currentBids, currentAsks, currentPair, loading };
};
