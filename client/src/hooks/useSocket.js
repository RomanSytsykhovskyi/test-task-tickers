import { useState, useEffect, useCallback, useRef } from "react";
import { noLoading, setTickers } from "../store/priceTickerReducer";
import { useDispatch } from "react-redux";
import { io } from "socket.io-client";

export const useSocket = () => {
  const socket = useRef(null);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      socket.current = io("http://localhost:4000");

      socket.current.emit("start");

      socket.current.on("ticker", (quotes) => {
        dispatch(setTickers(quotes));
        dispatch(noLoading());
      });

      return (_) => {
        socket.current.disconnect();
      };
    } catch (e) {
      console.log(e.message);
    }
  }, [dispatch]);

  const nullError = useCallback(() => {
    setError(null);
  }, []);

  return {
    socket: socket.current,
    error,
    nullError,
  };
};
