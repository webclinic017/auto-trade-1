import { FC, createContext, useContext, useEffect } from "react";
import { orders, socket, sockuser } from "../services/ws";
import { useNetwork } from "./NetworkContext";
import { useAuth } from "./AuthContext";
import { LocalStorage } from "../entities/localstorage";
import { useStore } from "./StoreContext";
import { ITrade } from "../types/trade";
import { TradeUtil } from "../utils/TradeUtil";
import { ILiveTicker } from "../types/kite";

interface ITradeContext {}

interface WebSocketData {
  type: "kite.tickers";
  data: ILiveTicker[];
}

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
      // orders.send(JSON.stringify({ authtoken: LocalStorage.authToken }));

      // sock_user_interval = setInterval(() => {
      //   sockuser.send(JSON.stringify({ ping: true }));
      // }, 10000);
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
        const data = JSON.parse(ev.data) as WebSocketData;

        switch (data.type) {
          case "kite.tickers":
            dispatch({
              type: "UPDATE_LIVE_TICKERS",
              payload: data.data,
            });
            break;
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
