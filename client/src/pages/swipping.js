import React, { useState, useContext, useEffect } from "react";
import { Link, Redirect } from 'react-router-dom'
import API from "../utils/API";
import "./style.css"



function Swipping() {
    const [redirect, setRedirect] = useState(false);
    const [notUserItems, setNotUserItems] = useState([])
    const [currentItem, setCurrentItem] = useState([])
    const itemData = JSON.parse(localStorage.getItem('itemData'))
    let imageNumber = 0;

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData'))
        if (userData === null) {
            setRedirect(true)
        }
        API.getAllItems().then((res) => {
            // filters out selected item so it cant see itself
            const notUserItemsArray = res.data.filter(item => (
                item._id !== itemData
            ))
            // filters out already seen items
            API.getItem(itemData).then((response) => {
                const seenItems = response.data.seenItems
                for (let i = 0; i < seenItems.length; i++) {
                    for (let p = 0; p < notUserItemsArray.length; p++) {
                        if (seenItems[i] === notUserItemsArray[p]._id) {
                            notUserItemsArray.splice(p, 1)
                        }
                    }
                }
                setNotUserItems(notUserItemsArray)
                setCurrentItem(notUserItemsArray[imageNumber])
            })
        })    
    }, [])

    function handleItemNotLike() {
        API.getItem(itemData).then((res) => {
            const updatedItemData = {
                seenItems: res.data.seenItems
            }
            updatedItemData.seenItems.push(currentItem._id)
            API.updateItem(itemData, updatedItemData).then((res) => {
                imageNumber++
                setCurrentItem(notUserItems[imageNumber])
            })
        })  
    }

    function handleItemLike() {
        API.getItem(itemData).then((res) => {
            const updatedItemData = {
                seenItems: res.data.seenItems,
                likesItems: res.data.likesItems
            }
            updatedItemData.seenItems.push(currentItem._id)
            updatedItemData.likesItems.push(currentItem._id)
            API.updateItem(itemData, updatedItemData).then((res) => {
                imageNumber++
                setCurrentItem(notUserItems[imageNumber])
            })
        })
    }


    return (
        <div>
            { redirect ? (<Redirect push to="/"/>) : null }
            <h2>Swipping</h2>
            <h4>{currentItem.itemName}</h4>
            <h5>{currentItem.itemDescription}</h5>
            <img class="itemImage" src={currentItem.imageURL}/>
            <button onClick={handleItemNotLike}>Not Interested</button>
            <button onClick={handleItemLike}>Interested</button>

          
        </div>
    )
}

export default Swipping;