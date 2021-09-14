export const initialState = {
  market_orders: [],
  limit_orders: [],
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_MARKET_ORDERS":
      return { ...state, market_orders: action.data };

    case "UPDATE_LIMIT_ORDERS":
      return { ...state, limit_orders: action.data };

    default:
      return state;
  }
};
