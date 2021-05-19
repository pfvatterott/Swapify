import React, { useState, useContext, useEffect } from "react";
import { Link, Redirect } from 'react-router-dom'
import { Button, Modal } from 'react-materialize';
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
    const userData = JSON.parse(localStorage.getItem('userData'))


    useEffect(() => {
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
                for (let q = 0; q < notUserItemsArray.length; q++) {
                    if (notUserItemsArray[q].likesItems.includes(itemData)) {
                        notUserItemsArray.unshift(notUserItemsArray.splice(q, 1)[0])
                    }
                }
                if (notUserItemsArray.length === 0) {
                    setNoMoreItems(true)
                }
                else {
                    console.log(notUserItemsArray)
                    setNotUserItems(notUserItemsArray)
                    setCurrentItem(notUserItemsArray[imageNumber])
                }
            })
        })
    }, [])


    // runs every time the imageNumber state changes
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
        // get item data, add to it, then do a put. Then do it for second item
        API.getItem(itemData).then((userItemResponse) => {
            const updatedItemData = {
                seenItems: userItemResponse.data.seenItems,
                likesItems: userItemResponse.data.likesItems
            }
            updatedItemData.seenItems.push(currentItem._id)
            updatedItemData.likesItems.push(currentItem._id)
            API.updateItem(itemData, updatedItemData).then((res) => {
                API.getItem(currentItem._id).then((currentItemResponse) => {
                    console.log(currentItemResponse)
                    const updatedItemData1 = {
                        likesFromItems: currentItemResponse.data.likesFromItems
                    }
                    updatedItemData1.likesFromItems.push(itemData)
                    API.updateItem(currentItem._id, updatedItemData1).then((res) => {
                        // once updated, check if there is a match
                        for (let i = 0; i < userItemResponse.data.likesFromItems.length; i++) {
                            if (userItemResponse.data.likesFromItems[i] === currentItem._id) {
                                alert("its a match!!")
                                const matchData = {
                                    item1Id: itemData,
                                    item1Owner: userData.googleId,
                                    item1Photo: userItemResponse.data.imageURL,
                                    item1Name: userItemResponse.data.itemName,
                                    item2Id: currentItem._id,
                                    item2Owner: currentItemResponse.data.itemOwner,
                                    item2Photo: currentItemResponse.data.imageURL,
                                    item2Name: currentItemResponse.data.itemName,
                                    item2Read: false
                                }
                                API.postMatch(matchData).then((matchRes) => {
                                })
                            }
                        }
                        setImageNumber(imageNumber + 1)
                    })
                })
            })
        })
    }

    return (
        <div>
            { redirect ? (<Redirect push to="/" />) : null}
            <h2>Swipping</h2>
            <h4>{currentItem.itemName}</h4>
            <h5>{currentItem.itemDescription}</h5>
            <img class="itemImage" src={currentItem.imageURL} />
            <button onClick={handleItemNotLike}>Not Interested</button>
            <button onClick={handleItemLike}>Interested</button>

            {/* No more items to swap modal */}
            <Modal
                open={noMoreItems}
                className='center-align'
                actions={[]}
                options={{
                    dismissible: false
                }}
                >
                <h3>No more items available!</h3>
                <br></br>
                <div>Add a new item, switch items to swap with, or try back later!</div>
                <br></br><br></br>
                <a href="/profile"><Button>Back to my Profile</Button></a>
                <br></br>
            </Modal>
        </div>
    )
}

export default Swipping;