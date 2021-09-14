const uri = "ws.bittrade.space";
const protocol = "https";
const wsprotocol = "wss";

// const uri = "127.0.0.1:8000";
// const protocol = "http";
// const wsprotocol = "ws";

export const rest = {
  uri: `${protocol}://` + uri,
  zerodha_login: `${protocol}://` + uri + "/zerodha_login/access_token",
  user_login: `${protocol}://` + uri + "/api-token-auth/",
  pnl: `${protocol}://` + uri + "/pnl/",
  market_api: `${protocol}://` + uri + "/orders/market",
  limit_api: `${protocol}://` + uri + "/orders/limit",
};

export const ws = {
  ws: `${wsprotocol}://` + uri,
  stocks: `${wsprotocol}://` + uri + "/ws/stocks_notifications/",
  index: `${wsprotocol}://` + uri + "/ws/index_opt_notifications/",
  index_fut: `${wsprotocol}://` + uri + "/ws/index_fut_notifications/",
  stock_options: `${wsprotocol}://` + uri + "/ws/stock_opt_notifications/",
  stock_futures: `${wsprotocol}://` + uri + "/ws/stock_fut_notifications/",
};
