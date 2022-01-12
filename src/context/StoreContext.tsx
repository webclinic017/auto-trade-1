import { createContext, useReducer, useContext, FC, Dispatch } from "react";
import { IStoreAction, IStoreState } from "../reducers";

interface StoreProviderProps {
  initialState: IStoreState;
  reducer: (state: IStoreState, action: IStoreAction) => IStoreState;
}

interface IStoreContext {
  store: IStoreState;
  dispatch: Dispatch<IStoreAction>;
}

const StoreContext = createContext<IStoreContext>({} as any);

export const StoreProvider: FC<StoreProviderProps> = ({
  initialState,
  reducer,
  children,
}) => {
  const [store, dispatch] = useReducer(reducer, initialState);

  return (
    <StoreContext.Provider value={{ store, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
