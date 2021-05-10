import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Welcome from "./pages/welcome"
import Profile from "./pages/profile"

function App() {

  

  return (
    <Router>
    <div>
      <Route exact path="/" component={Welcome} />
      <Route exact path="/profile" component={Profile} />
    </div>
    </Router>
  );
}


export default App;
