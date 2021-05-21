import React, { useState, useContext, useEffect } from "react";
import API from "../utils/API";
import { Input, TextArea, FormBtn } from "../components/Form";
import { storage } from "../utils/firebase"
import { Redirect } from 'react-router-dom';
import Compressor from 'compressorjs';
import Confetti from 'react-dom-confetti';


function Item() {
  const [reward, setReward]= useState(false);
  const [descriptionState, setDescriptionState] = useState([]);
  const [nameState, setNameState] = useState([]);
  const [image, setImage] = useState(null)
  const [redirect, setRedirect] = useState(false);
  const [imageURL, setImageURL] = useState("");
  const [buttonText, setButtonText] = useState("Preview");
  const [userLocation, setUserLocation] = useState([""])

  useEffect(() => {

    const userData = JSON.parse(localStorage.getItem('userData'))
    if (userData === null) {
      setRedirect(true)
    }
    const fileUpload = document.getElementById('fileBox');
    fileUpload.addEventListener('click', function (event) {
    });

    getUserLocation()
  }, [])

  function getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(saveUserLocation);
    } else {
      alert = "Geolocation is not supported by this browser.";
    }
  }

  function saveUserLocation(position) {
    setUserLocation([position.coords.latitude, position.coords.longitude])
  }

  //sets the selectedFile state when a a user drops in a file.
  function handleFileChange(e) {
    if (e.target.files[0]) {
      setImage(e.target.files[0])
    }
  };

  function handleDescriptionChange(event) {
    const desc = event.target.value;
    setDescriptionState({ ...descriptionState, description: desc })
  };

  function handleNameChange(event) {
    const name = event.target.value;
    setNameState({ ...nameState, name: name })
  }

  function previewUploadHandler() {

    
    console.log({ buttonText })
    if (buttonText === "Preview") {
      console.log("button text is preview")
      previewHandler();
      setButtonText("Upload")
    }
    else {
      fileUploadHandler()
      setButtonText("Preview")
      setReward(!reward);
    }

  }
  function fileUploadHandler() {

    // Compress image before uploading to firebase
    new Compressor(image, {
      quality: 0.2,
      success(result) {

        // uploads image to firebase
        const randomNumber = Math.floor(Math.random() * 100000000)
        const uploadTask = storage.ref(`images/${randomNumber + image.name}`).put(result)
        uploadTask.on(
          "state_changed",
          snapshot => { },
          error => {
            console.log(error)
          },
          () => {
            storage
              .ref("images")
              .child(randomNumber + image.name)
              .getDownloadURL()
              .then(url => {
                saveToDatabase(url);
                setImageURL(url);
                console.log("fileupload handler run")


              })
          }
        )

      },
      error(err) {
        console.log(err.message);
      },
    });

  };

  function previewHandler() {

    // Compress image before uploading to firebase
    new Compressor(image, {
      quality: 0.2,
      success(result) {

        // uploads image to firebase
        const randomNumber = Math.floor(Math.random() * 100000000)
        const uploadTask = storage.ref(`images/${randomNumber + image.name}`).put(result)
        uploadTask.on(
          "state_changed",
          snapshot => { },
          error => {
            console.log(error)
          },
          () => {
            storage
              .ref("images")
              .child(randomNumber + image.name)
              .getDownloadURL()
              .then(url => {
                //saveToDatabase(url);
                setImageURL(url);
                console.log("preview handler run")

              })
          }
        )

      },
      error(err) {
        console.log(err.message);
      },
    });

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
      seenItems: [],
      itemLocation: userLocation
    }
    API.saveItem(newItem).then((itemResponse) => {
      const itemId = itemResponse.data._id
      API.getUser(userData.googleId).then((res) => {
        const updatedUser = {
          listedItems: res.data[0].listedItems
        }
        updatedUser.listedItems.push(itemId)
        API.updateUser(userData.googleId, updatedUser)
        console.log("save to database run")

      })
    })

  }

  return (

    // this cant be a form for some reason?
    <div className="container" style={{ marginTop: "50px" }}>
      {redirect ? (<Redirect push to="/" />) : null}

      <TextArea
        onChange={handleNameChange}
        name="name"
        placeholder="Add a name for your item"
      />
      <form action="#">
        <div className="file-field input-field">
          <div className="btn">
            <span>File</span>
            <input type="file" id="fileBox" onChange={handleFileChange} style={{ color: "#03A696" }} />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" placeholder="Choose a photo" />
          </div>
        </div>
      </form>

      <div className="center-align">
        {imageURL && <img className="responsive-img" src={imageURL} style={{ maxWidth: "50%", height: "auto" }} />}
      </div>

      <TextArea
        onChange={handleDescriptionChange}
        name="description"
        placeholder="Add a description"
      />
      <div className="container center-align" >
      
        <Confetti id="confetti" active={ reward } className="center-align"/>
      
      </div>
      
        <FormBtn
          // disabled={!(formObject.author && formObject.title)}
          //onClick={fileUploadHandler}
          id="mainFileBtn"
          onClick={previewUploadHandler}
          style={{ display: "block", width: "100%" }}
        >{buttonText}
        </FormBtn>
       
  



    </div>
  );
}




export default Item;
