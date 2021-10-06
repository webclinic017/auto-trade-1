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
  is_login: `${protocol}://` + uri + "/users/is_login",
  margins: `${protocol}://` + uri + "/margins/",
  update_profile: `${protocol}://` + uri + "/users/update/profile",
  profile_detail: `${protocol}://` + uri + "/users/profile/detail",
  positions: `${protocol}://` + uri + "/positions",
  position: (instrument_token) =>
    `${protocol}://` + uri + `/position/${instrument_token}`,
};

export const ws = {
  ws: `${wsprotocol}://` + uri,
  socket: `${wsprotocol}://` + uri + "/ws/indian/trade",
};
