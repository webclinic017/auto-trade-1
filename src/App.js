import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import Settings from "./components/Settings";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
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

  const [
    { tradeStock, tradeIndexOpt, tradeIndexFut, tradeStockOpt, tradeStockFut },
  ] = useStateValue();

  // trading for stocks
  useEffect(() => {
    stock.onmessage = (e) => {
      if (tradeStock) {
        let data = JSON.parse(e.data);
        let trade = data.trade;
        trade.endpoint = rest.uri + trade.endpoint;
        trade.access_token = localStorage.getItem("@accessToken");
        trade.api_key = localStorage.getItem("@apiKey");
        trade.quantity = Math.trunc(
          Number(localStorage.getItem("investment")) / trade.ltp
        );
        trade.token = localStorage.getItem("@authToken");

        make_order_request(
          trade,
          () => {},
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

        if (trade.trading_symbol.includes("BANKNIFTY")) {
          trade.quantity = localStorage.getItem("bfQuantity");
        } else {
          trade.quantity = localStorage.getItem("nfQuantity");
        }

        trade.token = localStorage.getItem("@authToken");

        make_order_request(
          trade,
          () => {},
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
        trade.access_token = localStorage.getItem("@accessToken");
        trade.api_key = localStorage.getItem("@apiKey");

        if (trade.trading_symbol.includes("BANKNIFTY")) {
          trade.quantity = localStorage.getItem("bfQuantity");
        } else {
          trade.quantity = localStorage.getItem("nfQuantity");
        }

        trade.token = localStorage.getItem("@authToken");

        make_order_request(
          trade,
          () => {},
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

        make_order_request(
          trade,
          () => {},
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

        make_order_request(
          trade,
          () => {},
          () => {}
        );
      }
    };
  }, [tradeStockFut]);

  return (
    <Router>
      <Header setAccessToken={setAccessToken} />
      <Switch>
        <Route excat path="/settings">
          <Settings />
        </Route>
        <Route excat path="/">
          <Home accessToken={accessToken} />
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
