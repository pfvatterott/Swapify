import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import { Col, Row, Collection, SideNav, Modal, Button } from 'react-materialize';
import MatchCard from '../MatchCard'
import "./style.css"


export default function MatchesSideBar() {
    const [usersItemList, setUsersItemList] = useState([]);
    const [matchList, setMatchList] = useState([])
    const [allMatches, setAllMatches] = useState([])
    const [noChats, setNoChats] = useState(false)
    const userData = JSON.parse(localStorage.getItem('userData'))
    let matchArray = []


    useEffect(() => {
        API.getUserItems(userData.googleId).then((response) => {
            setUsersItemList(response.data)
        })
        API.getUserMatches(userData.googleId).then((matchResponse) => {
            if (matchResponse.data.length === 0) {
                setNoChats(true)
            }
            setAllMatches(matchResponse)
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
                            <MatchCard yourImageUrl={match.userItemPhoto} imageURL={match.otherItemImage} matchData={match} allMatches={allMatches}/>
                        ))}
                    </Collection>
                    </SideNav>
                </Col>
            </Row>

            {/* No chats Modal */}
            <Modal
                open={noChats}
                className='center-align'
                actions={[]}
                options={{
                dismissible: false
                }}>
                <h3>No Chats!</h3>
                <br></br>
                <div>You don't have any open chats!</div>
                <div>Go make some matches first!</div>
                <br></br>
                <a href="/profile"><Button>Go Back</Button></a>
            </Modal>
        </div>       
    )
}
