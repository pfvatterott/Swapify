import React, { useState, useContext, useEffect } from "react";
import { Link, Redirect } from 'react-router-dom'
import API from "../utils/API";
import ItemCard from "../components/ItemCard"
import MatchCard from '../components/MatchCard'
import { Button, Col, Row, CollectionItem, Collection } from 'react-materialize';
import AddIcon from '@material-ui/icons/Add';

//document.body.style = "background: -webkit-gradient(linear, top, bottom, from(#003399), to(#6699cc));background: -webkit-linear-gradient(#025159, #03A696);background: linear-gradient(#025159, #03A696);zoom: 1;margin: 0;padding-top: 2%;padding-bottom: 3%;background-attachment: fixed;"

function Profile() {
    const [redirect, setRedirect] = useState(false);
    const [redirectToSwipping, setRedirectToSwipping] = useState(false);
    const [usersItemList, setUsersItemList] = useState([]);
    const [matchList, setMatchList] = useState([])
    const userData = JSON.parse(localStorage.getItem('userData'))
    const userProfileImg=userData.image;

    let matchArray = []


    useEffect(() => {
       loadItems();

    }, [])

    function loadItems(){
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

    }

    // function deleteItem(id) {
    //     API.deleteItem(id)
    //       .then(res => loadItems())
    //       .catch(err => console.log(err));
    //   };
 

    function handleUseItem(id) {
        console.log(id)
        localStorage.setItem('itemData', JSON.stringify(id))
        setRedirectToSwipping(true)
    }
    //#05E6CF
    //linear-gradient(#025159, #03A696, #FFFFFF)
    return (
        <div>
            {redirect ? (<Redirect push to="/" />) : null}



            <div className="container" style={{ marginTop: "80px" }}>
                <h2 style={{ color: "#F28705", textAlign: "center", marginTop: "80px", fontFamily: 'Lemon, cursive' }}>Swappable Items</h2>
                <img src= {userData.image}/>
                <h3>{userData.firstName} {userData.lastName}</h3>
                <Row>
                    <Col
                        m={12}
                        s={12}>
                        <Collection>
                            {usersItemList.map((item, index) => (

                                <ItemCard key={index} loadItems={loadItems} imageURL={item.imageURL} itemName={item.itemName} id={item._id} itemDescription={item.itemDescription} />

                                // <a href="/swipping" ><button onClick={() => handleUseItem(item._id)} itemId={item._id}>{item.itemName}</button></a>
                            ))}
                            <CollectionItem className="avatar valign-wrapper">
                                <a
                                    className="secondary-content"
                                    href="/createItem"
                                >
                                    <Button className="btn-floating btn-large" style={{ backgroundColor: "#F28705", right: "680px" }}><AddIcon/></Button>
                                </a>
                                <span className="title" style={{ height: "70px", lineHeight: "70px", paddingLeft: "18px", fontFamily: "proxima-nova, sans-serif", fontWeight: "700", fontStyle: "normal", fontSize: "20px", textAlign: "center" }}>
                                    <Link to="/createItem" style={{ color: "#F28705", textAlign: "center" }}>Create New Item?</Link>
                                </span>
                            </CollectionItem>
                        </Collection>
                    </Col>
                </Row>
            </div>

        </div>
    )
}

export default Profile;