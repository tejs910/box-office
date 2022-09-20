import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Starred from "./pages/Starred";
import Show from "./pages/Show";
import { ThemeProvider } from "styled-components";
const theme = {
  mainColors: {
    blue: "#2400ff",
    gray: "#c6c6c6",
    dark: "#353535",
  },
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/starred">
          <Starred />
        </Route>
        <Route path="/show/:id">
          <Show></Show>
        </Route>
        <Route>
          <div>Not Found(404 error)</div>
        </Route>
      </Switch>
    </ThemeProvider>
  );
}

export default App;
