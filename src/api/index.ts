import axios from "axios";
import { QueryClient } from "react-query";

const uri = process.env.REACT_APP_API_URI;
const wsprotocol = process.env.REACT_APP_API_WS_PROTOCOL;

export const ws = {
  ws: `${wsprotocol}://` + uri,
  socket: `${wsprotocol}://` + uri + "/ws/indian/trade",
  users: `${wsprotocol}://` + uri + "/ws/users",
  orders: `${wsprotocol}://` + uri + "/ws/orders",
};

export const Axios = axios.create({
  baseURL: process.env.REACT_APP_API_HOST,
});

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
