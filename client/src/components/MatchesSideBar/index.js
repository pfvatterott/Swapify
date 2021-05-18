import React, { useState, useContext, useEffect } from "react";
import API from "../../utils/API";
import { Button, Col, Row, CollectionItem, Collection, SideNav } from 'react-materialize';
import MatchCard from '../MatchCard'
import "./style.css"


export default function MatchesSideBar() {

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
                        matchId: item._id
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
                        matchId: item._id
                    }
                    matchArray.push(itemInfo)
                    if (matchResponse.data.length === matchArray.length) {
                        setMatchList(matchArray)
                    }
                }
            });
        })
    }, [])


    return (
        <div>
            <Row>
                <Col s={12}>
                    <SideNav
                        fixed={true}>
                     <Collection>
                        {matchList.map(match => (
                            <MatchCard yourImageUrl={match.userItemPhoto} imageURL={match.otherItemImage} matchData={match} />
                        ))}
                    </Collection>
                    </SideNav>
                </Col>
            </Row>
        </div>       
    )
}
