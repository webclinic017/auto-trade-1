import { useEffect } from "react";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Settings from "./components/Settings";
import Login from "./components/Login/Login";
// import Orders from "./components/Orders";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
// import { TradeProvider } from "./context/TradeContext";
import { StoreProvider } from "./context/StoreContext";
import { initialState, reducer } from "./reducers";
import { NetworkProvider } from "./context/NetworkContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import LoadingScreen from "./components/LoadingScreen";
import RequestToken from "./components/RequestToken";
import { useNetwork } from "./context/NetworkContext";
import { socket, sockuser } from "./services/ws";
import SignalHistory from "./components/SignalHistory";
import { QueryClientProvider } from "react-query";
import { queryClient } from "./api";

function Main() {
  const auth = useAuth();
  const { setNetworkStatus } = useNetwork();

  useEffect(() => {
    socket.onerror = () => {
      setNetworkStatus(false);
    };
    sockuser.onerror = () => {
      setNetworkStatus(false);
    };
    socket.onclose = () => {
      setNetworkStatus(false);
    };
    sockuser.onclose = () => {
      setNetworkStatus(false);
    };

    console.log("🦚");
  }, [setNetworkStatus]);

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
        <Route exact path="/signals">
          {auth.isAuthenticated ? <SignalHistory /> : <Redirect to="/login" />}
        </Route>
        <Route exact path="/">
          {auth.isAuthenticated ? <Home /> : <Redirect to="/login" />}
        </Route>
      </Switch>
    </Router>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <StoreProvider initialState={initialState} reducer={reducer}>
        <AuthProvider>
          <NetworkProvider>
            {/* <TradeProvider> */}
            <Main />
            {/* </TradeProvider> */}
          </NetworkProvider>
        </AuthProvider>
      </StoreProvider>
    </QueryClientProvider>
  );
}

export default App;
