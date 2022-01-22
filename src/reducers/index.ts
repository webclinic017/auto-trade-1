import { ILiveTicker, IMargins, IPositions } from "../types/kite";

export interface ITradeModes {
  should_trade_index: boolean;
  should_trade_index_options: boolean;
  should_trade_index_futures: boolean;
  should_trade_stocks: boolean;
  should_trade_stock_options: boolean;
  should_trade: boolean;
}

export interface IStoreState {
  margins?: IMargins;
  positions?: IPositions;
  pnl: number;
  buys: number;
  sells: number;
  trade_modes: ITradeModes;
  live_tickers: ILiveTicker[];
}

export type StoreActions =
  | "UPDATE_MARGINS"
  | "UPDATE_POSITIONS"
  | "UPDATE_PNL"
  | "ADD_BUYS"
  | "ADD_SELLS"
  | "TOGGEL_TRADE"
  | "TOGGEL_INDEX_TRADE"
  | "TOGGEL_INDEX_OPTIONS_TRADE"
  | "TOGGEL_INDEX_FUTURES_TRADE"
  | "TOGGEL_STOCK_OPTIONS_TRADE"
  | "TOGGEL_STOCK_TRADE"
  | "ENABLE_TRADE"
  | "DISABLE_TRADE"
  | "UPDATE_LIVE_TICKERS";

export interface IStoreAction {
  type: StoreActions;
  payload?: IMargins | IPositions | ILiveTicker[] | number;
}

export const initialState: IStoreState = {
  margins: undefined,
  positions: undefined,
  pnl: 0,
  buys: 0,
  sells: 0,
  trade_modes: {
    should_trade_index: false,
    should_trade_index_options: false,
    should_trade_index_futures: false,
    should_trade_stock_options: false,
    should_trade_stocks: false,
    should_trade: true,
  },
  live_tickers: [],
};

export const reducer = (
  state: IStoreState,
  action: IStoreAction
): IStoreState => {
  switch (action.type) {
    case "UPDATE_MARGINS":
      return { ...state, margins: action.payload as IMargins };
    case "UPDATE_POSITIONS":
      return { ...state, positions: action.payload as IPositions };
    case "UPDATE_PNL":
      return { ...state, pnl: action.payload as number };
    case "ADD_BUYS":
      return { ...state, buys: state.buys + 1 };
    case "ADD_SELLS":
      return { ...state, sells: state.sells + 1 };
    case "TOGGEL_INDEX_TRADE":
      return {
        ...state,
        trade_modes: {
          ...state.trade_modes,
          should_trade_index: !state.trade_modes.should_trade_index,
        },
      };
    case "TOGGEL_INDEX_OPTIONS_TRADE":
      return {
        ...state,
        trade_modes: {
          ...state.trade_modes,
          should_trade_index_options:
            !state.trade_modes.should_trade_index_options,
        },
      };
    case "TOGGEL_INDEX_FUTURES_TRADE":
      return {
        ...state,
        trade_modes: {
          ...state.trade_modes,
          should_trade_index_futures:
            !state.trade_modes.should_trade_index_futures,
        },
      };
    case "TOGGEL_STOCK_TRADE":
      return {
        ...state,
        trade_modes: {
          ...state.trade_modes,
          should_trade_stocks: !state.trade_modes.should_trade_stocks,
        },
      };
    case "TOGGEL_STOCK_OPTIONS_TRADE":
      return {
        ...state,
        trade_modes: {
          ...state.trade_modes,
          should_trade_stock_options:
            !state.trade_modes.should_trade_stock_options,
        },
      };
    case "ENABLE_TRADE":
      return {
        ...state,
        trade_modes: { ...state.trade_modes, should_trade: true },
      };
    case "DISABLE_TRADE":
      return {
        ...state,
        trade_modes: { ...state.trade_modes, should_trade: false },
      };
    case "UPDATE_LIVE_TICKERS":
      return { ...state, live_tickers: action.payload as ILiveTicker[] };
    default:
      return state;
  }
};
