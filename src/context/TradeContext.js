import React, { createContext, useEffect, useState, useContext } from "react";
import { socket, sockuser } from "../services/ws";
import { useAuth } from "./AuthContext";
import { rest } from "../api";
import { orders } from "../services/ws";

const TradeContext = createContext();

export const TradeProvider = ({ children }) => {
  const [tradeIndexOpt, setTradeIndexOpt] = useState(false);
  const [tradeIndexFut, setTradeIndexFut] = useState(false);
  const [tradeStock, setTradeStock] = useState(false);
  const [tradeStockOpt, setTradeStockOpt] = useState(false);
  const [tradeStockFut, setTradeStockFut] = useState(false);
  const [tradeMode, setTradeMode] = useState(true);
  const [pnl, setPnl] = useState(0);
  const [buys, setBuys] = useState(0);
  const [sells, setSells] = useState(0);
  const auth = useAuth();

  const updateMargins = () => {
    fetch(rest.margins, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("@authToken")}`,
      },
      body: JSON.stringify({
        api_key: auth.api_key,
        access_token: auth.access_token,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        throw new Error("failed to reterive margin");
      })
      .then((data) => {
        dispatch({
          type: "UPDATE_MARGINS",
          margins: data,
        });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (auth.access_token !== null) {
      updateMargins();
    }
    // eslint-disable-next-line
  }, [auth.access_token, auth.api_key]);

  useEffect(() => {
    if (auth.auth_token && auth.access_token) {
      sockuser.onmessage = (e) => {
        const data = JSON.parse(e.data);
        if (data["positions"]["error"] === undefined) {
          dispatch({
            type: "UPDATE_POSITIONS",
            positions: data["positions"]["net"],
          });
        } else {
          auth.setAccessToken(null);
          return;
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
    }, 10000);

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

        // console.log(positions);
        if (flag && should_trade) {
          // modify the trade
          trade.access_token = auth.access_token;
          trade.api_key = auth.api_key;
          orders.send(JSON.stringify(trade));
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
    auth,
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
        setBuys,
        setSells,
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
