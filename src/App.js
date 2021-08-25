import React, { useState, useEffect, useRef } from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import Settings from "./components/Settings";
import Login from "./components/Login";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { StateProvider, useStateValue } from "./StateProvider";
import reducer, { initialState } from "./reducer";

import {
  index_opt,
  index_fut,
  stock,
  stock_opt,
  stock_fut,
} from "./services/ws";
import { rest } from "./api";
import { make_order_request } from "./services/zerodha";

function Main() {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("@accessToken")
  );
  const [authToken, setAuthToken] = useState(
    localStorage.getItem("@authToken")
  );

  const orders = useRef({});

  const [
    {
      tradeStock,
      tradeIndexOpt,
      tradeIndexFut,
      tradeStockOpt,
      tradeStockFut,
      tradeMode,
    },
    dispatch,
  ] = useStateValue();

  // append the trade
  const appendTrade = (trade) => {
    if (!(trade.trading_symbol in orders.current)) {
      orders.current[trade.trading_symbol] = [trade];
    } else {
      orders.current[trade.trading_symbol].push(trade);
    }

    console.log(orders.current);
    dispatch({
      type: "ADD_BUY",
    });
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

    console.log(orders.current);
    dispatch({
      type: "ADD_SELL",
    });
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

        if (maxProfit == 0 || maxProfit == NaN) {
          maxProfit = Infinity;
        }

        let maxLoss = -1 * Number(localStorage.getItem("maxLoss"));
        let pnl = data.pnl;

        if (pnl >= maxProfit || pnl <= maxLoss) {
          dispatch({
            type: "STOP_TRADE_MODE",
          });

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
          dispatch({
            type: "START_TRADE_MODE",
          });
        }
      });
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
  }, []);

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
  }, [tradeStock, tradeMode]);

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
              Number(localStorage.getItem("bfQuantity")) / 72 / trade.ltp / 25
            );
            if (trade.quantity == 0) {
              trade.quantity = 1 * 25;
            } else {
              trade.quantity *= 25;
            }
          } else {
            trade.quantity = Math.floor(
              Number(localStorage.getItem("nfQuantity")) / 72 / trade.ltp / 50
            );
            if (trade.quantity == 0) {
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
            trade.quantity = Math.floor(
              Number(localStorage.getItem("bfQuantity")) / 72 / trade.ltp / 25
            );
            if (trade.quantity == 0) {
              trade.quantity = 1 * 25;
            } else {
              trade.quantity *= 25;
            }
          } else {
            trade.quantity = Math.floor(
              Number(localStorage.getItem("nfQuantity")) / 72 / trade.ltp / 50
            );
            if (trade.quantity == 0) {
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
  }, [tradeIndexFut, tradeMode]);

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
  }, [tradeStockFut, tradeMode]);

  return (
    <Router>
      <Header
        authToken={authToken}
        setAuthToken={setAuthToken}
        setAccessToken={setAccessToken}
      />
      <Switch>
        <Route excat path="/settings">
          {authToken !== null ? <Settings /> : <Redirect to="/login" />}
        </Route>
        <Route exact path="/login">
          {authToken !== null ? (
            <Redirect to="/" />
          ) : (
            <Login setAuthToken={setAuthToken} />
          )}
        </Route>
        <Route excat path="/">
          {authToken !== null ? (
            <Home accessToken={accessToken} />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
      </Switch>
    </Router>
  );
}

function App() {
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <Main />
    </StateProvider>
  );
}

export default App;
