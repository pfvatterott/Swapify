import React, { useState, useContext, useEffect } from "react";
import { Link, Redirect } from 'react-router-dom'
import API from "../utils/API";
import ItemCard from "../components/ItemCard"
import { Col, Row, CollectionItem, Collection } from 'react-materialize';

function Profile() {
    const [redirect, setRedirect] = useState(false);
    const [redirectToSwipping, setRedirectToSwipping] = useState(false);
    const [usersItemList, setUsersItemList] = useState([]);
    const [matchList, setMatchList] = useState([])


    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData'))
        if (userData === null) {
            setRedirect(true)
        }
        API.getUserItems(userData.googleId).then((response) => {
            setUsersItemList(response.data)
        })
        API.getUserMatches(userData.googleId).then((matchResponse) => {
            let matchArray = []
            matchResponse.data.forEach(item => {
                if (item.item1Owner === userData.googleId) {
                    API.getItem(item.item2Id).then((itemResponse) => {
                        console.log(itemResponse.data.imageURL)
                        console.log(itemResponse.data.itemOwner)
                        console.log(itemResponse.data.itemName)
                        const itemInfo = {
                            userItemId: item.item1Id,
                            userId: item.item1Owner,
                            otherItemId: item.item2Id,
                            otherUser: item.item2Owner,
                            otherItemImage: itemResponse.data.imageURL,
                            otherItemName: itemResponse.data.itemName
                        }
                        matchArray.push(itemInfo)
                        console.log(matchArray)
                        setMatchList(matchArray)
                    })
                }
                
            });
        })
    }, [])

    function handleUseItem(id) {
        console.log(id)
        localStorage.setItem('itemData', JSON.stringify(id))
        setRedirectToSwipping(true)
    }
    return (
        <div>
            {redirect ? (<Redirect push to="/" />) : null}
            <h2>Profile Page</h2>
            <a><Link to="/createItem">Create Item</Link></a>
            <div>
                <Row>
                    <Col
                        m={12}
                        s={12}>
                        <Collection>
                            {usersItemList.map(item => (

                                <ItemCard imageURL={item.imageURL} itemName={item.itemName} id={item._id} itemDescription={item.itemDescription} />

                                // <a href="/swipping" ><button onClick={() => handleUseItem(item._id)} itemId={item._id}>{item.itemName}</button></a>
                            ))}
                        </Collection>

                    </Col>
                </Row>
            </div>
            <h2>Matches</h2>
            <div>
                <Row>
                    <Col
                        m={12}
                        s={12}>
                        <Collection>
                            {matchList.map(match => (
                                <ItemCard imageURL={match.otherItemImage} itemName={match.otherItemName} id={match.otherItemId} />
                            ))}
                        </Collection>

                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default Profile;