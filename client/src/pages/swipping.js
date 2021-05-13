import React, { useState, useContext, useEffect } from "react";
import { Link, Redirect } from 'react-router-dom'
import API from "../utils/API";
import "./style.css"



function Swipping() {
    const [redirect, setRedirect] = useState(false);
    const [notUserItems, setNotUserItems] = useState([])
    const [currentItem, setCurrentItem] = useState([])
    let imageNumber = 0;

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
            setCurrentItem(notUserItemsArray[imageNumber])
        })    
    }, [])

    function handleItemLike() {
        imageNumber++
        setCurrentItem(notUserItems[imageNumber])
    }


    return (
        <div>
            { redirect ? (<Redirect push to="/"/>) : null }
            <h2>Swipping</h2>
            <h4>{currentItem.itemName}</h4>
            <h5>{currentItem.itemDescription}</h5>
            <img class="itemImage" src={currentItem.imageURL}/>
            <button onClick={handleItemLike}>Not Interested</button>
            <button>Interested</button>

          
        </div>
    )
}

export default Swipping;