import React from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import Settings from "./components/Settings";
import Login from "./components/Login";
import Orders from "./components/Orders";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { TradeProvider } from "./context/TradeContext";
import { StoreProvider } from "./context/StoreContext";
import { initialState, reducer } from "./reducers";
import { NetworkProvider } from "./context/NetworkContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import LoadingScreen from "./components/LoadingScreen";

function Main() {
  const auth = useAuth();

  return (
    <Router>
      <Header />
      <Switch>
        <Route excat path="/settings">
          {auth.login ? <Settings /> : <Redirect to="/login" />}
        </Route>
        <Route exact path="/login">
          {auth.is_loading ? (
            <LoadingScreen />
          ) : auth.login ? (
            <Redirect to="/" />
          ) : (
            <Login />
          )}
        </Route>
        <Route exact path="/orders">
          {auth.login ? <Orders /> : <Redirect to="/login" />}
        </Route>
        <Route excat path="/">
          {auth.login ? <Home /> : <Redirect to="/login" />}
        </Route>
      </Switch>
    </Router>
  );
}

function App() {
  return (
    <StoreProvider initialState={initialState} reducer={reducer}>
      <AuthProvider>
        <NetworkProvider>
          <TradeProvider>
            <Main />
          </TradeProvider>
        </NetworkProvider>
      </AuthProvider>
    </StoreProvider>
  );
}

export default App;
