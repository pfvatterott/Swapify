import React, { useState, useContext, useEffect } from "react";
import ArticleContext from "../utils/ArticleContext"
import {Redirect} from 'react-router-dom';


function Profile() {
    const {userState, handleSetUser } = useContext(ArticleContext);
    const [redirect, setRedirect] = useState(false);


    useEffect(() => {
        if (userState.length === 0) {
            console.log('no user')
            setRedirect(true)
        }
    })
    return (
        <div>
            { redirect ? (<Redirect push to="/"/>) : null }
            <h2>Profile Page</h2>
        </div>
    )
}

export default Profile;