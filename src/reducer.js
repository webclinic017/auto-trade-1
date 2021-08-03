export const initialState = {
  tradeStock: false,
  tradeIndexOpt: false,
  tradeIndexFut: false,
  tradeStockOpt: false,
  tradeStockFut: false,
  buys: 0,
  sells: 0,
  tradeMode: true,
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

    // stop all workers
    case "STOP_WORKERS":
      return {
        ...state,
        tradeIndexOpt: false,
        tradeIndexFut: false,
        tradeStock: false,
        tradeStockOpt: false,
        tradeStockFut: false,
      };

    // add a buy
    case "ADD_BUY":
      return {
        ...state,
        buy: state.buys + 1,
      };

    // add a sell
    case "ADD_SELL":
      return {
        ...state,
        buy: state.sells + 1,
      };

    // stop the trade mode
    case "STOP_TRADE_MODE":
      return {
        ...state,
        tradeMode: false,
      };

    // start the trade mode
    case "START_TRADE_MODE":
      return {
        ...state,
        tradeMode: true,
      };

    // by default return the state
    default:
      return state;
  }
};

export default reducer;
