import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Welcome from "./pages/welcome"
import Profile from "./pages/profile"
import Chat from "./pages/chat"
import createItem from "./pages/createItem"
import Swipping from "./pages/swipping"
import API from "./utils/API"
import { Button, Modal } from 'react-materialize';
import "./appStyle.css"


function App() {

  const [userState, setUserState] = useState([]);
  const userDataJSON = JSON.parse(localStorage.getItem('userData'))
  const [openSwapModal, setOpenSwapModal] = useState(false)
  const [openMatchModal, setOpenMatchModal] = useState(false)
  const [modalImage, setModalImage] = useState('');
  const [modalID, setModalID] = useState('')
  const [modalMatchImage1, setModalMatchImage1] = useState('')
  const [modalMatchImage2, setModalMatchImage2] = useState('')
  
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
          setOpenSwapModal(true)
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
                    setOpenMatchModal(true)
                    setModalMatchImage1(response.data[i].item1Photo)
                    setModalMatchImage2(response.data[i].item2Photo)
                })
            }
        }
    })
  }, 5000)

  function deleteItem() {
    API.deleteItem(modalID)
  }

  function keepItem() {
    const updatedItem = {
      deleteItem: false
    }
    API.updateItem(modalID, updatedItem)
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
        open={openSwapModal}
        className='center-align'
        actions={[]}
        options={{
          dismissible: false
        }}>
        <h3>Warning</h3>
        <img src={modalImage} className="circle swapItemImage"></img>
        <br></br>
        <div>Another user has alerted us that you have swapped items with them.</div>
        <div>If you confirm, your item will be deleted from Swapify.</div>
        <div>If you deny, you can continue swapping with your item.</div>
        <br></br>
        <a><Button onClick={deleteItem} modal="close">Confirm</Button></a>
        <br></br><br></br>
        <a><Button onClick={keepItem} modal="close">Deny</Button></a>
      </Modal>
      {/* Match Alert Modal */}
      <Modal
        open={openMatchModal}
        className='center-align'
        >
        <h3>You have a new Match!</h3>
        <img src={modalMatchImage1} className="circle swapItemImage"></img>
        <img src={modalMatchImage2} className="circle swapItemImage"></img>
        <br></br>
        <div>Go to the Chat Page to make the swap!</div>
        <br></br>
      </Modal>
    </Router>
  );
}


export default App;
