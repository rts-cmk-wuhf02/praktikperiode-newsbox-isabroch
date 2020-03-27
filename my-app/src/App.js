import React from "react";
import Archive from "./Routes/Archive";
import Newsbox from "./Routes/Newsbox";
import Settings from "./Routes/Settings";
import {
  BrowserRouter as Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <div className="app">
      <Switch>
        <Route exact path="/settings">
          <Settings/>
        </Route>
        <Route exact path="/archive">
          <Archive/>
        </Route>
        <Route exact path="/">
          <Newsbox/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
