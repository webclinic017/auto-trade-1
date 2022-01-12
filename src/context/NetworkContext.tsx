import { createContext, useState, useEffect, useContext, FC } from "react";

interface NetworkProviderContext {
  isNetworkActive: boolean;
  setNetworkStatus: (status: boolean) => void;
}

export const NetworkContext = createContext<NetworkProviderContext>({} as any);

export const NetworkProvider: FC = ({ children }) => {
  const [isNetworkActive, setIsNetworkActive] = useState(true);

  useEffect(() => {
    window.addEventListener("offline", () => {
      setIsNetworkActive(false);
    });
  }, []);

  return (
    <NetworkContext.Provider
      value={{ isNetworkActive, setNetworkStatus: setIsNetworkActive }}
    >
      {children}
    </NetworkContext.Provider>
  );
};

export const useNetwork = () => useContext(NetworkContext);
