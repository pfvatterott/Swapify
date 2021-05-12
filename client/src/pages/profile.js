import React, { useState, useContext, useEffect } from "react";
import ArticleContext from "../utils/ArticleContext"
import { Link, Redirect } from 'react-router-dom'


function Profile() {
    const {userState, handleSetUser } = useContext(ArticleContext);
    const [redirect, setRedirect] = useState(false);


    useEffect(() => {
        console.log(userState)
        if (userState.length === 0) {
            console.log('no user')
            setRedirect(true)
        }
    })
    return (
        <div>
            { redirect ? (<Redirect push to="/"/>) : null }
            <h2>Profile Page</h2>
            <a><Link to="/createItem">Create Item</Link></a>
        </div>
    )
}

export default Profile;