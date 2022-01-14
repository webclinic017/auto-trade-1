import { useStore } from "../../context/StoreContext";

export interface UseHomeHooks {
  toggel_index_futures_trading: () => void;
  toggel_index_options_tradind: () => void;
  toggel_index_trading: () => void;
  toggel_stock_trading: () => void;
  toggel_stock_options_trading: () => void;
  index: boolean;
  index_options: boolean;
  index_futures: boolean;
  stocks: boolean;
  stock_options: boolean;
  should_trade: boolean;
}

export const useHome = (): UseHomeHooks => {
  const { store, dispatch } = useStore();

  const toggel_index_trading: UseHomeHooks["toggel_index_trading"] = () => {
    dispatch({
      type: "TOGGEL_INDEX_TRADE",
    });
  };

  const toggel_index_options_tradind: UseHomeHooks["toggel_index_options_tradind"] =
    () => {
      dispatch({
        type: "TOGGEL_INDEX_OPTIONS_TRADE",
      });
    };

  const toggel_index_futures_trading: UseHomeHooks["toggel_index_futures_trading"] =
    () => {
      dispatch({
        type: "TOGGEL_INDEX_FUTURES_TRADE",
      });
    };

  const toggel_stock_trading: UseHomeHooks["toggel_stock_trading"] = () => {
    dispatch({
      type: "TOGGEL_STOCK_TRADE",
    });
  };

  const toggel_stock_options_trading: UseHomeHooks["toggel_stock_options_trading"] =
    () => {
      dispatch({
        type: "TOGGEL_STOCK_OPTIONS_TRADE",
      });
    };

  return {
    toggel_index_futures_trading,
    toggel_index_options_tradind,
    toggel_index_trading,
    toggel_stock_trading,
    toggel_stock_options_trading,
    index: store.trade_modes.should_trade_index,
    index_options: store.trade_modes.should_trade_index_options,
    index_futures: store.trade_modes.should_trade_index_futures,
    stocks: store.trade_modes.should_trade_stocks,
    stock_options: store.trade_modes.should_trade_stock_options,
    should_trade: store.trade_modes.should_trade,
  };
};
