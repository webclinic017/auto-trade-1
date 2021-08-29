import React, { createContext, useReducer, useContext } from "react";

const StoreContext = createContext();

export const StoreProvider = ({ initialState, reducer, children }) => {
  return (
    <StoreContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
