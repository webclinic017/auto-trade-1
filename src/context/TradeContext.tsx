import { FC, createContext, useContext, useEffect } from "react";
import { orders, socket, sockuser } from "../services/ws";
import { useNetwork } from "./NetworkContext";
import { useAuth } from "./AuthContext";
import { LocalStorage } from "../entities/localstorage";
import { ILiveTicker, IMargins, IPositions } from "../types/kite";
import { useStore } from "./StoreContext";
import { ITrade } from "../types/trade";
import { TradeUtil } from "../utils/TradeUtil";

interface UserSocketData {
  margins?: IMargins;
  positions?: IPositions;
  pnl?: number;
  error?: {
    status: boolean;
    message: string;
  };
  tickers?: ILiveTicker[];
}

interface ITradeContext {}

export const TradeContext = createContext<ITradeContext>({} as any);

export const TradeProvider: FC = ({ children }) => {
  const network = useNetwork();
  const { isAuthenticated, profile } = useAuth();
  const { store, dispatch } = useStore();
  const { trade_modes } = store;

  useEffect(() => {
    //   handle all closing sockets .....
    sockuser.onclose = () => {
      network.setNetworkStatus(false);
    };

    socket.onclose = () => {
      network.setNetworkStatus(false);
    };

    orders.onclose = () => {
      network.setNetworkStatus(false);
    };
  }, [network]);

  useEffect(() => {
    let sock_user_interval: ReturnType<typeof setInterval> | undefined;

    //   when the user is authenticated send the auth token to the backend
    if (isAuthenticated) {
      // authenticate the user socket
      sockuser.send(
        JSON.stringify({
          authtoken: LocalStorage.authToken,
        })
      );

      // authenticate the orders socket
      orders.send(JSON.stringify({ authtoken: LocalStorage.authToken }));

      // for every 10 seconds ping the server
      sock_user_interval = setInterval(() => {
        sockuser.send(JSON.stringify({ message: "ping" }));
      }, 10000);
    }

    return () => {
      if (sock_user_interval) {
        clearInterval(sock_user_interval);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated && profile) {
      // when user socket receives a message
      sockuser.onmessage = (ev) => {
        const data = JSON.parse(ev.data) as UserSocketData;

        if (data?.error?.status) {
          return;
        }

        dispatch({
          type: "UPDATE_MARGINS",
          payload: data?.margins,
        });

        dispatch({
          type: "UPDATE_POSITIONS",
          payload: data?.positions,
        });

        dispatch({
          type: "UPDATE_PNL",
          payload: data.pnl ?? 0,
        });

        dispatch({
          type: "UPDATE_LIVE_TICKERS",
          payload: data?.tickers ?? [],
        });

        const pnl = data?.pnl ?? 0;
        if (pnl < -1 * profile.max_loss && pnl > profile.max_profit) {
          if (trade_modes.should_trade) {
            dispatch({
              type: "DISABLE_TRADE",
            });
          }
        } else {
          if (!trade_modes.should_trade) {
            dispatch({
              type: "ENABLE_TRADE",
            });
          }
        }
      };
    } else {
      sockuser.onmessage = () => {};
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, profile, trade_modes.should_trade]);

  useEffect(() => {
    if (isAuthenticated && profile) {
      socket.onmessage = (ev) => {
        const _trade = JSON.parse(ev.data) as ITrade;

        if (TradeUtil.shouldTrade(_trade, trade_modes)) {
          const trade = TradeUtil.generateTrade(_trade, profile);

          orders.send(JSON.stringify(trade));
        }
      };
    } else {
      socket.onmessage = () => {};
    }
  }, [isAuthenticated, profile, trade_modes]);

  return <TradeContext.Provider value={{}}>{children}</TradeContext.Provider>;
};

export const useTrade = () => useContext(TradeContext);
