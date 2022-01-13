import { FC, createContext, useContext, useEffect } from "react";
import { orders, socket, sockuser } from "../services/ws";
import { useNetwork } from "./NetworkContext";
import { useAuth } from "./AuthContext";
import { LocalStorage } from "../entities/localstorage";
import { IMargins, IPositions } from "../types/kite";
import { useStore } from "./StoreContext";
import { ITrade } from "../types/trade";
import { TradeUtil } from "../utils/TradeUtil";

interface UserSocketData {
  margins?: IMargins;
  positions?: IPositions;
  pnl?: number;
}

export const TradeContext = createContext({} as any);

export const TradeProvider: FC = ({ children }) => {
  const network = useNetwork();
  const { isAuthenticated, profile } = useAuth();
  const { dispatch } = useStore();

  useEffect(() => {
    console.log("calling useEffect");
  }, []);

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
      setInterval(() => {
        sockuser.send(JSON.stringify({ message: "ping" }));
      }, 10000);

      // when user socket receives a message
      sockuser.onmessage = (ev) => {
        const data = JSON.parse(ev.data) as UserSocketData;

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
      };

      socket.onmessage = (ev) => {
        const _trade = JSON.parse(ev.data) as ITrade;

        if (TradeUtil.shouldTrade(_trade)) {
          const trade = TradeUtil.generateTrade(_trade, profile);

          orders.send(JSON.stringify(trade));
        }
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile, isAuthenticated]);

  return <TradeContext.Provider value={{}}>{children}</TradeContext.Provider>;
};

export const useTrade = () => useContext(TradeContext);
