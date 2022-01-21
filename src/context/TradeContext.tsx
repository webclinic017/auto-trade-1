import { FC, createContext, useContext, useEffect } from "react";
import { ws } from "../api/index";
import { LocalStorage } from "../entities/localstorage";
import { useAuth } from "./AuthContext";

interface ITradeContext {}

export const TradeContext = createContext<ITradeContext>({} as any);

export const TradeProvider: FC = ({ children }) => {
  const { isAuthenticated, profile } = useAuth();

  const connectUserWS = (): WebSocket => {
    let socket = new WebSocket(ws.users);

    socket.onopen = () => {
      socket.send(JSON.stringify({ authtoken: LocalStorage.authToken }));
    };

    socket.onmessage = (evt) => {
      console.log(evt.data);
    };

    return socket;
  };

  useEffect(() => {
    let socket: WebSocket;

    if (isAuthenticated && profile?.is_accesstoken_valid) {
      socket = connectUserWS();

      socket.onclose = (ev) => {
        if (ev.code !== 200) {
          setTimeout(() => {
            socket = connectUserWS();
          }, 2000);
        }
      };
    }

    return () => {
      if (socket) {
        socket.close(200);
      }
    };
  }, [isAuthenticated, profile]);

  return <TradeContext.Provider value={{}}>{children}</TradeContext.Provider>;
};

export const useTrade = () => useContext(TradeContext);
