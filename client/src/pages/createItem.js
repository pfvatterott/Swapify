import React, { useState, useContext, useEffect } from "react";
import API from "../utils/API";
import { Input, TextArea, FormBtn } from "../components/Form";
import { storage } from "../utils/firebase"
import {Redirect} from 'react-router-dom';


function Item() {
  const [descriptionState, setDescriptionState]= useState([]);
  const [nameState, setNameState]= useState([]);
  const [image, setImage] = useState(null)
  const [redirect, setRedirect] = useState(false);


  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'))
    if (userData === null) {
        setRedirect(true)
    }
  })

  //sets the selectedFile state when a a user drops in a file.
  function handleFileChange(e) {
    if (e.target.files[0]) {  
      console.log(e.target.files[0])
      setImage(e.target.files[0])
    }
  };

  function handleDescriptionChange(event) {
    const desc = event.target.value;
    setDescriptionState({...descriptionState, description: desc})
  };

  function handleNameChange(event) {
    const name = event.target.value;
    setNameState({...nameState, name: name})
  }

  
  function fileUploadHandler() {
    const randomNumber = Math.floor(Math.random() * 100000000)
    const uploadTask = storage.ref(`images/${randomNumber + image.name}`).put(image)
    uploadTask.on(
      "state_changed",
      snapshot => {},
      error => {
        console.log(error)
      },
      () => {
        storage
          .ref("images")
          .child(randomNumber + image.name)
          .getDownloadURL()
          .then(url => {
            saveToDatabase(url)
          })
      }
    )
  };

  function saveToDatabase(url) {
    const userData = JSON.parse(localStorage.getItem('userData'))
    const newItem = {
      itemName: nameState.name,
      itemDescription: descriptionState.description,
      itemPrice: 45,
      imageURL: `${url}`,
      itemOwner: userData.googleId,
      likesFromItems: [],
      likesItems: [],
    }
    API.saveItem(newItem).then((itemResponse) => {
      const itemId = itemResponse.data._id
      API.getUser(userData.googleId).then((res) => {
        const updatedUser = {
          listedItems: res.data[0].listedItems
        }
        updatedUser.listedItems.push(itemId)
        API.updateUser(userData.googleId, updatedUser)
      })
    })

  }

    return (

      // this cant be a form for some reason?
      <div>
        { redirect ? (<Redirect push to="/"/>) : null }
        <Input
          onChange={handleFileChange}
          type="file"
        />
        <TextArea
          onChange={handleNameChange}
          name="namen"
          placeholder="Add a name for your item"
        /> 
        <TextArea
          onChange={handleDescriptionChange}
          name="description"
          placeholder="Add a description"
        /> 
        <FormBtn
          // disabled={!(formObject.author && formObject.title)}
          onClick={fileUploadHandler}
        >
          Upload
        </FormBtn>
      </div>
    );
  }




export default Item;
