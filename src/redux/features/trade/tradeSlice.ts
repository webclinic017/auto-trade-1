// layers in redux is called a slice think of it as slice of onion
// center portion of onion is the <App /> component
import { createSlice } from "@reduxjs/toolkit";

export interface TraderState {
  stocks: boolean;

  index_options: boolean;
  stock_options: boolean;

  enabled: boolean;
}

const initialState: TraderState = {
  stocks: false,
  index_options: false,
  stock_options: false,
  enabled: false,
};

const traderSlice = createSlice({
  name: "trader",
  initialState,
  reducers: {
    toggle_stocks: (state) => {
      state.stocks = !state.stocks;
    },
    toggle_index_options: (state) => {
      state.index_options = !state.index_options;
    },
    toggle_stock_options: (state) => {
      state.stock_options = !state.stock_options;
    },
    disable_trader: (state) => {
      state.enabled = false;
    },
    enable_trader: (state) => {
      state.enabled = true;
    },
  },
});

export const {
  toggle_stocks,
  toggle_index_options,
  toggle_stock_options,
  enable_trader,
  disable_trader,
} = traderSlice.actions;

export const traderReducer = traderSlice.reducer;
