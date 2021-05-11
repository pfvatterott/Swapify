import React, { useState, useEffect } from "react";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Input, TextArea, FormBtn } from "../components/Form";
import axios from 'axios';
import { FilePond, registerPlugin } from 'react-filepond';


// Import FilePond styles

import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);



function Item() {
  // Setting our component's initial state
  const [selectedFile, setFile] = useState([])
  const [description, setDescription]= useState([]);
  const [formObject, setFormObject] = useState({})

  const [files, setFiles] = useState([])


  // 
  useEffect(() => {
   
  }, [])

  //sets the selectedFile state when a a user drops in a file.
  // handleFileChange=(event)=> {
  //   console.log(event);
  //   const { name, value } = event.target.files[0];
  //   this.setState({selectedFile:event.target.files[0]});

  // };


  // handleDescriptionChange=(event)=> {
  //   console.log(event.value);
  //   this.setState({description:event.target.value});
   
  // };

  
  function fileUploadHandler() {
    // event.preventDefault();
   //This is where we post to a DB axios.post()- or we need to put it into the API and call that.

   
  };

    return (

            <form>
              <Input
                // onChange={handleFileChange}
                type="file"
                placeholder="Upload a photo"
              />
              <TextArea
                // onChange={handleDescriptionChange}
                name="description"
                placeholder="Add a description"
              /> 
              <FormBtn
                disabled={!(formObject.author && formObject.title)}
                onClick={fileUploadHandler}
              >
                Upload
              </FormBtn>
              <FilePond
                files={files}
                onupdatefiles={setFiles}
                allowMultiple={true}
                maxFiles={3}
                server="/api"
                name="files" 
                labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
              
            ></FilePond>
            </form>
         
  
    );
  }


export default Item;
