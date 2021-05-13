import React, { useState, useContext, useEffect } from "react";
import { Link, Redirect } from 'react-router-dom'
import API from "../utils/API";



function Swipping() {
    const [redirect, setRedirect] = useState(false);
    const [notUserItems, setNotUserItems] = useState([])

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData'))
        if (userData === null) {
            setRedirect(true)
        }
        const userId = userData.googleId
        API.getAllItems().then((res) => {
            const notUserItemsArray = res.data.filter(item => (
                item.itemOwner !== +userId
            ))
            setNotUserItems(notUserItemsArray)
        })
        
    })
    return (
        <div>
            { redirect ? (<Redirect push to="/"/>) : null }
            <h2>Swipping</h2>
            <ol>
                {notUserItems.map(item => (
                    <a href={item.imageURL}><li>{item.itemName}</li></a>
                ))}
            </ol>
        </div>
    )
}

export default Swipping;