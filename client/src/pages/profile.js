import React, { useState, useContext, useEffect } from "react";
import { Link, Redirect } from 'react-router-dom'


function Profile() {
    const [redirect, setRedirect] = useState(false);


    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData'))
        if (userData === null) {
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