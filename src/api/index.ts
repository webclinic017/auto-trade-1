import axios from "axios";
import { QueryClient } from "react-query";

export const sse_uri =
  process.env.REACT_APP_API_HOST + "/events/notifier/trade" ?? "";

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
