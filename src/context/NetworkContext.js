import React, { createContext, useState, useEffect, useContext } from "react";

const NetworkContext = createContext();

export const NetworkProvider = ({ children }) => {
  const [network, setNetwork] = useState(true);

  useEffect(() => {
    window.addEventListener("offline", () => {
      setNetwork((val) => false);
    });
  }, []);

  return (
    <NetworkContext.Provider value={{ network, setNetwork }}>
      {children}
    </NetworkContext.Provider>
  );
};

export const useNetwork = () => useContext(NetworkContext);
