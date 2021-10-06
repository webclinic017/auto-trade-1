import React, { createContext, useEffect, useState, useContext } from "react";

import {
  index_opt,
  index_fut,
  stock,
  stock_opt,
  stock_fut,
} from "../services/ws";
import { rest } from "../api";
import { make_order_request } from "../services/zerodha";

import { useAuth } from "./AuthContext";
import { useStore } from "./StoreContext";

const TradeContext = createContext();

export const TradeProvider = ({ children }) => {
  // index
  const [tradeIndexOpt, setTradeIndexOpt] = useState(false);
  const [tradeIndexFut, setTradeIndexFut] = useState(false);

  // stocks
  const [tradeStock, setTradeStock] = useState(false);
  const [tradeStockOpt, setTradeStockOpt] = useState(false);
  const [tradeStockFut, setTradeStockFut] = useState(false);

  // trading mode
  const [tradeMode, setTradeMode] = useState(true);

  //pnl
  const [pnl, setPnl] = useState(0);

  // keep track of number of orders
  const [buys, setBuys] = useState(0);
  const [sells, setSells] = useState(0);

  const auth = useAuth();
  const [, dispatch] = useStore();

  const checkTrade = () => {
    fetch(`${rest.pnl}`, {
      method: "POST",
      headers: {
        Authorization: `Token ${localStorage.getItem("@authToken")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        api_key: localStorage.getItem("@apiKey"),
        access_token: localStorage.getItem("@accessToken"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        let maxProfit = Number(localStorage.getItem("maxProfit"));

        if (maxProfit === 0 || Number.isNaN(maxProfit)) {
          maxProfit = Infinity;
        }

        let maxLoss = -1 * Number(localStorage.getItem("maxLoss"));
        let pnl = data.pnl;
        setPnl(pnl);

        if (pnl >= maxProfit || pnl <= maxLoss) {
          setTradeMode(false);
          // api for exiting all orders
        } else {
          setTradeMode(true);
        }
      })
      .catch((err) => auth.setAccessToken(null));
  };

  useEffect(() => {
    checkTrade();
    let interval = setInterval(() => {
      if (
        localStorage.getItem("@authToken") &&
        localStorage.getItem("@accessToken")
      ) {
        checkTrade();
      }
    }, 1000 * 30);

    return () => {
      clearInterval(interval);
    };

    // eslint-disable-next-line
  }, []);

  // trading for index options
  useEffect(() => {
    index_opt.onmessage = async (e) => {
      if (tradeIndexOpt && tradeMode) {
        let data = JSON.parse(e.data);
        let trade = data.trade;
        trade.endpoint = rest.uri + trade.endpoint;
        trade.access_token = localStorage.getItem("@accessToken");
        trade.api_key = localStorage.getItem("@apiKey");

        // check the type of trade
        if (trade.tag === "EXIT" && tradeMode) {
          // first get all the positions from the database
          const token = trade.instrument_token;
          const res = await fetch(rest.position(token), {
            method: "GET",
            headers: {
              Authorization: `Token ${localStorage.getItem("@authToken")}`,
            },
          });

          if (res.ok) {
            const position = await res.json();

            if (position.quantity > 2000) {
              // make the quantity to exit as 2000
              position.quantity = 2000;
            }

            position.tag = "EXIT";
            position.endpoint = rest.uri + trade.endpoint;
            position.access_token = localStorage.getItem("@accessToken");
            position.api_key = localStorage.getItem("@apiKey");
            position.token = localStorage.getItem("@authToken");

            make_order_request(position, () => {
              fetch(rest.position(token), {
                method: "POST",
                body: JSON.stringify(position),
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Token ${localStorage.getItem("@authToken")}`,
                },
              }).then((res) => {
                setSells((x) => x + 1);
              });
            });
          }
        } else if (trade.tag.includes("ENTRY") && tradeMode) {
          // this is an entry trade
          const token = trade.instrument_token;

          // just calculate the quantity that must be traded
          if (trade.trading_symbol.includes("BANKNIFTY")) {
            trade.quantity = 25;
          } else {
            trade.quantity = 50;
          }

          trade.token = localStorage.getItem("@authToken");

          // now place the buy order by checking the margins api
          const res = await fetch(rest.margins, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${localStorage.getItem("@authToken")}`,
            },
            body: JSON.stringify({
              api_key: auth.api_key,
              access_token: auth.access_token,
            }),
          });

          if (res.ok) {
            const margins = await res.json();
            const price = trade.ltp * trade.quantity;

            if (price <= margins["equity"]["available"]["cash"] / 2) {
              // make the request
              make_order_request(trade, () => {
                margins["equity"]["available"]["cash"] -= price;
                dispatch({
                  type: "UPDATE_MARGINS",
                  margins,
                });

                // after the trade has been placed successfully then update the positions api
                fetch(rest.position(token), {
                  method: "POST",
                  body: JSON.stringify(trade),
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${localStorage.getItem(
                      "@authToken"
                    )}`,
                  },
                }).then((res) => {
                  setBuys((x) => x + 1);
                });
              });
            }
          }
        }
      }
    };
    // eslint-disable-next-line
  }, [tradeIndexOpt, tradeMode]);

  // trading for index futures
  useEffect(() => {
    index_fut.onmessage = async (e) => {
      if (tradeIndexFut && tradeMode) {
        let data = JSON.parse(e.data);
        let trade = data.trade;
        trade.endpoint = rest.uri + trade.endpoint;
        trade.access_token = localStorage.getItem("@accessToken");
        trade.api_key = localStorage.getItem("@apiKey");

        // check the type of trade
        if (trade.tag === "EXIT" && tradeMode) {
          // first get all the positions from the database
          const token = trade.instrument_token;
          const res = await fetch(rest.position(token), {
            method: "GET",
            headers: {
              Authorization: `Token ${localStorage.getItem("@authToken")}`,
            },
          });

          if (res.ok) {
            const position = await res.json();

            if (position.quantity > 2000) {
              // make the quantity to exit as 2000
              position.quantity = 2000;
            }
            position.tag = "EXIT";
            position.endpoint = rest.uri + trade.endpoint;
            position.access_token = localStorage.getItem("@accessToken");
            position.api_key = localStorage.getItem("@apiKey");
            position.token = localStorage.getItem("@authToken");

            make_order_request(position, () => {
              fetch(rest.position(token), {
                method: "POST",
                body: JSON.stringify(position),
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Token ${localStorage.getItem("@authToken")}`,
                },
              }).then((res) => {
                setSells((x) => x + 1);
              });
            });
          }
        } else if (trade.tag.includes("ENTRY") && tradeMode) {
          // this is an entry trade
          const token = trade.instrument_token;

          // just calculate the quantity that must be traded
          if (trade.trading_symbol.includes("BANKNIFTY")) {
            trade.quantity = 25;
          } else {
            trade.quantity = 50;
          }

          trade.token = localStorage.getItem("@authToken");

          // now place the buy order by checking the margins api
          const res = await fetch(rest.margins, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${localStorage.getItem("@authToken")}`,
            },
            body: JSON.stringify({
              api_key: auth.api_key,
              access_token: auth.access_token,
            }),
          });

          if (res.ok) {
            const margins = await res.json();
            const price = trade.ltp * trade.quantity;

            if (price <= margins["equity"]["available"]["cash"] / 2) {
              // make the request
              make_order_request(trade, () => {
                margins["equity"]["available"]["cash"] -= price;
                dispatch({
                  type: "UPDATE_MARGINS",
                  margins,
                });

                // after the trade has been placed successfully then update the positions api
                fetch(rest.position(token), {
                  method: "POST",
                  body: JSON.stringify(trade),
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${localStorage.getItem(
                      "@authToken"
                    )}`,
                  },
                }).then((res) => {
                  setBuys((x) => x + 1);
                });
              });
            }
          }
        }
      }
    };

    // eslint-disable-next-line
  }, [tradeIndexFut, tradeMode]);

  // trading for stocks
  useEffect(() => {
    stock.onmessage = async (e) => {
      if (tradeStock && tradeMode) {
        let data = JSON.parse(e.data);
        let trade = data.trade;
        trade.endpoint = rest.uri + trade.endpoint;
        trade.access_token = localStorage.getItem("@accessToken");
        trade.api_key = localStorage.getItem("@apiKey");

        // check the type of trade
        if (trade.tag === "EXIT" && tradeMode) {
          // first get all the positions from the database
          const token = trade.instrument_token;
          const res = await fetch(rest.position(token), {
            method: "GET",
            headers: {
              Authorization: `Token ${localStorage.getItem("@authToken")}`,
            },
          });

          if (res.ok) {
            const position = await res.json();

            if (position.quantity > 2000) {
              // make the quantity to exit as 2000
              position.quantity = 2000;
            }
            position.tag = "EXIT";
            position.endpoint = rest.uri + trade.endpoint;
            position.access_token = localStorage.getItem("@accessToken");
            position.api_key = localStorage.getItem("@apiKey");
            position.token = localStorage.getItem("@authToken");
            position.price = trade.price;

            make_order_request(position, () => {
              fetch(rest.position(token), {
                method: "POST",
                body: JSON.stringify(position),
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Token ${localStorage.getItem("@authToken")}`,
                },
              }).then((res) => {
                setSells((x) => x + 1);
              });
            });
          }
        } else if (trade.tag.includes("ENTRY") && tradeMode) {
          // this is an entry trade
          const token = trade.instrument_token;

          trade.token = localStorage.getItem("@authToken");

          // now place the buy order by checking the margins api
          const res = await fetch(rest.margins, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${localStorage.getItem("@authToken")}`,
            },
            body: JSON.stringify({
              api_key: auth.api_key,
              access_token: auth.access_token,
            }),
          });

          if (res.ok) {
            const margins = await res.json();
            const price = trade.ltp * trade.quantity;

            if (price <= margins["equity"]["available"]["cash"] / 2) {
              // make the request
              make_order_request(trade, () => {
                margins["equity"]["available"]["cash"] -= price;
                dispatch({
                  type: "UPDATE_MARGINS",
                  margins,
                });

                // after the trade has been placed successfully then update the positions api
                fetch(rest.position(token), {
                  method: "POST",
                  body: JSON.stringify(trade),
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${localStorage.getItem(
                      "@authToken"
                    )}`,
                  },
                }).then((res) => {
                  setBuys((x) => x + 1);
                });
              });
            }
          }
        }
      }
    };

    // eslint-disable-next-line
  }, [tradeStock, tradeMode]);

  // trading for stock options
  useEffect(() => {
    stock_opt.onmessage = async (e) => {
      if (tradeStockOpt && tradeMode) {
        let data = JSON.parse(e.data);
        let trade = data.trade;
        trade.endpoint = rest.uri + trade.endpoint;
        trade.access_token = localStorage.getItem("@accessToken");
        trade.api_key = localStorage.getItem("@apiKey");

        // check the type of trade
        if (trade.tag === "EXIT" && tradeMode) {
          // first get all the positions from the database
          const token = trade.instrument_token;
          const res = await fetch(rest.position(token), {
            method: "GET",
            headers: {
              Authorization: `Token ${localStorage.getItem("@authToken")}`,
            },
          });

          if (res.ok) {
            const position = await res.json();

            if (position.quantity > 2000) {
              // make the quantity to exit as 2000
              position.quantity = 2000;
            }
            position.tag = "EXIT";
            position.endpoint = rest.uri + trade.endpoint;
            position.access_token = localStorage.getItem("@accessToken");
            position.api_key = localStorage.getItem("@apiKey");
            position.token = localStorage.getItem("@authToken");
            position.price = trade.price;

            make_order_request(position, () => {
              fetch(rest.position(token), {
                method: "POST",
                body: JSON.stringify(position),
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Token ${localStorage.getItem("@authToken")}`,
                },
              }).then((res) => {
                setSells((x) => x + 1);
              });
            });
          }
        } else if (trade.tag.includes("ENTRY") && tradeMode) {
          // this is an entry trade
          const token = trade.instrument_token;

          trade.token = localStorage.getItem("@authToken");

          // now place the buy order by checking the margins api
          const res = await fetch(rest.margins, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${localStorage.getItem("@authToken")}`,
            },
            body: JSON.stringify({
              api_key: auth.api_key,
              access_token: auth.access_token,
            }),
          });

          if (res.ok) {
            const margins = await res.json();
            const price = trade.ltp * trade.quantity;

            if (price <= margins["equity"]["available"]["cash"] / 2) {
              // make the request
              make_order_request(trade, () => {
                margins["equity"]["available"]["cash"] -= price;
                dispatch({
                  type: "UPDATE_MARGINS",
                  margins,
                });

                // after the trade has been placed successfully then update the positions api
                fetch(rest.position(token), {
                  method: "POST",
                  body: JSON.stringify(trade),
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${localStorage.getItem(
                      "@authToken"
                    )}`,
                  },
                }).then((res) => {
                  setBuys((x) => x + 1);
                });
              });
            }
          }
        }
      }
    };

    // eslint-disable-next-line
  }, [tradeStockOpt, tradeMode]);

  // trading for stock futures
  useEffect(() => {
    stock_fut.onmessage = async (e) => {
      if (tradeStockFut && tradeMode) {
        let data = JSON.parse(e.data);
        let trade = data.trade;
        trade.endpoint = rest.uri + trade.endpoint;
        trade.access_token = localStorage.getItem("@accessToken");
        trade.api_key = localStorage.getItem("@apiKey");

        // check the type of trade
        if (trade.tag === "EXIT" && tradeMode) {
          // first get all the positions from the database
          const token = trade.instrument_token;
          const res = await fetch(rest.position(token), {
            method: "GET",
            headers: {
              Authorization: `Token ${localStorage.getItem("@authToken")}`,
            },
          });

          if (res.ok) {
            const position = await res.json();

            if (position.quantity > 2000) {
              // make the quantity to exit as 2000
              position.quantity = 2000;
            }
            position.tag = "EXIT";
            position.endpoint = rest.uri + trade.endpoint;
            position.access_token = localStorage.getItem("@accessToken");
            position.api_key = localStorage.getItem("@apiKey");
            position.token = localStorage.getItem("@authToken");
            position.price = trade.price;

            make_order_request(position, () => {
              fetch(rest.position(token), {
                method: "POST",
                body: JSON.stringify(position),
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Token ${localStorage.getItem("@authToken")}`,
                },
              }).then((res) => {
                setSells((x) => x + 1);
              });
            });
          }
        } else if (trade.tag.includes("ENTRY") && tradeMode) {
          // this is an entry trade
          const token = trade.instrument_token;

          trade.token = localStorage.getItem("@authToken");

          // now place the buy order by checking the margins api
          const res = await fetch(rest.margins, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${localStorage.getItem("@authToken")}`,
            },
            body: JSON.stringify({
              api_key: auth.api_key,
              access_token: auth.access_token,
            }),
          });

          if (res.ok) {
            const margins = await res.json();
            const price = trade.ltp * trade.quantity;

            if (price <= margins["equity"]["available"]["cash"] / 2) {
              // make the request
              make_order_request(trade, () => {
                margins["equity"]["available"]["cash"] -= price;
                dispatch({
                  type: "UPDATE_MARGINS",
                  margins,
                });

                // after the trade has been placed successfully then update the positions api
                fetch(rest.position(token), {
                  method: "POST",
                  body: JSON.stringify(trade),
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${localStorage.getItem(
                      "@authToken"
                    )}`,
                  },
                }).then((res) => {
                  setBuys((x) => x + 1);
                });
              });
            }
          }
        }
      }
    };

    // eslint-disable-next-line
  }, [tradeStockFut, tradeMode]);

  return (
    <TradeContext.Provider
      value={{
        setTradeIndexOpt,
        setTradeIndexFut,
        setTradeStock,
        setTradeStockOpt,
        setTradeStockFut,
        setTradeMode,
        tradeMode,
        tradeIndexOpt,
        tradeIndexFut,
        tradeStock,
        tradeStockOpt,
        tradeStockFut,
        sells,
        buys,
        pnl,
      }}
    >
      {children}
    </TradeContext.Provider>
  );
};

export const useTrade = () => {
  const value = useContext(TradeContext);
  return value;
};
