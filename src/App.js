import React, { useState } from "react";
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

import { TradeProvider } from "./context/TradeContext";
import { StoreProvider } from "./context/StoreContext";
import { initialState, reducer } from "./reducers";
import { NetworkProvider } from "./context/NetworkContext";
import { AuthProvider, useAuth } from "./context/AuthContext";

function Main() {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("@accessToken")
  );
  const [authToken, setAuthToken] = useState(
    localStorage.getItem("@authToken")
  );

  const auth = useAuth();

  return (
    <Router>
      <Header
        authToken={authToken}
        setAuthToken={setAuthToken}
        setAccessToken={setAccessToken}
      />
      <Switch>
        <Route excat path="/settings">
          {auth.login ? <Settings /> : <Redirect to="/login" />}
        </Route>
        <Route exact path="/login">
          {auth.login ? (
            <Redirect to="/" />
          ) : (
            <Login setAuthToken={setAuthToken} />
          )}
        </Route>
        <Route excat path="/">
          {auth.login ? (
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
    <AuthProvider>
      <StoreProvider initialState={initialState} reducer={reducer}>
        <NetworkProvider>
          <TradeProvider>
            <Main />
          </TradeProvider>
        </NetworkProvider>
      </StoreProvider>
    </AuthProvider>
  );
}

export default App;
