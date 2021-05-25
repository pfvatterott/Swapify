import React, { useState, useEffect } from "react";
import { Redirect, useParams } from 'react-router-dom'
import { Button, Modal, Row, Col, Card, CardTitle } from 'react-materialize';
import  {motion, useMotionValue, useTransform } from "framer-motion"
import DistanceSlider from '../components/DistanceSlider'
import API from "../utils/API";
import "./style.css"
let preventFirstRender = false

function Swipping() {
    let startingDragPoint = {}
    const [redirect, setRedirect] = useState(false);
    const [notUserItems, setNotUserItems] = useState([])
    const [currentItem, setCurrentItem] = useState([])
    const [noMoreItems, setNoMoreItems] = useState(false)
    const [imageNumber, setImageNumber] = useState(0)
    const [itIsAMatch, setItIsAMatch] = useState(false)
    const [distanceBoundary, setDistanceBoundary] = useState(50)
    const [modalMatchImage1, setModalMatchImage1] = useState('')
    const [modalMatchImage2, setModalMatchImage2] = useState('')
    const { id, item } = useParams()
    const itemData = item
    const [userData, setUserData] = useState({
        email: "",
        firstName: "",
        googleId: "",
        image: "",
        lastName: "",
        listedItems: [],
        rating: []}
    )

    useEffect(() => {
        API.getUser(id).then((res) => {
            const newUser = {
                email: res.data[0].email,
                firstName: res.data[0].firstName,
                googleId: res.data[0].googleId,
                image: res.data[0].image,
                lastName: res.data[0].lastName,
                listedItems: res.data[0].listedItems,
                rating: res.data[0].rating
            }
            setUserData(newUser)
        })
    }, [])
    

    useEffect(() => {
        // Sets all user's items to user's current location
        const getCoords = async () => {
            const pos = await new Promise((resolve, reject) => {
              navigator.geolocation.getCurrentPosition(resolve, reject);
            });
            return [pos.coords.latitude, pos.coords.longitude]
        };
        const coords = getCoords().then((res) => {
            API.getUserItems(userData.googleId).then((userItemsResponse) => {
                for (let z = 0; z < userItemsResponse.data.length; z++) {
                    const newCoords = {
                        itemLocation: res
                    }
                    API.updateItem(userItemsResponse.data[z]._id, newCoords)
                }
            })
        });

        if (userData === null) {
            setRedirect(true)
        }
        API.getAllItems().then((res) => {
            // filters out selected item so it cant see itself
            const notUserItemsArray = res.data.filter(item => (
                (item.itemOwner !== id)
            ))
            // filters out already seen items
            API.getItem(itemData).then((response) => {
                const seenItems = response.data.seenItems
                for (let i = 0; i < seenItems.length; i++) {
                    for (let p = 0; p < notUserItemsArray.length; p++) {
                        if (seenItems[i] === notUserItemsArray[p]._id) {
                            notUserItemsArray.splice(p, 1)
                            if (notUserItemsArray.length === 0) {
                                setNoMoreItems(true)
                            }
                        }
                    }
                }

                // moves items that like current item to front of list
                for (let q = 0; q < notUserItemsArray.length; q++) {
                    if (notUserItemsArray[q].likesItems.includes(itemData)) {
                        notUserItemsArray.unshift(notUserItemsArray.splice(q, 1)[0])
                    }
                }

                API.getItem(itemData).then((userItemRes) => {
                    console.log(userItemRes)
                    const sortedNotUserItems = []
                     // Sorting by Location
                     for (let v = 0; v < notUserItemsArray.length; v++) {
                         const notUserLat = notUserItemsArray[v].itemLocation[0]
                         const notUserLong = notUserItemsArray[v].itemLocation[1]
                         const userLat = userItemRes.data.itemLocation[0]
                         const userLong = userItemRes.data.itemLocation[1]

                        getDistanceFromLatLonInKm(notUserLat, notUserLong, userLat, userLong).then((distanceResponse) => {
                            if (distanceResponse < distanceBoundary) {
                                sortedNotUserItems.push(notUserItemsArray[v])
                            }
                            // no more items triggers Modal
                            if (sortedNotUserItems.length === 0) {
                                console.log(sortedNotUserItems)
                                setNoMoreItems(true)
                            }
                            else {
                                setNotUserItems(sortedNotUserItems)
                                setCurrentItem(sortedNotUserItems[imageNumber])
                            }
                        })
                     }
                })
            })
        })
    }, [distanceBoundary])

    // Haversine Formula
    const getDistanceFromLatLonInKm = async(lat1,lon1,lat2,lon2) => {
        var R = 6371; // Radius of the earth in km
        var dLat = deg2rad(lat2-lat1);  // deg2rad below
        var dLon = deg2rad(lon2-lon1); 
        var a = 
          Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
          Math.sin(dLon/2) * Math.sin(dLon/2)
          ; 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = R * c; // Distance in km
        return (d / 1.609344); // Convert to Miles
    }
      
    function deg2rad(deg) {
        return deg * (Math.PI/180)
    }

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
                                setItIsAMatch(true)
                                setModalMatchImage1(userItemResponse.data.imageURL)
                                setModalMatchImage2(currentItem.imageURL)
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

    function handleDistanceChange(e) {
        setDistanceBoundary(e)
    }

    const x = useMotionValue(0)
    const background = useTransform(
        x,
        [-100, 0, 100],
        ["#ff008c", "#7700ff", "rgb(230, 255, 0)"]
    )

    function processDragInfo(x, y) {
        console.log("ending: ", x, y)
        console.log(startingDragPoint)
        if ((startingDragPoint * 1.8) < x) {
            console.log("likes")
        }
        else if ((startingDragPoint / 2) > x) {
            console.log('doesnt like')
        }
    }

    return (
        <div>
            { redirect ? (<Redirect push to="/" />) : null}
            <div className="container center-align" style={{ marginTop: "20px" }}>
                <Row>
                    <Col s={12}>
                        <motion.div style={{ background }}>
                            <motion.div
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            style={{ x }}
                            onDragStart={
                                (event, info) => startingDragPoint = (info.point.x)
                            }
                            onDragEnd={
                                (event, info) => processDragInfo(info.point.x, info.point.y)
                            }
                            >
                                <Card
                                    header={<CardTitle image={currentItem.imageURL}></CardTitle>}
                                    title={currentItem.itemName}
                                >
                                    {currentItem.itemDescription}
                                </Card>
                            </motion.div>
                        </motion.div>
                    </Col>
                </Row>
                <Row>
                    <Col s={6}>
                        <button onClick={handleItemNotLike}>Not Interested</button>
                    </Col>
                    <Col s={6}>
                    <button onClick={handleItemLike}>Interested</button>
                    </Col>
                </Row>
                <Row className="center-align">
                    <Col s={3}></Col>
                    <Col s={6}>
                    <DistanceSlider className="center-align" setDistanceBoundary={handleDistanceChange} distanceBoundary={distanceBoundary}/>
                    </Col>
                    <Col s={3}></Col>
                </Row>
            </div>
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
                <a href={`/profile/${userData.googleId}`}><Button>Back to my Profile</Button></a>
                <br></br>
            </Modal>
            
            {/* It's a match! */}
            <Modal
                open={itIsAMatch}
                className='center-align'
                actions={[]}
                options={{
                    dismissible: false
                }}
                >
                <h3>It's a match!</h3>
                <img src={modalMatchImage1} className="circle swapItemImage"></img>
                <img src={modalMatchImage2} className="circle swapItemImage"></img>
                <br></br>
                <div>Head to the chat page or continue swipping!</div>
                <br></br><br></br>
                <a href={`/chat/${userData.googleId}`}><Button>Chat Page</Button></a>
                <br></br><br></br>
                <a><Button modal="close">Continue</Button></a>
                <br></br>   
            </Modal>
        </div>
    )
}

export default Swipping;