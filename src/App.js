import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from './components/BubblePage'

import Login from "./components/Login";
import "./styles.scss";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>

        <PrivateRoute path="/bubble-page" component={PrivateRoute} />

        <Route exact path="/" component={Login} />

        </Switch>
      </div>
    </Router>
  );
}

export default App;

//Task List:
//1. Render BubblePage as a PrivateRoute