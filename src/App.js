import React, { useState } from "react";
import { BrowserRouter as Router, Route, useParams } from "react-router-dom";
import BubblePage from './components/BubblePage'
import PrivateRoute from './components/PrivateRoute'
import Login from "./components/Login";
import "./styles.scss";


function App() {

  return (
    <Router>
      <div className="App">
        <PrivateRoute path="/bubblepage" component={BubblePage} />
        <Route exact path="/" component={Login} />
      </div>
    </Router>
  );
}

export default App;

//Task List:
//1. Render BubblePage as a PrivateRoute