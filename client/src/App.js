import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Welcome from "./pages/welcome"
import Profile from "./pages/profile"
import Chat from "./pages/chat"
import createItem from "./pages/createItem"
import Swipping from "./pages/swipping"


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
      <Route exact path="/swipping" component={Swipping} />
      <Route exact path="/chat" component={Chat} />
    </Router>
  );
}


export default App;
