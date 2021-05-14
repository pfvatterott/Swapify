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

        // checks if there are any matches. Needs to be in UseEffect
        setInterval(function(){
            API.getUserMatches(userData.googleId).then((response) => {
                console.log(response)
                for (let i = 0; i < response.data.length; i++) {
                    if ((response.data[i].item2Owner == userData.googleId) && (response.data[i].item2Read === false)) {
                        const matchData = {
                            item2Read: true
                        }
                        API.updateUserMatch(response.data[i]._id, matchData).then((matchPutResponse) => {
                            console.log(matchPutResponse)
                            alert('You have a new matched Item!')
                        })
                    }
                    
                }
            })
        }, 5000)
         
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
        API.getItem(itemData).then((userItemResponse) => {
            const updatedItemData = {
                seenItems: userItemResponse.data.seenItems,
                likesItems: userItemResponse.data.likesItems
            }
            updatedItemData.seenItems.push(currentItem._id)
            updatedItemData.likesItems.push(currentItem._id)
            API.updateItem(itemData, updatedItemData).then((res) => {
                API.getItem(currentItem._id).then((currentItemResponse) => {
                    const updatedItemData1 = {
                        likesFromItems: currentItemResponse.data.likesFromItems
                    }
                    updatedItemData1.likesFromItems.push(itemData)
                    API.updateItem(currentItem._id, updatedItemData).then((res) => {
                        for (let i = 0; i < updatedItemData.likesItems.length; i++) {
                            for (let p = 0; p < updatedItemData1.likesFromItems.length; p++) {
                                if (updatedItemData.likesItems[i] === updatedItemData1.likesFromItems[p]) {
                                    alert("its a match!!")

                                    // START HERE
                                    const matchData = {
                                        item1Id: itemData,
                                        item1Owner: userData.googleId,
                                        item2Id: currentItem._id,
                                        item2Owner: currentItemResponse.data.itemOwner, //item2Owner not working
                                        item2Read: false
                                    }
                                    API.postMatch(matchData).then((matchRes) => {
                                        console.log(matchRes)
                                    })
                                }
                                
                            }
                            
                        }



                        setImageNumber(imageNumber + 1)
                    })
                  })
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