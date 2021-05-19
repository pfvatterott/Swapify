import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Welcome from "./pages/welcome"
import Profile from "./pages/profile"
import Chat from "./pages/chat"
import createItem from "./pages/createItem"
import Swipping from "./pages/swipping"
import API from "./utils/API"
import { Button, Modal } from 'react-materialize';


function App() {

  const [userState, setUserState] = useState([]);
  const userDataJSON = JSON.parse(localStorage.getItem('userData'))
  const [openModal, setOpenModal] = useState(false)
  const [modalImage, setModalImage] = useState('');
  const [modalID, setModalID] = useState('') 
  
  function handleSetUser(userData) {
    setUserState(userData)
  }

  setInterval(function () {
    API.getUserItems(userDataJSON.googleId).then((response) => {
      console.log(response)
      for (let i = 0; i < response.data.length; i++) {
        if (response.data[i].deleteItem === true) {
          console.log('there is an item that might be deleted soon')
          setModalImage(response.data[i].imageURL)
          setModalID(response.data[i]._id)
          setOpenModal(true)
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

  function deleteItem() {
    API.deleteItem(modalID)
  }

  return (
    <Router>
      <Route exact path="/" component={Welcome} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/createItem" component={createItem} />
      <Route exact path="/swipping" component={Swipping} />
      <Route exact path="/chat" component={Chat} />
      {/* Modal for when other user presses 'swap items' button */}
      <Modal
        open={openModal}
        className='center-align'>
        <h3>Warning</h3>
        <img src={modalImage} className="circle"></img>
        <div>Another user has alerted us that you have swapped items with them.</div>
        <div>If you confirm, your item will be deleted from Swapify.</div>
        <br></br>
        <a><Button onClick={deleteItem} modal="close">Confirm</Button></a>
      </Modal>
    </Router>
  );
}


export default App;
