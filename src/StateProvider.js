import React, { createContext, useContext, useReducer } from "react";

//prepare your Data layer
export const StateContext = createContext();

//wrap our app and provider in Data layer
export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

//pull information from the Data layer
export const useStateValue = () => useContext(StateContext);
