import React, { useState, useContext, useEffect } from "react";
import { Link, Redirect } from 'react-router-dom'
import API from "../utils/API";
import ItemCard from "../components/ItemCard"
import MatchCard from '../components/MatchCard'
import { Button, Col, Row, CollectionItem, Collection } from 'react-materialize';
import AddIcon from '@material-ui/icons/Add';


function Profile() {
    const [redirect, setRedirect] = useState(false);
    const [redirectToSwipping, setRedirectToSwipping] = useState(false);
    const [usersItemList, setUsersItemList] = useState([]);
    const [matchList, setMatchList] = useState([])
    const userData = JSON.parse(localStorage.getItem('userData'))
    let matchArray = []


    useEffect(() => {
        if (userData === null) {
            setRedirect(true)
        }
        API.getUserItems(userData.googleId).then((response) => {
            console.log(response.data)
            setUsersItemList(response.data)
        })
        API.getUserMatches(userData.googleId).then((matchResponse) => {
            matchResponse.data.forEach(item => {
                if (item.item1Owner === userData.googleId) {
                    const itemInfo = {
                        userItemId: item.item1Id,
                        userId: item.item1Owner,
                        userItemPhoto: item.item1Photo,
                        userItemName: item.item1Name,
                        otherItemId: item.item2Id,
                        otherUser: item.item2Owner,
                        otherItemImage: item.item2Photo,
                        otherItemName: item.item2Name,
                    }
                    matchArray.push(itemInfo)
                    if (matchResponse.data.length === matchArray.length) {
                        setMatchList(matchArray)
                    }
                }
                else {
                    const itemInfo = {
                        userItemId: item.item2Id,
                        userId: item.item2Owner,
                        userItemPhoto: item.item2Photo,
                        userItemName: item.item2Name,
                        otherItemId: item.item1Id,
                        otherUser: item.item1Owner,
                        otherItemImage: item.item1Photo,
                        otherItemName: item.item1Name,
                    }
                    matchArray.push(itemInfo)
                    if (matchResponse.data.length === matchArray.length) {
                        setMatchList(matchArray)
                    }
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
                            <CollectionItem className="avatar valign-wrapper">
                                <a
                                    className="secondary-content"
                                    href="/createItem"
                                >
                                    <Button className="btn-floating btn-large" style={{ backgroundColor: "#025159", right: "1420px" }}><AddIcon/></Button>
                                </a>
                                <span className="title" style={{ height: "70px", lineHeight: "70px", paddingLeft: "20px", fontFamily: "proxima-nova, sans-serif", fontWeight: "700", fontStyle: "normal", fontSize: "20px" }}>
                                    <a><Link to="/createItem">Create New Item</Link></a>
                                </span>
                            </CollectionItem>
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
                                <MatchCard imageURL={match.otherItemImage} itemName={match.otherItemName} matchData={match} />
                            ))}
                        </Collection>

                    </Col>
                </Row>
            </div>
            <h2><a><Link to="/createItem">Create New Item</Link></a></h2>
        </div>
    )
}

export default Profile;