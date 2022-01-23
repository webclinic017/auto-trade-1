import {
  toggle_index_options,
  toggle_stock_options,
  toggle_stocks,
} from "../../redux/features/trade/tradeSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";

export interface UseHomeHooks {
  toggleIndexOptions: () => void;
  isIndexOptionsEnabled: boolean;
  toggleStockOptions: () => void;
  toggleStocks: () => void;
  isStockOptionsEnabled: boolean;
  isStocksEnabled: boolean;
  isTraderEnabled: boolean;
}

export const useHome = (): UseHomeHooks => {
  const isIndexOptionsEnabled = useSelector(
    (state: RootState) => state.trader.index_options
  );
  const isStockOptionsEnabled = useSelector(
    (state: RootState) => state.trader.stock_options
  );
  const isStocksEnabled = useSelector(
    (state: RootState) => state.trader.stocks
  );
  const isTraderEnabled = useSelector(
    (state: RootState) => state.trader.enabled
  );

  const dispatch = useDispatch();

  const toggleIndexOptions: UseHomeHooks["toggleIndexOptions"] = () => {
    dispatch(toggle_index_options());
  };

  const toggleStockOptions = () => {
    dispatch(toggle_stock_options());
  };

  const toggleStocks = () => {
    dispatch(toggle_stocks());
  };

  return {
    toggleIndexOptions,
    isIndexOptionsEnabled,
    toggleStockOptions,
    toggleStocks,
    isStockOptionsEnabled,
    isStocksEnabled,
    isTraderEnabled,
  };
};
