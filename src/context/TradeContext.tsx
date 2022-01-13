import { FC, createContext, useContext, useEffect } from "react";
import { sockuser } from "../services/ws";
import { useNetwork } from "./NetworkContext";
import { useAuth } from "./AuthContext";
import { LocalStorage } from "../entities/localstorage";

export const TradeContext = createContext({} as any);

export const TradeProvider: FC = () => {
  const network = useNetwork();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    //   handle all closing sockets .....
    sockuser.onclose = () => {
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
    }
  }, [isAuthenticated]);

  return <TradeContext.Provider value={{}}></TradeContext.Provider>;
};

export const useTrade = () => useContext(TradeContext);
