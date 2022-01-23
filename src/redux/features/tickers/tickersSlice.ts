import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ILiveTicker } from "../../../types/kite";

type TickersState = { data: ILiveTicker[] };

const initialState: TickersState = {
  data: [],
};

const tickersSlice = createSlice({
  name: "tickers",
  initialState,
  reducers: {
    update_live_tickers: (state, action: PayloadAction<ILiveTicker[]>) => {
      state.data = action.payload;
    },
  },
});

export const { update_live_tickers } = tickersSlice.actions;
export const tickersReducer = tickersSlice.reducer;
