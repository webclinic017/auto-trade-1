import { rest } from "../api";

export const initialState = {
  market_orders: [],
  limit_orders: [],
};

export const reducer = async ({ state, action }) => {
  switch (action.type) {
    case "UPDATE_MARKET_ORDERS":
      let res = await fetch(rest.market_api, {
        method: "GET",
        headers: {
          Authorization: `Token ${localStorage.getItem("@authToken")}`,
        },
      });

      let data = await res.json();
      return { market_api: data };

    case "UPDATE_LIMIT_ORDERS":
      let res = await fetch(rest.limit_api, {
        method: "GET",
        headers: {
          Authorization: `Token ${localStorage.getItem("@authToken")}`,
        },
      });

      let data = await res.json();
      return { limit_api: data };

    default:
      return state;
  }
};
