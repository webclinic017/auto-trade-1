import { IMargins, IPositions } from "../types/kite";

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
}

export type StoreActions =
  | "UPDATE_MARGINS"
  | "UPDATE_POSITIONS"
  | "UPDATE_PNL"
  | "ADD_BUYS"
  | "ADD_SELLS";

export interface IStoreAction {
  type: StoreActions;
  payload?: IMargins | IPositions | number;
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
    default:
      return state;
  }
};
