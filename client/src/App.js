import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Welcome from "./pages/welcome"
import Profile from "./pages/profile"
import Chat from "./pages/chat"
import createItem from "./pages/createItem"
import Swipping from "./pages/swipping"
import API from "./utils/API"


function App() {

  const [userState, setUserState] = useState([]);
  const userDataJSON = JSON.parse(localStorage.getItem('userData'))
  
  function handleSetUser(userData) {
    setUserState(userData)
  }

  setInterval(function () {
    API.getUserItems(userDataJSON.googleId).then((response) => {
      console.log(response)
      for (let i = 0; i < response.data.length; i++) {
        if (response.data[i].deleteItem === true) {
          console.log('there is an item that might be deleted soon')
        }
        
      }

    })
  }, 5000)

  setInterval(function () {
    API.getUserMatches(userDataJSON.googleId).then((response) => {
        // checks if matches have been read or not by user2 (the user that was not swipping when the match was made)
        for (let i = 0; i < response.data.length; i++) {
            if ((response.data[i].item2Owner == userDataJSON.googleId) && (response.data[i].item2Read === false)) {
                const matchData = {
                    item2Read: true
                }
                API.updateUserMatch(response.data[i]._id, matchData).then((matchPutResponse) => {
                    console.log(matchPutResponse)
                    alert('You have a new matched Item!')
                })
            }
        }
    })
}, 5000)

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
