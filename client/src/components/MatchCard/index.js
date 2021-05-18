
import React from "react";
import { Button, Card, CollectionItem } from 'react-materialize';
import API from "../../utils/API"
import "./style.css"

const MatchCard = (props) => {
    console.log(props.matchData)
    const itemIds = {
        matchId: props.matchData.matchId
    }

    function handleGoToChat() {
        localStorage.setItem('chatData', JSON.stringify(itemIds))
    }

    return (
    
        <CollectionItem className="avatar valign-wrapper">
            <a><img
                alt=""
                className="circle userItemPicture "
                src={props.yourImageUrl}
            /></a>
            <a><i className="material-icons swapSymbol">autorenew</i></a>
            <a><img
                alt=""
                className="circle itemPicture"
                src={props.imageURL}
            /></a>
            <a className="secondary-content" href="/chat">
                <Button onClick={handleGoToChat} style= {{backgroundColor:"#F28705"}}>Chat</Button>
            </a>

        </CollectionItem>
    )
}
export default MatchCard;