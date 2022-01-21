import { FC, createContext, useContext, useEffect } from "react";
import { sse_uri } from "../api";
import { useAuth } from "./AuthContext";

interface ITradeContext {}

export const TradeContext = createContext<ITradeContext>({} as any);

export const TradeProvider: FC = ({ children }) => {
  const { isAuthenticated, profile } = useAuth();

  useEffect(() => {
    let eventsource: EventSource;

    if (isAuthenticated && profile?.is_accesstoken_valid) {
      eventsource = new EventSource(sse_uri);

      eventsource.onmessage = (ev) => {
        console.log(ev.data);
      };

      eventsource.onerror = () => {
        eventsource.close();
      };
    }

    return () => {
      if (eventsource) {
        eventsource.close();
      }
    };
  }, [isAuthenticated, profile]);

  return <TradeContext.Provider value={{}}>{children}</TradeContext.Provider>;
};

export const useTrade = () => useContext(TradeContext);
