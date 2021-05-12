import firebase from "firebase/app"
import "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyDhXv_Ip1AQOyJwOp1INy3iocNkp3biMF4",
    authDomain: "swapify-85d2c.firebaseapp.com",
    projectId: "swapify-85d2c",
    storageBucket: "swapify-85d2c.appspot.com",
    messagingSenderId: "133644331634",
    appId: "1:133644331634:web:395ae8cb57e8ba3883b0eb",
    measurementId: "G-YRN7X1QCM9"
  };

firebase.initializeApp(firebaseConfig)

const storage = firebase.storage()

export { storage, firebase as default}