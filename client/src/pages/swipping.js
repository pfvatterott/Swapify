import React, { useState, useContext, useEffect } from "react";
import { Link, Redirect } from 'react-router-dom'
import API from "../utils/API";



function Swipping() {
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData'))
        if (userData === null) {
            setRedirect(true)
        }
        const userId = userData.googleId
        API.getUserItems(userId).then((res) => {
            console.log(res)
        })
        
    })
    return (
        <div>
            { redirect ? (<Redirect push to="/"/>) : null }
            <h2>Swipping</h2>
        </div>
    )
}

export default Swipping;