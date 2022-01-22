import { FC, createContext, useContext, useEffect } from "react";
import { sse_uri } from "../api";
import { useExecuteTrade } from "../api/zerodha/executeTrade";
import { ITrade } from "../types/trade";
import { TradeUtil } from "../utils/TradeUtil";
import { useAuth } from "./AuthContext";
import { useStore } from "./StoreContext";

interface ITradeContext {}

export const TradeContext = createContext<ITradeContext>({} as any);

export const TradeProvider: FC = ({ children }) => {
  const { isAuthenticated, profile, margins, positions } = useAuth();
  const { mutate: executeTrade } = useExecuteTrade();
  const { store } = useStore();

  useEffect(() => {
    let tradeEvent: EventSource;

    if (
      isAuthenticated &&
      profile?.is_accesstoken_valid &&
      margins &&
      positions
    ) {
      tradeEvent = new EventSource(sse_uri);

      tradeEvent.onmessage = (ev: MessageEvent<string>) => {
        const trade = TradeUtil.generateTrade(
          JSON.parse(ev.data) as ITrade,
          profile
        );

        if (
          TradeUtil.validateTrade(trade, margins, positions) &&
          TradeUtil.shouldTrade(trade, store.trade_modes)
        ) {
          try {
            executeTrade(trade);
          } catch (error) {
            console.log(error);
          }
        }
      };

      tradeEvent.onerror = () => {
        tradeEvent.close();
      };
    }

    return () => {
      if (tradeEvent) {
        tradeEvent.close();
      }
    };
  }, [
    isAuthenticated,
    profile,
    executeTrade,
    margins,
    positions,
    store.trade_modes,
  ]);

  return <TradeContext.Provider value={{}}>{children}</TradeContext.Provider>;
};

export const useTrade = () => useContext(TradeContext);
