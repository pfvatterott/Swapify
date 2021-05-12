import React, { useState } from "react";
import { Switch, Route } from 'react-router-dom'
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
    <div>
      <ArticleContext.Provider value={{userState, handleSetUser}}>
      <Switch>
        <Route exact path="/" component={Welcome} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/createItem" component={createItem} />
      </Switch>  
      </ArticleContext.Provider>
    </div>
  );
}


export default App;
