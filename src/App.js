import React, { useState } from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import Settings from "./components/Settings";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("@accessToken")
  );

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

export default App;
