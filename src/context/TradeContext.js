import React, { createContext, useEffect, useState, useContext } from "react";
import { socket } from "../services/ws";
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

  // single websocket for handling all the trades
  useEffect(() => {
    socket.onmessage = async (e) => {
      if (tradeMode) {
        let data = JSON.parse(e.data);
        let type = data.type;
        let flag = false;

        switch (type) {
          case "INDEXOPT":
            flag = tradeIndexOpt;
            break;
          case "INDEXFUT":
            flag = tradeIndexFut;
            break;
          case "STOCK":
            flag = tradeStock;
            break;
          case "STOCKOPT":
            flag = tradeStockOpt;
            break;
          case "STOCKFUT":
            flag = tradeStockFut;
            break;
          default:
            flag = false;
            break;
        }

        if (flag) {
          // function for entry
          if (trade.tag === "ENTRY") {
            const token = trade.instrument_token;
            trade.token = localStorage.getItem("@authToken");
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
                  }).then(() => {
                    setBuys((x) => x + 1);
                  });
                });
              }
            }
          }

          // function for exit
          if (trade.tag === "EXIT") {
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
                    Authorization: `Token ${localStorage.getItem(
                      "@authToken"
                    )}`,
                  },
                }).then(() => {
                  setSells((x) => x + 1);
                });
              });
            }
          }
        }
      }
    };
  }, [
    tradeMode,
    tradeIndexOpt,
    tradeIndexFut,
    tradeStock,
    tradeStockOpt,
    tradeStockFut,
  ]);

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
