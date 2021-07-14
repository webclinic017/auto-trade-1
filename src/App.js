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
    { tradeStock, tradeIndexOpt, tradeIndexFut, tradeStockOpt, tradeStockFut },
  ] = useStateValue();

  // append the trade
  const appendTrade = (trade) => {
    if (!(trade.trading_symbol in orders.current)) {
      orders.current[trade.trading_symbol] = [
        {
          trading_symbol: trade.trading_symbol,
          quantity: trade.quantity,
        },
      ];
    } else {
      orders.current[trade.trading_symbol].push({
        trading_symbol: trade.trading_symbol,
        quantity: trade.quantity,
      });
    }

    console.log(orders.current);
  };

  // clear the trade
  const clearTrade = (trade) => {
    console.log(trade);

    if (trade.trading_symbol in orders.current) {
      orders.current[trade.trading_symbol] = [];
    }

    console.log(orders.current);
  };

  // trading for stocks
  useEffect(() => {
    stock.onmessage = (e) => {
      if (tradeStock) {
        let data = JSON.parse(e.data);
        let trade = data.trade;
        trade.endpoint = rest.uri + trade.endpoint;
        trade.access_token = localStorage.getItem("@accessToken");
        trade.api_key = localStorage.getItem("@apiKey");

        if (trade.tag === "EXIT") {
          trade.quantity = 0;
          for (
            let i = 0;
            i < orders.current[trade.trading_symbol].length;
            i++
          ) {
            trade.quantity += Number(
              orders.current[trade.trading_symbol][i].quantity
            );
          }
        } else {
          trade.quantity = Math.trunc(
            Number(localStorage.getItem("investment")) / trade.ltp
          );
        }

        trade.token = localStorage.getItem("@authToken");

        make_order_request(
          trade,
          () => {
            if (trade.tag === "EXIT") {
              clearTrade(trade);
            } else {
              appendTrade(trade);
            }
          },
          () => {}
        );
      }
    };
  }, [tradeStock]);

  // trading for index options
  useEffect(() => {
    index_opt.onmessage = (e) => {
      if (tradeIndexOpt) {
        let data = JSON.parse(e.data);
        let trade = data.trade;
        trade.endpoint = rest.uri + trade.endpoint;
        trade.access_token = localStorage.getItem("@accessToken");
        trade.api_key = localStorage.getItem("@apiKey");

        if (trade.tag === "EXIT") {
          trade.quantity = 0;
          for (
            let i = 0;
            i < orders.current[trade.trading_symbol].length;
            i++
          ) {
            trade.quantity += Number(
              orders.current[trade.trading_symbol][i].quantity
            );
          }
        } else {
          if (trade.trading_symbol.includes("BANKNIFTY")) {
            trade.quantity = Number(localStorage.getItem("bfQuantity"));
          } else {
            trade.quantity = Number(localStorage.getItem("nfQuantity"));
          }
        }

        trade.token = localStorage.getItem("@authToken");

        make_order_request(
          trade,
          () => {
            if (trade.tag === "EXIT") {
              clearTrade(trade);
            } else {
              appendTrade(trade);
            }
          },
          () => {}
        );
      }
    };
  }, [tradeIndexOpt]);

  // trading for index futures
  useEffect(() => {
    index_fut.onmessage = (e) => {
      if (tradeIndexFut) {
        let data = JSON.parse(e.data);
        let trade = data.trade;
        trade.endpoint = rest.uri + trade.endpoint;
        trade.access_token = Number(localStorage.getItem("@accessToken"));
        trade.api_key = Number(localStorage.getItem("@apiKey"));

        if (trade.tag === "EXIT") {
          trade.quantity = 0;
          for (
            let i = 0;
            i < orders.current[trade.trading_symbol].length;
            i++
          ) {
            trade.quantity += Number(
              orders.current[trade.trading_symbol][i].quantity
            );
          }
        } else {
          if (trade.trading_symbol.includes("BANKNIFTY")) {
            trade.quantity = Number(localStorage.getItem("bfQuantity"));
          } else {
            trade.quantity = Number(localStorage.getItem("nfQuantity"));
          }
        }

        trade.token = localStorage.getItem("@authToken");

        make_order_request(
          trade,
          () => {
            if (trade.tag === "EXIT") {
              clearTrade(trade);
            } else {
              appendTrade(trade);
            }
          },
          () => {}
        );
      }
    };
  }, [tradeIndexFut]);

  // trading for stock options
  useEffect(() => {
    stock_opt.onmessage = (e) => {
      if (tradeStockOpt) {
        let data = JSON.parse(e.data);
        let trade = data.trade;
        trade.endpoint = rest.uri + trade.endpoint;
        trade.access_token = localStorage.getItem("@accessToken");
        trade.api_key = localStorage.getItem("@apiKey");
        trade.token = localStorage.getItem("@authToken");

        if (trade.tag === "EXIT") {
          trade.quantity = 0;
          for (
            let i = 0;
            i < orders.current[trade.trading_symbol].length;
            i++
          ) {
            trade.quantity += Number(
              orders.current[trade.trading_symbol][i].quantity
            );
          }
        }

        make_order_request(
          trade,
          () => {
            if (trade.tag === "EXIT") {
              clearTrade(trade);
            } else {
              appendTrade(trade);
            }
          },
          () => {}
        );
      }
    };
  }, [tradeStockOpt]);

  // trading for stock futures
  useEffect(() => {
    stock_fut.onmessage = (e) => {
      if (tradeStockFut) {
        let data = JSON.parse(e.data);
        let trade = data.trade;
        trade.endpoint = rest.uri + trade.endpoint;
        trade.access_token = localStorage.getItem("@accessToken");
        trade.api_key = localStorage.getItem("@apiKey");
        trade.token = localStorage.getItem("@authToken");

        if (trade.tag === "EXIT") {
          trade.quantity = 0;
          for (
            let i = 0;
            i < orders.current[trade.trading_symbol].length;
            i++
          ) {
            trade.quantity += Number(
              orders.current[trade.trading_symbol][i].quantity
            );
          }
        }

        make_order_request(
          trade,
          () => {
            if (trade.tag === "EXIT") {
              clearTrade(trade);
            } else {
              appendTrade(trade);
            }
          },
          () => {}
        );
      }
    };
  }, [tradeStockFut]);

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
