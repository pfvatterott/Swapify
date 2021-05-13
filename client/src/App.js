import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Welcome from "./pages/welcome"
import Profile from "./pages/profile"
import createItem from "./pages/createItem"

function App() {

  const [userState, setUserState] = useState([]);

  function handleSetUser(userData) {
    setUserState(userData)
  }

  return (
    <Router>
      <Route exact path="/" component={Welcome} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/createItem" component={createItem} />
    </Router>
  );
}


export default App;
