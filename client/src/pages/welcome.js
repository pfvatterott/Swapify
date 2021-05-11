import React, {useState, useContext} from "react";
import API from "../utils/API";
import GoogleLogin from 'react-google-login'
import {Redirect} from 'react-router-dom';
import ArticleContext from "../utils/ArticleContext";


function Welcome() {

    const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    const [redirect, setRedirect] = useState(false);

    const { handleSetUser } = useContext(ArticleContext);

    const googleSuccess = async (response) => {
        const userObj = response.profileObj
        const user = {
            email: userObj.email,
            firstName: userObj.givenName,
            lastName: userObj.familyName,
            image: userObj.imageUrl,
            googleId: userObj.googleId,
            listedItems: []
        }
        API.getUser(userObj.googleId).then(res => {
            if (res.data.length > 0) {
                console.log('user exists')
                handleSetUser(user)
                setRedirect(true)
            }
            else {
                console.log('new user logged')
                API.saveUser(user)
                handleSetUser(user)
                setRedirect(true)
            }
        }).catch(error => console.log(error))

    }

    const googleFailure = (response) => {
        console.log("Google Sign in was unsuccessful")
        alert('please try logging in again')
    }

    return (
        <div>
            { redirect ? (<Redirect push to="/profile"/>) : null }
            <GoogleLogin 
                clientId={googleClientId}
                buttonText="Login, buddy"
                onSuccess={googleSuccess}
                onFailure={googleFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />
        </div>
    )

}

export default Welcome;