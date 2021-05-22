import React, {useState, useContext} from "react";
import API from "../utils/API";
import GoogleLogin from 'react-google-login'
import { Button } from 'react-materialize';
import {Redirect} from 'react-router-dom';


function Welcome() {

    const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    const [redirect, setRedirect] = useState(false);

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
                localStorage.setItem('userData', JSON.stringify(user))
                setRedirect(true)
            }
            else {
                API.saveUser(user)
                localStorage.setItem('userData', JSON.stringify(user))
                setRedirect(true)
            }
        }).catch(error => console.log(error))

    }

    const googleFailure = (response) => {
        console.log("Google Sign in was unsuccessful")
        alert('please try logging in again')
        console.log(response)
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
                isSignedIn={false}
                render={renderProps => (
                <Button onClick={renderProps.onClick}>hey</Button>)}
            />
        </div>
    )

}

export default Welcome;