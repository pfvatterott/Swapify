
import React from "react";
import { Button, Card, CollectionItem } from 'react-materialize';
import API from "../../utils/API"

const MatchCard = (props) => {
    console.log(props.matchData)
    const itemIds = {
        item1: props.matchData.userItemId,
        item1Owner: props.matchData.userId,
        item2: props.matchData.otherItemId,
        item2Owner: props.matchData.otherUser
    }

    function handleGoToChat() {
        localStorage.setItem('chatData', JSON.stringify(itemIds))
    }

    return (
        <CollectionItem className="avatar">
            <img
                alt=""
                className="circle"
                src={props.imageURL}
            />
            <span className="title">
                {props.itemName}
            </span>
            <a
                className="secondary-content"
                href="/chat"
            >
            <Button onClick={handleGoToChat} style= {{backgroundColor:"#F28705"}}>Chat</Button>
            </a>

        </CollectionItem>
    )
}
export default MatchCard;