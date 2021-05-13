import React, { useState, useContext, useEffect } from "react";
import { Link, Redirect } from 'react-router-dom'
import API from "../utils/API";


function Profile() {
    const [redirect, setRedirect] = useState(false);
    const [redirectToSwipping, setRedirectToSwipping] = useState(false);
    const [usersItemList, setUsersItemList] = useState([])


    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData'))
        if (userData === null) {
            setRedirect(true)
        }
        API.getUserItems(userData.googleId).then((response) => {
            setUsersItemList(response.data)
        })
    })

    function handleUseItem(id) {
        console.log(id)
        localStorage.setItem('itemData', JSON.stringify(id))
        setRedirectToSwipping(true)
    }
    return (
        <div>
            { redirect ? (<Redirect push to="/"/>) : null }
            <h2>Profile Page</h2>
            <a><Link to="/createItem">Create Item</Link></a>
            {usersItemList.map(item =>(
                <a href="/swipping" ><button onClick={() => handleUseItem(item._id)} itemId={item._id}>{item.itemName}</button></a>
            ))}
        </div>
    )
}

export default Profile;