import axios from "axios";
import { LocalStorage } from "../entities/localstorage";
import { QueryClient } from "react-query";

//
const uri = process.env.REACT_APP_API_URI;
const protocol = process.env.REACT_APP_API_WEB_PROTOCOL;
const wsprotocol = process.env.REACT_APP_API_WS_PROTOCOL;

export const rest = {
  uri: `${protocol}://` + uri,
  zerodha_login: `${protocol}://` + uri + "/zerodha_login/access_token",
  user_login: `${protocol}://` + uri + "/api-token-auth/",
  pnl: `${protocol}://` + uri + "/pnl/",
  market_api: `${protocol}://` + uri + "/orders/market",
  limit_api: `${protocol}://` + uri + "/orders/limit",
  is_login: `${protocol}://` + uri + "/users/is_login",
  margins: `${protocol}://` + uri + "/margins/",
  update_profile: `${protocol}://` + uri + "/users/update/profile",
  profile_detail: `${protocol}://` + uri + "/users/profile/detail",
  positions: `${protocol}://` + uri + "/positions",
  enque: `${protocol}://` + uri + "/enque",
  task_status: (id: any) => `${protocol}://` + uri + `/task/${id}/status`,
  position: (instrument_token: any) =>
    `${protocol}://` + uri + "/position/" + instrument_token,
};

export const ws = {
  ws: `${wsprotocol}://` + uri,
  socket: `${wsprotocol}://` + uri + "/ws/indian/trade",
  users: `${wsprotocol}://` + uri + "/ws/users",
  orders: `${wsprotocol}://` + uri + "/ws/orders",
};

export const Axios = new axios.Axios({
  baseURL: process.env.REACT_APP_API_HOST,
  headers: {
    Authorization: `Token ${LocalStorage.authToken}`,
  },
});

export const queryClient = new QueryClient();
