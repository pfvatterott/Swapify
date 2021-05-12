import React, { useState, Component } from "react";
import API from "../utils/API";
import { Input, TextArea, FormBtn } from "../components/Form";
import { storage } from "../utils/firebase"

function Item() {
  const [descriptionState, setDescriptionState]= useState([]);
  const [image, setImage] = useState(null)


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
            console.log(url)
          })
      }
    )
  };

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
