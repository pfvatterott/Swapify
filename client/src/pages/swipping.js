import React, { useState, useContext, useEffect } from "react";
import { Link, Redirect } from 'react-router-dom'
import API from "../utils/API";
import "./style.css"
let preventFirstRender = false


function Swipping() {
    const [redirect, setRedirect] = useState(false);
    const [notUserItems, setNotUserItems] = useState([])
    const [currentItem, setCurrentItem] = useState([])
    const [noMoreItems, setNoMoreItems] = useState(false)
    const [imageNumber, setImageNumber] = useState(0)
    const itemData = JSON.parse(localStorage.getItem('itemData'))

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
                if (notUserItemsArray.length === 0 ) {
                    alert('no more items')
                }
                else {
                    console.log(notUserItemsArray)
                    setNotUserItems(notUserItemsArray)
                    setCurrentItem(notUserItemsArray[imageNumber])
                }
                
            })
        })
         
    }, [])


    useEffect(() => {
        if (preventFirstRender === true) {
            if (imageNumber === notUserItems.length) {
                setNoMoreItems(true)
            }
            else {
                setCurrentItem(notUserItems[imageNumber])
            }
        }
    }, [imageNumber])


    function handleItemNotLike() {
        preventFirstRender = true
        API.getItem(itemData).then((res) => {
            const updatedItemData = {
                seenItems: res.data.seenItems
            }
            updatedItemData.seenItems.push(currentItem._id)
            API.updateItem(itemData, updatedItemData).then((res) => {
                setImageNumber(imageNumber + 1)
            })
        })  
    }

    function handleItemLike() {
        preventFirstRender = true
        API.getItem(itemData).then((res) => {
            const updatedItemData = {
                seenItems: res.data.seenItems,
                likesItems: res.data.likesItems
            }
            updatedItemData.seenItems.push(currentItem._id)
            updatedItemData.likesItems.push(currentItem._id)
            API.updateItem(itemData, updatedItemData).then((res) => {
                API.getItem(currentItem._id).then((response) => {
                    const updatedItemData = {
                        likesFromItems: response.data.likesFromItems
                    }
                    updatedItemData.likesFromItems.push(itemData)
                    API.updateItem(currentItem._id, updatedItemData).then((res) => {
                        setImageNumber(imageNumber + 1)
                    })
                  })
                setImageNumber(imageNumber + 1)
            }) 
        })
    }

    if (noMoreItems === true) {
        alert('no more items')
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