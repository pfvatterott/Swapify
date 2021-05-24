
import React, { useContext, useEffect, useState } from "react";
import { Button, CollectionItem } from 'react-materialize';
import "./style.css"
import chatContext from "../../utils/chatContext"

const MatchCard = (props) => {
    const itemIds = {
        matchId: props.matchData.matchId
    }
    const { setChat, chatId } = useContext(chatContext)
    const [ currentChatStyle, setCurrentChatStyle ] = useState(false)

    useEffect(() => {
       setChat({matchId: props.allMatches.data[0]._id})
    }, [])

    useEffect(() => {
        if (chatId.matchId === props.matchData.matchId) {
            console.log("true")
            setCurrentChatStyle(true)
        }
        else {
            setCurrentChatStyle(false)
        }
    }, [chatId])

    return (
        <div>
            {/* highlights currently selected chat */}
            {currentChatStyle ? (
                <CollectionItem className="avatar valign-wrapper" style={{backgroundColor:"#F25D27"}}>
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
                <a className="secondary-content">
                    {props.matchData.newText ? (<a className="btn-floating btn-large pulse" style= {{backgroundColor:"#F28705"}} onClick={() => {setChat(itemIds)}} ><i className="material-icons">chat</i></a>) : (<a className="btn-floating btn-large" style= {{backgroundColor:"#F28705"}} onClick={() => {setChat(itemIds)}} ><i className="material-icons">chat</i></a>)}
                    
                </a>
            </CollectionItem>
            ) : (
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
                <a className="secondary-content">
                    {props.matchData.newText ? (<a className="btn-floating btn-large pulse" style= {{backgroundColor:"#F28705"}} onClick={() => {setChat(itemIds)}} ><i className="material-icons">chat</i></a>) : (<a className="btn-floating btn-large" style= {{backgroundColor:"#F28705"}} onClick={() => {setChat(itemIds)}} ><i className="material-icons">chat</i></a>)}
                    
                </a>
            </CollectionItem>
            )}
        </div>
    )
}
export default MatchCard;