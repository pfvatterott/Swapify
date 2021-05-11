import React from "react";
import API from "../utils/API";
import GoogleLogin from 'react-google-login'


function Welcome() {

    const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID

    const googleSuccess = async (response) => {
        console.log(response)
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
            console.log(res.data)
            if (res.data.length > 0) {
                console.log('user exists')
            }
            else {
                console.log('new user logged')
                API.saveUser(user)
            }
        }).catch(error => console.log(error))

    }

    const googleFailure = (response) => {
        console.log(response)
        console.log("Google Sign in was unsuccessful")
    }

    return (
        <div>
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