import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Welcome from "./pages/welcome"
import Profile from "./pages/profile"
import ArticleContext from "./utils/ArticleContext";
import createItem from "./pages/createItem"

function App() {

  const [userState, setUserState] = useState([]);

  function handleSetUser(userData) {
    setUserState(userData)
  }

  return (
    <Router>
      <ArticleContext.Provider value={{userState, handleSetUser}}>
        <div>
          <Route exact path="/" component={Welcome} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/createItem" component={createItem} />

        </div>
      </ArticleContext.Provider>
    </Router>
  );
}


export default App;
