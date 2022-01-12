import { IMargins, IPositions } from "../types/kite";

export interface IStoreState {
  margins?: IMargins;
  positions?: IPositions;
}

export type StoreActions = "UPDATE_MARGINS" | "UPDATE_POSITIONS";

export interface IStoreAction {
  type: StoreActions;
  payload?: IMargins | IPositions;
}

export const initialState: IStoreState = {
  margins: undefined,
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
    default:
      return state;
  }
};
