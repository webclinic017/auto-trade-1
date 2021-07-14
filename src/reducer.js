export const initialState = {
  tradeStock: false,
  tradeIndexOpt: false,
  tradeIndexFut: false,
  tradeStockOpt: false,
  tradeStockFut: false,
  orders: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    // toggle stocks
    case "T_STOCKS":
      return { ...state, tradeStock: !state.tradeStock };

    // toggle index options
    case "T_INDEX_OPT":
      return { ...state, tradeIndexOpt: !state.tradeIndexOpt };

    // toggle index futures
    case "T_INDEX_FUT":
      return { ...state, tradeIndexFut: !state.tradeIndexFut };

    // toggle stock options
    case "T_STOCK_OPT":
      return { ...state, tradeStockOpt: !state.tradeStockOpt };

    // toggle stock futures
    case "T_STOCK_FUT":
      return { ...state, tradeStockFut: !state.tradeStockFut };

    case "STOP_WORKERS":
      return {
        ...state,
        tradeIndexOpt: false,
        tradeIndexFut: false,
        tradeStock: false,
        tradeStockOpt: false,
        tradeStockFut: false,
      };
    default:
      return state;
  }
};

export default reducer;
