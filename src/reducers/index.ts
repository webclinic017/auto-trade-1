import { IMargins, IPositions } from "../types/kite";

export interface IStoreState {
  margins?: IMargins;
  positions?: IPositions;
  pnl: number;
  buys: number;
  sells: number;
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
