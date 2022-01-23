import { configureStore } from "@reduxjs/toolkit";
import { traderReducer } from "./features/trade/tradeSlice";
// configureStore is used for creating a store object ....
// same as initialState in context api
export const store = configureStore({
  reducer: {
    trader: traderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
