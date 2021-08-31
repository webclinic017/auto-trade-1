import { rest } from "../api";

export const initialState = {
  market_orders: [],
  limit_orders: [],
};

export const reducer = async (state, action) => {
  let res, data;

  switch (action.type) {
    case "UPDATE_MARKET_ORDERS":
      res = await fetch(rest.market_api, {
        method: "GET",
        headers: {
          Authorization: `Token ${localStorage.getItem("@authToken")}`,
        },
      });

      data = await res.json();
      return { market_orders: data, ...state };

    case "UPDATE_LIMIT_ORDERS":
      res = await fetch(rest.limit_api, {
        method: "GET",
        headers: {
          Authorization: `Token ${localStorage.getItem("@authToken")}`,
        },
      });

      data = await res.json();
      return { limit_orders: data, ...state };

    default:
      return state;
  }
};
