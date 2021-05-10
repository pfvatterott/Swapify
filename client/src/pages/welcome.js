import React, { useEffect } from "react";
import GoogleLogin from 'react-google-login'


function Welcome() {

    function responseGoogle(response) {
        console.log(response)
        console.log(response.profileObj)
    }

    return (
        <div>
            <GoogleLogin 
                clientId="582713087977-59mpjc19jph6a912mbsb4l41ak8msu56.apps.googleusercontent.com"
                buttonText="Login, buddy"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
                
            />
        </div>
    )

}

export default Welcome;