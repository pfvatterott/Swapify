import React, { useState, useContext, useEffect } from "react";
import API from "../utils/API";
import { Input, TextArea, FormBtn } from "../components/Form";
import { storage } from "../utils/firebase"
import ArticleContext from "../utils/ArticleContext"

function Item() {
  const {userState} = useContext(ArticleContext);
  const [descriptionState, setDescriptionState]= useState([]);
  const [image, setImage] = useState(null)

  useEffect(() => {
    console.log(userState)
    if (userState.length === 0) {
        console.log('no user')
        
    }
})

  //sets the selectedFile state when a a user drops in a file.
  function handleFileChange(e) {
    if (e.target.files[0]) {  
      setImage(e.target.files[0])
    }
    // setSelectedFile({...selectedFile, files: files[0]})
  };

  function handleDescriptionChange(event) {
    const desc = event.target.value;
    setDescriptionState({...descriptionState, description: desc})
    console.log(desc)
  };

  
  function fileUploadHandler() {
    const uploadTask = storage.ref(`images/${image.name}`).put(image)
    uploadTask.on(
      "state_changed",
      snapshot => {},
      error => {
        console.log(error)
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            saveToDatabase(url)
          })
      }
    )
  };

  function saveToDatabase(url) {
    console.log(userState)
    const newItem = {
      itemName: "",
      itemDescription: descriptionState.description,
      itemPrice: 45,
      imageURL: {url}
    }
  }

    return (

      // this cant be a form for some reason?
      <div>
        <input
          onChange={handleFileChange}
          type="file"
        />
        <TextArea
          onChange={handleDescriptionChange}
          name="description"
          placeholder="Add a description"
        /> 
        <button
          // disabled={!(formObject.author && formObject.title)}
          onClick={fileUploadHandler}
        >
          Upload
        </button>
      </div>
    );
  }




export default Item;
