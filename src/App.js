import React from "react";
import Navs from "./components/Navs";
import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Starred from "./pages/Starred";
function App() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/starred">
        <Starred />
      </Route>
      <Route>
        <div>Not Found(404 error)</div>
      </Route>
    </Switch>
  );
}

export default App;
