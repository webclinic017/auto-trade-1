const uri = "ws.bittrade.space";

export const rest = {
  uri: "https://" + uri,
  zerodha_login: "https://" + uri + "/zerodha_login/access_token",
  user_login: "https://" + uri + "/api-token-auth/",
};

export const ws = {
  ws: "wss://" + uri,
  stocks: "wss://" + uri + "/ws/stocks_notifications/",
  index: "wss://" + uri + "/ws/index_opt_notifications/",
  index_fut: "wss://" + uri + "/ws/index_fut_notifications/",
  stock_options: "wss://" + uri + "/ws/stock_opt_notifications/",
  stock_futures: "wss://" + uri + "/ws/stock_fut_notifications/",
};
