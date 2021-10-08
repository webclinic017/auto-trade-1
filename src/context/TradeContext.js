import React, { createContext, useEffect, useState, useContext } from "react";
import { socket } from "../services/ws";
import { rest } from "../api";
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

  const [{ margins }] = useStore();

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
      let should_trade, flag;

      if (tradeMode) {
        let data = JSON.parse(e.data);
        const type = data.trade.type;
        const trade = data.trade;

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

        if (
          trade.tag === "ENTRY" &&
          trade.ltp * trade.quantity <=
            margins?.equity?.available?.cash / 1.5 &&
          trade.ltp > 0 &&
          trade.entry_price > 0 &&
          trade.price > 0
        ) {
          should_trade = true;
        } else if (trade.tag === "EXIT") {
          should_trade = true;
        } else {
          should_trade = false;
        }

        if (flag && should_trade) {
          // modify the trade
          trade.access_token = localStorage.getItem("@accessToken");
          trade.api_key = localStorage.getItem("@apiKey");
          trade.token = localStorage.getItem("@authToken");
          // send the trade to message queue
          fetch(rest.enque, {
            method: "POST",
            body: JSON.stringify(trade),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${trade.token}`,
            },
          })
            .then((res) => {
              return res.json();
            })
            .then((data) => {
              // ask for the status of the task that is inserted into the queue
              const interval = setInterval(() => {
                fetch(rest.task_status(data.id), {
                  method: "GET",
                  headers: {
                    Authorization: `Token ${trade.token}`,
                  },
                })
                  .then((res) => {
                    if (res.ok) {
                      return res.json();
                    }
                    throw new Error("task failed");
                  })
                  .then((data) => {
                    if (data["status"] === "SUCCESS") {
                      if (trade.tag === "ENTRY") {
                        setBuys((x) => x + 1);
                      } else if (trade.tag === "EXIT") {
                        setSells((x) => x + 1);
                      }
                      clearInterval(interval);
                    } else if (data["status"] === "FAILURE") {
                      clearInterval(interval);
                    }
                  })
                  .catch((err) => console.log(err));
              }, 3000);
            });
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
