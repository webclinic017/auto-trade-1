import React, {
  createContext,
  useEffect,
  useState,
  useRef,
  useContext,
} from "react";

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

  // dictonaries to keep track of orders
  const orders = useRef({});

  //pnl
  const [pnl, setPnl] = useState(0);

  // keep track of number of orders
  const [buys, setBuys] = useState(0);
  const [sells, setSells] = useState(0);

  const auth = useAuth();

  // append the trade
  const appendTrade = (trade) => {
    if (!(trade.trading_symbol in orders.current)) {
      orders.current[trade.trading_symbol] = [trade];
    } else {
      orders.current[trade.trading_symbol].push(trade);
    }

    setBuys((x) => x + 1);
  };

  // clear the trade
  const clearTrade = (trade) => {
    console.log(trade);
    let total_quantity = 0;

    if (trade.trading_symbol in orders.current) {
      for (let i = 0; i < orders.current[trade.trading_symbol].length; i++) {
        if (total_quantity >= 2000) {
          break;
        }
        total_quantity += orders.current[trade.trading_symbol][i].quantity;
      }

      while (total_quantity > 0) {
        let order = orders.current[trade.trading_symbol].pop();
        total_quantity -= order.quantity;
      }
    }

    setSells((x) => x + 1);
  };

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
          //   dispatch({
          //     type: "STOP_TRADE_MODE",
          //   });
          setTradeMode(false);

          // exit all the orders
          Object.keys(orders.current).forEach((key) => {
            let orders_list = orders.current[key];
            let order = {
              endpoint: "",
              entry_price: 0,
              exchange: "",
              instrument_token: 0,
              quantity: 0,
              tag: "EXIT",
              trading_symbol: "",
              uri: "",
            };

            orders_list.forEach((o) => {
              order.endpoint = o.endpoint;
              order.entry_price = Number(o.entry_price);
              order.exchange = o.exchange;
              order.instrument_token = o.instrument_token;
              order.quantity += Number(o.quantity);
              order.trading_symbol = o.trading_symbol;
              order.uri = o.uri;
            });
            order.quantity = Math.trunc(order.quantity);
            if (order.endpoint.includes("buy")) {
              order.endpoint = order.endpoint.replace("buy", "sell");
            } else if (order.endpoint.includes("sell")) {
              order.endpoint = order.endpoint.replace("sell", "buy");
            }

            if (order.quantity > 0) {
              make_order_request(
                order,
                () => {
                  clearTrade(order);
                },
                () => {}
              );
            }
          });
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
    index_opt.onmessage = (e) => {
      if (tradeIndexOpt && tradeMode) {
        let data = JSON.parse(e.data);
        let trade = data.trade;
        trade.endpoint = rest.uri + trade.endpoint;
        trade.access_token = localStorage.getItem("@accessToken");
        trade.api_key = localStorage.getItem("@apiKey");
        let trade_ = true;

        if (trade.tag === "EXIT") {
          try {
            trade.quantity = 0;
            for (
              let i = 0;
              i < orders.current[trade.trading_symbol].length;
              i++
            ) {
              if (trade.quantity >= 2000) {
                break;
              }
              trade.quantity += Number(
                orders.current[trade.trading_symbol][i].quantity
              );
            }
          } catch (err) {
            trade_ = false;
            console.error(err);
          }
        } else {
          if (trade.trading_symbol.includes("BANKNIFTY")) {
            trade.quantity = Math.floor(
              Number(localStorage.getItem("bfQuantity")) / 36 / trade.ltp / 25
            );
            if (trade.quantity === 0) {
              trade.quantity = 1 * 25;
            } else {
              trade.quantity *= 25;
            }
          } else {
            trade.quantity = Math.floor(
              Number(localStorage.getItem("nfQuantity")) / 36 / trade.ltp / 50
            );
            if (trade.quantity === 0) {
              trade.quantity = 1 * 50;
            } else {
              trade.quantity *= 50;
            }
          }
        }

        trade.token = localStorage.getItem("@authToken");
        console.log(trade);

        if (trade_) {
          if (tradeMode && trade.tag !== "EXIT") {
            make_order_request(
              trade,
              () => {
                appendTrade(trade);
              },
              () => {}
            );
          } else if (trade.tag === "EXIT") {
            make_order_request(
              trade,
              () => {
                clearTrade(trade);
              },
              () => {}
            );
          }
        }
      }
    };
    // eslint-disable-next-line
  }, [tradeIndexOpt, tradeMode]);

  // trading for index futures
  useEffect(() => {
    index_fut.onmessage = (e) => {
      if (tradeIndexFut && tradeMode) {
        let data = JSON.parse(e.data);
        let trade = data.trade;
        trade.endpoint = rest.uri + trade.endpoint;
        trade.access_token = Number(localStorage.getItem("@accessToken"));
        trade.api_key = Number(localStorage.getItem("@apiKey"));
        let trade_ = true;

        if (trade.tag === "EXIT") {
          try {
            trade.quantity = 0;
            for (
              let i = 0;
              i < orders.current[trade.trading_symbol].length;
              i++
            ) {
              if (trade.quantity >= 2000) {
                break;
              }
              trade.quantity += Number(
                orders.current[trade.trading_symbol][i].quantity
              );
            }
          } catch (err) {
            console.error(err);
            trade_ = false;
          }
        } else {
          if (trade.trading_symbol.includes("BANKNIFTY")) {
            trade.quantity = 25;
          } else {
            trade.quantity = 50;
          }
        }

        trade.token = localStorage.getItem("@authToken");
        console.log(trade);

        if (trade_) {
          if (tradeMode && trade.tag !== "EXIT") {
            make_order_request(
              trade,
              () => {
                appendTrade(trade);
              },
              () => {}
            );
          } else if (trade.tag === "EXIT") {
            make_order_request(
              trade,
              () => {
                clearTrade(trade);
              },
              () => {}
            );
          }
        }
      }
    };

    // eslint-disable-next-line
  }, [tradeIndexFut, tradeMode]);

  // trading for stocks
  useEffect(() => {
    stock.onmessage = (e) => {
      if (tradeStock) {
        let data = JSON.parse(e.data);
        let trade = data.trade;
        trade.endpoint = rest.uri + trade.endpoint;
        trade.access_token = localStorage.getItem("@accessToken");
        trade.api_key = localStorage.getItem("@apiKey");
        let trade_ = true;

        if (trade.tag === "EXIT") {
          try {
            trade.quantity = 0;
            for (
              let i = 0;
              i < orders.current[trade.trading_symbol].length;
              i++
            ) {
              if (trade.quantity >= 2000) {
                break;
              }

              trade.quantity += Number(
                orders.current[trade.trading_symbol][i].quantity
              );
            }
          } catch (error) {
            trade_ = false;
            console.error(error);
          }
        } else {
          trade.quantity = Math.trunc(
            Number(localStorage.getItem("investment")) / trade.ltp
          );
        }

        trade.token = localStorage.getItem("@authToken");
        console.log(trade);
        clearTrade(trade);

        if (trade_ && trade.quantity > 0) {
          if (tradeMode && trade.tag !== "EXIT") {
            make_order_request(
              trade,
              () => {
                appendTrade(trade);
              },
              () => {}
            );
          } else if (trade.tag === "EXIT") {
            make_order_request(
              trade,
              () => {
                clearTrade(trade);
              },
              () => {}
            );
          }
        }
      }
    };

    // eslint-disable-next-line
  }, [tradeStock, tradeMode]);

  // trading for stock options
  useEffect(() => {
    stock_opt.onmessage = (e) => {
      if (tradeStockOpt && tradeMode) {
        let data = JSON.parse(e.data);
        let trade = data.trade;
        trade.endpoint = rest.uri + trade.endpoint;
        trade.access_token = localStorage.getItem("@accessToken");
        trade.api_key = localStorage.getItem("@apiKey");
        trade.token = localStorage.getItem("@authToken");
        let trade_ = true;

        if (trade.tag === "EXIT") {
          try {
            trade.quantity = 0;
            for (
              let i = 0;
              i < orders.current[trade.trading_symbol].length;
              i++
            ) {
              if (trade.quantity >= 2000) {
                break;
              }
              trade.quantity += Number(
                orders.current[trade.trading_symbol][i].quantity
              );
            }
          } catch (err) {
            console.error(err);
            trade_ = false;
          }
        }

        console.log(trade);

        if (trade_) {
          if (tradeMode && trade.tag !== "EXIT") {
            make_order_request(
              trade,
              () => {
                appendTrade(trade);
              },
              () => {}
            );
          } else if (trade.tag === "EXIT") {
            make_order_request(
              trade,
              () => {
                clearTrade(trade);
              },
              () => {}
            );
          }
        }
      }
    };

    // eslint-disable-next-line
  }, [tradeStockOpt, tradeMode]);

  // trading for stock futures
  useEffect(() => {
    stock_fut.onmessage = (e) => {
      if (tradeStockFut && tradeMode) {
        let data = JSON.parse(e.data);
        let trade = data.trade;
        trade.endpoint = rest.uri + trade.endpoint;
        trade.access_token = localStorage.getItem("@accessToken");
        trade.api_key = localStorage.getItem("@apiKey");
        trade.token = localStorage.getItem("@authToken");
        let trade_ = true;

        if (trade.tag === "EXIT") {
          try {
            trade.quantity = 0;
            for (
              let i = 0;
              i < orders.current[trade.trading_symbol].length;
              i++
            ) {
              if (trade.quantity >= 2000) {
                break;
              }
              trade.quantity += Number(
                orders.current[trade.trading_symbol][i].quantity
              );
            }
          } catch (err) {
            console.error(err);
            trade_ = false;
          }
        }

        console.log(trade);

        if (trade_) {
          if (tradeMode && trade.tag !== "EXIT") {
            make_order_request(
              trade,
              () => {
                appendTrade(trade);
              },
              () => {}
            );
          } else if (trade.tag === "EXIT") {
            make_order_request(
              trade,
              () => {
                clearTrade(trade);
              },
              () => {}
            );
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
