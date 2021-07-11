import Header from "./components/Header";
import Home from "./components/Home";
import Settings from "./components/Settings";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route excat path="/settings">
          <Settings />
        </Route>
        <Route excat path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
