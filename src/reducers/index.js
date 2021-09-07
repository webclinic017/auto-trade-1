export const initialState = {
  market_orders: [],
  limit_orders: [],
};

export const reducer = (state, action) => {
  let res, data;

  switch (action.type) {
    case "UPDATE_MARKET_ORDERS":
      data = action.data;
      return { market_orders: data, ...state };

    case "UPDATE_LIMIT_ORDERS":
      data = action.data;
      return { limit_orders: data, ...state };

    default:
      return state;
  }
};
