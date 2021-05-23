import React, { useState, useContext } from "react";
import API from "../utils/API";
import GoogleLogin from "react-google-login";
import { Redirect } from "react-router-dom";
import "materialize-css";
import "./style.css";
import "./welcomeStyle.css";
import { motion } from "framer-motion";
import { Button } from "react-materialize";

function Welcome() {
  const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const [redirect, setRedirect] = useState(false);

  const googleSuccess = async (response) => {
    const userObj = response.profileObj;
    const user = {
      email: userObj.email,
      firstName: userObj.givenName,
      lastName: userObj.familyName,
      image: userObj.imageUrl,
      googleId: userObj.googleId,
      listedItems: [],
    };
    API.getUser(userObj.googleId)
      .then((res) => {
        if (res.data.length > 0) {
          localStorage.setItem("userData", JSON.stringify(user));
          setRedirect(true);
        } else {
          API.saveUser(user);
          localStorage.setItem("userData", JSON.stringify(user));
          setRedirect(true);
        }
      })
      .catch((error) => console.log(error));
  };

  const googleFailure = (response) => {
    console.log("Google Sign in was unsuccessful");
    alert("please try logging in again");
    console.log(response);
  };

  return (
    <div className="container center ">
      <div className="row main">
        <motion.h2 
        animate={{ opacity: 1 }} 
        initial={{ opacity: 0 }}
        transition={{ delay: 0.5, duration: 2 }}>
          Recycle your life!{" "}
        </motion.h2>
      </div>
      <div className="row">
        <motion.img
          animate={{ rotateZ: 720, opacity: 1, scale: 1 }}
          initial={{ opacity: 0, scale: 0 }}
          transition={{ delay: 0.5, duration: 2 }}
          src="./../img/swapifylogo-S-vector.png"
          alt="Swapify S Logo"
          class="responsive-img"
        />
        <motion.img
          animate={{ x: 0, opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ delay: 2.5, duration: 0.5 }}
          src="./../img/wapifyLogoCenter-vector.png"
          alt="Swapify Logo"
          class="responsive-img"
        />
      </div>
      <div className="container center">
        <div className="row downArrow">
          <motion.img
            animate={{ opacity: 1}}
            initial={{ opacity: 0 }}
            transition={{delay: 3, duration: 0.7, yoyo: Infinity}}
            whileHover={{}}
            height="75px"
            src="./../img/down-arrow.png"
            alt="Swapify S Logo"
            //   class="responsive-img"
          />
        </div>
      </div>
      <div className="container howTo">
        <div className="row howToRow">
          <div className="col l3 center symbol1">
            <motion.img
              animate={{}}
              initial={{}}
              transition={{}}
              whileHover={{
                scale: 1.5,
              }}
              src="./../img/profileSymbol.png"
              alt="Swapify Logo"
              // class="responsive-img"
              height="100px"
            />
          </div>
          <div className="col l3 center symbol2">
            <motion.img
              animate={{}}
              initial={{}}
              transition={{}}
              whileHover={{
                scale: 1.5,
              }}
              src="./../img/addItemSymbol.png"
              alt="Swapify Logo"
              // class="responsive-img"
              height="100px"
            />
          </div>
          <div className="col l3 center symbol3">
            <motion.img
              animate={{}}
              initial={{}}
              transition={{}}
              whileHover={{
                scale: 1.5,
              }}
              src="./../img/swipeSymbol.png"
              alt="Swapify Logo"
              // class="responsive-img"
              height="100px"
            />
          </div>
          <div className="col l3 center symbol4">
            <motion.img
              animate={{}}
              initial={{}}
              transition={{}}
              whileHover={{
                scale: 1.5,
              }}
              src="./../img/swapSymbol.png"
              alt="Swapify Logo"
              // class="responsive-img"
              height="100px"
            />
          </div>
        </div>
      </div>
      <motion.div className="row"></motion.div>
      <div className="row login">
        {redirect ? <Redirect push to="/profile" /> : null}
        <GoogleLogin
          className="loginBtn"
          clientId={googleClientId}
          buttonText="Login"
          onSuccess={googleSuccess}
          onFailure={googleFailure}
          cookiePolicy={"single_host_origin"}
          isSignedIn={false}
          render={(renderProps) => (
            <motion.a animate={{}}>
              <Button
                large
                className="loginBtn"
                node="a"
                style={{
                  marginRight: "5px",
                }}
                waves="light"
                onClick={renderProps.onClick}
              >
                Login
              </Button>
            </motion.a>
          )}
        />
      </div>
    </div>
  );
}

export default Welcome;
