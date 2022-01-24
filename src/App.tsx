import { useEffect } from "react";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Settings from "./components/Settings/Settings";
import Login from "./components/Login/Login";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { TradeProvider } from "./context/TradeContext";
import { NetworkProvider } from "./context/NetworkContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import LoadingScreen from "./components/LoadingScreen";
import RequestToken from "./components/RequestToken";
import { QueryClientProvider } from "react-query";
import { queryClient } from "./api";
import { SnackbarProvider } from "notistack";
import CreateStrategy from "./components/CreateStrategy/CreateStrategy";
import OHLCChart from "./components/OHLCChart/OHLCChart";

function Main() {
  const auth = useAuth();

  useEffect(() => {
    console.log("🦚");
  }, []);

  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/request_token-zerodha/:requestToken">
          <RequestToken />
        </Route>
        <Route exact path="/settings">
          {auth.isAuthenticated ? <Settings /> : <Redirect to="/login" />}
        </Route>
        <Route exact path="/login">
          {auth.isAuthenticatedLoading ? (
            <LoadingScreen />
          ) : auth.isAuthenticated ? (
            <Redirect to="/" />
          ) : (
            <Login />
          )}
        </Route>
        <Route exact path="/create_strategy">
          {auth.isAuthenticated ? <CreateStrategy /> : <Redirect to="/login" />}
        </Route>
        <Route exact path="/ohlc_chart/:instrument_token">
          {auth.isAuthenticated ? <OHLCChart /> : <Redirect to="/login" />}
        </Route>
        <Route exact path="/">
          {auth.isAuthenticatedLoading ? (
            <LoadingScreen />
          ) : auth.isAuthenticated ? (
            <Home />
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
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <NetworkProvider>
          <TradeProvider>
            <SnackbarProvider
              anchorOrigin={{ vertical: "top", horizontal: "left" }}
              autoHideDuration={2000}
            >
              <Main />
            </SnackbarProvider>
          </TradeProvider>
        </NetworkProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
