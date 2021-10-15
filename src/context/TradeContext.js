import React, { createContext, useEffect, useState, useContext } from "react";
import { socket, sockuser } from "../services/ws";
import { useAuth } from "./AuthContext";
import { useStore } from "./StoreContext";
import { useQueue } from "./QueueContext";

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

  // authentication context
  const auth = useAuth();

  // get the margins of the user
  const [{ margins, positions }, dispatch] = useStore();

  // message queue
  const queue = useQueue();

  useEffect(() => {
    if (auth.auth_token && auth.access_token) {
      sockuser.onmessage = (e) => {
        const data = JSON.parse(e.data);

        if (data["positions"]["error"] === undefined) {
          dispatch({
            type: "UPDATE_POSITIONS",
            positions: data["positions"]["net"],
          });
        }

        if (data["pnl"]["error"] === undefined) {
          let maxProfit = Number(localStorage.getItem("maxProfit"));

          if (maxProfit === 0 || Number.isNaN(maxProfit)) {
            maxProfit = Infinity;
          }
          let maxLoss = -1 * Number(localStorage.getItem("maxLoss"));
          let pnl = data["pnl"]["pnl"];
          setPnl(pnl);
          if (pnl >= maxProfit || pnl <= maxLoss) {
            setTradeMode(false);
            // api for exiting all orders
          } else {
            setTradeMode(true);
          }
        }
      };
    }

    const interval = setInterval(() => {
      sockuser.send(
        JSON.stringify({
          api_key: auth.api_key,
          access_token: auth.access_token,
        })
      );
    }, 30000);

    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line
  }, [auth.access_token, auth.auth_token]);

  // single websocket for handling all the trades
  useEffect(() => {
    socket.onmessage = (e) => {
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
          should_trade = false;
          console.log("positions");
          console.log(positions);

          positions.forEach((el) => {
            if (
              el.trading_symbol === trade.trading_symbol ||
              String(el.instrument_token) === String(trade.instrument_token)
            ) {
              should_trade = true;
            }
          });

          console.log(should_trade);
        }

        // console.log(positions);
        if (flag && should_trade) {
          // modify the trade
          trade.access_token = localStorage.getItem("@accessToken");
          trade.api_key = localStorage.getItem("@apiKey");
          trade.token = localStorage.getItem("@authToken");

          // send the trade to message queue
          if (trade.tag === "ENTRY") {
            queue.pushBuy({ trade });
          } else {
            queue.pushSell(trade);
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
    margins,
    positions,
    queue,
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
